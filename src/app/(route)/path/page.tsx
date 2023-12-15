"use client";
import { Path } from "@/app/types/Path";
import axios from "axios";
import { useEffect, useState } from "react";
import PathCard from "./components/PathCard";

export default function Page() {
  const [paths, setPaths] = useState<Path[]>([]);
  const fetchPaths = async () => {
    await axios.get("/rbac-service/v1/paths").then((res) => {
      setPaths(res.data);
    });
  };

  useEffect(() => {
    fetchPaths();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      {paths.map((path) => (
        <li key={path.id}>
          <PathCard path={path} fetchPaths={fetchPaths} />
        </li>
      ))}
    </ol>
  );
}
