"use client";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalProvider";
import Confirmation from "./Confirmation";

export default function () {
  const modalContext = useContext(ModalContext);

  return (
    <>
      {false && (
        <div
          className="
            fixed top-0 left-0 z-40
            flex items-center
            w-full h-full
            justify-center 
            opacity-50 bg-gray-600
          "
          aria-label="読み込み中"
        >
          <div className="p-5 bg-white rounded-lg">
            {/* {modalContext.state.component} */}
            <Confirmation />
          </div>
        </div>
      )}
    </>
  );
}
