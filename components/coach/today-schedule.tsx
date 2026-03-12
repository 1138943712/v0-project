"use client"

import { ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockTodaySchedule } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface TodayScheduleProps {
  onNavigate: (screen: Screen) => void
}

const statusStyle: Record<number, { dot: string; timeColor: string; label: string; badge: string }> = {
  1: { dot: "bg-accent",       timeColor: "text-accent",     label: "进行中", badge: "bg-accent/10 text-accent" },
  2: { dot: "bg-primary",      timeColor: "text-primary",    label: "即将开始", badge: "bg-primary/10 text-primary" },
  0: { dot: "bg-border",       timeColor: "text-muted-foreground", label: "待开始",  badge: "bg-secondary text-muted-foreground" },
  3: { dot: "bg-muted-foreground", timeColor: "text-muted-foreground", label: "已结束", badge: "bg-secondary text-muted-foreground" },
}

export function TodaySchedule({ onNavigate }: TodayScheduleProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-bold text-foreground">今日课程</h2>
        <button className="text-sm text-primary flex items-center gap-0.5">
          查看全部 <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        {mockTodaySchedule.map((item, index) => {
          const st = statusStyle[item.status] ?? statusStyle[0]
          return (
            <button
              key={item.id}
              onClick={() => onNavigate({ type: "session-detail", sessionId: item.id })}
              className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-secondary/50 transition-colors text-left ${
                index < mockTodaySchedule.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Time column */}
              <div className="w-14 shrink-0 flex flex-col items-start">
                <span className={`text-base font-bold leading-none ${st.timeColor}`}>
                  {item.startTime}
                </span>
                <span className={`text-[10px] mt-1 ${st.badge} rounded-full px-1.5 py-0.5`}>
                  {st.label}
                </span>
              </div>

              {/* Dot + line */}
              <div className="flex flex-col items-center self-stretch py-1 shrink-0">
                <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${st.dot}`} />
                {index < mockTodaySchedule.length - 1 && (
                  <span className="w-px flex-1 bg-border mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{item.courseName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex -space-x-1.5">
                    {Array.from({ length: Math.min(item.students, 3) }).map((_, i) => (
                      <Avatar key={i} className="h-5 w-5 border border-card">
                        <AvatarFallback className="text-[9px] bg-primary/10 text-primary">学</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{item.students}人 · {item.location}</span>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
