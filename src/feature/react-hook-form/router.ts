import { t } from 'server/trpc/trpc';

import { validationSchema } from './index';

const items = [
  {
    id: '1',
    title: 'Hello tRPC',
    text: 'Hello world',
  },
];

export const reactHookFormRouter = t.router({
  list: t.procedure.query(async () => {
    return items;
  }),

  add: t.procedure.input(validationSchema).mutation(({ input }) => {
    const id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .slice(0, 6);
    const item = {
      id,
      ...input,
    };
    items.push(item);

    return item;
  }),
});
