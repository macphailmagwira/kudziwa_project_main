import { OpenAI } from 'openai';
import { OpenAIStream } from 'ai';

// Set runtime to edge for streaming support
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the prompt from the request body
  const { prompt } = await req.json();

  console.log('Workflow is running', prompt);

  // Initialize Azure OpenAI client using OpenAI SDK
  const openai = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY!,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
    defaultQuery: { "api-version": "2023-05-15" },
    defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY! },
  });

  // Create the completion with streaming
  const response = await openai.chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME!,
    messages: [
      { role: "system", content: "You are an expert culinary chef" },
      { role: "user", content: prompt }
    ],
    temperature: 0.6,
    frequency_penalty: 0.2,
    presence_penalty: 0.3,
    max_tokens: 700,
    stream: true,
  });

  // Convert the response to a stream
  const stream = OpenAIStream(response);
  
  // Return the stream
  return new Response(stream);
}