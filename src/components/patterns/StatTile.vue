<script setup lang="ts">
import type { Component } from 'vue'

// A number with its label; it rolls into place when what's on screen changes
defineProps<{
  label: string
  /** Already formatted the way the app wants, like 126.4K */
  value: string | number
  /** The exact number, on hover */
  exact?: string
  /** What the number is relative to */
  note?: string
  icon?: Component
}>()
</script>

<template>
  <div class="flex min-w-0 flex-col gap-1 rounded-3xl bg-surface-container-low p-4">
    <div class="flex items-center gap-2 text-sm text-on-surface-variant">
      <component :is="icon" v-if="icon" class="size-4" aria-hidden="true" />
      <span>{{ label }}</span>
    </div>
    <p class="text-display text-3xl tabular" :title="exact">
      <span class="relative inline-grid overflow-hidden">
        <Transition name="tick">
          <span :key="value">{{ value }}</span>
        </Transition>
      </span>
    </p>
    <p v-if="note" class="text-xs text-on-surface-variant tabular">{{ note }}</p>
  </div>
</template>
