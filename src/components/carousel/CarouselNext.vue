<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { cn } from '../../utils/cn';
import { Button, type ButtonVariants } from '../button'
import { Icon } from '@iconify/vue'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}
& WithClassAsProps>(), {
  variant: 'outline',
  size: 'md',
})

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="cn(
      'absolute size-8 rounded-full',
      orientation === 'horizontal'
        ? 'top-1/2 -right-12 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="scrollNext"
  >
    <slot>
  <Icon icon="lucide:arrow-right" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
