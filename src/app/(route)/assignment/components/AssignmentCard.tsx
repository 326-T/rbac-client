import { useContext } from 'react'
import AssignmentModalContent from './AssignmentModalContent'
import CustomButton from '@/components/button/CustomButton'
import Card from '@/components/card/Card'
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

  const onEditClick = () => {
    drawerContext.set(<AssignmentModalContent userGroup={userGroup} onClose={fetchUserGroups} />)
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='body-medium'>{userGroup.name}</h5>
        <CustomButton theme='EDIT' onClick={onEditClick} />
      </div>
    </Card>
  )
}
