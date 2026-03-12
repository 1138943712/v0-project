"use client"

import { Clock, MapPin, Users, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockTodaySchedule } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface TodayScheduleProps {
  onNavigate: (screen: Screen) => void
}

const statusConfig: Record<number, { text: string; className: string }> = {
  1: { text: "进行中", className: "bg-primary text-primary-foreground" },
  2: { text: "即将开始", className: "bg-amber-500 text-white" },
  0: { text: "待开始", className: "bg-secondary text-secondary-foreground" },
}

export function TodaySchedule({ onNavigate }: TodayScheduleProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">今日课程</h2>
        <button className="text-sm text-primary flex items-center gap-1">
          查看全部 <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-3">
        {mockTodaySchedule.map((item) => {
          const statusCfg = statusConfig[item.status] ?? statusConfig[0]
          return (
            <div
              key={item.id}
              onClick={() => onNavigate({ type: "session-detail", sessionId: item.id })}
              className="rounded-xl bg-card border border-border p-4 active:scale-[0.98] transition-transform cursor-pointer shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{item.courseName}</h3>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      {item.timeRange}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {item.location}
                    </span>
                  </div>
                </div>
                <Badge className={`shrink-0 ml-2 ${statusCfg.className}`}>
                  {statusCfg.text}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(item.students, 3) }).map((_, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-card">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                          学
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {item.students}/{item.maxStudents} 人
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
