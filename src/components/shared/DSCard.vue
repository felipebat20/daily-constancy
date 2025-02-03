<template>
  <q-card
    bordered
    :class="{ 'no-shadow': $q.dark.isActive }"
  >
    <q-card-section class="q-pa-sm h-full">
      <header class="card-header">
        <p class="m-0 card-header-title">
          <slot name="title" />
        </p>
      </header>
    </q-card-section>

    <q-separator class="margin-top-1 q-mx-sm" />

    <div class="q-pa-none q-py-sm q-px-none q-pb-sm q-px-sm">
      <div class="content">
        <slot name="content" />
      </div>
    </div>

    <q-separator class="margin-top-1 q-mx-sm" />

    <q-card-actions class="justify-center q-pb-sm q-px-sm">
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
