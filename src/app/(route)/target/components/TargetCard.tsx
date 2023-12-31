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
import { Target } from '@/types/Target'
import { DrawerContext } from '@/contexts/DrawerProvider'
import TargetDrawerContent from './TargetDrawerContent'
import { deleteTarget, updateTarget } from '@/services/target'

export default function TargetCard({
  target,
  fetchTargets,
}: {
  target: Target
  fetchTargets: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const [value, setValue] = useState<string>(target.objectIdRegex)
  const modalContext = useContext(ModalContext)
  const drawerContext = useContext(DrawerContext)
  const modified = useMemo(() => value !== target.objectIdRegex, [value, target.objectIdRegex])
  const ref = useRef(null)

  const onEnterClick = () => {
    edit &&
      modified &&
      updateTarget(target.namespaceId, target.id, value)
        .then(fetchTargets)
        .finally(() => setEdit(false))
  }

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deleteTarget(target.namespaceId, target.id).then(fetchTargets)
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }

  const onDetailClick = () => {
    drawerContext.set(<TargetDrawerContent target={target} />)
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
