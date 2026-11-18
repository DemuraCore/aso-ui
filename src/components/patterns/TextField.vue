<script setup lang="ts">
import { useId } from 'vue'
import { Input } from '../input'
import { Textarea } from '../textarea'

// A labelled input with an optional hint and character count.
const model = defineModel<string>({ required: true })
defineProps<{
  label: string
  type?: string
  hint?: string
  maxlength?: number
  required?: boolean
  autocomplete?: string
  multiline?: boolean
  disabled?: boolean
}>()
const id = useId()
</script>

<template>
  <div class="grid gap-2">
    <label :for="id" class="block px-1 text-sm leading-none font-medium text-on-surface-variant">
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <Textarea
        v-if="multiline"
        :id="id"
        v-model="model"
        :maxlength="maxlength"
        :required="required"
        :disabled="disabled"
        :aria-describedby="hint || maxlength ? `${id}-hint` : undefined"
        rows="3"
      />
      <Input
        v-else
        :id="id"
        v-model="model"
        :type="type ?? 'text'"
        :maxlength="maxlength"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete ?? 'off'"
        :aria-describedby="hint || maxlength ? `${id}-hint` : undefined"
        :class="$slots.trailing && 'pr-30'"
      />
      <div v-if="$slots.trailing" class="absolute right-2 flex items-center gap-0.5">
        <slot name="trailing" />
      </div>
    </div>
    <p
      v-if="hint || maxlength"
      :id="`${id}-hint`"
      class="flex justify-between gap-3 px-4 text-xs text-on-surface-variant"
    >
      <span>{{ hint }}</span>
      <span v-if="maxlength" class="tabular">{{ [...model].length }}/{{ maxlength }}</span>
    </p>
  </div>
</template>
