"use client"

import { useNavigation } from "@/lib/use-navigation"
import { MessageCenter } from "@/components/coach/message-center"

export default function MessagesPage() {
  const { navigate } = useNavigation()
  return <MessageCenter onNavigate={navigate} />
}
