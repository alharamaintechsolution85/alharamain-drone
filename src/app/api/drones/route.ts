import { NextResponse } from 'next/server';

const droneRecords: Record<string, any>[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: droneRecords,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const entry = {
      id: payload.id ?? `AH-${Date.now().toString().slice(-6)}`,
      ...payload,
      status: payload.status ?? 'Connected',
      createdAt: new Date().toISOString(),
    };

    droneRecords.unshift(entry);

    return NextResponse.json({
      success: true,
      data: entry,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Unable to save drone registration', timestamp: new Date().toISOString() },
      { status: 500 },
    );
  }
}
