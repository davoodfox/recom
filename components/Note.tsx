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
  const { setRecommendationState } = useContext(RecommendationContext);

  const form = useZodForm({
    schema: InputsSchema,
  });

  return (
    <Form form={form} onSubmit={() => {}}>
      <TextArea
        label="Note"
        {...form.register("note")}
        onChange={(e) => {
          setRecommendationState((prev) => ({
            ...prev,
            note: e.target.value,
          }));
        }}
      />
    </Form>
  );
}
