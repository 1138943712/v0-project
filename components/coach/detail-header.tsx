"use client"

import { ChevronLeft } from "lucide-react"

interface DetailHeaderProps {
  title: string
  onBack: () => void
  rightSlot?: React.ReactNode
}

export function DetailHeader({ title, onBack, rightSlot }: DetailHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center h-14 px-2">
        <button
          onClick={onBack}
          className="flex items-center justify-center h-10 w-10 rounded-xl hover:bg-secondary transition-colors shrink-0"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="flex-1 text-base font-semibold text-foreground text-center pr-10 truncate">
          {title}
        </h1>
        {rightSlot && <div className="absolute right-4">{rightSlot}</div>}
      </div>
    </header>
  )
}
