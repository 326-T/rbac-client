import axios from 'axios'
import { useContext } from 'react'
import UserGroupEditModalContent from './UserGroupEditModalContent'
import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/pulldown/OperationMenu'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { ModalContext } from '@/contexts/ModalProvider'
import { UserGroup } from '@/types/UserGroup'

export default function UserGroupCard({
  userGroup,
  fetchUserGroups,
}: {
  userGroup: UserGroup
  fetchUserGroups: () => void
}) {
  const modalContext = useContext(ModalContext)
  const drawerContext = useContext(DrawerContext)

  const deleteTarget = () => {
    axios.delete(`/rbac-service/v1/user-groups/${userGroup.id}`).then(fetchUserGroups)
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
    drawerContext.set(<UserGroupEditModalContent userGroup={userGroup} onClose={fetchUserGroups} />)
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='body-medium'>{userGroup.name}</h5>
        <OperationMenu onDetailClick={onDetailClick} onDeleteClick={onDeleteClick} />
      </div>
    </Card>
  )
}
