import { Anime } from "@tutkli/jikan-ts";
import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

export default function AnimeBox({
  anime,
  onClick,
}: {
  anime: Anime;
  onClick?: () => void;
}) {
  return (
    <button
      key={anime.mal_id}
      className="w-full flex items-center hover:bg-blue-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-14 h-14 min-w-[3.5rem] flex">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="flex-grow object-cover"
        />
      </div>
      <Text variant="small/light">
        <h2 className="p-2 text-left overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {anime.title}
        </h2>
      </Text>
    </button>
  );
}
