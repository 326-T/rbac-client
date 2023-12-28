'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import UserGroupCard from './components/UserGroupCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { UserGroup } from '@/types/UserGroup'

export default function Page() {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchUserGroups = async (namespaceId: number) => {
    axios.get(`/rbac-service/v1/${namespaceId}/user-groups`).then((res) => {
      setUserGroups(res.data)
    })
  }

  const createUserGroup = async (name: string) => {
    axios
      .post(`/rbac-service/v1/${namespaceContext.state.selected.id}/user-groups`, {
        name: name,
      })
      .then(() => fetchUserGroups(namespaceContext.state.selected.id))
  }

  useEffect(() => {
    namespaceContext.state.selected.id && fetchUserGroups(namespaceContext.state.selected.id)
  }, [namespaceContext.state.selected.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createUserGroup} />
      {userGroups.map((userGroup) => (
        <li key={userGroup.id}>
          <UserGroupCard
            userGroup={userGroup}
            fetchUserGroups={() => fetchUserGroups(namespaceContext.state.selected.id)}
          />
        </li>
      ))}
    </ol>
  )
}
