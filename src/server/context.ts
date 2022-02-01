import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';

import { authOptions as next_auth_opts } from '../pages/api/auth/[...nextauth]';

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  context_opts?: trpcNext.CreateNextContextOptions,
) => {
  const req = context_opts?.req;
  const res = context_opts?.res;

  /**
   * Uses faster "getServerSession" in next-auth v4 that avoids a fetch request to /api/auth.
   * This function also updates the session cookie whereas getSession does not
   * Note: If no req -> SSG is being used -> no session exists (null)
   * @link https://github.com/nextauthjs/next-auth/issues/1535
   */
  const session =
    context_opts && (await getServerSession(context_opts, next_auth_opts));

  // for API-response caching see https://trpc.io/docs/caching
  return {
    req,
    res,
    session,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
