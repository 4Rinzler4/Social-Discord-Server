import { useEffect, useRef } from 'react'

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return

      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`

      const target = e.target as HTMLElement

      if (target.closest("[data-cursor='hover']")) {
        cursorRef.current.classList.add('scale-170', 'bg-orange-500')
      } else {
        cursorRef.current.classList.remove('scale-170', 'bg-orange-500')
      }
    }

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className='fixed left-0 top-0 z-50 w-3 h-3 rounded-full bg-black border-2 border-white pointer-events-none -translate-x-1/2 -translate-y-1/2'
    />
  )
}

export default Cursor
