"use client"

import { useRouter } from "next/navigation"
import { Home, MapPin, Trophy, Users, User } from "lucide-react"

interface GroupBottomNavProps {
  activeTab: string
}

const navItems = [
  { id: "home",       label: "首页", icon: Home,   path: "/group/home" },
  { id: "venues",     label: "场地", icon: MapPin,  path: "/group/venues" },
  { id: "activities", label: "活动", icon: Trophy,  path: "/group/activities" },
  { id: "members",    label: "成员", icon: Users,   path: "/group/members" },
  { id: "profile",    label: "我的", icon: User,    path: "/group/profile" },
]

export function GroupBottomNav({ activeTab }: GroupBottomNavProps) {
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border">
      <div className="flex items-center justify-around h-[60px] px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
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
