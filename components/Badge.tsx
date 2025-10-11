import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'soft';
}

export default function Badge({ children, variant = 'solid' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs uppercase tracking-wide',
        variant === 'solid'
          ? 'bg-gold text-white shadow-soft'
          : 'bg-white/90 text-charcoal shadow-soft'
      )}
    >
      {children}
    </span>
  );
}
