<template>
  <header>
    <div class="is-flex justify-center">
      <router-link
        style="{ height: 32px; width: 32px;}"
        to="/"
      >
        <q-img
          src="../assets/treker.png"
          alt="logo"
          class="mt-2"
          style="max-width: 32px;"
        />
      </router-link>
    </div>

    <aside class="menu">
      <ul class="menu-list text-left">
        <li>
          <router-link
            to="/"
            class="link is-flex justify-center"
            :class="{ 'is-active': getIsActive('/') }"
          >
            <q-icon name="tasks" />

            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[8, 8]"
              class="bg-dark"
            >
              Timers
            </q-tooltip>
          </router-link>
        </li>

        <li>
          <router-link
            to="/projects"
            class="link is-flex justify-center"
            :class="{ 'is-active': getIsActive('/projects') }"
          >
            <i class="fas fa-project-diagram" />

            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[8, 8]"
              class="bg-dark"
            >
              Projects
            </q-tooltip>
          </router-link>
        </li>

        <li>
          <router-link
            to="/reports"
            class="link is-flex justify-center"
            :class="{ 'is-active': getIsActive('/reports') }"
          >
            <i class="fa-solid fa-chart-pie" />

            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[8, 8]"
              class="bg-dark"
            >
              Reports
            </q-tooltip>
          </router-link>
        </li>
      </ul>
    </aside>

    <q-btn
      class="switch-theme button mt-auto"
      @click="switchTheme"
    >
      <q-icon
        v-if="! dark_theme"
        name="dark_mode"
        color="white"
      />

      <q-icon
        v-else
        name="light_mode"
        color="white"
      />

      <q-tooltip
        anchor="center right"
        self="center left"
        :offset="[8, 8]"
        class="bg-dark"
      >
        {{ getThemeText }}
      </q-tooltip>
    </q-btn>
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
    padding: .5rem;
    background: #0d3b66;
    position: fixed;
    height: 100vh;
    width: 64px;
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
