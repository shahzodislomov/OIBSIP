'use client';

import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const FloatingPizzas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.floating-pizza-item');

    animate(items, {
      translateY: [-20, 20],
      translateX: [-15, 15],
      rotate: [-15, 15],
      duration: 6000,
      alternate: true,
      loop: true,
      easing: 'easeInOutSine',
    });
  }, []);

  const pizzas = [
    { icon: '🍕', top: '12%', left: '8%', size: '3.5rem', opacity: 0.25 },
    { icon: '🧀', top: '25%', right: '12%', size: '2.8rem', opacity: 0.2 },
    { icon: '🍅', top: '65%', left: '5%', size: '2.5rem', opacity: 0.25 },
    { icon: '🍄', top: '75%', right: '8%', size: '3rem', opacity: 0.2 },
    { icon: '🫑', top: '40%', left: '88%', size: '2.4rem', opacity: 0.18 },
    { icon: '🌶️', top: '85%', left: '42%', size: '2.6rem', opacity: 0.22 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {pizzas.map((item, idx) => (
        <div
          key={idx}
          className="floating-pizza-item absolute select-none filter blur-[0.5px]"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            fontSize: item.size,
            opacity: item.opacity,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};
