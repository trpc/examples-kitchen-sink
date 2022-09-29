import { ExampleProps } from 'utils/ExamplePage';

export const meta: ExampleProps = {
  title: 'Infinite Query',
  href: '/infinite-query',
  // This is only enabled on the client as it will cause hydration error otherwise
  // The problem is that RSC won't send the right header whilst the client will, leading to inconsistent behavior
  clientOnly: true,
  summary: (
    <>
      <p>Paginated queries with tRPC</p>
    </>
  ),
  detail: (
    <>
      <p>Using tRPC &amp; paginated queries.</p>
    </>
  ),
  files: [
    { title: 'Page', path: 'feature/infinite-query/index.tsx' },
    { title: 'Router', path: 'feature/infinite-query/router.tsx' },
  ],
};
