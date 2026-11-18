<script setup lang="ts">
import { cn } from '../../lib/utils'
import { Check } from '@lucide/vue'
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex h-11 cursor-pointer select-none items-center gap-3 rounded-xl px-3 text-sm outline-hidden transition-colors duration-150 focus:bg-on-surface/10 data-[state=checked]:bg-secondary-container data-[state=checked]:font-medium data-[state=checked]:text-on-secondary-container data-disabled:pointer-events-none data-disabled:opacity-40 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-on-surface-variant',
        props.class,
      )
    "
  >
    <slot />
    <DropdownMenuItemIndicator class="ml-auto flex">
      <Check class="size-5 animate-pop" />
    </DropdownMenuItemIndicator>
  </DropdownMenuRadioItem>
</template>
