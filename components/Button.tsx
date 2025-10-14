'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-200 btn-focus',
  {
    variants: {
      variant: {
        primary: 'bg-charcoal text-white hover:bg-gold hover:text-white shadow-soft',
        secondary: 'border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold bg-white',
        ghost: 'text-charcoal hover:text-gold'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, asChild = false, ...rest } = props;
  const Component = asChild ? Slot : 'button';
  return <Component className={cn(buttonVariants({ variant }), className)} ref={ref} {...rest} />;
});
Button.displayName = 'Button';
