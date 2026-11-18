<script setup lang="ts">
import type { Component } from 'vue'

// ASO's sign-in page: a violet panel with the app's headline beside the form.
// On phones the panel steps aside and the mark sits above the title.
defineProps<{
  /** The app's logo, drawn as a component */
  mark: Component
  /** The app's name, in lowercase like "aso" */
  name: string
  headline: string
  title: string
  description?: string
  highlights?: { label: string; icon: Component; tone: string }[]
}>()
</script>

<template>
  <div class="min-h-dvh bg-surface lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
    <aside
      class="relative m-3 hidden flex-col justify-between overflow-hidden rounded-[40px] bg-primary-container p-12 text-on-primary-container lg:flex"
    >
      <!-- Room for an app's big faded artwork behind the words -->
      <slot name="art" />

      <div class="relative flex items-center gap-3">
        <component :is="mark" class="size-12" />
        <span class="text-display text-3xl">{{ name }}</span>
      </div>

      <div class="relative">
        <h2 class="text-display max-w-md text-5xl leading-[1.05]">{{ headline }}</h2>
        <ul v-if="highlights?.length" class="mt-8 flex flex-wrap gap-2">
          <li
            v-for="item in highlights"
            :key="item.label"
            :class="['flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium', item.tone]"
          >
            <component :is="item.icon" class="size-4" aria-hidden="true" />
            {{ item.label }}
          </li>
        </ul>
      </div>
    </aside>

    <main class="flex min-h-dvh items-center justify-center px-5 py-10 sm:px-8">
      <div class="w-full max-w-sm">
        <div class="mb-10 flex items-center gap-2 lg:hidden">
          <component :is="mark" class="size-10" />
          <span class="text-display text-2xl">{{ name }}</span>
        </div>
        <h1 class="text-display text-4xl">{{ title }}</h1>
        <p v-if="description" class="mt-2 text-on-surface-variant">{{ description }}</p>
        <div class="mt-8">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
