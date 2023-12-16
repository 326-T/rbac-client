'use client'
import axios from 'axios'
import { useContext, useMemo, useRef, useState } from 'react'
import Card from '@/app/components/card/Card'
import { useClickOutSide } from '@/app/hooks/useClickOutSide'
import { useEscapeKey } from '@/app/hooks/useEscapeKey'
import OperationMenu from '@/components/OperationMenu'
import { TextInput } from '@/components/TextInput'
import DoneButton from '@/components/button/DoneButton'
import Confirmation from '@/components/modal/Confirmation'
import { ModalContext } from '@/contexts/ModalProvider'
import { Target } from '@/types/Target'

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
  const modified = useMemo(() => value !== target.objectIdRegex, [value, target.objectIdRegex])
  const ref = useRef(null)

  const updateTarget = () => {
    edit &&
      modified &&
      axios
        .put(`/rbac-service/v1/targets/${target.id}`, {
          objectIdRegex: value,
        })
        .then(fetchTargets)
        .finally(() => setEdit(false))
  }

  const deleteTarget = () => {
    axios.delete(`/rbac-service/v1/targets/${target.id}`).then(fetchTargets)
  }

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deleteTarget()
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }
  useClickOutSide(ref, () => setEdit(false))
  useEscapeKey(() => setEdit(false))

  return (
    <div ref={ref}>
      <Card>
        <div className='flex w-full items-center justify-between space-x-5'>
          <TextInput value={value} onChange={setValue} disabled={!edit} onEnter={updateTarget} />
          {edit ? (
            <DoneButton onClick={updateTarget} disabled={modified} />
          ) : (
            <OperationMenu onEditClick={() => setEdit(true)} onDeleteClick={onDeleteClick} />
          )}
        </div>
      </Card>
    </div>
  )
}
