<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { buttonVariants } from '../button'
import { cn } from '../../lib/utils'

// "Sign in with ASO": the button other ASO apps (Asokin, AutoMagi) use to
// send people to ASO's consent page. With `href` it's a link; otherwise a
// button that emits click. `busy` shows a spinner in place of the mark.
const props = withDefaults(
  defineProps<{
    href?: string
    label?: string
    busy?: boolean
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  { label: 'Sign in with ASO' },
)
defineEmits<{ click: [event: MouseEvent] }>()

const classes = computed(() =>
  cn(buttonVariants({ size: 'lg' }), 'w-full', props.busy && 'pointer-events-none', props.class),
)

// The ASO mark's World Line and its "now" dot (see aso-front's lib/brand.ts)
const worldLinePath = 'M14 64 H31 L50 30 L69 64 H75'
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href && !disabled ? href : undefined"
    :type="href ? undefined : 'button'"
    :disabled="href ? undefined : disabled || busy"
    :aria-disabled="disabled || busy || undefined"
    :aria-busy="busy || undefined"
    :class="classes"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="busy"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      class="animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
    <svg v-else viewBox="0 0 100 100" aria-hidden="true" class="overflow-visible">
      <path
        :d="worldLinePath"
        fill="none"
        stroke="currentColor"
        stroke-width="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="84" cy="64" r="8" class="fill-tertiary-container" />
    </svg>
    {{ label }}
  </component>
</template>
