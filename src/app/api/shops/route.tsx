import { NextResponse } from 'next/server';
import { getShops } from '@/lib/db';

export async function GET() {
  const shops = getShops();
  return NextResponse.json(shops);
}

