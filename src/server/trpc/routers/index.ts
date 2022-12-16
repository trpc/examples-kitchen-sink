/**
 * This file contains the root router of your tRPC-backend
 */
import { authRouter } from 'feature/next-auth/router';
import { reactHookFormRouter } from 'feature/react-hook-form/router';
import ssgRouter from 'feature/ssg/router';

import { t } from '../trpc';
import { sourceRouter } from './source';

/**
 * In tRPC v10 the root router is created by the same function as child
 * routers, and they can be nested arbitrarily.
 * The root router gets passed to `createNextApiHandler` to handle routing in /api/trpc
 * The root router's type gets passed to `createTRPCNext` so the frontend knows the routes/schema/returns
 */
export const appRouter = t.router({
  healthcheck: t.procedure.query(() => 'ok'),

  source: sourceRouter,
  ssgRouter: ssgRouter,
  authRouter: authRouter,
  reactHookFormRouter: reactHookFormRouter,
});
export type AppRouter = typeof appRouter;
