"use client";
import axios, { Axios, AxiosInstance } from "axios";
import { createContext, useEffect, useState } from "react";

export const AxiosContext = createContext<{}>({});

export function AxiosProvider({ children }: { children: React.ReactNode }) {
  const [isAxiosReady, setIsAxiosReady] = useState(false);

  const setUpAxios = async () => {
    const frontClient: AxiosInstance = axios.create();
    frontClient
      .get("api/axios")
      .then((res) => {
        console.log(res.data);
        axios.defaults.baseURL = res.data.baseUrl;
        axios.defaults.headers.common["Authorization"] = res.data.authorization;
      })
      .finally(() => {
        setIsAxiosReady(true);
      });
  };

  useEffect(() => {
    setUpAxios();
  }, []);

  return (
    <AxiosContext.Provider value={{}}>
      {isAxiosReady && children}
    </AxiosContext.Provider>
  );
}
