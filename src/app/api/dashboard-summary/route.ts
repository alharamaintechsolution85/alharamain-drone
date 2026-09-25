import { NextResponse } from 'next/server';

const dashboardSummary = {
  fleetSummary: {
    activeDrones: 24,
    deliveriesToday: 156,
    onTimeRate: 98,
    activeRoutes: 12,
  },
  liveTelemetry: {
    droneId: 'AH-102',
    altitude: 120,
    speed: 42,
    battery: 76,
    eta: '4 min',
    status: 'En Route to Delivery Point',
  },
  weather: {
    condition: 'Clear skies',
    temperature: 31,
    humidity: 42,
    windSpeed: 12,
    visibility: '10 km',
  },
  recentEvents: [
    { name: 'AH-102', details: 'Departed from Distribution Hub', time: '2 min ago', status: 'success' },
    { name: 'AH-087', details: 'Delivered to Customer', time: '8 min ago', status: 'neutral' },
    { name: 'AH-066', details: 'Low Battery Warning', time: '12 min ago', status: 'warning' },
    { name: 'AH-041', details: 'En Route to Delivery Point', time: '15 min ago', status: 'success' },
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: dashboardSummary,
    timestamp: new Date().toISOString(),
  });
}
