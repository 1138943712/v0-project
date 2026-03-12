"use client"

import { useState } from "react"
import { CheckCircle2, Clock, PenLine, Eye, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockTeachingFeedbacks } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface TeachingFeedbackProps {
  courseId?: number
  studentId?: number
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

const filterOptions = ["全部", "待反馈", "已反馈"] as const

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

export function TeachingFeedback({ courseId, studentId, onBack, onNavigate }: TeachingFeedbackProps) {
  const [activeFilter, setActiveFilter] = useState<typeof filterOptions[number]>("全部")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [draftContent, setDraftContent] = useState("")
  const [savedContents, setSavedContents] = useState<Record<number, string>>({})

  const allFeedbacks = mockTeachingFeedbacks.filter((f) => {
    if (courseId !== undefined && f.courseId !== courseId) return false
    if (studentId !== undefined) {
      const student = mockTeachingFeedbacks.find((x) => x.childId === studentId)
      if (student && f.childId !== studentId) return false
    }
    return true
  })

  const filtered = allFeedbacks.filter((f) => {
    if (activeFilter === "全部") return true
    return f.statusText === activeFilter
  })

  const pendingCount = allFeedbacks.filter((f) => f.status === 2).length

  const handleSave = (id: number) => {
    setSavedContents((prev) => ({ ...prev, [id]: draftContent }))
    setEditingId(null)
    setDraftContent("")
  }

  const getContent = (f: typeof mockTeachingFeedbacks[0]) =>
    savedContents[f.id] !== undefined ? savedContents[f.id] : f.content

  const getStatus = (f: typeof mockTeachingFeedbacks[0]) =>
    savedContents[f.id] !== undefined ? 1 : f.status

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="教学反馈" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            {pendingCount > 0 && (
              <Badge className="bg-amber-500 text-white text-xs">
                {pendingCount}条待填写
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {filterOptions.map((f) => (
              <Badge
                key={f}
                variant={activeFilter === f ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </Badge>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="px-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">暂无记录</div>
          )}
          {filtered.map((item) => {
            const content = getContent(item)
            const status = getStatus(item)
            const isEditing = editingId === item.id

            return (
              <div key={item.id} className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
                {/* Card Header */}
                <div className="px-4 pt-4 pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {item.childName.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <button
                          className="font-medium text-foreground hover:text-primary transition-colors"
                          onClick={() => {
                            const s = mockTeachingFeedbacks.find((f) => f.childId === item.childId)
                            // navigate to student if we have a studentId
                          }}
                        >
                          {item.childName}
                        </button>
                        {status === 1 ? (
                          <Badge className="bg-primary/10 text-primary text-xs flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> 已反馈
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/10 text-amber-600 text-xs flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 待反馈
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.courseName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(item.classDate)} · 第{item.sessionNo}课时
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                  {status === 1 && content && !isEditing && (
                    <div className="bg-secondary rounded-lg p-3 mb-3">
                      <p className="text-xs text-foreground leading-relaxed">{content}</p>
                      <div className="flex items-center justify-between mt-2">
                        {item.parentViewed === 1 ? (
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <Eye className="h-3 w-3" /> 家长已查看
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" /> 家长未查看
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="请输入本次课程的教学反馈，包括学员表现、进步点、需改进方面等..."
                        className="text-xs min-h-[100px] bg-secondary border-border resize-none"
                        value={draftContent}
                        onChange={(e) => setDraftContent(e.target.value)}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          disabled={!draftContent.trim()}
                          onClick={() => handleSave(item.id)}
                        >
                          提交反馈
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => { setEditingId(null); setDraftContent("") }}
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      {status === 2 && (
                        <Button
                          size="sm"
                          className="gap-1.5"
                          onClick={() => {
                            setEditingId(item.id)
                            setDraftContent("")
                          }}
                        >
                          <PenLine className="h-3.5 w-3.5" /> 填写反馈
                        </Button>
                      )}
                      {status === 1 && (
                        <button
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => {
                            setEditingId(item.id)
                            setDraftContent(content ?? "")
                          }}
                        >
                          编辑
                        </button>
                      )}
                      <button
                        className="flex items-center gap-0.5 text-xs text-primary ml-auto"
                        onClick={() => {/* show full detail */}}
                      >
                        详情 <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
