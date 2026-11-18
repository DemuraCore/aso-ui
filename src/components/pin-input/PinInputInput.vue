<script setup lang="ts">
import { cn } from '../../lib/utils'
import { PinInputInput, type PinInputInputProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<PinInputInputProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <PinInputInput v-bind="forwardedProps" :class="cn('relative flex h-14 w-12 items-center justify-center rounded-2xl bg-surface-container-highest text-center text-xl font-semibold text-on-surface outline-2 outline-transparent transition-[outline-color] duration-200 placeholder:text-on-surface-variant/50 focus:z-10 focus:outline-primary', props.class)" />
</template>
