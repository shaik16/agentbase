import { requireAuth } from '@/lib/auth-utils'

interface PageProps {
  params: Promise<{ executionId: string }>
}

export default async function Pages({ params }: PageProps) {
  await requireAuth()
  const { executionId } = await params
  return <p>Execution {executionId}</p>
}
