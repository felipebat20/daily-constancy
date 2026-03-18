<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const props = defineProps({
    menuItem: {
      type: Object as () => {
        name: string;
        icon: string;
        label: string;
        to: string;
        hide?: boolean;
      },
      required: true,
    },
  });

  const isActive = computed(() => {
    return route.path === props.menuItem.to;
  });
</script>

<template>
  <li
    v-if="! menuItem.hide"
    class="menu-item"
  >
    <router-link
      :to="menuItem.to"
      class="menu-item__link"
      :class="{ 'menu-item__link--active': isActive }"
      :aria-current="isActive ? 'page' : undefined"
    >
      <q-icon
        :name="menuItem.icon"
        size="24px"
        color="white"
      />

      <q-tooltip
        anchor="center right"
        self="center left"
        :offset="[8, 8]"
      >
        {{ menuItem.label }}
      </q-tooltip>
    </router-link>
  </li>
</template>

<style scoped lang="scss">
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .menu-item__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    color: rgba(255, 255, 255, 0.7);
    transition: all var(--transition-base);
    text-decoration: none;
    position: relative;

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
      color: white;
      transform: translateY(-2px);
    }

    &--active {
      background: linear-gradient(135deg, var(--primary-accent) 0%, var(--primary-accent-dark) 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);

      :deep(.q-icon) {
        transform: scale(1.1);
      }
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }

    :deep(.q-icon) {
      transition: transform var(--transition-base);
    }
  }
</style>
