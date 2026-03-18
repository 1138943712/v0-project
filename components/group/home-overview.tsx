"use client"

import { ChevronRight, CalendarDays, MapPin, Plus, BarChart3, Users, Wallet, Bell, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

// ── Mock data ────────────────────────────────────────────────────────────────
const accountStats = [
  { label: "账户余额", value: "¥28,500", sub: "+¥5,000 本月充值", color: "text-primary" },
  { label: "成员人数", value: "68人",    sub: "+3人 本月新增",   color: "text-primary" },
  { label: "本月消费", value: "¥3,260",  sub: "较上月 -12%",    color: "text-accent" },
  { label: "活动场次", value: "4场",     sub: "本月已完成",     color: "text-primary" },
]

const quickActions = [
  { label: "批量预约", icon: MapPin,      color: "bg-blue-500/10 text-blue-600",   path: "/group/venues" },
  { label: "添加成员", icon: Users,       color: "bg-green-500/10 text-green-600", path: "/group/members" },
  { label: "创建活动", icon: CalendarDays,color: "bg-purple-500/10 text-purple-600",path: "/group/activities" },
  { label: "数据报告", icon: BarChart3,   color: "bg-orange-500/10 text-orange-600",path: "/group/profile" },
]

const upcomingActivities = [
  {
    id: "1",
    title: "企业羽毛球联赛",
    date: "03月22日 09:00",
    venue: "羽毛球馆 B区",
    participants: 24,
    maxParticipants: 32,
    status: 1,
  },
  {
    id: "2",
    title: "部门团建游泳活动",
    date: "03月25日 14:00",
    venue: "游泳馆 标准池",
    participants: 18,
    maxParticipants: 20,
    status: 2,
  },
  {
    id: "3",
    title: "新人入职健身培训",
    date: "03月28日 10:00",
    venue: "健身房 综合区",
    participants: 10,
    maxParticipants: 15,
    status: 0,
  },
]

const notifications = [
  {
    id: "n1",
    type: "finance",
    title: "账户余额充值成功",
    content: "您的团体账户已充值 ¥5,000，当前余额 ¥28,500",
    time: "10分钟前",
  },
  {
    id: "n2",
    type: "venue",
    title: "场地预约提醒",
    content: "羽毛球馆 B-3、B-4 明日 09:00 预约即将开始",
    time: "1小时前",
  },
  {
    id: "n3",
    type: "system",
    title: "场馆公告",
    content: "游泳馆将于3月24日进行设备维护，当日暂停开放",
    time: "今天 08:30",
  },
]

const statusStyle: Record<number, { dot: string; label: string; badge: string }> = {
  1: { dot: "bg-accent",    label: "报名中", badge: "bg-accent/10 text-accent" },
  2: { dot: "bg-orange-400",label: "即将满员",badge: "bg-orange-50 text-orange-500" },
  0: { dot: "bg-primary",   label: "筹备中", badge: "bg-primary/10 text-primary" },
}

const noticeIcon: Record<string, { bg: string; icon: string }> = {
  finance: { bg: "bg-green-100", icon: "💰" },
  venue:   { bg: "bg-blue-100",  icon: "📍" },
  system:  { bg: "bg-orange-100",icon: "📢" },
}

// ─────────────────────────────────────────────────────────────────────────────

export function GroupHomeOverview() {
  const router = useRouter()

  return (
    <div className="px-4 py-4 pb-24 space-y-5">

      {/* ── Account balance card ─────────────────────────────────────────── */}
      <div className="bg-primary rounded-2xl p-5 relative overflow-hidden shadow-md">
        {/* decorative circles */}
        <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -right-2 h-20 w-20 rounded-full bg-white/10" />

        <p className="text-xs text-primary-foreground/70 font-medium">团体账户余额</p>
        <p className="text-3xl font-bold text-primary-foreground mt-1">¥28,500.00</p>
        <div className="flex items-center gap-4 mt-4">
          <div>
            <p className="text-[10px] text-primary-foreground/60">冻结资金</p>
            <p className="text-sm font-semibold text-primary-foreground">¥1,200.00</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-[10px] text-primary-foreground/60">本月消费</p>
            <p className="text-sm font-semibold text-primary-foreground">¥3,260.00</p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => router.push("/group/finance/recharge")}
              className="bg-white/20 hover:bg-white/30 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
            >
              <Wallet className="h-3.5 w-3.5" />
              充值
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-border">
          {accountStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-4 px-1">
              <span className={`text-lg font-bold leading-none ${s.color}`}>{s.value}</span>
              <span className="text-[10px] text-muted-foreground mt-1.5 text-center leading-tight">{s.label}</span>
              <span className="text-[9px] text-muted-foreground/70 mt-1 text-center leading-tight">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl shadow-sm p-4">
        <p className="text-sm font-bold text-foreground mb-3">快捷操作</p>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => router.push(action.path)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`h-12 w-12 rounded-2xl ${action.color} flex items-center justify-center`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-[11px] text-foreground font-medium text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Upcoming activities ───────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-foreground">近期活动</h2>
          <button
            onClick={() => router.push("/group/activities")}
            className="text-sm text-primary flex items-center gap-0.5"
          >
            查看全部 <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {upcomingActivities.map((act, index) => {
            const st = statusStyle[act.status] ?? statusStyle[0]
            const pct = Math.round((act.participants / act.maxParticipants) * 100)
            return (
              <button
                key={act.id}
                onClick={() => router.push(`/group/activity/${act.id}`)}
                className={`w-full text-left px-4 py-4 hover:bg-secondary/50 transition-colors ${index < upcomingActivities.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{act.title}</p>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>{act.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span>{act.venue}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${st.badge}`}>
                    {st.label}
                  </span>
                </div>

                {/* Participants progress */}
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {act.participants}/{act.maxParticipants}人
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => router.push("/group/activities")}
          className="w-full bg-card rounded-2xl shadow-sm border border-dashed border-border py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
        >
          <Plus className="h-4 w-4" />
          创建新活动
        </button>
      </div>

      {/* ── Notifications ────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-foreground">最新通知</h2>
          <span className="text-xs text-muted-foreground">全部已读</span>
        </div>

        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {notifications.map((n, index) => {
            const ni = noticeIcon[n.type] ?? noticeIcon.system
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-4 py-4 ${
                  index < notifications.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className={`h-9 w-9 rounded-full ${ni.bg} flex items-center justify-center shrink-0 text-base`}>
                  {ni.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.content}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
