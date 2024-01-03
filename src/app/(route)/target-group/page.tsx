'use client'
import { useContext, useEffect, useState } from 'react'
import TargetGroupCard from './components/TargetGroupCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { TargetGroup } from '@/types/TargetGroup'
import { indexTargetGroups, insertTargetGroup } from '@/services/targetGroup'

export default function Page() {
  const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchTargetGroups = async (namespaceId: number) => {
    indexTargetGroups(namespaceId).then((res) => {
      setTargetGroups(res.data)
    })
  }

  const createTargetGroup = async (name: string) => {
    insertTargetGroup(namespaceContext.state.selected.id, name).then(() =>
      fetchTargetGroups(namespaceContext.state.selected.id),
    )
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
