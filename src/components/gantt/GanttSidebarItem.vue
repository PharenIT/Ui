<script setup lang="ts">
import { computed } from 'vue';
import { useGantt, type GanttFeature } from './lib';
import { cn } from '../../utils/cn';
import { formatDistance, isSameDay, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

const props = defineProps<{
  feature: GanttFeature;
  class?: string;
}>();

const emit = defineEmits<{
  (e: 'selectItem', id: string): void;
}>();

const gantt = useGantt();

const duration = computed(() => {
  const tempEndAt =
    props.feature.endAt && isSameDay(props.feature.startAt, props.feature.endAt)
      ? addDays(props.feature.endAt, 1)
      : props.feature.endAt;

  const opts = { locale: de } as const;

  return tempEndAt
    ? formatDistance(props.feature.startAt, tempEndAt, opts)
    : `${formatDistance(props.feature.startAt, new Date(), opts)} bisher`;
});

const handleClick = () => {
  gantt.scrollToFeature(props.feature);
  emit('selectItem', props.feature.id);
};
</script>
<template>
  <div
    :class="cn(
      'relative flex items-center gap-2.5 p-2.5 text-xs hover:bg-secondary cursor-pointer',
      props.class
    )"
    role="button"
    tabindex="0"
    :style="{ height: `${gantt.rowHeight.value}px` }"
    @click="handleClick"
    @keydown.enter="handleClick"
  >
    <div
      class="pointer-events-none h-2 w-2 shrink-0 rounded-full"
      :style="{ backgroundColor: feature.status.color }"
    />
    <p class="pointer-events-none flex-1 truncate text-left font-medium">
      {{ feature.name }}
    </p>
    <p class="pointer-events-none text-muted-foreground">{{ duration }}</p>
  </div>
</template>