"use client";

import useFetch from "@/hooks/useFetch";
import { removeFollowing } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnFollowButton({
  following,
  followedBy,
}: {
  following: string;
  followedBy: string;
}) {
  const { send, state } = useFetch(removeFollowing);
  const router = useRouter();

  useEffect(() => {
    if (state.matches("resolved")) {
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value]);

  return (
    <button
      className="bg-red-400 border-red-400 hover:bg-red-600 hover:border-red-600 border text-white font-bold py-1 px-4 rounded-3xl w-32 disabled:bg-gray-00 disabled:border-gray-200 disabled:text-black"
      onClick={() => {
        send({ type: "FETCH", payload: { following, followedBy } });
      }}
      disabled={state.matches("pending")}
    >
      <span>{state.matches("pending") ? "..." : "Unfollow"}</span>
    </button>
  );
}
