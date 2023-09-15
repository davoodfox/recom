import AnimeSearch from "@/components/AnimeSearch";
import Note from "@/components/Note";
import UserSearch from "@/components/UserSearch";
import { Container } from "@/components/ui/Container";
import { RecommendationContextProvider } from "@/context/recommendation.context";
import { currentUser } from "@clerk/nextjs";

export default async function page() {
  const user = await currentUser();
  return (
    <Container title="Recommend an anime">
      <div className="flex flex-col gap-8">
        <RecommendationContextProvider
          init={{
            animeId: null,
            fromUsername: user?.username as string,
            note: "",
            toUsername: null,
          }}
        >
          <AnimeSearch />
          <UserSearch />
          <Note />
        </RecommendationContextProvider>
      </div>
    </Container>
  );
}
