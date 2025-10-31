import { inngest } from '@/inngest/client'
import { createTRPCRouter, protectedProcedure } from '../init'
import prisma from '@/lib/db'

import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai',
    })

    return { success: true, message: 'Job Queued' }
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    console.log({ userId: ctx.auth.user.id })
    return prisma.workflow.findMany()
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'test@test.com',
      },
    })

    return prisma.workflow.create({
      data: {
        name: 'Test Workflow',
      },
    })
  }),
})
// export type definition of API
export type AppRouter = typeof appRouter
