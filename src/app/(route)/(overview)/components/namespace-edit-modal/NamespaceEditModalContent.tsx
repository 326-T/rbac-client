'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import CustomButton from '@/components/button/CustomButton'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import RelationField from '@/components/modal/edit-modal-content/RelationField'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { Namespace } from '@/types/Namespace'
import { User } from '@/types/User'
import { SystemRole } from '@/types/SystemRole'
import PermissionField from './PermissionField'

export default function NamespaceEditModalContent({
  namespace,
  onClose,
}: {
  namespace: Namespace
  onClose?: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const [systemRoles, setSystemRoles] = useState<SystemRole[]>([])
  const [namespaceName, setNamespaceName] = useState<string>(namespace.name)

  const drawerContext = useContext(DrawerContext)

  const fetchRoles = (namespace: Namespace) => {
    axios
      .get(`/rbac-service/v1/system-roles?namespace-id=${namespace.id}`)
      .then((res) => setSystemRoles(res.data))
  }

  const onSaveClick = async () => {
    setEdit(false)
    Promise.all([
      namespaceName !== namespace.name &&
        axios.put(`/rbac-service/v1/namespaces/${namespace.id}`, {
          name: namespaceName,
        }),
    ]).finally(() => {
      drawerContext.turnOff()
    })
  }

  const onDiscardClick = () => {
    setEdit(false)
    fetchRoles(namespace)
    setNamespaceName(namespace.name)
  }

  useEffect(() => {
    fetchRoles(namespace)
    return () => {
      onClose && onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namespace])

  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent name={namespace.name} onBackClick={() => {}} onForwardClick={() => {}} />
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
      <TextInput
        value={namespaceName}
        onChange={setNamespaceName}
        disabled={!edit}
        onEnter={() => {}}
      />
      {systemRoles.map((systemRole) => (
        <PermissionField systemRole={systemRole} edit={edit} />
      ))}
      <ProductionInfo
        createdAt={namespace.createdAt}
        updatedAt={namespace.updatedAt}
        createdBy={namespace.createdBy}
      />
    </div>
  )
}
