'use client'
import { useMemo, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { TextInput } from '../TextInput'
import Card from './Card'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import CustomButton from '../button/CustomButton'

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
      {!edit ? (
        <button
          onClick={() => setEdit(true)}
          className='
            btn
            flex w-full h-16
            bg-white
          '
        >
          <FiPlus />
        </button>
      ) : (
        <Card>
          <div className='flex w-full items-center justify-between space-x-5'>
            <TextInput value={value} onChange={setValue} disabled={!edit} onEnter={onEnter} />
            <CustomButton theme='SAVE' onClick={onEnter} disabled={!notBlank} />
          </div>
        </Card>
      )}
    </div>
  )
}
