'use client'
import SortedTable from '@/components/table/SortedTable'
import Card from '@/components/card/Card'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { AccessPrivilege } from '@/types/AccessPrivilege'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

export default function PermissionTable() {
  const [accessPrivileges, setAccessPrivileges] = useState<AccessPrivilege[]>([])
  const namespaceContext = useContext(NamespaceContext)

  useEffect(() => {
    axios
      .get(`/rbac-service/v1/access-privileges?namespace-id=${namespaceContext.state.selected.id}`)
      .then((res) => {
        setAccessPrivileges(res.data)
      })
  }, [namespaceContext.state.selected.id])

  return (
    <Card>
      <div
        className='
          overflow-y-auto
          w-full
          space-y-3
        '
      >
        <h1 className='title-medium text-primary-400'>Permission Table</h1>
        <SortedTable
          headers={[
            'User',
            'User Group',
            'Role',
            'Method',
            'Path Regex',
            'Object Group',
            'Object ID Regex',
          ]}
          rows={accessPrivileges.map((accessPrivilege) => [
            accessPrivilege.userName,
            accessPrivilege.userGroupName,
            accessPrivilege.roleName,
            accessPrivilege.method,
            accessPrivilege.pathRegex,
            accessPrivilege.targetGroupName,
            accessPrivilege.objectIdRegex,
          ])}
        />
      </div>
    </Card>
  )
}
