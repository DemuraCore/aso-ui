import type { ToastRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Toast } from './Toast.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as Toaster } from './Toaster.vue'
export { default as ToastProvider } from './ToastProvider.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastViewport } from './ToastViewport.vue'
export { toast, useToast } from './use-toast'

import { cva, type VariantProps } from 'class-variance-authority'

// A snackbar on ASO's own surface: a faint outline, a colored icon for what
// kind it is (done, went wrong, worth knowing), the words, then an action or
// a close. Only transform and opacity animate.
export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-high py-2.5 pr-2 pl-3 text-on-surface shadow-e2 transition-transform data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:transition-none data-[state=open]:animate-toast-in data-[state=closed]:animate-toast-out data-[swipe=end]:animate-toast-out',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'destructive',
        info: 'info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}
