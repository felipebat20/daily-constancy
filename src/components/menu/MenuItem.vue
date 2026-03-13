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
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    color: white;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &--active {
      background-color: #027BE3;
      box-shadow: 0 2px 8px rgba(2, 123, 227, 0.4);
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
  }
</style>
