import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createCheckout } from '@/lib/shopify';

const CheckoutSchema = z.object({
  lines: z
    .array(
      z.object({
        merchandiseId: z.string().min(1),
        quantity: z.number().int().min(1).default(1)
      })
    )
    .min(1)
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = CheckoutSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid cart payload' }, { status: 400 });
    }

    const checkout = await createCheckout(parsed.data.lines);

    return NextResponse.json(checkout);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
