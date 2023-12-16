'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import AddCard from '@/app/components/card/AddCard'
import Card from '@/app/components/card/Card'
import { NamespaceContext } from '@/app/contexts/NamespaceProvider'
import { UserGroup } from '@/app/types/UserGroup'

export default function Page() {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchUserGroups = async () => {
    await axios.get('/rbac-service/v1/user-groups').then((res) => {
      setUserGroups(res.data)
    })
  }

  const createUserGroup = async (name: string) => {
    axios
      .post('/rbac-service/v1/user-groups', {
        namespaceId: namespaceContext.state.namespace.id,
        name: name,
      })
      .then(fetchUserGroups)
  }

  useEffect(() => {
    fetchUserGroups()
  }, [])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createUserGroup} />
      {userGroups.map((userGroup) => (
        <li key={userGroup.id}>
          <Card key={userGroup.id}>{userGroup.name}</Card>
        </li>
      ))}
    </ol>
  )
}
