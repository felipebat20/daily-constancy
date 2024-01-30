<template>
  <div class="login-container">
    <div class="form-title">
      <h3>
        Create account
      </h3>
    </div>

    <form
      @submit="handleLogin"
      class="sign-up-form bg-grey-1 shadow-3"
    >
      <q-input
        v-model="name"
        label="Your name"
        dense
        outlined
        name="name"
        autocomplete="on"
        type="text"
      />

      <q-input
        v-model="email"
        label="Your email"
        dense
        outlined
        name="email"
        autocomplete="on"
        type="email"
      />

      <q-input
        v-model="password"
        label="Type your password"
        dense
        outlined
        autocomplete="on"
        name="password"
        type="password"
        @keypress.enter="handleLogin"
      />

      <q-input
        v-model="confirm_password"
        label="Confirm your password"
        dense
        outlined
        autocomplete="on"
        name="confirm_password"
        type="password"
        @keypress.enter="handleLogin"
      />

      <span
        v-if="!! error"
        class="error-message"
      >
        {{ error }}
      </span>

      <q-btn
        color="primary"
        label="Conecte-se"
        :loading="request_pending"
        @click="handleLogin"
      />
    </form>

    <div class="sing-up-container">
      <span class="text-white">
        Do not have an account?
      </span>

      <router-link
        class="text-white"
        :to="{ name: 'login' }"
      >
        Log in
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';

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
  .login-container {
    display: flex;
    justify-content: center;
    margin-top: .5rem;
    flex-direction: column;
    gap: 10px;
  }

  .sign-up-form {
    width: 350px;
    padding: 2rem;
    margin: auto;
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 4px;
  }

  .sing-up-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 1rem;

    a {
      text-decoration: underline;
      font-weight: 500;
    }
  }

  .form-title {
    padding: 1rem;
    h3 {
      text-align: center;
      font-size: 1.25rem;
      line-height: 1.5rem;
      color: white;
      font-weight: 500;
    }
  }

  .error-message {
    font-size: 12px;
    font-weight: 500;
    color: $negative;
  }
</style>
