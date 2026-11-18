<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { type BadgeVariants, badgeVariants } from '.'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- A span, so a badge can sit inside a line of text -->
  <span :class="cn(badgeVariants({ variant, size }), props.class)">
    <slot />
  </span>
</template>
