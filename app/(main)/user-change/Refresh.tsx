"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Refresh() {
  const router = useRouter();
  router.refresh();
  router.push("/");
  return <div></div>;
}
