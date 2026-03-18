"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Wallet, ChevronRight, CreditCard, FileText, ArrowUpRight,
  ArrowDownLeft, Plus, BarChart3, Building,
} from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

// ── Mock data ────────────────────────────────────────────────────────────────
const account = {
  balance: 28500,
  frozen: 1200,
  monthIn: 5000,
  monthOut: 3260,
  totalConsume: 42800,
}

const subAccounts = [
  { dept: "市场部",   balance: 8000, consume: 980 },
  { dept: "技术部",   balance: 6500, consume: 1200 },
  { dept: "运营部",   balance: 5000, consume: 680 },
  { dept: "行政部",   balance: 4200, consume: 240 },
  { dept: "人力资源", balance: 2800, consume: 160 },
]

const recentTx = [
  { type: "in",  desc: "账户充值",         date: "03月19日 10:32", amount: 5000,  balance: 28500, dept: "" },
  { type: "out", desc: "羽毛球馆 B-3、B-4", date: "03月18日 09:00", amount: -480,  balance: 23500, dept: "市场部" },
  { type: "out", desc: "游泳池 2小时",      date: "03月15日 14:00", amount: -180,  balance: 23980, dept: "技术部" },
  { type: "out", desc: "活动报名费",        date: "03月12日 16:20", amount: -800,  balance: 24160, dept: "全员" },
  { type: "in",  desc: "活动取消退款",     date: "03月10日 11:05", amount: 200,   balance: 24960, dept: "" },
  { type: "out", desc: "健身房月卡",        date: "03月08日 08:00", amount: -1050, balance: 24760, dept: "运营部" },
]

const filterTabs = ["全部", "充值", "消费", "退款"]

// ─────────────────────────────────────────────────────────────────────────────

export function FinanceCenter() {
  const router = useRouter()
  const [filterTab, setFilterTab] = useState("全部")

  const filtered = recentTx.filter((tx) => {
    if (filterTab === "全部") return true
    if (filterTab === "充值") return tx.type === "in" && tx.amount > 0
    if (filterTab === "退款") return tx.type === "in" && tx.desc.includes("退")
    if (filterTab === "消费") return tx.type === "out"
    return true
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="财务管理" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* ── Balance card ──────────────────────────────────────────── */}
        <div className="bg-primary px-5 pt-6 pb-10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-4 h-20 w-20 rounded-full bg-white/10" />
          <p className="text-xs text-primary-foreground/70 font-medium">团体账户总余额</p>
          <p className="text-4xl font-bold text-primary-foreground mt-1">¥{account.balance.toLocaleString()}</p>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="text-[10px] text-primary-foreground/60">冻结资金</p>
              <p className="text-sm font-semibold text-primary-foreground">¥{account.frozen.toLocaleString()}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-[10px] text-primary-foreground/60">本月消费</p>
              <p className="text-sm font-semibold text-primary-foreground">¥{account.monthOut.toLocaleString()}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-[10px] text-primary-foreground/60">本月充值</p>
              <p className="text-sm font-semibold text-primary-foreground">¥{account.monthIn.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* ── Quick actions ─────────────────────────────────────────── */}
        <div className="mx-4 -mt-5 bg-card rounded-2xl shadow-sm p-4">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "充值",     icon: Plus,         color: "bg-green-100 text-green-600",  path: "/group/finance/recharge" },
              { label: "消费明细", icon: CreditCard,   color: "bg-blue-100 text-blue-600",    path: "/group/finance/records" },
              { label: "申请发票", icon: FileText,     color: "bg-purple-100 text-purple-600",path: "/group/finance/invoice" },
              { label: "资金分配", icon: Building,     color: "bg-orange-100 text-orange-600",path: "" },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => a.path && router.push(a.path)}
                className="flex flex-col items-center gap-1.5"
              >
                <div className={`h-12 w-12 rounded-2xl ${a.color} flex items-center justify-center`}>
                  <a.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] text-foreground font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Summary stats ─────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">消费概览（本月）</h3>
            <button onClick={() => router.push("/group/stats")} className="text-xs text-primary flex items-center gap-0.5">
              统计报表 <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {/* Simple bar chart */}
          <div className="space-y-2.5">
            {[
              { label: "场地费用", amount: 1560, total: 3260, color: "bg-primary" },
              { label: "课程费用", amount: 900,  total: 3260, color: "bg-blue-400" },
              { label: "活动费用", amount: 800,  total: 3260, color: "bg-purple-400" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">¥{item.amount}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${Math.round((item.amount / item.total) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sub accounts ──────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">部门子账户</h3>
            <button className="text-xs text-primary font-medium">管理</button>
          </div>
          {subAccounts.map((sub, i) => (
            <div key={sub.dept} className={`flex items-center gap-3 px-4 py-3 ${i < subAccounts.length - 1 ? "border-b border-border" : ""}`}>
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Building className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{sub.dept}</p>
                <p className="text-xs text-muted-foreground">本月消费 ¥{sub.consume}</p>
              </div>
              <span className="text-sm font-bold text-foreground">¥{sub.balance.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* ── Transaction list ──────────────────────────────────────── */}
        <div className="mx-4 mt-4">
          <div className="flex items-center justify-between px-1 mb-3">
            <h3 className="text-base font-bold text-foreground">交易记录</h3>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-3">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filterTab === tab ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {filtered.map((tx, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < filtered.length - 1 ? "border-b border-border" : ""}`}>
                <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                  tx.type === "in" ? "bg-green-100" : "bg-red-50"
                }`}>
                  {tx.type === "in"
                    ? <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    : <ArrowUpRight  className="h-5 w-5 text-red-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                  <p className="text-xs text-muted-foreground">
                    {tx.date}{tx.dept ? ` · ${tx.dept}` : ""}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${tx.type === "in" ? "text-green-600" : "text-foreground"}`}>
                    {tx.type === "in" ? "+" : ""}¥{Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground">余额 ¥{tx.balance.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recharge CTA ──────────────────────────────────────────── */}
        <div className="mx-4 mt-4">
          <button
            onClick={() => router.push("/group/finance/recharge")}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold text-sm shadow-md"
          >
            <Wallet className="h-5 w-5" />
            充值账户
          </button>
        </div>
      </div>
    </div>
  )
}
