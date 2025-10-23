import type useEmblaCarousel from 'embla-carousel-vue'
import type { HTMLAttributes } from 'vue'

// Public types intentionally opaque to avoid leaking embla-carousel internals
// into generated declaration files. Keep the surface minimal and stable.
export type UnwrapRefCarouselApi = any

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

export interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
}

export interface CarouselEmits {
  (e: 'init-api', payload: UnwrapRefCarouselApi): void
}

export interface WithClassAsProps {
  class?: HTMLAttributes['class']
}
