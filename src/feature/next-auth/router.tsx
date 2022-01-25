import { TRPCError } from '@trpc/server';
import { createRouter } from 'server/createRouter';

export const router = createRouter()
  .query('next-auth.getSession', {
    async resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .query('next-auth.middlewareForceLogIn', {
    async resolve() {
      const secretCode = 'the cake is a lie.';
      return secretCode;
    },
  });
