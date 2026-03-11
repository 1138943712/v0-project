"use client"

import { Bell, QrCode } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  title?: string
}

export function Header({ title = "工作台" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
              王
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-base font-semibold text-foreground">{title}</h1>
            <p className="text-xs text-muted-foreground">早上好，王教练</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground">
              3
            </Badge>
          </button>
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <QrCode className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
