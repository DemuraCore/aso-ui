# aso-ui

The theme and UI components every ASO app shares. Change something here and each app picks it up with its next version bump.

## Use it in an app

```sh
pnpm add github:DemuraCore/aso-ui#v0.4.6 @lucide/vue @vueuse/core
```

In the app's main CSS file, instead of importing Tailwind:

```css
@import '@aso/ui/theme.css';
@source '../node_modules/@aso/ui/src';
```

The `@source` line is needed: Tailwind skips `node_modules`, so without it the components' own classes (the switch, dialog dimming, sheets) are left out of the app's CSS. The path is relative to that CSS file.

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
| `@aso/ui` | Buttons, fields, dropdowns, dialogs, menus, toasts, badges, the account menu and phone account drawer, live status, page headers, cards, stat tiles, the sign-in layout and the "Sign in with ASO" button |
| `@aso/ui/shell` | `AppShell`: the navigation rail and phone bars. Put an `AccountDrawer` in its `#account` slot. Needs `vue-router` |
| `@aso/ui/form` | Form fields with validation. Needs `vee-validate` |
| `@aso/ui/theme.css` | Tailwind, the colors, shapes, shadows, motion and scrollbars |

Apps that translate their words set the shared labels once:

```ts
import { uiLabels } from '@aso/ui'
uiLabels.close = t('common.close')
```

## Adding to it

A component two apps could use belongs here, not in an app. Apps only keep what is about their own data.

## Release a change

1. Change the component or theme here.
2. Raise `version` in `package.json`, commit and tag it (`v0.2.0`).
3. Update the `#v0.2.0` in each app's `package.json`.
