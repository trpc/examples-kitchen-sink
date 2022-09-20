import { meta } from 'feature/rsc/meta';
import { ExamplePage } from 'utils/ExamplePage';
import { baseTRPC } from 'utils/trpc';

const trpc = baseTRPC.rsc;

export default function Page() {
  const query = trpc.byId.useQuery(
    { id: '1' },
    {
      suspense: true,
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = query.data!;

  return (
    <>
      <ExamplePage {...meta}>
        <article>
          <h2 className="text-2xl font-bold">{post.title}</h2>
        </article>
      </ExamplePage>
    </>
  );
}
