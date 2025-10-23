<template>
  <TooltipProvider :delay-duration="0">
    <div
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON
      }"
      :data-state="state"
      :class="sideBarProviderStyles({ class: props.class })"
    >
      <slot
        v-bind="{
          state,
          open,
          setOpen,
          isMobile,
          openMobile,
          setOpenMobile,
          toggleSidebar
        }"
      />
    </div>
  </TooltipProvider>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants'
export const sideBarProviderStyles = tv({
  base: 'group/sidebar-wrapper flex min-h-svh w-full text-sidebar-foreground has-[[data-variant=inset]]:bg-sidebar'
})
</script>

<script setup lang="ts">
import {
  ref,
  watch,
  computed,
  onMounted,
  onUnmounted,
  defineProps,
  defineEmits,
  withDefaults
} from 'vue'
import { TooltipProvider } from '../tooltip'
import {
  provideSidebarContext,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON
} from './utils'

function getCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return m ? decodeURIComponent(m[2]) : null
}

function setCookie(
  name: string,
  value: string,
  opts: { path?: string; maxAge?: number } = {}
) {
  let c = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (opts.maxAge != null) c += `; max-age=${opts.maxAge}`
  if (opts.path) c += `; path=${opts.path}`
  document.cookie = c
}

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    open?: boolean
    class?: string | string[]
  }>(),
  {
    defaultOpen: true,
    open: undefined
  }
)

const emits = defineEmits<{
  (e: 'update:open', open: boolean): void
}>()

const cookieRaw = getCookie(SIDEBAR_COOKIE_NAME)
const open = ref(
  props.open !== undefined
    ? props.open
    : cookieRaw != null
    ? cookieRaw === 'true'
    : props.defaultOpen!
)

watch(() => props.open, v => {
  if (v !== undefined) open.value = v
})

watch(open, v => {
  setCookie(SIDEBAR_COOKIE_NAME, String(v), {
    path: '/',
    maxAge: SIDEBAR_COOKIE_MAX_AGE
  })
  emits('update:open', v)
})

const mql = window.matchMedia('(max-width: 768px)')
const isMobile = ref(mql.matches)
const onMediaChange = (e: MediaQueryListEvent) => (isMobile.value = e.matches)
onMounted(() => mql.addEventListener('change', onMediaChange))
onUnmounted(() => mql.removeEventListener('change', onMediaChange))

const openMobile = ref(false)
const setOpen = (v: boolean) => (open.value = v)
const setOpenMobile = (v: boolean) => (openMobile.value = v)
const toggleSidebar = () =>
  isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === SIDEBAR_KEYBOARD_SHORTCUT && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    toggleSidebar()
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const state = computed(() => (open.value ? 'expanded' : 'collapsed'))

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar
})
</script>


<style>

</style>