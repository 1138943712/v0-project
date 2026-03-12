"use client"

import { useState } from "react"
import { Search, ChevronRight, Phone, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockStudents } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface StudentListProps {
  onNavigate: (screen: Screen) => void
}

const statusConfig: Record<string, { className: string }> = {
  "活跃":    { className: "bg-primary/10 text-primary" },
  "课时不足": { className: "bg-amber-500/10 text-amber-600" },
  "已结课":  { className: "bg-muted text-muted-foreground" },
}

const filters = ["全部", "活跃", "课时不足", "已结课"]

export function StudentList({ onNavigate }: StudentListProps) {
  const [activeFilter, setActiveFilter] = useState("全部")
  const [search, setSearch] = useState("")

  const filtered = mockStudents.filter((s) => {
    const matchFilter = activeFilter === "全部" || s.statusText === activeFilter
    const matchSearch = !search || s.name.includes(search) || s.courseName.includes(search)
    return matchFilter && matchSearch
  })

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索学员姓名或课程"
            className="pl-10 bg-secondary border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">暂无数据</div>
        )}
        {filtered.map((student) => {
          const statusCfg = statusConfig[student.statusText] ?? { className: "bg-muted text-muted-foreground" }
          return (
            <div
              key={student.id}
              onClick={() => onNavigate({ type: "student-detail", studentId: student.id })}
              className="rounded-xl bg-card border border-border p-4 active:scale-[0.98] transition-transform cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-base">
                    {student.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-medium text-foreground">{student.name}</span>
                    <Badge className={`text-xs px-1.5 py-0 ${statusCfg.className}`}>
                      {student.statusText}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{student.courseName}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground">
                      剩余{" "}
                      <span className={student.remainingSessions <= 3 ? "text-amber-600 font-medium" : "text-foreground font-medium"}>
                        {student.remainingSessions}
                      </span>{" "}
                      节
                    </span>
                    <span className="text-xs text-muted-foreground">上次：{student.lastClassDaysAgo}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation() }}
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation() }}
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
