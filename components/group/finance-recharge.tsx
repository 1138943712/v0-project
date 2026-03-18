"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, CreditCard, Banknote } from "lucide-react"
import { GroupDetailHeader } from "@/components/group/detail-header"

const presets = [500, 1000, 2000, 5000, 10000, 20000]

export function FinanceRecharge() {
  const router = useRouter()
  const [selected, setSelected] = useState<number | null>(1000)
  const [custom, setCustom] = useState("")
  const [payMethod, setPayMethod] = useState("wechat")
  const [done, setDone] = useState(false)

  const amount = custom ? Number(custom) : (selected ?? 0)

  if (done) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <GroupDetailHeader title="账户充值" onBack={() => router.back()} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">充值成功</h2>
          <p className="text-sm text-muted-foreground mt-2">¥{amount.toLocaleString()} 已存入团体账户</p>
          <div className="mt-6 bg-card rounded-2xl shadow-sm p-4 w-full text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">充值金额</span>
              <span className="font-bold text-primary">¥{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">充值后余额</span>
              <span className="font-medium text-foreground">¥{(28500 + amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">支付方式</span>
              <span className="font-medium text-foreground">{payMethod === "wechat" ? "微信支付" : "银行转账"}</span>
            </div>
          </div>
          <button
            onClick={() => router.push("/group/finance")}
            className="mt-6 w-full bg-primary text-primary-foreground rounded-full py-3.5 font-semibold text-sm"
          >
            返回财务管理
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="账户充值" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-28 px-4 py-4 space-y-4">
        {/* Balance */}
        <div className="bg-primary/10 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-primary/70 font-medium">当前余额</p>
            <p className="text-2xl font-bold text-primary mt-0.5">¥28,500</p>
          </div>
          <Banknote className="h-8 w-8 text-primary/40" />
        </div>

        {/* Preset amounts */}
        <div className="bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">选择充值金额</h3>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => { setSelected(p); setCustom("") }}
                className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                  selected === p && !custom
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground"
                }`}
              >
                ¥{p.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <label className="text-xs text-muted-foreground">自定义金额</label>
            <div className="relative mt-1.5">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">¥</span>
              <input
                type="number"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
                placeholder="输入充值金额"
                className="w-full h-12 bg-background border border-border rounded-xl pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-2xl shadow-sm p-4 space-y-3">
          <h3 className="text-sm font-bold text-foreground">支付方式</h3>
          {[
            { id: "wechat",   label: "微信支付",  sub: "扫码快速完成支付", icon: "📱" },
            { id: "transfer", label: "银行转账",  sub: "企业对公账户转账", icon: "🏦" },
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

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center px-4">
          充值金额将即时到账团体账户，支持申请发票
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">充值金额</span>
          <span className="text-xl font-bold text-primary">{amount ? `¥${amount.toLocaleString()}` : "请选择金额"}</span>
        </div>
        <button
          disabled={!amount}
          onClick={() => setDone(true)}
          className="w-full bg-primary text-primary-foreground rounded-full py-3.5 font-bold text-sm disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          立即充值
        </button>
      </div>
    </div>
  )
}
