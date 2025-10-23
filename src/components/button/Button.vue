

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils/cn'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import type { ButtonVariants } from '.'
import { buttonVariants } from '.'
import { Icon } from '@iconify/vue'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  loading?: boolean
  disabled?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
  disabled: false,
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      buttonVariants({ variant: props.variant, size: props.size }),
      props.class,
      props.loading && 'pointer-events-none opacity-70'
    )"
    :disabled="props.loading || props.disabled"
  >
    <template #default>
      <span class="inline-flex items-center">
        <Icon v-if="props.loading" icon="lucide:loader-circle" class="animate-spin mr-2" />
        <slot />
      </span>
    </template>
  </Primitive>
</template>