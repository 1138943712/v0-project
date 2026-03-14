"use client"

import { Home, Users, CalendarDays, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home",     label: "首页", icon: Home },
  { id: "students", label: "学员", icon: Users },
  { id: "calendar", label: "日历", icon: CalendarDays },
  { id: "profile",  label: "我的", icon: User },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border">
      <div className="flex items-center justify-around h-[60px] px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors"
            >
              <item.icon
                className={`h-[22px] w-[22px] transition-colors ${
                  isActive ? "text-primary stroke-[2.5]" : "text-muted-foreground stroke-[1.5]"
                }`}
              />
              <span className={`text-[11px] leading-none transition-colors ${
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              }`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
