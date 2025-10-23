import { ref } from 'vue';
import type { Ref, InjectionKey } from 'vue';
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  endOfDay,
  endOfMonth,
  getDate,
  getDaysInMonth,
  isSameDay,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { inject } from 'vue';

export const isGanttDragging = ref(false);
export const ganttScrollX = ref(0);

export interface GanttStatus {
  id: string;
  name: string;
  color: string;
}

export interface GanttFeature {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: GanttStatus;
  group: { id: string; name: string };
  owner?: { id: string; name: string; image?: string };
}

export interface GanttMarker {
  id: string;
  date: Date;
  label: string;
  className?: string;
}

export type Range = 'daily' | 'monthly' | 'quarterly';

export interface TimelineData {
  year: number;
  quarters: {
    months: {
      days: number;
    }[];
  }[];
}

export interface GanttContextProps {
  zoom: Ref<number>;
  range: Ref<Range>;
  columnWidth: Ref<number>;
  sidebarWidth: Ref<number>;
  headerHeight: Ref<number>;
  rowHeight: Ref<number>;
  onAddItem?: (date: Date) => void;
  timelineData: Ref<TimelineData[]>;
  containerRef: Ref<HTMLDivElement | null>;
  scrollToFeature: (feature: GanttFeature) => void;
}

export const GanttContextKey: InjectionKey<GanttContextProps> = Symbol('GanttContext');

export const getsDaysIn = (range: Range) => {
  if (range === 'monthly' || range === 'quarterly') return getDaysInMonth;
  return (_date: Date) => 1;
};

export const getDifferenceIn = (range: Range) => {
  if (range === 'monthly' || range === 'quarterly') return differenceInMonths;
  return differenceInDays;
};

export const getInnerDifferenceIn = (range: Range) => {
  if (range === 'monthly' || range === 'quarterly') return differenceInDays;
  return differenceInHours;
};

export const getStartOf = (range: Range) => {
  if (range === 'monthly' || range === 'quarterly') return startOfMonth;
  return startOfDay;
};

export const getEndOf = (range: Range) => {
  if (range === 'monthly' || range === 'quarterly') return endOfMonth;
  return endOfDay;
};

export const getAddRange = (range: Range) => {
  if (range === 'monthly' || range === 'quarterly') return addMonths;
  return addDays;
};

export const createInitialTimelineData = (today: Date): TimelineData[] => {
  const data: TimelineData[] = [];
  data.push(
    { year: today.getFullYear() - 1, quarters: [] },
    { year: today.getFullYear(), quarters: [] },
    { year: today.getFullYear() + 1, quarters: [] },
  );
  for (const yearObj of data) {
    yearObj.quarters = Array.from({ length: 4 }, (_, quarterIndex) => ({
      months: Array.from({ length: 3 }, (_, monthIndex) => {
        const month = quarterIndex * 3 + monthIndex;
        return { days: getDaysInMonth(new Date(yearObj.year, month, 1)) };
      }),
    }));
  }
  return data;
};

export const getOffset = (date: Date, timelineStartDate: Date, context: GanttContextProps) => {
  const parsedColumnWidth =
    (context.columnWidth.value * context.zoom.value) / 100;
  const differenceIn = getDifferenceIn(context.range.value);
  const startOf = getStartOf(context.range.value);
  const fullColumns = differenceIn(startOf(date), timelineStartDate);

  if (context.range.value === 'daily') {
    return parsedColumnWidth * fullColumns;
  }

  const partialColumns = date.getDate();
  const daysInMonth = getDaysInMonth(date);
  const pixelsPerDay = parsedColumnWidth / daysInMonth;
  return fullColumns * parsedColumnWidth + partialColumns * pixelsPerDay;
};

export const getWidth = (startAt: Date, endAt: Date | null, context: GanttContextProps) => {
  const parsedColumnWidth =
    (context.columnWidth.value * context.zoom.value) / 100;
  if (!endAt) return parsedColumnWidth * 2;

  const differenceIn = getDifferenceIn(context.range.value);

  if (context.range.value === 'daily') {
    const delta = differenceIn(endAt, startAt);
    return parsedColumnWidth * (delta > 0 ? delta : 1);
  }

  const daysInStartMonth = getDaysInMonth(startAt);
  const pixelsPerDayInStartMonth = parsedColumnWidth / daysInStartMonth;

  if (isSameDay(startAt, endAt)) {
    return pixelsPerDayInStartMonth;
  }

  const innerDifferenceIn = getInnerDifferenceIn(context.range.value);
  const startOf = getStartOf(context.range.value);

  if (isSameDay(startOf(startAt), startOf(endAt))) {
    return innerDifferenceIn(endAt, startAt) * pixelsPerDayInStartMonth;
  }

  const startRangeOffset = daysInStartMonth - getDate(startAt);
  const endRangeOffset = getDate(endAt);
  const fullRangeOffset = differenceIn(startOf(endAt), startOf(startAt));
  const daysInEndMonth = getDaysInMonth(endAt);
  const pixelsPerDayInEndMonth = parsedColumnWidth / daysInEndMonth;

  return (
    (fullRangeOffset - 1) * parsedColumnWidth +
    startRangeOffset * pixelsPerDayInStartMonth +
    endRangeOffset * pixelsPerDayInEndMonth
  );
};

export const getDateByMousePosition = (context: GanttContextProps, mouseX: number) => {
  const timelineStartDate = new Date(context.timelineData.value[0].year, 0, 1);
  const columnWidth = (context.columnWidth.value * context.zoom.value) / 100;
  const offset = Math.floor(mouseX / columnWidth);
  const daysIn = getsDaysIn(context.range.value);
  const addRange = getAddRange(context.range.value);
  const month = addRange(timelineStartDate, offset);
  const daysInMonth = daysIn(month);
  const pixelsPerDay = Math.round(columnWidth / daysInMonth);
  const dayOffset = Math.floor((mouseX % columnWidth) / pixelsPerDay);
  const actualDate = addDays(month, dayOffset);
  return actualDate;
};

export const calculateInnerOffset = (
  date: Date,
  range: Range,
  columnWidth: number
) => {
  const startOf = getStartOf(range);
  const endOf = getEndOf(range);
  const differenceIn = getInnerDifferenceIn(range);
  const startOfRange = startOf(date);
  const endOfRange = endOf(date);
  const totalRangeDays = differenceIn(endOfRange, startOfRange);
  const dayOfMonth = date.getDate();
  return (dayOfMonth / totalRangeDays) * columnWidth;
};




export const useGantt = (): GanttContextProps => {
  const context = inject(GanttContextKey);
  if (!context) {
    throw new Error('useGantt() must be used within a <GanttProvider />');
  }
  return context;
};