import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type TrendConcept = {
  hook: string;
  challenge: string;
  hashtags: string[];
  description: string;
};

export type GeneratedContent = {
  trend: TrendConcept;
  imageUrl: string;
  viralScore: number;
}; 