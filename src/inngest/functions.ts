import prisma from '@/lib/db'
import { inngest } from './client'

import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'

export const execute = inngest.createFunction(
  { id: 'execute-ai' },
  { event: 'execute/ai' },
  async ({ event, step }) => {
    await step.sleep('pretend to sleep', '5s')

    const { steps: geminiSteps } = await step.ai.wrap('gemini-generate-text', generateText, {
      system: 'You are a helpful assistant',
      model: google('gemini-2.5-pro'),
      prompt: 'What is 2+2 ',
    })
    const { steps: openaiSteps } = await step.ai.wrap('openai-generate-text', generateText, {
      system: 'You are a helpful assistant',
      model: openai('gpt-4o-mini'),
      prompt: 'What is 2+2 ',
    })
    const { steps: anthropicSteps } = await step.ai.wrap('anthropic-generate-text', generateText, {
      system: 'You are a helpful assistant',
      model: anthropic('claude-3-5-haiku-latest'),
      prompt: 'What is 2+2 ',
    })

    return {
      gemini: geminiSteps,
      openai: openaiSteps,
      anthropic: anthropicSteps,
      message: 'AI Messages',
    }
  }
)
