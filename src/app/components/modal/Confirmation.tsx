'use client'

import { useEnterKey } from '@/app/hooks/useEnterKey'

export default function Confirmation({ onClick }: { onClick: () => void }) {
  useEnterKey(onClick)

  return (
    <div
      className='
        space-y-5
      '
    >
      <div className='w-full flex justify-center'>
        <h3 className='body-large'>
          本当に削除してもよろしいですか？
          <br />
          この操作は取り消せません。
        </h3>
      </div>
      <div className='w-full flex justify-center'>
        <button
          onClick={onClick}
          className='
            p-2 rounded-lg body-large
            clickable-warning
            border-2 border-red-500
          '
        >
          Delete
        </button>
      </div>
    </div>
  )
}
