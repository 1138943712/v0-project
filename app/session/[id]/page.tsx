"use client"

import { use } from "react"
import { useNavigation } from "@/lib/use-navigation"
import { SessionDetail } from "@/components/coach/session-detail"

export default function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { navigate, goBack } = useNavigation()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <SessionDetail sessionId={Number(id)} onBack={goBack} onNavigate={navigate} />
    </div>
  )
}
