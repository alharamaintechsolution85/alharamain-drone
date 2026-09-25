import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      condition: 'Clear skies',
      temperature: 31,
      humidity: 42,
      windSpeed: 12,
      visibility: '10 km',
    },
    timestamp: new Date().toISOString(),
  });
}
