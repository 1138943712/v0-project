"use client"

import { 
  Settings, 
  ChevronRight, 
  Award, 
  FileText, 
  BarChart3, 
  HelpCircle,
  LogOut,
  Moon,
  Bell,
  Shield
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const menuItems = [
  {
    icon: BarChart3,
    label: "数据统计",
    description: "查看课程和学员数据",
    href: "#",
  },
  {
    icon: Award,
    label: "资质证书",
    description: "管理您的教练资质",
    badge: "3",
    href: "#",
  },
  {
    icon: FileText,
    label: "合同管理",
    description: "查看和管理合同",
    href: "#",
  },
  {
    icon: Shield,
    label: "隐私设置",
    description: "管理账户安全",
    href: "#",
  },
  {
    icon: HelpCircle,
    label: "帮助中心",
    description: "常见问题与客服",
    href: "#",
  },
]

export function Profile() {
  return (
    <div className="flex flex-col h-full pb-24">
      {/* Profile Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl font-semibold">
              王
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">王教练</h2>
              <Badge className="bg-primary text-primary-foreground">认证教练</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">篮球 · 体能训练 · 游泳</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="text-muted-foreground">
                从业 <span className="text-foreground font-medium">8</span> 年
              </span>
              <span className="text-muted-foreground">
                学员 <span className="text-foreground font-medium">156</span> 人
              </span>
            </div>
          </div>
          <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <p className="text-2xl font-bold text-foreground">4.9</p>
            <p className="text-xs text-muted-foreground mt-1">学员评分</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <p className="text-2xl font-bold text-foreground">1,280</p>
            <p className="text-xs text-muted-foreground mt-1">授课时长</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <p className="text-2xl font-bold text-foreground">98%</p>
            <p className="text-xs text-muted-foreground mt-1">好评率</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 space-y-2">
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">消息通知</p>
                <p className="text-xs text-muted-foreground">接收预约和系统通知</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary p-2">
                <Moon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">深色模式</p>
                <p className="text-xs text-muted-foreground">跟随系统设置</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-4 space-y-2">
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary p-2">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-4">
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </div>
  )
}
