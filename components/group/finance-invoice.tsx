"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Plus, Clock, CheckCircle2, XCircle } from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

const invoices = [
  { id: "INV-2024-031", amount: 3260, type: "增值税专用发票", date: "03月19日", status: "issued",   title: "远航体育俱乐部" },
  { id: "INV-2024-028", amount: 5000, type: "增值税普通发票", date: "03月05日", status: "pending",  title: "远航体育俱乐部" },
  { id: "INV-2024-022", amount: 2800, type: "增值税专用发票", date: "02月18日", status: "issued",   title: "远航体育俱乐部" },
  { id: "INV-2024-016", amount: 1500, type: "增值税普通发票", date: "01月30日", status: "issued",   title: "远航体育俱乐部" },
]

const statusStyle: Record<string, { label: string; badge: string; icon: typeof CheckCircle2 }> = {
  issued:  { label: "已开具", badge: "bg-primary/10 text-primary",          icon: CheckCircle2 },
  pending: { label: "开具中", badge: "bg-orange-50 text-orange-500",         icon: Clock },
  failed:  { label: "开具失败",badge: "bg-red-50 text-red-500",              icon: XCircle },
}

export function FinanceInvoice() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [invoiceType, setInvoiceType] = useState("vat_special")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="发票管理" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-8 px-4 py-4 space-y-4">
        {/* ── Invoice info card ──────────────────────────────────────── */}
        <div className="bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">发票抬头信息</h3>
          {[
            { label: "单位名称", value: "远航体育俱乐部" },
            { label: "税号",     value: "91310000MA1G5X9Y3Q" },
            { label: "地址",     value: "上海市浦东新区张江高科技园区" },
            { label: "电话",     value: "021-6888****" },
            { label: "开户行",   value: "中国银行张江支行" },
          ].map((row, i) => (
            <div key={row.label} className={`flex items-start gap-2 py-2 ${i < 4 ? "border-b border-border" : ""}`}>
              <span className="text-xs text-muted-foreground w-16 shrink-0 mt-0.5">{row.label}</span>
              <span className="text-xs text-foreground flex-1">{row.value}</span>
            </div>
          ))}
          <button className="mt-3 w-full text-center text-xs text-primary font-medium py-1">
            修改发票信息
          </button>
        </div>

        {/* ── Apply invoice ──────────────────────────────────────────── */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold text-sm shadow-md"
          >
            <Plus className="h-5 w-5" />
            申请开具发票
          </button>
        ) : (
          <div className="bg-card rounded-2xl shadow-sm p-4 space-y-4">
            <h3 className="text-sm font-bold text-foreground">申请新发票</h3>
            <div>
              <label className="text-xs text-muted-foreground">发票类型</label>
              <div className="flex gap-2 mt-1.5">
                {[
                  { id: "vat_special", label: "增值税专用发票" },
                  { id: "vat_normal",  label: "增值税普通发票" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setInvoiceType(t.id)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border-2 transition-colors ${
                      invoiceType === t.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">开票金额</label>
              <select className="mt-1.5 w-full h-10 bg-background border border-border rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>¥3,260（本月消费总额）</option>
                <option>¥5,000（03月充值）</option>
                <option>自定义金额</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">接收邮箱</label>
              <input
                type="email"
                placeholder="输入接收电子发票的邮箱"
                className="mt-1.5 w-full h-10 bg-background border border-border rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-border rounded-full py-3 text-sm text-muted-foreground"
              >
                取消
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-primary text-primary-foreground rounded-full py-3 text-sm font-semibold"
              >
                提交申请
              </button>
            </div>
          </div>
        )}

        {/* ── Invoice list ──────────────────────────────────────────── */}
        <div>
          <p className="text-sm font-bold text-foreground px-1 mb-3">历史发票记录</p>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {invoices.map((inv, i) => {
              const st = statusStyle[inv.status] ?? statusStyle.pending
              return (
                <div key={inv.id} className={`px-4 py-4 flex items-start gap-3 ${i < invoices.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{inv.type}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${st.badge}`}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{inv.id} · {inv.date}</p>
                    <p className="text-xs text-muted-foreground">{inv.title}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">¥{inv.amount.toLocaleString()}</p>
                    {inv.status === "issued" && (
                      <button className="text-[10px] text-primary mt-1">下载</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
