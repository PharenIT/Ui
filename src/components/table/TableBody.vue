<template>
  <tbody data-slot="table-body" v-bind="$attrs" class="[&_tr:last-child]:border-0">
    <slot />
  </tbody>
</template>