"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, ChevronRight, Check, Plus, Eye, EyeOff } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GroupDetailHeader } from "@/components/group/detail-header"

const admins = [
  {
    id: "m1", name: "张伟", avatar: "张", dept: "市场部", role: "主管理员",
    permissions: ["场地管理", "成员管理", "活动管理", "财务管理", "数据统计", "系统设置"],
    lastLogin: "今天 09:32",
  },
  {
    id: "m4", name: "赵丽", avatar: "赵", dept: "人力资源部", role: "子管理员",
    permissions: ["成员管理", "活动管理", "数据统计"],
    lastLogin: "今天 08:15",
  },
  {
    id: "m6", name: "陈敏", avatar: "陈", dept: "行政部", role: "子管理员",
    permissions: ["场地管理", "活动管理"],
    lastLogin: "昨天 17:40",
  },
]

const allPermissions = [
  { id: "venue",   label: "场地管理",   desc: "预约、查看场地信息" },
  { id: "member",  label: "成员管理",   desc: "添加、移除、设置成员" },
  { id: "activity",label: "活动管理",   desc: "创建、管理活动" },
  { id: "finance", label: "财务管理",   desc: "查看账户、充值、发票" },
  { id: "stats",   label: "数据统计",   desc: "查看统计报表" },
  { id: "system",  label: "系统设置",   desc: "通知、偏好等系统配置" },
]

const avatarBg = ["bg-blue-400", "bg-green-400", "bg-purple-400"]

export function AdminSettings() {
  const router = useRouter()
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null)
  const [editPerms, setEditPerms] = useState<string[]>([])

  function openEdit(admin: typeof admins[number]) {
    setSelectedAdmin(admin.id)
    setEditPerms([...admin.permissions])
  }

  function togglePerm(perm: string) {
    setEditPerms((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    )
  }

  if (selectedAdmin) {
    const admin = admins.find((a) => a.id === selectedAdmin)!
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <GroupDetailHeader title="编辑权限" onBack={() => setSelectedAdmin(null)} />
        <div className="flex-1 overflow-y-auto pb-28 px-4 py-4 space-y-4">
          <div className="bg-card rounded-2xl shadow-sm p-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={`${avatarBg[admins.indexOf(admin) % avatarBg.length]} text-white font-bold`}>
                {admin.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold text-foreground">{admin.name}</p>
              <p className="text-xs text-muted-foreground">{admin.dept} · {admin.role}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium px-1 mb-2">权限配置</p>
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {allPermissions.map((perm, i) => {
                const hasIt = editPerms.includes(perm.label)
                const disabled = admin.role === "主管理员"
                return (
                  <button
                    key={perm.id}
                    disabled={disabled}
                    onClick={() => togglePerm(perm.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < allPermissions.length - 1 ? "border-b border-border" : ""} ${disabled ? "opacity-60" : "hover:bg-secondary/50"} transition-colors`}
                  >
                    <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-colors ${hasIt ? "bg-primary border-primary" : "border-border"}`}>
                      {hasIt && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{perm.label}</p>
                      <p className="text-xs text-muted-foreground">{perm.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border px-4 py-3 flex gap-3">
          <button
            onClick={() => setSelectedAdmin(null)}
            className="flex-1 border border-border rounded-full py-3 text-sm text-muted-foreground"
          >
            取消
          </button>
          <button
            onClick={() => setSelectedAdmin(null)}
            className="flex-1 bg-primary text-primary-foreground rounded-full py-3 text-sm font-bold"
          >
            保存权限
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader title="管理员设置" onBack={() => router.back()} />

      <div className="flex-1 overflow-y-auto pb-8 px-4 py-4 space-y-4">
        {/* ── Admin list ────────────────────────────────────────────── */}
        <div>
          <p className="text-xs text-muted-foreground font-medium px-1 mb-2">管理员列表</p>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {admins.map((admin, i) => (
              <div key={admin.id} className={`px-4 py-4 ${i < admins.length - 1 ? "border-b border-border" : ""}`}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className={`${avatarBg[i % avatarBg.length]} text-white font-bold`}>
                      {admin.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{admin.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${admin.role === "主管理员" ? "bg-yellow-50 text-yellow-600" : "bg-secondary text-muted-foreground"}`}>
                        {admin.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{admin.dept} · 上次登录 {admin.lastLogin}</p>
                  </div>
                  <button
                    onClick={() => openEdit(admin)}
                    className="text-xs text-primary font-medium px-3 py-1.5 bg-primary/10 rounded-full"
                  >
                    权限
                  </button>
                </div>
                {/* Permissions preview */}
                <div className="flex flex-wrap gap-1.5 mt-2.5 ml-13">
                  {admin.permissions.map((p) => (
                    <span key={p} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Add admin ─────────────────────────────────────────────── */}
        <button className="w-full border border-dashed border-primary text-primary rounded-2xl py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
          <Plus className="h-4 w-4" />
          添加子管理员
        </button>

        {/* ── Security settings ─────────────────────────────────────── */}
        <div>
          <p className="text-xs text-muted-foreground font-medium px-1 mb-2">安全设置</p>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {[
              { label: "双因素认证",     sub: "管理员登录需二次验证",  enabled: true },
              { label: "操作日志",       sub: "记录所有管理员操作记录", enabled: true },
              { label: "敏感操作审批",   sub: "财务操作需主管理员审批", enabled: true },
            ].map((item, i) => (
              <div key={item.label} className={`flex items-center justify-between px-4 py-3.5 ${i < 2 ? "border-b border-border" : ""}`}>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.enabled ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                    {item.enabled ? "已开启" : "已关闭"}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Operation log ─────────────────────────────────────────── */}
        <div>
          <p className="text-xs text-muted-foreground font-medium px-1 mb-2">最近操作日志</p>
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {[
              { admin: "张伟",  action: "批量预约场地 B-3、B-4", time: "今天 09:30" },
              { admin: "赵丽",  action: "添加新成员 周杰",       time: "今天 08:20" },
              { admin: "陈敏",  action: "创建活动：羽毛球联赛",  time: "03月18日 16:00" },
            ].map((log, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < 2 ? "border-b border-border" : ""}`}>
                <Shield className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-foreground"><span className="font-semibold">{log.admin}</span> {log.action}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
