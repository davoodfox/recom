import RecommendationRow from "@/components/RecommendationRow";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs";

export default async function RecommendationsTable({
  host,
}: {
  host: "given" | "received";
}) {
  const { userId } = await auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    include: {
      recommendationsGiven: host == "given" ? true : false,
      recommendationsReceived: host == "received" ? true : false,
    },
  });

  const preposition = (function () {
    switch (host) {
      case "given":
        return "to";
      case "received":
        return "from";
    }
  })();

  const data = (function () {
    switch (host) {
      case "given":
        return user.recommendationsGiven;
      case "received":
        return user.recommendationsReceived;
    }
  })();

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              title
            </th>
            <th scope="col" className="px-6 py-3">
              {preposition}
            </th>
            <th scope="col" className="px-6 py-3">
              note
            </th>
            <th scope="col" className="px-6 py-3">
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((recommendation, index) => (
            <RecommendationRow
              key={recommendation.id}
              recommendation={recommendation}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
