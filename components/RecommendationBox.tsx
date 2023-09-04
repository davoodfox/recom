"use client";
import useFetch from "@/hooks/useFetch";
import { getAnime, getUserByClerkId } from "@/services";
import { Recommendation, User } from "@prisma/client";
import { Anime } from "@tutkli/jikan-ts";
import Link from "next/link";
import { useEffect } from "react";

function RecommendationBox({
  recommendation,
  host,
  children,
}: {
  recommendation: Recommendation;
  host: "given" | "received";
  children?: React.ReactNode;
}) {
  const animeFetch = useFetch(getAnime);
  const anime: Anime = animeFetch.data;
  const { state: animeState, send: animeSend } = animeFetch;

  return (
    <div className="p-2 border border-gray-400 rounded-md relative">
      {children}
      <li className="flex gap-1 items-baseline">
        <h3 className="text-xl">{anime?.title}</h3>
        <span className="text-gray-800 text-xs">
          {host == "given" && "to"}
          {host == "received" && "from"}
        </span>
        {/* <Link
            href={"/users/" + user?.clerkId}
            className="text-blue-400 hover:text-blue-600"
          >
            {user?.username}
          </Link> */}
      </li>
      <div className="p-2 border border-gray-400 rounded-md">
        <p>note: {recommendation.note}</p>
      </div>
    </div>
  );
}

export default RecommendationBox;
