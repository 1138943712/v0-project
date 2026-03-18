"use client"

import { ChevronLeft } from "lucide-react"

interface DetailHeaderProps {
  title: string
  onBack: () => void
  rightSlot?: React.ReactNode
}

export function GroupDetailHeader({ title, onBack, rightSlot }: DetailHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="relative flex items-center h-14 px-4">
        <button
          onClick={onBack}
          className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors shrink-0"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="absolute left-0 right-0 text-center text-base font-bold text-foreground pointer-events-none px-16 truncate">
          {title}
        </h1>
        <div className="ml-auto shrink-0">
          {rightSlot ?? <div className="w-9" />}
        </div>
      </div>
    </header>
  )
}
