"use client"

import { MapPin, Clock, Users, Calendar, ChevronRight, BookOpen, TrendingUp, ClipboardList } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockCourses, mockStudents } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface CourseDetailProps {
  courseId: number
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

const courseTypeMap: Record<number, string> = { 1: "团课", 2: "私教", 3: "训练营", 4: "活动" }
const statusDot: Record<string, string> = {
  "进行中": "bg-green-500", "招生中": "bg-amber-500",
  "已结束": "bg-gray-400",  "未开始": "bg-blue-500",
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className={`flex items-center gap-3 py-3 border-b border-border last:border-0`}>
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground w-16 shrink-0">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  )
}

export function CourseDetail({ courseId, onBack, onNavigate }: CourseDetailProps) {
  const course = mockCourses.find((c) => c.id === courseId)
  if (!course) return null

  const enrolled = mockStudents.filter((s) => s.courseId === courseId)
  const progress = course.totalSessions > 0 ? Math.round((course.completedSessions / course.totalSessions) * 100) : 0

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="课程详情" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero */}
        <div className="bg-primary px-4 pt-5 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-white/20 text-white rounded-full px-2.5 py-1">{courseTypeMap[course.courseType]}</span>
            <div className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${statusDot[course.statusText] ?? "bg-gray-400"}`} />
              <span className="text-xs text-white/80">{course.statusText}</span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white">{course.courseName}</h2>
          <p className="text-2xl font-bold text-white mt-2">
            ¥{course.price.toLocaleString()}
            <span className="text-sm font-normal text-white/60 ml-1">/ 期</span>
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{course.location}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.enrollCount}/{course.capacity} 人</span>
          </div>
        </div>

        {/* Progress card */}
        {course.status === 1 && (
          <div className="mx-4 -mt-4 bg-card rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold text-foreground">课程进度</span>
              <span className="text-muted-foreground">{course.completedSessions}/{course.totalSessions} 课时 · {progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm px-4">
          <InfoRow icon={Calendar}    label="上课时间" value={course.schedule} />
          <InfoRow icon={Clock}       label="课程时长" value={course.scheduleTime} />
          <InfoRow icon={MapPin}      label="上课地点" value={course.location} />
          <InfoRow icon={BookOpen}    label="课程类别" value={course.courseCategory} />
          <InfoRow icon={TrendingUp}  label="课程级别" value={course.courseLevelText} />
          {course.enrollmentRequirements && (
            <InfoRow icon={Users} label="报名要求" value={course.enrollmentRequirements} />
          )}
        </div>

        {/* Desc */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-2">课程简介</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{course.courseDesc}</p>
          {course.courseDetail && (
            <>
              <h3 className="text-sm font-bold text-foreground mt-4 mb-2">课程详情</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{course.courseDetail}</p>
            </>
          )}
        </div>

        {/* Students */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">学员名单</span>
            <span className="text-xs text-muted-foreground">{enrolled.length} 人</span>
          </div>
          {enrolled.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">暂无学员</p>}
          {enrolled.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onNavigate({ type: "student-detail", studentId: s.id })}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors ${i < enrolled.length - 1 ? "border-b border-border" : ""}`}
            >
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{s.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">剩余 {s.remainingSessions} 节 · {s.lastClassDaysAgo}</p>
              </div>
              <span className={`text-xs rounded-full px-2 py-0.5 mr-1 ${s.statusText === "活跃" ? "bg-green-50 text-green-600" : s.statusText === "课时不足" ? "bg-amber-50 text-amber-600" : "bg-secondary text-muted-foreground"}`}>
                {s.statusText}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3 flex gap-3">
        <button
          onClick={() => onNavigate({ type: "attendance", sessionId: 101 })}
          className="flex-1 flex items-center justify-center gap-1.5 border border-primary text-primary rounded-full py-2.5 text-sm font-medium hover:bg-primary/5 transition-colors"
        >
          <Users className="h-4 w-4" /> 签到管理
        </button>
        <button
          onClick={() => onNavigate({ type: "teaching-feedback", courseId })}
          className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-full py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <ClipboardList className="h-4 w-4" /> 教学反馈
        </button>
      </div>
    </div>
  )
}
