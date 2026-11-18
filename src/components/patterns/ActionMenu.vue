<script setup lang="ts">
import { nextTick, ref, useId } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { EllipsisVertical } from '@lucide/vue'
import { buttonVariants } from '../button'

// A ⋮ button that opens a menu of actions. The menu is drawn on <body>, so a
// table's scroll box doesn't cut it off, and it follows the keyboard: arrows
// move, Home and End jump, Escape closes and gives focus back. Put
// MenuItem-styled buttons or links with role="menuitem" in the slot; the
// menu closes when one is picked.
defineProps<{ label: string }>()

const open = ref(false)
const trigger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const position = ref({ top: 0, left: 0, up: false })
const id = useId()

const items = () =>
  Array.from(
    panel.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ??
      [],
  )

async function show(focus: 'first' | 'last' = 'first') {
  const rect = trigger.value!.getBoundingClientRect()
  const width = 256
  // Below the button, or above it when there isn't room
  const up = window.innerHeight - rect.bottom < 360 && rect.top > window.innerHeight / 2
  position.value = {
    top: up ? rect.top - 4 : rect.bottom + 4,
    left: Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8)),
    up,
  }
  open.value = true
  await nextTick()
  const list = items()
  ;(focus === 'first' ? list[0] : list[list.length - 1])?.focus()
}

function close(refocus = true) {
  if (!open.value) return
  open.value = false
  if (refocus) trigger.value?.focus()
}

function onTriggerKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    show('first')
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    show('last')
  }
}

function onPanelKey(e: KeyboardEvent) {
  const list = items()
  const at = list.indexOf(document.activeElement as HTMLElement)
  const go = (i: number) => list[(i + list.length) % list.length]?.focus()
  if (e.key === 'ArrowDown') go(at + 1)
  else if (e.key === 'ArrowUp') go(at - 1)
  else if (e.key === 'Home') go(0)
  else if (e.key === 'End') go(list.length - 1)
  else if (e.key === 'Escape') close()
  else if (e.key === 'Tab') close(false)
  else return
  e.preventDefault()
}

// Picking an item closes the menu; the item does its own thing
function onPanelClick(e: MouseEvent) {
  const item = (e.target as HTMLElement).closest('[role="menuitem"]')
  if (item && item.getAttribute('aria-disabled') !== 'true') close(false)
}

onClickOutside(panel, () => close(false), { ignore: [trigger] })
// The menu is fixed where the button was, so it goes when the page moves
useEventListener(window, 'scroll', () => close(false), { capture: true, passive: true })
useEventListener(window, 'resize', () => close(false))

defineExpose({ close })
</script>

<template>
  <button
    ref="trigger"
    type="button"
    :class="buttonVariants({ variant: 'ghost', size: 'icon' })"
    :aria-label="label"
    aria-haspopup="menu"
    :aria-expanded="open"
    :aria-controls="open ? id : undefined"
    @click.stop="open ? close() : show()"
    @keydown="onTriggerKey"
  >
    <EllipsisVertical />
  </button>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0 scale-95"
      enter-active-class="transition duration-150 ease-(--ease-emphasized)"
      leave-to-class="opacity-0"
      leave-active-class="transition duration-100"
    >
      <div
        v-if="open"
        :id="id"
        ref="panel"
        role="menu"
        :aria-label="label"
        class="fixed z-50 w-64 overflow-hidden rounded-2xl bg-surface-container p-1.5 text-left text-on-surface shadow-e2"
        :class="position.up ? '-translate-y-full origin-bottom-right' : 'origin-top-right'"
        :style="{ top: `${position.top}px`, left: `${position.left}px` }"
        @keydown="onPanelKey"
        @click="onPanelClick"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
