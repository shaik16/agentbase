import { requireAuth } from '@/lib/auth-utils'

interface PageProps {
  params: Promise<{ credentialId: string }>
}

export default async function Pages({ params }: PageProps) {
  await requireAuth()
  const { credentialId } = await params
  return <p>Credential {credentialId}</p>
}
