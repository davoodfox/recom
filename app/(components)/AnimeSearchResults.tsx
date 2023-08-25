import { Anime } from "@tutkli/jikan-ts";

function AnimeSearchResults({ anime }: { anime: Anime[] | null }) {
  if (!anime) {
    return <div>no anime to show</div>;
  }
  return (
    <div className="border border-black absolute my-1 bg-white rounded-sm shadow-sm w-full">
      {anime.map((anime) => (
        <div className="flex border-b border-gray-900" key={anime.mal_id}>
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
