'use client';

import React, { useRef, useState } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface MagnetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magnetStrength;
    const distanceY = (e.clientY - centerY) * magnetStrength;

    anime({
      targets: buttonRef.current,
      translateX: distanceX,
      translateY: distanceY,
      duration: 300,
      easing: 'easeOutQuad',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    anime({
      targets: buttonRef.current,
      translateX: 0,
      translateY: 0,
      duration: 600,
      easing: 'easeOutElastic(1, .5)',
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative inline-flex items-center justify-center transition-transform', className)}
      {...props}
    >
      {children}
    </button>
  );
};
