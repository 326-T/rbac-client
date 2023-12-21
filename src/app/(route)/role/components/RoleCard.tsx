import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/select/OperationMenu'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { ModalContext } from '@/contexts/ModalProvider'
import { Role } from '@/types/Role'
import axios from 'axios'
import { useContext } from 'react'
import RoleEditModalContent from './RoleEditModalContent'

export default function RoleCard({ role, fetchRoles }: { role: Role; fetchRoles: () => void }) {
  const modalContext = useContext(ModalContext)
  const drawerContext = useContext(DrawerContext)

  const deleteTarget = () => {
    axios.delete(`/rbac-service/v1/roles/${role.id}`).then(fetchRoles)
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

  const onEditClick = () => {
    drawerContext.set(<RoleEditModalContent role={role} onClose={fetchRoles} />)
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='body-medium'>{role.name}</h5>
        <OperationMenu onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
      </div>
    </Card>
  )
}
