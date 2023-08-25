import fetchMachine from "@/machines/fetchMachine";
import { useMachine } from "@xstate/react";
import { useState } from "react";

export default function useFetch(service = (p: any): any => {}) {
  var [data, setData] = useState<any>();
  var [state, send] = useMachine(fetchMachine, {
    actions: {
      goFetch: async (context, event) => {
        try {
          const res = await service(event.payload);
          setData(res);
          send("RESOLVE");
        } catch (error) {
          send("REJECT");
          console.error(error);
        }
      },
      clear: () => {
        setData(null);
      },
    },
  });
  return { data, setData, state, send };
}
