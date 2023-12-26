'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import CustomButton from '@/components/button/CustomButton'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import RelationField from '@/components/modal/edit-modal-content/RelationField'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { Role } from '@/types/Role'
import { UserGroup } from '@/types/UserGroup'

export default function AssignmentDrawerContent({
  userGroup,
  onClose,
}: {
  userGroup: UserGroup
  onClose?: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const relationReducer = useRelationReducer<Role>(
    (one: Role, another: Role) => one.id === another.id,
  )
  const drawerContext = useContext(DrawerContext)

  const fetchDetail = async (userGroup: UserGroup) => {
    axios
      .get(
        `/rbac-service/v1/roles?namespace-id=${userGroup.namespaceId}&user-group-id=${userGroup.id}`,
      )
      .then((res) => {
        relationReducer.setRelated(res.data)
      })
    axios.get(`/rbac-service/v1/roles?namespace-id=${userGroup.namespaceId}`).then((res) => {
      relationReducer.setAll(res.data)
    })
  }

  const onSaveClick = async () => {
    setEdit(false)
    Promise.all([
      ...relationReducer.state.pending.map((role: Role) =>
        axios.post('/rbac-service/v1/group-role-assignments', {
          namespaceId: userGroup.namespaceId,
          roleId: role.id,
          userGroupId: userGroup.id,
        }),
      ),
      ...relationReducer.state.removing.map((role: Role) =>
        axios.delete(
          `/rbac-service/v1/group-role-assignments?namespace-id=${userGroup.namespaceId}&user-group-id=${userGroup.id}&role-id=${role.id}`,
        ),
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
          overflow-y-scroll
        '
      >
        <div className='flex-grow mb-5'>
          <RelationField
            remainingRelations={relationReducer.remaining}
            candidates={relationReducer.candidates}
            pendingRelations={relationReducer.state.pending}
            getName={(role: Role) => role.name}
            onAddRelation={relationReducer.add}
            onDeleteRelation={relationReducer.remove}
            disabled={!edit}
          />
        </div>
        <ProductionInfo
          createdAt={userGroup.createdAt}
          updatedAt={userGroup.updatedAt}
          createdBy={userGroup.createdBy}
        />
      </div>
    </div>
  )
}
