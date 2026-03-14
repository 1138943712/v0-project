"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/coach/header"
import { BottomNav } from "@/components/coach/bottom-nav"

const tabTitles: Record<string, string> = {
  home:     "工作台",
  students: "学员管理",
  calendar: "课程日历",
  messages: "消息中心",
  profile:  "个人中心",
}

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const activeTab = pathname.replace("/", "") || "home"
  const title = tabTitles[activeTab] ?? "工作台"

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {activeTab !== "profile" && <Header title={title} />}
      <main className="flex-1">
        {children}
      </main>
      <BottomNav activeTab={activeTab} />
    </div>
  )
}
