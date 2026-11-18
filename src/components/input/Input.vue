<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
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
  <input v-model="modelValue" :class="cn('flex h-14 w-full rounded-2xl border-0 bg-surface-container-highest px-4 text-base text-on-surface outline-2 outline-offset-0 outline-transparent transition-[outline-color,background-color] duration-200 file:mr-3 file:h-8 file:rounded-full file:border-0 file:bg-secondary-container file:px-4 file:text-sm file:font-medium file:text-on-secondary-container placeholder:text-on-surface-variant/70 hover:bg-surface-container-highest/80 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:outline-error', props.class)">
</template>
