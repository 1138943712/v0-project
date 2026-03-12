"use client"

import {
  Settings, ChevronRight, Award, FileText,
  BarChart3, HelpCircle, LogOut, Bell, Shield,
  ClipboardList, Star,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockCoachProfile } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface ProfileProps {
  onNavigate: (screen: Screen) => void
}

const coachTypeMap: Record<number, string> = { 1: "全职", 2: "兼职", 3: "外聘", 4: "临时" }

export function Profile({ onNavigate }: ProfileProps) {
  const initials = mockCoachProfile.realName.slice(0, 1)

  const menuItems = [
    { icon: BarChart3,    label: "数据统计",   description: "查看课程和学员数据", onPress: () => {} },
    { icon: ClipboardList, label: "教学反馈",  description: "查看和填写教学反馈", badge: "2", onPress: () => onNavigate({ type: "teaching-feedback" }) },
    { icon: Award,        label: "资质证书",   description: "管理您的教练资质",   onPress: () => {} },
    { icon: FileText,     label: "合同管理",   description: "查看和管理合同",     onPress: () => {} },
    { icon: Bell,         label: "消息设置",   description: "通知与提醒设置",     onPress: () => {} },
    { icon: Shield,       label: "隐私设置",   description: "管理账户安全",       onPress: () => {} },
    { icon: HelpCircle,   label: "帮助中心",   description: "常见问题与客服",     onPress: () => {} },
  ]

  return (
    <div className="flex flex-col h-full pb-24">
      {/* Profile Header */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white">{mockCoachProfile.realName}</h2>
              <Badge className="bg-white/20 text-white border-0 text-xs">
                {coachTypeMap[mockCoachProfile.coachType]}
              </Badge>
            </div>
            <p className="text-sm text-white/80 mt-1">{mockCoachProfile.specialty}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="text-white/70">
                从业 <span className="text-white font-medium">{mockCoachProfile.experience}</span> 年
              </span>
              <span className="text-white/70">
                完成 <span className="text-white font-medium">{mockCoachProfile.completedSessions}</span> 课时
              </span>
            </div>
          </div>
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
            <Settings className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mx-4 -mt-4 rounded-xl bg-card border border-border shadow-sm p-4 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{mockCoachProfile.completedSessions}</p>
          <p className="text-xs text-muted-foreground">完成课时</p>
        </div>
        <div className="text-center border-x border-border">
          <div className="flex items-center justify-center gap-0.5">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <p className="text-lg font-bold text-foreground">{mockCoachProfile.rating}</p>
          </div>
          <p className="text-xs text-muted-foreground">综合评分</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{mockCoachProfile.experience}年</p>
          <p className="text-xs text-muted-foreground">从业年限</p>
        </div>
      </div>

      {/* Coach Info */}
      <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm p-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">教练简介</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {mockCoachProfile.introduction}
        </p>
        <div className="mt-3 pt-3 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-2">持有证书</h3>
          <div className="flex flex-wrap gap-1.5">
            {mockCoachProfile.certificate.split(",").map((cert) => (
              <Badge key={cert} variant="secondary" className="text-xs">{cert}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={item.onPress}
            className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors ${
              index < menuItems.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="rounded-lg p-2 bg-primary/10 shrink-0">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {item.badge && (
                <Badge className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0">
                  {item.badge}
                </Badge>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-4 rounded-xl bg-card border border-border shadow-sm overflow-hidden">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-destructive hover:bg-destructive/5 transition-colors">
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">退出登录</span>
        </button>
      </div>
    </div>
  )
}
