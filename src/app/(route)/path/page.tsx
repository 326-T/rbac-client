'use client'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import PathCard from './components/PathCard'
import AddCard from '@/components/card/AddCard'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { Path } from '@/types/Path'

export default function Page() {
  const [paths, setPaths] = useState<Path[]>([])
  const namespaceContext = useContext(NamespaceContext)

  const fetchPaths = async (namespaceId: number) => {
    axios.get(`/rbac-service/v1/${namespaceId}/paths`).then((res) => {
      setPaths(res.data)
    })
  }

  const createPath = async (regex: string) => {
    axios
      .post(`/rbac-service/v1/${namespaceContext.state.selected.id}/paths`, {
        regex: regex,
      })
      .then(() => fetchPaths(namespaceContext.state.selected.id))
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
