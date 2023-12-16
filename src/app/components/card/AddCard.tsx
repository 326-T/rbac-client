'use client'
import { useMemo, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { TextInput } from '../TextInput'
import DoneButton from '../button/DoneButton'
import Card from './Card'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { useEscapeKey } from '@/hooks/useEscapeKey'

export default function AddCard({ post }: { post: (value: string) => void }) {
  const [edit, setEdit] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const notBlank = useMemo(() => value !== '', [value])
  const ref = useRef(null)

  const onEnter = () => {
    if (edit && notBlank) {
      post(value)
      setEdit(false)
      setValue('')
    }
  }

  useClickOutSide(ref, () => setEdit(false))
  useEscapeKey(() => setEdit(false))

  return (
    <div ref={ref}>
      <Card>
        {!edit ? (
          <button onClick={() => setEdit(true)} className='btn'>
            <FiPlus />
          </button>
        ) : (
          <div className='flex w-full items-center justify-between space-x-5'>
            <TextInput value={value} onChange={setValue} disabled={!edit} onEnter={onEnter} />
            <DoneButton onClick={onEnter} disabled={!notBlank} />
          </div>
        )}
      </Card>
    </div>
  )
}
