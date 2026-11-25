<script setup lang="ts">
import { isVNode } from 'vue'
import { Check, Info, TriangleAlert } from '@lucide/vue'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'
import { useToast } from './use-toast'

const { toasts } = useToast()

// What kind it is, at a glance: done, went wrong, or worth knowing
const kinds = {
  default: { icon: Check, tone: 'bg-sea-container text-on-sea-container' },
  destructive: { icon: TriangleAlert, tone: 'bg-error-container text-on-error-container' },
  info: { icon: Info, tone: 'bg-primary-container text-on-primary-container' },
}
const kindOf = (variant?: string | null) => kinds[(variant ?? 'default') as keyof typeof kinds] ?? kinds.default
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <span
        class="grid size-8 shrink-0 place-items-center rounded-full"
        :class="kindOf(toast.variant).tone"
        aria-hidden="true"
      >
        <component :is="kindOf(toast.variant).icon" class="size-4" :stroke-width="2.5" />
      </span>
      <div class="grid min-w-0 flex-1 gap-0.5 py-0.5">
        <ToastTitle v-if="toast.title">
          {{ toast.title }}
        </ToastTitle>
        <template v-if="toast.description">
          <ToastDescription v-if="isVNode(toast.description)">
            <component :is="toast.description" />
          </ToastDescription>
          <ToastDescription v-else>
            {{ toast.description }}
          </ToastDescription>
        </template>
      </div>
      <component :is="toast.action" v-if="toast.action" />
      <ToastClose v-else />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
