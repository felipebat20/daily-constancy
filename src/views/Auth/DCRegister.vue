<template>
  <div class="auth-page">
    <div class="auth-page__wrapper">
      <div class="auth-page__card">
        <h1 class="auth-page__title">
          Create your account
        </h1>

        <p class="auth-page__subtitle">
          Start tracking your productivity today
        </p>

        <form
          @submit="handleLogin"
          class="auth-page__form"
        >
          <DSTextField
            v-model="name"
            label="Full Name"
            placeholder="Enter your name"
            icon="person"
            type="text"
            autocomplete="name"
            aria-label="Name"
          />

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
            placeholder="Create a password"
            icon="lock"
            type="password"
            autocomplete="new-password"
            @keyup.enter="handleLogin"
            aria-label="Password"
          />

          <DSTextField
            v-model="confirm_password"
            label="Confirm Password"
            placeholder="Confirm your password"
            icon="lock"
            type="password"
            autocomplete="new-password"
            @keyup.enter="handleLogin"
            aria-label="Confirm password"
          />

          <div
            v-if="!! error"
            class="auth-page__error"
          >
            {{ error }}
          </div>

          <DSButton
            type="submit"
            label="Create account"
            icon="person_add"
            :loading="request_pending"
            variant="primary"
            class="auth-page__submit"
          />
        </form>

        <div class="auth-page__footer">
          <span class="auth-page__footer-text">
            Already have an account? 
          </span>

          <router-link
            :to="{ name: 'login' }"
            class="auth-page__link"
          >
            Sign in
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

const name = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const error = ref('');
const request_pending = ref(false);

const handleLogin = async() => {
  const body = {
    name: name.value,
    email: email.value,
    password: password.value,
    confirm_password: confirm_password.value,
  };

  request_pending.value = true;
  const { id, message } = await api.post('/register', body);
  request_pending.value = false;

  if (id) {
    const { token } = await api.post('/login', { email: email.value, password: password.value });

    if (token) {
      $q.notify({
        progress: true,
        type: 'positive',
        message: 'Registration completed successfully!',
        icon: 'done',
        position: 'top-right',
      });

      $q.cookies.set(jwt, token, { expires: '7d' });
      return router.push({ path: '/' });
    }
  }

  error.value = message;

  return $q.notify({
    progress: true,
    type: 'negative',
    message: 'Registration failed.',
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

  &__error {
    padding: var(--space-3);
    background-color: rgba(193, 0, 21, 0.1);
    color: var(--danger);
    border-radius: var(--radius-sm);
    border: 1px solid var(--danger);
    font-size: var(--text-sm);
    text-align: center;
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
