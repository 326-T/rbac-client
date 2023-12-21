import axios from 'axios'
import { useContext } from 'react'
import TargetGroupEditModalContent from './TargetGroupEditModalContent'
import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/select/OperationMenu'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { ModalContext } from '@/contexts/ModalProvider'
import { TargetGroup } from '@/types/TargetGroup'

export default function TargetGroupCard({
  targetGroup,
  fetchTargetGroups,
}: {
  targetGroup: TargetGroup
  fetchTargetGroups: () => void
}) {
  const modalContext = useContext(ModalContext)
  const drawerContext = useContext(DrawerContext)

  const deleteTarget = () => {
    axios.delete(`/rbac-service/v1/target-groups/${targetGroup.id}`).then(fetchTargetGroups)
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
    drawerContext.set(
      <TargetGroupEditModalContent targetGroup={targetGroup} onClose={fetchTargetGroups} />,
    )
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='body-medium'>{targetGroup.name}</h5>
        <OperationMenu onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
      </div>
    </Card>
  )
}
