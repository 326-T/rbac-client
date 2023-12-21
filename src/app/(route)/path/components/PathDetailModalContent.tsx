'use client'
import { useContext } from 'react'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { Path } from '@/types/Path'

export default function PathDetailModalContent({ path }: { path: Path }) {
  const drawerContext = useContext(DrawerContext)

  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent name={path.regex} onBackClick={() => {}} onForwardClick={() => {}} />
      <div className='divider'></div>
      <div className='flex-grow' />
      <ProductionInfo
        createdAt={path.createdAt}
        updatedAt={path.updatedAt}
        createdBy={path.createdBy}
      />
    </div>
  )
}
