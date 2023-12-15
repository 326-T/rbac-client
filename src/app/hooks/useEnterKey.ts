import { useEffect } from "react";

export const useEnterKey = (callback: () => void) => {
  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [callback]);
};
