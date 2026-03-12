"use client"

import { MapPin, Clock, Users, ClipboardList, ChevronRight, CheckCircle2, XCircle, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockTodaySchedule, mockSessionAttendance, mockTeachingFeedbacks } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface SessionDetailProps {
  sessionId: number
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

const statusConfig: Record<number, { text: string; className: string }> = {
  1: { text: "进行中", className: "bg-primary text-primary-foreground" },
  2: { text: "即将开始", className: "bg-amber-500 text-white" },
  0: { text: "待开始", className: "bg-secondary text-secondary-foreground" },
  3: { text: "已结束", className: "bg-muted text-muted-foreground" },
}

export function SessionDetail({ sessionId, onBack, onNavigate }: SessionDetailProps) {
  const session = mockTodaySchedule.find((s) => s.id === sessionId)
  if (!session) return null

  const students = mockSessionAttendance[sessionId] ?? []
  const checkedIn = students.filter((s) => s.attended).length
  const statusCfg = statusConfig[session.status] ?? statusConfig[0]
  const feedbacks = mockTeachingFeedbacks.filter((f) => {
    const d = new Date(f.classDate)
    const sessionDate = session.date
    return (
      f.courseId === session.courseId &&
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` === sessionDate
    )
  })
  const pendingFeedbacks = feedbacks.filter((f) => f.status === 2).length

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="课程场次详情" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero */}
        <div className="bg-primary px-4 pt-5 pb-8">
          <Badge className={`mb-2 ${statusCfg.className}`}>{statusCfg.text}</Badge>
          <h2 className="text-xl font-bold text-white mt-1">{session.courseName}</h2>
          <p className="text-sm text-white/70 mt-1">第 {session.sessionNo} 课时</p>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{session.date} {session.timeRange}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{session.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Users className="h-4 w-4 shrink-0" />
              <span>{session.students}/{session.maxStudents} 人参加</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mx-4 -mt-4 rounded-xl bg-card border border-border shadow-sm p-4 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{students.length}</p>
            <p className="text-xs text-muted-foreground">应到</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-lg font-bold text-primary">{checkedIn}</p>
            <p className="text-xs text-muted-foreground">已签到</p>
          </div>
          <div className="text-center">
            <p className={`text-lg font-bold ${students.length - checkedIn > 0 ? "text-amber-600" : "text-foreground"}`}>
              {students.length - checkedIn}
            </p>
            <p className="text-xs text-muted-foreground">未到</p>
          </div>
        </div>

        {/* Notes */}
        {session.notes && (
          <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm p-4">
            <h3 className="text-sm font-semibold text-foreground mb-1.5">本节备注</h3>
            <p className="text-sm text-muted-foreground">{session.notes}</p>
          </div>
        )}

        {/* Sign-in preview */}
        <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">签到情况</h3>
            <button
              onClick={() => onNavigate({ type: "attendance", sessionId })}
              className="text-xs text-primary flex items-center gap-0.5"
            >
              管理签到 <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {students.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">暂无学员</p>
          )}
          {students.slice(0, 5).map((s, i) => (
            <div key={s.childId} className={`flex items-center gap-3 px-4 py-2.5 ${i < Math.min(students.length, 5) - 1 ? "border-b border-border" : ""}`}>
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={`text-sm font-medium ${s.attended ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {s.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 text-sm text-foreground">{s.name}</span>
              {s.attended ? (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{s.checkInTime}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <XCircle className="h-4 w-4" />
                  <span>{s.reason ?? "未到"}</span>
                </div>
              )}
            </div>
          ))}
          {students.length > 5 && (
            <button
              onClick={() => onNavigate({ type: "attendance", sessionId })}
              className="w-full py-3 text-xs text-primary text-center border-t border-border"
            >
              查看全部 {students.length} 人
            </button>
          )}
        </div>

        {/* Feedback preview */}
        <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">教学反馈</h3>
              {pendingFeedbacks > 0 && (
                <Badge className="bg-amber-500 text-white text-xs px-1.5 py-0">{pendingFeedbacks}条待填</Badge>
              )}
            </div>
            <button
              onClick={() => onNavigate({ type: "teaching-feedback", courseId: session.courseId })}
              className="text-xs text-primary flex items-center gap-0.5"
            >
              查看全部 <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {feedbacks.length === 0 ? (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">本场次暂无反馈记录</p>
            </div>
          ) : (
            feedbacks.slice(0, 3).map((f, i) => (
              <div key={f.id} className={`px-4 py-3 ${i < Math.min(feedbacks.length, 3) - 1 ? "border-b border-border" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">{f.childName.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{f.childName}</span>
                  </div>
                  <Badge className={`text-xs ${f.status === 1 ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-600"}`}>
                    {f.statusText}
                  </Badge>
                </div>
                {f.content && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-1">{f.content}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t border-border px-4 py-3 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 gap-1.5"
          onClick={() => onNavigate({ type: "attendance", sessionId })}
        >
          <Users className="h-4 w-4" /> 签到管理
        </Button>
        <Button
          className="flex-1 gap-1.5"
          onClick={() => onNavigate({ type: "teaching-feedback", courseId: session.courseId })}
        >
          <FileText className="h-4 w-4" /> 填写反馈
        </Button>
      </div>
    </div>
  )
}
