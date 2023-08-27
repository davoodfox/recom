import { SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex justify-center items-center mt-52">
      <div className="w-full max-w-[800px] mx-auto">
        <h1 className="text-4xl mb-4">
          <span className="text-6xl">RECOM</span>mend anime to your friends.
        </h1>
        <p className="text-2xl text-grey-400 mb-4">
          Keep track of all the animes you recommended to your friends and make
          sure they never forget.
        </p>
        <SignedOut>
          <div>
            <Link href="/sign-in">
              <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl text-white ">
                Sign In
              </button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </main>
  )
}
