import RecommendationActions from "@/components/RecommendationActions";
import RecommendationBox from "@/components/RecommendationBox";
import { getUserByClerkId } from "@/services";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

export default async function name() {
  const { userId } = await auth();
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    include: {
      recommendationsGiven: true,
      recommendationsReceived: true,
    },
  });

  return (
    <>
      <div className="grid grid-cols-6 shadow-xl p-4 rounded-md">
        <div className="col-span-1">
          <h1>{user.username}</h1>
        </div>
        <div className="col-span-5">
          <h2 className="text-4xl mb-2">Recommendations Given</h2>
          <ul className="flex flex-col gap-2">
            {user.recommendationsGiven.map((recommendation) => (
              <RecommendationBox
                key={recommendation.id}
                recommendation={recommendation}
                host="given"
              >
                <RecommendationActions id={recommendation.id} />
              </RecommendationBox>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
