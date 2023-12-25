'use client'
import Card from '@/components/card/Card'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { SystemRole } from '@/types/SystemRole'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import SystemRoleDetail from './SystemRoleDetail'

export default function NamespaceDetail() {
  const [systemRoles, setSystemRoles] = useState<SystemRole[]>([])
  const namespaceContext = useContext(NamespaceContext)

  useEffect(() => {
    axios
      .get(`/rbac-service/v1/system-roles?namespace-id=${namespaceContext.state.namespace.id}`)
      .then((res) => {
        setSystemRoles(res.data)
      })
  }, [namespaceContext.state.namespace.id])

  return (
    <Card>
      <div
        className='
          overflow-y-auto
          w-full
          space-y-2
        '
      >
        <h1 className='title-medium text-primary-400'>{namespaceContext.state.namespace.name}</h1>
        <div className='flex md:space-x-2'>
          {systemRoles.map((systemRole) => (
            <SystemRoleDetail key={systemRole.id} systemRole={systemRole} />
          ))}
        </div>
      </div>
    </Card>
  )
}
