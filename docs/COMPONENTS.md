# Design System - Componentes

## Visão Geral

O Daily Constancy possui um design system completo com 17 componentes reutilizáveis que seguem padrões consistentes de design, tipagem TypeScript e suporte a dark mode.

Todos os componentes estão localizados no diretório `src/design-system/` e são prefixados com `DS` (exceto componentes auxiliares).

### Princípios de Design

- **Consistência**: Todos os componentes usam os mesmos tokens de design
- **Composição**: Componentes são flexíveis e aceitam slots customizados
- **Tipagem Strong**: Interfaces TypeScript para props e emits
- **Acessibilidade**: Foco visível e suporte a screen readers
- **Dark Mode**: Suporte automático via tokens CSS

---

## Componentes Principais

### DSButton

Botões com múltiplas variantes, tamanhos e estados.

**Localização**: `src/design-system/DSButton.vue`

#### Props

```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  label?: string;
}
```

#### Variants

- `primary`: Botão principal (azul)
- `secondary`: Botão secundário (verde-azulado)
- `danger`: Botão destrutivo (vermelho)
- `warning`: Botão de aviso (amarelo)
- `outline`: Borda colorida, fundo transparente
- `ghost`: Fundo transparente, sem borda

#### Tamanhos

- `sm`: Pequeno (12px padding)
- `md`: Médio (16px padding, default)
- `lg`: Grande (20px padding)

#### Exemplo de Uso

```vue
<template>
  <div class="button-examples">
    <DSButton
      label="Salvar"
      variant="primary"
      @click="handleSave"
    />

    <DSButton
      label="Cancelar"
      variant="outline"
      @click="handleCancel"
    />

    <DSButton
      label="Excluir"
      variant="danger"
      icon="delete"
      @click="handleDelete"
    />

    <DSButton
      label="Carregando..."
      variant="primary"
      :loading="true"
    />

    <DSButton
      icon="add"
      variant="ghost"
      size="lg"
    />
  </div>
</template>

<script setup lang="ts">
import DSButton from '@/design-system/DSButton.vue';

const handleSave = () => { /* ... */ };
const handleCancel = () => { /* ... */ };
const handleDelete = () => { /* ... */ };
</script>
```

#### Tokens Utilizados

- Cores: `--primary`, `--primary-hover`, `--secondary`, `--danger`, `--warning`
- Radius: Variável via Quasar

---

### DSCard

Cards com header, body e footer opcionais.

**Localização**: `src/design-system/DSCard.vue`

#### Props

```typescript
interface Props {
  title?: string;
  flat?: boolean;
  bordered?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  showDivider?: boolean;
  footerAlign?: 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly';
}
```

#### Slots

- `default`: Conteúdo principal do card
- `header`: Header customizado (sobrescreve title)
- `headerActions`: Ações no header
- `content`: Conteúdo do body
- `footer`: Footer do card

#### Exemplo de Uso

```vue
<template>
  <DSCard
    title="Estatísticas"
    shadow="md"
    :show-divider="true"
  >
    <template #headerActions>
      <DSButton
        icon="refresh"
        variant="ghost"
        size="sm"
        @click="refresh"
      />
    </template>

    <template #content>
      <p>Conteúdo do card...</p>
    </template>

    <template #footer>
      <DSButton
        label="Ver detalhes"
        variant="outline"
        size="sm"
      />
    </template>
  </DSCard>
</template>

<script setup lang="ts">
import DSCard from '@/design-system/DSCard.vue';

const refresh = () => { /* ... */ };
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`
- Radius: `--radius-lg`
- Text: `--text-primary`, `--text-secondary`, `--text-lg`
- Spacing: `--space-2`, `--space-3`, `--space-4`, `--space-6`
- Shadow: `--shadow-md`, `--shadow-lg`, `--shadow-xl`

---

### DSTextField

Inputs de texto com validação e estados de erro.

**Localização**: `src/design-system/DSTextField.vue`

#### Props

```typescript
interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  icon?: string;
  type?: string;
  outlined?: boolean;
  dense?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Emits

```typescript
emit('update:modelValue', value);
emit('clear');
```

#### Slots

- `hint`: Texto de ajuda customizado

#### Exemplo de Uso

```vue
<template>
  <DSTextField
    v-model="email"
    label="E-mail"
    placeholder="seu@email.com"
    icon="email"
    type="email"
    :error="!isValidEmail"
    error-message="E-mail inválido"
    helper-text="Digite seu endereço de e-mail"
    clearable
  />

  <DSTextField
    v-model="password"
    label="Senha"
    type="password"
    icon="lock"
    dense
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DSTextField from '@/design-system/DSTextField.vue';

const email = ref('');
const password = ref('');

const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
});
</script>
```

#### Tokens Utilizados

- Radius: `--radius-sm`
- Text: `--text-sm`, `--text-lg`

---

### DSSelect

Select dropdown com opções e validação.

**Localização**: `src/design-system/DSSelect.vue`

#### Props

```typescript
interface Props {
  modelValue: any;
  options: any[];
  label?: string;
  placeholder?: string;
  icon?: string;
  outlined?: boolean;
  dense?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  loading?: boolean;
  optionLabel?: string;
  optionValue?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Emits

```typescript
emit('update:modelValue', value);
```

#### Slots

- `hint`: Texto de ajuda customizado

#### Exemplo de Uso

```vue
<template>
  <DSSelect
    v-model="selectedProject"
    label="Projeto"
    :options="projects"
    option-label="name"
    option-value="id"
    placeholder="Selecione um projeto"
    icon="folder"
    clearable
  />

  <DSSelect
    v-model="tags"
    label="Tags"
    :options="availableTags"
    placeholder="Selecione tags"
    multiple
    dense
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DSSelect from '@/design-system/DSSelect.vue';

interface Project {
  id: number;
  name: string;
}

const selectedProject = ref<number | null>(null);
const tags = ref<string[]>([]);
const projects = ref<Project[]>([
  { id: 1, name: 'Projeto A' },
  { id: 2, name: 'Projeto B' },
]);
const availableTags = ref(['tag1', 'tag2', 'tag3']);
</script>
```

#### Tokens Utilizados

- Radius: `--radius-sm`
- Text: `--text-sm`, `--text-lg`

---

### DSModal

Modais com header, body e footer.

**Localização**: `src/design-system/DSModal.vue`

#### Props

```typescript
interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  persistent?: boolean;
  maximized?: boolean;
  loading?: boolean;
  confirmLabel?: string;
  hasFooter?: boolean;
}
```

#### Emits

```typescript
emit('update:modelValue', value);
emit('confirm');
emit('cancel');
emit('hide');
```

#### Slots

- `body`: Conteúdo customizado do body
- `footer`: Footer customizado

#### Exemplo de Uso

```vue
<template>
  <div>
    <DSButton
      label="Abrir Modal"
      @click="isOpen = true"
    />

    <DSModal
      v-model="isOpen"
      title="Confirmar Ação"
      message="Tem certeza que deseja continuar?"
      confirm-label="Confirmar"
      :loading="isSubmitting"
      @confirm="handleConfirm"
    />

    <DSModal
      v-model="isCustomModalOpen"
      title="Modal Customizado"
      :has-footer="false"
    >
      <template #body>
        <p>Conteúdo customizado do modal</p>
        <DSTextField
          v-model="inputValue"
          label="Digite algo"
        />
      </template>
    </DSModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DSModal from '@/design-system/DSModal.vue';
import DSTextField from '@/design-system/DSTextField.vue';
import DSButton from '@/design-system/DSButton.vue';

const isOpen = ref(false);
const isCustomModalOpen = ref(false);
const isSubmitting = ref(false);
const inputValue = ref('');

const handleConfirm = async () => {
  isSubmitting.value = true;
  await performAction();
  isSubmitting.value = false;
  isOpen.value = false;
};

const performAction = async () => {
  /* ... */
};
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`
- Radius: `--radius-lg`
- Text: `--text-primary`, `--text-secondary`, `--text-xl`
- Spacing: `--space-3`, `--space-4`, `--space-6`
- Shadow: `--shadow-2xl`

---

### DSTable

Tabelas com scroll, sticky header e paginação.

**Localização**: `src/design-system/DSTable.vue`

#### Props

```typescript
interface Props {
  rows: any[];
  columns: QTableProps['columns'];
  loading?: boolean;
  rowsPerPageOptions?: number[];
  flat?: boolean;
  bordered?: boolean;
  virtualScroll?: boolean;
  stickyHeader?: boolean;
  dense?: boolean;
  maxHeight?: string;
}
```

#### Slots

Suporta todos os slots nativos do Quasar q-table:
- `body-cell-${name}`
- `header-cell-${name}`
- `top`
- `bottom`
- etc.

#### Exemplo de Uso

```vue
<template>
  <DSTable
    :rows="tasks"
    :columns="columns"
    :loading="isLoading"
    sticky-header
    dense
    max-height="400px"
  >
    <template #body-cell-actions="props">
      <q-td :props="props">
        <DSButton
          icon="edit"
          variant="ghost"
          size="sm"
          @click="editTask(props.row)"
        />
        <DSButton
          icon="delete"
          variant="danger"
          size="sm"
          @click="deleteTask(props.row.id)"
        />
      </q-td>
    </template>
  </DSTable>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DSTable from '@/design-system/DSTable.vue';

interface Task {
  id: number;
  name: string;
  status: string;
}

const tasks = ref<Task[]>([]);
const isLoading = ref(false);

const columns = [
  { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'right', sortable: false },
];

const editTask = (task: Task) => { /* ... */ };
const deleteTask = (id: number) => { /* ... */ };
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`, `--bg-secondary`
- Border: `--border-color`, `--divider-color`
- Radius: `--radius-md`
- Text: `--text-primary`, `--text-secondary`, `--text-sm`
- Spacing: `--space-2`, `--space-3`, `--space-4`
- Font: `--font-semibold`

---

### DSBadge

Badges/etiquetas para categorização e status.

**Localização**: `src/design-system/DSBadge.vue`

#### Props

```typescript
interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  outline?: boolean;
}
```

#### Variantes

- `primary`: Badge primária (azul)
- `secondary`: Badge secundária (verde-azulado)
- `success`: Badge de sucesso (verde)
- `danger`: Badge de erro/perigo (vermelho)
- `warning`: Badge de aviso (amarelo)
- `info`: Badge informativa (ciano)

#### Tamanhos

- `sm`: Pequeno (0.75rem font)
- `md`: Médio (0.875rem font, default)
- `lg`: Grande (1rem font)

#### Exemplo de Uso

```vue
<template>
  <div class="badge-examples">
    <DSBadge
      label="Ativo"
      variant="success"
    />

    <DSBadge
      label="Pendente"
      variant="warning"
    />

    <DSBadge
      label="Erro"
      variant="danger"
      icon="error"
    />

    <DSBadge
      label="Novo"
      variant="primary"
      :outline="true"
    />

    <DSBadge size="sm">
      small
    </DSBadge>

    <DSBadge size="lg">
      large
    </DSBadge>
  </div>
</template>

<script setup lang="ts">
import DSBadge from '@/design-system/DSBadge.vue';
</script>
```

#### Tokens Utilizados

- Cores: `--primary`, `--secondary`, `--success`, `--danger`, `--warning`, `--info`
- Font: `--font-medium`

---

### DSNotification

Notificações toast com variantes de tipo.

**Localização**: `src/design-system/DSNotification.vue`

#### Props

Nenhuma props (usa store Vuex para gerenciar notificações)

#### Tipos de Notificação

```typescript
enum NotificationType {
  SUCCESS = 'success',
  WARNING = 'warning',
  FAILED = 'failed',
}
```

#### Exemplo de Uso

```vue
<template>
  <div>
    <DSNotification />
  </div>
</template>

<script setup lang="ts">
import DSNotification from '@/design-system/DSNotification.vue';
</script>
```

**Para enviar notificações:**

```typescript
import { useStore } from '@/store';
import { Notification, NotificationType } from '@/interfaces/Notification.interface';

const store = useStore();

const showSuccess = () => {
  store.commit('ADD_NOTIFICATION', {
    id: Date.now(),
    type: NotificationType.SUCCESS,
    title: 'Sucesso',
    content: 'Ação realizada com sucesso!',
  } as Notification);
};

const showError = () => {
  store.commit('ADD_NOTIFICATION', {
    id: Date.now(),
    type: NotificationType.FAILED,
    title: 'Erro',
    content: 'Ocorreu um erro ao realizar a ação.',
  } as Notification);
};
```

#### Tokens Utilizados

- Background: `--bg-primary`
- Border: `--border-color`
- Radius: `--radius-lg`
- Text: `--text-primary`, `--text-secondary`, `--text-sm`
- Spacing: `--space-2`, `--space-3`, `--space-4`
- Shadow: `--shadow-2xl`
- Cores: `--success`, `--danger`, `--warning`, `--info`

---

### DSPageHeader

Headers de página com título, subtítulo e botão de voltar.

**Localização**: `src/design-system/DSPageHeader.vue`

#### Props

```typescript
interface Props {
  title?: string;
  subtitle?: string;
  backButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Slots

- `left`: Conteúdo customizado à esquerda
- `right`: Conteúdo customizado à direita

#### Exemplo de Uso

```vue
<template>
  <DSPageHeader
    title="Dashboard"
    subtitle="Visão geral do seu progresso"
    :back-button="true"
  >
    <template #right>
      <DSButton
        icon="refresh"
        variant="ghost"
        @click="refresh"
      />
    </template>
  </DSPageHeader>
</template>

<script setup lang="ts">
import DSPageHeader from '@/design-system/DSPageHeader.vue';

const refresh = () => { /* ... */ };
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`
- Border: `--border-color`
- Text: `--text-primary`, `--text-secondary`, `--text-2xl`, `--text-sm`
- Spacing: `--space-1`, `--space-3`, `--space-4`, `--space-6`, `--space-8`, `--space-10`
- Font: `--font-bold`

---

### DSToolbar

Toolbar com seções esquerda, centro e direita.

**Localização**: `src/design-system/DSToolbar.vue`

#### Props

```typescript
interface Props {
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
}
```

#### Slots

- `left`: Conteúdo à esquerda (título padrão)
- `center`: Conteúdo centralizado
- `right`: Conteúdo à direita
- `default`: Fallback para slot `right`

#### Exemplo de Uso

```vue
<template>
  <DSToolbar
    title="Ferramentas"
    :bordered="true"
    size="md"
  >
    <template #center>
      <DSBadge label="Filtrado" variant="info" />
    </template>

    <template #right>
      <DSButton
        icon="add"
        label="Novo"
        variant="primary"
        @click="handleCreate"
      />
    </template>
  </DSToolbar>
</template>

<script setup lang="ts">
import DSToolbar from '@/design-system/DSToolbar.vue';

const handleCreate = () => { /* ... */ };
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`
- Border: `--border-color`
- Radius: `--radius-md`
- Text: `--text-primary`, `--text-xl`
- Spacing: `--space-3`, `--space-4`, `--space-5`
- Font: `--font-semibold`

---

### DSEmptyState

Estado vazio com ícone, título e mensagem.

**Localização**: `src/design-system/DSEmptyState.vue`

#### Props

```typescript
interface Props {
  title?: string;
  message?: string;
  icon?: string;
  iconSize?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Slots

- `default`: Ações customizadas (botões, etc.)

#### Exemplo de Uso

```vue
<template>
  <DSEmptyState
    title="Nenhum dado encontrado"
    message="Não há itens para exibir no momento."
    icon="inbox"
  >
    <DSButton
      label="Criar novo"
      variant="primary"
      @click="handleCreate"
    />
  </DSEmptyState>
</template>

<script setup lang="ts">
import DSEmptyState from '@/design-system/DSEmptyState.vue';

const handleCreate = () => { /* ... */ };
</script>
```

#### Tokens Utilizados

- Text: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-xl`, `--text-base`
- Spacing: `--space-3`, `--space-4`, `--space-6`, `--space-12`
- Font: `--font-semibold`

---

### ButtonWithTooltip

Botão com tooltip integrado.

**Localização**: `src/design-system/ButtonWithTooltip.vue`

#### Exemplo de Uso

```vue
<template>
  <ButtonWithTooltip
    icon="help"
    tooltip="Clique para ajuda"
    @click="handleHelp"
  />
</template>

<script setup lang="ts">
import ButtonWithTooltip from '@/design-system/ButtonWithTooltip.vue';

const handleHelp = () => { /* ... */ };
</script>
```

---

### StreakOffensive

Display visual de streak/ofensiva.

**Localização**: `src/design-system/StreakOffensive.vue`

#### Exemplo de Uso

```vue
<template>
  <StreakOffensive
    :days="7"
    :is-active="true"
  />
</template>

<script setup lang="ts">
import StreakOffensive from '@/design-system/StreakOffensive.vue';
</script>
```

---

## Componentes de Skeleton

### Skeleton/DSCard

Skeleton de card para loading states.

**Localização**: `src/design-system/Skeleton/DSCard.vue`

#### Exemplo de Uso

```vue
<template>
  <SkeletonDSCard />
</template>

<script setup lang="ts">
import { DSCard as SkeletonDSCard } from '@/design-system/Skeleton';
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`, `--bg-secondary`
- Border: `--border-color`
- Radius: `--radius-md`, `--radius-sm`
- Text: `--text-primary`
- Spacing: `--space-3`, `--space-4`, `--space-6`

---

### Skeleton/DSDate

Skeleton de data para loading states.

**Localização**: `src/design-system/Skeleton/DSDate.vue`

#### Exemplo de Uso

```vue
<template>
  <SkeletonDSDate />
</template>

<script setup lang="ts">
import { DSDate as SkeletonDSDate } from '@/design-system/Skeleton';
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`, `--bg-secondary`
- Border: `--border-color`
- Radius: `--radius-lg`
- Text: `--text-primary`

---

### Skeleton/DSTable

Skeleton de tabela para loading states.

**Localização**: `src/design-system/Skeleton/DSTable.vue`

#### Exemplo de Uso

```vue
<template>
  <SkeletonDSTable />
</template>

<script setup lang="ts">
import { DSTable as SkeletonDSTable } from '@/design-system/Skeleton';
</script>
```

#### Tokens Utilizados

- Background: `--bg-primary`, `--bg-secondary`
- Border: `--border-color`
- Radius: `--radius-md`, `--radius-sm`
- Spacing: `--space-3`, `--space-4`, `--space-6`

---

## Componentes de Texto

### Texts/DSHeading

Headings H1-H6 com tamanhos consistentes.

**Localização**: `src/design-system/Texts/DSHeading.vue`

#### Props

```typescript
interface Props {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
```

#### Exemplo de Uso

```vue
<template>
  <DSHeading level="h1">
    Título Principal
  </DSHeading>

  <DSHeading level="h2">
    Subtítulo
  </DSHeading>

  <DSHeading level="h3">
    Seção
  </DSHeading>
</template>

<script setup lang="ts">
import DSHeading from '@/design-system/Texts/DSHeading.vue';
</script>
```

#### Tokens Utilizados

- Text: `--text-primary`, `--text-3xl`, `--text-2xl`, `--text-xl`, `--text-lg`, `--text-base`, `--text-sm`
- Font: `--font-bold`

---

## Padrões de Uso

### Importação

Todos os componentes podem ser importados individualmente:

```typescript
import DSButton from '@/design-system/DSButton.vue';
import DSCard from '@/design-system/DSCard.vue';
import { DSCard as SkeletonDSCard } from '@/design-system/Skeleton';
```

### TypeScript

Todos os componentes possuem interfaces TypeScript bem definidas:

```typescript
interface Props {
  // Propriedades tipadas
}

const emit = defineEmits<{
  'event-name': [payload: Type];
}>();
```

### Slots

Componentes usam slots para flexibilidade:

```vue
<DSCard>
  <template #header>
    <!-- Header customizado -->
  </template>

  <template #footer>
    <!-- Footer customizado -->
  </template>

  <!-- Conteúdo padrão -->
</DSCard>
```

### Dark Mode

Todos os componentes suportam dark mode automaticamente via tokens CSS:

```css
body.body--dark {
  /* Tokens adaptados para dark mode */
}
```

---

## Dark Mode

### Ativação Global

Adicione a classe `body.body--dark` ao elemento `<body>`:

```typescript
const toggleDarkMode = () => {
  document.body.classList.toggle('body--dark');
};
```

### Ativação por Componente

Todos os componentes DS suportam dark mode automaticamente.

---

## TypeScript

### Interfaces

Todos os componentes usam interfaces TypeScript para props:

```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
```

### Emits

Emits são tipados para segurança:

```typescript
const emit = defineEmits<{
  'update:modelValue': [value: string];
  'click': [event: MouseEvent];
}>();
```

---

## Boas Práticas

### 1. Use Sempre Tokens

```scss
/* ✅ Bom */
.my-component {
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

/* ❌ Ruim */
.my-component {
  padding: 16px;
  border-radius: 8px;
}
```

### 2. Preferir Componentes DS sobre Quasar Direto

```vue
<!-- ✅ Bom -->
<DSButton label="Salvar" />

<!-- ❌ Ruim -->
<q-btn label="Salvar" />
```

### 3. Usar Slots para Customização

```vue
<!-- ✅ Bom -->
<DSCard>
  <template #header>
    <div>Header customizado</div>
  </template>
</DSCard>

<!-- ❌ Ruim -->
<DSCard title="Título fixo" />
```

### 4. Manter Consistência de Tamanhos

```vue
<!-- ✅ Bom - Tamanhos consistentes -->
<DSTextField size="md" />
<DSButton size="md" />
<DSSelect size="md" />

<!-- ❌ Ruim - Tamanhos inconsistentes -->
<DSTextField size="sm" />
<DSButton size="lg" />
```

---

## Referências

- **Design Tokens**: `docs/DESIGN_SYSTEM.md`
- **Tokens CSS**: `src/styles/design-tokens.css`
- **Tailwind Config**: `tailwind.config.js`
- **Quasar Config**: `src/styles/quasar.variables.scss`
- **Guia de Desenvolvedores**: `AGENTS.md`

---

## Índice de Componentes

| Componente | Tipo | Descrição |
|-----------|------|-----------|
| DSButton | Principal | Botões com variantes e tamanhos |
| DSCard | Principal | Cards com header/body/footer |
| DSTextField | Principal | Inputs de texto com validação |
| DSSelect | Principal | Select dropdown |
| DSModal | Principal | Modais com header/body/footer |
| DSTable | Principal | Tabelas com scroll e paginação |
| DSBadge | Principal | Badges/etiquetas |
| DSNotification | Principal | Notificações toast |
| DSPageHeader | Principal | Headers de página |
| DSToolbar | Principal | Toolbar com seções |
| DSEmptyState | Principal | Estado vazio |
| ButtonWithTooltip | Auxiliar | Botão com tooltip |
| StreakOffensive | Auxiliar | Display de streak |
| Skeleton/DSCard | Skeleton | Skeleton de card |
| Skeleton/DSDate | Skeleton | Skeleton de data |
| Skeleton/DSTable | Skeleton | Skeleton de tabela |
| Texts/DSHeading | Texto | Headings H1-H6 |

---

**Última Atualização**: Março 2026
**Versão**: 1.0.0
**Total de Componentes**: 17
