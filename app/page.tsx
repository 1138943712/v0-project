"use client"

import { useState, useCallback } from "react"
import type { Screen } from "@/lib/navigation"

// Layout
import { Header } from "@/components/coach/header"
import { BottomNav } from "@/components/coach/bottom-nav"

// Tab pages
import { HomeStats } from "@/components/coach/home-stats"
import { TodaySchedule } from "@/components/coach/today-schedule"
import { StudentList } from "@/components/coach/student-list"
import { CourseCalendar } from "@/components/coach/course-calendar"
import { Profile } from "@/components/coach/profile"

// Home components
import { GymBanner } from "@/components/coach/gym-banner"
import { GymCard } from "@/components/coach/gym-card"
import type { Dept } from "@/lib/api"

// Detail pages
import { CourseDetail } from "@/components/coach/course-detail"
import { StudentDetail } from "@/components/coach/student-detail"
import { SessionDetail } from "@/components/coach/session-detail"
import { Attendance } from "@/components/coach/attendance"
import { TeachingFeedback } from "@/components/coach/teaching-feedback"
import { MessageDetail } from "@/components/coach/message-detail"

const tabTitles: Record<string, string> = {
  home:     "工作台",
  students: "学员管理",
  calendar: "课程日历",
  profile:  "个人中心",
}

export default function CoachApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [screenStack, setScreenStack] = useState<Screen[]>([])
  const [bannerList, setBannerList] = useState<string[]>([])

  const currentScreen = screenStack[screenStack.length - 1] ?? null

  const navigate = useCallback((screen: Screen) => {
    setScreenStack((prev) => [...prev, screen])
  }, [])

  const goBack = useCallback(() => {
    setScreenStack((prev) => prev.slice(0, -1))
  }, [])

  const handleDeptDetail = (dept: Dept) => {
    setBannerList(dept.imageUrl ? dept.imageUrl.split(",") : [])
  }

  // ——— Render detail screen ———
  if (currentScreen) {
    switch (currentScreen.type) {
      case "course-detail":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto">
            <CourseDetail
              courseId={currentScreen.courseId}
              onBack={goBack}
              onNavigate={navigate}
            />
          </div>
        )
      case "student-detail":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto">
            <StudentDetail
              studentId={currentScreen.studentId}
              onBack={goBack}
              onNavigate={navigate}
            />
          </div>
        )
      case "session-detail":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto">
            <SessionDetail
              sessionId={currentScreen.sessionId}
              onBack={goBack}
              onNavigate={navigate}
            />
          </div>
        )
      case "attendance":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto">
            <Attendance
              sessionId={currentScreen.sessionId}
              onBack={goBack}
            />
          </div>
        )
      case "teaching-feedback":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto">
            <TeachingFeedback
              courseId={currentScreen.courseId}
              studentId={currentScreen.studentId}
              onBack={goBack}
              onNavigate={navigate}
            />
          </div>
        )
      case "message-detail":
        return (
          <div className="min-h-screen bg-background max-w-md mx-auto">
            <MessageDetail
              messageId={currentScreen.messageId}
              onBack={goBack}
              onNavigate={navigate}
            />
          </div>
        )
    }
  }

  // ——— Render tab screen ———
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {activeTab !== "profile" && (
        <Header title={tabTitles[activeTab]} />
      )}

      <main className="flex-1">
        {activeTab === "home" && (
          <div className="px-4 py-4 pb-24 space-y-4">
            <GymBanner list={bannerList} />
            <GymCard onDeptDetail={handleDeptDetail} />
            <HomeStats />
            <TodaySchedule onNavigate={navigate} />
          </div>
        )}
        {activeTab === "students" && (
          <StudentList onNavigate={navigate} />
        )}
        {activeTab === "calendar" && (
          <CourseCalendar onNavigate={navigate} />
        )}
        {activeTab === "profile" && (
          <Profile onNavigate={navigate} />
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  )
}
