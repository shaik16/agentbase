'use client'

import { requireAuth } from '@/lib/auth-utils'
import { caller } from '@/trpc/server'
import { LogoutButton } from './logout'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const Page = () => {
  // await requireAuth()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { data } = useQuery(trpc.getWorkflows.queryOptions())
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success('Job Queued')
      },
    })
  )

  const testAi = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: () => {
        toast.success('AI Job Queued')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )
  return (
    <div>
      Protected server component
      <div>Data: {JSON.stringify(data)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create workflow
      </Button>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <LogoutButton />
    </div>
  )
}

export default Page
