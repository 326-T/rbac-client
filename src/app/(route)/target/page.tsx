"use client";
import { Target } from "@/app/types/Target";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TargetCard from "./components/TargetCard";
import { DrawerContext } from "@/app/contexts/DrawerProvider";
import { MessageContext } from "@/app/contexts/MessageProvider";

export default function Page() {
  const [targets, setTargets] = useState<Target[]>([]);
  const messageContext = useContext(MessageContext);

  const fetchTargets = async () => {
    await axios.get("/rbac-service/v1/targets").then((res) => {
      setTargets(res.data);
    });
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      {targets.map((target) => (
        <li key={target.id}>
          <TargetCard target={target} />
        </li>
      ))}
    </ol>
  );
}
