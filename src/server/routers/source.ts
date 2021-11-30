import fs from 'fs';
import path from 'path';
import { createRouter } from 'server/createRouter';
import { z } from 'zod';
export const sourceRouter = createRouter().query('getSource', {
  input: z.object({
    path: z.string().refine((val) => !val.includes('..'), {
      message: 'Only relative paths allowed',
    }),
  }),
  async resolve({ input }) {
    const ROOT = path.resolve(__dirname + '/../../../../../src') + '/';
    const contents = fs.readFileSync(ROOT + input.path).toString('utf8');

    return {
      contents,
    };
  },
});
