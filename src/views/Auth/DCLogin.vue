<template>
  <div class="login-container">
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
      />

      <q-btn
        color="primary"
        label="Conecte-se"
        @click="handleLogin"
      />
    </form>
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

  const handleLogin = async() => {
    const body = {
      email: email.value,
      password: password.value,
    };

    const { token } = await api.post('/login', body);

    if (token) {
      $q.notify({
        progress: true,
        type: 'positive',
        message: 'Logado com sucesso.',
        icon: 'done',
      position: 'top-right',
      });

      $q.cookies.set(jwt, token, { expires: '1d' });

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
    margin-top: 2rem;
  }

  .sign-up-form {
    width: 350px;
    padding: 2rem;
    margin: auto;
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
