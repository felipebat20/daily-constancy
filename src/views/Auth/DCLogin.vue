<template>
  <div class="login-container">
    <div class="sign-up-form bg-grey-1 shadow-3">
      <span class="text-weight-medium">
        Conecte-se
      </span>

      <q-input
        v-model="email"
        label="Entrar com email"
        dense
        outlined
        autocomplete="email"
        type="email"
      />

      <q-input
        v-model="password"
        label="Digite a senha"
        dense
        outlined
        autocomplete="password"
        type="password"
      />

      <q-btn
        color="primary"
        label="Conecte-se"
        @click="handleLogin"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const email = ref('');
  const password = ref('');

  const handleLogin = async() => {
    const body = {
      email: email.value,
      password: password.value,
    };

    console.log(body);


    try {
      const response = await fetch('https://daily-const-backend.vercel.app/login', {
        method: 'POST',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.25rem;
  }
</style>
