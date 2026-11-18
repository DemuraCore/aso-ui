<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaQuery, useWindowScroll } from '@vueuse/core'
import { Menu } from '@lucide/vue'
import { Sheet, SheetContent, SheetTitle } from '../components/sheet'
import { uiLabels } from '../lib/labels'
import type { ShellItem } from '.'

// ASO's navigation: a rail on desktop, expanded with labels on wide screens; a
// top app bar and a bottom bar on phones. With more pages than the bottom bar
// fits, the rest go under More.
const props = defineProps<{
  items: ShellItem[]
  /** The app's logo, drawn as a component */
  mark: Component
  /** The app's name, in lowercase like "aso" */
  name: string
}>()

const route = useRoute()
const desktop = useMediaQuery('(min-width: 48rem)')
const { y } = useWindowScroll()

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`)
const badgeText = (n: number) => (n > 99 ? '99+' : String(n))

const overflowing = computed(() => props.items.length > 6)
const tabs = computed(() => (overflowing.value ? props.items.slice(0, 4) : props.items))
const rest = computed(() => (overflowing.value ? props.items.slice(4) : []))
const restActive = computed(() => rest.value.some((item) => isActive(item.to)))
const columns = computed(() => tabs.value.length + (overflowing.value ? 1 : 0))
const moreOpen = ref(false)

const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const iconTone = (active: boolean) =>
  active ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant'
</script>

<template>
  <div class="min-h-dvh md:flex">
    <nav
      v-if="desktop"
      :aria-label="uiLabels.main"
      class="sticky top-0 z-40 flex h-dvh w-24 shrink-0 flex-col items-center gap-6 overflow-y-auto py-5 [scrollbar-width:none] xl:w-72 xl:items-stretch xl:px-4"
    >
      <RouterLink
        to="/"
        :aria-label="name"
        :class="['group flex shrink-0 items-center gap-3 rounded-2xl xl:px-3', focusRing]"
      >
        <component :is="mark" class="size-11" />
        <span class="text-display hidden text-[28px] leading-none xl:inline">{{ name }}</span>
      </RouterLink>

      <div class="flex flex-col gap-1">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          :class="[
            'flex shrink-0 flex-col items-center gap-1 rounded-2xl xl:h-12 xl:flex-row xl:gap-4 xl:rounded-full xl:px-4',
            focusRing,
            isActive(item.to) ? 'xl:bg-secondary-container' : 'xl:hover:bg-on-surface/8',
          ]"
        >
          <span
            :class="[
              'state-layer relative flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-300 xl:w-auto xl:before:hidden',
              iconTone(isActive(item.to)),
            ]"
          >
            <component
              :is="item.icon"
              class="size-6"
              :stroke-width="isActive(item.to) ? 2.5 : 2"
              aria-hidden="true"
            />
            <span
              v-if="item.badge"
              class="absolute -top-1 left-1/2 ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] leading-none font-semibold text-on-error tabular-nums xl:-right-1.5 xl:left-auto xl:ml-0"
              >{{ badgeText(item.badge) }}</span
            >
          </span>
          <span
            :class="[
              'text-xs font-medium xl:text-sm',
              isActive(item.to)
                ? 'text-on-surface xl:text-on-secondary-container'
                : 'text-on-surface-variant',
            ]"
            >{{ item.label }}</span
          >
        </RouterLink>
      </div>

      <div class="mt-auto flex shrink-0 flex-col items-center gap-3 xl:items-stretch">
        <slot name="rail-footer" />
      </div>
    </nav>

    <header
      v-else
      class="sticky top-0 z-30 flex min-h-16 items-center gap-1 px-4 pt-[env(safe-area-inset-top)] transition-colors duration-300"
      :class="y > 4 ? 'bg-surface-container/90 backdrop-blur-md' : 'bg-surface'"
    >
      <RouterLink
        to="/"
        :aria-label="name"
        :class="['group mr-auto flex min-w-0 items-center gap-2 rounded-2xl', focusRing]"
      >
        <component :is="mark" class="size-9 shrink-0" />
        <span class="text-display truncate text-2xl leading-none">{{ name }}</span>
      </RouterLink>
      <slot name="top-actions" />
    </header>

    <main
      class="min-w-0 flex-1 px-4 pt-2 pb-[calc(6rem+env(safe-area-inset-bottom))] md:px-8 md:py-8"
    >
      <div class="mx-auto max-w-7xl">
        <slot />
      </div>
    </main>

    <nav
      v-if="!desktop"
      :aria-label="uiLabels.main"
      class="fixed inset-x-0 bottom-0 z-40 grid bg-surface-container pb-[env(safe-area-inset-bottom)]"
      :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
    >
      <RouterLink
        v-for="item in tabs"
        :key="item.to"
        :to="item.to"
        :aria-label="item.badge ? `${item.label}, ${badgeText(item.badge)}` : item.label"
        :aria-current="isActive(item.to) ? 'page' : undefined"
        :class="['flex h-20 min-w-0 flex-col items-center justify-center gap-1', focusRing]"
      >
        <span
          :class="[
            'state-layer relative flex h-8 w-12 max-w-full items-center justify-center rounded-full transition-colors duration-300',
            iconTone(isActive(item.to)),
          ]"
        >
          <component
            :is="item.icon"
            class="size-6"
            :stroke-width="isActive(item.to) ? 2.5 : 2"
            aria-hidden="true"
          />
          <span
            v-if="item.badge"
            class="absolute -top-1 left-1/2 ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] leading-none font-semibold text-on-error tabular-nums"
            aria-hidden="true"
            >{{ badgeText(item.badge) }}</span
          >
        </span>
        <!-- Only the open page says its name; the icons say the rest -->
        <span
          v-if="isActive(item.to)"
          class="max-w-full truncate px-0.5 text-xs font-medium text-on-surface"
          aria-hidden="true"
          >{{ item.label }}</span
        >
      </RouterLink>
      <button
        v-if="overflowing"
        type="button"
        :aria-label="uiLabels.more"
        aria-haspopup="dialog"
        :aria-expanded="moreOpen"
        :class="['flex h-20 min-w-0 flex-col items-center justify-center gap-1', focusRing]"
        @click="moreOpen = true"
      >
        <span
          :class="[
            'state-layer relative flex h-8 w-12 max-w-full items-center justify-center rounded-full transition-colors duration-300',
            iconTone(restActive),
          ]"
        >
          <Menu class="size-6" :stroke-width="restActive ? 2.5 : 2" aria-hidden="true" />
        </span>
        <span
          v-if="restActive"
          class="max-w-full truncate px-0.5 text-xs font-medium text-on-surface"
          aria-hidden="true"
          >{{ uiLabels.more }}</span
        >
      </button>
    </nav>

    <Sheet v-model:open="moreOpen">
      <SheetContent
        side="bottom"
        class="rounded-t-3xl border-0 bg-surface-container-high pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <SheetTitle class="mb-3 text-2xl font-semibold tracking-tight">{{ uiLabels.more }}</SheetTitle>
        <div class="flex flex-col gap-1">
          <RouterLink
            v-for="item in rest"
            :key="item.to"
            :to="item.to"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            :class="[
              'flex h-12 items-center gap-3 rounded-full px-4 text-sm font-medium',
              focusRing,
              iconTone(isActive(item.to)),
            ]"
            @click="moreOpen = false"
          >
            <component :is="item.icon" class="size-5" aria-hidden="true" />
            {{ item.label }}
          </RouterLink>
        </div>
        <slot name="more-footer" />
      </SheetContent>
    </Sheet>
  </div>
</template>
