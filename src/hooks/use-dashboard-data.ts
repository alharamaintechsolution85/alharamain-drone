'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ApiResponse, DashboardSummary } from '@/types/api';

const fallbackSummary: DashboardSummary = {
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

export function useDashboardData() {
  const [data, setData] = useState<DashboardSummary>(fallbackSummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dashboard-summary', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load simulation summary');
      }

      const payload = (await response.json()) as ApiResponse<DashboardSummary>;

      if (payload?.data) {
        setData(payload.data);
        setError(null);
      }
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Unknown error';
      setError(message);
      setData(fallbackSummary);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
