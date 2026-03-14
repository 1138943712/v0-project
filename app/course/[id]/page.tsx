"use client"

import { use } from "react"
import { useNavigation } from "@/lib/use-navigation"
import { CourseDetail } from "@/components/coach/course-detail"

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { navigate, goBack } = useNavigation()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <CourseDetail courseId={Number(id)} onBack={goBack} onNavigate={navigate} />
    </div>
  )
}
