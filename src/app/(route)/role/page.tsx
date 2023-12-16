'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import AddCard from '@/app/components/card/AddCard'
import Card from '@/app/components/card/Card'
import { NamespaceContext } from '@/app/contexts/NamespaceProvider'
import { Role } from '@/app/types/Role'

export default function Page() {
  const [roles, setRoles] = useState<Role[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchRoles = async () => {
    await axios.get('/rbac-service/v1/roles').then((res) => {
      setRoles(res.data)
    })
  }

  const createRole = async (name: string) => {
    axios
      .post('/rbac-service/v1/roles', {
        namespaceId: namespaceContext.state.namespace.id,
        name: name,
      })
      .then(fetchRoles)
  }

  useEffect(() => {
    fetchRoles()
  }, [])

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
