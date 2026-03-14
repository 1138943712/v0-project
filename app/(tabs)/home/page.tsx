"use client"

import { useState } from "react"
import { useNavigation } from "@/lib/use-navigation"
import { GymBanner } from "@/components/coach/gym-banner"
import { GymCard } from "@/components/coach/gym-card"
import { HomeStats } from "@/components/coach/home-stats"
import { TodaySchedule } from "@/components/coach/today-schedule"
import type { Dept } from "@/lib/api"

export default function HomePage() {
  const { navigate } = useNavigation()
  const [bannerList, setBannerList] = useState<string[]>([])

  const handleDeptDetail = (dept: Dept) => {
    setBannerList(dept.imageUrl ? dept.imageUrl.split(",") : [])
  }

  return (
    <div className="px-4 py-4 pb-24 space-y-4">
      <GymBanner list={bannerList} />
      <GymCard onDeptDetail={handleDeptDetail} />
      <HomeStats />
      <TodaySchedule onNavigate={navigate} />
    </div>
  )
}
