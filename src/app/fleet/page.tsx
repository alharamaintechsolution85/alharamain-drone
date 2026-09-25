'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { motion } from 'framer-motion';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { RegisterDroneModal } from '@/components/register-drone-modal';

const drones = [
  { id: 'AH-102', status: 'Active', battery: '76%', route: 'City Centre Route', health: 'Healthy' },
  { id: 'AH-087', status: 'Charging', battery: '42%', route: 'Warehouse Loop', health: 'Maintenance' },
  { id: 'AH-066', status: 'Warning', battery: '18%', route: 'North Sector', health: 'Critical' },
  { id: 'AH-041', status: 'Idle', battery: '91%', route: 'Standby', health: 'Healthy' },
];

export default function FleetPage() {
  const { data, loading, error } = useDashboardData();
  const [statusFilter, setStatusFilter] = useState('All');
  const [connectOpen, setConnectOpen] = useState(false);

  const filteredDrones = useMemo(() => {
    if (statusFilter === 'All') return drones;
    return drones.filter((drone) => drone.status === statusFilter);
  }, [statusFilter]);

  return (
    <>
      <AppShell pageTitle="Fleet Management">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setConnectOpen(true)}
            className="rounded-full bg-[#0d5c9e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-[#0a4f92]"
          >
            Connect & Register Real Drone
          </button>
          {['All', 'Active', 'Charging', 'Warning', 'Idle'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`rounded-full border px-3 py-2 text-sm ${statusFilter === filter ? 'border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--muted)]'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mb-5 rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
          {loading ? 'Loading fleet telemetry…' : error ? `Showing fallback fleet data because of: ${error}` : `Fleet summary connected: ${data.fleetSummary.activeDrones} active drones, ${data.fleetSummary.activeRoutes} active routes`}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredDrones.map((drone) => (
            <motion.div key={drone.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">{drone.id}</div>
                <div className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  drone.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                  drone.status === 'Warning' ? 'bg-amber-100 text-amber-700' :
                  drone.status === 'Charging' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'
                }`}>{drone.status}</div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
                <div className="flex justify-between"><span>Battery</span><span>{drone.battery}</span></div>
                <div className="flex justify-between"><span>Route</span><span>{drone.route}</span></div>
                <div className="flex justify-between"><span>Health</span><span>{drone.health}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </AppShell>
      <RegisterDroneModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </>
  );
}
