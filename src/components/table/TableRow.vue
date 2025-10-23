<template>
  <tr data-slot="table-row" v-bind="$attrs" class="border-b transition-colors [&:has(td):hover]:bg-muted/50 data-[state=selected]:bg-muted">
    <slot />
  </tr>
</template>