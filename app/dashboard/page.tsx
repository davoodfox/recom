import { deleteRecommendation } from "@/actions/recommendations";
import RecommendationActions from "@/components/RecommendationActions";
import RecommendationRow from "@/components/RecommendationRow";
import { Form } from "@/components/ui/Form";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { prisma } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { z } from "zod";
import DashboardTabs from "./_components/DashboardTabs";

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
      <div className="shadow-xl p-4 rounded-md">
        <DashboardTabs />
      </div>
    </>
  );
}
