import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function TitleContent({
  name,
  onBackClick,
  onForwardClick,
  disableBack,
  disableForward,
}: {
  name: string
  onBackClick: () => void
  onForwardClick: () => void
  disableBack?: boolean
  disableForward?: boolean
}) {
  return (
    <div className='flex items-center justify-between'>
      <button onClick={onBackClick} disabled={disableBack} className='btn clickable-primary'>
        <IoIosArrowBack />
      </button>
      <h2 className='title-large text-primary-300'>{name}</h2>
      <button onClick={onForwardClick} disabled={disableForward} className='btn clickable-primary'>
        <IoIosArrowForward />
      </button>
    </div>
  )
}
