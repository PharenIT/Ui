<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useGantt, ganttScrollX, isGanttDragging, getWidth, getOffset, getDateByMousePosition } from './lib';
import type { GanttFeature } from './lib';
import { format, differenceInDays, addDays } from 'date-fns'; 
import { cn } from '../../utils/cn';

const props = defineProps<{
  feature: GanttFeature;
  class?: string;
}>();

const emit = defineEmits<{
  (e: 'move', id: string, startAt: Date, endAt: Date | null): void;
}>();

const gantt = useGantt();
const timelineStartDate = computed(() => new Date(gantt.timelineData.value[0]?.year ?? 0, 0, 1));

const startAt = ref(props.feature.startAt);
const endAt = ref(props.feature.endAt);

const width = computed(() => getWidth(startAt.value, endAt.value, gantt));
const offset = computed(() => getOffset(startAt.value, timelineStartDate.value, gantt));

// @ts-ignore
const itemRef = ref<HTMLElement | null>(null);
// @ts-ignore
const leftHandleRef = ref<HTMLElement | null>(null);
// @ts-ignore
const rightHandleRef = ref<HTMLElement | null>(null);

let initialMouseX = 0;
let initialStartAt: Date;
let initialEndAt: Date | null;

// FIX 2: onStart callbacks now have curly braces {} to ensure they return void
const { isDragging: isItemDragging } = useDraggable(itemRef, {
  initialValue: { x: offset.value, y: 0 },
  onStart: (_, event) => {
    isGanttDragging.value = true;
    initialMouseX = event.clientX;
    initialStartAt = new Date(startAt.value);
    initialEndAt = endAt.value ? new Date(endAt.value) : null;
  },
  onMove: (_, event) => {
    const ganttRect = gantt.containerRef.value?.getBoundingClientRect();
    if (!ganttRect) return;

    const currentMouseX = event.clientX - ganttRect.left + ganttScrollX.value - gantt.sidebarWidth.value;
    const initialDate = getDateByMousePosition(gantt, initialMouseX - ganttRect.left + ganttScrollX.value - gantt.sidebarWidth.value);
    const currentDate = getDateByMousePosition(gantt, currentMouseX);

    const deltaDays = differenceInDays(currentDate, initialDate);
    
    startAt.value = addDays(initialStartAt, deltaDays);
    if (initialEndAt) {
      endAt.value = addDays(initialEndAt, deltaDays);
    }
  },
  onEnd: () => {
    isGanttDragging.value = false;
    emit('move', props.feature.id, startAt.value, endAt.value);
  },
});

const { isDragging: isLeftHandleDragging } = useDraggable(leftHandleRef, {
  onStart: () => { isGanttDragging.value = true },
  onMove: (_, event) => {
    const ganttRect = gantt.containerRef.value?.getBoundingClientRect();
    if (!ganttRect) return;
    const x = event.clientX - ganttRect.left + ganttScrollX.value - gantt.sidebarWidth.value;
    startAt.value = getDateByMousePosition(gantt, x);
  },
  onEnd: () => {
    isGanttDragging.value = false;
    emit('move', props.feature.id, startAt.value, endAt.value);
  },
});

const { isDragging: isRightHandleDragging } = useDraggable(rightHandleRef, {
  onStart: () => { isGanttDragging.value = true },
  onMove: (_, event) => {
    const ganttRect = gantt.containerRef.value?.getBoundingClientRect();
    if (!ganttRect) return;
    const x = event.clientX - ganttRect.left + ganttScrollX.value - gantt.sidebarWidth.value;
    endAt.value = getDateByMousePosition(gantt, x);
  },
  onEnd: () => {
    isGanttDragging.value = false;
    emit('move', props.feature.id, startAt.value, endAt.value);
  },
});

watch(() => props.feature, (newFeature) => {
    startAt.value = newFeature.startAt;
    endAt.value = newFeature.endAt;
}, { deep: true });
</script>

<template>
  <div
    :class="cn('relative flex w-max min-w-full py-0.5', props.class)"
    :style="{ height: `${gantt.rowHeight.value}px` }"
  >
    <div
      class="pointer-events-auto absolute top-0.5"
      :style="{
        height: `calc(${gantt.rowHeight.value}px - 4px)`,
        width: `${Math.round(width)}px`,
        left: `${Math.round(offset)}px`,
      }"
    >
      <div 
        ref="leftHandleRef"
        class="group -translate-y-1/2 !cursor-col-resize absolute top-1/2 z-[3] h-full w-6 rounded-md outline-none -left-2.5"
      >
        <div class=" -translate-y-1/2 absolute top-1/2 h-[80%] w-1 rounded-sm bg-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:left-0" :class="{ '!opacity-100 !left-0': isLeftHandleDragging }" />
        <div v-if="startAt" class=" -translate-x-1/2 absolute top-10 hidden whitespace-nowrap rounded-lg border border-border/50 bg-background/90 px-2 py-1 text-foreground text-xs backdrop-blur-lg group-hover:block" :class="{ '!block': isLeftHandleDragging }">
          {{ format(startAt, 'MMM dd, yyyy') }}
        </div>
      </div>
      
      <div ref="itemRef" class="h-full w-full rounded-md bg-background p-2 text-xs shadow-sm cursor-grab" :class="{'cursor-grabbing': isItemDragging}">
        <div class="flex h-full w-full items-center justify-between gap-2 text-left">
          <slot>
            <p class="flex-1 truncate text-xs">{{ feature.name }}</p>
          </slot>
        </div>
      </div>

       <div 
        ref="rightHandleRef"
        class="group -translate-y-1/2 !cursor-col-resize absolute top-1/2 z-[3] h-full w-6 rounded-md outline-none -right-2.5"
      >
        <div class=" -translate-y-1/2 absolute top-1/2 h-[80%] w-1 rounded-sm bg-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:right-0" :class="{ '!opacity-100 !right-0': isRightHandleDragging }" />
         <div v-if="endAt" class=" -translate-x-1/2 absolute top-10 hidden whitespace-nowrap rounded-lg border border-border/50 bg-background/90 px-2 py-1 text-foreground text-xs backdrop-blur-lg group-hover:block" :class="{ '!block': isRightHandleDragging }">
          {{ format(endAt, 'MMM dd, yyyy') }}
        </div>
      </div>
    </div>
  </div>
</template>