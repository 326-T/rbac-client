'use client'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import CustomButton from '@/components/button/CustomButton'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import RelationField from '@/components/modal/edit-modal-content/RelationField'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { Endpoint } from '@/types/Endpoint'
import { Role } from '@/types/Role'
import { findEndpointsByRoleId, indexEndpoints } from '@/services/endpoint'
import { updateRole } from '@/services/role'
import {
  deleteRoleEndpointPermission,
  insertRoleEndpointPermission,
} from '@/services/roleEndpointPermission'

export default function RoleEditModalContent({
  role,
  onClose,
}: {
  role: Role
  onClose?: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const [roleName, setRoleName] = useState<string>(role.name)
  const relationReducer = useRelationReducer<Endpoint>(
    (one: Endpoint, another: Endpoint) => one.id === another.id,
  )
  const drawerContext = useContext(DrawerContext)

  const fetchDetail = async (role: Role) => {
    findEndpointsByRoleId(role.namespaceId, role.id).then((res) => {
      relationReducer.setRelated(res.data)
    })
    indexEndpoints(role.namespaceId).then((res) => {
      relationReducer.setAll(res.data)
    })
  }

  const onSaveClick = async () => {
    setEdit(false)
    Promise.all([
      roleName !== role.name && updateRole(role.namespaceId, role.id, roleName),
      ...relationReducer.state.pending.map((endpoint: Endpoint) =>
        insertRoleEndpointPermission(role.namespaceId, role.id, endpoint.id),
      ),
      ...relationReducer.state.removing.map((endpoint: Endpoint) =>
        deleteRoleEndpointPermission(role.namespaceId, role.id, endpoint.id),
      ),
    ]).finally(() => {
      relationReducer.clear()
      drawerContext.turnOff()
    })
  }

  const onDiscardClick = () => {
    setEdit(false)
    relationReducer.clear()
    fetchDetail(role)
    setRoleName(role.name)
  }

  useEffect(() => {
    fetchDetail(role)
    return () => {
      onClose && onClose()
      relationReducer.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent name={role.name} onBackClick={() => {}} onForwardClick={() => {}} />
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
        <TextInput value={roleName} onChange={setRoleName} disabled={!edit} onEnter={() => {}} />
        <RelationField
          remainingRelations={relationReducer.remaining}
          candidates={relationReducer.candidates}
          pendingRelations={relationReducer.state.pending}
          getName={(endpoint: Endpoint) => endpoint.method + ' ' + endpoint.pathId}
          onAddRelation={relationReducer.add}
          onDeleteRelation={relationReducer.remove}
          disabled={!edit}
        />
        <div className='flex-grow' />
        <ProductionInfo
          createdAt={role.createdAt}
          updatedAt={role.updatedAt}
          createdBy={role.createdBy}
        />
      </div>
    </div>
  )
}
