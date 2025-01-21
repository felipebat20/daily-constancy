<template>
  <div class="card p-2 rounded">
    <header class="card-header">
      <p class="card-header-title">
        <slot name="title" />
      </p>
    </header>

    <div class="card-content p-2">
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
  .card {
    background: #FAF0CA;
    color: #000;
  }

  .card-footer { border-color: #adb5bd; }
</style>
