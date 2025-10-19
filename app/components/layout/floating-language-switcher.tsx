"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { i18n } from "@/i18n/config"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FloatingLanguageSwitcher() {
  const t = useTranslations("common")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`

    const segments = pathname.split("/")
    if (i18n.locales.includes(segments[1] as any)) {
      segments[1] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    const newPath = segments.join("/")

    router.push(newPath)
    router.refresh()
  }

  const getLanguageName = (loc: string) => {
    switch (loc) {
      case "en":
        return "English"
      case "zh-CN":
        return "简体中文"
      default:
        return loc
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-white dark:bg-background rounded-full shadow-lg group relative border-primary/20 hover:border-primary/40 transition-all"
          >
            <Languages className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="sr-only">{t("lang.switch")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="mb-2">
          {i18n.locales.map((loc) => (
            <DropdownMenuItem
              key={loc}
              onClick={() => switchLocale(loc)}
              className={locale === loc ? "bg-accent" : ""}
            >
              {getLanguageName(loc)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
