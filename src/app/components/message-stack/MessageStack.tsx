"use client";
import { MessageContext } from "@/app/contexts/MessageProvider";
import { useContext } from "react";
import MessageCard from "./MessageCard";

export default function MessageStack() {
  const messageContext = useContext(MessageContext);

  return (
    <>
      <div
        className="
          fixed bottom-0 right-0 z-30
          p-2 space-y-2
          max-h-full overflow-hidden
          block
        "
      >
        {messageContext.messages.map((m) => (
          <MessageCard content={m} />
        ))}
      </div>
    </>
  );
}
