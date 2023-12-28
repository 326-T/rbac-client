export interface Namespace {
  id: number
  name: string
  createdBy: number
  createdAt: Date
  updatedAt: Date
}

export const namespaceInit = {
  id: 0,
  name: '',
  createdBy: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
}
