<script setup lang="ts">
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const getIsActive = (path: string) => {
    return route.path === path;
  };

  defineProps({
    menuItem: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <li
    v-if="! menuItem.hide"
    class="flex items-center justify-center hover:bg-blue-5"
  >
    <router-link
      :to="menuItem.to"
      class="link flex justify-center p-2 hover:bg-sky-700 rounded"
      :class="{ 'bg-blue-500': getIsActive(menuItem.to) }"
    >
      <q-icon
        size="24px"
        color="white"
        :name="menuItem.icon"
        style="display: inline-block;"
      />

      <q-tooltip
        anchor="center right"
        self="center left"
        :offset="[8, 8]"
        class="bg-dark"
      >
        {{ menuItem.label }}
      </q-tooltip>
    </router-link>
  </li>
</template>
