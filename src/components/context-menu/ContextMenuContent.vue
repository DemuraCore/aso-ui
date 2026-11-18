<script setup lang="ts">
import { cn } from '../../lib/utils'
import {
  ContextMenuContent,
  type ContextMenuContentEmits,
  type ContextMenuContentProps,
  ContextMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { BackToClose } from '../../composables/useBackToClose'

const props = withDefaults(
  defineProps<ContextMenuContentProps & { class?: HTMLAttributes['class'] }>(),
  { collisionPadding: 8 },
)
const emits = defineEmits<ContextMenuContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<!-- Looks like DropdownMenuContent and takes the same DropdownMenuItems: both
     are reka's MenuItem underneath, so one list of actions fits either menu -->
<template>
  <ContextMenuPortal>
    <ContextMenuContent
      v-bind="forwarded"
      :class="cn('z-50 min-w-48 origin-(--reka-context-menu-content-transform-origin) overflow-hidden rounded-2xl bg-surface-container p-1.5 text-on-surface shadow-e2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95', props.class)"
    >
      <slot />
      <BackToClose />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
