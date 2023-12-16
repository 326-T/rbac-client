import MessageStack from '../components/message-stack/MessageStack'
import Modal from '../components/modal/Modal'
import DrawerRight from '@/app/components/DrawerRight'
import Loading from '@/app/components/Loading'
import AppHeader from '@/app/components/app-bar/AppHeader'
import NavigationList from '@/app/components/navigation-list/NavigationList'

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <NavigationList />
      <DrawerRight />
      <div
        className='
          fixed z-0
          h-full w-full
          pt-20 md:pl-64
          overflow-y-auto
          bg-neutral-200
        '
      >
        {children}
      </div>
      <Loading />
      <MessageStack />
      <Modal />
    </>
  )
}
