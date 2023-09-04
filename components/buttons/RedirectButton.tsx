"use client";
import { useRouter } from "next/navigation";

export default function RedirectButton() {
  const router = useRouter();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-md"
      onClick={() => {
        router.push("/user-change");
      }}
    >
      Apply Changes
    </button>
  );
}
