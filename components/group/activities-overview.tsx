"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trophy, Plus, Clock, MapPin, Users, ChevronRight, Flame, Star } from "lucide-react"

// ── Mock data ────────────────────────────────────────────────────────────────
const tabOptions = [
  { id: "internal", label: "内部活动" },
  { id: "external", label: "外部赛事" },
  { id: "past",     label: "历史记录" },
]

const activityStats = [
  { label: "本月活动", value: "4场",  color: "text-primary" },
  { label: "参与人次", value: "86人", color: "text-primary" },
  { label: "待报名",   value: "1场",  color: "text-orange-500" },
  { label: "参与率",   value: "78%",  color: "text-accent" },
]

const internalActivities = [
  {
    id: "a1",
    title: "企业羽毛球联赛",
    type: "赛事",
    typeColor: "bg-blue-100 text-blue-600",
    date: "03月22日 09:00",
    endDate: "03月22日 18:00",
    venue: "羽毛球馆 B区",
    participants: 24,
    maxParticipants: 32,
    status: "signup",
    organizer: "行政部",
    budget: 2400,
  },
  {
    id: "a2",
    title: "部门团建游泳活动",
    type: "团建",
    typeColor: "bg-cyan-100 text-cyan-600",
    date: "03月25日 14:00",
    endDate: "03月25日 17:00",
    venue: "游泳馆 标准池",
    participants: 18,
    maxParticipants: 20,
    status: "almost_full",
    organizer: "技术部",
    budget: 1800,
  },
  {
    id: "a3",
    title: "新人入职健身培训",
    type: "培训",
    typeColor: "bg-green-100 text-green-600",
    date: "03月28日 10:00",
    endDate: "03月28日 12:00",
    venue: "健身房 综合区",
    participants: 10,
    maxParticipants: 15,
    status: "planning",
    organizer: "人力资源部",
    budget: 500,
  },
]

const externalEvents = [
  {
    id: "e1",
    title: "2026年市级企业篮球联赛",
    organizer: "市体育局",
    date: "04月05日 – 04月20日",
    venue: "市体育馆",
    signupDeadline: "03月30日",
    fee: 800,
    status: "open",
    recommended: true,
  },
  {
    id: "e2",
    title: "春季羽毛球邀请赛",
    organizer: "远航体育场馆",
    date: "04月12日 09:00",
    venue: "羽毛球馆 A区",
    signupDeadline: "04月08日",
    fee: 300,
    status: "open",
    recommended: false,
  },
  {
    id: "e3",
    title: "职工健康跑步挑战赛",
    organizer: "健身协会",
    date: "04月19日 07:30",
    venue: "城市公园",
    signupDeadline: "04月15日",
    fee: 0,
    status: "open",
    recommended: true,
  },
]

const internalStatusStyle: Record<string, { label: string; badge: string }> = {
  signup:      { label: "报名中",  badge: "bg-primary/10 text-primary" },
  almost_full: { label: "即将满员",badge: "bg-orange-50 text-orange-500" },
  planning:    { label: "筹备中",  badge: "bg-secondary text-muted-foreground" },
  ended:       { label: "已结束",  badge: "bg-secondary text-muted-foreground" },
}

// ─────────────────────────────────────────────────────────────────────────────

export function ActivitiesOverview() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("internal")

  return (
    <div className="px-4 py-4 pb-24 space-y-5">

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-border">
          {activityStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-4 px-1">
              <span className={`text-lg font-bold leading-none ${s.color}`}>{s.value}</span>
              <span className="text-[10px] text-muted-foreground mt-1.5 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab switch ───────────────────────────────────────────────────── */}
      <div className="bg-secondary rounded-xl p-1 flex gap-1">
        {tabOptions.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === t.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Internal activities ──────────────────────────────────────────── */}
      {activeTab === "internal" && (
        <div className="space-y-3">
          {internalActivities.map((act) => {
            const st = internalStatusStyle[act.status] ?? internalStatusStyle.planning
            const pct = Math.round((act.participants / act.maxParticipants) * 100)
            return (
              <div key={act.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 pt-4 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${act.typeColor}`}>
                          {act.type}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${st.badge}`}>
                          {st.label}
                        </span>
                      </div>
                      <p className="font-bold text-foreground text-sm mt-1.5">{act.title}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>{act.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{act.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      <span>负责人：{act.organizer}</span>
                      <span className="ml-auto font-medium text-foreground">预算 ¥{act.budget}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {act.participants}/{act.maxParticipants}人
                    </span>
                  </div>
                </div>

                <div className="border-t border-border flex divide-x divide-border">
                  <button
                    onClick={() => router.push(`/group/activity/${act.id}`)}
                    className="flex-1 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    管理名单
                  </button>
                  <button
                    onClick={() => router.push(`/group/activity/${act.id}`)}
                    className="flex-1 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    发送通知
                  </button>
                  <button
                    onClick={() => router.push(`/group/activity/${act.id}`)}
                    className="flex-1 py-3 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            )
          })}

          <button className="w-full bg-primary text-primary-foreground rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold text-sm shadow-md active:scale-[0.98] transition-transform">
            <Plus className="h-5 w-5" />
            创建内部活动
          </button>
        </div>
      )}

      {/* ── External events ───────────────────────────────────────────────── */}
      {activeTab === "external" && (
        <div className="space-y-3">
          {externalEvents.map((ev) => (
            <div key={ev.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 pt-4 pb-3">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {ev.recommended && (
                        <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5" />推荐
                        </span>
                      )}
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        报名开放
                      </span>
                    </div>
                    <p className="font-bold text-foreground text-sm">{ev.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">主办：{ev.organizer}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">
                      {ev.fee === 0 ? "免费" : `¥${ev.fee}`}
                    </p>
                    <p className="text-[10px] text-muted-foreground">报名费</p>
                  </div>
                </div>

                <div className="mt-2.5 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{ev.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 shrink-0 text-red-400" />
                    <span className="text-red-500 font-medium">报名截止：{ev.signupDeadline}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border flex divide-x divide-border">
                <button className="flex-1 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  查看详情
                </button>
                <button className="flex-1 py-3 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors">
                  团体报名
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Past activities ───────────────────────────────────────────────── */}
      {activeTab === "past" && (
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {[
            { title: "2月员工健步走活动", date: "02月15日", participants: 45, rating: 4.8 },
            { title: "元旦趣味运动会",     date: "01月01日", participants: 62, rating: 4.9 },
            { title: "年终篮球联赛",       date: "12月20日", participants: 32, rating: 4.7 },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`px-4 py-4 flex items-center gap-3 ${index < 2 ? "border-b border-border" : ""}`}
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <span>{item.date}</span>
                  <span>{item.participants}人参与</span>
                  <span className="flex items-center gap-0.5 text-yellow-500">
                    <Star className="h-3 w-3" />
                    {item.rating}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
