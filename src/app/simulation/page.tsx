'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { motion } from 'framer-motion';
import { RegisterDroneModal } from '@/components/register-drone-modal';

const tabs = ['3D View', 'Route Planning', 'Telemetry Data', 'Delivery Flow'];

export default function SimulationPage() {
  const [activeTab, setActiveTab] = useState('3D View');
  const [routeMode, setRouteMode] = useState('Optimized');
  const [speed, setSpeed] = useState(72);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <>
      <AppShell pageTitle="Simulation Console">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setConnectOpen(true)}
            className="rounded-full bg-[#0d5c9e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-[#0a4f92]"
          >
            Connect & Register Real Drone
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)]">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`mb-2 flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-medium transition ${
                  activeTab === tab ? 'border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)]' : 'border-[var(--border)] text-[var(--muted)]'
                }`}
              >
                {tab}
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </button>
            ))}
          </aside>

          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]"
          >
            {activeTab === '3D View' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">3D Digital Twin View</div>
                  <div className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Active</div>
                </div>
                <div className="h-[420px] rounded-[24px] bg-[radial-gradient(circle_at_center,_rgba(14,116,144,0.2),_rgba(15,23,42,0.98)_60%,_rgba(2,6,23,1)_100%)] p-4">
                  <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/10">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
                    <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cyan-300/60" />
                    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/40" />
                    <div className="absolute bottom-6 left-6 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-sm">Drone AH-102 simulating route</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Route Planning' && (
              <div className="space-y-4">
                <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Route Optimization</div>
                <div className="grid gap-4 md:grid-cols-2">
                  {['Optimized', 'Fastest', 'Safe', 'Balanced'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setRouteMode(mode)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium ${routeMode === mode ? 'border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)]' : 'border-[var(--border)] text-[var(--muted)]'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--foreground)]">
                  {routeMode} route: Hub → Market District → Mosque District → Customer Point. ETA reduced by 12% with no-fly avoidance applied.
                </div>
              </div>
            )}

            {activeTab === 'Telemetry Data' && (
              <div className="space-y-4">
                <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Telemetry Feed</div>
                <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm text-[var(--muted)]"><span>Speed</span><span>{speed} km/h</span></div>
                    <input type="range" min="20" max="120" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="w-full accent-[var(--primary)]" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-4">Altitude: 120m</div>
                    <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-4">Battery: 76%</div>
                    <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-4">Pitch/Roll: 4° / 2°</div>
                    <div className="rounded-2xl border border-[var(--border)] bg-white/40 p-4">Weather: Stable</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Delivery Flow' && (
              <div className="space-y-4">
                <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Delivery Flow</div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm text-[var(--foreground)]">
                  The drone is en route, geofence checks are stable, proof capture is ready, and safe-drop verification is awaiting recipient confirmation.
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {['Order confirmed', 'Lift-off', 'Drop completed'].map((step, index) => (
                    <div key={step} className={`rounded-2xl border p-4 text-sm ${index === 1 ? 'border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)]' : 'border-[var(--border)] bg-white/30 text-[var(--muted)]'}`}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        </div>
      </AppShell>
      <RegisterDroneModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </>
  );
}
