"use client"

import { Users, Calendar, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "今日学员",
    value: "12",
    icon: Users,
    trend: "+2",
    color: "bg-primary/20 text-primary",
  },
  {
    label: "本周课程",
    value: "28",
    icon: Calendar,
    trend: "+5",
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    label: "训练时长",
    value: "42h",
    icon: Clock,
    trend: "+8h",
    color: "bg-amber-500/20 text-amber-400",
  },
  {
    label: "完课率",
    value: "96%",
    icon: TrendingUp,
    trend: "+3%",
    color: "bg-sky-500/20 text-sky-400",
  },
]

export function HomeStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-card p-4 border border-border"
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
