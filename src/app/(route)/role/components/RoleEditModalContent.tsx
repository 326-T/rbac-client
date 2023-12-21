'use client'
import { Endpoint } from '@/types/Endpoint'
import { Role } from '@/types/Role'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import RelationField from '@/components/modal/edit-modal-content/RelationField'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import CustomButton from '@/components/button/CustomButton'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { DrawerContext } from '@/contexts/DrawerProvider'

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
    axios
      .get(`/rbac-service/v1/endpoints?namespace-id=${role.namespaceId}&role-id=${role.id}`)
      .then((res) => {
        relationReducer.setRelated(res.data)
      })
    axios.get(`/rbac-service/v1/endpoints?namespace-id=${role.namespaceId}`).then((res) => {
      relationReducer.setAll(res.data)
    })
  }

  const onSaveClick = async () => {
    setEdit(false)
    Promise.all([
      roleName !== role.name &&
        axios.put(`/rbac-service/v1/roles/${role.id}`, {
          name: roleName,
        }),
      ...relationReducer.state.pending.map((endpoint: Endpoint) =>
        axios.post('/rbac-service/v1/role-endpoint-permissions', {
          namespaceId: role.namespaceId,
          roleId: role.id,
          endpointId: endpoint.id,
        }),
      ),
      ...relationReducer.state.removing.map((endpoint: Endpoint) =>
        axios.delete(
          `/rbac-service/v1/role-endpoint-permissions?namespace-id=${role.namespaceId}&role-id=${role.id}&endpoint-id=${endpoint.id}`,
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
    fetchDetail(role)
    setRoleName(role.name)
  }

  useEffect(() => {
    fetchDetail(role)
    return () => {
      onClose && onClose()
      relationReducer.clear()
    }
  }, [])

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
      <div className='divider'></div>
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
      <ProductionInfo
        createdAt={role.createdAt}
        updatedAt={role.updatedAt}
        createdBy={role.createdBy}
      />
    </div>
  )
}
