import { meta as infiniteQueryMeta } from 'feature/infinite-query/meta';
import { meta as nextAuthMeta } from 'feature/next-auth/meta';
import { meta as reactHookFormMeta } from 'feature/react-hook-form/meta';
import { meta as ssgMeta } from 'feature/ssg/meta';
import Head from 'next/head';
import Link from 'next/link';
import { ExampleProps } from 'utils/ExamplePage';

const propsList: ExampleProps[] = [
  reactHookFormMeta,
  ssgMeta,
  nextAuthMeta,
  infiniteQueryMeta,
];

export default function Page() {
  return (
    <>
      <Head>
        <title>tRPC Kitchen Sink</title>
      </Head>
      <div className="bg-primary-400">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">A collection tRPC usage patterns</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-primary-200">
            Your go-to place to find out how to find solutions to common
            problems.
          </p>
        </div>
      </div>
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <ul className="space-y-2 p-4">
          {propsList.map((props) => (
            <Link key={props.title} href={props.href}>
              <a className="bg-white overflow-hidden shadow rounded-lg block hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-primary-400">
                <div className="px-2 py-5 sm:p-6">
                  <h2 className="text-2xl font-bold my-3">{props.title}</h2>
                  <div className="text-xl my-2">{props.summary}</div>
                </div>
              </a>
            </Link>
          ))}
        </ul>
      </main>
    </>
  );
}
