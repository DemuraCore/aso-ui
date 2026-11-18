<script setup lang="ts">
import { cn } from '../../lib/utils'
import { ToastViewport, type ToastViewportProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastViewport v-bind="delegatedProps" :class="cn('fixed bottom-20 left-1/2 z-100 flex max-h-screen w-full -translate-x-1/2 flex-col gap-2 p-4 md:bottom-0 md:max-w-[480px]', props.class)" />
</template>
