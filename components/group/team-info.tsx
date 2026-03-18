"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, CheckCircle2, Shield, Phone, MapPin, Calendar, ChevronRight, Edit3 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GroupDetailHeader } from "@/components/group/detail-header"

const orgData = {
  name: "远航体育俱乐部",
  type: "俱乐部",
  certStatus: "verified",
  since: "2023年06月15日",
  address: "上海市浦东新区张江高科技园区远航路188号",
  phone: "021-6888-****",
  email: "admin@yuanhang-sports.com",
  memberCount: 68,
  certNo: "91310000MA1G5X9Y3Q",
  licenseNo: "沪体联字【2023】第0168号",
}

const admins = [
  { id: "m1", name: "张伟", role: "主管理员", dept: "市场部", avatar: "张", phone: "138****8001", joinDate: "2023年06月" },
  { id: "m4", name: "赵丽", role: "子管理员", dept: "人力资源部", avatar: "赵", phone: "136****1122", joinDate: "2024年01月" },
  { id: "m6", name: "陈敏", role: "子管理员", dept: "行政部", avatar: "陈", phone: "188****5566", joinDate: "2024年02月" },
]

const tabs = ["基本信息", "认证资质", "管理员设置"]
const avatarBg = ["bg-blue-400", "bg-green-400", "bg-purple-400"]

export function TeamInfo() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("基本信息")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <GroupDetailHeader
        title="团体信息"
        onBack={() => router.back()}
        rightSlot={
          <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-secondary">
            <Edit3 className="h-4 w-4 text-muted-foreground" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* ── Org card ──────────────────────────────────────────────── */}
        <div className="bg-primary px-4 pt-6 pb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-white">远</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{orgData.name}</h2>
                {orgData.certStatus === "verified" && <CheckCircle2 className="h-5 w-5 text-white/80" />}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{orgData.type}</span>
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                  {orgData.certStatus === "verified" ? "已认证" : "认证中"}
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">成员 {orgData.memberCount} 人</p>
            </div>
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────── */}
        <div className="mx-4 mt-4 bg-secondary rounded-xl p-1 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab: Basic info ───────────────────────────────────────── */}
        {activeTab === "基本信息" && (
          <div className="mx-4 mt-4 space-y-4">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {[
                { icon: Building2, label: "机构类型", value: orgData.type },
                { icon: Calendar,  label: "注册日期", value: orgData.since },
                { icon: MapPin,    label: "联系地址", value: orgData.address },
                { icon: Phone,     label: "联系电话", value: orgData.phone },
              ].map((row, i) => (
                <button key={row.label} className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-secondary/50 text-left ${i < 3 ? "border-b border-border" : ""}`}>
                  <row.icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground w-16 shrink-0">{row.label}</span>
                  <span className="text-sm text-foreground flex-1 leading-relaxed">{row.value}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Certification ────────────────────────────────────── */}
        {activeTab === "认证资质" && (
          <div className="mx-4 mt-4 space-y-4">
            <div className="bg-card rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">认证状态</p>
                  <p className="text-xs text-primary font-medium mt-0.5">已通过认证 · 有效期至2026年06月</p>
                </div>
              </div>
              {[
                { label: "统一社会信用代码", value: orgData.certNo },
                { label: "体育协会许可证号", value: orgData.licenseNo },
              ].map((row, i) => (
                <div key={row.label} className={`py-3 ${i < 1 ? "border-b border-border" : ""}`}>
                  <p className="text-xs text-muted-foreground mb-1">{row.label}</p>
                  <p className="text-sm text-foreground font-mono">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl shadow-sm p-4">
              <h3 className="text-sm font-bold text-foreground mb-3">认证文件</h3>
              {["营业执照 / 登记证书", "法人身份证", "体育协会资质证书"].map((doc, i) => (
                <div key={doc} className={`flex items-center justify-between py-3 ${i < 2 ? "border-b border-border" : ""}`}>
                  <span className="text-sm text-foreground">{doc}</span>
                  <span className="text-xs text-primary font-medium">查看</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Admins ───────────────────────────────────────────── */}
        {activeTab === "管理员设置" && (
          <div className="mx-4 mt-4 space-y-4">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
              {admins.map((admin, i) => (
                <div key={admin.id} className={`flex items-center gap-3 px-4 py-4 ${i < admins.length - 1 ? "border-b border-border" : ""}`}>
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className={`${avatarBg[i % avatarBg.length]} text-white font-bold`}>
                      {admin.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{admin.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        admin.role === "主管理员" ? "bg-yellow-50 text-yellow-600" : "bg-secondary text-muted-foreground"
                      }`}>
                        {admin.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{admin.dept} · {admin.phone}</p>
                  </div>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <button className="w-full border border-dashed border-primary text-primary rounded-2xl py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
              + 添加子管理员
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
