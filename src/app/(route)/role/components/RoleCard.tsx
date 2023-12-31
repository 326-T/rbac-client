import { useContext } from 'react'
import RoleDrawerContent from './RoleDrawerContent'
import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/pulldown/OperationMenu'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { ModalContext } from '@/contexts/ModalProvider'
import { Role } from '@/types/Role'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { deleteRole } from '@/services/role'

export default function RoleCard({ role, fetchRoles }: { role: Role; fetchRoles: () => void }) {
  const modalContext = useContext(ModalContext)
  const drawerContext = useContext(DrawerContext)
  const namespaceContext = useContext(NamespaceContext)

  const deleteTarget = () => {
    deleteRole(namespaceContext.state.selected.id, role.id).then(fetchRoles)
  }

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deleteTarget()
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }

  const onDetailClick = () => {
    drawerContext.set(<RoleDrawerContent role={role} onClose={fetchRoles} />)
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='body-medium'>{role.name}</h5>
        <OperationMenu onDetailClick={onDetailClick} onDeleteClick={onDeleteClick} />
      </div>
    </Card>
  )
}
