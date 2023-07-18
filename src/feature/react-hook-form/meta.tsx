import { ExampleProps } from 'utils/ExamplePage';

export const meta: ExampleProps = {
  title: 'React Hook Form',
  href: '/react-hook-form',
  clientOnly: true,
  summary: (
    <>
      <p>
        Using tRPC with <code>react-hook-form</code>.
      </p>
    </>
  ),
  detail: (
    <>
      <p>
        Using tRPC &amp;{' '}
        <a
          href="https://react-hook-form.com/"
          target="_blank"
          rel="noreferrer"
          className="font-mono"
        >
          react-hook-form.
        </a>
        <br />
        Note how the same <a href="https://github.com/colinhacks/zod">
          zod
        </a>{' '}
        validation schema is reused both for the client &amp; the server.
      </p>
    </>
  ),
  files: [
    { title: 'Router', path: 'feature/react-hook-form/router.ts' },
    { title: 'Page', path: 'feature/react-hook-form/index.tsx' },
    { title: 'Form utils', path: 'feature/react-hook-form/Form.tsx' },
  ],
};
