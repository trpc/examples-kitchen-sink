import { useEffect, useRef } from 'react';
import { trpc } from 'utils/trpc';

export default function Page() {
  const bottomOfPage = useRef<HTMLDivElement>(null);
  const myQuery = trpc.infiniteQueryRouter.getItems.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const { data: posts, fetchNextPage, isFetchingNextPage } = myQuery;

  // Setup optional intersection observer to fetch next page when bottom of page is reached.
  // This is not needed if you have a "Load more" button or similar.
  useEffect(() => {
    const bottomDiv = bottomOfPage.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (bottomDiv) {
      observer.observe(bottomDiv);
    }
    return () => {
      if (bottomDiv) {
        observer.unobserve(bottomDiv);
      }
    };
  }, [fetchNextPage]);

  return (
    <>
      <h2 className="text-3xl font-bold py-8">Top Recent Posts from /r/Aww</h2>
      <div className="flex flex-col space-y-3 py-2 min-h-screen">
        {posts ? (
          posts.pages.map((page) => {
            return page.items.data.children.map((post) => (
              <article
                key={post.data.id}
                className="bg-white shadow overflow-hidden sm:rounded-lg p-4 flex justify-start items-center space-x-2"
              >
                {/* upvote/downvote buttons */}
                <div className="flex flex-col gap-1">
                  <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-md group">
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 17a1 1 0 01-1-1V7.414l-2.293 2.293a1 1 0 01-1.32.083l-.094-.083a1 1 0 01-.083-1.32l.083-.094 4-4a1 1 0 011.32-.083l.094.083 4 4a1 1 0 01-1.32 1.497l-.094-.083L11 7.414V16a1 1 0 01-1 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-md group">
                    <svg
                      className="w-4 h-4 text-gray-500  group-hover:text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 011.32-.083l.094.083a1 1 0 01.083 1.32l-.083.094-4 4a1 1 0 01-1.32.083l-.094-.083-4-4a1 1 0 011.32-1.497l.094.083L9 13.586V5a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/*  post image */}
                <div className="flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-md"
                    src={post.data.thumbnail}
                    alt={post.data.title}
                  />
                </div>
                {/* post content */}
                <div>
                  {/* post title */}
                  <div className="flex-1">
                    <a
                      href={`https://www.reddit.com${post.data.permalink}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block hover:text-orange-500 text-sm"
                    >
                      {post.data.title}
                    </a>
                  </div>
                  {/* post meta */}
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <span className="whitespace-pre-wrap">
                      Posted by{' '}
                      <span className="font-medium">{post.data.author}</span>{' '}
                      {new Date(post.data.created * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </article>
            ));
          })
        ) : (
          <div>Loading...</div>
        )}

        <div ref={bottomOfPage} className="h-10" />

        {isFetchingNextPage && <div>Loading...</div>}
      </div>
    </>
  );
}
