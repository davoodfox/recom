"use client";
import { getJikanAnimeSearch } from "@/actions/jikan";
import useFetch from "@/hooks/useFetch";
import { Anime } from "@tutkli/jikan-ts";
import { object, string } from "zod";
import { Form, useZodForm } from "@ui/Form";
import { Input } from "@/components/ui/Input";
import AnimeSearchResults from "@/components/AnimeSearchResults";
import Loader from "@/components/AnimeBoxLoader";

const InputsSchema = object({
  query: string(),
});

function AnimeSearch() {
  const form = useZodForm({
    schema: InputsSchema,
  });
  const animeFetch = useFetch(getJikanAnimeSearch);
  const anime: Anime[] | null = animeFetch.data;
  const { state, send } = animeFetch;

  return (
    <div className="flex flex-col gap-4">
      <Form
        form={form}
        onSubmit={async ({ query }) => {
          const formData = new FormData();
          formData.append("query", JSON.stringify(query));
          send({ type: "FETCH", payload: formData });
        }}
      >
        <Input
          label="Search Anime"
          {...form.register("query")}
          sharp
          withButton
          buttonLoading={state.matches("pending")}
          buttonDisabled={
            typeof form.watch("query") == "string"
              ? form.watch("query").length == 0
              : true
          }
        />
      </Form>
      {state.matches("pending") && <Loader label="Select an Anime" />}
      {state.matches("resolved") && anime && (
        <AnimeSearchResults
          anime={anime}
          reset={() => form.reset({ query: "" })}
        />
      )}
    </div>
  );
}

export default AnimeSearch;
