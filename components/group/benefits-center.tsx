"use client"

import { useRouter } from "next/navigation"
import { Star, Gift, Zap, ChevronRight, Clock } from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

const exclusiveOffers = [
  { title: "场地预约9折优惠",  sub: "全场地团体专属折扣",  valid: "长期有效",  badge: "专属优惠", hot: true },
  { title: "免费教练指导课",   sub: "每月2节免费私教课时",  valid: "每月刷新",  badge: "免费福利", hot: false },
  { title: "优先报名特权",     sub: "活动报名提前24小时开放",valid: "长期有效", badge: "专属权益", hot: true },
  { title: "高峰时段专属预约", sub: "节假日优先选位权",     valid: "长期有效",  badge: "专属权益", hot: false },
]

const welfarePackages = [
  {
    id: "wp1", name: "月度健身包", price: 299, originalPrice: 399,
    desc: "每月场地使用×8次 + 团体课×4节", count: 5, valid: "30天",
  },
  {
    id: "wp2", name: "季度运动畅享包", price: 799, originalPrice: 1199,
    desc: "无限次场地预约 + 私教课×6节 + 营养咨询×2次", count: 3, valid: "90天",
  },
  {
    id: "wp3", name: "年度VIP套餐", price: 2999, originalPrice: 4800,
    desc: "年度无限场地 + 专属储物柜 + 明星教练专项课×12节", count: 2, valid: "365天",
  },
]

const privileges = [
  { icon: "🎾", title: "专属场地使用", desc: "B区 4号羽毛球场长期保留给本团体", tag: "场地特权" },
  { icon: "⭐", title: "明星教练预约", desc: "可优先预约场馆王教练（羽毛球国家一级教练）", tag: "教练特权" },
  { icon: "🎉", title: "场馆专属活动邀请", desc: "VIP开幕式、节假日精品活动优先邀请", tag: "活动特权" },
  { icon: "🔧", title: "器材优先维护", desc: "所用器材优先检测维修，专属器材柜", tag: "服务特权" },
]

export function BenefitsCenter() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="团体福利" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div className="bg-primary px-4 pt-5 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">VIP 团体权益</p>
              <p className="text-xs text-white/70">远航体育俱乐部 · 高级会员</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "已享优惠", value: "¥1,280" },
              { label: "福利包",   value: "3个" },
              { label: "积分",     value: "1,280" },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 rounded-xl py-3 text-center">
                <p className="text-sm font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-white/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Exclusive offers ──────────────────────────────────────── */}
        <div className="mx-4 mt-4">
          <p className="text-sm font-bold text-foreground px-1 mb-3">专属优惠</p>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {exclusiveOffers.map((offer, i) => (
              <button
                key={offer.title}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-secondary/50 text-left ${i < exclusiveOffers.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="h-10 w-10 rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-foreground">{offer.title}</p>
                    {offer.hot && (
                      <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                        <Zap className="h-2.5 w-2.5" />热门
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{offer.sub}</p>
                  <p className="text-[10px] text-primary font-medium mt-0.5 flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />{offer.valid}
                  </p>
                </div>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-medium shrink-0">
                  {offer.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Welfare packages ──────────────────────────────────────── */}
        <div className="mx-4 mt-4">
          <p className="text-sm font-bold text-foreground px-1 mb-3">福利包</p>
          <div className="space-y-3">
            {welfarePackages.map((pkg) => (
              <div key={pkg.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 pt-4 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{pkg.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{pkg.desc}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          有效期 {pkg.valid}
                        </span>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          剩余 {pkg.count} 个
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-primary">¥{pkg.price}</p>
                      <p className="text-xs text-muted-foreground line-through">¥{pkg.originalPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border flex divide-x divide-border">
                  <button className="flex-1 py-3 text-xs text-muted-foreground hover:bg-secondary transition-colors">
                    分配给成员
                  </button>
                  <button className="flex-1 py-3 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors">
                    购买福利包
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Special privileges ────────────────────────────────────── */}
        <div className="mx-4 mt-4">
          <p className="text-sm font-bold text-foreground px-1 mb-3">专属特权</p>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {privileges.map((p, i) => (
              <div key={p.title} className={`flex items-start gap-3 px-4 py-4 ${i < privileges.length - 1 ? "border-b border-border" : ""}`}>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-xl">
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{p.title}</p>
                    <span className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full shrink-0">
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Points entry ──────────────────────────────────────────── */}
        <div className="mx-4 mt-4">
          <button
            onClick={() => router.push("/group/points")}
            className="w-full bg-card rounded-2xl shadow-sm border border-border p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
          >
            <div className="h-12 w-12 rounded-2xl bg-yellow-50 flex items-center justify-center shrink-0">
              <Gift className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-foreground">积分中心</p>
              <p className="text-xs text-muted-foreground mt-0.5">当前积分 1,280 · 可兑换多种奖励</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
