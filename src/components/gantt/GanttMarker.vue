<script setup lang="ts">
import { computed, inject } from 'vue';
import { GanttContextKey, getDifferenceIn, calculateInnerOffset } from './lib';
import { format as formatDate } from 'date-fns';
import { cn } from '../../utils/cn';

const props = defineProps<{
  id: string;
  date: Date;
  label: string;
  class?: string;
}>();

const gantt = inject(GanttContextKey);
if (!gantt) throw new Error("Gantt component must be used within a GanttProvider");

const differenceIn = computed(() => getDifferenceIn(gantt.range.value));
const timelineStartDate = computed(() => new Date(gantt.timelineData.value[0]?.year ?? 0, 0, 1));

const offset = computed(() => differenceIn.value(props.date, timelineStartDate.value));
const innerOffset = computed(() => calculateInnerOffset(props.date, gantt.range.value, (gantt.columnWidth.value * gantt.zoom.value) / 100));

const style = computed(() => ({
  width: '0px',
  transform: `translateX(calc(var(--gantt-column-width) * ${offset.value} + ${innerOffset.value}px))`,
}));
</script>
<template>
  <div
    class="pointer-events-none absolute top-0 left-0 z-20 flex h-full select-none flex-col items-center justify-center overflow-visible mb-10"
    :style="style"
  >
    <div
      :class="cn(
        'group pointer-events-auto sticky top-0 flex select-auto flex-col flex-nowrap items-center justify-center whitespace-nowrap rounded-b-md bg-card px-2 py-1 text-xs text-foreground',
        props.class
      )"
    >
      {{ label }}
       <span class="max-h-[0] overflow-hidden opacity-80 transition-all group-hover:max-h-[2rem]">
        {{ formatDate(date, 'MMM dd, yyyy') }}
      </span>
    </div>
    <div :class="cn('h-full w-px bg-card', props.class)" />
  </div>
</template>