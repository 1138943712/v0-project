"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockCalendarCourses } from "@/lib/mock-data"
import type { Screen } from "@/lib/navigation"

interface CourseCalendarProps {
  onNavigate: (screen: Screen) => void
}

const DAYS = ["日", "一", "二", "三", "四", "五", "六"]

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const statusStyle: Record<number, { timeColor: string; statusLabel: string; statusClass: string }> = {
  1: { timeColor: "text-accent",          statusLabel: "进行中", statusClass: "text-accent" },
  2: { timeColor: "text-primary",         statusLabel: "即将开始", statusClass: "text-primary" },
  0: { timeColor: "text-muted-foreground", statusLabel: "待开课", statusClass: "text-muted-foreground" },
  3: { timeColor: "text-muted-foreground", statusLabel: "已完成", statusClass: "text-muted-foreground" },
}

export function CourseCalendar({ onNavigate }: CourseCalendarProps) {
  const today = new Date(2025, 2, 12)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(today)

  const todayStr = toISO(today)
  const selectedStr = toISO(selectedDate)

  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1)

  // Build 6-row grid
  const cells: { day: number; curMonth: boolean; dateStr: string }[] = []
  for (let i = 0; i < firstDay; i++) {
    const d = prevMonthDays - firstDay + 1 + i
    const date = new Date(viewYear, viewMonth - 1, d)
    cells.push({ day: d, curMonth: false, dateStr: toISO(date) })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(viewYear, viewMonth, d)
    cells.push({ day: d, curMonth: true, dateStr: toISO(date) })
  }
  while (cells.length % 7 !== 0) {
    const d = cells.length - firstDay - daysInMonth + 1
    const date = new Date(viewYear, viewMonth + 1, d)
    cells.push({ day: d, curMonth: false, dateStr: toISO(date) })
  }

  const hasCourse = (dateStr: string) =>
    mockCalendarCourses.some((c) => c.date === dateStr)

  const dayCourses = mockCalendarCourses.find((c) => c.date === selectedStr)?.courses ?? []

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Calendar card */}
      <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm overflow-hidden">
        {/* Month nav */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <button onClick={prevMonth} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <span className="text-base font-bold text-foreground">
            {viewYear}年{viewMonth + 1}月
          </span>
          <button onClick={nextMonth} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 px-2 pb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-xs text-muted-foreground py-1">{d}</div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 px-2 pb-4">
          {cells.map((cell, i) => {
            const isToday = cell.dateStr === todayStr
            const isSelected = cell.dateStr === selectedStr
            const hasDot = hasCourse(cell.dateStr)
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(new Date(cell.dateStr + "T00:00:00"))
                  if (!cell.curMonth) {
                    const d = new Date(cell.dateStr + "T00:00:00")
                    setViewYear(d.getFullYear())
                    setViewMonth(d.getMonth())
                  }
                }}
                className="flex flex-col items-center py-1"
              >
                <span className={`h-8 w-8 flex items-center justify-center rounded-full text-sm transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-bold"
                    : isToday
                    ? "border-2 border-primary text-primary font-bold"
                    : cell.curMonth
                    ? "text-foreground hover:bg-secondary"
                    : "text-muted-foreground/40"
                }`}>
                  {isToday && !isSelected ? "今" : cell.day}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full mt-0.5 ${hasDot && cell.curMonth ? (isSelected ? "bg-primary-foreground" : "bg-accent") : "bg-transparent"}`} />
              </button>
            )
          })}
        </div>
      </div>

      {/* Day course list */}
      <div className="flex-1 overflow-y-auto px-4 mt-4 pb-24">
        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-bold text-foreground">
              {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
            </span>
            {selectedStr === todayStr && (
              <span className="ml-1.5 text-xs text-accent font-medium">今天</span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">共 {dayCourses.length} 节课</span>
        </div>

        {dayCourses.length === 0 ? (
          <div className="bg-card rounded-2xl shadow-sm flex flex-col items-center justify-center py-12">
            <span className="text-3xl mb-2">📅</span>
            <p className="text-sm text-muted-foreground">暂无课程安排</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {dayCourses.map((course, index) => {
              const st = statusStyle[course.status] ?? statusStyle[0]
              return (
                <button
                  key={course.id}
                  onClick={() => onNavigate({ type: "session-detail", sessionId: course.id })}
                  className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-secondary/50 transition-colors text-left ${
                    index < dayCourses.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {/* Time */}
                  <div className="w-12 shrink-0">
                    <p className={`text-sm font-bold leading-none ${st.timeColor}`}>
                      {course.time.split("-")[0]}
                    </p>
                    <p className={`text-[10px] mt-1 ${st.statusClass}`}>{st.statusLabel}</p>
                  </div>

                  {/* Dot */}
                  <div className="flex flex-col items-center self-stretch py-1 shrink-0">
                    <span className={`h-2.5 w-2.5 rounded-full ${course.status === 1 ? "bg-accent" : course.status === 2 ? "bg-primary" : "bg-border"}`} />
                    {index < dayCourses.length - 1 && <span className="w-px flex-1 bg-border mt-1" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{course.courseName}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[9px] bg-primary/10 text-primary">教</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{course.location} · {course.students}人</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); onNavigate({ type: "attendance", sessionId: course.id }) }}
                      className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                        course.status === 3
                          ? "bg-secondary text-muted-foreground"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {course.status === 3 ? "已结束" : "签到"}
                    </button>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
