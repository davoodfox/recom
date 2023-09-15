"use client";
import { getAnimeSeach } from "@/services";
import useFetch from "@/hooks/useFetch";
import { Anime } from "@tutkli/jikan-ts";
import { object, string } from "zod";
import { Container } from "@ui/Container";
import { Form, useZodForm } from "@ui/Form";
import { SubmitButton } from "@ui/SubmitButton";
import { Input } from "./ui/Input";
import AnimeSearchResults from "./AnimeSearchResults";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { TextArea } from "./ui/TextArea";
import Divider from "./ui/Divider";
import { Text } from "./ui/Text";
import { Loader } from "./AnimeBox";

const InputsSchema = object({
  query: string(),
});

function AnimeSearch() {
  const form = useZodForm({
    schema: InputsSchema,
  });
  const animeFetch = useFetch(getAnimeSeach);
  const anime: Anime[] | null = animeFetch.data;
  const { state, send } = animeFetch;

  return (
    <div className="flex flex-col gap-4">
      <Form
        form={form}
        onSubmit={async ({ query }) => {
          send({ type: "FETCH", payload: query });
        }}
      >
        <Input
          label="Search Anime"
          {...form.register("query")}
          sharp
          withButton
          buttonLoading={state.matches("pending")}
        />
      </Form>
      {state.matches("pending") && <Loader label="Select an Anime" />}
      {state.matches("resolved") && anime && (
        <AnimeSearchResults anime={anime} />
      )}
    </div>
  );
}

export default AnimeSearch;
