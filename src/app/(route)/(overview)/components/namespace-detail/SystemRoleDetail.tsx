'use client'
import { SystemRole } from '@/types/SystemRole'
import { User } from '@/types/User'
import { useEffect, useState } from 'react'
import { findUsersBySystemRoleId } from '@/services/user'

export default function SystemRoleDetail({ systemRole }: { systemRole: SystemRole }) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    systemRole.id &&
      findUsersBySystemRoleId(systemRole.id).then((res) => {
        setUsers(res.data)
      })
  }, [systemRole.id])

  return (
    <div className='block space-y-2'>
      <h2 className='title-small text-primary-300'>
        {systemRole.permission === 'WRITE' ? '編集権限' : '参照権限'}
      </h2>
      {users.map((user) => (
        <h3 className='body-medium' key={user.id}>
          {user.name}
        </h3>
      ))}
    </div>
  )
}
