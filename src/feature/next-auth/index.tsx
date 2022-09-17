import { signIn, signOut } from 'next-auth/react';
import { baseTRPC } from 'utils/trpc';

const trpc = baseTRPC.auth;

export default function NextAuth() {
  return (
    <>
      <h2 className="text-3xl font-bold my-1">Next Auth Examples</h2>
      <ServerSideSessionCheck />
      <MiddlewareQuery />
      <SignInButton />
    </>
  );
}

function ServerSideSessionCheck() {
  const query = trpc.getSession.useQuery(undefined, {
    suspense: true,
  });

  const session = query.data;

  return (
    <div className="my-1">
      <h3 className="text-xl">
        Server side session check with tRPC&apos;s context
      </h3>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
        </>
      ) : (
        <>
          Not signed in <br />
        </>
      )}
    </div>
  );
}

function MiddlewareQuery() {
  const query = trpc.getSecretCode.useQuery();

  const secretCode = query.data;
  return (
    <div className="my-1">
      <h3 className="text-xl">
        Server side middleware session check with tRPC&apos;s context
      </h3>
      {secretCode ? (
        <>
          You&apos;re logged in. The secret code from the server is: &quot;
          {secretCode}&quot;
          <br />
        </>
      ) : (
        <>
          Not signed in, no code from the server, a 401 response and an error is
          raised. <br />
        </>
      )}
    </div>
  );
}

function SignInButton() {
  const query = trpc.getSession.useQuery(undefined, {
    suspense: true,
  });

  const session = query.data;

  return (
    <div className="flex items-center">
      <button
        className="btn"
        onClick={
          session
            ? () => {
                signOut();
              }
            : () => {
                signIn();
              }
        }
      >
        {session ? 'Sign Out' : 'Sign In'}
      </button>
      <p className="ml-1">(Any credentials work)</p>
    </div>
  );
}
