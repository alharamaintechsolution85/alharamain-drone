'use client';

import { AppShell } from '@/components/app-shell';
import { AutonomousFlightPanel } from '@/components/autonomous-flight-panel';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { motion } from 'framer-motion';
import { Activity, BatteryCharging, Gauge, Plane, Radar, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  const { data, loading, error, refresh } = useDashboardData();

  const kpis = [
    { label: 'Active Drones', value: String(data.fleetSummary.activeDrones), icon: Plane },
    { label: 'Deliveries Today', value: String(data.fleetSummary.deliveriesToday), icon: Activity },
    { label: 'On-Time Rate', value: `${data.fleetSummary.onTimeRate}%`, icon: ShieldCheck },
    { label: 'Battery Health', value: `${data.liveTelemetry.battery}%`, icon: BatteryCharging },
  ];

  return (
    <AppShell pageTitle="Executive Fleet Dashboard">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-[var(--muted)]">{loading ? 'Refreshing fleet data…' : error ? `Fallback mode: ${error}` : 'Live data connected'}</div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)]"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon }) => (
          <motion.div key={label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]">
            <div className="flex items-center justify-between">
              <div className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{label}</div>
              <Icon className="text-[var(--primary)]" size={18} />
            </div>
            <div className="mt-5 text-3xl font-black tracking-[-0.06em] text-[var(--foreground)]">{value}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Live Fleet Map</div>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Live
            </div>
          </div>
          <div className="h-[420px] rounded-[24px] bg-[radial-gradient(circle_at_center,_rgba(14,116,144,0.2),_rgba(15,23,42,0.95)_60%,_rgba(2,6,23,1)_100%)] p-4">
            <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="absolute left-[18%] top-[28%] h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
              <div className="absolute left-[52%] top-[46%] h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)]" />
              <div className="absolute left-[68%] top-[63%] h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.9)]" />
              <svg suppressHydrationWarning className="absolute inset-0 h-full w-full" viewBox="0 0 800 420" preserveAspectRatio="none">
                <path d="M80 300 C180 250, 250 290, 310 210 S490 180, 620 250 S720 320, 760 230" fill="none" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]">
            <div className="mb-4 flex items-center gap-2 text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
              <Gauge size={18} className="text-[var(--primary)]" /> Telemetry Snapshot
            </div>
            <div className="space-y-3 text-sm text-[var(--foreground)]">
              <div className="flex justify-between"><span>Drone</span><span>{data.liveTelemetry.droneId}</span></div>
              <div className="flex justify-between"><span>Altitude</span><span>{data.liveTelemetry.altitude}m</span></div>
              <div className="flex justify-between"><span>Speed</span><span>{data.liveTelemetry.speed} km/h</span></div>
              <div className="flex justify-between"><span>Battery</span><span>{data.liveTelemetry.battery}%</span></div>
              <div className="flex justify-between"><span>ETA</span><span>{data.liveTelemetry.eta}</span></div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]">
            <div className="mb-4 flex items-center gap-2 text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
              <Radar size={18} className="text-[var(--primary)]" /> Airspace Status
            </div>
            <div className="space-y-3 text-sm text-[var(--foreground)]">
              <div className="flex justify-between"><span>Weather</span><span>{data.weather.condition}</span></div>
              <div className="flex justify-between"><span>Visibility</span><span>{data.weather.visibility}</span></div>
              <div className="flex justify-between"><span>Wind</span><span>{data.weather.windSpeed} km/h</span></div>
              <div className="flex justify-between"><span>Status</span><span>{data.liveTelemetry.status}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AutonomousFlightPanel />
      </div>
    </AppShell>
  );
}
