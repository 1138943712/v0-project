"use client"

import { useEffect, useState } from "react"
import { MapPin, Phone } from "lucide-react"
import { getGymDetail, addBaseUrl, type Dept } from "@/lib/api"

const STATUS_TEXT: Record<number, string> = { 1: "营业中", 0: "暂停营业" }
const STATUS_COLOR: Record<number, string> = { 1: "#FEAB58", 0: "#ff4d4f" }

interface GymCardProps {
  onDeptDetail?: (dept: Dept) => void
}

export function GymCard({ onDeptDetail }: GymCardProps) {
  const [detail, setDetail] = useState<Dept | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("selectedGym")
    if (!raw) return
    try {
      const gym = JSON.parse(raw)
      if (!gym?.id) return
      getGymDetail(gym.id).then((res) => {
        setDetail(res)
        onDeptDetail?.(res)
      }).catch(console.error)
    } catch {
      // ignore parse error
    }
  }, [])

  const handleCall = () => {
    if (detail?.phone) {
      window.location.href = `tel:${detail.phone}`
    }
  }

  const statusColor = STATUS_COLOR[detail?.status ?? -1] ?? "#999"
  const statusText = STATUS_TEXT[detail?.status ?? -1] ?? ""

  return (
    <div className="bg-card rounded-2xl shadow-sm p-4 space-y-3">
      {/* Head */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0">
          {detail?.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={addBaseUrl(detail.logo)} alt="logo" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs font-bold text-muted-foreground">GYM</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-foreground truncate">
            {detail?.deptName ?? "—"}
          </p>
          {statusText && (
            <p className="text-xs mt-0.5" style={{ color: statusColor }}>
              <span className="font-semibold">{statusText}</span>
              {detail?.openTime && (
                <span className="text-muted-foreground ml-1">{detail.openTime}</span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-border" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-1 flex-1 min-w-0 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span className="truncate">{detail?.address ?? "—"}</span>
        </div>
        <button
          onClick={handleCall}
          className="ml-3 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          <Phone className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
