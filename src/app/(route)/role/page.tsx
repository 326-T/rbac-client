'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import AddCard from '@/components/card/AddCard'
import Card from '@/components/card/Card'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { Role } from '@/types/Role'

export default function Page() {
  const [roles, setRoles] = useState<Role[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchRoles = async (namespaceId: number) => {
    axios.get(`/rbac-service/v1/roles?namespace-id=${namespaceId}`).then((res) => {
      setRoles(res.data)
    })
  }

  const createRole = async (name: string) => {
    axios
      .post('/rbac-service/v1/roles', {
        namespaceId: namespaceContext.state.namespace.id,
        name: name,
      })
      .then(() => fetchRoles(namespaceContext.state.namespace.id))
  }

  useEffect(() => {
    fetchRoles(namespaceContext.state.namespace.id)
  }, [namespaceContext.state.namespace.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createRole} />
      {roles.map((role) => (
        <li key={role.id}>
          <Card key={role.id}>{role.name}</Card>
        </li>
      ))}
    </ol>
  )
}
