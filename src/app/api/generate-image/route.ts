import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { prompt, trend } = await req.json();
    
    const enhancedPrompt = `Create a TikTok-worthy visual for the following trend: ${trend.description}. 
      The image should be: Ultra-modern, with neon accents and dynamic composition.
      Hook: "${trend.hook}"
      Challenge: "${trend.challenge}"
      Style: Vertical format optimized for TikTok, vibrant colors, youth culture aesthetic
      ${prompt ? `Additional requirements: ${prompt}` : ''}`;

    const dalleResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: "1024x1792", // Vertical TikTok aspect ratio
      quality: "standard",
      style: "vivid"
    });

    return NextResponse.json({ 
      imageUrl: dalleResponse.data[0].url,
      revisedPrompt: dalleResponse.data[0].revised_prompt 
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 