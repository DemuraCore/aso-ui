<script setup lang="ts">
import { computed, onUnmounted, ref, watch, type Component } from 'vue'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { Plug, PlugZap, Unplug } from '@lucide/vue'
import { BackToClose } from '../../composables/useBackToClose'

// The live connection's status, always in view: an icon and a word with the
// color, never color alone. Clicking it opens the app's details (the slot).
defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    status: 'live' | 'connecting' | 'reconnecting' | 'idle'
    /** "Connected" */
    word: string
    /** What it's connected to, or the retry countdown */
    detail?: string
    /** Says what the button opens, for screen readers */
    label: string
    /** Replaces the status's icon, for a state only this app has */
    icon?: Component
    /** For the phone's top bar: says the status, then settles to the icon */
    mini?: boolean
    compact?: boolean
  }>(),
  { detail: '', icon: undefined, mini: false, compact: false },
)

const open = ref(false)
const plugging = computed(() => props.status === 'connecting' || props.status === 'reconnecting')
const shownIcon = computed(
  () => props.icon ?? (props.status === 'live' ? PlugZap : props.status === 'idle' ? Unplug : Plug),
)
const tone = computed(
  () =>
    ({
      live: 'bg-sea-container text-on-sea-container',
      connecting: 'bg-secondary-container text-on-secondary-container',
      reconnecting: 'bg-error-container text-on-error-container',
      idle: 'bg-surface-container-highest text-on-surface-variant',
    })[props.status],
)

// The capsule spells out what it's connected to for a moment whenever that
// changes, then settles to just the status. Hovering spells it out again.
const announcing = ref(true)
const hovering = ref(false)
let settleTimer: ReturnType<typeof setTimeout> | undefined
watch(
  () => [props.status, props.detail],
  () => {
    announcing.value = true
    clearTimeout(settleTimer)
    settleTimer = setTimeout(() => (announcing.value = false), 3500)
  },
  { immediate: true },
)
onUnmounted(() => clearTimeout(settleTimer))

const wantsExpanded = computed(
  () =>
    (props.mini || !!props.detail) &&
    (announcing.value || hovering.value || props.status === 'reconnecting'),
)
// While the panel is open the capsule keeps its size: the panel is anchored
// to it, so a capsule shrinking underneath would drag the panel sideways
const expandedWhileOpen = ref(false)
const expanded = computed(() => (open.value ? expandedWhileOpen.value : wantsExpanded.value))
watch(
  open,
  (isOpen) => {
    if (isOpen) expandedWhileOpen.value = wantsExpanded.value
  },
  { flush: 'sync' },
)
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      v-bind="$attrs"
      :class="[
        'state-layer shape-morph relative inline-flex h-9 min-w-0 items-center rounded-full text-xs font-semibold shadow-e1 transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        mini ? 'px-2.5' : 'gap-2 pr-3.5 pl-2.5',
        compact ? 'max-w-44' : 'max-w-full',
        tone,
      ]"
      :aria-label="label"
      @pointerenter="hovering = true"
      @pointerleave="hovering = false"
    >
      <component
        :is="shownIcon"
        :key="status"
        :class="['size-4 shrink-0', plugging ? 'animate-plug-in' : status === 'live' && 'animate-pop']"
      />
      <span
        v-if="mini"
        :class="[
          'overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-700 ease-(--ease-emphasized)',
          expanded ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0',
        ]"
        aria-hidden="true"
        ><span class="block pr-1 pl-2">{{ word }}</span></span
      >
      <span v-else class="flex min-w-0 items-center whitespace-nowrap">
        <span class="shrink-0">{{ word }}</span>
        <span
          :class="[
            'min-w-0 overflow-hidden font-medium text-ellipsis transition-[max-width,opacity] duration-700 ease-(--ease-emphasized)',
            expanded ? 'max-w-64 opacity-100' : 'max-w-0 opacity-0',
          ]"
          aria-hidden="true"
          >&nbsp;{{ detail }}</span
        >
      </span>
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        side="bottom"
        align="end"
        :side-offset="8"
        :collision-padding="12"
        class="z-50 max-h-(--reka-popover-content-available-height) w-[min(360px,calc(100vw-24px))] origin-(--reka-popover-content-transform-origin) overflow-y-auto overscroll-contain rounded-3xl bg-surface-container-high p-5 text-on-surface shadow-e3 outline-none [scrollbar-width:thin] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90 data-[state=open]:duration-300 data-[state=open]:ease-(--ease-spring-fast)"
      >
        <slot :tone="tone" :icon="shownIcon" :plugging="plugging" :close="() => (open = false)" />
        <BackToClose />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
