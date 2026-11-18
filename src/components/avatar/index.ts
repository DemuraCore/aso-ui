import { cva, type VariantProps } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarImage } from './AvatarImage.vue'

export const avatarVariant = cva(
  'inline-flex items-center justify-center font-semibold select-none shrink-0 bg-primary-container text-on-primary-container overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-10 w-10 text-base',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-28 w-28 text-5xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-2xl',
      },
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>
