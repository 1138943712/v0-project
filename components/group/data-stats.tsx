"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, TrendingUp, Download, Users, MapPin } from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

const ranges = ["本周", "本月", "本季度", "全年"]

// Simple bar chart data
const consumeByDay = [
  { day: "周一", amount: 320 }, { day: "周二", amount: 580 },
  { day: "周三", amount: 240 }, { day: "周四", amount: 760 },
  { day: "周五", amount: 920 }, { day: "周六", amount: 480 },
  { day: "周日", amount: 160 },
]
const maxAmount = Math.max(...consumeByDay.map((d) => d.amount))

const consumeByType = [
  { label: "场地费用", amount: 1560, pct: 48, color: "bg-primary" },
  { label: "课程费用", amount: 900,  pct: 28, color: "bg-blue-400" },
  { label: "活动费用", amount: 800,  pct: 24, color: "bg-purple-400" },
]

const deptConsume = [
  { dept: "技术部", amount: 1200, members: 18 },
  { dept: "市场部", amount: 980,  members: 12 },
  { dept: "运营部", amount: 680,  members: 10 },
  { dept: "行政部", amount: 240,  members: 8 },
  { dept: "人力资源",amount: 160, members: 6 },
]
const maxDeptAmount = Math.max(...deptConsume.map((d) => d.amount))

const venueUsage = [
  { name: "羽毛球馆",  count: 28, pct: 45, color: "bg-primary" },
  { name: "游泳池",    count: 18, pct: 29, color: "bg-cyan-400" },
  { name: "综合健身房",count: 10, pct: 16, color: "bg-green-400" },
  { name: "其他",      count: 6,  pct: 10, color: "bg-border" },
]

const activityStats = [
  { label: "活动总场次", value: "4场",  sub: "较上月 +1场",    color: "text-primary" },
  { label: "总参与人次", value: "86人", sub: "参与率 78%",     color: "text-primary" },
  { label: "平均满意度", value: "4.8",  sub: "⭐ 较上月 +0.2", color: "text-accent" },
  { label: "未参与成员", value: "15人", sub: "占比 22%",       color: "text-orange-500" },
]

export function DataStats() {
  const router = useRouter()
  const [range, setRange] = useState("本月")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader
        title="数据统计"
        onBack={() => router.back()}
        rightSlot={
          <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-secondary">
            <Download className="h-4 w-4 text-muted-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* ── Range filter ──────────────────────────────────────────── */}
        <div className="px-4 pt-4">
          <div className="bg-secondary rounded-xl p-1 flex gap-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  range === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* ── Consume overview ──────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-foreground">消费总览</h3>
            <span className="text-xs text-muted-foreground">{range}</span>
          </div>
          <div className="flex items-end gap-1 mt-3">
            <span className="text-3xl font-bold text-foreground">¥3,260</span>
            <span className="text-xs text-green-600 font-medium mb-1 flex items-center gap-0.5">
              <TrendingUp className="h-3 w-3" /> -12%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">较上{range === "本周" ? "周" : range === "本月" ? "月" : "期"} 减少 ¥468</p>

          {/* Bar chart */}
          <div className="flex items-end gap-1.5 mt-4 h-20">
            {consumeByDay.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-primary rounded-t-md transition-all"
                  style={{ height: `${Math.round((d.amount / maxAmount) * 64)}px` }}
                />
                <span className="text-[9px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Consume by type ───────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">消费类型分布</h3>
          <div className="space-y-3">
            {consumeByType.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">¥{item.amount}</span>
                    <span className="text-muted-foreground">{item.pct}%</span>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dept consume ──────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">部门消费排行</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {deptConsume.map((dept, i) => (
              <div key={dept.dept} className="flex items-center gap-3">
                <span className={`text-sm font-bold w-4 shrink-0 ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">{dept.dept}</span>
                    <span className="text-foreground font-bold">¥{dept.amount}</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.round((dept.amount / maxDeptAmount) * 100)}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 w-10 text-right">{dept.members}人</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Activity stats ────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-bold text-foreground">活动参与统计</h3>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-border">
            {activityStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center py-4 px-3">
                <span className={`text-xl font-bold leading-none ${s.color}`}>{s.value}</span>
                <span className="text-[10px] text-muted-foreground mt-1.5 text-center">{s.label}</span>
                <span className="text-[10px] text-muted-foreground/70 mt-0.5 text-center">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Venue usage ───────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">场地使用偏好</h3>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Donut-style ring with legend */}
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
                {venueUsage.reduce((acc, item, i) => {
                  const offset = acc.offset
                  const dash = item.pct
                  acc.els.push(
                    <circle
                      key={i}
                      cx="18" cy="18" r="15.9"
                      fill="none"
                      strokeWidth="3.8"
                      className={item.color.replace("bg-", "stroke-")}
                      strokeDasharray={`${dash} ${100 - dash}`}
                      strokeDashoffset={-offset}
                    />
                  )
                  acc.offset += dash
                  return acc
                }, { offset: 0, els: [] as React.ReactNode[] }).els}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-foreground">62次</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {venueUsage.map((v) => (
                <div key={v.name} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full shrink-0 ${v.color}`} />
                  <span className="text-xs text-muted-foreground flex-1">{v.name}</span>
                  <span className="text-xs font-medium text-foreground">{v.count}次</span>
                  <span className="text-[10px] text-muted-foreground w-8 text-right">{v.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Export ────────────────────────────────────────────────── */}
        <div className="mx-4 mt-4">
          <button className="w-full border border-primary text-primary rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold text-sm hover:bg-primary/5 transition-colors">
            <Download className="h-5 w-5" />
            导出统计报表（Excel / PDF）
          </button>
        </div>
      </div>
    </div>
  )
}
