"use client"

import { Bell, MessageCircle, Calendar, AlertCircle, FileText, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DetailHeader } from "@/components/coach/detail-header"
import { mockMessages } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface MessageDetailProps {
  messageId: number
  onBack: () => void
  onNavigate: (screen: Screen) => void
}

const iconMap: Record<string, { Icon: React.ElementType; bg: string; text: string; label: string }> = {
  booking:  { Icon: Calendar,      bg: "bg-primary/10",      text: "text-primary",     label: "预约通知" },
  system:   { Icon: Bell,          bg: "bg-amber-500/10",    text: "text-amber-600",   label: "系统通知" },
  message:  { Icon: MessageCircle, bg: "bg-sky-500/10",      text: "text-sky-600",     label: "学员消息" },
  alert:    { Icon: AlertCircle,   bg: "bg-red-500/10",      text: "text-red-500",     label: "场馆通知" },
  feedback: { Icon: FileText,      bg: "bg-emerald-500/10",  text: "text-emerald-600", label: "反馈提醒" },
}

export function MessageDetail({ messageId, onBack, onNavigate }: MessageDetailProps) {
  const msg = mockMessages.find((m) => m.id === messageId)
  if (!msg) return null

  const config = iconMap[msg.type] ?? iconMap.system
  const { Icon } = config

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DetailHeader title="消息详情" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-10 px-4 pt-5 space-y-4">
        {/* Message card */}
        <div className="rounded-2xl bg-card shadow-sm p-5">
          {/* Icon + type + title */}
          <div className="flex items-center gap-3 mb-4">
            {msg.type === "message" ? (
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback className={`text-lg font-bold ${config.bg} ${config.text}`}>
                  {msg.sender?.slice(0, 1) ?? "消"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}>
                <Icon className={`h-6 w-6 ${config.text}`} />
              </div>
            )}
            <div>
              <p className={`text-xs font-medium ${config.text}`}>{config.label}</p>
              <h2 className="text-base font-semibold text-foreground mt-0.5">{msg.title}</h2>
            </div>
          </div>

          <div className="border-t border-border my-4" />

          {/* Detail content */}
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{msg.detail}</p>

          {/* Time */}
          <p className="text-xs text-muted-foreground mt-4 text-right">{msg.time}</p>
        </div>

        {/* Actions */}
        {msg.actions && msg.actions.length > 0 && (
          <div className="rounded-2xl bg-card shadow-sm p-4 space-y-2.5">
            <h3 className="text-sm font-semibold text-foreground mb-1">快捷操作</h3>
            {msg.actions.map((action) => (
              <button
                key={action}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  action.includes("拒绝") || action.includes("取消")
                    ? "border border-border text-foreground hover:bg-secondary"
                    : "bg-primary text-primary-foreground"
                }`}
                onClick={() => {
                  if (action === "立即填写") {
                    onNavigate({ type: "teaching-feedback" })
                  }
                }}
              >
                {action}
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>
            ))}
          </div>
        )}

        {/* Contextual hints */}
        {msg.type === "booking" && (
          <div className="rounded-2xl bg-secondary px-4 py-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              确认预约后，学员将收到预约成功通知。拒绝预约时请说明原因，系统会自动通知学员。
            </p>
          </div>
        )}
        {msg.type === "system" && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-xs text-amber-700 leading-relaxed">
              课时不足提醒：建议在课后与学员/家长沟通续费事宜，避免课程中断影响学习效果。
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
