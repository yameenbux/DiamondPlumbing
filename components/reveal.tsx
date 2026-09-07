"use client"

import * as React from "react"

/**
 * Scroll reveal — 12px and a fade, once. Deliberately small: anything
 * showier fights the page's job, which is to get a message sent.
 *
 * The movement is CSS, not JS state, and the hidden state only applies once
 * the inline script in <head> has marked the document as scripted. So the
 * content is visible in the raw HTML, visible if the bundle never arrives,
 * and visible immediately when the reader asks for reduced motion — none of
 * which is true of an animation library's `initial` prop on a prerendered
 * page.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => {
      el.dataset.shown = "true"
    }

    if (!("IntersectionObserver" in window)) {
      show()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        show()
        observer.disconnect()
      },
      { rootMargin: "0px 0px -60px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
