<template>
  <th data-slot="table-head" v-bind="$attrs" class="h-10 px-4 text-left rtl:text-right align-middle font-normal text-muted-foreground [&:has([role=checkbox])]:pe-0">
    <slot />
  </th>
</template>