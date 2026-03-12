"use client"

import { Home, Users, CalendarDays, MessageCircle, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  unreadMessages?: number
}

const navItems = [
  { id: "home",     label: "首页", icon: Home },
  { id: "students", label: "学员", icon: Users },
  { id: "calendar", label: "日历", icon: CalendarDays },
  { id: "messages", label: "消息", icon: MessageCircle },
  { id: "profile",  label: "我的", icon: User },
]

export function BottomNav({ activeTab, onTabChange, unreadMessages = 3 }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-area-inset-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const badge = item.id === "messages" ? unreadMessages : 0
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : ""}`} />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 flex items-center justify-center px-1 text-[10px] font-medium bg-destructive text-destructive-foreground rounded-full">
                    {badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? "font-medium" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
