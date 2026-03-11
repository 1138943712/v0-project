"use client"

import { Bell, MessageCircle, Calendar, AlertCircle, ChevronRight, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const messages = [
  {
    id: 1,
    type: "booking",
    icon: Calendar,
    iconBg: "bg-primary/20 text-primary",
    title: "新的课程预约",
    content: "李明 预约了明天 14:00 的私教课程",
    time: "5分钟前",
    unread: true,
  },
  {
    id: 2,
    type: "system",
    icon: Bell,
    iconBg: "bg-amber-500/20 text-amber-400",
    title: "课时提醒",
    content: "学员王芳的课时仅剩3节，请及时跟进续费",
    time: "1小时前",
    unread: true,
  },
  {
    id: 3,
    type: "message",
    icon: MessageCircle,
    iconBg: "bg-sky-500/20 text-sky-400",
    title: "学员消息",
    content: "张三: 教练您好，请问明天的课程可以调整时间吗？",
    time: "2小时前",
    unread: true,
    avatar: "/placeholder.svg",
    sender: "张三",
  },
  {
    id: 4,
    type: "alert",
    icon: AlertCircle,
    iconBg: "bg-destructive/20 text-destructive",
    title: "场馆通知",
    content: "2号场馆明天下午进行维护，请提前调整课程",
    time: "3小时前",
    unread: false,
  },
  {
    id: 5,
    type: "booking",
    icon: Calendar,
    iconBg: "bg-primary/20 text-primary",
    title: "课程取消",
    content: "陈伟 取消了今天 16:00 的体能训练课程",
    time: "今天 10:23",
    unread: false,
  },
  {
    id: 6,
    type: "system",
    icon: Check,
    iconBg: "bg-emerald-500/20 text-emerald-400",
    title: "考勤确认",
    content: "青少年篮球训练营已完成今日签到，出勤率 100%",
    time: "今天 09:35",
    unread: false,
  },
]

export function MessageCenter() {
  const unreadCount = messages.filter((m) => m.unread).length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">消息中心</h2>
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {unreadCount} 条未读
              </Badge>
            )}
          </div>
          <button className="text-sm text-primary">全部已读</button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["全部", "预约", "消息", "系统", "通知"].map((filter) => (
            <Badge
              key={filter}
              variant={filter === "全部" ? "default" : "secondary"}
              className="cursor-pointer whitespace-nowrap"
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-xl border p-4 active:scale-[0.98] transition-transform cursor-pointer ${
              message.unread 
                ? "bg-card border-primary/30" 
                : "bg-card/50 border-border"
            }`}
          >
            <div className="flex gap-3">
              {message.type === "message" && message.avatar ? (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {message.sender?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className={`rounded-lg p-2.5 h-10 w-10 flex items-center justify-center ${message.iconBg}`}>
                  <message.icon className="h-5 w-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                    {message.title}
                  </h3>
                  {message.unread && (
                    <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{message.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
