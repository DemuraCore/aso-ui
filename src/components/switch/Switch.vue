<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { cn } from '../../lib/utils'

// A Material 3 switch: the thumb grows and shows a check when it's on
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
const checked = defineModel<boolean>({ default: false })
</script>

<template>
  <SwitchRoot
    v-model="checked"
    :class="
      cn(
        'group relative inline-flex h-8 w-13 shrink-0 items-center rounded-full border-2 border-outline bg-surface-container-highest transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary',
        props.class,
      )
    "
  >
    <SwitchThumb
      class="grid size-4 translate-x-1.5 place-items-center rounded-full bg-outline transition-[translate,width,height,background-color] duration-300 ease-(--ease-spring-fast) group-active:size-7 data-[state=checked]:size-6 data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-on-primary"
    >
      <Check
        class="size-4 text-primary opacity-0 transition-opacity group-data-[state=checked]:opacity-100"
        :stroke-width="3"
      />
    </SwitchThumb>
  </SwitchRoot>
</template>
