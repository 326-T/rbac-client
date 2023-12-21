'use client'

import { useMemo, useState } from 'react'
import { TextInput } from '../TextInput'
import CustomButton from '../button/CustomButton'
import { useEnterKey } from '@/hooks/useEnterKey'

export default function AddNamaespace({ onEnter }: { onEnter: (value: string) => void }) {
  const [value, setValue] = useState<string>('')
  const disabled = useMemo(() => value === '', [value])
  const onEnterClick = () => {
    !disabled && onEnter(value)
  }

  useEnterKey(onEnterClick)

  return (
    <div
      className='
        space-y-5
      '
    >
      <div className='w-full flex justify-center'>
        <h3 className='body-large'>作成するNamespace名を入力してください。</h3>
      </div>
      <div className='w-full flex justify-center space-x-4'>
        <TextInput value={value} onChange={setValue} />
        <CustomButton theme='SAVE' onClick={onEnterClick} disabled={disabled} withoutText />
      </div>
    </div>
  )
}
