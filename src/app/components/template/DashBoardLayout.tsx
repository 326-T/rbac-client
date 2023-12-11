import AppHeader from "@/components/molecules/AppHeader";
import NavigationList from "@/components/organisms/NavigationList";
import DrawerRight from "@/components/organisms/DrawerRight";
import Loading from "@/components/organisms/Loading";

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
      <div className="flex pt-20 pl-64 min-h-screen w-full bg-neutral-100">
        {children}
      </div>
      <Loading />
    </>
  );
}
