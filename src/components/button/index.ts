import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

// Material 3 buttons: pill-shaped, with a state layer, squishing on press
export const buttonVariants = cva(
  'relative state-layer shape-morph inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-[0.01em] select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Filled
        default: 'bg-primary text-on-primary hover:shadow-e1',
        destructive: 'bg-error text-on-error hover:shadow-e1',
        // Outlined
        outline: 'border border-outline-variant text-primary',
        // Tonal
        secondary: 'bg-secondary-container text-on-secondary-container hover:shadow-e1',
        tertiary: 'bg-tertiary-container text-on-tertiary-container hover:shadow-e1',
        // Text and icon buttons
        ghost: 'text-on-surface-variant',
        link: 'text-primary underline-offset-4 hover:underline before:hidden',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-8 px-4 text-[13px]',
        lg: 'h-14 px-8 text-base [&_svg]:size-6',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
