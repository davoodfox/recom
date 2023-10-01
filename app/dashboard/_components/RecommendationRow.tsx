import { prisma } from "@/utils/db";
import { Recommendation, User } from "@prisma/client";
import Link from "next/link";
import RecommendationActions from "./RecommendationActions";

async function RecommendationRow({
  recommendation,
  index,
}: {
  recommendation: Recommendation;
  index: number;
}) {
  const anime = await prisma.anime.findUnique({
    where: { id: recommendation.animeId },
  });

  return (
    <tr
      className={`${
        index % 2 == 0
          ? "bg-white dark:bg-gray-900"
          : "bg-gray-50 dark:bg-gray-800"
      } border-b dark:border-gray-700`}
    >
      <td className="px-6 py-3">{anime?.title}</td>
      <td className="px-6 py-3">
        <Link
          href={"/users/" + recommendation.toUsername}
          className="text-blue-400 hover:text-brand-600"
        >
          {recommendation.toUsername}
        </Link>
      </td>
      <td className="px-6 py-3">{recommendation.note}</td>
      <td className="px-6 py-3">
        <RecommendationActions id={recommendation.id} />
      </td>
    </tr>
  );
}

export default RecommendationRow;
