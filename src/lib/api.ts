import type { ApiResponse, DashboardSummary } from '@/types/api';

const defaultBaseUrl = 'http://localhost:3000/api';

const resolveBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultBaseUrl;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${resolveBaseUrl()}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const api = {
  async getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
    return request<ApiResponse<DashboardSummary>>('/dashboard-summary');
  },

  async getTelemetry(): Promise<ApiResponse<DashboardSummary['liveTelemetry']>> {
    return request<ApiResponse<DashboardSummary['liveTelemetry']>>('/telemetry');
  },

  async getWeather(): Promise<ApiResponse<DashboardSummary['weather']>> {
    return request<ApiResponse<DashboardSummary['weather']>>('/weather');
  },

  async ping(): Promise<{ ok: boolean; timestamp: string }> {
    return request<{ ok: boolean; timestamp: string }>('/health');
  },
};

export type ApiClient = typeof api;
