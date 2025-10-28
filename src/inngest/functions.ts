import prisma from '@/lib/db'
import { inngest } from './client'

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    // Fetching the video
    await step.sleep('wait-a-moment', '5s')

    // Transcribing
    await step.sleep('wait-a-moment', '10s')

    // Sending Transcription to AI
    await step.sleep('wait-a-moment', '10s')

    await step.run('create-workflow', async () => {
      return prisma.workflow.create({
        data: {
          name: 'test workflow from inngest',
        },
      })
    })
    return { message: `Hello ${event.data.email}!` }
  }
)
