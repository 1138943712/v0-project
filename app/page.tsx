"use client"

import { useRouter } from "next/navigation"
import { Dumbbell, Building2, ChevronRight } from "lucide-react"

export default function RolePicker() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Top branding */}
      <div className="flex flex-col items-center pt-20 pb-10 px-6">
        <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center mb-5 shadow-lg">
          <Dumbbell className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">体育场馆管理系统</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Professional Sports Management Platform</p>
      </div>

      {/* Role selection */}
      <div className="px-5 space-y-4 flex-1">
        <p className="text-xs text-muted-foreground font-medium px-1 mb-2">请选择您的身份进入</p>

        {/* Coach */}
        <button
          onClick={() => router.push("/home")}
          className="w-full bg-card rounded-2xl shadow-sm border border-border p-5 flex items-center gap-4 active:scale-[0.98] transition-all text-left hover:border-primary/30 hover:shadow-md"
        >
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Dumbbell className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-foreground">教练端</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">管理课程、学员考勤和教学评估</p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">课程管理</span>
              <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">学员档案</span>
              <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">薪资查询</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </button>

        {/* Group */}
        <button
          onClick={() => router.push("/group/home")}
          className="w-full bg-card rounded-2xl shadow-sm border border-border p-5 flex items-center gap-4 active:scale-[0.98] transition-all text-left hover:border-primary/30 hover:shadow-md"
        >
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-foreground">团体端</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">企业/学校/俱乐部团体批量管理</p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">成员管理</span>
              <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">批量预约</span>
              <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">活动组织</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground py-8">体育场馆管理系统 · v1.0</p>
    </div>
  )
}
