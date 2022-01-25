import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from 'utils/trpc';

export default function NextAuth() {
  return (
    <>
      <h2 className="text-3xl font-bold my-1">Next Auth Examples</h2>
      <ClientSideSessionCheck />
      <ServerSideSessionCheck />
      <MiddlewareQuery />
      <SignInButton />
    </>
  );
}

function ClientSideSessionCheck() {
  const { data: session } = useSession();
  return (
    <div className="my-1">
      <h3 className="text-xl">
        Client side session check with NextAuth&apos;s useSession hook
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

function ServerSideSessionCheck() {
  const query = trpc.useQuery(['next-auth.getSession'], { suspense: true });

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
  const query = trpc.useQuery(['next-auth.getSecretCode']);

  const secretCode = query.data;
  return (
    <div className="my-1">
      <h3 className="text-xl">
        Server side middleware session check with tRPC&apos;s context
      </h3>
      {secretCode ? (
        <>
          You&apos;re logged in. The secret code from the server is {secretCode}
          <br />
        </>
      ) : (
        <>
          Not signed in, no code from the server, a 404 response and an error is
          raised. <br />
        </>
      )}
    </div>
  );
}

function SignInButton() {
  const { data: session } = useSession();
  return (
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
  );
}
