"use client"

import { useEffect, useCallback, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { addBaseUrl } from "@/lib/api"

interface GymBannerProps {
  list: string[]
}

export function GymBanner({ list }: GymBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [current, setCurrent] = useState(0)

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || list.length <= 1) return
    const timer = setInterval(scrollNext, 3000)
    return () => clearInterval(timer)
  }, [emblaApi, list.length, scrollNext])

  if (list.length === 0) {
    return (
      <div className="relative w-full h-[170px] bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl overflow-hidden flex items-center justify-center">
        <span className="text-muted-foreground text-sm">暂无图片</span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[170px] overflow-hidden rounded-2xl">
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {list.map((src, idx) => (
            <div key={idx} className="flex-none w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={addBaseUrl(src)}
                alt={`banner-${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {list.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {list.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
