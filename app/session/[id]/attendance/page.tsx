"use client"

import { use } from "react"
import { useNavigation } from "@/lib/use-navigation"
import { Attendance } from "@/components/coach/attendance"

export default function AttendancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { goBack } = useNavigation()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <Attendance sessionId={Number(id)} onBack={goBack} />
    </div>
  )
}
