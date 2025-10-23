<template>
    <div
      data-slot="alert-content"
      class="space-y-2 [&_[data-slot=alert-title]]:font-semibold"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  <script setup lang="ts"></script>