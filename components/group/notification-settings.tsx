"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GroupDetailHeader } from "@/components/group/detail-header"

type ToggleItem = { id: string; label: string; sub: string; on: boolean }

const initSections: { title: string; items: ToggleItem[] }[] = [
  {
    title: "财务通知",
    items: [
      { id: "t1", label: "充值成功通知",   sub: "账户充值到账时通知",       on: true },
      { id: "t2", label: "大额消费提醒",   sub: "单次消费超过500元时提醒",  on: true },
      { id: "t3", label: "余额不足提醒",   sub: "余额低于1000元时提醒",    on: true },
      { id: "t4", label: "发票开具通知",   sub: "发票状态变更时通知",       on: false },
    ],
  },
  {
    title: "活动通知",
    items: [
      { id: "t5", label: "新活动开放报名", sub: "有新活动可参与时通知",     on: true },
      { id: "t6", label: "活动变更通知",   sub: "活动时间/地点修改时通知",  on: true },
      { id: "t7", label: "报名截止提醒",   sub: "报名截止前24小时提醒",    on: false },
      { id: "t8", label: "签到开始提醒",   sub: "活动开始前30分钟提醒",    on: true },
    ],
  },
  {
    title: "场地通知",
    items: [
      { id: "t9",  label: "预约确认通知", sub: "场地预约审核结果通知",      on: true },
      { id: "t10", label: "预约即将开始", sub: "预约场地前1小时提醒",       on: true },
      { id: "t11", label: "场地维护通知", sub: "所收藏场地维护公告",         on: false },
    ],
  },
  {
    title: "系统通知",
    items: [
      { id: "t12", label: "场馆重要公告", sub: "场馆政策/规则变更通知",     on: true },
      { id: "t13", label: "功能更新通知", sub: "小程序功能更新提醒",         on: false },
      { id: "t14", label: "账号安全提醒", sub: "异常登录/操作安全提醒",     on: true },
    ],
  },
]

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  )
}

export function NotificationSettings() {
  const router = useRouter()
  const [sections, setSections] = useState(initSections)

  function toggle(itemId: string) {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        items: sec.items.map((item) =>
          item.id === itemId ? { ...item, on: !item.on } : item
        ),
      }))
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="通知设置" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-8 px-4 py-4 space-y-4">
        {/* ── Receive method ────────────────────────────────────────── */}
        <div className="bg-card rounded-2xl shadow-sm p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">接收方式</h3>
          {[
            { label: "微信服务通知", sub: "通过微信消息模板推送",    id: "wx",   on: true },
            { label: "短信通知",     sub: "重要事项发送短信提醒",    id: "sms",  on: false },
          ].map((m, i) => (
            <div key={m.id} className={`flex items-center justify-between py-3 ${i < 1 ? "border-b border-border" : ""}`}>
              <div>
                <p className="text-sm font-semibold text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>
              </div>
              <Toggle on={m.on} onChange={() => {}} />
            </div>
          ))}
        </div>

        {/* ── Quiet hours ───────────────────────────────────────────── */}
        <div className="bg-card rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">免打扰时间</p>
              <p className="text-xs text-muted-foreground mt-0.5">22:00 – 08:00</p>
            </div>
            <Toggle on={true} onChange={() => {}} />
          </div>
        </div>

        {/* ── Notification sections ─────────────────────────────────── */}
        {sections.map((sec) => (
          <div key={sec.title}>
            <p className="text-xs text-muted-foreground font-medium px-1 mb-2">{sec.title}</p>
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {sec.items.map((item, i) => (
                <div key={item.id} className={`flex items-center justify-between px-4 py-3.5 ${i < sec.items.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                  <Toggle on={item.on} onChange={() => toggle(item.id)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
