<template>
    <div
      data-slot="alert-description"
      class="text-sm [&_p]:leading-relaxed [&_p]:mb-2"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  <script setup lang="ts"></script>
  