'use client'
import { useContext, useMemo, useRef, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import CustomButton from '@/components/button/CustomButton'
import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/pulldown/OperationMenu'
import { ModalContext } from '@/contexts/ModalProvider'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { Path } from '@/types/Path'
import { DrawerContext } from '@/contexts/DrawerProvider'
import PathDrawerContent from './PathDrawerContent'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { deletePath, updatePath } from '@/services/path'

export default function PathCard({ path, fetchPaths }: { path: Path; fetchPaths: () => void }) {
  const [edit, setEdit] = useState<boolean>(false)
  const [value, setValue] = useState<string>(path.regex)
  const modalContext = useContext(ModalContext)
  const drawerContext = useContext(DrawerContext)
  const namespaceContext = useContext(NamespaceContext)
  const modified = useMemo(() => value !== path.regex, [value, path.regex])
  const ref = useRef(null)

  const onEnterClick = () => {
    edit &&
      modified &&
      updatePath(namespaceContext.state.selected.id, path.id, value)
        .then(fetchPaths)
        .finally(() => setEdit(false))
  }

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deletePath(namespaceContext.state.selected.id, path.id).then(fetchPaths)
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }

  const onDetailClick = () => {
    drawerContext.set(<PathDrawerContent path={path} />)
    drawerContext.turnOn()
  }

  useClickOutSide(ref, () => setEdit(false))
  useEscapeKey(() => setEdit(false))

  return (
    <div ref={ref}>
      <Card>
        <div className='flex w-full items-center justify-between space-x-5'>
          <TextInput value={value} onChange={setValue} disabled={!edit} onEnter={onEnterClick} />
          {edit ? (
            <CustomButton theme='SAVE' onClick={onEnterClick} disabled={!modified} />
          ) : (
            <OperationMenu
              onEditClick={() => setEdit(true)}
              onDeleteClick={onDeleteClick}
              onDetailClick={onDetailClick}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
