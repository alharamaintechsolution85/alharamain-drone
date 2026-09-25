import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      droneId: 'AH-102',
      altitude: 120,
      speed: 42,
      battery: 76,
      eta: '4 min',
      status: 'En Route to Delivery Point',
    },
    timestamp: new Date().toISOString(),
  });
}
