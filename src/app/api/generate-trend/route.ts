import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import type { TrendConcept } from '@/lib/openai';

const SYSTEM_PROMPT = `You are an expert TikTok trend analyst and creator. Generate viral TikTok trend concepts that are engaging, fun, and have high potential for user participation. Format your response as a JSON object with the following structure:
{
  "hook": "catchy opening line",
  "challenge": "clear, simple challenge description",
  "hashtags": ["list", "of", "relevant", "hashtags"],
  "description": "detailed explanation of the trend"
}`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt || "Generate a viral TikTok trend concept" }
      ],
      response_format: { type: "json_object" }
    });

    const trendConcept = JSON.parse(completion.choices[0].message.content!) as TrendConcept;
    
    // Calculate a mock viral score based on various factors
    const viralScore = Math.floor(Math.random() * 30) + 70; // 70-100 range

    return NextResponse.json({ trend: trendConcept, viralScore });
  } catch (error) {
    console.error('Error generating trend:', error);
    return NextResponse.json(
      { error: 'Failed to generate trend concept' },
      { status: 500 }
    );
  }
} 