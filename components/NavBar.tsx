import Link from 'next/link'
import React from 'react'
import { UserButton } from '@clerk/nextjs'

interface Props {}

function NavBar(props: Props) {
  const {} = props

  return (
    <nav className="bg-blue-400 text-white p-2">
      <div className="flex justify-between">
        <ul className="flex gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
        </ul>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  )
}

export default NavBar
