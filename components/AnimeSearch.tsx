"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAnimeSeach } from "@/services";
import OutsideClickHandler from "react-outside-click-handler";
import useFetch from "@/hooks/useFetch";
import { Anime } from "@tutkli/jikan-ts";
import AnimeSearchResults from "./AnimeSearchResults";
import { RotatingLines } from "react-loader-spinner";

type Inputs = {
  query: string;
};

function AnimeSearch({ setData }: { setData: React.Dispatch<any> }) {
  const animeFetch = useFetch(getAnimeSeach);
  const anime: Anime[] | null = animeFetch.data;
  const { state: animeState, send: animeSend } = animeFetch;

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    animeSend({ type: "FETCH", payload: data.query });
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        animeSend("CLEAR");
      }}
    >
      <div className="w-64 relative z-10">
        <label
          htmlFor="anime"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Recommend
        </label>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex overflow-hidden rounded-sm shadow-sm ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
        >
          <input
            {...register("query")}
            defaultValue=""
            placeholder="Naruto"
            className="block max-w-[12rem] flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />

          {animeState.matches("pending") ? (
            <div className="p-1 w-16 min-w-[4rem] bg-blue-400 text-white flex justify-center">
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="26"
                visible={true}
              />
            </div>
          ) : (
            <button className="p-1 w-16 min-w-[4rem] bg-blue-400 text-white flex justify-center">
              Search
            </button>
          )}
        </form>
        {animeState.matches("resolved") && (
          <AnimeSearchResults anime={anime} setData={setData} />
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default AnimeSearch;
