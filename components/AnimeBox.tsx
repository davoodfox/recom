import { Anime } from "@tutkli/jikan-ts";
import { Text } from "./ui/Text";
import { createAnime } from "@/actions/anime";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;
interface Props extends ButtonProps {
  anime: Anime;
}

export default function AnimeBox({ anime, onClick, className }: Props) {
  return (
    <button
      key={anime.mal_id}
      className={"w-full flex items-center " + className}
      onClick={onClick}
    >
      <div className="w-14 h-14 min-w-[3.5rem] flex">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className={"flex-grow object-cover"}
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
