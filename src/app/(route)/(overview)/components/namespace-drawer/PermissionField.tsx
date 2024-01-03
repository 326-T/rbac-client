import RelationField from '@/components/modal/edit-modal-content/RelationField'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { SystemRole } from '@/types/SystemRole'
import { User } from '@/types/User'
import { useContext, useEffect } from 'react'
import { findUsersBySystemRoleId, indexUsers } from '@/services/user'
import {
  deleteUserSystemRolePermission,
  insertUserSystemRolePermission,
} from '@/services/userSystemRolePermission'

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
  const namespaceContext = useContext(NamespaceContext)

  const onSaveClick = async () => {
    Promise.all([
      ...permissionReducer.state.pending.map((user: User) =>
        insertUserSystemRolePermission(namespaceContext.state.selected.id, systemRole.id, user.id),
      ),
      ...permissionReducer.state.removing.map((user: User) =>
        deleteUserSystemRolePermission(namespaceContext.state.selected.id, systemRole.id, user.id),
      ),
    ]).finally(() => {
      permissionReducer.clear()
    })
  }

  const fetchUsers = (role: SystemRole) => {
    findUsersBySystemRoleId(role.id).then((res) => {
      permissionReducer.setRelated(res.data)
    })
    indexUsers().then((res) => {
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
