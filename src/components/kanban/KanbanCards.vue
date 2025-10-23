<script setup lang="ts" generic="T extends KanbanItemProps">
import { inject, computed, ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import { KanbanContextKey, type KanbanItemProps } from './lib'
import { ScrollArea, ScrollBar } from '../scroll-area'

const props = defineProps<{
  id: string
}>()

const context = inject(KanbanContextKey)
if (!context) throw new Error('KanbanCards must be used within a KanbanProvider')

const listRef = ref<HTMLElement | null>(null)

const cardList = computed(() => context.groupedData.value[props.id] || [])

interface SortableEvent {
  item: HTMLElement;
  
}
useSortable(listRef, cardList, {
  group: 'kanban',
  animation: 150,
  onAdd(event: SortableEvent) {
    const cardId = event.item.dataset.id
    if (cardId) {
        context.updateCardColumn(cardId, props.id)
    }
  }
})
</script>

<template>
  <ScrollArea class="overflow-hidden">
    <div ref="listRef" :id="id" class="flex min-h-20 flex-grow flex-col gap-2 p-2">
      <slot v-for="item in cardList" :key="item.id" :item="item" />
    </div>
    <ScrollBar orientation="vertical" />
  </ScrollArea>
</template>