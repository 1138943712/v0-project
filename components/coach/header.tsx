"use client"

import { Bell, QrCode } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockCoachProfile } from "@/lib/mock-data"

interface HeaderProps {
  title?: string
  unreadCount?: number
}

export function Header({ title = "工作台", unreadCount = 3 }: HeaderProps) {
  const initials = mockCoachProfile.realName.slice(0, 1)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "早上好" : hour < 18 ? "下午好" : "晚上好"

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
            <p className="text-xs text-muted-foreground">{greeting}，{mockCoachProfile.realName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground">
                {unreadCount}
              </Badge>
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <QrCode className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
