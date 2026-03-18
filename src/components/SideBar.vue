<template>
  <div
    v-if="! $q.screen.gt.xs"
    class="top-bar"
  >
    <div class="top-bar__left">
      <router-link
        to="/"
        class="top-bar__logo"
      >
        <q-img
          src="../assets/daily-constancy.png"
          alt="Daily Constancy logo"
          class="top-bar__logo-img"
        />
      </router-link>

      <span class="top-bar__title">
        Daily Constancy
      </span>
    </div>

    <div>
      <q-btn
        flat
        round
        dense
        @click="switchTheme"
        aria-label="Toggle theme"
      >
        <q-icon
          :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          color="white"
          size="24px"
        />

        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[8, 8]"
        >
          {{ $q.dark.isActive ? 'Switch to light theme' : 'Switch to dark theme' }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>

  <header :class="['sidebar', { 'sidebar--mobile': ! $q.screen.gt.xs }]">
    <div
      v-if="$q.screen.gt.xs"
      class="sidebar__logo"
    >
      <router-link to="/">
        <q-img
          src="../assets/daily-constancy.png"
          alt="Daily Constancy logo"
          class="sidebar__logo-img"
        />
      </router-link>
    </div>

    <nav class="sidebar__nav">
      <MenuIndex />
    </nav>

    <div
      v-if="$q.screen.gt.xs"
      class="sidebar__actions"
    >
      <q-btn
        flat
        round
        dense
        @click="switchTheme"
        aria-label="Toggle theme"
      >
        <q-icon
          :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          color="white"
          size="24px"
        />

        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[8, 8]"
        >
          {{ $q.dark.isActive ? 'Switch to light theme' : 'Switch to dark theme' }}
        </q-tooltip>
      </q-btn>

      <q-btn
        v-if="user_is_authenticated"
        flat
        round
        dense
        @click="handleLogout"
        aria-label="Logout"
      >
        <q-icon
          name="logout"
          color="white"
          size="24px"
        />

        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[8, 8]"
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
  import { handleUserLogout } from './menu/MenuMixin';

  export default defineComponent({
    name: 'SideBar',
    components: { MenuIndex },

    setup() {
      const { logout } = handleUserLogout();
      const $q = useQuasar();
      const user_is_authenticated = ref(!! jwtToken());

      onBeforeMount(() => {
        const dark = localStorage.getItem(dark_theme_key);
        $q.dark.set(!! dark);
        document.body.classList.toggle('body--dark', !! dark);
      });

      const switchTheme = () => {
        $q.dark.toggle();
        const isDark = $q.dark.isActive;
        document.body.classList.toggle('body--dark', isDark);

        if (isDark) {
          localStorage.setItem(dark_theme_key, '1');
        } else {
          localStorage.removeItem(dark_theme_key);
        }
      };

      const handleLogout = () => {
        logout($q);
      };

      return {
        user_is_authenticated,
        switchTheme,
        handleLogout,
      };
    },
  });
</script>

<style scoped lang="scss">
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background-color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-4);
    z-index: 100;
    transition: background-color var(--transition-slow);
    box-shadow: var(--shadow-md);

    &__left {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    &__logo {
      display: flex;
      align-items: center;
      transition: transform var(--transition-base);
      
      &:hover {
        transform: scale(1.05);
      }
    }

    &__logo-img {
      width: 2rem;
      height: 2rem;
      max-width: 2rem;
    }

    &__title {
      color: white;
      font-size: var(--text-base);
      font-weight: var(--font-semibold);
      letter-spacing: -0.01em;
    }
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 72px;
    height: 100vh;
    background: linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-5) 0;
    gap: var(--space-8);
    z-index: 100;
    transition: all var(--transition-slow);
    box-shadow: var(--shadow-xl);

    &__logo {
      margin-top: 0;
      transition: transform var(--transition-base);
      
      &:hover {
        transform: scale(1.1);
      }
    }

    &__logo-img {
      width: 2.25rem;
      height: 2.25rem;
      max-width: 2.25rem;
    }

    &__nav {
      flex: 1;
      display: flex;
      align-items: center;
      width: 100%;
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      margin-bottom: var(--space-6);
    }

    :deep(.q-btn) {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      transition: all var(--transition-base);
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    :deep(.q-icon) {
      transition: transform var(--transition-base);
    }

    &--mobile {
      top: auto;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 64px;
      flex-direction: row;
      justify-content: center;
      padding: 0 var(--space-4);
      gap: 0;
      background: linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);

      .sidebar__logo {
        display: none;
      }

      .sidebar__actions {
        display: none;
      }

      :deep(.menu) {
        ul {
          display: flex;
          width: 100%;
          justify-content: space-around;
          gap: var(--space-2);
        }

        a {
          border-radius: var(--radius-lg);
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .sidebar:not(.sidebar--mobile) {
      display: none;
    }
  }
</style>
