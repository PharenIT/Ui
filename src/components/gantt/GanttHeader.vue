<script setup lang="ts">
import { computed, h, defineComponent, inject } from 'vue'
import { GanttContextKey, type Range } from './lib'
import { cn } from '../../utils/cn'
import { format, addDays } from 'date-fns'
import { de } from 'date-fns/locale'

const props = defineProps<{
  class?: string
}>()

const gantt = inject(GanttContextKey)
if (!gantt) throw new Error("GanttHeader must be used within a GanttProvider")

const GanttContentHeader = defineComponent({
  props: {
    title: { type: String, required: true },
    columns: { type: Number, required: true },
    renderHeaderItem: { type: Function, required: true }
  },
  setup(props) {
    return () => h('div', { class: 'sticky top-0 z-20 grid w-full shrink-0 bg-backdrop/90 backdrop-blur-sm', style: { height: 'var(--gantt-header-height)' } }, [
      h('div', {}, [
        h('div', { class: 'sticky inline-flex whitespace-nowrap px-3 py-2 text-muted-foreground text-xs', style: { left: 'var(--gantt-sidebar-width)' } }, [
          h('p', props.title)
        ])
      ]),
      h('div', { class: 'grid w-full', style: { gridTemplateColumns: `repeat(${props.columns}, var(--gantt-column-width))` } },
        Array.from({ length: props.columns }).map((_, index) =>
          h('div', { class: 'shrink-0 border-border/50 border-b py-1 text-center text-xs' }, [
            props.renderHeaderItem(index)
          ])
        )
      )
    ])
  }
})

const GanttColumns = defineComponent({
    props: {
        columns: { type: Number, required: true },
        isColumnSecondary: { type: Function, default: () => false }
    },
    setup(props) {
        return () => h('div', { class: 'divide grid h-full w-full divide-x divide-border/50', style: { gridTemplateColumns: `repeat(${props.columns}, var(--gantt-column-width))` } },
            Array.from({ length: props.columns }).map((_, index) =>
                h('div', { class: cn('group relative h-full overflow-hidden', props.isColumnSecondary(index) ? 'bg-secondary' : '') })
            )
        )
    }
})

const DailyHeader = defineComponent({
  setup() {
    return () => gantt.timelineData.value.map(year =>
      year.quarters.flatMap(q => q.months).map((month, index) =>
        h('div', { class: 'relative flex flex-col', key: `${year.year}-${index}` }, [
          h(GanttContentHeader, {
            columns: month.days,
            renderHeaderItem: (item: number) => h('div', { class: 'flex items-center justify-center gap-1' }, [
              h('p', format(addDays(new Date(year.year, index, 1), item), 'd', { locale: de })),
              h('p', { class: 'text-muted-foreground' }, format(addDays(new Date(year.year, index, 1), item), 'EEEEE', { locale: de }))
            ]),
            title: format(new Date(year.year, index, 1), 'MMMM yyyy', { locale: de })
          }),
          h(GanttColumns, {
            columns: month.days,
            isColumnSecondary: (item: number) => [0, 6].includes(addDays(new Date(year.year, index, 1), item).getDay())
          })
        ])
      )
    )
  }
})

const MonthlyHeader = defineComponent({
    setup() {
        return () => gantt.timelineData.value.map(year => 
            h('div', { class: 'relative flex flex-col', key: year.year }, [
                h(GanttContentHeader, {
                    columns: year.quarters.flatMap(q => q.months).length,
                    renderHeaderItem: (item: number) => h('p', format(new Date(year.year, item, 1), 'MMM', { locale: de })),
                    title: `${year.year}`
                }),
                h(GanttColumns, {
                    columns: year.quarters.flatMap(q => q.months).length
                })
            ])
        )
    }
})

const QuarterlyHeader = defineComponent({
    setup() {
        return () => gantt.timelineData.value.map(year => 
            year.quarters.map((quarter, quarterIndex) =>
                h('div', { class: 'relative flex flex-col', key: `${year.year}-${quarterIndex}` }, [
                    h(GanttContentHeader, {
                        columns: quarter.months.length,
                        renderHeaderItem: (item: number) => h('p', format(new Date(year.year, quarterIndex * 3 + item, 1), 'MMM', { locale: de })),
                        title: `Q${quarterIndex + 1} ${year.year}`
                    }),
                    h(GanttColumns, {
                        columns: quarter.months.length
                    })
                ])
            )
        )
    }
})

const headers: Record<Range, ReturnType<typeof defineComponent>> = {
  daily: DailyHeader,
  monthly: MonthlyHeader,
  quarterly: QuarterlyHeader,
}

const HeaderComponent = computed(() => headers[gantt.range.value])
</script>

<template>
  <div :class="cn('-space-x-px flex h-full w-max divide-x divide-border/50', props.class)">
      <component :is="HeaderComponent" />
  </div>
</template>