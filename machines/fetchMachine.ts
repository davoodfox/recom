import { createMachine } from 'xstate'

const fetchMachine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      entry: 'clear',
      on: {
        FETCH: {
          target: 'pending',
        },
        DENY: {
          target: 'denied',
        },
      },
    },
    pending: {
      entry: 'goFetch',
      on: {
        FETCH: {
          target: 'pending',
        },
        RESOLVE: {
          target: 'resolved',
        },
        REJECT: {
          target: 'rejected',
        },
      },
    },
    resolved: {
      on: {
        FETCH: {
          target: 'pending',
        },
        CLEAR: {
          target: 'idle',
        },
      },
    },
    rejected: {
      on: {
        FETCH: {
          target: 'pending',
        },
      },
    },
    denied: {},
  },
})

export default fetchMachine
