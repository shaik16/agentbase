import { requireAuth } from '@/lib/auth-utils'

export default async function Pages() {
  await requireAuth()
  return <p>Executions</p>
}
