<template>
  <q-card
    bordered
    :class="{ 'no-shadow': $q.dark.isActive }"
    class="q-pa-sm"
  >
    <q-card-section class="q-pa-none q-pb-sm q-px-none">
      <header class="card-header">
        <p class="m-0 card-header-title">
          <slot name="title" />
        </p>
      </header>
    </q-card-section>

    <q-separator class="margin-top-1" />

    <div class="q-pa-none q-py-sm q-px-none">
      <div class="content">
        <slot name="content" />
      </div>
    </div>

    <q-separator class="margin-top-1" />

    <q-card-actions class="justify-center q-px-md">
      <slot name="footer" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts" />

<style scoped>
  .card { color: #000; }
  .card-footer { border-color: #adb5bd; }
  .margin-top-1 {
    margin-top: 1px;
    margin-bottom: 1px;
  }
</style>
