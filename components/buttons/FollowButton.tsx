"use client";

import useFetch from "@/hooks/useFetch";
import { addFollowing, removeFollowing } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FollowButton({
  mode: modeProp,
  following,
  followedBy,
}: {
  mode: "follow" | "unfollow";
  following: string;
  followedBy: string;
}) {
  const [mode, setMode] = useState(modeProp);
  const { send, state } = useFetch(
    mode == "follow" ? addFollowing : removeFollowing
  );
  // const router = useRouter();

  // useEffect(() => {
  //   if (state.matches("resolved")) {
  //     router.refresh();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.value]);

  useEffect(() => {
    console.log(state.value);
  });

  if (mode == "follow") {
    return (
      <button
        className="bg-white border-gray-600 hover:bg-gray-200 border text-black font-bold py-1 px-4 rounded-3xl w-32 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-white disabled:animate-pulse"
        onClick={() => {
          send({ type: "FETCH", payload: { following, followedBy } });
          setMode("unfollow");
        }}
        disabled={state.matches("pending")}
      >
        {state.matches("pending") ? "..." : "Follow"}
      </button>
    );
  }

  if (mode == "unfollow") {
    return (
      <button
        className="bg-red-400 border-red-400 hover:bg-red-600 hover:border-red-600 border text-white font-bold py-1 px-4 rounded-3xl w-32 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-white disabled:animate-pulse"
        onClick={() => {
          send({ type: "FETCH", payload: { following, followedBy } });
          setMode("follow");
        }}
        disabled={state.matches("pending")}
      >
        <span>{state.matches("pending") ? "..." : "Unfollow"}</span>
      </button>
    );
  }
}
