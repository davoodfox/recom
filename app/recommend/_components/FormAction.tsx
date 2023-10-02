"use client";
import React, { useContext } from "react";
import { createRecommendation } from "@/actions/recommendations";
import { RecommendationContext } from "@/context/recommendation.context";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default function FormAction() {
  const { recommendationState } = useContext(RecommendationContext);

  return (
    <form action={createRecommendation}>
      <input
        type="hidden"
        name="animeId"
        value={(recommendationState.animeId || "") as string}
      />
      <input
        type="hidden"
        name="fromUsername"
        value={(recommendationState.fromUsername || "") as string}
      />
      <input
        type="hidden"
        name="toUsername"
        value={(recommendationState.toUsername || "") as string}
      />
      <input
        type="hidden"
        name="note"
        value={(recommendationState.note || "") as string}
      />
      <SubmitButton
        disabled={
          !recommendationState.animeId ||
          !recommendationState.toUsername ||
          !recommendationState.fromUsername
        }
      >
        Add Recommendation
      </SubmitButton>
    </form>
  );
}
