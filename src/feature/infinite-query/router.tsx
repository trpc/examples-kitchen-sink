import { t } from 'server/trpc/trpc';
import { z } from 'zod';

export type Items = {
  items: {
    data: {
      children: {
        data: {
          id: string;
          title: string;
          selftext: string;
          thumbnail: string;
          score: number;
          permalink: string;
          created: number;
          author: string;
        };
      }[];
    };
  };
  nextCursor?: string;
};

export const infiniteQueryRouter = t.router({
  getItems: t.procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor, limit } = input;
      // set cursor to the previously returned nextCursor, or an empty string
      let currentCursor = cursor || '';
      // fetch data from API
      do {
        const items = await fetch(
          `https://www.reddit.com/r/Aww/top.json?limit=${limit}?after=${currentCursor}`,
        ).then((res) => res.json());

        // Set the cursor to the 'after' value from the response if it exists, which is the cursor for the next page
        if (items.data.after) {
          currentCursor = items.data.after;
        } else {
          // If there is no 'after' value, we've reached the end of the list
          currentCursor = '';
        }

        // Return the items and the cursor for the next page
        return {
          items,
          nextCursor: currentCursor,
        } as Items;
      } while (currentCursor !== '' || currentCursor !== undefined);
    }),
});
