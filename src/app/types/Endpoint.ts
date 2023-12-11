export interface Endpoint {
  id: number;
  namespaceId: number;
  pathId: number;
  targetGroupId: number;
  method: string;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}
