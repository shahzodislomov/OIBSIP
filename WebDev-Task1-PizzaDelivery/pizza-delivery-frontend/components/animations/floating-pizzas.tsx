'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const FloatingPizzas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const orbs = containerRef.current.querySelectorAll('.ambient-orb');

    animate(orbs, {
      translateY: [-30, 30],
      translateX: [-25, 25],
      scale: [0.9, 1.15],
      opacity: [0.15, 0.35],
      duration: 8000,
      alternate: true,
      loop: true,
      easing: 'easeInOutSine',
    });
  }, []);

  const orbs = [
    { top: '10%', left: '15%', size: '380px', color: 'rgba(249, 115, 22, 0.12)' },
    { top: '45%', right: '10%', size: '420px', color: 'rgba(225, 29, 72, 0.09)' },
    { top: '70%', left: '8%', size: '340px', color: 'rgba(251, 191, 36, 0.08)' },
    { top: '25%', right: '30%', size: '300px', color: 'rgba(249, 115, 22, 0.06)' },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((item, idx) => (
        <div
          key={idx}
          className="ambient-orb absolute rounded-full filter blur-[90px]"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            width: item.size,
            height: item.size,
            background: item.color,
          }}
        />
      ))}
    </div>
  );
};
