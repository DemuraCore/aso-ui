<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <textarea v-model="modelValue" :class="cn('flex min-h-24 w-full field-sizing-content rounded-2xl border-0 bg-surface-container-highest px-4 py-3 text-base text-on-surface outline-2 outline-offset-0 outline-transparent transition-[outline-color] duration-200 placeholder:text-on-surface-variant/70 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40', props.class)" />
</template>
