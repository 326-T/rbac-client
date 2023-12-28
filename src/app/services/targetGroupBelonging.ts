import axios from 'axios'

export const insertTargetGroupBelonging = (
  namespaceId: number,
  targetId: number,
  targetGroupId: number,
) => {
  return axios.post(`/rbac-service/v1/${namespaceId}/target-group-belongings`, {
    targetId: targetId,
    targetGroupId: targetGroupId,
  })
}

export const deleteTargetGroupBelonging = (
  namespaceId: number,
  targetId: number,
  targetGroupId: number,
) => {
  return axios.delete(
    `/rbac-service/v1/${namespaceId}/target-group-belongings?target-group-id=${targetGroupId}&target-id=${targetId}`,
  )
}
