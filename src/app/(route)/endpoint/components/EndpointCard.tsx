import { useContext } from 'react'
import EndpointDrawerContent from './EndpointDrawerContent'
import Card from '@/components/card/Card'
import Confirmation from '@/components/modal/Confirmation'
import OperationMenu from '@/components/pulldown/OperationMenu'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { ModalContext } from '@/contexts/ModalProvider'
import { Endpoint } from '@/types/Endpoint'
import { NamespaceContext } from '@/contexts/NamespaceProvider'
import { deleteEndpoint } from '@/services/endpoint'

export default function EndpointCard({
  endpoint,
  fetchEndpoints,
}: {
  endpoint: Endpoint
  fetchEndpoints: () => void
}) {
  const modalContext = useContext(ModalContext)
  const namespaceContext = useContext(NamespaceContext)
  const drawerContext = useContext(DrawerContext)

  const deleteTarget = () => {
    deleteEndpoint(namespaceContext.state.selected.id, endpoint.id).then(fetchEndpoints)
  }

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deleteTarget()
          modalContext.turnOff()
        }}
      />,
    )
    modalContext.turnOn()
  }

  const onDetailClick = () => {
    drawerContext.set(<EndpointDrawerContent endpoint={endpoint} onClose={fetchEndpoints} />)
    drawerContext.turnOn()
  }

  return (
    <Card>
      <div className='flex w-full items-center justify-between space-x-5'>
        <h5 className='w-1/4 body-medium'>{endpoint.method}</h5>
        <h5 className='w-1/4 body-medium'>{endpoint.pathRegex}</h5>
        <h5 className='w-1/4 body-medium'>{endpoint.targetGroupName}</h5>
        <OperationMenu onDetailClick={onDetailClick} onDeleteClick={onDeleteClick} />
      </div>
    </Card>
  )
}
