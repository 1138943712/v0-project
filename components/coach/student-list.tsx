"use client"

import { Search, Filter, ChevronRight, Phone, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const students = [
  {
    id: 1,
    name: "张三",
    avatar: "/placeholder.svg",
    course: "青少年篮球",
    remaining: 12,
    lastClass: "2天前",
    status: "活跃",
    statusColor: "bg-primary/20 text-primary",
  },
  {
    id: 2,
    name: "李明",
    avatar: "/placeholder.svg",
    course: "私教体能",
    remaining: 8,
    lastClass: "今天",
    status: "活跃",
    statusColor: "bg-primary/20 text-primary",
  },
  {
    id: 3,
    name: "王芳",
    avatar: "/placeholder.svg",
    course: "游泳入门",
    remaining: 3,
    lastClass: "5天前",
    status: "课时不足",
    statusColor: "bg-amber-500/20 text-amber-400",
  },
  {
    id: 4,
    name: "陈伟",
    avatar: "/placeholder.svg",
    course: "成人体能",
    remaining: 20,
    lastClass: "1天前",
    status: "活跃",
    statusColor: "bg-primary/20 text-primary",
  },
  {
    id: 5,
    name: "刘洋",
    avatar: "/placeholder.svg",
    course: "青少年篮球",
    remaining: 0,
    lastClass: "2周前",
    status: "已结课",
    statusColor: "bg-muted text-muted-foreground",
  },
]

export function StudentList() {
  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索学员姓名或课程"
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["全部", "活跃", "课时不足", "已结课"].map((filter) => (
            <Badge
              key={filter}
              variant={filter === "全部" ? "default" : "secondary"}
              className="cursor-pointer whitespace-nowrap"
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-24">
        {students.map((student) => (
          <div
            key={student.id}
            className="rounded-xl bg-card border border-border p-4 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.avatar} />
                <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                  {student.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{student.name}</h3>
                  <Badge className={student.statusColor} variant="secondary">
                    {student.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{student.course}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>剩余 <span className="text-foreground font-medium">{student.remaining}</span> 课时</span>
                <span>上课: {student.lastClass}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
