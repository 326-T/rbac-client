import { FiPlus } from 'react-icons/fi'
import { Target } from '@/types/Target'

export default function AddRelationCard<T>({
  candidates,
  pushCandidate,
  getName,
}: {
  candidates: T[]
  pushCandidate: (target: T) => void
  getName: (target: T) => string
}) {
  return (
    <div
      className={`
        dropdown
        dropdown-hover
        w-full
      `}
    >
      <div
        tabIndex={0}
        role='button'
        className='
          btn
          flex w-full
          bg-white
        '
      >
        <FiPlus />
      </div>
      <ul
        tabIndex={0}
        className='
          dropdown-content menu
          z-[1]
          w-full overflow-y-scroll
          shadow bg-base-100 rounded-box
        '
      >
        <div className='max-h-64 overflow-y-scroll'>
          {candidates.map((candidate: T, index: number) => (
            <li key={index}>
              <h5 onClick={() => pushCandidate(candidate)} className='body-large'>
                {getName(candidate)}
              </h5>
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}
