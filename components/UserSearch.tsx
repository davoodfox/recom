import { prisma } from "@/utils/db";
import AnimeSearchResults from "./AnimeSearchResults";
import { auth } from "@clerk/nextjs";
import ComboBox from "./ComboBox";
import { Text } from "./ui/Text";

async function UserSearch() {
  const { userId }: { userId: string | null } = auth();
  const user = await prisma.user.findUnique({
    where: { clerkId: userId as string },
    include: { following: true },
  });
  if (user) {
    return (
      <div>
        <div className="pb-1">
          <Text variant="medium/light">Select user from your followings</Text>
        </div>
        <ComboBox data={user?.following} />
      </div>
    );
  }
}

export default UserSearch;
