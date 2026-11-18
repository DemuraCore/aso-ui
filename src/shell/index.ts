import type { Component } from 'vue'

export { default as AppShell } from './AppShell.vue'

/** One page in the app's navigation */
export interface ShellItem {
  to: string
  label: string
  icon: Component
  /** A count to show on the icon, like open reports */
  badge?: number
}
