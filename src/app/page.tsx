import { Button } from '@/components/ui/button'
import { getQueryClient, trpc } from '@/trpc/server'
import Client from './client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

const Page = async () => {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())
  return (
    <div>
      <Button variant={'outline'}>Click Mme </Button>
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Client />
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default Page
