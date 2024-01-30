<template>
  <div class="top-bar">
    <div>
      <router-link
        style="{ height: 2rem; width: 2rem;}"
        to="/"
      >
        <q-img
          src="../assets/treker.png"
          alt="logo"
          class="mt-2"
          style="max-width: 2rem;"
        />
      </router-link>
    </div>

    <div>
      Daily Constancy
    </div>

    <div>
      <q-btn
        class="switch-theme button "
        @click="switchTheme"
      >
        <q-icon
          size="24px"
          v-if="! dark_theme"
          name="dark_mode"
          color="white"
        />

        <q-icon
          size="24px"
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
    </div>
  </div>

  <header :class="{ 'sidebar-mobile': ! $q.screen.gt.xs }">
    <div
      v-if="$q.screen.gt.xs"
      class="is-flex justify-center"
    >
      <router-link
        style="{ height: 2rem; width: 2rem;}"
        to="/"
      >
        <q-img
          src="../assets/treker.png"
          alt="logo"
          class="mt-2"
          style="max-width: 2rem;"
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
            <q-icon
              size="24px"
              name="tasks"
              style="display: inline-block;"
            />

            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[8, 8]"
              class="bg-dark"
            >
              Tasks
            </q-tooltip>
          </router-link>
        </li>

        <li>
          <router-link
            to="/projects"
            class="link is-flex justify-center"
            :class="{ 'is-active': getIsActive('/projects') }"
          >
            <q-icon
              size="24px"
              name="account_tree"
            />

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
            <q-icon
              size="24px"
              name="analytics"
            />

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

        <li v-if="user_is_authenticated">
          <router-link
            to="/streaks"
            class="link is-flex justify-center"
            :class="{ 'is-active': getIsActive('/streaks') }"
          >
            <q-icon
              size="24px"
              name="whatshot"
            />

            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[8, 8]"
              class="bg-dark"
            >
              Streaks
            </q-tooltip>
          </router-link>
        </li>

        <li v-if="! user_is_authenticated">
          <router-link
            to="/login"
            class="link is-flex justify-center"
            :class="{ 'is-active': getIsActive('/login') }"
          >
            <q-icon
              size="24px"
              name="account_circle"
            />

            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[8, 8]"
              class="bg-dark"
            >
              Profile
            </q-tooltip>
          </router-link>
        </li>
      </ul>
    </aside>

    <div
      v-if="$q.screen.gt.xs"
      class="bottom-buttons"
    >
      <q-btn
        class="switch-theme button "
        @click="switchTheme"
      >
        <q-icon
          size="24px"
          v-if="! dark_theme"
          name="dark_mode"
          color="white"
        />

        <q-icon
          size="24px"
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

      <q-btn
        v-if="user_is_authenticated"
        class="switch-theme button"
        @click="handleLogout"
      >
        <q-icon
          size="24px"
          name="logout"
          color="white"
        />

        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[8, 8]"
          class="bg-dark"
        >
          Logout
        </q-tooltip>
      </q-btn>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, ref, onBeforeMount } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRoute, useRouter } from 'vue-router';

  import { jwt, dark_theme as dark_theme_key } from '@/static/storage-keys';

  import { jwtToken } from '@/hooks/verify_api';
  import { useStore } from '@/store';
  import { FETCH_PROJECTS, FETCH_TASKS } from '@/store/types/actions';

  export default defineComponent({
    name: 'SideBar',
    emits: ['onSwitchTheme'],
    computed: {
      getThemeText(): string {
        if (this.dark_theme) {
          return 'Switch to light theme';
        }

        return 'Switch to dark theme';
      },
    },

    setup(props, { emit }) {
      const $q = useQuasar();
      const route = useRoute();
      const router = useRouter();
      const store = useStore();
      const user_is_authenticated = ref(!! jwtToken());
      const dark_theme = ref(false);

      onBeforeMount(() => {
        const dark = localStorage.getItem(dark_theme_key);

        $q.dark.set(!! dark);
        dark_theme.value = !! dark;
        emit('onSwitchTheme', !! dark);

        return dark_theme.value = !! dark;
      });

      const handleLogout = () => {
        $q.cookies.remove(jwt);

        user_is_authenticated.value = false;
        store.dispatch(FETCH_TASKS);
        store.dispatch(FETCH_PROJECTS);

        if (route.name !== 'tasks') {
          router.push({ name: 'tasks' });
        }

        return $q.notify({
          type: 'positive',
          progress: true,
          icon: 'done',
          message: 'You have been logout.',
          position: 'top',
        });
      };

      const switchTheme = () => {
        $q.dark.toggle();
        dark_theme.value = ! dark_theme.value;
        emit('onSwitchTheme', dark_theme.value);
        handleDarkThemeState(dark_theme.value);
      };

      const handleDarkThemeState = (dark: boolean) => {
        if (dark) {
          return localStorage.setItem(dark_theme_key, '1');
        }

        return localStorage.removeItem(dark_theme_key);
      };

      return {
        dark_theme,
        switchTheme,
        handleLogout,
        user_is_authenticated,
      };
    },

    methods: {
      getIsActive(path: string) {
        return this.$route.path === path;
      },
    },
  });
</script>

<style lang="scss" scoped>
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

  .link { color: #fff; }
  .bottom-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    margin-bottom: 30px;
  }

  .sidebar-mobile {
    position: fixed;
    bottom: 0;
    z-index: 3;
    width: 100%;
    padding: 10px;

    .menu {
      ul {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 10px;

        li a {
          border-radius: 8px;
        }
      }
    }
  }

  .top-bar {
    display: flex;
    width: 100%;
    position: fixed;
    background: #0d3b66;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    z-index: 3;

    > div { display: flex; }
  }
</style>
