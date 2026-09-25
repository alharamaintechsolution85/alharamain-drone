export type MetricStatus = 'success' | 'warning' | 'neutral';

export interface FleetSummary {
  activeDrones: number;
  deliveriesToday: number;
  onTimeRate: number;
  activeRoutes: number;
}

export interface LiveTelemetrySnapshot {
  droneId: string;
  altitude: number;
  speed: number;
  battery: number;
  eta: string;
  status: string;
}

export interface WeatherSnapshot {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: string;
}

export interface RecentEvent {
  name: string;
  details: string;
  time: string;
  status: MetricStatus;
}

export interface DashboardSummary {
  fleetSummary: FleetSummary;
  liveTelemetry: LiveTelemetrySnapshot;
  weather: WeatherSnapshot;
  recentEvents: RecentEvent[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}
