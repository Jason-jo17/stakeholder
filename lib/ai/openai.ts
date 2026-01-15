import OpenAI from 'openai'

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock-key',
    dangerouslyAllowBrowser: process.env.NODE_ENV === 'development' // Only if needed for client-side testing, usually server-side
})
