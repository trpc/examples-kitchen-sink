import { TRPCError } from '@trpc/server';
import { t } from 'server/trpc/trpc';

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  // any query that uses this middleware will throw
  // an error unless there is a current session
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});

// you can create a named procedure that uses a middleware
// (as is done here),
// or just use the middleware inline in the router like:
// `someProcedure: t.procedure.use(someMiddleware).query()
const authedProcedure = t.procedure.use(authMiddleware);

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    // The session object is added to the routers context
    // in the context file server side
    return ctx.session;
  }),
  getSecretCode: authedProcedure.query(async () => {
    const secretCode = 'the cake is a lie.';
    return secretCode;
  }),
});
