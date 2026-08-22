import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'success' | 'warning' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors';

  const variants = {
    default: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    secondary: 'bg-stone-800 text-stone-300 border border-stone-700',
    accent: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    outline: 'bg-transparent text-stone-300 border border-white/20',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
