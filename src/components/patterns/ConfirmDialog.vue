<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { LoaderCircle, TriangleAlert } from '@lucide/vue'
import { Button } from '../button'
import { InlineAlert } from '../inline-alert'
import { Input } from '../input'
import { uiLabels } from '../../lib/labels'

// Asks before something that's hard to take back. With confirmText, the
// admin types it first, for what can't be undone at all.
const props = defineProps<{
  open: boolean
  title: string
  confirmLabel: string
  confirmText?: string
  danger?: boolean
  busy?: boolean
  error?: string
}>()
const emit = defineEmits<{ close: []; confirm: [] }>()
// The native close event also fires when `open` goes false here, as when one
// dialog hands over to the next; only the person closing it (Escape) counts

const dialog = ref<HTMLDialogElement | null>(null)
const titleID = useId()
const typed = ref('')
const ready = computed(() => !props.confirmText || typed.value.trim() === props.confirmText)

watch(
  () => props.open,
  (open) => {
    if (open) {
      typed.value = ''
      dialog.value?.showModal()
    } else dialog.value?.close()
  },
)
</script>

<template>
  <dialog
    ref="dialog"
    class="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-3xl bg-surface-container-high p-6 text-left text-on-surface shadow-e3 backdrop:bg-scrim"
    :aria-labelledby="titleID"
    @close="open && emit('close')"
  >
    <form class="grid gap-4" @submit.prevent="ready && emit('confirm')">
      <div class="flex items-start gap-3">
        <span
          v-if="danger"
          class="grid size-10 shrink-0 place-items-center rounded-full bg-error-container text-on-error-container"
        >
          <TriangleAlert class="size-5" aria-hidden="true" />
        </span>
        <div class="min-w-0">
          <h2 :id="titleID" class="text-2xl font-semibold tracking-tight [font-stretch:110%]">
            {{ title }}
          </h2>
          <div class="mt-2 text-sm text-on-surface-variant"><slot /></div>
        </div>
      </div>
      <label v-if="confirmText" class="grid gap-2 text-sm">
        <span class="px-1">
          {{ uiLabels.typeBefore }} <strong class="font-mono">{{ confirmText }}</strong>
          {{ uiLabels.typeAfter }}
        </span>
        <Input v-model="typed" autocomplete="off" spellcheck="false" class="font-mono" />
      </label>
      <InlineAlert v-if="error">{{ error }}</InlineAlert>
      <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" @click="emit('close')">{{ uiLabels.cancel }}</Button>
        <Button
          type="submit"
          :variant="danger ? 'destructive' : 'default'"
          :disabled="!ready || busy"
        >
          <LoaderCircle v-if="busy" class="animate-spin" aria-hidden="true" />
          {{ confirmLabel }}
        </Button>
      </div>
    </form>
  </dialog>
</template>
