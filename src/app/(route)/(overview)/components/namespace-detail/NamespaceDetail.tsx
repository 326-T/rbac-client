'use client'
import Card from '@/components/card/Card'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { SystemRole } from '@/types/SystemRole'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import SystemRoleDetail from './SystemRoleDetail'
import OperationMenu from '@/components/pulldown/OperationMenu'
import { ModalContext } from '@/contexts/ModalProvider'
import Confirmation from '@/components/modal/Confirmation'

export default function NamespaceDetail() {
  const [systemRoles, setSystemRoles] = useState<SystemRole[]>([])
  const namespaceContext = useContext(NamespaceContext)
  const modalContext = useContext(ModalContext)

  useEffect(() => {
    axios
      .get(`/rbac-service/v1/system-roles?namespace-id=${namespaceContext.state.selected.id}`)
      .then((res) => {
        setSystemRoles(res.data)
      })
  }, [namespaceContext.state.selected.id])

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          namespaceContext.deleteSelected()
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }

  return (
    <Card>
      <div
        className='
          w-full
          space-y-2
        '
      >
        <h1 className='title-medium text-primary-400'>{namespaceContext.state.selected.name}</h1>
        <div className='flex justify-between md:space-x-2'>
          {systemRoles.map((systemRole) => (
            <SystemRoleDetail key={systemRole.id} systemRole={systemRole} />
          ))}
          <OperationMenu onDetailClick={() => {}} onDeleteClick={onDeleteClick} />
        </div>
      </div>
    </Card>
  )
}
