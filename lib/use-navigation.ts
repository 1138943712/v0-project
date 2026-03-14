"use client"

import { useRouter } from "next/navigation"
import type { Screen } from "@/lib/navigation"

export function useNavigation() {
  const router = useRouter()

  function navigate(screen: Screen) {
    switch (screen.type) {
      case "course-detail":
        router.push(`/course/${screen.courseId}`)
        break
      case "student-detail":
        router.push(`/student/${screen.studentId}`)
        break
      case "session-detail":
        router.push(`/session/${screen.sessionId}`)
        break
      case "attendance":
        router.push(`/session/${screen.sessionId}/attendance`)
        break
      case "teaching-feedback": {
        const params = new URLSearchParams()
        if (screen.courseId != null) params.set("courseId", String(screen.courseId))
        if (screen.studentId != null) params.set("studentId", String(screen.studentId))
        const qs = params.toString()
        router.push(`/teaching-feedback${qs ? `?${qs}` : ""}`)
        break
      }
      case "message-detail":
        router.push(`/message/${screen.messageId}`)
        break
    }
  }

  function goBack() {
    router.back()
  }

  return { navigate, goBack }
}
