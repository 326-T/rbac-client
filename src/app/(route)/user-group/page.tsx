'use client'
import { useContext, useEffect, useState } from 'react'
import UserGroupCard from './components/UserGroupCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { UserGroup } from '@/types/UserGroup'
import { indexUserGroups, insertUserGroup } from '@/services/userGroup'

export default function Page() {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchUserGroups = async (namespaceId: number) => {
    indexUserGroups(namespaceId).then((res) => {
      setUserGroups(res.data)
    })
  }

  const createUserGroup = async (name: string) => {
    insertUserGroup(namespaceContext.state.selected.id, name).then(() =>
      fetchUserGroups(namespaceContext.state.selected.id),
    )
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
