'use client';

import React from 'react';

export const FloatingPizzas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[350px] rounded-full filter blur-[120px]"
        style={{ background: 'rgba(224, 86, 56, 0.05)' }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[300px] rounded-full filter blur-[120px]"
        style={{ background: 'rgba(217, 119, 6, 0.04)' }}
      />
    </div>
  );
};
