import { NextResponse } from 'next/server';
import { createOrder, getOrders } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get('userId') || '0');

  if (userId) {
    const orders = getOrders(userId);
    return NextResponse.json(orders);
  } else {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, items } = body;

  if (userId && items && Array.isArray(items)) {
    const order = createOrder(userId, items);
    return NextResponse.json(order);
  } else {
    return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
  }
}

