import AnimeSearch from "./_components/AnimeSearch";
import Note from "./_components/Note";
import UserSearch from "./_components/UserSearch";
import { Container } from "@/components/ui/Container";
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
