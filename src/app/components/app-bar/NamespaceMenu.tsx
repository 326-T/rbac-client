'use client'
import { useContext } from 'react'
import { FiPlus } from 'react-icons/fi'
import { TbWorld } from 'react-icons/tb'
import AddNamaespace from '../modal/AddNamespace'
import Pulldown from '../pulldown/Pulldown'
import { ModalContext } from '@/contexts/ModalProvider'
import { NamespaceContext } from '@/contexts/NamespaceProvider'

export default function NamespaceMenu({}: {}) {
  const namespaceContext = useContext(NamespaceContext)
  const modalContext = useContext(ModalContext)

  const onAddClick = () => {
    modalContext.set(
      <AddNamaespace
        onEnter={(value: string) => {
          namespaceContext.post(value)
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }

  return (
    <Pulldown
      title={
        <div
          className='
            flex items-center
            space-x-2
          '
        >
          <TbWorld className='icon-medium' />
          <h6 className='body-large'>{namespaceContext.state.selected.name}</h6>
        </div>
      }
      candidates={[
        ...namespaceContext.state.list.map((namespace) => (
          <div
            key={namespace.id}
            onClick={() => namespaceContext.select(namespace)}
            className='
                flex items-center
                space-x-2
              '
          >
            <h6 className='body-large'>{namespace.name}</h6>
          </div>
        )),
        <div
          key='add'
          onClick={onAddClick}
          className='
              flex items-center justify-center
            '
        >
          <FiPlus />
        </div>,
      ]}
      hover
    />
  )
}
