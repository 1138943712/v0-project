"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, ChevronRight, Plus, Clock, Users, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

// ── Mock data ────────────────────────────────────────────────────────────────
const venueTypes = [
  { id: "all",      label: "全部" },
  { id: "badminton",label: "羽毛球" },
  { id: "swim",     label: "游泳" },
  { id: "basket",   label: "篮球" },
  { id: "gym",      label: "健身房" },
  { id: "tennis",   label: "网球" },
]

const venueStats = [
  { label: "本周预约", value: "12场", color: "text-primary" },
  { label: "待审批",   value: "3场",  color: "text-orange-500" },
  { label: "本月消费", value: "¥2,160", color: "text-foreground" },
  { label: "固定场地", value: "2块",  color: "text-primary" },
]

const venues = [
  {
    id: "v1",
    name: "羽毛球馆 B区",
    type: "badminton",
    location: "A栋 2楼",
    pricePerHour: 80,
    memberPrice: 60,
    status: "available",
    todaySlots: [
      { time: "09:00", available: true },
      { time: "10:00", available: false },
      { time: "11:00", available: false },
      { time: "14:00", available: true },
      { time: "15:00", available: true },
      { time: "16:00", available: true },
    ],
    courts: 6,
  },
  {
    id: "v2",
    name: "标准游泳池",
    type: "swim",
    location: "B栋 1楼",
    pricePerHour: 120,
    memberPrice: 90,
    status: "available",
    todaySlots: [
      { time: "08:00", available: true },
      { time: "09:00", available: true },
      { time: "10:00", available: false },
      { time: "14:00", available: true },
      { time: "15:00", available: false },
      { time: "16:00", available: true },
    ],
    courts: 8,
  },
  {
    id: "v3",
    name: "篮球场 C区",
    type: "basket",
    location: "C栋 1楼",
    pricePerHour: 100,
    memberPrice: 75,
    status: "maintenance",
    todaySlots: [],
    courts: 2,
  },
  {
    id: "v4",
    name: "综合健身房",
    type: "gym",
    location: "A栋 3楼",
    pricePerHour: 50,
    memberPrice: 35,
    status: "available",
    todaySlots: [
      { time: "07:00", available: true },
      { time: "08:00", available: true },
      { time: "09:00", available: true },
      { time: "14:00", available: true },
      { time: "17:00", available: true },
      { time: "19:00", available: true },
    ],
    courts: 1,
  },
]

const bookingRecords = [
  {
    id: "b1",
    venueName: "羽毛球馆 B-3、B-4",
    date: "03月22日",
    time: "09:00 – 11:00",
    courts: 2,
    totalCost: 240,
    status: "confirmed",
    department: "市场部",
  },
  {
    id: "b2",
    venueName: "标准游泳池",
    date: "03月25日",
    time: "14:00 – 16:00",
    courts: 1,
    totalCost: 180,
    status: "pending",
    department: "技术部",
  },
  {
    id: "b3",
    venueName: "综合健身房",
    date: "03月20日",
    time: "07:00 – 09:00",
    courts: 1,
    totalCost: 70,
    status: "completed",
    department: "全员",
  },
]

const bookingStatusStyle: Record<string, { label: string; badge: string; icon: typeof CheckCircle2 }> = {
  confirmed: { label: "已确认", badge: "bg-primary/10 text-primary",     icon: CheckCircle2 },
  pending:   { label: "待审批", badge: "bg-orange-50 text-orange-500",   icon: AlertCircle },
  completed: { label: "已完成", badge: "bg-secondary text-muted-foreground", icon: CheckCircle2 },
}

const typeEmoji: Record<string, string> = {
  badminton: "🏸",
  swim:      "🏊",
  basket:    "🏀",
  gym:       "💪",
  tennis:    "🎾",
}

// ─────────────────────────────────────────────────────────────────────────────

export function VenuesOverview() {
  const router = useRouter()
  const [activeType, setActiveType] = useState("all")

  const filtered = activeType === "all"
    ? venues
    : venues.filter((v) => v.type === activeType)

  return (
    <div className="px-4 py-4 pb-24 space-y-5">

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-border">
          {venueStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-4 px-1">
              <span className={`text-lg font-bold leading-none ${s.color}`}>{s.value}</span>
              <span className="text-[10px] text-muted-foreground mt-1.5 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Type filter ──────────────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {venueTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              activeType === t.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Venue cards ──────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {filtered.map((venue) => (
          <div key={venue.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">
                {typeEmoji[venue.type] ?? "🏟"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-foreground text-sm">{venue.name}</p>
                  {venue.status === "maintenance" ? (
                    <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">维护中</span>
                  ) : (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">可预约</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" />{venue.location}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <Users className="h-3 w-3" />{venue.courts}块场地
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-primary">¥{venue.memberPrice}<span className="text-[10px] font-normal text-muted-foreground">/小时</span></p>
                <p className="text-[10px] text-muted-foreground">团体价</p>
              </div>
            </div>

            {/* Time slots */}
            {venue.status !== "maintenance" && venue.todaySlots.length > 0 && (
              <div className="px-4 pb-4">
                <p className="text-[11px] text-muted-foreground mb-2 font-medium">今日可用时段</p>
                <div className="flex flex-wrap gap-1.5">
                  {venue.todaySlots.map((slot) => (
                    <span
                      key={slot.time}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                        slot.available
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground line-through"
                      }`}
                    >
                      {slot.time}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {venue.status === "maintenance" && (
              <div className="px-4 pb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <XCircle className="h-4 w-4 text-red-400" />
                <span>今日维护，暂停开放</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="border-t border-border flex divide-x divide-border">
              <button
                onClick={() => router.push(`/group/venue/${venue.id}`)}
                className="flex-1 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                查看详情
              </button>
              <button
                disabled={venue.status === "maintenance"}
                onClick={() => router.push(`/group/batch-booking?venueId=${venue.id}`)}
                className="flex-1 py-3 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                批量预约
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Booking records ───────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-foreground">预约记录</h2>
          <button className="text-sm text-primary flex items-center gap-0.5">
            查看全部 <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {bookingRecords.map((rec, index) => {
            const st = bookingStatusStyle[rec.status] ?? bookingStatusStyle.completed
            return (
              <div
                key={rec.id}
                className={`px-4 py-4 flex items-start gap-3 ${
                  index < bookingRecords.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{rec.venueName}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${st.badge}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {rec.date} {rec.time}
                    </span>
                    <span>{rec.department}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">¥{rec.totalCost}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Batch booking CTA ────────────────────────────────────────────── */}
      <button
        onClick={() => router.push("/group/batch-booking")}
        className="w-full bg-primary text-primary-foreground rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold text-sm shadow-md active:scale-[0.98] transition-transform"
      >
        <Plus className="h-5 w-5" />
        新建批量预约
      </button>

    </div>
  )
}
