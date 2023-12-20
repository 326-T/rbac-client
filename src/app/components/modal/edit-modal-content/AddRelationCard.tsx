import { Target } from '@/types/Target'
import { FiPlus } from 'react-icons/fi'

export default function AddRelationCard({
  candidates,
  pushCandidate,
}: {
  candidates: Target[]
  pushCandidate: (target: Target) => void
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
          {candidates.map((future: Target, index: number) => (
            <li key={index}>
              <h5 onClick={() => pushCandidate(future)} className='body-large'>
                {future.objectIdRegex}
              </h5>
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}
