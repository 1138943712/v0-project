"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, ChevronRight, Check, Plus, Minus, CreditCard, Calendar, Users } from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

// ── Mock data ────────────────────────────────────────────────────────────────
const venueOptions = [
  { id: "v1", name: "羽毛球馆 B区", emoji: "🏸", pricePerHour: 60, location: "A栋 2楼", courts: 6 },
  { id: "v2", name: "标准游泳池",   emoji: "🏊", pricePerHour: 90, location: "B栋 1楼", courts: 8 },
  { id: "v4", name: "综合健身房",   emoji: "💪", pricePerHour: 35, location: "A栋 3楼", courts: 1 },
]

const timeSlots = ["07:00","08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00","19:00","20:00","21:00"]

const availableDays = [
  { date: "03-20", label: "周四", day: "20" },
  { date: "03-21", label: "周五", day: "21" },
  { date: "03-22", label: "周六", day: "22" },
  { date: "03-23", label: "周日", day: "23" },
  { date: "03-24", label: "周一", day: "24" },
  { date: "03-25", label: "周二", day: "25" },
  { date: "03-26", label: "周三", day: "26" },
]

const departments = ["市场部", "技术部", "运营部", "人力资源部", "行政部", "全员"]

const STEPS = ["选择场地", "时间安排", "确认信息", "完成预约"]

// ─────────────────────────────────────────────────────────────────────────────

export function BatchBooking() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selectedVenues, setSelectedVenues] = useState<string[]>([])
  const [selectedCourts, setSelectedCourts] = useState<Record<string, number>>({})
  const [selectedDate, setSelectedDate] = useState("03-22")
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [department, setDepartment] = useState("市场部")
  const [purpose, setPurpose] = useState("")
  const [payMethod, setPayMethod] = useState("account")

  function toggleVenue(id: string) {
    setSelectedVenues((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
    if (!selectedCourts[id]) setSelectedCourts((prev) => ({ ...prev, [id]: 1 }))
  }

  function adjustCourts(id: string, delta: number) {
    const venue = venueOptions.find((v) => v.id === id)
    if (!venue) return
    setSelectedCourts((prev) => ({
      ...prev,
      [id]: Math.min(venue.courts, Math.max(1, (prev[id] ?? 1) + delta)),
    }))
  }

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    )
  }

  const totalCost = selectedVenues.reduce((sum, vId) => {
    const venue = venueOptions.find((v) => v.id === vId)
    if (!venue) return sum
    return sum + venue.pricePerHour * (selectedCourts[vId] ?? 1) * selectedSlots.length
  }, 0)

  const canNext = [
    selectedVenues.length > 0,
    selectedSlots.length > 0,
    true,
    false,
  ][step]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="批量预约" onBack={() => step === 0 ? router.back() : setStep((s) => s - 1)} />

      {/* ── Step indicator ───────────────────────────────────────────── */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step ? "bg-primary text-primary-foreground" :
                  i === step ? "bg-primary text-primary-foreground ring-2 ring-primary/30" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${i === step ? "text-primary" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-6 mb-4 transition-colors ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* ── STEP 0: Select venues ─────────────────────────────────── */}
        {step === 0 && (
          <div className="px-4 py-4 space-y-3">
            <p className="text-sm text-muted-foreground px-1">选择需要预约的场地及数量</p>
            {venueOptions.map((venue) => {
              const selected = selectedVenues.includes(venue.id)
              const courts = selectedCourts[venue.id] ?? 1
              return (
                <div key={venue.id} className={`bg-card rounded-2xl shadow-sm overflow-hidden border-2 transition-colors ${selected ? "border-primary" : "border-transparent"}`}>
                  <button
                    onClick={() => toggleVenue(venue.id)}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">
                      {venue.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-sm">{venue.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{venue.location}
                      </p>
                      <p className="text-xs text-primary font-medium mt-0.5">团体价 ¥{venue.pricePerHour}/小时/场</p>
                    </div>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      selected ? "bg-primary border-primary" : "border-border"
                    }`}>
                      {selected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                    </div>
                  </button>
                  {selected && (
                    <div className="border-t border-border px-4 py-3 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">预约场地数量</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => adjustCourts(venue.id, -1)}
                          className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-base font-bold text-foreground w-6 text-center">{courts}</span>
                        <button
                          onClick={() => adjustCourts(venue.id, 1)}
                          className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"
                        >
                          <Plus className="h-4 w-4 text-primary" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── STEP 1: Select date & time ────────────────────────────── */}
        {step === 1 && (
          <div className="px-4 py-4 space-y-4">
            {/* Date */}
            <div className="bg-card rounded-2xl shadow-sm p-4">
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> 选择日期
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {availableDays.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
                      selectedDate === d.date
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <span className="text-[10px] font-medium">{d.label}</span>
                    <span className="text-base font-bold leading-tight">{d.day}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time slots */}
            <div className="bg-card rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground">选择时段（可多选）</h3>
                <span className="text-xs text-primary font-medium">已选 {selectedSlots.length} 个</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => {
                  const sel = selectedSlots.includes(slot)
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-medium transition-all ${
                        sel ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Cost preview */}
            {selectedSlots.length > 0 && selectedVenues.length > 0 && (
              <div className="bg-primary/10 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">预计费用</span>
                  <span className="text-xl font-bold text-primary">¥{totalCost}</span>
                </div>
                <p className="text-xs text-primary/70 mt-1">
                  {selectedSlots.length} 个时段 × {selectedVenues.length} 个场馆
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Confirm info ──────────────────────────────────── */}
        {step === 2 && (
          <div className="px-4 py-4 space-y-4">
            {/* Booking summary */}
            <div className="bg-card rounded-2xl shadow-sm p-4 space-y-3">
              <h3 className="text-sm font-bold text-foreground">预约信息确认</h3>
              {selectedVenues.map((vId) => {
                const v = venueOptions.find((x) => x.id === vId)!
                return (
                  <div key={vId} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <span className="text-xl">{v.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedCourts[vId] ?? 1} 块场地</p>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      ¥{v.pricePerHour * (selectedCourts[vId] ?? 1) * selectedSlots.length}
                    </span>
                  </div>
                )
              })}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-foreground">日期</span>
                <span className="text-sm font-medium text-foreground">3月{selectedDate.split("-")[1]}日</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">时段</span>
                <span className="text-sm font-medium text-foreground">{selectedSlots.join("、")}</span>
              </div>
            </div>

            {/* Department */}
            <div className="bg-card rounded-2xl shadow-sm p-4 space-y-3">
              <h3 className="text-sm font-bold text-foreground">使用信息</h3>
              <div>
                <label className="text-xs text-muted-foreground">使用部门</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {departments.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDepartment(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        department === d
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">活动用途（选填）</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="例：部门团建、日常训练..."
                  className="mt-1.5 w-full h-10 bg-background border border-border rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-2xl shadow-sm p-4 space-y-3">
              <h3 className="text-sm font-bold text-foreground">支付方式</h3>
              {[
                { id: "account", label: "团体账户", sub: "余额 ¥28,500", icon: "💳" },
                { id: "wechat",  label: "微信支付", sub: "扫码或线上支付", icon: "📱" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${
                    payMethod === m.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    payMethod === m.id ? "bg-primary border-primary" : "border-border"
                  }`}>
                    {payMethod === m.id && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Total */}
            <div className="bg-primary/10 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-primary/70">应付总额</p>
                <p className="text-2xl font-bold text-primary">¥{totalCost}</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary/40" />
            </div>
          </div>
        )}

        {/* ── STEP 3: Success ───────────────────────────────────────── */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">预约成功！</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              您的场地预约已提交，请等待场馆确认。<br />确认后将发送通知给您。
            </p>
            <div className="mt-6 bg-card rounded-2xl shadow-sm p-4 w-full text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">预约日期</span>
                <span className="font-medium">3月{selectedDate.split("-")[1]}日</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">时段</span>
                <span className="font-medium">{selectedSlots.join("、")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">部门</span>
                <span className="font-medium">{department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">实付金额</span>
                <span className="font-bold text-primary">¥{totalCost}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6 w-full">
              <button
                onClick={() => router.push("/group/venues")}
                className="flex-1 border border-border rounded-full py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary transition-colors"
              >
                返回场地
              </button>
              <button
                onClick={() => router.push("/group/home")}
                className="flex-1 bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                回到首页
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom action ─────────────────────────────────────────────── */}
      {step < 3 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3">
          <button
            onClick={() => {
              if (step === 2) setStep(3)
              else setStep((s) => s + 1)
            }}
            disabled={!canNext}
            className="w-full bg-primary text-primary-foreground rounded-full py-3.5 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            {step === 2 ? "确认支付" : "下一步"}
            {step < 2 && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  )
}
