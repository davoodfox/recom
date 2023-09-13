"use client";
import { object, string } from "zod";
import { Form, useZodForm } from "./ui/Form";
import { TextArea } from "./ui/TextArea";
import { SubmitButton } from "./ui/SubmitButton";

const InputsSchema = object({
  note: string(),
});

export default function Note() {
  const form = useZodForm({
    schema: InputsSchema,
  });

  return (
    <Form
      form={form}
      onSubmit={async ({ note }) => {
        console.log(note);
      }}
    >
      <TextArea label="Note" {...form.register("note")} />
    </Form>
  );
}
