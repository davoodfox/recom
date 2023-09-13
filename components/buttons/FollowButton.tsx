"use client";

import useFetch from "@/hooks/useFetch";
import { addFollowing, removeFollowing } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

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

  if (mode == "follow") {
    return (
      <Button
        intent="primary"
        rounded
        onClick={() => {
          send({ type: "FETCH", payload: { following, followedBy } });
          setMode("unfollow");
        }}
        disabled={state.matches("pending")}
      >
        Follow
      </Button>
    );
  }

  if (mode == "unfollow") {
    return (
      <Button
        intent="danger"
        rounded
        onClick={() => {
          send({ type: "FETCH", payload: { following, followedBy } });
          setMode("follow");
        }}
        disabled={state.matches("pending")}
      >
        <span>Unfollow</span>
      </Button>
    );
  }
}
