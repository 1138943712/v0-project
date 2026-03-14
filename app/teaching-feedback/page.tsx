"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useNavigation } from "@/lib/use-navigation"
import { TeachingFeedback } from "@/components/coach/teaching-feedback"

function TeachingFeedbackContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId") ? Number(searchParams.get("courseId")) : undefined
  const studentId = searchParams.get("studentId") ? Number(searchParams.get("studentId")) : undefined
  const { navigate, goBack } = useNavigation()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <TeachingFeedback courseId={courseId} studentId={studentId} onBack={goBack} onNavigate={navigate} />
    </div>
  )
}

export default function TeachingFeedbackPage() {
  return (
    <Suspense>
      <TeachingFeedbackContent />
    </Suspense>
  )
}
