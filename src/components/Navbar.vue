<template>
    <Primitive :class="styles({ sticky, class: props.class })" v-bind="forwarded">
      <slot />
    </Primitive>
  </template>
  
  <script lang="ts" setup>
    import { Primitive } from "reka-ui";
    import type { PrimitiveProps } from "reka-ui";
    import { defineProps } from 'vue'; 
  
    // Define props manually
    const props = defineProps<
      PrimitiveProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
        /** Whether the navbar should be sticky */
        sticky?: boolean;
      }
    >();
  
  
    const forwarded = {
      ...props,
      class: undefined,  
      sticky: undefined, 
    };
  
  
    const styles = (classes: any) => {
      const base = "z-20 border-b bg-background backdrop-blur";
      const sticky = classes.sticky ? "sticky top-0" : "";
      return `${base} ${sticky} ${classes.class || ''}`; 
    };
  </script>
  