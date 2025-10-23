<template>
  <div
    data-slot="empty-state"
    v-bind="delegatedProps"
    :class="
      cn(
        'text-center border border-border rounded-lg p-10 w-full bg-background group transition duration-300',
        props.class,
      )
    "
  >
    <div class="flex justify-center mb-4">
      <template v-if="icons && icons.length === 3">
        <div
          v-for="(icon, i) in icons"
          :key="i"
          class="w-10 h-10 flex items-center justify-center rounded-md border border-border bg-background mx-[-6px] shadow-sm"
        >
          <Icon :icon="icon" class="w-5 h-5 text-muted-foreground" />
        </div>
      </template>

      <template v-else>
        <div
          class="w-10 h-10 flex items-center justify-center rounded-md border border-border bg-background shadow-sm"
        >
          <Icon v-if="icons?.[0]" :icon="icons[0]" class="w-5 h-5 text-muted-foreground" />
        </div>
      </template>
    </div>

    <h2 class="text-foreground font-semibold mt-4 text-base">{{ title }}</h2>
    <p class="text-sm text-muted-foreground mt-2 whitespace-pre-line">{{ description }}</p>

    <UiButton
      v-if="action"
      @click="action.onClick"
      variant="outline"
      class="mt-5"
    >
      {{ action.label }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { cn } from '../utils/cn'

interface Action {
  label: string
  onClick(): void
}

const props = defineProps<{
  title: string
  description: string
  icons?: string[]
  action?: Action
  class?: HTMLAttributes['class']
}>()

const icons = computed(() => props.icons ?? [])
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>
