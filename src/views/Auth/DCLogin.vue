<template>
  <div class="auth-page">
    <div class="auth-page__content">
      <div class="auth-page__header">
        <h1 class="auth-page__title">
          Login
        </h1>

        <p class="auth-page__subtitle">
          Welcome back! Please login to your account.
        </p>
      </div>

      <form
        @submit="handleLogin"
        class="auth-page__form"
      >
        <DSTextField
          v-model="email"
          label="Email"
          placeholder="Enter your email"
          icon="email"
          type="email"
          autocomplete="email"
          aria-label="Email"
        />

        <DSTextField
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          icon="lock"
          type="password"
          autocomplete="current-password"
          @keyup.enter="handleLogin"
          aria-label="Password"
        />

        <DSButton
          type="submit"
          label="Login"
          icon="login"
          :loading="request_pending"
          variant="primary"
          class="auth-page__submit"
        />
      </form>

      <div class="auth-page__footer">
        <span class="auth-page__footer-text">
          Don't have an account?
        </span>

        <router-link
          :to="{ name: 'register' }"
          class="auth-page__link"
        >
          Create account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import DSTextField from '@/design-system/DSTextField.vue';
import DSButton from '@/design-system/DSButton.vue';

import { api } from '@/libs/api';
import { jwt } from '@/static/storage-keys';

const router = useRouter();
const $q = useQuasar();

const email = ref('');
const password = ref('');
const request_pending = ref(false);

const handleLogin = async() => {
  const body = {
    email: email.value,
    password: password.value,
  };

  request_pending.value = true;
  const { token } = await api.post('/login', body);
  request_pending.value = false;

  if (token) {
    $q.notify({
      progress: true,
      type: 'positive',
      message: 'Logado com sucesso.',
      icon: 'done',
      position: 'top-right',
    });

    $q.cookies.set(jwt, token, { expires: '7d' });
    return router.push({ path: '/' });
  }

  return $q.notify({
    progress: true,
    type: 'negative',
    message: 'Não foi possível realizar o login.',
    icon: 'error_outline',
    position: 'top-right',
  });
};
</script>

<style scoped lang="scss">
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background-color: var(--bg-secondary);

  &__content {
    width: 100%;
    max-width: 400px;
  }

  &__header {
    text-align: center;
    margin-bottom: var(--space-8);
  }

  &__title {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  &__subtitle {
    margin: 0;
    font-size: var(--text-base);
    color: var(--text-secondary);
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  &__submit {
    width: 100%;
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
  }

  &__footer-text {
    color: var(--text-secondary);
  }

  &__link {
    color: var(--primary);
    text-decoration: none;
    font-weight: var(--font-medium);
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
