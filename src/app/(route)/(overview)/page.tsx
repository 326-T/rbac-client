import NamespaceDetail from './components/namespace-detail/NamespaceDetail'
import PermissionTable from './components/PermissionTable'

export default function TopPage() {
  return (
    <div className='m-2 space-y-2'>
      <NamespaceDetail />
      <PermissionTable />
    </div>
  )
}
