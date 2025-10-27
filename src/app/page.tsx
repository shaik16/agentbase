import { requireAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server'
import { LogoutButton } from './logout'

const Page = async () => {
  await requireAuth()

  const data = await caller.getUsers()
  return (
    <div>
      Protected server component
      <div>{JSON.stringify(data)}</div>
      <LogoutButton />
    </div>
  )
}

export default Page
