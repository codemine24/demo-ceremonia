import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { partner1, partner2, date, venue, story, vibe, refinement, oldScript } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API Key is missing' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    let prompt = '';

    if (refinement && oldScript) {
      prompt = `
      You are a professional wedding officiant.
      Here is the current script:
      """
      ${oldScript}
      """

      INSTRUCTION: Please rewrite or refine the script based on this feedback: "${refinement}".
      Keep the names (${partner1} and ${partner2}) and core details consistent.
      Return ONLY the updated script text.
      `;
    } else {
      prompt = `
      Act as a professional wedding officiant. Write a full wedding ceremony script.

      Couple: ${partner1} and ${partner2}
      Date: ${date}
      Venue: ${venue}

      Their Story:
      - How they met: ${story.howWeMet}
      - The Proposal: ${story.proposal}
      - What they love about each other: ${story.whatWeLove}

      Vibe/Tone: ${vibe.tone}
      Rituals to include: ${vibe.rituals.join(', ')}

      The script should include:
      1. A warm welcome to guests.
      2. The couple's story woven into the address.
      3. The specified rituals.
      4. Exchange of vows (placeholders or suggested text).
      5. Ring exchange.
      6. Pronouncement and Kiss.
      7. Closing.

      Make it ${vibe.tone}.
      Return ONLY the script text, formatted nicely with line breaks.
      `;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ script: text });
  } catch (error: any) {
    console.error('Error generating script:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate script' }, { status: 500 });
  }
}
