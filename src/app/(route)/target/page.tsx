'use client'
import { useContext, useEffect, useState } from 'react'
import TargetCard from './components/TargetCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { Target } from '@/types/Target'
import { indexTargets, insertTarget } from '@/services/target'

export default function Page() {
  const [targets, setTargets] = useState<Target[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchTargets = async (namespaceId: number) => {
    indexTargets(namespaceId).then((res) => {
      setTargets(res.data)
    })
  }

  const createTarget = async (regex: string) => {
    insertTarget(namespaceContext.state.selected.id, regex).then(() =>
      fetchTargets(namespaceContext.state.selected.id),
    )
  }

  useEffect(() => {
    namespaceContext.state.selected.id && fetchTargets(namespaceContext.state.selected.id)
  }, [namespaceContext.state.selected.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createTarget} />
      {targets.map((target) => (
        <li key={target.id}>
          <TargetCard
            target={target}
            fetchTargets={() => fetchTargets(namespaceContext.state.selected.id)}
          />
        </li>
      ))}
    </ol>
  )
}
