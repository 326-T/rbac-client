import { AiOutlineDelete } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { FiEdit3 } from 'react-icons/fi'
import { IoIosMenu } from 'react-icons/io'
import Pulldown from './Pulldown'

export default function OperationMenu({
  onDetailClick,
  onEditClick,
  onDeleteClick,
}: {
  onDetailClick?: () => void
  onEditClick?: () => void
  onDeleteClick?: () => void
}) {
  return (
    <Pulldown
      title={<IoIosMenu className='icon-medium' />}
      candidates={[
        ...(onDetailClick
          ? [
              <div
                key='detail'
                onClick={onDetailClick}
                className='
                  flex items-center
                  space-x-2
                '
              >
                <BiDetail className='icon-small' />
                <h6 className='body-large'>Detail</h6>
              </div>,
            ]
          : []),
        ...(onEditClick
          ? [
              <div
                key='edit'
                onClick={onEditClick}
                className='
                  flex items-center
                  space-x-2
                '
              >
                <FiEdit3 className='icon-small' />
                <h6 className='body-large'>Edit</h6>
              </div>,
            ]
          : []),
        ...(onDeleteClick
          ? [
              <div
                key='delete'
                onClick={onDeleteClick}
                className='
            flex items-center
            space-x-2
            clickable-warning
          '
              >
                <AiOutlineDelete className='icon-small' />
                <h6 className='body-large'>Delete</h6>
              </div>,
            ]
          : []),
      ]}
      hover
    />
  )
}
