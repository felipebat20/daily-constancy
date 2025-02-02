<template>
  <div
    v-if="! $q.screen.gt.xs"
    class="top-bar"
  >
    <div>
      <router-link
        :style="{ height: '2rem', width: '2rem' }"
        to="/"
      >
        <q-img
          src="../assets/daily-constancy.png"
          alt="logo"
          style="max-width: 2rem;"
        />
      </router-link>
    </div>

    <p class="text-white m-0">
      Daily Constancy
    </p>

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
      class="flex justify-center"
    >
      <router-link
        :style="{ height: '2rem', width: '2rem' }"
        to="/"
      >
        <q-img
          src="../assets/daily-constancy.png"
          class="q-mt-sm"
          alt="logo"
          style="max-width: 2rem;"
        />
      </router-link>
    </div>

    <MenuIndex />

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
        dense
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

  import MenuIndex from '@/components/menu/MenuIndex.vue';

  import { jwtToken } from '@/hooks/verify_api';

  import { dark_theme as dark_theme_key } from '@/static/storage-keys';

  import { handleUserLogout} from './menu/MenuMixin';

  export default defineComponent({
    name: 'SideBar',
    emits: ['onSwitchTheme'],
    components: { MenuIndex },
    computed: {
      getThemeText(): string {
        if (this.dark_theme) {
          return 'Switch to light theme';
        }

        return 'Switch to dark theme';
      },
    },

    setup(props, { emit }) {
      const { logout } = handleUserLogout();

      const $q = useQuasar();
      const user_is_authenticated = ref(!! jwtToken());
      const dark_theme = ref(false);

      onBeforeMount(() => {
        const dark = localStorage.getItem(dark_theme_key);

        $q.dark.set(!! dark);
        dark_theme.value = !! dark;
        emit('onSwitchTheme', !! dark);

        return dark_theme.value = !! dark;
      });

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

      const handleLogout = () => {
        logout($q);
      };

      return {
        dark_theme,
        switchTheme,
        user_is_authenticated,
        handleLogout
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
    bottom: 0;
    z-index: 3;
    width: 100%;
    padding: 6px;

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

  a.is-active {
    background-color: #485fc7;
    color: #fff;
  }
</style>
