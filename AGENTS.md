# AGENTS.md - Guidelines for Code Agents

## Build & Development Commands

```bash
npm install              # Install dependencies
npm run serve           # Start dev server on port 3001
npm run build           # Build for production
npm run lint            # Run ESLint
```

**Note:** This project does not have test framework configured (no Jest/Vitest). Manual testing or add test framework as needed.

## Technology Stack

- **Framework:** Vue 3 with Composition API (`<script setup lang="ts">`)
- **Language:** TypeScript (strict mode enabled)
- **UI Framework:** Quasar v2 with kebab-case imports
- **State Management:** Vuex 4 with typed modules
- **Styling:** Tailwind CSS + SCSS with custom design tokens
- **Routing:** Vue Router 4 with hash history
- **HTTP Client:** Axios with JWT Bearer authentication
- **Storage:** Dual-mode - API (when VUE_APP_ROOT_API configured) + Localbase fallback

## Component Guidelines

### File Structure
- Use Composition API with `<script setup lang="ts">`
- Single-word components require `<!-- eslint-disable vue/multi-word-component-names -->`
- Design system components: prefix with `DS` (e.g., DSButton.vue, DSModal.vue)
- Place components in logical directories: `components/`, `views/`, `design-system/`

### Props & Emits
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
});

const emit = defineEmits<{
  'timeIsFinished': [time: number];
  'startTimer': [];
}>();
```

## TypeScript Conventions

- **Strict mode enabled** - No implicit any types
- **Interface exports:** Use default exports for interfaces (`export default interface TaskInterface`)
- **Type definitions:** Custom types in `src/@types/` directory
- **Path aliases:** Use `@/` for absolute imports (configured in tsconfig.json)
- **Return types:** Explicitly type function returns (`: void`, `: Promise<void>`, etc.)

## Vuex Store Patterns

### Module Organization
- Separate modules in `src/store/modules/` (tasks, projects, streaks)
- Action types in `src/store/types/{module}/actions.ts`
- Mutation types in `src/store/types/{module}/mutations.ts`

### Naming Conventions
- **Actions:** Imperative verbs (`FETCH_TASKS`, `CREATE_NEW_TASK`, `UPDATE_TASK`)
- **Mutations:** Present tense (`NEW_TASKS`, `NEW_TASK`, `REMOVE_TASK`)
- **State:** camelCase properties (`active_task`, `time_spent`)

### Module Structure
```typescript
export interface TaskState {
  tasks: TaskInterface[];
  active_task: TaskInterface;
}

export const task: Module<TaskState, State> = {
  state: { /* ... */ },
  getters: { /* ... */ },
  mutations: { /* ... */ },
  actions: { /* ... */ },
};
```

## Styling Standards

### CSS Approach
- Use Tailwind utility classes for layout, spacing, colors
- Use SCSS scoped styles for component-specific styles
- Design tokens defined in `src/styles/design-tokens.css` (CSS custom properties)
- Dark mode support via `body.body--dark` class and CSS variables

### BEM Naming Convention
```scss
.timer {
  &__actions {
    display: flex;
  }
}
```

### Design Tokens
- Use CSS custom properties: `var(--bg-primary)`, `var(--text-secondary)`, `var(--border-color)`
- Dark mode colors: `--bg-primary: #181a1b`, `--text-primary: #e8e6e3`

## Naming Conventions

### Files
- Components: PascalCase (Timer.vue, TasksContainer.vue)
- Hooks/Composables: camelCase (useFormatTime, formatTime.ts)
- Utilities: camelCase (formatDate.ts, notify.ts)
- Interfaces: PascalCase + "Interface" suffix (TaskInterface.ts)

### Code
- Variables/Functions: camelCase (`timeInSeconds`, `startTimer`)
- Constants: UPPER_SNAKE_CASE (`NEW_TASKS`, `FETCH_TASKS`)
- Interfaces: PascalCase (`TaskInterface`, `ProjectInterface`)

## API Integration

### HTTP Client Setup
```typescript
import http from '@/http';

const response = await http().get('/tasks');
await http().post('tasks', data);
await http().put(`tasks/${id}`, data);
await http().delete(`tasks/${id}`);
```

### API Availability
Always check API availability before making HTTP requests:
```typescript
import { hasApi } from '@/hooks/verify_api';

if (hasApi()) {
  // Use HTTP requests
} else {
  // Fallback to Localbase
  db.collection('tasks').get();
}
```

### JWT Authentication
- Bearer token automatically added via `http()` client
- Token retrieved from `verify_api.ts` hook

## Router Structure

- Hash history: `createWebHashHistory()`
- Layout middleware: `loadLayoutMiddleware.ts` assigns layouts via route meta
- Layouts in `src/layouts/` (DCAuthLayout.vue, DCDefault.vue)
- Route meta: `{ layout: 'DCDefault' }` or `{ layout: 'DCAuthLayout' }`

## Error Handling & Notifications

Use centralized notification system:
```typescript
import useNotify from '@/hooks/notify';

const { notify } = useNotify();
notify('error', 'Error Title', 'Error message');
```

Notification types: `success`, `error`, `warning`, `info`

## Imports Order

1. Vue ecosystem (vue, vue-router, vuex)
2. Third-party libraries (axios, date-fns, quasar)
3. Internal components (relative paths first)
4. Internal utilities/hooks
5. Types/interfaces
6. Store actions/mutations

## ESLint Rules

- Semicolons required (TypeScript rule)
- Max 1 empty line between code blocks
- EOL at end of file
- No console/debugger in production (warn only)

## Environment Variables

Required in `.env`:
```
VUE_APP_ROOT_API=http://localhost:3000
```

Access via `process.env.VUE_APP_ROOT_API`

## Utility Functions

- **Date formatting:** `formatDate(date, format?)` from `@/hooks/formatDate`
- **Timer formatting:** `formatTimer(seconds)` from `@/hooks/formatTimer`
- **Time format:** `useFormatSecondsToNow({ seconds })` from `@/composables/formatTime`
- **Notifications:** `useNotify()` from `@/hooks/notify`
