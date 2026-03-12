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
import { CourseManagement } from "@/components/coach/course-management"
import { MessageCenter } from "@/components/coach/message-center"
import { Profile } from "@/components/coach/profile"

// Detail pages
import { CourseDetail } from "@/components/coach/course-detail"
import { StudentDetail } from "@/components/coach/student-detail"
import { SessionDetail } from "@/components/coach/session-detail"
import { Attendance } from "@/components/coach/attendance"
import { TeachingFeedback } from "@/components/coach/teaching-feedback"
import { MessageDetail } from "@/components/coach/message-detail"

import { mockMessages } from "@/lib/mock-data"

const tabTitles: Record<string, string> = {
  home:     "工作台",
  students: "学员管理",
  calendar: "课程日历",
  messages: "消息中心",
  profile:  "个人中心",
}

export default function CoachApp() {
  const [activeTab, setActiveTab] = useState("home")
  // Navigation stack: array of screens, last one is current
  const [screenStack, setScreenStack] = useState<Screen[]>([])

  const unreadMessages = mockMessages.filter((m) => m.unread).length
  const currentScreen = screenStack[screenStack.length - 1] ?? null

  const navigate = useCallback((screen: Screen) => {
    setScreenStack((prev) => [...prev, screen])
  }, [])

  const goBack = useCallback(() => {
    setScreenStack((prev) => prev.slice(0, -1))
  }, [])

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
        <Header title={tabTitles[activeTab]} unreadCount={unreadMessages} />
      )}

      <main className="flex-1">
        {activeTab === "home" && (
          <div className="px-4 py-4 pb-24 space-y-6">
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
        {activeTab === "messages" && (
          <MessageCenter onNavigate={navigate} />
        )}
        {activeTab === "profile" && (
          <Profile onNavigate={navigate} />
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadMessages={unreadMessages}
      />
    </div>
  )
}
