import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export async function getUserByClerkId() {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  })

  return user
}
