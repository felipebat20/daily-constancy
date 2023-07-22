<template>
  <header>
    <h1>
      <img
        src="../assets/logo.png"
        alt="logo"
      >
    </h1>

    <button
      class="button"
      @click="switchTheme"
    >
      {{ getThemeText }}
    </button>

    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link
            to="/"
            class="link"
          >
            <i class="fas fa-tasks" />

            tasks
          </router-link>
        </li>
        <li>
          <router-link
            to="/projects"
            class="link"
          >
            <i class="fas fa-project-diagram" />

            projects
          </router-link>
        </li>
      </ul>
    </nav>
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

<style scoped>
  header {
    padding: 1rem;
    background: #0d3b66;
    width: 355px;
    position: fixed;
    height: 100vh;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }

  .panel li {
    margin: 8px 0;
    text-align: left;
  }

  .link {
      color: #fff;
  }
  .link:hover {
      color: #FAF0CA;
  }
  .link.router-link-active {
      color: #FAF0CA;
  }
</style>
