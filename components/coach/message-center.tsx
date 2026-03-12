"use client"

import { Bell, MessageCircle, Calendar, AlertCircle, Check, FileText, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockMessages } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface MessageCenterProps {
  onNavigate: (screen: Screen) => void
}

const iconMap: Record<string, { Icon: React.ElementType; bg: string; text: string }> = {
  booking:  { Icon: Calendar,      bg: "bg-primary/10",     text: "text-primary" },
  system:   { Icon: Bell,          bg: "bg-amber-500/10",   text: "text-amber-600" },
  message:  { Icon: MessageCircle, bg: "bg-sky-500/10",     text: "text-sky-600" },
  alert:    { Icon: AlertCircle,   bg: "bg-destructive/10", text: "text-destructive" },
  feedback: { Icon: FileText,      bg: "bg-emerald-500/10", text: "text-emerald-600" },
}

export function MessageCenter({ onNavigate }: MessageCenterProps) {
  const unreadCount = mockMessages.filter((m) => m.unread).length

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">消息通知</h2>
          {unreadCount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0">
              {unreadCount}
            </Badge>
          )}
        </div>
        <button className="flex items-center gap-1 text-sm text-primary">
          <Check className="h-4 w-4" /> 全部已读
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-24">
        {mockMessages.map((msg) => {
          const config = iconMap[msg.type] ?? iconMap.system
          const { Icon } = config
          return (
            <div
              key={msg.id}
              onClick={() => onNavigate({ type: "message-detail", messageId: msg.id })}
              className={`rounded-xl border p-4 cursor-pointer transition-colors shadow-sm ${
                msg.unread ? "bg-card border-primary/20" : "bg-card border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                {msg.type === "message" ? (
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className={`${config.bg} ${config.text} font-semibold`}>
                      {msg.sender?.slice(0, 1) ?? "消"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className={`rounded-xl p-2.5 shrink-0 ${config.bg}`}>
                    <Icon className={`h-5 w-5 ${config.text}`} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-foreground text-sm">{msg.title}</span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                      {msg.unread && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {msg.content}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <span className="flex items-center gap-0.5 text-xs text-primary">
                  查看详情 <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
