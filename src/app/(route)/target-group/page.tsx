"use client";
import AddCard from "@/app/components/card/AddCard";
import Card from "@/app/components/card/Card";
import { NamespaceContext } from "@/app/contexts/NamespaceProvider";
import { TargetGroup } from "@/app/types/TargetGroup";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([]);
  const namespaceContext = useContext(NamespaceContext);
  const fetchTargetGroups = async () => {
    await axios.get("/rbac-service/v1/target-groups").then((res) => {
      setTargetGroups(res.data);
    });
  };

  const createTargetGroup = async (name: string) => {
    axios
      .post("/rbac-service/v1/target-groups", {
        namespaceId: namespaceContext.state.namespace.id,
        name: name,
      })
      .then(fetchTargetGroups);
  };

  useEffect(() => {
    fetchTargetGroups();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      <AddCard post={createTargetGroup} />
      {targetGroups.map((targetGroup) => (
        <li key={targetGroup.id}>
          <Card key={targetGroup.id}>{targetGroup.name}</Card>
        </li>
      ))}
    </ol>
  );
}
