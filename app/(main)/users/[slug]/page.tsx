import Image from "next/image";
import { prisma } from "@/utils/db";
import { currentUser as getCurrentUser } from "@clerk/nextjs";
import FollowButton from "@/components/buttons/FollowButton";

async function Page({ params: { slug } }: { params: { slug: string } }) {
  const user = await prisma.user.findUnique({
    where: { username: slug },
    include: { recommendationsReceived: true },
  });
  const currentClerkUser = await getCurrentUser();
  const currentUser = await prisma.user.findUnique({
    where: { clerkId: currentClerkUser?.id },
  });

  function isUserCurrentUser() {
    if (user?.id == currentUser?.id) {
      return true;
    } else {
      return false;
    }
  }

  function isFollowing() {
    if (user?.followedByIDs.includes(currentUser?.id ? currentUser.id : "")) {
      return true;
    } else {
      return false;
    }
  }

  if (!user || !currentUser) {
    <div>No such user.</div>;
  } else
    return (
      <div>
        <div className="flex flex-col items-center sm:flex-row sm:gap-2 sm:rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <Image
            src={user.imageUrl}
            alt={user.username || "default user"}
            width={200}
            height={200}
            className="overflow-hidden sm:rounded-ss-3xl sm:rounded-es-3xl"
          />

          <div className="py-4 sm:p-4 flex justify-between items-center flex-grow">
            <div>
              <h2 className="text-2xl">{user.username}</h2>
              <span className="text-gray-400">
                joined {user.createdAt.toDateString()}
              </span>
            </div>
            {isUserCurrentUser() ? (
              <></>
            ) : isFollowing() ? (
              <FollowButton
                mode="unfollow"
                following={user.id}
                followedBy={currentUser.id}
              />
            ) : (
              <FollowButton
                mode="follow"
                following={user.id}
                followedBy={currentUser.id}
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default Page;
