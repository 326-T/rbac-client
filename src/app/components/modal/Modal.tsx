'use client'
import { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalProvider'
import ModalCard from './ModalCard'
import { useEscapeKey } from '@/hooks/useEscapeKey'

export default function Modal() {
  const modalContext = useContext(ModalContext)
  useEscapeKey(modalContext.turnOff)

  return (
    <>
      {modalContext.state.open && (
        <>
          <div
            className='
            fixed top-0 left-0 z-40
            w-full h-full
            opacity-50 bg-gray-600
          '
          />
          <div
            className='
            fixed top-0 left-0 z-[41]
            flex items-center
            w-full h-full
            justify-center 
          '
          >
            <ModalCard close={modalContext.turnOff}>{modalContext.state.component}</ModalCard>
          </div>
        </>
      )}
    </>
  )
}
