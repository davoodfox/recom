import { Anime } from "@tutkli/jikan-ts";
import { Button } from "./ui/Button";
import { Text } from "./ui/Text";
import { ComponentProps } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";
import Divider from "./ui/Divider";

type ButtonProps = ComponentProps<"button">;
interface Props extends ButtonProps {
  anime: Anime;
}
export function Loader({ label }: { label?: string }) {
  return (
    <div>
      {label && (
        <Divider className="pb-1">
          <Text variant="medium/light">{label}</Text>
        </Divider>
      )}
      <div className="overflow-hidden rounded-md">
        <ContentLoader
          speed={2}
          width={1000}
          height={58}
          viewBox="0 0 1000 58"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" width="1000" height="58" />
        </ContentLoader>
      </div>
    </div>
  );
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
