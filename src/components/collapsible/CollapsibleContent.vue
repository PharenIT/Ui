  <script setup lang="ts">
  import { CollapsibleContent, type CollapsibleContentProps } from 'reka-ui'

  const props = defineProps<CollapsibleContentProps>()
  </script>

  <template>
    <CollapsibleContent v-bind="props"  class="CollapsibleContent overflow-hidden transition-[height] will-change-auto data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
      <slot />
    </CollapsibleContent>
  </template>

  
<style>
/* styles.css */
.CollapsibleContent {
  overflow: hidden;
}
.CollapsibleContent[data-state="open"] {
  animation: slideDown 300ms ease-out;
}
.CollapsibleContent[data-state="closed"] {
  animation: slideUp 300ms ease-out;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
</style>