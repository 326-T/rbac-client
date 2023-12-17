import { FaCheck } from 'react-icons/fa6'

export default function DoneButton({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button onClick={onClick} className='btn clickable-primary' disabled={disabled}>
      <FaCheck />
    </button>
  )
}
