"use client"

import { useEffect } from "react"

/**
 * Patches Element.prototype.releasePointerCapture to suppress the NotFoundError
 * thrown by Radix UI when a pointer is cancelled by the browser (e.g. during scroll)
 * before the component can release it. This is a known Radix UI issue.
 */
export function PointerCaptureFix() {
  useEffect(() => {
    const original = Element.prototype.releasePointerCapture
    Element.prototype.releasePointerCapture = function (pointerId: number) {
      try {
        original.call(this, pointerId)
      } catch {
        // Ignore: "No active pointer with the given id is found"
      }
    }
    return () => {
      Element.prototype.releasePointerCapture = original
    }
  }, [])

  return null
}
