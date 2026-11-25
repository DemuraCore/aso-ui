<script setup lang="ts">
import { cn } from '../../lib/utils'
import { X } from '@lucide/vue'
import { ToastClose, type ToastCloseProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastClose v-bind="delegatedProps" :class="cn('state-layer relative grid size-9 shrink-0 place-items-center rounded-full text-on-surface-variant focus-visible:outline-2 focus-visible:outline-primary', props.class)">
    <X class="size-4.5" />
  </ToastClose>
</template>
