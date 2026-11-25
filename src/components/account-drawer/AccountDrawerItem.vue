<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose, Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '../../lib/utils'

// One row in the AccountDrawer: a button, or with as-child the app's own
// RouterLink. Picking it closes the drawer, unless it stays (like a switch).
const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      /** The page you're on */
      active?: boolean
      /** Keeps the drawer open, for a row with a switch in it */
      stay?: boolean
      class?: HTMLAttributes['class']
    }
  >(),
  { as: 'button' },
)

const row = (active: boolean) =>
  cn(
    'flex h-12 w-full items-center gap-4 rounded-full px-4 text-left text-[15px] font-medium outline-none transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary [&_svg]:size-5 [&_svg]:shrink-0',
    active ? 'bg-secondary-container text-on-secondary-container' : 'hover:bg-on-surface/8',
    props.class,
  )
</script>

<template>
  <Primitive v-if="stay" :as="as" :as-child="asChild" :class="row(active)">
    <slot />
  </Primitive>
  <DialogClose v-else as-child>
    <Primitive
      :as="as"
      :as-child="asChild"
      :class="row(active)"
      :aria-current="active ? 'page' : undefined"
    >
      <slot />
    </Primitive>
  </DialogClose>
</template>
