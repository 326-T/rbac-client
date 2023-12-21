import { AiOutlineDelete, AiOutlineSave } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi'
import { VscDiscard } from 'react-icons/vsc'

const ButtonThemes = {
  EDIT: {
    text: 'Edit',
    icon: <FiEdit3 className='icon-small' />,
    css: 'clickable-primary',
  },
  SAVE: {
    text: 'Save',
    icon: <AiOutlineSave className='icon-small' />,
    css: 'clickable-primary',
  },
  DISCARD: {
    text: 'Discard',
    icon: <VscDiscard className='icon-small' />,
    css: 'clickable-warning',
  },
  DELETE: {
    text: 'Delete',
    icon: <AiOutlineDelete className='icon-small' />,
    css: 'clickable-warning',
  },
}

export type ButtonTheme = keyof typeof ButtonThemes

export default function CustomButton({
  theme,
  onClick,
  disabled,
  withoutText,
}: {
  theme: ButtonTheme
  onClick: () => void
  disabled?: boolean
  withoutText?: boolean
}) {
  return (
    <button
      className={`
        btn
        ${ButtonThemes[theme].css}
      `}
    >
      <div
        onClick={onClick}
        className='
        flex items-center
        space-x-2
      '
      >
        {ButtonThemes[theme].icon}
        {!withoutText && <h6 className='body-large'>{ButtonThemes[theme].text}</h6>}
      </div>
    </button>
  )
}
