'use client';

import React, { useRef } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';

interface MagnetButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  magnetStrength?: number;
  className?: string;
}

export const MagnetButton: React.FC<MagnetButtonProps> = ({
  children,
  magnetStrength = 0.3,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magnetStrength;
    const distanceY = (e.clientY - centerY) * magnetStrength;

    animate(containerRef.current, {
      translateX: distanceX,
      translateY: distanceY,
      duration: 300,
      easing: 'easeOutQuad',
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    animate(containerRef.current, {
      translateX: 0,
      translateY: 0,
      duration: 600,
      easing: 'easeOutElastic(1, .5)',
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative inline-block transition-transform', className)}
      {...props}
    >
      {children}
    </div>
  );
};
