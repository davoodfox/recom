import { Button } from "@/components/ui/Button";
import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0), 50%, rgba(96, 165, 250, 0.185))",
      }}
      className="mx-auto  h-full w-full flex items-center justify-center text-center"
    >
      <div className="w-full max-w-screen-xl px-2.5 md:px-20 pb-28 pt-28 flex flex-col gap-8 items-center justify-center text-center sm:pt-40">
        <h1 className="font-bold text-xl md:text-4xl lg:text-7xl">
          <span
            className="text-3xl md:text-5xl  lg:text-8xl
           text-brand-600"
          >
            RECOM
          </span>
          mend anime to your friends.
          <br className="hidden sm:block" />
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Keep track of all the animes you recommended to your friends and make
          sure they never forget.
        </p>
        <div className="mt-2 flex items-center gap-6">
          <SignedOut>
            <div>
              <Link href="/sign-in">
                <Button>Get started</Button>
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div>
              <Link href="/dashboard">
                <Button>Get started</Button>
              </Link>
            </div>
          </SignedIn>
        </div>

        <div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl">
                <Image
                  src="/screenshot-2023-10-14-11-18-36.png"
                  alt="w"
                  width={1364}
                  height={866}
                  quality={100}
                  className="rounded-md bg-white  shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
