import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

import type { Context } from './context';

export const t = initTRPC.context<Context>().create({
  /**
   * SuperJSON allows us to transparently use e.g. standard Date/Map/Sets over the wire
   * between the server and client. That means you can return any of these types in your
   * API-resolver and use them in the client without recreating the objects from JSON.
   * https://trpc.io/docs/v10/data-transformers#using-superjson
   */
  transformer: superjson,
  /**
   * Optionally do custom error (type safe!) formatting
   * https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});
