<template>
  <td data-slot="table-cell" v-bind="$attrs" class="p-4 align-middle [&:has([role=checkbox])]:pe-0">
    <slot />
  </td>
</template>