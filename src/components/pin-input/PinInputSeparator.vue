<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive
    data-slot="pin-input-separator"
    v-bind="forwardedProps"
  >
    <slot>
  <Icon icon="lucide:minus" />
    </slot>
  </Primitive>
</template>
