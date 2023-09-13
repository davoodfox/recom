"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export default function RedirectButton() {
  const router = useRouter();

  return (
    <Button
      className="m-2"
      onClick={() => {
        router.push("/user-change");
      }}
    >
      Apply Changes
    </Button>
  );
}
