<script setup lang="ts">
import { CircleAlert, CircleCheck } from '@lucide/vue'

withDefaults(defineProps<{ variant?: 'error' | 'success' }>(), { variant: 'error' })
</script>

<template>
  <div
    :role="variant === 'error' ? 'alert' : 'status'"
    :class="[
      'flex items-start gap-3 rounded-2xl px-4 py-3 text-sm',
      variant === 'error'
        ? 'bg-error-container text-on-error-container'
        : 'bg-sea-container text-on-sea-container',
    ]"
  >
    <CircleAlert v-if="variant === 'error'" class="mt-px size-4.5 shrink-0" />
    <CircleCheck v-else class="mt-px size-4.5 shrink-0" />
    <span><slot /></span>
  </div>
</template>
