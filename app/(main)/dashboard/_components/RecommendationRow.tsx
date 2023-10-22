import { prisma } from "@/utils/db";
import { Recommendation } from "@prisma/client";
import Link from "next/link";
import RecommendationActions from "./RecommendationActions";

async function RecommendationRow({
  recommendation,
  index,
  host,
}: {
  recommendation: Recommendation;
  index: number;
  host: "given" | "received";
}) {
  const anime = await prisma.anime.findUnique({
    where: { id: recommendation.animeId },
  });

  const prepositionTarget = (function () {
    switch (host) {
      case "given":
        return recommendation.toUsername;
      case "received":
        return recommendation.fromUsername;
    }
  })();

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
          href={"/users/" + prepositionTarget}
          className="text-blue-400 hover:text-brand-600"
        >
          {prepositionTarget}
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
