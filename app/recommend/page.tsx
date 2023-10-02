import { getMalAnime } from "@/actions/malAnime";
import { createRecommendation } from "@/actions/recommendations";
import AnimeSearch from "@/components/AnimeSearch";
import Note from "@/components/Note";
import UserSearch from "@/components/UserSearch";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/v2/Input";
import { RecommendationContextProvider } from "@/context/recommendation.context";
import { currentUser } from "@clerk/nextjs";
import FormAction from "./_components/FormAction";
import RecommendationsTable from "../dashboard/_components/RecommendationsTable";

export default async function page() {
  const user = await currentUser();
  return (
    <Container title="Recommend an anime">
      <div className="flex flex-col gap-8">
        <RecommendationContextProvider
          init={{
            animeId: "",
            fromUsername: user?.username as string,
            note: "",
            toUsername: "",
          }}
        >
          <AnimeSearch />
          <UserSearch />
          <Note />
          <FormAction />
          <RecommendationsTable host="given" />
        </RecommendationContextProvider>
      </div>
    </Container>
  );
}
