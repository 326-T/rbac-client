import axios from 'axios'
import { useContext } from 'react'
import TargetGroupDrawerContent from './TargetGroupDrawerContent'
import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/pulldown/OperationMenu'
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
    axios
      .delete(`/rbac-service/v1/${targetGroup.namespaceId}/target-groups/${targetGroup.id}`)
      .then(fetchTargetGroups)
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
    drawerContext.set(
      <TargetGroupDrawerContent targetGroup={targetGroup} onClose={fetchTargetGroups} />,
    )
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='body-medium'>{targetGroup.name}</h5>
        <OperationMenu onDetailClick={onDetailClick} onDeleteClick={onDeleteClick} />
      </div>
    </Card>
  )
}
