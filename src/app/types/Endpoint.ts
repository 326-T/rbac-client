export interface Endpoint {
  id: number
  namespaceId: number
  namespaceName: string
  pathId: number
  pathRegex: string
  targetGroupId: number
  targetGroupName: string
  method: string
  createdBy: number
  createdAt: Date
  updatedAt: Date
}
