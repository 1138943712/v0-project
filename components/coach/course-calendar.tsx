"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Users, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { mockCalendarCourses } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface CourseCalendarProps {
  onNavigate: (screen: Screen) => void
}

const DAYS = ["日", "一", "二", "三", "四", "五", "六"]
const MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]

const statusConfig: Record<number, { text: string; className: string }> = {
  1: { text: "进行中", className: "bg-primary text-primary-foreground" },
  2: { text: "即将开始", className: "bg-amber-500 text-white" },
  0: { text: "待开始", className: "bg-secondary text-secondary-foreground" },
  3: { text: "已结束", className: "bg-muted text-muted-foreground" },
}

function getWeekDates(centerDate: Date) {
  const dow = centerDate.getDay()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(centerDate)
    d.setDate(centerDate.getDate() - dow + i)
    return d
  })
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function CourseCalendar({ onNavigate }: CourseCalendarProps) {
  const today = new Date(2025, 2, 12)
  const [selectedDate, setSelectedDate] = useState(today)
  const [weekBase, setWeekBase] = useState(today)

  const weekDates = getWeekDates(weekBase)
  const selectedDateStr = toISODate(selectedDate)
  const todayStr = toISODate(today)
  const dayCourses = mockCalendarCourses.find((d) => d.date === selectedDateStr)?.courses ?? []

  return (
    <div className="flex flex-col h-full">
      {/* Week header */}
      <div className="px-4 pt-4 pb-2 bg-background">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">
            {weekBase.getFullYear()}年 {MONTHS[weekBase.getMonth()]}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => { const d = new Date(weekBase); d.setDate(d.getDate() - 7); setWeekBase(d) }}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => { const d = new Date(weekBase); d.setDate(d.getDate() + 7); setWeekBase(d) }}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDates.map((d, i) => {
            const dateStr = toISODate(d)
            const isToday = dateStr === todayStr
            const isSelected = dateStr === selectedDateStr
            const hasCourse = mockCalendarCourses.some((c) => c.date === dateStr)
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className="flex flex-col items-center gap-0.5 py-2"
              >
                <span className="text-xs text-muted-foreground">{DAYS[d.getDay()]}</span>
                <span className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isSelected ? "bg-primary text-primary-foreground"
                    : isToday ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary"
                }`}>
                  {d.getDate()}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${hasCourse ? (isSelected ? "bg-primary-foreground" : "bg-primary") : "bg-transparent"}`} />
              </button>
            )
          })}
        </div>
      </div>

      {/* Date label */}
      <div className="px-4 pt-3 pb-2 border-t border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
            {selectedDateStr === todayStr && <span className="text-primary ml-1">（今天）</span>}
          </h3>
          <span className="text-xs text-muted-foreground">{dayCourses.length} 节课</span>
        </div>
      </div>

      {/* Course list */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-24">
        {dayCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">今日暂无课程安排</p>
          </div>
        )}
        {dayCourses.map((course) => {
          const statusCfg = statusConfig[course.status] ?? statusConfig[0]
          return (
            <div
              key={course.id}
              onClick={() => onNavigate({ type: "session-detail", sessionId: course.id })}
              className="rounded-xl bg-card border border-border p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground">{course.courseName}</h4>
                <Badge className={`shrink-0 ml-2 ${statusCfg.className}`}>{statusCfg.text}</Badge>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{course.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{course.students} 人参加</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate({ type: "attendance", sessionId: course.id }) }}
                  className="flex-1 text-center text-xs text-primary border border-primary/30 rounded-lg py-1.5 hover:bg-primary/5 transition-colors"
                >
                  签到管理
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate({ type: "teaching-feedback", courseId: course.courseId }) }}
                  className="flex-1 text-center text-xs text-primary border border-primary/30 rounded-lg py-1.5 hover:bg-primary/5 transition-colors"
                >
                  教学反馈
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onNavigate({ type: "course-detail", courseId: course.courseId }) }}
                  className="flex-1 text-center text-xs text-muted-foreground border border-border rounded-lg py-1.5 hover:bg-secondary transition-colors"
                >
                  课程详情
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
