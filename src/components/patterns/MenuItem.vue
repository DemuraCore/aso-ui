<script setup lang="ts">
import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

// One action in an ActionMenu: a router link, an outside link, or a button.
// A disabled one stays in the list with the reason as its hint, so the admin
// sees why rather than wondering where it went.
const props = defineProps<{
  icon?: Component
  to?: RouteLocationRaw
  href?: string
  danger?: boolean
  disabled?: boolean
  /** A second line: what it does, or why it's disabled */
  hint?: string
}>()
const emit = defineEmits<{ select: [] }>()

const classes = [
  'relative flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm outline-hidden transition-colors duration-150',
  'hover:bg-on-surface/10 focus-visible:bg-on-surface/10',
  'aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-transparent',
]

function pick(e: Event) {
  if (props.disabled) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  emit('select')
}
</script>

<template>
  <RouterLink
    v-if="to && !disabled"
    :to="to"
    role="menuitem"
    tabindex="-1"
    :class="classes"
    @click="pick"
  >
    <component :is="icon" v-if="icon" class="size-5 shrink-0 text-on-surface-variant" />
    <span class="min-w-0">
      <span class="block"><slot /></span>
      <span v-if="hint" class="block text-xs text-on-surface-variant">{{ hint }}</span>
    </span>
  </RouterLink>
  <a
    v-else-if="href && !disabled"
    :href="href"
    target="_blank"
    rel="noopener"
    role="menuitem"
    tabindex="-1"
    :class="classes"
    @click="pick"
  >
    <component :is="icon" v-if="icon" class="size-5 shrink-0 text-on-surface-variant" />
    <span class="min-w-0">
      <span class="block"><slot /></span>
      <span v-if="hint" class="block text-xs text-on-surface-variant">{{ hint }}</span>
    </span>
  </a>
  <button
    v-else
    type="button"
    role="menuitem"
    tabindex="-1"
    :aria-disabled="disabled || undefined"
    :class="[classes, danger && 'text-error']"
    @click="pick"
  >
    <component
      :is="icon"
      v-if="icon"
      class="size-5 shrink-0"
      :class="danger ? 'text-error' : 'text-on-surface-variant'"
    />
    <span class="min-w-0">
      <span class="block"><slot /></span>
      <span v-if="hint" class="block text-xs text-on-surface-variant">{{ hint }}</span>
    </span>
  </button>
</template>
