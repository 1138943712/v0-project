"use client"

import { useNavigation } from "@/lib/use-navigation"
import { CourseCalendar } from "@/components/coach/course-calendar"

export default function CalendarPage() {
  const { navigate } = useNavigation()
  return <CourseCalendar onNavigate={navigate} />
}
