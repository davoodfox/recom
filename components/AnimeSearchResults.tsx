import useFetch from "@/hooks/useFetch";
import { prisma } from "@/utils/db";
import { createRecommendation } from "@/services";
import { Anime } from "@tutkli/jikan-ts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Inputs = {
  query: string;
};
function AnimeSearchResults({
  anime,
  setData,
}: {
  anime: Anime[] | null;
  setData: React.Dispatch<any>;
}) {
  const { data, state, send } = useFetch(createRecommendation);
  const [note, setNote] = useState("");
  const { userId: fromClerkId } = useAuth();
  const params = useParams();
  const toClerkId = params.slug;

  useEffect(() => {
    if (state.matches("resolved")) {
      setData(data);
    }
  }, [state, data, setData]);

  if (!anime) {
    return <div>no anime to show</div>;
  }
  return (
    <div className="border border-black absolute my-1 bg-white rounded-sm shadow-sm w-full">
      <label htmlFor="note">Write a note:</label>
      <textarea
        id="note"
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />
      <p>Select an anime</p>
      {anime.map((anime) => (
        <div
          className="flex border-b border-gray-900 hover:bg-blue-200 cursor-pointer"
          key={anime.mal_id}
          onClick={(e) => {
            send({
              type: "FETCH",
              payload: {
                malId: anime.mal_id,
                note,
                fromClerkId: fromClerkId,
                toClerkId: toClerkId,
              },
            });
          }}
        >
          <div className="w-14 h-14 min-w-[3.5rem] flex">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="flex-grow object-cover"
            />
          </div>
          <h2 className="h-14 p-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {anime.title}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default AnimeSearchResults;
