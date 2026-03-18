"use client"

import { useRouter } from "next/navigation"
import {
  MapPin, Clock, Users, Star, CheckCircle2, XCircle, ChevronRight,
  Wifi, Wind, ShowerHead, Bike,
} from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

// ── Mock ──────────────────────────────────────────────────────────────────────
const venueMap: Record<string, {
  id: string; name: string; type: string; emoji: string; location: string;
  courts: number; pricePerHour: number; memberPrice: number; status: string;
  rating: number; reviewCount: number; openHours: string; maxCapacity: number;
  facilities: string[]; rules: string[]; description: string;
  slots: { time: string; available: boolean }[];
  recentBookings: { dept: string; date: string; duration: string }[];
}> = {
  "v1": {
    id: "v1", name: "羽毛球馆 B区", type: "badminton", emoji: "🏸",
    location: "A栋 2楼 东侧", courts: 6, pricePerHour: 80, memberPrice: 60,
    status: "available", rating: 4.8, reviewCount: 236, openHours: "07:00 – 22:00",
    maxCapacity: 24,
    facilities: ["更衣室", "空调", "热水澡", "存物柜"],
    rules: ["请提前10分钟入场", "场地内请穿专用运动鞋", "使用后请归还器材", "禁止携带饮食入场"],
    description: "配备专业羽毛球地板，灯光照明达到国际赛事标准。场地宽敞明亮，配有空调和通风系统，提供球拍租借服务。",
    slots: [
      { time: "07:00", available: true }, { time: "08:00", available: true },
      { time: "09:00", available: false }, { time: "10:00", available: false },
      { time: "11:00", available: true }, { time: "14:00", available: true },
      { time: "15:00", available: true }, { time: "16:00", available: false },
      { time: "17:00", available: true }, { time: "19:00", available: true },
      { time: "20:00", available: true }, { time: "21:00", available: false },
    ],
    recentBookings: [
      { dept: "市场部", date: "03月18日", duration: "09:00 – 11:00" },
      { dept: "技术部", date: "03月15日", duration: "14:00 – 16:00" },
      { dept: "行政部", date: "03月12日", duration: "19:00 – 21:00" },
    ],
  },
  "v2": {
    id: "v2", name: "标准游泳池", type: "swim", emoji: "🏊",
    location: "B栋 1楼", courts: 8, pricePerHour: 120, memberPrice: 90,
    status: "available", rating: 4.9, reviewCount: 312, openHours: "06:00 – 22:00",
    maxCapacity: 40,
    facilities: ["更衣室", "热水澡", "泳帽租借", "救生员"],
    rules: ["须凭证件入场", "请穿专业泳衣", "禁止跳水", "请听从救生员指引"],
    description: "国际标准50米泳道，水质符合国家饮用水标准。配备专业救生员，提供游泳课程。拥有独立儿童浅水区。",
    slots: [
      { time: "06:00", available: true }, { time: "07:00", available: true },
      { time: "08:00", available: true }, { time: "09:00", available: false },
      { time: "10:00", available: false }, { time: "14:00", available: true },
      { time: "15:00", available: false }, { time: "16:00", available: true },
      { time: "19:00", available: true }, { time: "20:00", available: true },
    ],
    recentBookings: [
      { dept: "全员", date: "03月20日", duration: "07:00 – 09:00" },
    ],
  },
  "v4": {
    id: "v4", name: "综合健身房", type: "gym", emoji: "💪",
    location: "A栋 3楼", courts: 1, pricePerHour: 50, memberPrice: 35,
    status: "available", rating: 4.7, reviewCount: 189, openHours: "06:00 – 23:00",
    maxCapacity: 60,
    facilities: ["更衣室", "热水澡", "毛巾", "饮水机"],
    rules: ["请归还使用后的器械", "请携带毛巾", "禁止大声喧哗", "未满16岁须监护人陪同"],
    description: "2000㎡综合健身区，设有有氧区、力量区、拉伸区和团体课区。配备国际品牌健身器械，每日提供团体课程。",
    slots: [
      { time: "06:00", available: true }, { time: "07:00", available: true },
      { time: "08:00", available: true }, { time: "09:00", available: true },
      { time: "10:00", available: true }, { time: "14:00", available: true },
      { time: "17:00", available: true }, { time: "18:00", available: false },
      { time: "19:00", available: true }, { time: "20:00", available: true },
    ],
    recentBookings: [],
  },
}

const facilityIcon: Record<string, typeof Wifi> = {
  "更衣室": ShowerHead, "空调": Wind, "热水澡": ShowerHead,
  "Wifi": Wifi, "存物柜": Bike,
}

// ─────────────────────────────────────────────────────────────────────────────

export function VenueDetail({ venueId }: { venueId: string }) {
  const router = useRouter()
  const venue = venueMap[venueId] ?? venueMap["v1"]

  const availableCount = venue.slots.filter((s) => s.available).length

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="场地详情" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-28">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="bg-primary px-4 pt-5 pb-8">
          <div className="text-4xl mb-3">{venue.emoji}</div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${
              venue.status === "available" ? "bg-white/20 text-white" : "bg-red-200 text-red-700"
            }`}>
              {venue.status === "available" ? "开放中" : "维护中"}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{venue.name}</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{venue.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{venue.openHours}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-3.5 w-3.5 text-yellow-300 fill-yellow-300" />
            <span className="text-sm font-bold text-white">{venue.rating}</span>
            <span className="text-xs text-white/70">({venue.reviewCount}条评价)</span>
          </div>
        </div>

        {/* ── Price card ───────────────────────────────────────────────── */}
        <div className="mx-4 -mt-4 bg-card rounded-2xl shadow-sm p-4 grid grid-cols-3 divide-x divide-border">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-primary">¥{venue.memberPrice}<span className="text-xs font-normal text-muted-foreground">/h</span></span>
            <span className="text-[10px] text-muted-foreground mt-0.5">团体价</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{venue.courts}块</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">可用场地</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{venue.maxCapacity}人</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">最大容量</span>
          </div>
        </div>

        {/* ── Today slots ──────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">今日可用时段</h3>
            <span className="text-xs text-primary font-medium">{availableCount} 个时段可约</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {venue.slots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  slot.available
                    ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                    : "bg-secondary text-muted-foreground line-through cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* ── Description ──────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-2">场地介绍</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{venue.description}</p>
        </div>

        {/* ── Facilities ───────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">配套设施</h3>
          <div className="flex flex-wrap gap-2">
            {venue.facilities.map((f) => (
              <span key={f} className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-medium">
                <CheckCircle2 className="h-3 w-3" />{f}
              </span>
            ))}
          </div>
        </div>

        {/* ── Rules ────────────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">使用须知</h3>
          <div className="space-y-2">
            {venue.rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="h-5 w-5 rounded-full bg-secondary text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent bookings by org ────────────────────────────────────── */}
        {venue.recentBookings.length > 0 && (
          <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">本团近期预约记录</h3>
            </div>
            {venue.recentBookings.map((rec, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 ${i < venue.recentBookings.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{rec.dept}</p>
                  <p className="text-xs text-muted-foreground">{rec.date} · {rec.duration}</p>
                </div>
                <span className="text-xs text-primary font-medium">¥{venue.memberPrice * 2}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom actions ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3 flex gap-3">
        <button
          onClick={() => router.push("/group/venues")}
          className="flex-1 border border-primary text-primary rounded-full py-3 text-sm font-semibold hover:bg-primary/5 transition-colors"
        >
          查看其他场地
        </button>
        <button
          onClick={() => router.push(`/group/batch-booking?venueId=${venue.id}`)}
          className="flex-1 bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          立即预约
        </button>
      </div>
    </div>
  )
}
