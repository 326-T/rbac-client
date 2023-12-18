import Select from './Select'
import { MdOutlineTour } from 'react-icons/md'

export default function TourMenu({}: {}) {
  return (
    <Select
      title={
        <div
          className='
          flex items-center
          space-x-2
        '
        >
          <MdOutlineTour className='icon-medium' />
          <h6 className='body-large'>Tour</h6>
        </div>
      }
      candidates={[<h6 className='body-large'>OverAll</h6>, <h6 className='body-large'>Delete</h6>]}
      hover
    />
  )
}
