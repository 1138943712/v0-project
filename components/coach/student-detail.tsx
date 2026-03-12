"use client"

import { Phone, BookOpen, CheckCircle2, XCircle, ChevronRight, Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockStudents, mockStudentClassHistory, mockTeachingFeedbacks, mockCourses } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface StudentDetailProps {
  studentId: number
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

export function StudentDetail({ studentId, onBack, onNavigate }: StudentDetailProps) {
  const student = mockStudents.find((s) => s.id === studentId)
  if (!student) return null

  const course = mockCourses.find((c) => c.id === student.courseId)
  const history = mockStudentClassHistory[student.childId] ?? []
  const feedbacks = mockTeachingFeedbacks.filter((f) => f.childId === student.childId)
  const progress = student.totalSessions > 0 ? Math.round((student.usedSessions / student.totalSessions) * 100) : 0

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="学员详情" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero */}
        <div className="bg-primary px-4 pt-5 pb-8 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/30 shrink-0">
            <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">{student.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white">{student.name}</h2>
              <span className="text-xs bg-white/20 text-white rounded-full px-2 py-0.5">{student.gender}</span>
            </div>
            <p className="text-sm text-white/80 mt-1">{student.age}岁 · {student.courseName}</p>
            {student.parentName && (
              <p className="text-xs text-white/60 mt-0.5">家长：{student.parentName}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mx-4 -mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="flex flex-col items-center py-4">
              <span className="text-lg font-bold text-foreground">{student.usedSessions}</span>
              <span className="text-[10px] text-muted-foreground mt-1">已上课时</span>
            </div>
            <div className="flex flex-col items-center py-4">
              <span className={`text-lg font-bold ${student.remainingSessions <= 3 ? "text-amber-500" : "text-foreground"}`}>
                {student.remainingSessions}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">剩余课时</span>
            </div>
            <div className="flex flex-col items-center py-4">
              <span className="text-lg font-bold text-foreground">{student.attendanceRate}%</span>
              <span className="text-[10px] text-muted-foreground mt-1">出勤率</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-foreground">课时进度</span>
            <button onClick={() => course && onNavigate({ type: "course-detail", courseId: course.id })}
              className="text-xs text-primary flex items-center gap-0.5">
              {course?.courseName} <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1.5">
            <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>已用 {student.usedSessions} 节</span>
            <span>共 {student.totalSessions} 节</span>
          </div>
          {student.remainingSessions <= 3 && student.remainingSessions > 0 && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              <p className="text-xs text-amber-700 font-medium">⚠️ 课时即将耗尽，建议联系家长续费</p>
            </div>
          )}
        </div>

        {/* Notes */}
        {student.notes && (
          <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
            <h3 className="text-sm font-bold text-foreground mb-2">教练备注</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{student.notes}</p>
          </div>
        )}

        {/* History */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">上课记录</span>
            <span className="text-xs text-muted-foreground">近{history.length}次</span>
          </div>
          {history.map((r, i) => (
            <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < history.length - 1 ? "border-b border-border" : ""}`}>
              {r.attended
                ? <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                : <XCircle className="h-5 w-5 text-muted-foreground/40 mt-0.5 shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">第 {r.sessionNo} 课时</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                {r.attended
                  ? r.feedback
                    ? <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{r.feedback}</p>
                    : <p className="text-xs text-muted-foreground mt-0.5">已出勤</p>
                  : <p className="text-xs text-red-400 mt-0.5">缺席</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Feedbacks */}
        {feedbacks.length > 0 && (
          <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">教学反馈</span>
              <button onClick={() => onNavigate({ type: "teaching-feedback", studentId })}
                className="text-xs text-primary flex items-center gap-0.5">
                全部 <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            {feedbacks.slice(0, 2).map((f, i) => (
              <div key={f.id} className={`px-4 py-3 ${i < Math.min(2, feedbacks.length) - 1 ? "border-b border-border" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{new Date(f.classDate).toLocaleDateString("zh-CN")} · 第{f.sessionNo}课时</span>
                  <span className={`text-[11px] rounded-full px-2 py-0.5 ${f.status === 1 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>{f.statusText}</span>
                </div>
                {f.content
                  ? <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{f.content}</p>
                  : <p className="text-sm text-muted-foreground italic">待填写</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3 flex gap-3">
        {(student.phone || student.parentPhone) && (
          <button className="flex-1 flex items-center justify-center gap-1.5 border border-primary text-primary rounded-full py-2.5 text-sm font-medium">
            <Phone className="h-4 w-4" /> {student.parentName ? "联系家长" : "打电话"}
          </button>
        )}
        <button
          onClick={() => onNavigate({ type: "teaching-feedback", studentId })}
          className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-medium"
        >
          <BookOpen className="h-4 w-4" /> 教学反馈
        </button>
      </div>
    </div>
  )
}
