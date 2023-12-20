import { decodeDate } from '../../../utils/dateUtil'

export default function ProductionInfo({
  createdAt,
  updatedAt,
  createdBy,
}: {
  createdAt: Date
  updatedAt: Date
  createdBy: number
}) {
  return (
    <div className='p-5 border-2 rounded-box'>
      <div className='w-fit grid grid-cols-2 gap-2'>
        <h5 className='body-large'>作成者</h5>
        <h5 className='body-large'>{createdBy}</h5>
        <h5 className='body-large'>作成日</h5>
        <h5 className='body-large'>{decodeDate(createdAt)}</h5>
        <h5 className='body-large'>更新日</h5>
        <h5 className='body-large'>{decodeDate(updatedAt)}</h5>
      </div>
    </div>
  )
}
