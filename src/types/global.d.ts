import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }

  interface Window {
    webkitAudioContext: typeof AudioContext
    getRouteHistory?: () => string[]
    isSamePageDifferentLang?: (path1: string, path2: string) => boolean
  }

  interface Document {
    startViewTransition: (updateCallback: () => void) => ViewTransition
  }

  interface ViewTransition {
    finished: Promise<void>
    ready: Promise<void>
    updateCallbackDone: Promise<void>
  }
}

export {}
