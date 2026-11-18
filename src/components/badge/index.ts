import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

// Material 3 assist chips
export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-container text-on-primary-container',
        secondary: 'bg-secondary-container text-on-secondary-container',
        destructive: 'bg-error-container text-on-error-container',
        outline: 'border border-outline-variant text-on-surface-variant',
        muted: 'bg-surface-container-highest text-on-surface-variant',
        sea: 'bg-sea-container text-on-sea-container',
        sun: 'bg-sun-container text-on-sun-container',
      },
      size: {
        default: 'h-7 px-3',
        sm: 'h-6 px-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
