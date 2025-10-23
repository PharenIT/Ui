<script setup lang="ts">
import { computed } from 'vue'
import { withDefaults, defineProps } from 'vue'
import { cn } from '../../utils/cn'
import { Avatar as UiAvatar, AvatarImage as UiAvatarImage, AvatarFallback as UiAvatarFallback } from './index'

interface Props {
  name: string
  src?: string
  size?: 'sm' | 'base' | 'lg'
  shape?: 'circle' | 'square'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  shape: 'square',
  src: undefined,
  class: ''
})

// Compute initials from name
const initials = computed(() => {
  const parts = props.name.trim().split(' ')
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (
    parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase()
  )
})

// Compute fallback background and text color based on initial letter
const variantClasses = computed(() => {
  const letter = props.name.charAt(0).toUpperCase()
  if (letter >= 'A' && letter <= 'H') {
    return 'bg-primary/10 text-primary'
  }
  if (letter >= 'I' && letter <= 'P') {
    return 'bg-warning/10 text-warning'
  }
  if (letter >= 'Q' && letter <= 'T') {
    return 'bg-danger/10 text-danger'
  }
  if (letter >= 'U' && letter <= 'Z') {
    return 'bg-info/10 text-info'
  }
  return 'bg-success/10 text-success'
})
</script>

<template>
 
  <UiAvatar :class="cn(props.class)" :size="props.size" :shape="props.shape">
    <UiAvatarImage
      v-if="props.src"
      :src="props.src"
      :alt="props.name"
      class="w-full h-full object-cover"
    />
    <UiAvatarFallback
      v-else
      :class="cn(variantClasses) + ' flex items-center justify-center w-full h-full text-xss rounded-lg'">
      {{ initials }}
    </UiAvatarFallback>
  </UiAvatar>

</template>
