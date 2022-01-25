import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from 'utils/trpc';

export default function NextAuth() {
  return (
    <>
      <h2 className="text-3xl font-bold">Next Auth</h2>
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
    <>
      <h3 className="text-xl font-bold">
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
    </>
  );
}

function ServerSideSessionCheck() {
  const query = trpc.useQuery(['next-auth.getSession'], { suspense: true });

  const session = query.data;

  return (
    <>
      <h3 className="text-xl font-bold">
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
    </>
  );
}

function MiddlewareQuery() {
  //Middleware which ensured session exists to return data
  const query = trpc.useQuery(['next-auth.middlewareForceLogIn']);

  const secretCode = query.data;
  return (
    <>
      <h3 className="text-xl font-bold">
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
    </>
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
              signIn();
            }
          : () => {
              signOut();
            }
      }
    >
      {session ? 'Sign Out' : 'Sign In'}
    </button>
  );
}
