import { t } from 'server/trpc/trpc';
import { z } from 'zod';

const posts = [
  {
    id: '1',
    title: 'This data comes from the backend',
  },
];

const rscRouter = t.router({
  byId: t.procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const post = posts.find((post) => post.id === input.id);
      return post ?? null;
    }),
});

export default rscRouter;
