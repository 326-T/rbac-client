'use client'
import { useContext, useEffect, useState } from 'react'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { Endpoint } from '@/types/Endpoint'
import { Role } from '@/types/Role'

export default function EndpointModalContent({
  endpoint,
  onClose,
}: {
  endpoint: Endpoint
  onClose?: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const relationReducer = useRelationReducer<Role>(
    (one: Role, another: Role) => one.id === another.id,
  )
  const drawerContext = useContext(DrawerContext)

  useEffect(() => {
    return () => {
      onClose && onClose()
      relationReducer.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint])

  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent
        name={`${endpoint.method} ${endpoint.pathRegex}`}
        onBackClick={() => {}}
        onForwardClick={() => {}}
      />
      <div className='divider' />
      <div
        className='
          flex flex-col flex-grow
          space-y-5
          overflow-y-scroll
        '
      >
        <div
          className='
            w-fit grid grid-cols-2 gap-5
            p-5
            body-large
          '
        >
          <h5>HTTP Method</h5>
          <h5>{endpoint.method}</h5>
          <h5>Path</h5>
          <h5>{endpoint.pathRegex}</h5>
          <h5>TargetGroup</h5>
          <h5>{endpoint.targetGroupName}</h5>
        </div>
        <div className='flex-grow' />
        <ProductionInfo
          createdAt={endpoint.createdAt}
          updatedAt={endpoint.updatedAt}
          createdBy={endpoint.createdBy}
        />
      </div>
    </div>
  )
}
