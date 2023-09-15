"use client";

import React, { Dispatch, createContext, useEffect, useState } from "react";

type StateType = {
  animeId: string | null;
  note: string;
  fromUsername: string | null;
  toUsername: string | null;
};

const initialState: StateType = {
  animeId: null,
  note: "",
  fromUsername: null,
  toUsername: null,
};

export const RecommendationContext = createContext<{
  recommendationState: StateType;
  setRecommendationState: Dispatch<React.SetStateAction<StateType>>;
}>({ recommendationState: initialState, setRecommendationState: () => {} });

export const RecommendationContextProvider = ({
  children,
  init,
}: {
  children: React.ReactNode;
  init: StateType;
}) => {
  const [recommendationState, setRecommendationState] = useState(initialState);

  useEffect(() => {
    setRecommendationState(init);
  }, []);

  return (
    <RecommendationContext.Provider
      value={{ recommendationState, setRecommendationState }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};
