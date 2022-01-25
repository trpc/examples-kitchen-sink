import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';

export default function NextAuth() {
  return (
    <>
      <h2 className="text-3xl font-bold">Next Auth</h2>
      <ClientSideSessionCheck />
      <ServerSideSessionCheck />
      <ThinkYourLoggedIn />
    </>
  );
}

function ClientSideSessionCheck() {
  const { data: session } = useSession();
  return (
    <>
      <h3 className="text-xl font-bold">
        Client side session check with NextAuth&apos;s useSessionHook
      </h3>
      {session ? (
        <>
          Signed in as {session?.user?.email} <br />
          <button className="btn" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button className="btn" onClick={() => signIn()}>
            Sign in
          </button>
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
          <button className="btn" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button className="btn" onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
    </>
  );
}

function ThinkYourLoggedIn() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <h3 className="text-xl font-bold">
        Server side middleware session check with tRPC&apos;s context
      </h3>
      <button
        className="btn"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? 'Reset' : "I'm logged in."}
      </button>
      {toggle ? (
        <LoggedInToView />
      ) : (
        <p>
          Click the button if you think you are logged in. You&apos;ll raise a
          runtime error if not.
        </p>
      )}
    </>
  );
}

function LoggedInToView() {
  //Middleware which ensured session exists to return data
  const query = trpc.useQuery(['next-auth.middlewareForceLogIn']);

  const secretCode = query.data;
  return (
    <>
      {secretCode ? (
        <>
          You&apos;re logged in. The secret code is {secretCode}
          <br />
          <button className="btn" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <>
          Not signed in, no code for you. <br />
          <button className="btn" onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
    </>
  );
}
