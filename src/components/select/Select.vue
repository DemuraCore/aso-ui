<script setup lang="ts" generic="T extends string | number | null">
import { computed, type HTMLAttributes } from 'vue'
import { Check, ChevronDown } from '@lucide/vue'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { cn } from '../../lib/utils'

// A dropdown whose open list is ASO's menu; a native <select> can't do that,
// the browser draws its list. `field` sits in forms, `toolbar` beside filters.
// Other attributes, like id and aria-label, go to the button.
defineOptions({ inheritAttrs: false })
const model = defineModel<T>({ required: true })
const props = withDefaults(
  defineProps<{
    options: { value: T; label: string }[]
    size?: 'field' | 'toolbar'
    class?: HTMLAttributes['class']
  }>(),
  { size: 'field' },
)

// Reka can't hold an empty or null value, and both can mean something to an
// app ("any", "none"), so it tracks positions
const position = computed({
  get: () => {
    const at = props.options.findIndex((o) => o.value === model.value)
    return at < 0 ? undefined : String(at)
  },
  set: (at) => {
    const option = props.options[Number(at)]
    if (option) model.value = option.value
  },
})
const current = computed(() => props.options.find((o) => o.value === model.value))
</script>

<template>
  <SelectRoot v-model="position">
    <SelectTrigger
      v-bind="$attrs"
      :class="
        cn(
          'cursor-pointer items-center justify-between bg-surface-container-highest text-on-surface outline-2 outline-offset-0 outline-transparent transition-[outline-color,background-color] duration-200 hover:bg-surface-container-highest/80 focus-visible:outline-primary data-[state=open]:outline-primary data-disabled:cursor-not-allowed data-disabled:opacity-40',
          size === 'field'
            ? 'flex min-h-14 w-full gap-3 rounded-2xl px-4 py-2 text-left text-base'
            : 'inline-flex h-10 max-w-full gap-2 rounded-full pr-3 pl-4 text-sm',
          props.class,
        )
      "
    >
      <SelectValue class="min-w-0 truncate">{{ current?.label }}</SelectValue>
      <ChevronDown class="size-4.5 shrink-0 text-on-surface-variant" aria-hidden="true" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent
        position="popper"
        :side-offset="4"
        :body-lock="false"
        :class="
          cn(
            'z-60 max-h-[min(20rem,var(--reka-select-content-available-height))] origin-(--reka-select-content-transform-origin) overflow-hidden rounded-2xl bg-surface-container p-1.5 text-on-surface shadow-e2 data-[state=open]:animate-menu-in',
            size === 'field'
              ? 'w-(--reka-select-trigger-width)'
              : 'w-max max-w-[calc(100vw-2rem)] min-w-(--reka-select-trigger-width)',
          )
        "
      >
        <SelectViewport>
          <SelectItem
            v-for="(option, at) in options"
            :key="at"
            :value="String(at)"
            class="relative flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm outline-hidden transition-colors duration-150 select-none data-highlighted:bg-on-surface/10 data-[state=checked]:bg-secondary-container data-[state=checked]:font-medium data-[state=checked]:text-on-secondary-container"
          >
            <SelectItemText>{{ option.label }}</SelectItemText>
            <SelectItemIndicator class="ml-auto flex">
              <Check class="size-5 animate-pop" aria-hidden="true" />
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
