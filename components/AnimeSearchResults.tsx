import useFetch from "@/hooks/useFetch";
import { prisma } from "@/utils/db";
import { createRecommendation } from "@/services";
import { Anime } from "@tutkli/jikan-ts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Container } from "./ui/Container";
import { Listbox } from "@headlessui/react";
import { Button } from "./ui/Button";
import AnimeBox from "./AnimeBox";
import { Text } from "./ui/Text";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Divider from "./ui/Divider";

type Inputs = {
  query: string;
};
function AnimeSearchResults({ anime }: { anime: Anime[] }) {
  const { data, state, send } = useFetch(createRecommendation);
  const [note, setNote] = useState("");
  const { userId: fromClerkId } = useAuth();
  const params = useParams();
  const toClerkId = params.slug;

  const [selectedAnime, setSelectedAnime] = useState<Anime>(anime[0]);
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
                key={anime.mal_id}
                anime={anime}
                onClick={() => {
                  setSelectedAnime(anime);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </>
      )}
      {!isOpen && (
        <Listbox value={selectedAnime} onChange={setSelectedAnime}>
          <Divider className="pb-1">
            <Text variant="medium/light">Selected Anime</Text>
          </Divider>
          <Listbox.Button className="w-full border rounded overflow-hidden">
            {selectedAnime ? (
              <AnimeBox anime={selectedAnime} key={selectedAnime.mal_id} />
            ) : (
              ""
            )}
          </Listbox.Button>
          <Listbox.Options className="border rounded overflow-hidden">
            {anime?.map((anime) => (
              <Listbox.Option key={anime.mal_id} value={anime}>
                <AnimeBox anime={anime} key={anime.mal_id} />
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      )}
    </div>
  );
}

export default AnimeSearchResults;
