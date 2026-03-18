"use client"

import { use } from "react"
import { VenueDetail } from "@/components/group/venue-detail"

export default function GroupVenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <VenueDetail venueId={id} />
    </div>
  )
}
