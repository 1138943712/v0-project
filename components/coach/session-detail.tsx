"use client"

import { MapPin, Clock, Users, ChevronRight, CheckCircle2, XCircle, FileText } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockTodaySchedule, mockSessionAttendance, mockTeachingFeedbacks } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface SessionDetailProps {
  sessionId: number
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

export function SessionDetail({ sessionId, onBack, onNavigate }: SessionDetailProps) {
  const session = mockTodaySchedule.find((s) => s.id === sessionId)
  if (!session) return null

  const students = mockSessionAttendance[sessionId] ?? []
  const checkedIn = students.filter((s) => s.attended).length
  const feedbacks = mockTeachingFeedbacks.filter(
    (f) => f.courseId === session.courseId &&
      f.classDate.startsWith(session.date)
  )
  const pendingFeedbacks = feedbacks.filter((f) => f.status === 2).length

  const statusColors: Record<number, string> = {
    1: "text-accent", 2: "text-primary", 0: "text-muted-foreground", 3: "text-muted-foreground",
  }
  const statusLabels: Record<number, string> = {
    1: "进行中", 2: "即将开始", 0: "待开始", 3: "已结束",
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="课程场次" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero */}
        <div className="bg-primary px-4 pt-5 pb-8">
          <p className={`text-sm font-medium mb-1 text-white/80`}>{statusLabels[session.status] ?? "待开始"}</p>
          <h2 className="text-xl font-bold text-white">{session.courseName}</h2>
          <p className="text-sm text-white/60 mt-1">第 {session.sessionNo} 课时</p>
          <div className="mt-3 space-y-1">
            <p className="text-sm text-white/80 flex items-center gap-2"><Clock className="h-4 w-4" />{session.date} {session.timeRange}</p>
            <p className="text-sm text-white/80 flex items-center gap-2"><MapPin className="h-4 w-4" />{session.location}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-4 -mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="flex flex-col items-center py-4">
              <span className="text-lg font-bold text-foreground">{students.length}</span>
              <span className="text-[10px] text-muted-foreground mt-1">应到</span>
            </div>
            <div className="flex flex-col items-center py-4">
              <span className="text-lg font-bold text-primary">{checkedIn}</span>
              <span className="text-[10px] text-muted-foreground mt-1">已签到</span>
            </div>
            <div className="flex flex-col items-center py-4">
              <span className={`text-lg font-bold ${students.length - checkedIn > 0 ? "text-amber-500" : "text-foreground"}`}>
                {students.length - checkedIn}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">未到</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {session.notes && (
          <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
            <h3 className="text-sm font-bold text-foreground mb-1.5">课程备注</h3>
            <p className="text-sm text-muted-foreground">{session.notes}</p>
          </div>
        )}

        {/* Attendance preview */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">签到情况</span>
            <button onClick={() => onNavigate({ type: "attendance", sessionId })}
              className="text-xs text-primary flex items-center gap-0.5">
              管理签到 <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {students.slice(0, 5).map((s, i) => (
            <div key={s.childId} className={`flex items-center gap-3 px-4 py-2.5 ${i < Math.min(5, students.length) - 1 ? "border-b border-border" : ""}`}>
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={`text-sm font-medium ${s.attended ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {s.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 text-sm text-foreground">{s.name}</span>
              {s.attended
                ? <div className="flex items-center gap-1 text-xs text-green-600"><CheckCircle2 className="h-4 w-4" />{s.checkInTime}</div>
                : <div className="flex items-center gap-1 text-xs text-muted-foreground"><XCircle className="h-4 w-4" />{s.reason ?? "未到"}</div>}
            </div>
          ))}
          {students.length > 5 && (
            <button onClick={() => onNavigate({ type: "attendance", sessionId })}
              className="w-full py-3 text-xs text-primary text-center border-t border-border">
              查看全部 {students.length} 人
            </button>
          )}
        </div>

        {/* Feedback preview */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">教学反馈</span>
              {pendingFeedbacks > 0 && (
                <span className="text-[11px] bg-amber-100 text-amber-600 rounded-full px-2 py-0.5">{pendingFeedbacks}条待填</span>
              )}
            </div>
            <button onClick={() => onNavigate({ type: "teaching-feedback", courseId: session.courseId })}
              className="text-xs text-primary flex items-center gap-0.5">
              查看全部 <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {feedbacks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">本场次暂无反馈</p>
          ) : (
            feedbacks.slice(0, 3).map((f, i) => (
              <div key={f.id} className={`flex items-start gap-3 px-4 py-3 ${i < Math.min(3, feedbacks.length) - 1 ? "border-b border-border" : ""}`}>
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">{f.childName.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-foreground">{f.childName}</span>
                    <span className={`text-[11px] rounded-full px-2 py-0.5 ${f.status === 1 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>{f.statusText}</span>
                  </div>
                  {f.content && <p className="text-xs text-muted-foreground line-clamp-1">{f.content}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3 flex gap-3">
        <button onClick={() => onNavigate({ type: "attendance", sessionId })}
          className="flex-1 flex items-center justify-center gap-1.5 border border-primary text-primary rounded-full py-2.5 text-sm font-medium">
          <Users className="h-4 w-4" /> 签到管理
        </button>
        <button onClick={() => onNavigate({ type: "teaching-feedback", courseId: session.courseId })}
          className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-medium">
          <FileText className="h-4 w-4" /> 填写反馈
        </button>
      </div>
    </div>
  )
}
