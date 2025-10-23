<script setup lang="ts">

import type { CarouselEmits, CarouselProps, WithClassAsProps, UnwrapRefCarouselApi } from './interface'
import { cn } from '../../utils/cn'
import { useProvideCarousel } from './useCarousel'

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
  orientation: 'horizontal',
})

const emits = defineEmits<CarouselEmits>()

const {
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
}: {
  canScrollNext: import('vue').Ref<boolean>
  canScrollPrev: import('vue').Ref<boolean>
  carouselApi: import('vue').Ref<UnwrapRefCarouselApi | undefined>
  carouselRef: import('vue').Ref<HTMLElement | undefined>
  orientation: CarouselProps['orientation']
  scrollNext: () => void
  scrollPrev: () => void
} = useProvideCarousel(props, emits)

defineExpose({
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
})

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    scrollPrev()
    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    scrollNext()
  }
}
</script>

<template>
  <div
    data-slot="carousel"
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <slot 
      :can-scroll-next="canScrollNext as boolean"
      :can-scroll-prev="canScrollPrev as boolean"
      :carousel-api="carouselApi as any"
      :carousel-ref="carouselRef as any"
      :orientation="orientation as CarouselProps['orientation']"
      :scroll-next="scrollNext as (() => void)"
      :scroll-prev="scrollPrev as (() => void)"
    />
  </div>
</template>
