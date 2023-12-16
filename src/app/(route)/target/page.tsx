"use client";
import { Target } from "@/app/types/Target";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TargetCard from "./components/TargetCard";
import { NamespaceContext } from "@/app/contexts/NamespaceProvider";
import AddCard from "@/app/components/card/AddCard";

export default function Page() {
  const [targets, setTargets] = useState<Target[]>([]);
  const namespaceContext = useContext(NamespaceContext);

  const fetchTargets = async () => {
    await axios.get("/rbac-service/v1/targets").then((res) => {
      setTargets(res.data);
    });
  };

  const createTarget = async (regex: string) => {
    axios
      .post("/rbac-service/v1/targets", {
        namespaceId: namespaceContext.state.namespace.id,
        objectIdRegex: regex,
      })
      .then(fetchTargets);
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      <AddCard post={createTarget} />
      {targets.map((target) => (
        <li key={target.id}>
          <TargetCard target={target} fetchTargets={fetchTargets} />
        </li>
      ))}
    </ol>
  );
}
