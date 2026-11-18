<script setup lang="ts">
import { cn } from '../../lib/utils'
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="cn(
      'relative flex h-11 cursor-pointer select-none items-center gap-3 rounded-xl px-3 text-sm outline-hidden transition-colors duration-150 focus:bg-on-surface/10 data-disabled:pointer-events-none data-disabled:opacity-40 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-on-surface-variant',
      inset && 'pl-8',
      props.class,
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>
