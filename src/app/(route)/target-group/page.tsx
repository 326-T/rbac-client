'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { TargetGroup } from '@/types/TargetGroup'
import TargetGroupCard from './components/TargetGroupCard'

export default function Page() {
  const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchTargetGroups = async (namespaceId: number) => {
    axios.get(`/rbac-service/v1/target-groups?namespace-id=${namespaceId}`).then((res) => {
      setTargetGroups(res.data)
    })
  }

  const createTargetGroup = async (name: string) => {
    axios
      .post('/rbac-service/v1/target-groups', {
        namespaceId: namespaceContext.state.namespace.id,
        name: name,
      })
      .then(() => fetchTargetGroups(namespaceContext.state.namespace.id))
  }

  useEffect(() => {
    fetchTargetGroups(namespaceContext.state.namespace.id)
  }, [namespaceContext.state.namespace.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createTargetGroup} />
      {targetGroups.map((targetGroup) => (
        <li key={targetGroup.id}>
          <TargetGroupCard
            targetGroup={targetGroup}
            fetchTargetGroups={() => fetchTargetGroups(namespaceContext.state.namespace.id)}
          />
        </li>
      ))}
    </ol>
  )
}
