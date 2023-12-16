'use client'
import { useContext } from 'react'
import { useEscapeKey } from '../hooks/useEscapeKey'
import { DrawerContext } from '@/app/contexts/DrawerProvider'

export default function DrawerRight() {
  const drawerContext = useContext(DrawerContext)
  useEscapeKey(drawerContext.turnOff)

  return (
    <>
      {drawerContext.state.open && (
        <>
          <div
            className='
              fixed top-0 left-0
              h-full w-6/12
              bg-gray-600
              opacity-50
            '
            onClick={drawerContext.turnOff}
          ></div>
          <div
            className='
              fixed top-0 right-0
              h-full w-6/12
              p-4 border-l-2 bg-white border-gray-200
            '
          >
            {drawerContext.state.component}
          </div>
        </>
      )}
    </>
  )
}
