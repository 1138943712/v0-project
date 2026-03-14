"use client"

import { useNavigation } from "@/lib/use-navigation"
import { Profile } from "@/components/coach/profile"

export default function ProfilePage() {
  const { navigate } = useNavigation()
  return <Profile onNavigate={navigate} />
}
