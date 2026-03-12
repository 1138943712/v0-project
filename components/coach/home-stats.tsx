"use client"

import { Users, Calendar, Clock, TrendingUp } from "lucide-react"
import { mockHomeStats } from "@/lib/mock-data"

const stats = [
  {
    label: "今日学员",
    value: mockHomeStats.todayStudents.toString(),
    icon: Users,
    trend: mockHomeStats.todayStudentsChange,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "本周课程",
    value: mockHomeStats.weekCourses.toString(),
    icon: Calendar,
    trend: mockHomeStats.weekCoursesChange,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "训练时长",
    value: `${mockHomeStats.monthHours}h`,
    icon: Clock,
    trend: mockHomeStats.monthHoursChange,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "完课率",
    value: `${mockHomeStats.completionRate}%`,
    icon: TrendingUp,
    trend: mockHomeStats.completionRateChange,
    color: "bg-sky-500/10 text-sky-600",
  },
]

export function HomeStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-card p-4 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`rounded-lg p-2 ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <span className="text-xs text-primary font-medium">{stat.trend}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
