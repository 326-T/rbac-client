'use client'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import CustomButton from '@/components/button/CustomButton'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import RelationField from '@/components/modal/edit-modal-content/RelationField'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { User } from '@/types/User'
import { UserGroup } from '@/types/UserGroup'
import { findUsersByUserGroupId, indexUsers } from '@/services/user'
import { updateUserGroup } from '@/services/userGroup'
import { deleteUserGroupBelonging, insertUserGroupBelonging } from '@/services/userGroupBelonging'

export default function UserGroupEditModalContent({
  userGroup,
  onClose,
}: {
  userGroup: UserGroup
  onClose?: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const [userGroupName, setUserGroupName] = useState<string>(userGroup.name)
  const relationReducer = useRelationReducer<User>(
    (one: User, another: User) => one.id === another.id,
  )
  const drawerContext = useContext(DrawerContext)

  const fetchDetail = async (userGroup: UserGroup) => {
    findUsersByUserGroupId(userGroup.id).then((res) => {
      relationReducer.setRelated(res.data)
    })
    indexUsers().then((res) => {
      relationReducer.setAll(res.data)
    })
  }

  const onSaveClick = async () => {
    setEdit(false)
    Promise.all([
      userGroupName !== userGroup.name &&
        updateUserGroup(userGroup.namespaceId, userGroup.id, userGroupName),
      ...relationReducer.state.pending.map((user: User) =>
        insertUserGroupBelonging(userGroup.namespaceId, user.id, userGroup.id),
      ),
      ...relationReducer.state.removing.map((user: User) =>
        deleteUserGroupBelonging(userGroup.namespaceId, user.id, userGroup.id),
      ),
    ]).finally(() => {
      relationReducer.clear()
      drawerContext.turnOff()
    })
  }

  const onDiscardClick = () => {
    setEdit(false)
    relationReducer.clear()
    fetchDetail(userGroup)
    setUserGroupName(userGroup.name)
  }

  useEffect(() => {
    fetchDetail(userGroup)
    return () => {
      onClose && onClose()
      relationReducer.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userGroup])

  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent name={userGroup.name} onBackClick={() => {}} onForwardClick={() => {}} />
      <div className='flex w-full justify-end mt-10 space-x-4'>
        {!edit ? (
          <CustomButton theme='EDIT' onClick={() => setEdit(true)} />
        ) : (
          <>
            <CustomButton theme='DISCARD' onClick={onDiscardClick} />
            <CustomButton theme='SAVE' onClick={onSaveClick} />
          </>
        )}
      </div>
      <div className='divider' />
      <div
        className='
          flex flex-col flex-grow
          space-y-5
          overflow-y-scroll
        '
      >
        <TextInput
          value={userGroupName}
          onChange={setUserGroupName}
          disabled={!edit}
          onEnter={() => {}}
        />
        <RelationField
          remainingRelations={relationReducer.remaining}
          candidates={relationReducer.candidates}
          pendingRelations={relationReducer.state.pending}
          getName={(user: User) => user.name}
          onAddRelation={relationReducer.add}
          onDeleteRelation={relationReducer.remove}
          disabled={!edit}
        />
        <div className='flex-grow' />
        <ProductionInfo
          createdAt={userGroup.createdAt}
          updatedAt={userGroup.updatedAt}
          createdBy={userGroup.createdBy}
        />
      </div>
    </div>
  )
}
