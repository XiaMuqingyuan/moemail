import { getTranslations } from "next-intl/server"
import { getSharedMessage } from "@/lib/shared-data"
import { SharedErrorPage } from "@/components/emails/shared-error-page"
import { SharedMessagePageClient } from "./page-client"

interface PageProps {
  params: Promise<{
    token: string
    locale: string
  }>
}

export default async function SharedMessagePage({ params }: PageProps) {
  const { token } = await params
  const tShared = await getTranslations("emails.shared")
  
  // 服务端获取数据
  const message = await getSharedMessage(token)
  
  if (!message) {
    return (
      <SharedErrorPage
        title={tShared("messageNotFound")}
        subtitle={tShared("linkExpired")}
        error={tShared("linkInvalid")}
        description={tShared("linkInvalidDescription")}
        ctaText={tShared("createOwnEmail")}
      />
    )
  }

  return <SharedMessagePageClient message={message} />
}
