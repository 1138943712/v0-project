"use client"

import { useState } from "react"
import { Plus, Users, Clock, Calendar, ChevronRight, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockCourses } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface CourseManagementProps {
  onNavigate: (screen: Screen) => void
}

const courseTypeMap: Record<number, string> = { 1: "团课", 2: "私教", 3: "训练营", 4: "活动" }
const statusConfig: Record<string, { className: string }> = {
  "进行中": { className: "bg-primary/10 text-primary" },
  "招生中": { className: "bg-amber-500/10 text-amber-600" },
  "已结束": { className: "bg-muted text-muted-foreground" },
  "未开始": { className: "bg-sky-500/10 text-sky-600" },
}
const filters = ["全部", "团课", "私教", "训练营", "招生中", "已结束"]

export function CourseManagement({ onNavigate }: CourseManagementProps) {
  const [activeFilter, setActiveFilter] = useState("全部")

  const filtered = mockCourses.filter((c) => {
    if (activeFilter === "全部") return true
    if (activeFilter === "招生中") return c.statusText === "招生中"
    if (activeFilter === "已结束") return c.statusText === "已结束"
    return courseTypeMap[c.courseType] === activeFilter
  })

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">课程管理</h2>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" /> 新建课程
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={activeFilter === filter ? "default" : "secondary"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-24">
        {filtered.map((course) => {
          const statusCfg = statusConfig[course.statusText] ?? { className: "bg-muted text-muted-foreground" }
          const progress = course.totalSessions > 0
            ? Math.round((course.completedSessions / course.totalSessions) * 100)
            : 0
          return (
            <div
              key={course.id}
              onClick={() => onNavigate({ type: "course-detail", courseId: course.id })}
              className="rounded-xl bg-card border border-border p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-foreground">{course.courseName}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {courseTypeMap[course.courseType]}
                    </Badge>
                  </div>
                  <p className="text-base font-semibold text-primary mt-1">
                    ¥{course.price.toLocaleString()}
                    <span className="text-xs text-muted-foreground font-normal ml-1">/ 期</span>
                  </p>
                </div>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg hover:bg-secondary transition-colors ml-2"
                >
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{course.scheduleTime}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{course.enrollCount}/{course.capacity} 人已报名</span>
                </div>
              </div>

              {course.status === 1 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>课程进度</span>
                    <span>{course.completedSessions}/{course.totalSessions} 课时</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <Badge className={statusCfg.className}>{course.statusText}</Badge>
                <span className="flex items-center gap-1 text-xs text-primary">
                  查看详情 <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
