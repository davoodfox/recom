import useFetch from "@/hooks/useFetch";
import { prisma } from "@/utils/db";
import { createRecommendation } from "@/services";
import { Anime as MalAnime } from "@tutkli/jikan-ts";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Container } from "./ui/Container";
import { Listbox } from "@headlessui/react";
import { Button } from "./ui/Button";
import AnimeBox, { Loader } from "./AnimeBox";
import { Text } from "./ui/Text";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Divider from "./ui/Divider";
import { createAnime } from "@/services/anime";
import { RecommendationContext } from "@/context/recommendation.context";
import { Anime } from "@prisma/client";

type Inputs = {
  query: string;
};
function AnimeSearchResults({ anime }: { anime: MalAnime[] }) {
  const { setRecommendationState } = useContext(RecommendationContext);

  const createAnimeFetch = useFetch(createAnime, (res) => {
    setRecommendationState((prev) => ({
      ...prev,
      animeId: res.id,
    }));
  });
  const { state: createAnimeState, send: createAnimeSend } = createAnimeFetch;
  const { data: createAnimeData }: { data: Anime } = createAnimeFetch;

  const params = useParams();

  const [selectedAnime, setSelectedAnime] = useState<MalAnime>(anime[0]);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {isOpen && (
        <>
          <Divider className="pb-1">
            <Text variant="medium/light">
              <p>Select an Anime</p>
            </Text>
          </Divider>
          <div className="border rounded overflow-hidden">
            {anime?.map((anime) => (
              <AnimeBox
                anime={anime}
                key={anime.mal_id}
                onClick={() => {
                  createAnimeSend({
                    type: "FETCH",
                    payload: {
                      title: anime.title,
                      imageUrl: anime.images.jpg.image_url,
                      synopsis: anime.synopsis,
                      airing: anime.airing,
                      year: anime.year,
                      malUrl: anime.url,
                      malId: anime.mal_id,
                    },
                  });
                  setSelectedAnime(anime);
                  setIsOpen(false);
                }}
                className="hover:bg-blue-200"
              />
            ))}
          </div>
        </>
      )}
      {createAnimeState.matches("pending") && <Loader label="Selected Anime" />}
      {!isOpen && createAnimeState.matches("resolved") && (
        <>
          <Divider className="pb-1">
            <Text variant="medium/light">Selected Anime</Text>
          </Divider>
          {selectedAnime ? (
            <div className="w-full border rounded overflow-hidden cursor-default">
              <AnimeBox
                anime={selectedAnime}
                key={selectedAnime.mal_id}
                className="cursor-default"
              />
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default AnimeSearchResults;
