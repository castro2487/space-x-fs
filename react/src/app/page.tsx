"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { LaunchesList } from "@/containers/LaunchesList";
import { Login } from "@/views/Login";
import { Layout } from "@/components/Layout";

export default function Home() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Login />;
  }

  return (
    <Layout>
      <LaunchesList />
    </Layout>
  );
}
