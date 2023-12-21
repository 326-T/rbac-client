'use client'
import axios from 'axios'
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

export default function PathCard({ path, fetchPaths }: { path: Path; fetchPaths: () => void }) {
  const [edit, setEdit] = useState<boolean>(false)
  const [value, setValue] = useState<string>(path.regex)
  const modalContext = useContext(ModalContext)
  const modified = useMemo(() => value !== path.regex, [value, path.regex])
  const ref = useRef(null)

  const updatePath = () => {
    edit &&
      modified &&
      axios
        .put(`/rbac-service/v1/paths/${path.id}`, {
          regex: value,
        })
        .then(fetchPaths)
        .finally(() => setEdit(false))
  }

  const deletePath = () => {
    axios.delete(`/rbac-service/v1/paths/${path.id}`).then(fetchPaths)
  }

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deletePath()
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
          <TextInput value={value} onChange={setValue} disabled={!edit} onEnter={updatePath} />
          {edit ? (
            <CustomButton theme='SAVE' onClick={updatePath} disabled={!modified} />
          ) : (
            <OperationMenu onEditClick={() => setEdit(true)} onDeleteClick={onDeleteClick} />
          )}
        </div>
      </Card>
    </div>
  )
}
