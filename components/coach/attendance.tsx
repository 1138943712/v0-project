"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockTodaySchedule, mockSessionAttendance } from "@/lib/mock-data"

interface AttendanceProps {
  sessionId: number
  onBack: () => void
}

const filterOptions = ["全部", "已到", "未到"] as const

export function Attendance({ sessionId, onBack }: AttendanceProps) {
  const session = mockTodaySchedule.find((s) => s.id === sessionId)
  const rawStudents = mockSessionAttendance[sessionId] ?? []

  const [checkedIn, setCheckedIn] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(rawStudents.map((s) => [s.childId, s.attended]))
  )
  const [activeFilter, setActiveFilter] = useState<typeof filterOptions[number]>("全部")
  const [submitted, setSubmitted] = useState(false)

  const presentCount = Object.values(checkedIn).filter(Boolean).length
  const totalCount = rawStudents.length

  const filtered = rawStudents.filter((s) => {
    if (activeFilter === "已到") return checkedIn[s.childId]
    if (activeFilter === "未到") return !checkedIn[s.childId]
    return true
  })

  const toggle = (childId: number) => {
    if (submitted) return
    setCheckedIn((prev) => ({ ...prev, [childId]: !prev[childId] }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader
        title={session ? `${session.courseName} · 签到` : "签到管理"}
        onBack={onBack}
      />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Session Info card */}
        {session && (
          <div className="bg-primary mx-4 mt-4 rounded-2xl p-4 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/80">{session.date} {session.timeRange}</p>
                <p className="text-xs text-white/60 mt-0.5">{session.location} · 第{session.sessionNo}课时</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold leading-none">
                  {presentCount}
                  <span className="text-sm font-normal text-white/70">/{totalCount}</span>
                </p>
                <p className="text-xs text-white/60 mt-1">已签到</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: totalCount > 0 ? `${(presentCount / totalCount) * 100}%` : "0%" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Filter pills */}
        <div className="px-4 mt-4 mb-3 flex gap-2">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground shadow-sm"
              }`}
            >
              {f}
              {f === "已到" && ` (${presentCount})`}
              {f === "未到" && ` (${totalCount - presentCount})`}
              {f === "全部" && ` (${totalCount})`}
            </button>
          ))}
        </div>

        {/* Student list */}
        <div className="mx-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          {filtered.map((student, i) => {
            const isPresent = checkedIn[student.childId] ?? false
            return (
              <div
                key={student.childId}
                className={`flex items-center gap-3 px-4 py-3 ${i < filtered.length - 1 ? "border-b border-border" : ""}`}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback
                    className={`font-semibold text-sm ${
                      isPresent ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {student.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{student.name}</p>
                  {isPresent && student.checkInTime ? (
                    <p className="text-xs text-primary mt-0.5">签到 {student.checkInTime}</p>
                  ) : !isPresent && student.reason ? (
                    <p className="text-xs text-red-500 mt-0.5">{student.reason}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-0.5">{isPresent ? "已签到" : "未签到"}</p>
                  )}
                </div>
                <button
                  onClick={() => toggle(student.childId)}
                  disabled={submitted}
                  className="shrink-0 transition-transform active:scale-90 disabled:opacity-40"
                >
                  {isPresent ? (
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  ) : (
                    <XCircle className="h-7 w-7 text-muted-foreground/30" />
                  )}
                </button>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-10">暂无学员</p>
          )}
        </div>
      </div>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3">
        {submitted ? (
          <div className="rounded-2xl bg-primary/10 px-4 py-3 text-center">
            <p className="text-sm text-primary font-medium">✓ 签到已提交（{presentCount}/{totalCount} 人到场）</p>
          </div>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full py-3 text-sm font-medium"
            onClick={() => setSubmitted(true)}
          >
            <Users className="h-4 w-4" />
            提交签到（{presentCount}/{totalCount}）
          </button>
        )}
      </div>
    </div>
  )
}
