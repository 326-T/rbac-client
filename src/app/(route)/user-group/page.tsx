"use client";
import Card from "@/app/components/molecules/Card";
import { UserGroup } from "@/app/types/UserGroup";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const fetchUserGroups = async () => {
    await axios.get("/rbac-service/v1/user-groups").then((res) => {
      setUserGroups(res.data);
    });
  };

  useEffect(() => {
    fetchUserGroups();
  }, []);

  return (
    <ol className="space-y-2 w-full p-2">
      {userGroups.map((userGroup) => (
        <li key={userGroup.id}>
          <Card key={userGroup.id}>{userGroup.name}</Card>
        </li>
      ))}
    </ol>
  );
}
