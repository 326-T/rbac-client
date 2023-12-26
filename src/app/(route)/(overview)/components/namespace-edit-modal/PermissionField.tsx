import RelationField from '@/components/modal/edit-modal-content/RelationField'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { SystemRole } from '@/types/SystemRole'
import { User } from '@/types/User'
import axios from 'axios'
import { useEffect } from 'react'

export default function PermissionField({
  edit,
  systemRole,
}: {
  edit: boolean
  systemRole: SystemRole
}) {
  const permissionReducer = useRelationReducer<User>(
    (one: User, another: User) => one.id === another.id,
  )

  const fetchUsers = (role: SystemRole) => {
    axios.get(`/rbac-service/v1/users/system?system-role-id=${role.id}`).then((res) => {
      permissionReducer.setRelated(res.data)
    })
  }

  useEffect(() => {
    fetchUsers(systemRole)
    return () => {
      permissionReducer.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemRole])

  return (
    <>
      <h2 className='title-small text-primary-300'>
        {systemRole.permission === 'WRITE' ? '編集権限' : '参照権限'}
      </h2>
      <RelationField
        remainingRelations={permissionReducer.remaining}
        candidates={permissionReducer.candidates}
        pendingRelations={permissionReducer.state.pending}
        getName={(user: User) => user.name}
        onAddRelation={permissionReducer.add}
        onDeleteRelation={permissionReducer.remove}
        disabled={!edit}
      />
    </>
  )
}
