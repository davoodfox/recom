"use client";
import { object, string } from "zod";
import { Form, useZodForm } from "./ui/Form";
import { TextArea } from "./ui/TextArea";
import { RecommendationContext } from "@/context/recommendation.context";
import { useContext, useEffect } from "react";
import { SubmitButton } from "./ui/SubmitButton";
import { createRecommendation, getUser } from "@/services";
import useFetch from "@/hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";

const InputsSchema = object({
  note: string(),
});

export default function Note() {
  const { recommendationState } = useContext(RecommendationContext);
  const { send, state } = useFetch(createRecommendation);

  const form = useZodForm({
    schema: InputsSchema,
  });

  useEffect(() => {
    if (state.matches("resolved")) {
      toast("Added Recommendation!", {
        hideProgressBar: true,
        type: "success",
        position: "bottom-center",
      });
    }
  }, [state]);

  return (
    <Form
      form={form}
      onSubmit={async ({ note }) => {
        if (recommendationState.animeId == null) {
          toast("Please select an anime!", {
            hideProgressBar: true,
            type: "error",
            position: "bottom-center",
          });
        }
        if (recommendationState.toUsername == null) {
          toast("Please select a user!", {
            hideProgressBar: true,
            type: "error",
            position: "bottom-center",
          });
          return;
        }
        send({
          type: "FETCH",
          payload: { ...recommendationState, note: note },
        });
      }}
    >
      <TextArea label="Note" {...form.register("note")} />
      <SubmitButton loading={state.matches("pending")}>
        Add Recommendation
      </SubmitButton>
      <ToastContainer />
    </Form>
  );
}
