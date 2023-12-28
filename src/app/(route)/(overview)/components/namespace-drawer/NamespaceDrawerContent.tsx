'use client'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import CustomButton from '@/components/button/CustomButton'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { Namespace } from '@/types/Namespace'
import { SystemRole } from '@/types/SystemRole'
import PermissionField from './PermissionField'
import { indexSystemRoles } from '../@/services/systemRole'
import { updateNamespace } from '../@/services/namespace'

export default function NamespaceDrawerContent({
  namespace,
  onClose,
}: {
  namespace: Namespace
  onClose?: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const [systemRoles, setSystemRoles] = useState<SystemRole[]>([])
  const [namespaceName, setNamespaceName] = useState<string>(namespace.name)
  const [doSave, setDoSave] = useState<number>(0)
  const drawerContext = useContext(DrawerContext)

  const fetchRoles = (namespace: Namespace) => {
    indexSystemRoles(namespace.id).then((res) => setSystemRoles(res.data))
  }

  const onSaveClick = async () => {
    setDoSave((prev) => prev + 1)
    setEdit(false)
    Promise.all([
      namespaceName !== namespace.name && updateNamespace(namespace.id, namespaceName),
    ]).finally(() => {
      drawerContext.turnOff()
    })
  }

  const onDiscardClick = () => {
    setDoSave(0)
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
      <div
        className='
          flex flex-col flex-grow
          space-y-5
          overflow-y-scroll
        '
      >
        <TextInput
          value={namespaceName}
          onChange={setNamespaceName}
          disabled={!edit}
          onEnter={() => {}}
        />
        {systemRoles.map((systemRole) => (
          <PermissionField
            key={systemRole.id.toString()}
            systemRole={systemRole}
            edit={edit}
            doSave={doSave}
          />
        ))}
        <div className='flex-grow' />
        <ProductionInfo
          createdAt={namespace.createdAt}
          updatedAt={namespace.updatedAt}
          createdBy={namespace.createdBy}
        />
      </div>
    </div>
  )
}
