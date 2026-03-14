"use client"

import { use } from "react"
import { useNavigation } from "@/lib/use-navigation"
import { StudentDetail } from "@/components/coach/student-detail"

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { navigate, goBack } = useNavigation()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <StudentDetail studentId={Number(id)} onBack={goBack} onNavigate={navigate} />
    </div>
  )
}
