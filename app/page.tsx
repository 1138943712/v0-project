"use client"

import { useState } from "react"
import { Header } from "@/components/coach/header"
import { BottomNav } from "@/components/coach/bottom-nav"
import { HomeStats } from "@/components/coach/home-stats"
import { TodaySchedule } from "@/components/coach/today-schedule"
import { StudentList } from "@/components/coach/student-list"
import { CourseManagement } from "@/components/coach/course-management"
import { MessageCenter } from "@/components/coach/message-center"
import { Profile } from "@/components/coach/profile"

const tabTitles: Record<string, string> = {
  home: "工作台",
  students: "学员管理",
  courses: "课程管理",
  messages: "消息中心",
  profile: "个人中心",
}

export default function CoachApp() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Header - not shown on profile page */}
      {activeTab !== "profile" && (
        <Header title={tabTitles[activeTab]} />
      )}

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === "home" && (
          <div className="px-4 py-4 pb-24 space-y-6">
            <HomeStats />
            <TodaySchedule />
          </div>
        )}

        {activeTab === "students" && <StudentList />}
        
        {activeTab === "courses" && <CourseManagement />}
        
        {activeTab === "messages" && <MessageCenter />}
        
        {activeTab === "profile" && <Profile />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
