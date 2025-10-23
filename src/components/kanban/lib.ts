import type { InjectionKey, Ref } from 'vue'

export type KanbanItemProps = {
  id: string
  name: string
  column: string
  startAt: Date
  endAt: Date
  owner: {
    name: string
    image: string
  }
} & Record<string, unknown>

export type KanbanColumnProps = {
  id: string
  name: string
  color: string
} & Record<string, unknown>

export type GroupedKanbanData<T extends KanbanItemProps> = Record<string, T[]>

export type KanbanContextProps<
  T extends KanbanItemProps = KanbanItemProps,
  C extends KanbanColumnProps = KanbanColumnProps,
> = {
  columns: Ref<C[]>
  groupedData: Ref<GroupedKanbanData<T>>
  activeCardId: Ref<string | null>
  updateCardColumn: (cardId: string, newColumnId: string) => void
}

export const KanbanContextKey: InjectionKey<KanbanContextProps> = Symbol('KanbanContext')