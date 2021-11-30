import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';

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
export const createContext = async () => {
  // for API-response caching see https://trpc.io/docs/caching
  return {
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
