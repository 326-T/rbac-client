export interface AccessPrivilege {
  userId: number
  userName: string
  namespaceId: number
  namespaceName: string
  userGroupId: number
  userGroupName: string
  roleId: number
  roleName: string
  pathId: number
  pathRegex: string
  method: string
  targetGroupId: number
  targetGroupName: string
  targetId: number
  objectIdRegex: string
}
