import Card from '@/components/card/Card'
import { Target } from '@/types/Target'
import AddRelationCard from './AddRelationCard'
import CustomButton from '@/components/button/CustomButton'

export default function RelationField<T>({
  remainingRelations,
  pendingRelations,
  candidates,
  getName,
  onAddRelation,
  onDeleteRelation,
  disabled,
}: {
  remainingRelations: T[]
  pendingRelations: T[]
  candidates: T[]
  getName: (target: T) => string
  onAddRelation: (target: T) => void
  onDeleteRelation: (target: T) => void
  disabled?: boolean
}) {
  return (
    <div
      className='
        ml-10 mt-10 mb-10 p-5
        border-2 rounded-box bg-gray-200
        flex-grow
        overflow-y-scroll
      '
    >
      <ul className='flex flex-col space-y-3'>
        {remainingRelations.map((remaining) => (
          <li key={getName(remaining)}>
            <Card>
              <div className='flex flex-row w-full items-center justify-between'>
                <h4 className='body-large'>{getName(remaining)}</h4>
                {!disabled && (
                  <CustomButton
                    theme='DELETE'
                    onClick={() => onDeleteRelation(remaining)}
                    withoutText
                  />
                )}
              </div>
            </Card>
          </li>
        ))}
        {pendingRelations.map((pending) => (
          <li key={getName(pending)}>
            <Card>
              <div className='flex flex-row w-full items-center justify-between'>
                <h4 className='body-large'>{getName(pending)}</h4>
                {!disabled && (
                  <CustomButton
                    theme='DISCARD'
                    onClick={() => onDeleteRelation(pending)}
                    withoutText
                  />
                )}
              </div>
            </Card>
          </li>
        ))}
        {!disabled && candidates.length > 0 && (
          <li key='add-text w-full'>
            <AddRelationCard
              candidates={candidates}
              pushCandidate={onAddRelation}
              getName={getName}
            />
          </li>
        )}
      </ul>
    </div>
  )
}
