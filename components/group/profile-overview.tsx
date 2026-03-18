"use client"

import { useRouter } from "next/navigation"
import {
  Building2,
  ChevronRight,
  Wallet,
  BarChart3,
  Gift,
  Bell,
  Settings,
  Shield,
  FileText,
  Star,
  CheckCircle2,
  Users,
  LogOut,
  Trophy,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ── Mock data ────────────────────────────────────────────────────────────────
const orgInfo = {
  name: "远航体育俱乐部",
  type: "俱乐部",
  memberCount: 68,
  certStatus: "verified",
  level: "VIP团体",
  since: "2023年06月",
  admin: "张伟",
  balance: 28500,
  points: 1280,
}

const menuSections = [
  {
    title: "财务管理",
    items: [
      { icon: Wallet,   label: "团体账户",   sub: `余额 ¥${(28500).toLocaleString()}`, badge: null,  path: "/group/finance" },
      { icon: FileText, label: "消费记录",   sub: "查看详细账单",                     badge: null,  path: "/group/finance" },
      { icon: FileText, label: "发票管理",   sub: "申请和查看发票",                   badge: "2",   path: "/group/finance/invoice" },
    ],
  },
  {
    title: "团体权益",
    items: [
      { icon: Gift,   label: "团体福利",   sub: "专属优惠与福利包",                badge: null, path: "/group/benefits" },
      { icon: Star,   label: "积分中心",   sub: `当前积分 ${1280}`,                badge: null, path: "/group/points" },
      { icon: Trophy, label: "活动特权",   sub: "专属场地与明星教练",              badge: null, path: "/group/benefits" },
    ],
  },
  {
    title: "数据与报告",
    items: [
      { icon: BarChart3, label: "消费统计",   sub: "月度/季度消费分析",   badge: null, path: "/group/stats" },
      { icon: Users,     label: "成员统计",   sub: "参与率与活跃度分析", badge: null, path: "/group/stats" },
      { icon: FileText,  label: "报表导出",   sub: "导出 Excel / PDF",   badge: null, path: "/group/stats" },
    ],
  },
  {
    title: "系统设置",
    items: [
      { icon: Bell,     label: "通知设置",   sub: "管理消息接收方式", badge: "2",  path: "/group/notification-settings" },
      { icon: Shield,   label: "管理员设置", sub: "权限分配与账号安全", badge: null, path: "/group/admin-settings" },
      { icon: Settings, label: "系统偏好",   sub: "界面与语言设置",   badge: null, path: "" },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────

export function ProfileOverview() {
  const router = useRouter()

  return (
    <div className="pb-24">
      {/* ── Org card ─────────────────────────────────────────────────────── */}
      <div className="bg-primary px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-white/30">
            <AvatarFallback className="bg-white/20 text-primary-foreground font-bold text-xl">
              远
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-primary-foreground">{orgInfo.name}</p>
              {orgInfo.certStatus === "verified" && (
                <CheckCircle2 className="h-4 w-4 text-white/80" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-white/20 text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                {orgInfo.type}
              </span>
              <span className="text-xs bg-white/20 text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                {orgInfo.level}
              </span>
            </div>
            <p className="text-xs text-primary-foreground/70 mt-1">
              注册于 {orgInfo.since} · 管理员：{orgInfo.admin}
            </p>
          </div>
        </div>

        {/* Balance + points row */}
        <div className="relative mt-5 grid grid-cols-3 gap-3">
          {[
            { label: "账户余额", value: `¥${orgInfo.balance.toLocaleString()}` },
            { label: "成员人数", value: `${orgInfo.memberCount}人` },
            { label: "积分余额", value: `${orgInfo.points}分` },
          ].map((item) => (
            <div key={item.label} className="bg-white/15 rounded-xl py-3 px-2 text-center">
              <p className="text-sm font-bold text-primary-foreground">{item.value}</p>
              <p className="text-[10px] text-primary-foreground/70 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team info card ─────────────────────────────────────────────── */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => router.push("/group/team-info")}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-secondary/50 transition-colors text-left"
          >
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">团体信息</p>
              <p className="text-xs text-muted-foreground mt-0.5">基本资料 · 认证资质 · 管理员</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </button>
        </div>
      </div>

      {/* ── Menu sections ────────────────────────────────────────────────── */}
      <div className="px-4 mt-4 space-y-4">
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="text-xs text-muted-foreground font-medium px-1 mb-2">{section.title}</p>
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => item.path && router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-secondary/50 transition-colors text-left ${
                    index < section.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className="h-5 min-w-5 flex items-center justify-center px-1 text-[10px] font-bold bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* ── Switch role ──────────────────────────────────────────────── */}
        <button
          onClick={() => router.push("/")}
          className="w-full bg-card rounded-2xl shadow-sm border border-border py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          切换身份
        </button>

      </div>
    </div>
  )
}
