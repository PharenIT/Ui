<script setup lang="ts" generic="T extends KanbanItemProps, C extends KanbanColumnProps">
import { ref, provide, watch } from 'vue'
import { KanbanContextKey, type KanbanColumnProps, type KanbanItemProps, type GroupedKanbanData } from './lib'

const props = defineProps<{
  columns: C[]
  data: T[]
}>()

const emit = defineEmits<{
  (e: 'dataChange', data: T[]): void
}>()

const localColumns = ref(props.columns)
const activeCardId = ref<string | null>(null)
const groupedData = ref<GroupedKanbanData<T>>({})

const updateGroupedData = (data: T[]) => {
  const newGroupedData: GroupedKanbanData<T> = {}
  for (const column of props.columns) {
    newGroupedData[column.id] = data.filter(item => item.column === column.id)
  }
  groupedData.value = newGroupedData
}

watch(() => props.data, (newData) => {
  updateGroupedData(newData)
}, { immediate: true })

const updateCardColumn = (cardId: string, newColumnId: string) => {
  const allItems = Object.values(groupedData.value).flat()
  const cardIndex = allItems.findIndex(c => c.id === cardId)
  if (cardIndex !== -1) {
    allItems[cardIndex].column = newColumnId
    emit('dataChange', allItems as T[])
  }
}

provide(KanbanContextKey, {
  columns: localColumns,
  groupedData,
  activeCardId,
  updateCardColumn,
})

const handleDragStart = (event: any) => {
  activeCardId.value = event.item.dataset.id
}

const handleDragEnd = (event: any) => {
  activeCardId.value = null
}
</script>

<template>
  <div class="grid size-full auto-cols-fr grid-flow-col gap-4">
    <slot :columns="localColumns" :handleDragStart="handleDragStart" :handleDragEnd="handleDragEnd" />
  </div>
</template>