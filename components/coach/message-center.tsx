"use client"

import { Bell, MessageCircle, Calendar, AlertCircle, FileText, ChevronRight, CheckCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockMessages } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface MessageCenterProps {
  onNavigate: (screen: Screen) => void
}

const typeConfig: Record<string, { Icon: React.ElementType; iconBg: string; iconText: string; label: string }> = {
  booking:  { Icon: Calendar,       iconBg: "bg-primary/10",     iconText: "text-primary",    label: "预约通知" },
  system:   { Icon: Bell,           iconBg: "bg-amber-100",      iconText: "text-amber-600",  label: "系统消息" },
  message:  { Icon: MessageCircle,  iconBg: "bg-sky-100",        iconText: "text-sky-600",    label: "学员消息" },
  alert:    { Icon: AlertCircle,    iconBg: "bg-red-100",        iconText: "text-red-500",    label: "场馆通知" },
  feedback: { Icon: FileText,       iconBg: "bg-emerald-100",    iconText: "text-emerald-600", label: "反馈提醒" },
}

const filters = ["全部", "未读", "已读"]

export function MessageCenter({ onNavigate }: MessageCenterProps) {
  const unreadCount = mockMessages.filter((m) => m.unread).length

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="bg-card border-b border-border px-4">
        <div className="flex items-center gap-6 h-11">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`relative text-sm font-medium pb-0.5 ${
                i === 0 ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {f}
              {f === "未读" && unreadCount > 0 && (
                <span className="ml-1 text-xs text-red-500">({unreadCount})</span>
              )}
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-1 text-xs text-primary">
            <CheckCheck className="h-3.5 w-3.5" /> 全部已读
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-2">
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {mockMessages.map((msg, index) => {
            const cfg = typeConfig[msg.type] ?? typeConfig.system
            const { Icon } = cfg

            return (
              <button
                key={msg.id}
                onClick={() => onNavigate({ type: "message-detail", messageId: msg.id })}
                className={`w-full flex items-start gap-3 px-4 py-4 hover:bg-secondary/50 transition-colors text-left ${
                  index < mockMessages.length - 1 ? "border-b border-border" : ""
                }`}
              >
                {/* Icon / Avatar */}
                {msg.type === "message" ? (
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-sky-100 text-sky-600 font-bold">
                      {msg.sender?.slice(0, 1) ?? "消"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
                    <Icon className={`h-5 w-5 ${cfg.iconText}`} />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-foreground">{msg.title}</span>
                    <span className="text-[11px] text-muted-foreground ml-2 shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{msg.content}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] text-primary flex items-center gap-0.5">
                      查看详情 <ChevronRight className="h-3 w-3" />
                    </span>
                    {msg.unread && (
                      <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
