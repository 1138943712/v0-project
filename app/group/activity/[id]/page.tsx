"use client"

import { use } from "react"
import { ActivityDetail } from "@/components/group/activity-detail"

export default function GroupActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <ActivityDetail activityId={id} />
    </div>
  )
}
