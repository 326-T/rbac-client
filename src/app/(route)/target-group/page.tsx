'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import TargetGroupCard from './components/TargetGroupCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { TargetGroup } from '@/types/TargetGroup'

export default function Page() {
  const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchTargetGroups = async (namespaceId: number) => {
    axios.get(`/rbac-service/v1/${namespaceId}/target-groups`).then((res) => {
      setTargetGroups(res.data)
    })
  }

  const createTargetGroup = async (name: string) => {
    axios
      .post(`/rbac-service/v1/${namespaceContext.state.selected.id}/target-groups`, {
        name: name,
      })
      .then(() => fetchTargetGroups(namespaceContext.state.selected.id))
  }

  useEffect(() => {
    namespaceContext.state.selected.id && fetchTargetGroups(namespaceContext.state.selected.id)
  }, [namespaceContext.state.selected.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createTargetGroup} />
      {targetGroups.map((targetGroup) => (
        <li key={targetGroup.id}>
          <TargetGroupCard
            targetGroup={targetGroup}
            fetchTargetGroups={() => fetchTargetGroups(namespaceContext.state.selected.id)}
          />
        </li>
      ))}
    </ol>
  )
}
