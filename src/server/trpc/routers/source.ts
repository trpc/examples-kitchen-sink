import fs from 'fs';
import path from 'path';
import { z } from 'zod';

import { t } from '../trpc';

export const sourceRouter = t.router({
  getSource: t.procedure
    .input(
      z.object({
        path: z.string().refine((val) => !val.includes('..'), {
          message: 'Only relative paths allowed',
        }),
      }),
    )
    .query(async ({ input }) => {
      const ROOT = path.resolve(__dirname + '/../../../../../src') + '/';
      const contents = fs.readFileSync(ROOT + input.path).toString('utf8');

      return {
        contents,
      };
    }),
});
