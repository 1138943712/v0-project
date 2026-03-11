"use client"

import { Clock, MapPin, Users, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const scheduleItems = [
  {
    id: 1,
    time: "09:00 - 10:30",
    title: "青少年篮球训练",
    location: "1号场馆",
    students: 8,
    status: "进行中",
    statusColor: "bg-primary text-primary-foreground",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 2,
    time: "11:00 - 12:00",
    title: "私教课 - 张伟",
    location: "VIP训练室",
    students: 1,
    status: "即将开始",
    statusColor: "bg-amber-500 text-amber-950",
    avatars: ["/placeholder.svg"],
  },
  {
    id: 3,
    time: "14:00 - 15:30",
    title: "成人体能训练",
    location: "2号场馆",
    students: 12,
    status: "待开始",
    statusColor: "bg-secondary text-secondary-foreground",
    avatars: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },
  {
    id: 4,
    time: "16:00 - 17:30",
    title: "游泳技巧班",
    location: "游泳馆",
    students: 6,
    status: "待开始",
    statusColor: "bg-secondary text-secondary-foreground",
    avatars: ["/placeholder.svg", "/placeholder.svg"],
  },
]

export function TodaySchedule() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">今日课程</h2>
        <button className="text-sm text-primary flex items-center gap-1">
          查看全部 <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-3">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-card border border-border p-4 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                </div>
              </div>
              <Badge className={item.statusColor}>{item.status}</Badge>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {item.avatars.slice(0, 3).map((avatar, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-card">
                      <AvatarImage src={avatar} />
                      <AvatarFallback className="text-[10px] bg-secondary text-secondary-foreground">
                        学
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {item.students} 人
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
