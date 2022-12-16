import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import type { AppRouter } from 'server/trpc/routers/index';
import superjson from 'superjson';

function getBaseUrl() {
  // browser should use relative url
  if (typeof window !== 'undefined') return '';

  // reference for vercel.com SSR
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // reference for render.com SSR
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // override for docker etc SSR
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;

  // assume localhost in dev SSR
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export const trpc = createTRPCNext<AppRouter>({
  /**
   * Config options:
   * https://trpc.io/docs/v10/nextjs#createtrpcnext-options
   */
  config() {
    return {
      /**
       * @link https://trpc.io/docs/v10/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://trpc.io/docs/v10/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/v10/ssr
   */
  ssr: false,
});

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/v10/react#2-create-trpc-hooks
 */

/**
 * You can use inference to get types for procedure input and output
 * this is equivalent to inferQueryOutput/inferQueryInput/inferMutationOutput/inferMutationInput in v9
 * @example type SourceInput = inferProcedureInput<AppRouter['source']['getSource']>;
 * @example type SourceOutput = inferProcedureOutput<AppRouter['source']['getSource']>;
 */
