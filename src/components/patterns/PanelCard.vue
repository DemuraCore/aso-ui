<script setup lang="ts">
// One group of content on a page, optionally titled
defineProps<{ title?: string; subtitle?: string }>()
</script>

<template>
  <section class="min-w-0 rounded-3xl bg-surface-container-low p-5">
    <header
      v-if="title || $slots.actions"
      class="mb-4 flex flex-wrap items-start justify-between gap-2"
    >
      <div>
        <h2 class="text-base font-semibold">{{ title }}</h2>
        <p v-if="subtitle" class="text-xs text-on-surface-variant">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </header>
    <slot />
  </section>
</template>
