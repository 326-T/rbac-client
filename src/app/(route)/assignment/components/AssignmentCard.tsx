import { useContext } from 'react'
import AssignmentDrawerContent from './AssignmentDrawerContent'
import Card from '@/components/card/Card'
import OperationMenu from '@/components/pulldown/OperationMenu'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { UserGroup } from '@/types/UserGroup'

export default function AssignmentCard({
  userGroup,
  fetchUserGroups,
}: {
  userGroup: UserGroup
  fetchUserGroups: () => void
}) {
  const drawerContext = useContext(DrawerContext)

  const onDetailClick = () => {
    drawerContext.set(<AssignmentDrawerContent userGroup={userGroup} onClose={fetchUserGroups} />)
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='body-medium'>{userGroup.name}</h5>
        <OperationMenu onDetailClick={onDetailClick} />
      </div>
    </Card>
  )
}
