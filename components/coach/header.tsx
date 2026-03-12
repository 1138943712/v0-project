"use client"

import { Bell } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockCoachProfile } from "@/lib/mock-data"

interface HeaderProps {
  title?: string
  unreadCount?: number
}

export function Header({ title = "工作台", unreadCount = 0 }: HeaderProps) {
  const initials = mockCoachProfile.realName.slice(0, 1)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "早上好" : hour < 18 ? "下午好" : "晚上好"

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="relative flex items-center h-14 px-4">
        {/* Left: avatar */}
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Center: title */}
        <div className="absolute left-0 right-0 flex flex-col items-center pointer-events-none">
          <span className="text-base font-bold text-foreground">{title}</span>
          <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
            {greeting}，{mockCoachProfile.realName}教练
          </span>
        </div>

        {/* Right: actions */}
        <div className="ml-auto flex items-center gap-1 shrink-0">
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 flex items-center justify-center px-1 text-[10px] font-bold bg-red-500 text-white rounded-full leading-none">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
