export const locales = ['en', 'zh-CN'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'en'

export const i18n = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
}

