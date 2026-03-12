"use client"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { mockStudents } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface StudentListProps {
  onNavigate: (screen: Screen) => void
}

const filters = ["全部", "活跃", "课时不足", "已结课"]

const statusDot: Record<string, string> = {
  "活跃":    "bg-green-500",
  "课时不足": "bg-amber-500",
  "已结课":  "bg-gray-400",
}

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
      {/* Search */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索学员姓名或课程"
            className="pl-9 bg-card border-0 shadow-sm rounded-xl h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-2">
        {filtered.length === 0 && (
          <div className="bg-card rounded-2xl shadow-sm flex flex-col items-center py-12">
            <span className="text-3xl mb-2">👥</span>
            <p className="text-sm text-muted-foreground">暂无学员数据</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {filtered.map((student, index) => (
              <button
                key={student.id}
                onClick={() => onNavigate({ type: "student-detail", studentId: student.id })}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left ${
                  index < filtered.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                    {student.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground text-sm">{student.name}</span>
                    <span className={`h-2 w-2 rounded-full shrink-0 ${statusDot[student.statusText] ?? "bg-gray-400"}`} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{student.courseName}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${student.remainingSessions <= 3 ? "text-amber-500" : "text-foreground"}`}>
                    {student.remainingSessions}节
                  </p>
                  <p className="text-[10px] text-muted-foreground">剩余</p>
                </div>

                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 ml-1" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
