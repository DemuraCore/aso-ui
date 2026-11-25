import { reactive } from 'vue'

/** The few words the components say themselves. Apps that translate set these. */
export const uiLabels = reactive({
  account: 'Account menu',
  back: 'Back',
  cancel: 'Cancel',
  close: 'Close',
  main: 'Main',
  more: 'More',
  refresh: 'Refresh',
  retry: 'Try again',
  /** "Type DELETE to confirm", around the word to type */
  typeBefore: 'Type',
  typeAfter: 'to confirm',
  useDarkTheme: 'Switch to dark mode',
  useLightTheme: 'Switch to light mode',
})
