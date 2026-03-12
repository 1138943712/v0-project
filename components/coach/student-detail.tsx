"use client"

import {
  Phone, MessageCircle, BookOpen, CheckCircle2,
  XCircle, ChevronRight, Star, Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockStudents, mockStudentClassHistory, mockTeachingFeedbacks, mockCourses } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface StudentDetailProps {
  studentId: number
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

const statusStyle: Record<string, string> = {
  "活跃":    "bg-primary/10 text-primary",
  "课时不足": "bg-amber-500/10 text-amber-600",
  "已结课":  "bg-muted text-muted-foreground",
}

export function StudentDetail({ studentId, onBack, onNavigate }: StudentDetailProps) {
  const student = mockStudents.find((s) => s.id === studentId)
  if (!student) return null

  const course = mockCourses.find((c) => c.id === student.courseId)
  const history = mockStudentClassHistory[student.childId] ?? []
  const feedbacks = mockTeachingFeedbacks.filter((f) => f.childId === student.childId)
  const progress = student.totalSessions > 0
    ? Math.round((student.usedSessions / student.totalSessions) * 100)
    : 0

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="学员详情" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Profile Hero */}
        <div className="bg-primary px-4 pt-5 pb-8 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/30 shrink-0">
            <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
              {student.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white">{student.name}</h2>
              <Badge className="bg-white/20 text-white border-0 text-xs">{student.gender}</Badge>
              <Badge className={`text-xs border-0 ${student.statusText === "活跃" ? "bg-white/20 text-white" : "bg-amber-400/90 text-amber-900"}`}>
                {student.statusText}
              </Badge>
            </div>
            <p className="text-sm text-white/80 mt-1">{student.age}岁 · {student.courseName}</p>
            {student.parentName && (
              <p className="text-xs text-white/60 mt-0.5">家长：{student.parentName}</p>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-4 -mt-4 rounded-xl bg-card border border-border shadow-sm p-4 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{student.usedSessions}</p>
            <p className="text-xs text-muted-foreground">已上课时</p>
          </div>
          <div className="text-center border-x border-border">
            <p className={`text-lg font-bold ${student.remainingSessions <= 3 ? "text-amber-600" : "text-foreground"}`}>
              {student.remainingSessions}
            </p>
            <p className="text-xs text-muted-foreground">剩余课时</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{student.attendanceRate}%</p>
            <p className="text-xs text-muted-foreground">出勤率</p>
          </div>
        </div>

        {/* Course progress */}
        <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground">课时进度</h3>
            <button
              onClick={() => course && onNavigate({ type: "course-detail", courseId: course.id })}
              className="text-xs text-primary flex items-center gap-0.5"
            >
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
            <div className="mt-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2">
              <p className="text-xs text-amber-600 font-medium">⚠️ 课时即将耗尽，建议联系家长续费</p>
            </div>
          )}
        </div>

        {/* Notes */}
        {student.notes && (
          <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">教练备注</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{student.notes}</p>
          </div>
        )}

        {/* Class History */}
        <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">近期上课记录</h3>
            <span className="text-xs text-muted-foreground">共 {history.length} 条</span>
          </div>
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">暂无记录</p>
          )}
          {history.map((record, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 px-4 py-3 ${i < history.length - 1 ? "border-b border-border" : ""}`}
            >
              {record.attended ? (
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-muted-foreground/50 mt-0.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">第 {record.sessionNo} 课时</span>
                  <span className="text-xs text-muted-foreground">{record.date}</span>
                </div>
                {record.attended ? (
                  record.feedback ? (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{record.feedback}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-0.5">已出勤，暂无反馈</p>
                  )
                ) : (
                  <p className="text-xs text-destructive/70 mt-0.5">缺席</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feedbacks */}
        {feedbacks.length > 0 && (
          <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm">
            <div className="px-4 pt-4 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">教学反馈</h3>
              <button
                onClick={() => onNavigate({ type: "teaching-feedback", studentId })}
                className="text-xs text-primary flex items-center gap-0.5"
              >
                查看全部 <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            {feedbacks.slice(0, 2).map((f, i) => (
              <div key={f.id} className={`px-4 py-3 ${i < Math.min(feedbacks.length, 2) - 1 ? "border-b border-border" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    {new Date(f.classDate).toLocaleDateString("zh-CN")} · 第{f.sessionNo}课时
                  </span>
                  <Badge className={`text-xs ${f.status === 1 ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-600"}`}>
                    {f.statusText}
                  </Badge>
                </div>
                {f.content ? (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{f.content}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">待填写</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t border-border px-4 py-3 flex gap-3">
        {(student.phone || student.parentPhone) && (
          <Button variant="outline" className="flex-1 gap-1.5">
            <Phone className="h-4 w-4" />
            {student.parentName ? "联系家长" : "打电话"}
          </Button>
        )}
        <Button
          className="flex-1 gap-1.5"
          onClick={() => onNavigate({ type: "teaching-feedback", studentId })}
        >
          <BookOpen className="h-4 w-4" /> 教学反馈
        </Button>
      </div>
    </div>
  )
}
