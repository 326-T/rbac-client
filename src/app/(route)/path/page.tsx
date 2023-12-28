'use client'
import { useContext, useEffect, useState } from 'react'
import PathCard from './components/PathCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { Path } from '@/types/Path'
import { indexPaths, insertPath } from '@/services/path'

export default function Page() {
  const [paths, setPaths] = useState<Path[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchPaths = async (namespaceId: number) => {
    indexPaths(namespaceId).then((res) => {
      setPaths(res.data)
    })
  }

  const createPath = async (regex: string) => {
    insertPath(namespaceContext.state.selected.id, regex).then(() =>
      fetchPaths(namespaceContext.state.selected.id),
    )
  }

  useEffect(() => {
    namespaceContext.state.selected.id && fetchPaths(namespaceContext.state.selected.id)
  }, [namespaceContext.state.selected.id])

  return (
    <ol className='space-y-2 w-full p-2'>
      <AddCard post={createPath} />
      {paths.map((path) => (
        <li key={path.id}>
          <PathCard path={path} fetchPaths={() => fetchPaths(namespaceContext.state.selected.id)} />
        </li>
      ))}
    </ol>
  )
}
