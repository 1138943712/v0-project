"use client"

import { use } from "react"
import { useNavigation } from "@/lib/use-navigation"
import { MessageDetail } from "@/components/coach/message-detail"

export default function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { navigate, goBack } = useNavigation()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <MessageDetail messageId={Number(id)} onBack={goBack} onNavigate={navigate} />
    </div>
  )
}
