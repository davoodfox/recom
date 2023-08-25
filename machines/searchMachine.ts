import { createMachine } from "xstate";

const searchMachine = createMachine(
  {
    id: "search",
    context: {
      timer: null,
      query: "",
      results: {},
      error: {},
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          focus: "focused",
        },
      },
      focused: {
        on: {
          blur: "idle",
          keyup: "typing",
        },
      },
      typing: {
        entry: ["updateQuery", "clearTimer", "setTimer"],
        on: {
          keyup: "typing",
          blur: "idle",
          FETCH: {
            target: "pending",
            cond: "checkQuery",
          },
        },
      },
      pending: {
        entry: "goFetch",
        on: {
          keyup: "typing",
          RESOLVE: "resolved",
          REJECT: "rejected",
          blur: "idle",
        },
      },
      resolved: {
        on: {
          keyup: "typing",
          blur: "idle",
        },
      },
      rejected: {
        on: {
          keyup: "typing",
          blur: "idle",
        },
      },
    },
  },
  {
    guards: {
      checkQuery: (context, event) => context.query != "",
    },
  }
);

export default searchMachine;
