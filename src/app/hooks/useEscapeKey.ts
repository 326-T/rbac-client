import { useEffect } from "react";

export const useEscapeKey = (callback: () => void) => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);
};
