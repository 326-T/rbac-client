"use client";
import { LoadingContext } from "@/app/contexts/LoadingProvider";
import { useContext } from "react";

export default function Loading() {
  const loadingContext = useContext(LoadingContext);

  return (
    <>
      {loadingContext.state && (
        <div
          className="
        fixed top-0 left-0 z-50
        flex items-center
        w-full h-full
        justify-center 
        opacity-50 bg-white
      "
          aria-label="読み込み中"
        >
          <div className="animate-ping h-2 w-2 bg-primary-600 rounded-full"></div>
          <div className="animate-ping h-2 w-2 bg-primary-600 rounded-full mx-4"></div>
          <div className="animate-ping h-2 w-2 bg-primary-600 rounded-full"></div>
        </div>
      )}
    </>
  );
}
