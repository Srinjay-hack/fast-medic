import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const orderId = parseInt(params.id);
  const body = await request.json();
  const { status } = body;

  if (status && ['pending', 'processing', 'delivered'].includes(status)) {
    const updatedOrder = updateOrderStatus(orderId, status);
    if (updatedOrder) {
      return NextResponse.json(updatedOrder);
    } else {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
}

