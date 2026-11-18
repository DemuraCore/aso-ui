<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
import { Button } from '../button'
import { uiLabels } from '../../lib/labels'

// The app keeps the theme; this is the button: v-model:dark
const dark = defineModel<boolean>('dark', { required: true })
</script>

<template>
  <Button
    type="button"
    variant="ghost"
    size="icon"
    :aria-label="dark ? uiLabels.useLightTheme : uiLabels.useDarkTheme"
    :title="dark ? uiLabels.useLightTheme : uiLabels.useDarkTheme"
    @click="dark = !dark"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition duration-300 ease-(--ease-spring-fast)"
      enter-from-class="opacity-0 rotate-90 scale-50"
      leave-active-class="transition duration-100"
      leave-to-class="opacity-0 -rotate-90 scale-50"
    >
      <Sun v-if="dark" />
      <Moon v-else />
    </Transition>
  </Button>
</template>
