import { ExampleProps } from 'utils/ExamplePage';

export const meta: ExampleProps = {
  title: 'React Server Components',
  href: '/rsc',
  summary: (
    <>
      <p>Using React Server Components</p>
    </>
  ),
  files: [
    { title: 'Router', path: 'feature/rsc/router.ts' },
    { title: 'Page', path: 'pages/rsc.tsx' },
  ],
};
