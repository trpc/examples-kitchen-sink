import '../styles/globals.css';

import { AppType } from 'next/dist/shared/lib/utils';
import { useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';

function ContributorsWantedBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3e3);
  }, []);

  return (
    <>
      <div className="h-20" />
      <div
        className={
          'fixed inset-x-0 bottom-0 transition-opacity duration-700 ' +
          (visible ? 'opacity-100' : 'opacity-0')
        }
      >
        <div className="relative bg-primary-600">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="pr-16 sm:text-center sm:px-16">
              <p className="font-medium text-white">
                <span className="inline">
                  Contributors wanted to improve this page &amp; to add more
                  examples!
                </span>
                <span className="block sm:ml-2 sm:inline-block">
                  <a
                    href="https://github.com/trpc/trpc/issues/1254"
                    className="text-white font-bold underline"
                  >
                    {' '}
                    Learn more <span aria-hidden="true">&rarr;</span>
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const MyApp: AppType = (props) => {
  return (
    <>
      <props.Component {...props.pageProps} />
      <ContributorsWantedBanner />
    </>
  );
};

export default trpc.withTRPC(MyApp);
