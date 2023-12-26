'use client'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { Path } from '@/types/Path'

export default function PathDetailModalContent({ path }: { path: Path }) {
  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent name={path.regex} onBackClick={() => {}} onForwardClick={() => {}} />
      <div className='divider' />
      <div className='flex-grow' />
      <ProductionInfo
        createdAt={path.createdAt}
        updatedAt={path.updatedAt}
        createdBy={path.createdBy}
      />
    </div>
  )
}
