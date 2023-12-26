import RelationField from '@/components/modal/edit-modal-content/RelationField'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { SystemRole } from '@/types/SystemRole'
import { User } from '@/types/User'
import axios from 'axios'
import { useEffect } from 'react'

export default function PermissionField({
  key,
  edit,
  systemRole,
  doSave,
}: {
  key?: string
  edit: boolean
  systemRole: SystemRole
  doSave: number
}) {
  const permissionReducer = useRelationReducer<User>(
    (one: User, another: User) => one.id === another.id,
  )

  const onSaveClick = async () => {
    Promise.all([
      ...permissionReducer.state.pending.map((user: User) =>
        axios.post('/rbac-service/v1/user-system-role-permissions', {
          systemRoleId: systemRole.id,
          userId: user.id,
        }),
      ),
      ...permissionReducer.state.removing.map((user: User) =>
        axios.delete(
          `/rbac-service/v1/user-system-role-permissions?system-role-id=${systemRole.id}&user-id=${user.id}`,
        ),
      ),
    ]).finally(() => {
      permissionReducer.clear()
    })
  }

  const fetchUsers = (role: SystemRole) => {
    axios.get(`/rbac-service/v1/users/system?system-role-id=${role.id}`).then((res) => {
      permissionReducer.setRelated(res.data)
    })
    axios.get('/rbac-service/v1/users').then((res) => {
      permissionReducer.setAll(res.data)
    })
  }

  useEffect(() => {
    fetchUsers(systemRole)
    return () => {
      permissionReducer.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemRole])

  useEffect(() => {
    doSave > 0 && onSaveClick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doSave])

  return (
    <div key={key}>
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
    </div>
  )
}
