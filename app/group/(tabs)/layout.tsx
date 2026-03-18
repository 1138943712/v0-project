"use client"

import { usePathname } from "next/navigation"
import { GroupHeader } from "@/components/group/header"
import { GroupBottomNav } from "@/components/group/bottom-nav"

const tabTitles: Record<string, string> = {
  home:       "团体工作台",
  venues:     "场地管理",
  activities: "活动赛事",
  members:    "成员管理",
  profile:    "团体中心",
}

export default function GroupTabsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const activeTab = segments[segments.length - 1] || "home"
  const title = tabTitles[activeTab] ?? "团体工作台"

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {activeTab !== "profile" && <GroupHeader title={title} />}
      <main className="flex-1">
        {children}
      </main>
      <GroupBottomNav activeTab={activeTab} />
    </div>
  )
}
