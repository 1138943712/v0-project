"use client"

import { useRouter } from "next/navigation"
import { Phone, Calendar, Shield, CreditCard, ChevronRight, TrendingUp, Activity } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GroupDetailHeader } from "@/components/group/detail-header"

// ── Mock ──────────────────────────────────────────────────────────────────────
const memberMap: Record<string, {
  id: string; name: string; avatar: string; dept: string; role: string;
  status: string; phone: string; email: string; joinDate: string;
  monthConsume: number; totalConsume: number; activityCount: number;
  permissions: string[]; consumeRecords: { date: string; item: string; amount: number; dept: string }[];
  activities: { title: string; date: string; status: string }[];
}> = {
  "m1": {
    id: "m1", name: "张伟", avatar: "张", dept: "市场部", role: "admin",
    status: "active", phone: "138****8001", email: "zhang***@company.com",
    joinDate: "2024年01月15日", monthConsume: 320, totalConsume: 2860, activityCount: 8,
    permissions: ["场地预约", "成员管理", "活动管理", "财务查看"],
    consumeRecords: [
      { date: "03月18日", item: "羽毛球馆 B-3", amount: 120, dept: "市场部" },
      { date: "03月12日", item: "健身房 月卡",  amount: 105, dept: "个人" },
      { date: "03月05日", item: "游泳池 次票",  amount: 45,  dept: "个人" },
      { date: "02月25日", item: "羽毛球馆 B-4", amount: 80,  dept: "市场部" },
    ],
    activities: [
      { title: "企业羽毛球联赛", date: "03月22日", status: "报名中" },
      { title: "年终总结会议", date: "12月20日", status: "已参与" },
      { title: "员工健步走",    date: "11月15日", status: "已参与" },
    ],
  },
  "m2": {
    id: "m2", name: "李娜", avatar: "李", dept: "技术部", role: "member",
    status: "active", phone: "139****2345", email: "li***@company.com",
    joinDate: "2024年03月01日", monthConsume: 180, totalConsume: 960, activityCount: 4,
    permissions: ["场地预约", "活动报名"],
    consumeRecords: [
      { date: "03月15日", item: "游泳池 月卡", amount: 90, dept: "技术部" },
      { date: "03月10日", item: "健身课程",    amount: 90, dept: "个人" },
    ],
    activities: [
      { title: "部门团建游泳活动", date: "03月25日", status: "已报名" },
      { title: "企业羽毛球联赛",   date: "03月22日", status: "已报名" },
    ],
  },
  "m3": {
    id: "m3", name: "王强", avatar: "王", dept: "运营部", role: "member",
    status: "active", phone: "137****6789", email: "wang***@company.com",
    joinDate: "2023年09月10日", monthConsume: 450, totalConsume: 5400, activityCount: 12,
    permissions: ["场地预约"],
    consumeRecords: [
      { date: "03月19日", item: "篮球场",     amount: 100, dept: "运营部" },
      { date: "03月15日", item: "健身房",     amount: 35,  dept: "个人" },
      { date: "03月10日", item: "羽毛球馆",   amount: 60,  dept: "运营部" },
      { date: "03月02日", item: "游泳池",     amount: 90,  dept: "运营部" },
    ],
    activities: [
      { title: "元旦趣味运动会", date: "01月01日", status: "已参与" },
    ],
  },
}

const avatarBg = ["bg-blue-400","bg-green-400","bg-purple-400","bg-orange-400","bg-pink-400"]

// ─────────────────────────────────────────────────────────────────────────────

export function MemberDetail({ memberId }: { memberId: string }) {
  const router = useRouter()
  const member = memberMap[memberId] ?? memberMap["m1"]
  const initIdx = Object.keys(memberMap).indexOf(memberId)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="成员详情" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* ── Profile card ──────────────────────────────────────────── */}
        <div className="bg-primary px-4 pt-6 pb-10">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white/30 shrink-0">
              <AvatarFallback className={`${avatarBg[initIdx % avatarBg.length]} text-white font-bold text-2xl`}>
                {member.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                {member.role === "admin" && (
                  <span className="flex items-center gap-0.5 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                    <Shield className="h-3 w-3" />管理员
                  </span>
                )}
              </div>
              <p className="text-sm text-white/80 mt-0.5">{member.dept}</p>
              <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                member.status === "active" ? "bg-white/20 text-white" : "bg-white/10 text-white/60"
              }`}>
                {member.status === "active" ? "活跃" : "未激活"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────────────── */}
        <div className="mx-4 -mt-5 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-border">
            {[
              { label: "本月消费", value: `¥${member.monthConsume}` },
              { label: "累计消费", value: `¥${member.totalConsume}` },
              { label: "参与活动", value: `${member.activityCount}次` },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-4">
                <span className="text-base font-bold text-foreground leading-none">{s.value}</span>
                <span className="text-[10px] text-muted-foreground mt-1.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact ──────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">基本信息</h3>
          </div>
          {[
            { icon: Phone,    label: "手机号",   value: member.phone },
            { icon: Activity, label: "邮箱",     value: member.email },
            { icon: Calendar, label: "加入时间", value: member.joinDate },
            { icon: Shield,   label: "成员角色", value: member.role === "admin" ? "管理员" : "普通成员" },
          ].map((row, i) => (
            <div key={row.label} className={`flex items-center gap-3 px-4 py-3 ${i < 3 ? "border-b border-border" : ""}`}>
              <row.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground w-16 shrink-0">{row.label}</span>
              <span className="text-sm text-foreground">{row.value}</span>
            </div>
          ))}
        </div>

        {/* ── Permissions ──────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">权限设置</h3>
            <button className="text-xs text-primary font-medium">编辑</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {member.permissions.map((p) => (
              <span key={p} className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1.5 font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* ── Consume records ──────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">消费记录</h3>
            <button className="text-xs text-primary flex items-center gap-0.5">
              全部 <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {member.consumeRecords.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">暂无消费记录</p>
          ) : (
            member.consumeRecords.map((rec, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < member.consumeRecords.length - 1 ? "border-b border-border" : ""}`}>
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{rec.item}</p>
                  <p className="text-xs text-muted-foreground">{rec.date} · {rec.dept}</p>
                </div>
                <span className="text-sm font-bold text-foreground">-¥{rec.amount}</span>
              </div>
            ))
          )}
        </div>

        {/* ── Activity history ─────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">活动参与记录</h3>
          </div>
          {member.activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">暂无活动记录</p>
          ) : (
            member.activities.map((act, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < member.activities.length - 1 ? "border-b border-border" : ""}`}>
                <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{act.title}</p>
                  <p className="text-xs text-muted-foreground">{act.date}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  act.status === "报名中" || act.status === "已报名"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {act.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Bottom actions ────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3 flex gap-3">
        <button className="flex-1 border border-border text-muted-foreground rounded-full py-3 text-sm font-semibold hover:border-red-300 hover:text-red-500 transition-colors">
          移除成员
        </button>
        <button className="flex-1 bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold hover:bg-primary/90 transition-colors">
          调整权限
        </button>
      </div>
    </div>
  )
}
