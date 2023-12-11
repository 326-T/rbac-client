"use client";
import Card from "@/app/components/molecules/Card";
import { Path } from "@/app/types/Path";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [paths, setPaths] = useState<Path[]>([]);
  const fetchPaths = async () => {
    await axios
      .get("/rbac-service/v1/paths")
      .then((res) => {
        setPaths(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPaths();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      {paths.map((path) => (
        <li key={path.id}>
          <Card key={path.id}>{path.regex}</Card>
        </li>
      ))}
    </ol>
  );
}
