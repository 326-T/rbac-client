"use client";
import { Target } from "@/app/types/Target";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TargetCard from "./components/TargetCard";

export default function Page() {
  const [targets, setTargets] = useState<Target[]>([]);

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
          <TargetCard target={target} fetchTargets={fetchTargets} />
        </li>
      ))}
    </ol>
  );
}
