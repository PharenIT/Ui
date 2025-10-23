
<script lang="ts" setup>
import SheetPortal    from './SheetPortal.vue'

import SheetHeader    from './SheetHeader.vue'
import SheetTitle     from './SheetTitle.vue'
import SheetClose     from './SheetClose.vue'
import { Icon }          from '@iconify/vue'
import SheetDescription from './SheetDescription.vue'

import { DialogContent, DialogOverlay, useForwardPropsEmits } from 'reka-ui'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'
import { reactiveOmit } from '@vueuse/core'

defineOptions({ inheritAttrs: false })

const props = defineProps<
  DialogContentProps & {
    icon?: string
    title?: string
    description?: string
    class?: any
    side?: VariantProps<typeof styles>['side']
    to?: string | any
  }
>()
const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmits(
  reactiveOmit(props, 'icon', 'title', 'description', 'class', 'to', 'side'),
  emits
)

const styles = tv({
  base: 'flex flex-col items-stretch fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-400',
  variants: {
    side: {
      top:    'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left:   'inset-y-0 start-0 h-full w-3/4 border-e data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm rtl:data-[state=closed]:slide-out-to-right rtl:data-[state=open]:slide-in-from-right',
      right:  'inset-y-0 end-0 h-full w-3/4 border-s data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm rtl:data-[state=closed]:slide-out-to-left rtl:data-[state=open]:slide-in-from-left',
    },
  },
  defaultVariants: {
    side: 'right',
  },
})
</script>

<template>
  <SheetPortal :to="to">
    <slot name="overlay">
      <DialogOverlay
      class="fixed inset-0 z-50 bg-black/30 [backdrop-filter:blur(4px)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    </slot>
    <DialogContent
      :class="styles({ side, class: props.class })"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot>
        <slot name="header">
          <SheetHeader>
            <slot name="title">
              <SheetTitle v-if="title" :title="title" />
             
            </slot>
            <slot name="description">
              <SheetDescription v-if="description" :description="description" />
            </slot>
          </SheetHeader>
        </slot>
        <slot name="content" />
        <slot name="footer" />
      </slot>
      <slot name="close">
      <SheetClose
        class="absolute right-4 top-3 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
  <Icon icon="lucide:x" class="w-4 h-4 text-muted-foreground" />
      </SheetClose>
      </slot>
    </DialogContent>
  </SheetPortal>
</template>
