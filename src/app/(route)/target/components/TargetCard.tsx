'use client'
import axios from 'axios'
import { useContext, useMemo, useRef, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import CustomButton from '@/components/button/CustomButton'
import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/select/OperationMenu'
import { ModalContext } from '@/contexts/ModalProvider'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { useEscapeKey } from '@/hooks/useEscapeKey'
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
            <CustomButton theme='SAVE' onClick={updateTarget} disabled={!modified} />
          ) : (
            <OperationMenu onEditClick={() => setEdit(true)} onDeleteClick={onDeleteClick} />
          )}
        </div>
      </Card>
    </div>
  )
}
