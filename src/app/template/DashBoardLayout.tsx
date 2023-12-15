import AppHeader from "@/app/components/app-bar/AppHeader";
import NavigationList from "@/app/components/navigation-list/NavigationList";
import DrawerRight from "@/app/components/DrawerRight";
import Loading from "@/app/components/Loading";
import MessageStack from "../components/message-stack/MessageStack";
import Modal from "../components/modal/Modal";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <NavigationList />
      <DrawerRight />
      <div className="flex pt-20 md:pl-64 min-h-screen w-full bg-neutral-100">
        {children}
      </div>
      <Loading />
      <MessageStack />
      <Modal />
    </>
  );
}
