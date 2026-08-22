'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  className?: string;
  parentClassName?: string;
  animateOnMount?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  className,
  parentClassName,
  animateOnMount = true,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovered, setIsHovered] = useState(false);

  const startAnimation = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((currentText) =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              if (index < iteration / maxIterations) {
                return text[index];
              }
            } else {
              if (Math.random() > 0.5) return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration > text.length * maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (animateOnMount) {
      startAnimation();
    }
  }, [text, animateOnMount]);

  return (
    <span
      className={cn('inline-block cursor-default select-none', parentClassName)}
      onMouseEnter={() => {
        setIsHovered(true);
        startAnimation();
      }}
    >
      <span className={cn('font-mono text-orange-400', className)}>{displayText}</span>
    </span>
  );
};
