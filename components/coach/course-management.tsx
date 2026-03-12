"use client"

import { useState } from "react"
import { Plus, Users, Clock, MapPin, ChevronRight } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface CourseManagementProps {
  onNavigate: (screen: Screen) => void
}

const courseTypeMap: Record<number, string> = { 1: "团课", 2: "私教", 3: "训练营", 4: "活动" }
const filters = ["全部", "团课", "私教", "训练营", "招生中"]

const statusStyle: Record<string, { dot: string; text: string }> = {
  "进行中": { dot: "bg-green-500",  text: "text-green-600" },
  "招生中": { dot: "bg-amber-500",  text: "text-amber-600" },
  "已结束": { dot: "bg-gray-400",   text: "text-muted-foreground" },
  "未开始": { dot: "bg-blue-500",   text: "text-blue-600" },
}

export function CourseManagement({ onNavigate }: CourseManagementProps) {
  const [activeFilter, setActiveFilter] = useState("全部")

  const filtered = mockCourses.filter((c) => {
    if (activeFilter === "全部") return true
    if (activeFilter === "招生中") return c.statusText === "招生中"
    return courseTypeMap[c.courseType] === activeFilter
  })

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">课程管理</h2>
          <button className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1.5 text-sm font-medium">
            <Plus className="h-4 w-4" /> 新建
          </button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground shadow-sm"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3">
        {filtered.map((course) => {
          const stStyle = statusStyle[course.statusText] ?? statusStyle["已结束"]
          const progress = course.totalSessions > 0
            ? Math.round((course.completedSessions / course.totalSessions) * 100) : 0

          return (
            <button
              key={course.id}
              onClick={() => onNavigate({ type: "course-detail", courseId: course.id })}
              className="w-full bg-card rounded-2xl shadow-sm p-4 text-left active:scale-[0.99] transition-transform"
            >
              {/* Title row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground text-sm">{course.courseName}</span>
                    <span className="text-xs bg-secondary text-muted-foreground rounded-full px-2 py-0.5">
                      {courseTypeMap[course.courseType]}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-primary mt-1">
                    ¥{course.price.toLocaleString()}
                    <span className="text-xs text-muted-foreground font-normal ml-1">/ 期</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`h-2 w-2 rounded-full ${stStyle.dot}`} />
                  <span className={`text-xs font-medium ${stStyle.text}`}>{course.statusText}</span>
                </div>
              </div>

              {/* Info row */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.scheduleTime}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{course.location}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.enrollCount}/{course.capacity}人</span>
              </div>

              {/* Progress */}
              {course.status === 1 && (
                <div>
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span>课程进度 {course.completedSessions}/{course.totalSessions} 课时</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-3">
                <span className="flex items-center gap-0.5 text-xs text-primary font-medium">
                  查看详情 <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
