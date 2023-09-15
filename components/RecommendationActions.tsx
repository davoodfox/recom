"use client";
import useFetch from "@/hooks/useFetch";
import { deleteRecommendation } from "@/services";
import { Button } from "./ui/Button";
import { SubmitButton } from "./ui/SubmitButton";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RecommendationActions({ id }: { id: string }) {
  const { send, state } = useFetch(deleteRecommendation);

  useEffect(() => {
    if (state.matches("resolved")) {
      toast("Deleted Recommendation!", {
        hideProgressBar: true,
        type: "success",
        position: "bottom-center",
      });
    }
  }, [state]);

  return (
    <div className="absolute right-2">
      <SubmitButton
        className="text-red-900"
        onClick={() => {
          send({ type: "FETCH", payload: id });
        }}
        loading={state.matches("pending")}
      >
        delete
      </SubmitButton>
    </div>
  );
}
