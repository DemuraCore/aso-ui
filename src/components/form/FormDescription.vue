<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { formDescriptionId } = useFormField()
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="cn('px-4 text-xs text-on-surface-variant', props.class)"
  >
    <slot />
  </p>
</template>
