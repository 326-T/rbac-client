'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { TbWorld } from 'react-icons/tb'
import AddNamaespace from '../modal/AddNamespace'
import Select from './Select'
import { ModalContext } from '@/contexts/ModalProvider'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { Namespace } from '@/types/Namespace'

export default function NamespaceMenu({}: {}) {
  const [namespaces, setNamespaces] = useState<Namespace[]>([])
  const namespaceContext = useContext(NamespaceContext)
  const modalContext = useContext(ModalContext)
  const savedId = localStorage.getItem('namespaceId')

  const fetchNamespaces = async () => {
    axios.get('/rbac-service/v1/namespaces').then((res) => {
      setNamespaces(res.data)
    })
  }

  const createNamespace = async (name: string) => {
    axios.post('/rbac-service/v1/namespaces', { name: name }).then(() => fetchNamespaces())
  }

  const onAddClick = () => {
    modalContext.set(
      <AddNamaespace
        onEnter={(value: string) => {
          createNamespace(value)
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }

  useEffect(() => {
    fetchNamespaces()
    if (savedId) {
      const savedNamespace = namespaces.find((namespace) => namespace.id === Number(savedId))
      savedNamespace && namespaceContext.set(savedNamespace)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Select
      title={
        <div
          className='
            flex items-center
            space-x-2
          '
        >
          <TbWorld className='icon-medium' />
          <h6 className='body-large'>{namespaceContext.state.namespace.name}</h6>
        </div>
      }
      candidates={[
        ...namespaces.map((namespace) => (
          <div
            key={namespace.id}
            onClick={() => namespaceContext.set(namespace)}
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
