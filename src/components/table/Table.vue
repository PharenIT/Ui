<template>
  <div data-slot="table-wrapper" class="relative w-full overflow-auto">
    <table data-slot="table" v-bind="$attrs" class="w-full caption-bottom text-foreground text-sm">
      <slot />
    </table>
  </div>
</template>