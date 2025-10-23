import type { UnwrapRefCarouselApi as CarouselApi, CarouselEmits, CarouselProps } from './interface'
import { createInjectionState } from '@vueuse/core'
import emblaCarouselVue from 'embla-carousel-vue'
import { onMounted, ref } from 'vue'


type ProvideCarouselReturn = {
  carouselRef: import('vue').Ref<HTMLElement | undefined>,
  // use the opaque public type so embla-carousel internals are not exported
  carouselApi: import('vue').Ref<import('./interface').UnwrapRefCarouselApi | undefined>,
  canScrollPrev: import('vue').Ref<boolean>,
  canScrollNext: import('vue').Ref<boolean>,
  scrollPrev: () => void,
  scrollNext: () => void,
  orientation: CarouselProps['orientation']
}

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({
    opts,
    orientation,
    plugins,
  }: CarouselProps, emits: CarouselEmits): ProvideCarouselReturn => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    }, plugins)

    function scrollPrev() {
      emblaApi.value?.scrollPrev()
    }
    function scrollNext() {
      emblaApi.value?.scrollNext()
    }

  const canScrollNext = ref(false)
  const canScrollPrev = ref(false)

    function onSelect(api: CarouselApi) {
      // api is from embla internally; expose only boolean results to public API
      try {
        canScrollNext.value = !!(api && (api as any).canScrollNext && (api as any).canScrollNext())
        canScrollPrev.value = !!(api && (api as any).canScrollPrev && (api as any).canScrollPrev())
      }
      catch {
        canScrollNext.value = false
        canScrollPrev.value = false
      }
    }

    onMounted(() => {
      if (!emblaApi.value)
        return

      emblaApi.value?.on('init', onSelect)
      emblaApi.value?.on('reInit', onSelect)
      emblaApi.value?.on('select', onSelect)

      emits('init-api', emblaApi.value)
    })

    return { carouselRef: emblaNode, carouselApi: emblaApi, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation }
  },
)


function useCarousel(): ProvideCarouselReturn {
  const carouselState = useInjectCarousel()
  if (!carouselState)
    throw new Error('useCarousel must be used within a <Carousel />')
  return carouselState
}

export { useCarousel, useProvideCarousel }
