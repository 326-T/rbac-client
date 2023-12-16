import { useEffect } from 'react'

export const useEnterKey = (callback: () => void) => {
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        callback()
      }
    }
    document.addEventListener('keydown', handleEnter)
    return () => {
      document.removeEventListener('keydown', handleEnter)
    }
  })
}
