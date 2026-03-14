"use client"

import { useNavigation } from "@/lib/use-navigation"
import { StudentList } from "@/components/coach/student-list"

export default function StudentsPage() {
  const { navigate } = useNavigation()
  return <StudentList onNavigate={navigate} />
}
