"use client"

import { use } from "react"
import { MemberDetail } from "@/components/group/member-detail"

export default function GroupMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <MemberDetail memberId={id} />
    </div>
  )
}
