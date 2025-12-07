import type { CollectionEntry } from 'astro:content'
import type { Language } from '@/i18n/config'

export type Post = CollectionEntry<'posts'> & {
  remarkPluginFrontmatter: {
    minutes: number
  }
}

export interface ThemeConfig {
  site: {
    title: string
    subtitle: string
    description: string
    i18nTitle: boolean
    author: string
    url: string
    base: string
    favicon: string
  }
  color: {
    mode: 'light' | 'dark' | 'auto'
    light: {
      primary: string
      secondary: string
      background: string
      highlight: string
    }
    dark: {
      primary: string
      secondary: string
      background: string
      highlight: string
    }
  }
  global: {
    locale: Language
    moreLocales: Language[]
    fontStyle: 'sans' | 'serif'
    dateFormat: 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY' | 'MMM D YYYY' | 'D MMM YYYY'
    toc: boolean
    katex: boolean
    reduceMotion: boolean
    layout?: 'sidebar' | 'centered'
  }
  comment: {
    enabled: boolean
    giscus?: {
      repo?: string
      repoId?: string
      category?: string
      categoryId?: string
      mapping?: 'pathname' | 'url' | 'title' | 'og:title'
      strict?: '0' | '1'
      reactionsEnabled?: '0' | '1'
      emitMetadata?: '0' | '1'
      inputPosition?: 'top' | 'bottom'
    }
    twikoo?: {
      envId?: string
    }
    waline?: {
      serverURL?: string
      emoji?: string[]
      search?: boolean
      imageUploader?: boolean
    }
  }
  seo?: {
    twitterID?: string
    verification?: {
      google?: string
      bing?: string
      yandex?: string
      baidu?: string
    }
    googleAnalyticsID?: string
    umamiAnalyticsID?: string
    follow?: {
      feedID?: string
      userID?: string
    }
    apiflashKey?: string
  }
  footer: {
    links: {
      name: string
      url: string
    }[]
    startYear: number
  }
  preload?: {
    imageHostURL?: string
    customGoogleAnalyticsJS?: string
    customUmamiAnalyticsJS?: string
  }
}
