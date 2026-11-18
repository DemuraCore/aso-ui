<script setup lang="ts">
import { RefreshCw } from '@lucide/vue'
import { Button } from '../button'
import { uiLabels } from '../../lib/labels'

// A page's title, with room for its actions. Refresh shows when the page
// listens for @refresh.
defineProps<{
  title: string
  subtitle?: string
  loading?: boolean
  /** "Updated 12:04", already in the app's words */
  updated?: string
  /** For forms, which have nothing to refresh */
  hideRefresh?: boolean
}>()
defineEmits<{ refresh: [] }>()
</script>

<template>
  <header class="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div class="min-w-0">
      <h1 class="text-display text-3xl break-words">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-sm text-on-surface-variant">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-2">
      <slot />
      <span v-if="updated && !hideRefresh" class="text-xs text-on-surface-variant tabular">
        {{ updated }}
      </span>
      <Button
        v-if="!hideRefresh"
        type="button"
        variant="ghost"
        size="icon"
        :aria-label="uiLabels.refresh"
        :title="uiLabels.refresh"
        @click="$emit('refresh')"
      >
        <RefreshCw :class="loading && 'animate-spin'" />
      </Button>
    </div>
  </header>
</template>
