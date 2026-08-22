import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="w-full relative flex flex-col gap-1">
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-3.5 text-stone-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'w-full bg-stone-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200',
              icon && 'pl-10',
              error && 'border-red-500 focus:ring-red-500/50',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-400 pl-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
