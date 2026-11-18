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
  <ToastClose v-bind="delegatedProps" :class="cn('state-layer absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full opacity-80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-current', props.class)">
    <X class="h-5 w-5" />
  </ToastClose>
</template>
