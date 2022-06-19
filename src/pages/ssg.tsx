import { createSSGHelpers } from '@trpc/react/ssg';
import { meta } from 'feature/ssg/meta';
import { createContext } from 'server/context';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { ExamplePage } from 'utils/ExamplePage';
import { inferSSGProps } from 'utils/inferSSGProps';
import { trpc } from 'utils/trpc';

export default function Page(props: inferSSGProps<typeof getStaticProps>) {
  const { id } = props;
  const query = trpc.useQuery(['ssg.byId', { id }]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = query.data!;
  return (
    <>
      <ExamplePage {...meta}>
        <article className="prose">
          <h2>{post.title}</h2>
        </article>
      </ExamplePage>
    </>
  );
}

export async function getStaticProps() {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson, // adds superjson serialization
  });

  const id = '1';
  const post = await ssg.fetchQuery('ssg.byId', { id });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
