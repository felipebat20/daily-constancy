<template>
  <header>
    <h1>
      <img
        src="../assets/logo.png"
        alt="logo"
      />
    </h1>

    <button
      class="button"
      @click="switchTheme"
    >
      {{ getThemeText }}
    </button>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SideBar',
    emits: ['onSwitchTheme'],
    data() {
      return { dark_theme: false };
    },

    computed: {
      getThemeText(): string {
        if (this.dark_theme) {
          return 'Switch to light theme';
        }

        return 'Switch to dark theme';
      }
    },

    methods: {
      switchTheme () {
        this.dark_theme = ! this.dark_theme;
        this.$emit('onSwitchTheme', this.dark_theme)
      },
    },
  });
</script>

<style>
  header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
</style>
