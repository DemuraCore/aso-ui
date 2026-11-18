# aso-ui

The theme and UI components every ASO app shares. Change something here and each app picks it up with its next version bump.

## Use it in an app

```sh
pnpm add github:DemuraCore/aso-ui#v0.1.0 @lucide/vue @vueuse/core
```

In the app's main CSS file, instead of importing Tailwind:

```css
@import '@aso/ui/theme.css';
```

In `vite.config.ts`, because the package ships Vue source files:

```ts
optimizeDeps: { exclude: ['@aso/ui'] },
```

Then use the components:

```vue
<script setup lang="ts">
import { Button, Input, Select } from '@aso/ui'
</script>
```

| Import | What's in it |
|---|---|
| `@aso/ui` | Buttons, fields, dropdowns, dialogs, menus, toasts, badges and the sign-in layout |
| `@aso/ui/shell` | `AppShell`: the navigation rail and phone bars. Needs `vue-router` |
| `@aso/ui/form` | Form fields with validation. Needs `vee-validate` |
| `@aso/ui/theme.css` | Tailwind, the colors, shapes, shadows and motion |

Apps that translate their words set the shared labels once:

```ts
import { uiLabels } from '@aso/ui'
uiLabels.close = t('common.close')
```

## Release a change

1. Change the component or theme here.
2. Raise `version` in `package.json`, commit and tag it (`v0.2.0`).
3. Update the `#v0.2.0` in each app's `package.json`.
