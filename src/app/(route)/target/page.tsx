"use client";
import Card from "@/app/components/molecules/Card";
import { Target } from "@/app/types/Target";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [targets, setTargets] = useState<Target[]>([]);
  const fetchTargets = async () => {
    await axios
      .get("/rbac-service/v1/targets")
      .then((res) => {
        setTargets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      {targets.map((target) => (
        <li key={target.id}>
          <Card key={target.id}>{target.objectIdRegex}</Card>
        </li>
      ))}
    </ol>
  );
}
