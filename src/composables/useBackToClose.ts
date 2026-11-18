import { defineComponent, onMounted, onUnmounted } from 'vue'

/** Chrome's close watcher: Android's back gesture asks it to close first. */
interface CloseWatcherLike {
  onclose: (() => void) | null
  destroy(): void
}
type CloseWatcherCtor = new () => CloseWatcherLike

const Watcher =
  typeof window !== 'undefined' ? (window as { CloseWatcher?: CloseWatcherCtor }).CloseWatcher : undefined

// Only Android: elsewhere Esc already closes, and a watcher would hear the
// same Esc again and close the layer underneath too
const isAndroid = typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent)

/**
 * While the calling component is mounted, Android's back gesture closes the
 * dialog, sheet or menu it sits in instead of leaving the page, like an app's.
 * It closes the way Esc does, so the topmost layer goes first and a layer that
 * stops Esc (escape-key-down) stops back too.
 */
export function useBackToClose() {
  if (!Watcher || !isAndroid) return
  let watcher: CloseWatcherLike | null = null
  onMounted(() => {
    watcher = new Watcher()
    watcher.onclose = () => {
      watcher = null
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    }
  })
  onUnmounted(() => watcher?.destroy())
}

/**
 * useBackToClose as a component, for the inside of a reka-ui content (a
 * dialog's, a menu's), which is only mounted while it's open.
 */
export const BackToClose = defineComponent({
  name: 'BackToClose',
  setup() {
    useBackToClose()
    return () => null
  },
})
