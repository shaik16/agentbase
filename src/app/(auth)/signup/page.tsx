import { SignupForm } from '@/app/features/auth/signup-form'
import { requireUnAuth } from '@/lib/auth-utils'

const Page = async () => {
  await requireUnAuth()
  return (
    <div>
      <SignupForm />
    </div>
  )
}

export default Page
