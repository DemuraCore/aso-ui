<script setup lang="ts">
import { cn } from '../../lib/utils'
import { ToastAction, type ToastActionProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastAction v-bind="delegatedProps" :class="cn('inline-flex h-8 shrink-0 items-center justify-center state-layer relative rounded-full px-3 text-sm font-semibold text-primary disabled:pointer-events-none disabled:opacity-40', props.class)">
    <slot />
  </ToastAction>
</template>
