"use client";
import Card from "@/app/components/Card";
import { Role } from "@/app/types/Role";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [roles, setRoles] = useState<Role[]>([]);
  const fetchRoles = async () => {
    await axios
      .get("/rbac-service/v1/roles")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      {roles.map((role) => (
        <li key={role.id}>
          <Card key={role.id}>{role.name}</Card>
        </li>
      ))}
    </ol>
  );
}
