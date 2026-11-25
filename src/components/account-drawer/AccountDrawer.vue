<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { UserAvatar } from '../user-avatar'
import { BackToClose } from '../../composables/useBackToClose'
import { uiLabels } from '../../lib/labels'

// The account menu on phones, as an app's side drawer: your picture opens it
// from the left, with who you are on top (stats below, like follow counts),
// then the app's AccountDrawerItems, and a footer for logging out. Behind it
// the page just dims; a blur costs too much on slower phones.
defineProps<{
  user: { username?: string | null; name?: string; avatar_url: string | null }
}>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger
      class="state-layer shape-morph relative flex rounded-full p-1 text-on-surface focus-visible:outline-2 focus-visible:outline-primary"
    >
      <UserAvatar :user="user" size="sm" />
      <span class="sr-only">{{ uiLabels.account }}</span>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-scrim data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
      />
      <DialogContent
        class="fixed inset-y-0 left-0 z-50 flex h-full w-[82%] max-w-80 flex-col overflow-y-auto rounded-r-[28px] bg-surface-container-low pb-[env(safe-area-inset-bottom)] shadow-e3 outline-none data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:slide-in-from-left"
      >
        <div class="px-6 pt-[calc(2rem+env(safe-area-inset-top))] pb-5">
          <UserAvatar :user="user" size="lg" />
          <DialogTitle class="mt-3 truncate text-lg leading-tight font-semibold">
            {{ user.name || user.username }}
          </DialogTitle>
          <DialogDescription class="truncate text-sm text-on-surface-variant">
            {{ user.username ? `@${user.username}` : '' }}
          </DialogDescription>
          <div v-if="$slots.stats" class="mt-3 flex gap-4 text-sm">
            <slot name="stats" />
          </div>
        </div>

        <div class="mx-6 border-t border-outline-variant" />
        <nav class="flex flex-col gap-0.5 p-3" :aria-label="uiLabels.account">
          <slot />
        </nav>

        <div v-if="$slots.footer" class="mt-auto border-t border-outline-variant p-3">
          <slot name="footer" />
        </div>
        <BackToClose />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
