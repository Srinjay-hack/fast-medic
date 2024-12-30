import { NextResponse } from 'next/server';
import { getShop } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const shopId = parseInt(params.id);
  const shop = getShop(shopId);

  if (shop) {
    return NextResponse.json(shop);
  } else {
    return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
  }
}

