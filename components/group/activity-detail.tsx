"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Clock, MapPin, Users, Bell, ClipboardCheck, Image, ChevronRight,
  QrCode, UserCheck, BarChart3, Star,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GroupDetailHeader } from "@/components/group/detail-header"

// ── Mock ──────────────────────────────────────────────────────────────────────
const activityMap: Record<string, {
  id: string; title: string; type: string; typeColor: string;
  date: string; endDate: string; venue: string; organizer: string;
  budget: number; participants: number; maxParticipants: number; status: string;
  description: string;
  memberList: { id: string; name: string; dept: string; avatar: string; checked: boolean }[];
  notifications: { time: string; content: string }[];
}> = {
  "a1": {
    id: "a1", title: "企业羽毛球联赛", type: "赛事", typeColor: "bg-blue-100 text-blue-600",
    date: "03月22日 09:00", endDate: "03月22日 18:00", venue: "羽毛球馆 B区",
    organizer: "行政部 张伟", budget: 2400, participants: 24, maxParticipants: 32, status: "signup",
    description: "全员参与的羽毛球联赛，分男单、女单、混双三个项目。采用小组赛+淘汰赛制度，欢迎各部门踊跃报名，展现团队风采！",
    memberList: [
      { id: "m1", name: "张伟", dept: "市场部", avatar: "张", checked: true },
      { id: "m2", name: "李娜", dept: "技术部", avatar: "李", checked: true },
      { id: "m3", name: "王强", dept: "运营部", avatar: "王", checked: false },
      { id: "m4", name: "赵丽", dept: "人力资源",avatar: "赵", checked: true },
      { id: "m5", name: "刘洋", dept: "技术部", avatar: "刘", checked: false },
      { id: "m6", name: "陈敏", dept: "行政部", avatar: "陈", checked: true },
      { id: "m7", name: "吴磊", dept: "市场部", avatar: "吴", checked: true },
      { id: "m8", name: "周杰", dept: "运营部", avatar: "周", checked: true },
    ],
    notifications: [
      { time: "03月15日 09:00", content: "活动报名已开启，请各部门成员尽快报名！" },
      { time: "03月18日 14:00", content: "赛程安排已公布，请查看分组情况。" },
      { time: "03月21日 18:00", content: "明日活动提醒：请参与成员提前10分钟到场。" },
    ],
  },
  "a2": {
    id: "a2", title: "部门团建游泳活动", type: "团建", typeColor: "bg-cyan-100 text-cyan-600",
    date: "03月25日 14:00", endDate: "03月25日 17:00", venue: "游泳馆 标准池",
    organizer: "技术部 李总", budget: 1800, participants: 18, maxParticipants: 20, status: "almost_full",
    description: "技术部团建游泳活动，增强团队凝聚力，放松工作压力。活动包括自由游泳和趣味接力比赛。",
    memberList: [
      { id: "m2", name: "李娜",  dept: "技术部", avatar: "李", checked: true },
      { id: "m5", name: "刘洋",  dept: "技术部", avatar: "刘", checked: true },
      { id: "m9", name: "黄明",  dept: "技术部", avatar: "黄", checked: false },
      { id: "m10",name: "林芳",  dept: "技术部", avatar: "林", checked: true },
    ],
    notifications: [
      { time: "03月20日 10:00", content: "活动通知：部门团建游泳活动，请确认参与。" },
    ],
  },
  "a3": {
    id: "a3", title: "新人入职健身培训", type: "培训", typeColor: "bg-green-100 text-green-600",
    date: "03月28日 10:00", endDate: "03月28日 12:00", venue: "健身房 综合区",
    organizer: "人力资源部 赵丽", budget: 500, participants: 10, maxParticipants: 15, status: "planning",
    description: "针对本月新入职员工的健身培训，介绍健身房设施使用规则，提供基础健身指导。",
    memberList: [],
    notifications: [],
  },
}

const avatarColors = ["bg-blue-400","bg-green-400","bg-purple-400","bg-orange-400","bg-pink-400","bg-cyan-400","bg-red-400","bg-indigo-400"]

const statusBadge: Record<string, string> = {
  signup:      "bg-primary/10 text-primary",
  almost_full: "bg-orange-50 text-orange-500",
  planning:    "bg-secondary text-muted-foreground",
  ended:       "bg-secondary text-muted-foreground",
}
const statusLabel: Record<string, string> = {
  signup: "报名中", almost_full: "即将满员", planning: "筹备中", ended: "已结束",
}

// ─────────────────────────────────────────────────────────────────────────────

export function ActivityDetail({ activityId }: { activityId: string }) {
  const router = useRouter()
  const act = activityMap[activityId] ?? activityMap["a1"]
  const [activeTab, setActiveTab] = useState<"info" | "members" | "notifications">("info")

  const pct = Math.round((act.participants / act.maxParticipants) * 100)
  const checkedCount = act.memberList.filter((m) => m.checked).length

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="活动详情" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="bg-primary px-4 pt-5 pb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium bg-white/20 text-white`}>
              {act.type}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusBadge[act.status]} `}>
              {statusLabel[act.status]}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{act.title}</h2>
          <div className="space-y-1.5 mt-3 text-sm text-white/80">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" />{act.date} – {act.endDate}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" />{act.venue}</div>
            <div className="flex items-center gap-2"><Users className="h-4 w-4 shrink-0" />负责人：{act.organizer}</div>
          </div>
        </div>

        {/* ── Participant progress card ──────────────────────────────── */}
        <div className="mx-4 -mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-semibold text-foreground">报名进度</span>
            <span className="text-muted-foreground">{act.participants}/{act.maxParticipants} 人 · {pct}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "报名人数", value: act.participants },
              { label: "剩余名额", value: act.maxParticipants - act.participants },
              { label: "预算",     value: `¥${act.budget}` },
            ].map((s) => (
              <div key={s.label} className="bg-secondary rounded-xl py-2 px-2 text-center">
                <p className="text-sm font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick actions ─────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "管理名单", icon: Users,        color: "bg-blue-100 text-blue-600" },
              { label: "发送通知", icon: Bell,         color: "bg-orange-100 text-orange-600" },
              { label: "签到管理", icon: UserCheck,    color: "bg-green-100 text-green-600" },
              { label: "签到二维码", icon: QrCode,    color: "bg-purple-100 text-purple-600" },
            ].map((a) => (
              <button key={a.label} className="flex flex-col items-center gap-1.5">
                <div className={`h-12 w-12 rounded-2xl ${a.color} flex items-center justify-center`}>
                  <a.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] text-foreground font-medium text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-secondary rounded-xl p-1 flex gap-1">
          {(["info","members","notifications"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tab === "info" ? "活动详情" : tab === "members" ? `成员名单(${act.memberList.length})` : "通知记录"}
            </button>
          ))}
        </div>

        {/* ── Tab: Info ─────────────────────────────────────────────── */}
        {activeTab === "info" && (
          <div className="mx-4 mt-4 space-y-4">
            <div className="bg-card rounded-2xl shadow-sm p-4">
              <h3 className="text-sm font-bold text-foreground mb-2">活动介绍</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{act.description}</p>
            </div>
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {[
                { label: "活动类型", value: act.type },
                { label: "开始时间", value: act.date },
                { label: "结束时间", value: act.endDate },
                { label: "活动地点", value: act.venue },
                { label: "活动预算", value: `¥${act.budget}` },
                { label: "负责人",   value: act.organizer },
              ].map((row, i) => (
                <div key={row.label} className={`flex items-center px-4 py-3 ${i < 5 ? "border-b border-border" : ""}`}>
                  <span className="text-sm text-muted-foreground w-20 shrink-0">{row.label}</span>
                  <span className="text-sm text-foreground font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Members ──────────────────────────────────────────── */}
        {activeTab === "members" && (
          <div className="mx-4 mt-4 space-y-4">
            {/* Sign-in stats */}
            <div className="bg-card rounded-2xl shadow-sm p-4 flex items-center gap-4">
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-foreground">{act.memberList.length}</p>
                <p className="text-xs text-muted-foreground mt-0.5">已报名</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-primary">{checkedCount}</p>
                <p className="text-xs text-muted-foreground mt-0.5">已签到</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold text-orange-500">{act.memberList.length - checkedCount}</p>
                <p className="text-xs text-muted-foreground mt-0.5">未签到</p>
              </div>
            </div>

            {act.memberList.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-sm p-8 text-center text-muted-foreground text-sm">
                暂无报名成员
              </div>
            ) : (
              <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                {act.memberList.map((m, i) => (
                  <div key={m.id} className={`flex items-center gap-3 px-4 py-3 ${i < act.memberList.length - 1 ? "border-b border-border" : ""}`}>
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className={`${avatarColors[i % avatarColors.length]} text-white font-bold text-sm`}>
                        {m.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.dept}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.checked ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      {m.checked ? "已签到" : "未签到"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Notifications ────────────────────────────────────── */}
        {activeTab === "notifications" && (
          <div className="mx-4 mt-4 space-y-3">
            {act.notifications.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-sm p-8 text-center text-muted-foreground text-sm">
                暂无通知记录
              </div>
            ) : (
              <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                {act.notifications.map((n, i) => (
                  <div key={i} className={`px-4 py-4 ${i < act.notifications.length - 1 ? "border-b border-border" : ""}`}>
                    <p className="text-xs text-muted-foreground mb-1">{n.time}</p>
                    <p className="text-sm text-foreground leading-relaxed">{n.content}</p>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full bg-primary text-primary-foreground rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
              <Bell className="h-4 w-4" /> 发送新通知
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom ──────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3 flex gap-3">
        <button className="flex-1 border border-primary text-primary rounded-full py-3 text-sm font-semibold">
          上传照片
        </button>
        <button className="flex-1 bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold">
          编辑活动
        </button>
      </div>
    </div>
  )
}
