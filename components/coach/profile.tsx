"use client"

import { ChevronRight, ClipboardList, Award, FileText, Bell, Shield, HelpCircle, LogOut, Star, Settings } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockCoachProfile } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface ProfileProps {
  onNavigate: (screen: Screen) => void
}

export function Profile({ onNavigate }: ProfileProps) {
  const initials = mockCoachProfile.realName.slice(0, 1)

  const menuItems = [
    { icon: ClipboardList, label: "教学反馈",   badge: "2",  onPress: () => onNavigate({ type: "teaching-feedback" }) },
    { icon: Award,         label: "资质证书",   badge: "",   onPress: () => {} },
    { icon: FileText,      label: "合同管理",   badge: "",   onPress: () => {} },
    { icon: Bell,          label: "消息设置",   badge: "",   onPress: () => {} },
    { icon: Shield,        label: "隐私设置",   badge: "",   onPress: () => {} },
    { icon: HelpCircle,    label: "帮助与反馈", badge: "",   onPress: () => {} },
  ]

  return (
    <div className="flex flex-col min-h-full pb-24 overflow-y-auto">
      {/* Header bar */}
      <div className="bg-card border-b border-border">
        <div className="relative flex items-center h-14 px-4">
          <h1 className="absolute inset-0 flex items-center justify-center text-base font-bold text-foreground pointer-events-none">个人中心</h1>
          <button className="ml-auto h-9 w-9 flex items-center justify-center rounded-full hover:bg-secondary">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4 flex items-center gap-4">
        <Avatar className="h-16 w-16 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">{mockCoachProfile.realName}</h2>
            <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">
              {mockCoachProfile.coachTypeText}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{mockCoachProfile.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-foreground">{mockCoachProfile.rating}</span>
            <span className="text-xs text-muted-foreground ml-2">教龄 {mockCoachProfile.experience} 年</span>
          </div>
        </div>
        <button className="shrink-0 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1.5">
          编辑资料
        </button>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-3 bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-border">
          {[
            { label: "完成课时", value: mockCoachProfile.completedSessions },
            { label: "教龄(年)",  value: mockCoachProfile.experience },
            { label: "综合评分", value: mockCoachProfile.rating },
            { label: "学员总数", value: 156 },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center py-4">
              <span className="text-lg font-bold text-foreground leading-none">{item.value}</span>
              <span className="text-[10px] text-muted-foreground mt-1.5 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-4 mt-3 bg-card rounded-2xl shadow-sm p-4">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "我的课程",   emoji: "📚" },
            { label: "教学反馈",   emoji: "📝", badge: "2", onPress: () => onNavigate({ type: "teaching-feedback" }) },
            { label: "资质证书",   emoji: "🏆" },
            { label: "数据统计",   emoji: "📊" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onPress}
              className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-secondary transition-colors relative"
            >
              <span className="text-2xl leading-none">{item.emoji}</span>
              <span className="text-xs text-foreground text-center leading-tight">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2 h-4 min-w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Intro */}
      <div className="mx-4 mt-3 bg-card rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-foreground">个人资料</h3>
          <button className="text-xs text-primary flex items-center gap-0.5">更多 <ChevronRight className="h-3.5 w-3.5" /></button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{mockCoachProfile.introduction}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {mockCoachProfile.certificate.split(",").map((c) => (
            <span key={c} className="text-xs bg-secondary text-muted-foreground rounded-full px-2.5 py-1">{c}</span>
          ))}
        </div>
      </div>

      {/* Menu list */}
      <div className="mx-4 mt-3 bg-card rounded-2xl shadow-sm overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            onClick={item.onPress}
            className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors ${
              i < menuItems.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <item.icon className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="flex-1 text-sm text-foreground text-left">{item.label}</span>
            {item.badge && (
              <span className="h-5 min-w-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 mr-1">
                {item.badge}
              </span>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-3 bg-card rounded-2xl shadow-sm overflow-hidden">
        <button className="w-full flex items-center justify-center gap-2 py-4 text-red-500 hover:bg-red-50 transition-colors">
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">退出登录</span>
        </button>
      </div>
    </div>
  )
}
