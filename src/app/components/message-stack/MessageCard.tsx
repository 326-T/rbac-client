import { useEffect, useMemo, useState } from 'react'
import { BsInfoCircleFill } from 'react-icons/bs'
import { FaCheckCircle } from 'react-icons/fa'
import { IoIosWarning } from 'react-icons/io'
import { MdOutlineError } from 'react-icons/md'
import { MessageContent } from '@/app/types/MessageContent'

export default function MessageCard({ content, key }: { content: MessageContent; key?: string }) {
  const [cssAnimation, setCssAnimation] = useState<string>('animate-fade-in')
  const renderIcon = useMemo(() => {
    switch (content.theme) {
      case 'ERROR':
        return <MdOutlineError className='w-8 h-8 text-red-500' />
      case 'WARNING':
        return <IoIosWarning className='w-8 h-8 text-secondary-700' />
      case 'INFO':
        return <BsInfoCircleFill className='w-8 h-8 text-tertiary-500' />
      case 'SUCCESS':
        return <FaCheckCircle className='w-8 h-8 text-primary-600' />
      default:
        return <></>
    }
  }, [content.theme])

  const renderColor = useMemo(() => {
    switch (content.theme) {
      case 'ERROR':
        return 'border-red-500'
      case 'WARNING':
        return 'border-secondary-700'
      case 'INFO':
        return 'border-tertiary-500'
      case 'SUCCESS':
        return 'border-primary-600'
    }
  }, [content.theme])

  useEffect(() => {
    setTimeout(() => {
      setCssAnimation('animate-fade-out')
    }, 4500)
  }, [])

  return (
    <div
      key={key}
      className={`
        flex items-center
        p-3 space-x-3
        rounded-lg border-2
        ${renderColor}
        bg-white
        ${cssAnimation}
      `}
    >
      {renderIcon}
      <h5 className='body-large text-gray-700 max-w-md'>{content.message}</h5>
    </div>
  )
}
