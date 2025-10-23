<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent, type AccordionContentProps } from 'reka-ui'
import { cn } from '../../utils/cn';

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div :class="cn('pb-4 pt-0', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>

<style scoped>
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--reka-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--reka-accordion-content-height); }
  to { height: 0; }
}
.data-\[state\=open\]\:animate-accordion-down[data-state="open"] {
  animation: accordion-down 0.2s ease-out;
}
.data-\[state\=closed\]\:animate-accordion-up[data-state="closed"] {
  animation: accordion-up 0.2s ease-out;
}
</style>