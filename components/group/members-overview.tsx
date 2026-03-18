"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, ChevronRight, UserCheck, UserX, Shield, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ── Mock data ────────────────────────────────────────────────────────────────
const memberStats = [
  { label: "总人数", value: "68人", color: "text-primary" },
  { label: "本月新增", value: "3人", color: "text-accent" },
  { label: "分组数",  value: "6组", color: "text-primary" },
  { label: "管理员",  value: "4人", color: "text-primary" },
]

const groups = [
  { id: "all",    label: "全部",   count: 68 },
  { id: "mkt",    label: "市场部", count: 12 },
  { id: "tech",   label: "技术部", count: 18 },
  { id: "ops",    label: "运营部", count: 10 },
  { id: "hr",     label: "人力资源",count: 6 },
  { id: "admin",  label: "行政部", count: 8 },
  { id: "other",  label: "其他",   count: 14 },
]

const members = [
  {
    id: "m1",
    name: "张伟",
    dept: "市场部",
    group: "mkt",
    role: "admin",
    status: "active",
    phone: "138****8001",
    monthConsume: 320,
    joinDate: "2024-01",
    avatar: "张",
  },
  {
    id: "m2",
    name: "李娜",
    dept: "技术部",
    group: "tech",
    role: "member",
    status: "active",
    phone: "139****2345",
    monthConsume: 180,
    joinDate: "2024-03",
    avatar: "李",
  },
  {
    id: "m3",
    name: "王强",
    dept: "运营部",
    group: "ops",
    role: "member",
    status: "active",
    phone: "137****6789",
    monthConsume: 450,
    joinDate: "2023-09",
    avatar: "王",
  },
  {
    id: "m4",
    name: "赵丽",
    dept: "人力资源",
    group: "hr",
    role: "admin",
    status: "active",
    phone: "136****1122",
    monthConsume: 90,
    joinDate: "2023-06",
    avatar: "赵",
  },
  {
    id: "m5",
    name: "刘洋",
    dept: "技术部",
    group: "tech",
    role: "member",
    status: "inactive",
    phone: "135****3344",
    monthConsume: 0,
    joinDate: "2024-02",
    avatar: "刘",
  },
  {
    id: "m6",
    name: "陈敏",
    dept: "行政部",
    group: "admin",
    role: "member",
    status: "active",
    phone: "188****5566",
    monthConsume: 260,
    joinDate: "2023-11",
    avatar: "陈",
  },
]

// ─────────────────────────────────────────────────────────────────────────────

const avatarColors = [
  "bg-blue-400",
  "bg-green-400",
  "bg-purple-400",
  "bg-orange-400",
  "bg-pink-400",
  "bg-cyan-400",
]

export function MembersOverview() {
  const router = useRouter()
  const [activeGroup, setActiveGroup] = useState("all")
  const [query, setQuery] = useState("")

  const filtered = members.filter((m) => {
    const matchGroup = activeGroup === "all" || m.group === activeGroup
    const matchQuery = !query || m.name.includes(query) || m.dept.includes(query)
    return matchGroup && matchQuery
  })

  return (
    <div className="px-4 py-4 pb-24 space-y-5">

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-border">
          {memberStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-4 px-1">
              <span className={`text-lg font-bold leading-none ${s.color}`}>{s.value}</span>
              <span className="text-[10px] text-muted-foreground mt-1.5 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search ───────────────────────────────────────────────────────── */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索成员姓名、部门..."
          className="w-full h-10 bg-card border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      {/* ── Group filter ─────────────────────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeGroup === g.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {g.label}
            <span className={`ml-1 text-[10px] ${activeGroup === g.id ? "opacity-80" : "text-muted-foreground"}`}>
              {g.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Member list ──────────────────────────────────────────────────── */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-2 text-muted-foreground">
            <UserX className="h-10 w-10 opacity-30" />
            <p className="text-sm">暂无匹配成员</p>
          </div>
        ) : (
          filtered.map((member, index) => (
            <div
              key={member.id}
              onClick={() => router.push(`/group/member/${member.id}`)}
              className={`flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors cursor-pointer ${
                index < filtered.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Avatar */}
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className={`${avatarColors[index % avatarColors.length]} text-white font-bold text-sm`}>
                  {member.avatar}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground">{member.name}</span>
                  {member.role === "admin" && (
                    <span className="flex items-center gap-0.5 text-[10px] bg-yellow-50 text-yellow-600 px-1.5 py-0.5 rounded-full font-medium">
                      <Shield className="h-2.5 w-2.5" />管理员
                    </span>
                  )}
                  {member.status === "inactive" && (
                    <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
                      未激活
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                  <span>{member.dept}</span>
                  <span>·</span>
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Consume + action */}
              <div className="flex items-center gap-2 shrink-0">
                {member.monthConsume > 0 && (
                  <div className="text-right">
                    <p className="text-xs font-semibold text-foreground">¥{member.monthConsume}</p>
                    <p className="text-[10px] text-muted-foreground">本月</p>
                  </div>
                )}
                {member.status === "active" ? (
                  <div className="h-2 w-2 rounded-full bg-accent shrink-0" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-border shrink-0" />
                )}
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                >
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Member management shortcuts ──────────────────────────────────── */}
      <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
        {[
          { label: "批量导入成员", sub: "通过Excel表格批量添加", icon: "📊" },
          { label: "分组管理",     sub: "设置部门分组与权限",   icon: "🗂" },
          { label: "消费记录查询", sub: "查看成员消费明细",     icon: "💳" },
        ].map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-secondary/50 transition-colors text-left ${
              index < 2 ? "border-b border-border" : ""
            }`}
          >
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-lg">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      {/* ── Add member CTA ────────────────────────────────────────────────── */}
      <button className="w-full bg-primary text-primary-foreground rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold text-sm shadow-md active:scale-[0.98] transition-transform">
        <Plus className="h-5 w-5" />
        添加新成员
      </button>

    </div>
  )
}
