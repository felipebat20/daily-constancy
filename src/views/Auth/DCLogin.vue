<template>
  <div class="auth-page">
    <div class="auth-page__wrapper">
      <div class="auth-page__card">
        <h1 class="auth-page__title">
          Sign in to Daily Constancy
        </h1>

        <p class="auth-page__subtitle">
          Use your email and password to access your account
        </p>

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

          <div class="auth-page__form-actions">
            <q-checkbox
              v-model="remember_me"
              label="Remember me"
              color="primary"
              dense
              class="auth-page__checkbox"
            />

            <router-link
              to="/forgot-password"
              class="auth-page__forgot"
            >
              Forgot password?
            </router-link>
          </div>

          <DSButton
            type="submit"
            label="Sign in"
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
            Sign up
          </router-link>
        </div>
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
const remember_me = ref(false);
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

  &__wrapper {
    width: 100%;
    max-width: 400px;
  }

  &__card {
    background: #FFFFFF;
    padding: var(--space-8);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &__title {
    margin: 0 0 var(--space-1) 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  &__subtitle {
    margin: 0 0 var(--space-6) 0;
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: 1.5;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    margin-bottom: var(--space-6);
  }

  &__form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__checkbox {
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }

  &__forgot {
    font-size: var(--text-sm);
    color: var(--primary-accent);
    text-decoration: none;
    font-weight: var(--font-normal);
    transition: color var(--transition-base);

    &:hover {
      color: var(--primary-accent-hover);
      text-decoration: underline;
    }
  }

  &__submit {
    width: 100%;
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
  }

  &__footer-text {
    color: var(--text-secondary);
  }

  &__link {
    color: var(--primary-accent);
    text-decoration: none;
    font-weight: var(--font-semibold);
    transition: color var(--transition-base);

    &:hover {
      color: var(--primary-accent-hover);
      text-decoration: underline;
    }
  }
}

@media (max-width: 640px) {
  .auth-page {
    padding: var(--space-4);

    &__card {
      padding: var(--space-6);
    }
  }
}
</style>
