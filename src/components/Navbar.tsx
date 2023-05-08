import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function Navbar() {
  const { data: session } = useSession();

  const content = session ? (
    <ProfileAvatar session={session} />
  ) : (
    <SignInButton />
  );

  return (
    <div className="bg-primary-600 h-[60px]">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 container flex justify-between items-center h-full">
        <div className="text-white font-bold">tRPC</div>
        {content}
      </div>
    </div>
  );
}

// @NOTE: If dropdown is going to be used elsewhere, extract into a separate component
function ProfileAvatar({ session }: { session: NonNullable<Session> }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex gap-4 items-center">
          <span className="text-white mr-2 font-semibold">
            {session?.user?.name}
          </span>
          <Image
            className="w-8 h-8 rounded-full"
            src={session?.user?.image as string}
            width={32}
            height={32}
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="min-w-[160px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <DropdownMenu.Item
          className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-primary-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-200 data-[highlighted]:text-violet1"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </DropdownMenu.Item>
        <DropdownMenu.Arrow className="DropdownMenuArrow fill-white" />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function SignInButton() {
  return (
    <button
      className="rounded-md p-2 border-2 border-white text-white font-semibold hover:bg-primary-700 cursor-pointer"
      onClick={() => {
        signIn();
      }}
    >
      Sign in
    </button>
  );
}
