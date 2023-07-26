<template>
  <header>
    <div>
      <img
        src="../assets/treker_logo.png"
        alt="logo"
        class="mt-2"
      >
    </div>

    <aside class="menu">
      <ul class="menu-list text-left">
        <li>
          <router-link
            to="/"
            class="link"
            :class="{ 'is-active': getIsActive('/') }"
          >
            <i class="fas fa-tasks" />

            Tasks
          </router-link>
        </li>

        <li>
          <router-link
            to="/projects"
            class="link"
            :class="{ 'is-active': getIsActive('/projects') }"
          >
            <i class="fas fa-project-diagram" />

            Projects
          </router-link>
        </li>
      </ul>
    </aside>

    <button
      class="switch-theme button mt-auto"
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


      getIsActive(path: string) {
        return this.$route.path === path;
      },
    },
  });
</script>

<style scoped>
  header {
    padding: 1rem;
    background: #0d3b66;
    position: fixed;
    height: 100vh;
    width: inherit;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  header h1, header button { text-align: center; }

  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }


  .link {
      color: #fff;
  }
</style>
