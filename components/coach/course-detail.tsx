"use client"

import {
  MapPin, Clock, Users, Calendar, ChevronRight,
  BookOpen, TrendingUp, ClipboardList,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
const statusConfig: Record<string, { className: string }> = {
  "进行中": { className: "bg-primary/10 text-primary" },
  "招生中": { className: "bg-amber-500/10 text-amber-600" },
  "已结束": { className: "bg-muted text-muted-foreground" },
  "未开始": { className: "bg-sky-500/10 text-sky-600" },
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <span className="text-sm text-muted-foreground w-16 shrink-0">{label}</span>
      <span className="text-sm text-foreground flex-1">{value}</span>
    </div>
  )
}

export function CourseDetail({ courseId, onBack, onNavigate }: CourseDetailProps) {
  const course = mockCourses.find((c) => c.id === courseId)
  if (!course) return null

  const enrolled = mockStudents.filter((s) => s.courseId === courseId)
  const progress = course.totalSessions > 0
    ? Math.round((course.completedSessions / course.totalSessions) * 100)
    : 0
  const statusCfg = statusConfig[course.statusText] ?? { className: "bg-muted text-muted-foreground" }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="课程详情" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero */}
        <div className="bg-primary px-4 pt-5 pb-6">
          <div className="flex items-start justify-between mb-2">
            <Badge className="bg-white/20 text-white border-0 text-xs">
              {courseTypeMap[course.courseType]}
            </Badge>
            <Badge className={`text-xs ${statusCfg.className}`}>{course.statusText}</Badge>
          </div>
          <h2 className="text-xl font-bold text-white mt-2">{course.courseName}</h2>
          <p className="text-2xl font-bold text-white mt-2">
            ¥{course.price.toLocaleString()}
            <span className="text-sm font-normal text-white/70 ml-1">/ 期</span>
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{course.location}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.enrollCount}/{course.capacity} 人</span>
          </div>
        </div>

        {/* Progress card */}
        {course.status === 1 && (
          <div className="mx-4 -mt-4 rounded-xl bg-card border border-border shadow-sm p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-foreground">课程进度</span>
              <span className="text-muted-foreground">{course.completedSessions} / {course.totalSessions} 课时</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">已完成 {progress}%</p>
          </div>
        )}

        {/* Course Info */}
        <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-sm font-semibold text-foreground">课程信息</h3>
          </div>
          <div className="px-4 pb-2">
            <InfoRow icon={Calendar} label="上课时间" value={course.schedule} />
            <InfoRow icon={Clock}    label="课程时长" value={course.scheduleTime} />
            <InfoRow icon={MapPin}   label="上课地点" value={course.location} />
            <InfoRow icon={BookOpen} label="课程类别" value={course.courseCategory} />
            <InfoRow icon={TrendingUp} label="课程级别" value={course.courseLevelText} />
            {course.enrollmentRequirements && (
              <InfoRow icon={Users} label="报名要求" value={course.enrollmentRequirements} />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">课程简介</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{course.courseDesc}</p>
          {course.courseDetail && (
            <>
              <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">课程详情</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{course.courseDetail}</p>
            </>
          )}
        </div>

        {/* Students */}
        <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm">
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              学员名单 <span className="text-muted-foreground font-normal ml-1">{enrolled.length}人</span>
            </h3>
          </div>
          {enrolled.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">暂无学员</p>
          )}
          {enrolled.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onNavigate({ type: "student-detail", studentId: s.id })}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors ${i < enrolled.length - 1 ? "border-b border-border" : ""}`}
            >
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">{s.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">剩余 {s.remainingSessions} 节 · 上次 {s.lastClassDaysAgo}</p>
              </div>
              <Badge className={`text-xs shrink-0 mr-1 ${s.statusText === "活跃" ? "bg-primary/10 text-primary" : s.statusText === "课时不足" ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"}`}>
                {s.statusText}
              </Badge>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background border-t border-border px-4 py-3 flex gap-3">
        <Button
          variant="outline"
          className="flex-1 gap-1.5"
          onClick={() => onNavigate({ type: "attendance", sessionId: 101 })}
        >
          <Users className="h-4 w-4" /> 签到管理
        </Button>
        <Button
          className="flex-1 gap-1.5"
          onClick={() => onNavigate({ type: "teaching-feedback", courseId })}
        >
          <ClipboardList className="h-4 w-4" /> 教学反馈
        </Button>
      </div>
    </div>
  )
}
