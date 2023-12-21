'use client'
import { useContext } from 'react'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { Target } from '@/types/Target'

export default function TargetDetailModalContent({ target }: { target: Target }) {
  const drawerContext = useContext(DrawerContext)

  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent name={target.objectIdRegex} onBackClick={() => {}} onForwardClick={() => {}} />
      <div className='divider'></div>
      <div className='flex-grow' />
      <ProductionInfo
        createdAt={target.createdAt}
        updatedAt={target.updatedAt}
        createdBy={target.createdBy}
      />
    </div>
  )
}
