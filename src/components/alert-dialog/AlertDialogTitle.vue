<script setup lang="ts">
import { cn } from '../../lib/utils'
import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogTitle
    v-bind="delegatedProps"
    :class="cn('text-2xl font-semibold tracking-tight [font-stretch:110%]', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
