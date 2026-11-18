<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { UserAvatar } from '../user-avatar'
import { uiLabels } from '../../lib/labels'

// The signed-in person, in every app: their picture opens a menu with who they
// are on top. The app puts its own DropdownMenuItems in the slot.
withDefaults(
  defineProps<{
    user: { username?: string | null; name?: string; avatar_url: string | null }
    side?: 'top' | 'bottom' | 'right'
  }>(),
  { side: 'bottom' },
)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="state-layer shape-morph relative flex rounded-full p-1 text-on-surface focus-visible:outline-2 focus-visible:outline-primary"
    >
      <UserAvatar :user="user" size="sm" />
      <span class="sr-only">{{ uiLabels.account }}</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent :side="side" align="end" class="w-64">
      <div class="flex items-center gap-3 px-3 py-2.5">
        <UserAvatar :user="user" size="sm" />
        <div class="min-w-0 leading-tight">
          <p class="truncate font-semibold">{{ user.name || user.username }}</p>
          <p v-if="user.username" class="truncate text-sm text-on-surface-variant">
            @{{ user.username }}
          </p>
        </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <slot />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
