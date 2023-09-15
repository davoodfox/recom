function createURL(path: string) {
  return window.location.origin + path;
}

export async function createAnime({
  title,
  imageUrl,
  synopsis,
  airing,
  year,
  malUrl,
  malId,
}: {
  title: string;
  imageUrl: string;
  synopsis: string;
  airing: boolean;
  year: number;
  malUrl: string;
  malId: number;
}) {
  const res = await fetch(
    new Request(createURL("/api/createAnime"), {
      method: "POST",
      body: JSON.stringify({
        title,
        imageUrl,
        synopsis,
        airing,
        year,
        malUrl,
        malId,
      }),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}
