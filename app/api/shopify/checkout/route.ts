import { NextResponse } from 'next/server';
import { createCheckout } from '@/lib/shopify';

type CheckoutLine = {
  merchandiseId: string;
  quantity: number;
};

function sanitizeLines(value: unknown): CheckoutLine[] | null {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const lines: CheckoutLine[] = [];
  for (const entry of value) {
    if (typeof entry !== 'object' || entry === null) {
      return null;
    }
    const { merchandiseId, quantity } = entry as { merchandiseId?: unknown; quantity?: unknown };
    if (typeof merchandiseId !== 'string' || merchandiseId.trim() === '') {
      return null;
    }
    const qty = typeof quantity === 'number' && Number.isInteger(quantity) ? quantity : 1;
    if (qty <= 0) {
      return null;
    }
    lines.push({ merchandiseId, quantity: qty });
  }

  return lines;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lines = sanitizeLines(body?.lines);

    if (!lines) {
      return NextResponse.json({ error: 'Invalid cart payload' }, { status: 400 });
    }

    const checkout = await createCheckout(lines);
    return NextResponse.json(checkout);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
