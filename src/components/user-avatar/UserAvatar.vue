<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
import { cn } from '../../lib/utils'

const props = withDefaults(
  defineProps<{
    user: { username?: string | null; name?: string; avatar_url: string | null }
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    class?: HTMLAttributes['class']
  }>(),
  { size: 'md' },
)

const sizes = {
  xs: 'h-8 w-8 text-sm',
  sm: 'h-10 w-10 text-base',
  md: 'h-11 w-11 text-lg',
  lg: 'h-16 w-16 text-2xl',
  xl: 'h-28 w-28 text-5xl',
}

// Users without a photo still get a color of their own, the same in every app
const tones = [
  'bg-primary-container text-on-primary-container',
  'bg-tertiary-container text-on-tertiary-container',
  'bg-sea-container text-on-sea-container',
  'bg-sun-container text-on-sun-container',
  'bg-secondary-container text-on-secondary-container',
]
const key = computed(() => props.user.username || props.user.name || '?')
const tone = computed(() => {
  let hash = 0
  for (const char of key.value) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return tones[Math.abs(hash) % tones.length]
})
</script>

<template>
  <Avatar :class="cn(sizes[size], tone, props.class)">
    <AvatarImage
      :src="user.avatar_url ?? ''"
      :alt="user.name || user.username || ''"
      class="h-full w-full object-cover"
    />
    <AvatarFallback>{{ key.trim().charAt(0).toUpperCase() }}</AvatarFallback>
  </Avatar>
</template>
