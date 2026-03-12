"use client"

import { mockHomeStats } from "@/lib/mock-data"

const stats = [
  { label: "今日学员", value: mockHomeStats.todayStudents.toString(),         sub: mockHomeStats.todayStudentsChange },
  { label: "本周课程", value: mockHomeStats.weekCourses.toString(),           sub: mockHomeStats.weekCoursesChange },
  { label: "训练时长", value: `${mockHomeStats.monthHours}h`,                 sub: mockHomeStats.monthHoursChange },
  { label: "完课率",   value: `${mockHomeStats.completionRate}%`,             sub: mockHomeStats.completionRateChange },
]

export function HomeStats() {
  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-4 divide-x divide-border">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center py-4 px-1">
            <span className="text-xl font-bold text-foreground leading-none">{s.value}</span>
            <span className="text-[10px] text-muted-foreground mt-1.5 text-center leading-tight">{s.label}</span>
            <span className="text-[10px] text-accent font-medium mt-1">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
