'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

interface MagicInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MagicInput({ 
  onSubmit, 
  placeholder = "Describe your trend idea...",
  className 
}: MagicInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <motion.div
      className={cn(
        "relative group w-full max-w-2xl mx-auto",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input 
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={placeholder}
          className="w-full bg-black/40 rounded-2xl p-6 pl-14 text-purple-300
                    transition-all duration-300 border border-white/10
                    placeholder:text-purple-400/70 focus:outline-none focus:ring-2 
                    focus:ring-purple-500/50 hover:border-white/20"
        />
        <SparklesIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 
                                text-white/50 group-hover:text-white/70 transition-colors" />
      </div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 
                      pointer-events-none rounded-2xl mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 
                      to-pink-500/20 opacity-0 group-hover:opacity-100 
                      transition-opacity rounded-2xl blur-xl -z-10" />
    </motion.div>
  );
} 