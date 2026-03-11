"use client"

import { Plus, Users, Clock, Calendar, ChevronRight, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const courses = [
  {
    id: 1,
    name: "青少年篮球训练营",
    type: "团课",
    schedule: "周二、周四、周六",
    time: "09:00 - 10:30",
    students: 15,
    maxStudents: 20,
    price: "¥2,800 / 期",
    status: "进行中",
  },
  {
    id: 2,
    name: "私教体能特训",
    type: "私教",
    schedule: "预约制",
    time: "1小时/节",
    students: 8,
    maxStudents: 10,
    price: "¥400 / 节",
    status: "进行中",
  },
  {
    id: 3,
    name: "成人健身塑形",
    type: "团课",
    schedule: "周一、周三、周五",
    time: "19:00 - 20:30",
    students: 12,
    maxStudents: 15,
    price: "¥1,800 / 月",
    status: "进行中",
  },
  {
    id: 4,
    name: "游泳入门班",
    type: "团课",
    schedule: "周末",
    time: "10:00 - 11:30",
    students: 6,
    maxStudents: 8,
    price: "¥3,200 / 期",
    status: "招生中",
  },
]

export function CourseManagement() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">课程管理</h2>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            新建课程
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["全部", "团课", "私教", "招生中", "已结束"].map((filter) => (
            <Badge
              key={filter}
              variant={filter === "全部" ? "default" : "secondary"}
              className="cursor-pointer whitespace-nowrap"
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-24">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-xl bg-card border border-border p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{course.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {course.type}
                  </Badge>
                </div>
                <p className="text-lg font-semibold text-primary mt-1">{course.price}</p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{course.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">{course.students}</span>
                  /{course.maxStudents} 人
                </span>
                <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(course.students / course.maxStudents) * 100}%` }}
                  />
                </div>
              </div>
              <Badge 
                variant={course.status === "招生中" ? "default" : "secondary"}
              >
                {course.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
