<template>
  <thead data-slot="table-header" v-bind="$attrs" class="[&_tr]:border-b">
    <slot />
  </thead>
</template>