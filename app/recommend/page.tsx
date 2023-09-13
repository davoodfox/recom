import AnimeSearch from "@/components/AnimeSearch";
import Note from "@/components/Note";
import UserSearch from "@/components/UserSearch";
import { Container } from "@/components/ui/Container";

export default async function page() {
  return (
    <Container title="Recommend an anime">
      <div className="flex flex-col gap-8">
        <AnimeSearch />
        <UserSearch />
        <Note />
      </div>
    </Container>
  );
}
