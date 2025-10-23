<script setup lang="ts">
import { ref, computed, provide, onMounted, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { throttle } from 'lodash-es'
import {
  type GanttContextProps,
  createInitialTimelineData,
  getOffset,
  ganttScrollX,
  GanttContextKey,
} from './lib'
import type { GanttFeature } from './lib'

const props = withDefaults(
  defineProps<{
    range?: 'daily' | 'monthly' | 'quarterly'
    zoom?: number
  }>(),
  {
    range: 'monthly',
    zoom: 100,
  },
)

const emit = defineEmits<{
  (e: 'addItem', date: Date): void
}>()
  // @ts-ignore
const containerRef = ref<HTMLDivElement | null>(null)
const timelineData = ref(createInitialTimelineData(new Date()))
const sidebarWidth = ref(300)
const headerHeight = ref(60)
const rowHeight = ref(36)

const columnWidth = computed(() => {
  if (props.range === 'monthly') return 150
  if (props.range === 'quarterly') return 100
  return 50
})

const cssVariables = computed(() => ({
  '--gantt-zoom': `${props.zoom}`,
  '--gantt-column-width': `${(props.zoom / 100) * columnWidth.value}px`,
  '--gantt-header-height': `${headerHeight.value}px`,
  '--gantt-row-height': `${rowHeight.value}px`,
  '--gantt-sidebar-width': `${sidebarWidth.value}px`,
}))

const { x, arrivedState } = useScroll(containerRef)
watch(x, (newX) => {
  ganttScrollX.value = newX
})

const handleScroll = throttle(() => {
    if (arrivedState.left) {
        const firstYear = timelineData.value[0]?.year
        if (!firstYear) return
        
        const newYearData = {
            year: firstYear - 1,
            quarters: createInitialTimelineData(new Date(firstYear - 1, 0, 1))[0].quarters
        }
        timelineData.value.unshift(newYearData)
        
        containerRef.value?.scrollTo({ left: containerRef.value.clientWidth, behavior: 'auto' })
    }
    if (arrivedState.right) {
        const lastYear = timelineData.value[timelineData.value.length - 1]?.year
        if (!lastYear) return
        
        const newYearData = {
            year: lastYear + 1,
            quarters: createInitialTimelineData(new Date(lastYear + 1, 0, 1))[0].quarters
        }
        timelineData.value.push(newYearData)
    }
}, 200)

watch(() => arrivedState.left, (isAtStart) => { if (isAtStart) handleScroll() })
watch(() => arrivedState.right, (isAtEnd) => { if (isAtEnd) handleScroll() })

const scrollToFeature = (feature: GanttFeature) => {
  if (!containerRef.value) return
  const timelineStartDate = new Date(timelineData.value[0].year, 0, 1)
  const offset = getOffset(feature.startAt, timelineStartDate, context)
  containerRef.value.scrollTo({ left: offset, behavior: 'smooth' })
}

const context: GanttContextProps = {
  zoom: ref(props.zoom),
  range: ref(props.range),
  columnWidth,
  sidebarWidth,
  headerHeight,
  rowHeight,
  onAddItem: (date: Date) => emit('addItem', date),
  timelineData,
  containerRef,
  scrollToFeature,
}

provide(GanttContextKey, context)

onMounted(() => {
  // @ts-ignore
  const sidebarEl = document.querySelector('[data-gantt-sidebar]')
  if(sidebarEl) {
    sidebarWidth.value = sidebarEl.getBoundingClientRect().width
  }

  if (containerRef.value) {
    const timelineStartDate = new Date(timelineData.value[0].year, 0, 1)
    const todayOffset = getOffset(new Date(), timelineStartDate, context)
    const containerWidth = containerRef.value.clientWidth
    
    // Scrollt so, dass "Heute" in der Mitte des sichtbaren Bereichs ist
    const targetScrollLeft = todayOffset - (containerWidth / 2) + (sidebarWidth.value / 2)
    
    containerRef.value.scrollLeft = targetScrollLeft
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="gantt relative grid h-full w-full flex-none select-none overflow-auto rounded-sm bg-secondary"
    :style="[cssVariables, { gridTemplateColumns: 'var(--gantt-sidebar-width) 1fr' }]"
  >
    <slot />
  </div>
</template>