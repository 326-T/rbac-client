"use client";
import { DrawerContext } from "@/app/contexts/DrawerProvider";
import { useContext } from "react";

export default function DrawerRight() {
  const drawerContext = useContext(DrawerContext);

  return (
    <>
      {drawerContext.state.right.open && (
        <>
          <div
            className="
              fixed top-0 left-0
              h-full w-6/12
            "
            onClick={drawerContext.toggleRight}
          ></div>
          <div
            className="
              fixed top-0 right-0
              h-full w-6/12
              p-4 border-l-2 bg-white border-gray-200
            "
          >
            {drawerContext.state.right.component}
          </div>
        </>
      )}
    </>
  );
}
