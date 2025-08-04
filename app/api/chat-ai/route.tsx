import {google} from '@ai-sdk/google';
import {generateText} from 'ai';

const model = google('gemini-2.0-flash');

export async function POST(req: Request) {
    try {
        const {prompt} = await req.json();

        if (!prompt) {
            return new Response(JSON.stringify({error: 'Missing prompt'}), {status: 400});
        }

        const result = await generateText({model, prompt});
        return new Response(JSON.stringify({text: result.text}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: 'Failed to generate text'}), {status: 500});
    }
}