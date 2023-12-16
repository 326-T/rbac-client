'use client'
import { useRef } from 'react'
import { useClickOutSide } from '@/hooks/useClickOutSide'

export default function ModalCard({
  children,
  close,
}: {
  children: React.ReactNode
  close: () => void
}) {
  const ref = useRef(null)
  useClickOutSide(ref, close)

  return (
    <div ref={ref} className='p-5 bg-white rounded-lg'>
      {children}
    </div>
  )
}
