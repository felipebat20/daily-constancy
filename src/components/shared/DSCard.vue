<template>
  <q-card class="q-pa-sm">
    <q-card-section class="q-pa-none">
      <header class="card-header">
        <p class="m-0 card-header-title">
          <slot name="title" />
        </p>
      </header>
    </q-card-section>

    <q-separator />

    <div class="card-content p-2">
      <div class="content">
        <slot name="content" />
      </div>
    </div>

    <q-separator />

    <q-card-actions class="justify-center q-px-md">
      <slot name="footer" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts" />

<style scoped>
  .card { color: #000; }
  .card-footer { border-color: #adb5bd; }
</style>
