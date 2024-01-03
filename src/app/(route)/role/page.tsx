'use client'
import { useContext, useEffect, useState } from 'react'
import RoleCard from './components/RoleCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { Role } from '@/types/Role'
import { indexRoles, insertRole } from '@/services/role'

export default function Page() {
  const [roles, setRoles] = useState<Role[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchRoles = async (namespaceId: number) => {
    indexRoles(namespaceId).then((res) => {
      setRoles(res.data)
    })
  }

  const createRole = async (name: string) => {
    insertRole(namespaceContext.state.selected.id, name).then(() =>
      fetchRoles(namespaceContext.state.selected.id),
    )
  }

  useEffect(() => {
    namespaceContext.state.selected.id && fetchRoles(namespaceContext.state.selected.id)
  }, [namespaceContext.state.selected.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createRole} />
      {roles.map((role) => (
        <li key={role.id}>
          <RoleCard role={role} fetchRoles={() => fetchRoles(namespaceContext.state.selected.id)} />
        </li>
      ))}
    </ol>
  )
}
