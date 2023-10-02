"use client";
import { object, string } from "zod";
import { Form, useZodForm } from "../../../components/ui/Form";
import { TextArea } from "../../../components/ui/TextArea";
import { RecommendationContext } from "@/context/recommendation.context";
import { useContext } from "react";

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
