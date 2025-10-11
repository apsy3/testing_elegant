import { SITE_CONFIG } from '@/lib/config';
import { formatCurrency } from '@/lib/utils';

interface PriceProps {
  amount: number;
  currencyCode?: string;
}

export default function Price({ amount, currencyCode = SITE_CONFIG.currency }: PriceProps) {
  return (
    <p className="text-base font-medium text-charcoal">
      {formatCurrency(amount, currencyCode, SITE_CONFIG.locale)}
    </p>
  );
}
