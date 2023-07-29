<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        <slot name="title" />
      </p>
    </header>

    <div class="card-content">
      <div class="content">
        <slot name="content" />
      </div>
    </div>

    <footer class="card-footer mb-0 mt-auto">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts" />

<style scoped>
  .card {background: #FAF0CA;}
</style>
