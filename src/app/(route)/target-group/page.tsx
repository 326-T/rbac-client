"use client";
import Card from "@/app/components/molecules/Card";
import { TargetGroup } from "@/app/types/TargetGroup";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([]);
  const fetchTargetGroups = async () => {
    await axios
      .get("/rbac-service/v1/target-groups")
      .then((res) => {
        setTargetGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTargetGroups();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      {targetGroups.map((targetGroup) => (
        <li key={targetGroup.id}>
          <Card key={targetGroup.id}>{targetGroup.name}</Card>
        </li>
      ))}
    </ol>
  );
}
