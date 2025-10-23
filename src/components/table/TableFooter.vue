<template>
  <tfoot data-slot="table-footer" v-bind="$attrs" class="border-t font-medium last:[&>tr]:border-b-0">
    <slot />
  </tfoot>
</template>