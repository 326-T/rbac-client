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
import { DrawerContext } from '@/contexts/DrawerProvider'
import NamespaceEditModalContent from '../namespace-edit-modal/NamespaceEditModalContent'

export default function NamespaceDetail() {
  const [systemRoles, setSystemRoles] = useState<SystemRole[]>([])
  const namespaceContext = useContext(NamespaceContext)
  const modalContext = useContext(ModalContext)
  const drawerContext = useContext(DrawerContext)

  const fetchRoles = () => {
    axios
      .get(`/rbac-service/v1/system-roles?namespace-id=${namespaceContext.state.selected.id}`)
      .then((res) => {
        setSystemRoles(res.data)
      })
  }

  useEffect(() => {
    fetchRoles()
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

  const onDetailClick = () => {
    drawerContext.set(
      <NamespaceEditModalContent
        namespace={namespaceContext.state.selected}
        onClose={() => {
          namespaceContext.fetch()
          fetchRoles()
        }}
      />,
    )
    drawerContext.turnOn()
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
          <OperationMenu onDetailClick={onDetailClick} onDeleteClick={onDeleteClick} />
        </div>
      </div>
    </Card>
  )
}
