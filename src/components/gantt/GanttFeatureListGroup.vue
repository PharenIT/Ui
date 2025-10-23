<script setup lang="ts">
import { inject } from 'vue';
import { GanttContextKey } from './lib';
import { cn } from '../../utils/cn';

const props = defineProps<{
  class?: string;
}>();

const gantt = inject(GanttContextKey);
if (!gantt) throw new Error("Gantt component must be used within a GanttProvider");

</script>
<template>
    <div :class="cn(props.class)" :style="{ paddingTop: `${gantt.rowHeight.value}px` }">
        <slot />
    </div>
</template>