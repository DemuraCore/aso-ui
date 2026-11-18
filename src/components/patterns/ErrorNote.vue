<script setup lang="ts">
import { CircleAlert } from '@lucide/vue'
import { uiLabels } from '../../lib/labels'

// Something failed to load, with a way to try it again
defineProps<{ message: string }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    role="alert"
    class="mb-4 flex items-center gap-3 rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container"
  >
    <CircleAlert class="size-4.5 shrink-0" aria-hidden="true" />
    <p class="flex-1">{{ message }}</p>
    <button type="button" class="font-medium underline underline-offset-2" @click="$emit('retry')">
      {{ uiLabels.retry }}
    </button>
  </div>
</template>
