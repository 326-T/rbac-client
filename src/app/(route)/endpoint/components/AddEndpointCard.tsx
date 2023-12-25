'use client'
import axios from 'axios'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import Select from '@/components/Select'
import CustomButton from '@/components/button/CustomButton'
import Card from '@/components/card/Card'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { useClickOutSide } from '@/hooks/useClickOutSide'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { Method } from '@/types/Method'
import { Path } from '@/types/Path'
import { TargetGroup } from '@/types/TargetGroup'

export default function AddEndpointCard({ fetchEndpoints }: { fetchEndpoints: () => void }) {
  const [edit, setEdit] = useState<boolean>(false)
  const [methods, setMethods] = useState<Method[]>([])
  const [paths, setPaths] = useState<Path[]>([])
  const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([])
  const [method, setMethod] = useState<Method | null>(null)
  const [path, setPath] = useState<Path | null>(null)
  const [targetGroup, setTargetGroup] = useState<TargetGroup | null>(null)
  const ref = useRef(null)
  const namespaceContext = useContext(NamespaceContext)
  const blank = useMemo(() => !method || !path || !targetGroup, [method, path, targetGroup])

  const onEnter = () => {
    if (!blank) {
      axios
        .post('/rbac-service/v1/endpoints', {
          namespaceId: namespaceContext.state.selected.id,
          method: method!.name,
          pathId: path!.id,
          targetGroupId: targetGroup!.id,
        })
        .then(fetchEndpoints)
        .finally(() => setEdit(false))
    }
  }

  useEffect(() => {
    axios
      .get(`/rbac-service/v1/paths?namespace-id=${namespaceContext.state.selected.id}`)
      .then((res) => {
        setPaths(res.data)
      })
    axios
      .get(`/rbac-service/v1/target-groups?namespace-id=${namespaceContext.state.selected.id}`)
      .then((res) => {
        setTargetGroups(res.data)
      })
    axios.get('/rbac-service/v1/methods').then((res) => {
      setMethods(res.data)
    })
  }, [namespaceContext.state.selected.id])

  useClickOutSide(ref, () => setEdit(false))
  useEscapeKey(() => setEdit(false))

  return (
    <div ref={ref}>
      {!edit ? (
        <button
          onClick={() => setEdit(true)}
          className='
            btn
            flex w-full h-16
            bg-white
          '
        >
          <FiPlus />
        </button>
      ) : (
        <Card>
          <div className='flex w-full items-center justify-between space-x-5'>
            <Select<Method>
              placeholder='HTTP Method'
              options={methods}
              onSelect={setMethod}
              getName={(method: Method) => method.name}
            />
            <Select<Path>
              placeholder='Path'
              options={paths}
              onSelect={setPath}
              getName={(path: Path) => path.regex}
            />
            <Select<TargetGroup>
              placeholder='Object Group'
              options={targetGroups}
              onSelect={setTargetGroup}
              getName={(targetGroup: TargetGroup) => targetGroup.name}
            />
            <CustomButton theme='SAVE' onClick={onEnter} disabled={blank} />
          </div>
        </Card>
      )}
    </div>
  )
}
