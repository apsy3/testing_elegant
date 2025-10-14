'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const baseStyles =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 btn-focus shadow-soft';

const variantStyles: Record<'primary' | 'secondary' | 'ghost', string> = {
  primary: 'bg-charcoal text-white hover:bg-gold hover:text-charcoal',
  secondary: 'bg-transparent border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold',
  ghost: 'bg-transparent text-charcoal hover:text-gold'
};

const sizeStyles: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base'
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className
}: {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}
