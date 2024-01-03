import { decodeDate } from '@/utils/dateUtil'

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
    <div className='p-2 md:p-5 border-2 rounded-box'>
      <div
        className='
          w-fit
          grid grid-cols-2
          gap-1 md:gap-3
          body-large
        '
      >
        <h5>作成者</h5>
        <h5>{createdBy}</h5>
        <h5>作成日</h5>
        <h5>{decodeDate(createdAt)}</h5>
        <h5>更新日</h5>
        <h5>{decodeDate(updatedAt)}</h5>
      </div>
    </div>
  )
}
