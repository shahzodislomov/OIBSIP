'use client';

import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerStep?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  delay = 100,
  staggerStep = 30,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const letters = containerRef.current.querySelectorAll('.split-char');

    animate(letters, {
      translateY: [40, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 800,
      delay: stagger(staggerStep, { start: delay }),
    });
  }, [text, delay, staggerStep]);

  const words = text.split(' ');

  return (
    <h1 ref={containerRef} className={cn('overflow-hidden flex flex-wrap gap-x-2 gap-y-1', className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="split-char inline-block opacity-0 transform-gpu">
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
};
