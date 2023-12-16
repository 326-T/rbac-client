'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '@/components/card/Card'
import { Endpoint } from '@/types/Endpoint'

export default function Page() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const fetchEndpoints = async () => {
    await axios.get('/rbac-service/v1/endpoints').then((res) => {
      setEndpoints(res.data)
    })
  }

  useEffect(() => {
    fetchEndpoints()
  }, [])

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
