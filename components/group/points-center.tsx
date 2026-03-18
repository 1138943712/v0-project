"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Gift, ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

const pointsRules = [
  { title: "场地预约",    pts: "+10",  desc: "每次有效预约获得10积分" },
  { title: "活动参与",    pts: "+20",  desc: "团体活动每人次获得20积分" },
  { title: "消费满100元", pts: "+5",   desc: "每消费100元获得5积分" },
  { title: "新成员加入",  pts: "+50",  desc: "成功邀请新成员加入获50积分" },
]

const redeemItems = [
  { id: "r1", name: "场地使用券（1小时）", pts: 200, stock: 10 },
  { id: "r2", name: "教练私教课（1节）",   pts: 500, stock: 5 },
  { id: "r3", name: "健身器材礼包",        pts: 800, stock: 3 },
  { id: "r4", name: "年度VIP升级券",       pts: 2000, stock: 1 },
]

const pointsHistory = [
  { type: "in",  desc: "3月团建活动参与奖励",    pts: "+200", date: "03月18日" },
  { type: "in",  desc: "羽毛球馆预约积分",        pts: "+30",  date: "03月15日" },
  { type: "out", desc: "兑换场地使用券 × 2",     pts: "-400", date: "03月10日" },
  { type: "in",  desc: "新成员邀请奖励（3人）",  pts: "+150", date: "03月05日" },
  { type: "in",  desc: "2月月度消费达标奖励",     pts: "+100", date: "02月28日" },
  { type: "out", desc: "兑换教练私教课",          pts: "-500", date: "02月20日" },
]

export function PointsCenter() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"redeem" | "history" | "rules">("redeem")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="积分中心" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* ── Balance card ──────────────────────────────────────────── */}
        <div className="bg-primary px-4 pt-6 pb-10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70 font-medium">团体积分余额</p>
              <p className="text-4xl font-bold text-white mt-1">1,280</p>
              <p className="text-xs text-white/70 mt-1">本月获得 +480 · 本月消耗 -400</p>
            </div>
            <Gift className="h-12 w-12 text-white/30" />
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────── */}
        <div className="mx-4 -mt-4 bg-card rounded-2xl shadow-sm">
          <div className="flex divide-x divide-border">
            {([
              { id: "redeem",  label: "积分兑换" },
              { id: "history", label: "积分记录" },
              { id: "rules",   label: "获取规则" },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3.5 text-xs font-semibold transition-colors ${
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex">
            {["redeem", "history", "rules"].map((id) => (
              <div
                key={id}
                className={`flex-1 h-0.5 transition-colors ${activeTab === id ? "bg-primary" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>

        {/* ── Redeem ────────────────────────────────────────────────── */}
        {activeTab === "redeem" && (
          <div className="mx-4 mt-4 space-y-3">
            {redeemItems.map((item) => {
              const canRedeem = 1280 >= item.pts
              return (
                <div key={item.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-4 py-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-yellow-50 flex items-center justify-center shrink-0 text-2xl">
                      🎁
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">库存 {item.stock} 件</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-bold text-primary">{item.pts} 积分</p>
                    </div>
                  </div>
                  <div className="border-t border-border flex divide-x divide-border">
                    <button className="flex-1 py-3 text-xs text-muted-foreground">分配给成员</button>
                    <button
                      disabled={!canRedeem}
                      className={`flex-1 py-3 text-xs font-semibold transition-colors ${
                        canRedeem ? "text-primary hover:bg-primary/5" : "text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {canRedeem ? "立即兑换" : "积分不足"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── History ───────────────────────────────────────────────── */}
        {activeTab === "history" && (
          <div className="mx-4 mt-4">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {pointsHistory.map((rec, i) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < pointsHistory.length - 1 ? "border-b border-border" : ""}`}>
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${rec.type === "in" ? "bg-green-100" : "bg-red-50"}`}>
                    {rec.type === "in"
                      ? <ArrowDownLeft className="h-5 w-5 text-green-600" />
                      : <ArrowUpRight   className="h-5 w-5 text-red-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{rec.desc}</p>
                    <p className="text-xs text-muted-foreground">{rec.date}</p>
                  </div>
                  <span className={`text-sm font-bold ${rec.type === "in" ? "text-green-600" : "text-red-500"}`}>
                    {rec.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Rules ─────────────────────────────────────────────────── */}
        {activeTab === "rules" && (
          <div className="mx-4 mt-4 space-y-4">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {pointsRules.map((rule, i) => (
                <div key={rule.title} className={`flex items-center gap-3 px-4 py-4 ${i < pointsRules.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{rule.pts}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{rule.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
              积分有效期为1年，过期自动清零。团体积分可分配给成员个人账户。
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
