"use client"

import { AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BrandHeader } from "@/components/ui/brand-header"
import { FloatingLanguageSwitcher } from "@/components/layout/floating-language-switcher"

interface SharedErrorPageProps {
  title: string
  subtitle: string
  error: string
  description: string
  ctaText: string
}

export function SharedErrorPage({ title, subtitle, error, description, ctaText }: SharedErrorPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 max-w-4xl">
        <BrandHeader
          title={title}
          subtitle={subtitle}
          showCta={true}
          ctaText={ctaText}
        />
        <div className="text-center">
          <Card className="max-w-md mx-auto p-8 text-center space-y-4">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">{error}</h2>
            <p className="text-gray-500">
              {description}
            </p>
          </Card>
        </div>
      </div>

      <FloatingLanguageSwitcher />
    </div>
  )
}