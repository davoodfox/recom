import { prisma } from '@/utils/db'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { RotatingLines } from 'react-loader-spinner'

async function createNewUser() {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
      username: user?.username as string,
    },
  })
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        username: user?.username as string,
      },
    })
  }
  redirect('/users')
}

async function Page() {
  await createNewUser()
  return <div className="flex items-center justify-center">...Loading</div>
}

export default Page
