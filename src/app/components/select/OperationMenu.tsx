import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import { IoIosMenu } from 'react-icons/io'
import Select from './Select'

export default function OperationMenu({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick: () => void
  onDeleteClick: () => void
}) {
  return (
    <Select
      title={<IoIosMenu className='icon-medium' />}
      candidates={[
        <div
          onClick={onEditClick}
          className='
            flex items-center
            space-x-2
          '
        >
          <FiEdit3 className='icon-small' />
          <h6 className='body-large'>Edit</h6>
        </div>,
        <div
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
      ]}
      hover
    />
  )
}
