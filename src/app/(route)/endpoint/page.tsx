'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import AddEndpointCard from './components/AddEndpointCard'
import EndpointCard from './components/EndpointCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { Endpoint } from '@/types/Endpoint'

export default function Page() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchEndpoints = async (namespaceId: number) => {
    axios.get(`/rbac-service/v1/endpoints?namespace-id=${namespaceId}`).then((res) => {
      setEndpoints(res.data)
    })
  }

  useEffect(() => {
    fetchEndpoints(namespaceContext.state.selected.id)
  }, [namespaceContext.state.selected.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddEndpointCard fetchEndpoints={() => fetchEndpoints(namespaceContext.state.selected.id)} />
      {endpoints.map((endpoint) => (
        <li key={endpoint.id}>
          <EndpointCard
            endpoint={endpoint}
            fetchEndpoints={() => fetchEndpoints(namespaceContext.state.selected.id)}
          />
        </li>
      ))}
    </ol>
  )
}
