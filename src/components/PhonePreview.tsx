'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TrendConcept } from '@/lib/openai';

interface PhonePreviewProps {
  image?: string;
  trend?: TrendConcept;
  viralScore?: number;
  className?: string;
  isLoading?: boolean;
}

export default function PhonePreview({
  image,
  trend,
  viralScore,
  className,
  isLoading
}: PhonePreviewProps) {
  return (
    <div className={cn(
      "relative w-[300px] h-[600px] rounded-[3rem] border-[14px] border-black overflow-hidden bg-black",
      "before:absolute before:w-[148px] before:h-[18px] before:bg-black before:top-0 before:left-1/2 before:-translate-x-1/2 before:rounded-b-3xl before:z-50",
      className
    )}>
      <motion.div 
        className="relative w-full h-full overflow-hidden bg-neutral-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : image ? (
          <>
            <motion.img 
              src={image}
              alt="Generated content"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pb-6 px-4">
              {trend && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-white font-medium text-lg leading-tight mb-2">{trend.hook}</h3>
                  <p className="text-white/70 text-sm mb-3">{trend.challenge}</p>
                  <div className="flex flex-wrap gap-2">
                    {trend.hashtags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-white/10 text-white/90 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
              {viralScore && (
                <motion.div 
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    viralScore >= 90 ? "bg-green-500" :
                    viralScore >= 70 ? "bg-yellow-500" :
                    "bg-red-500"
                  )} />
                  <span className="text-white text-sm font-medium">{viralScore}%</span>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
            Your trend preview will appear here
          </div>
        )}
      </motion.div>
    </div>
  );
} 