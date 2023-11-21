<template>
  <div class="login-container">
    <div class="form-title">
      <h3>
        Login
      </h3>
    </div>

    <form
      @submit="handleLogin"
      class="sign-up-form bg-grey-1 shadow-3"
    >
      <span class="text-weight-medium">
        Conecte-se
      </span>

      <q-input
        v-model="email"
        label="Entrar com email"
        dense
        outlined
        name="email"
        autocomplete="on"
        type="email"
      />

      <q-input
        v-model="password"
        label="Digite a senha"
        dense
        outlined
        autocomplete="on"
        name="password"
        type="password"
        @keypress.enter="handleLogin"
      />

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
        :to="{ name: 'register' }"
      >
        Create account
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
</style>
