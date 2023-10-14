import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import Refresh from "./Refresh";

async function createNewUser() {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });
  if (match) {
    await prisma.user.update({
      where: {
        clerkId: user?.id as string,
      },
      data: {
        clerkId: user?.id as string,
        username: user?.username as string,
        imageUrl: user?.imageUrl as string,
      },
    });
  }
}

async function Page() {
  await createNewUser();
  return (
    <div className="flex items-center justify-center">
      User updates applied.
      <Refresh />
    </div>
  );
}

export default Page;
