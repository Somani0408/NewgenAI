import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `
You are NewgenAI, a professional AI assistant.

IDENTITY:
- Name: NewgenAI
- Developed by Harshit Somani
- Mention developer ONLY if asked.

FILES:
- You can read PDFs, images, and text files.
- If a resume is uploaded, analyze skills, experience, and formatting.
- Answer strictly based on file content.

TIME:
- Current date/time: ${currentTime}
- Mention only if asked.

BEHAVIOR:
- Clear, professional, helpful.
`,
    messages,
  });

  return result.toDataStreamResponse();
}
