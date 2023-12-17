'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Card from '@/components/card/Card'
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
    fetchEndpoints(namespaceContext.state.namespace.id)
  }, [namespaceContext.state.namespace.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      {endpoints.map((endpoint) => (
        <li key={endpoint.id}>
          <Card key={endpoint.id}>{endpoint.method}</Card>
        </li>
      ))}
    </ol>
  )
}
