'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MagicInput from '@/components/MagicInput';
import PhonePreview from '@/components/PhonePreview';
import type { TrendConcept, GeneratedContent } from '@/lib/openai';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);

  const generateContent = async (prompt: string) => {
    try {
      setIsLoading(true);
      
      // Generate trend concept
      const trendRes = await fetch('/api/generate-trend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!trendRes.ok) throw new Error('Failed to generate trend');
      const { trend, viralScore } = await trendRes.json();
      
      // Generate matching image
      const imageRes = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, trend })
      });
      
      if (!imageRes.ok) throw new Error('Failed to generate image');
      const { imageUrl } = await imageRes.json();
      
      setContent({ trend, imageUrl, viralScore });
    } catch (error) {
      console.error('Error generating content:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-purple-950 to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            TrendAlchemy
          </h1>
          <p className="text-lg text-white/70">
            Transform your ideas into viral TikTok trends with AI magic
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-16">
          <MagicInput onSubmit={generateContent} />
        </div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <PhonePreview
            image={content?.imageUrl}
            trend={content?.trend}
            viralScore={content?.viralScore}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </main>
  );
}
