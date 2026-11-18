<script setup lang="ts">
import { useId } from 'vue'
import { Switch } from '../switch'

// An on/off setting: its name and what it does, with the switch beside them.
// The default slot adds to the description.
defineProps<{ label: string; description?: string; disabled?: boolean }>()
const model = defineModel<boolean>({ required: true })
const id = useId()
</script>

<template>
  <div class="flex items-center gap-3">
    <label :for="id" class="min-w-0 flex-1 cursor-pointer">
      <span class="block text-sm font-semibold">{{ label }}</span>
      <span v-if="description || $slots.default" class="block text-xs text-on-surface-variant">
        {{ description }}
        <slot />
      </span>
    </label>
    <Switch
      :id="id"
      v-model="model"
      :disabled="disabled"
      class="disabled:cursor-not-allowed disabled:opacity-40"
    />
  </div>
</template>
