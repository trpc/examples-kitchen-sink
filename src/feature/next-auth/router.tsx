import { TRPCError } from '@trpc/server';
import { createRouter } from 'server/createRouter';

export const router = createRouter()
  .query('next-auth.getSession', {
    async resolve({ ctx }) {
      // The session object is added to the routers context
      // in the context file server side
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any query or mutation after this middleware will raise
    // an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('next-auth.getSecretCode', {
    async resolve() {
      const secretCode = 'the cake is a lie.';
      return secretCode;
    },
  });
