import { useClickOutSide } from "@/app/hooks/useClickOutSide";
import { useEffect, useRef } from "react";

export default function MenuField({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) {
  const ref = useRef(null);
  useClickOutSide(ref, close);

  return (
    <div
      ref={ref}
      className="
        absolute top-full right-0
      "
    >
      {children}
    </div>
  );
}
