'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const featureModules = [
  'Dynamic No-Fly Zone Avoidance',
  'Precision QR Landing Pad Identification',
  'Emergency Parachute System',
  'AI Weight & Payload Balancer',
  'Multi-Drop Route Optimization',
  'Live Telemetry Dashboard',
  'Geofenced Automated Drop-Off',
  'Anti-Theft Tether Release System',
  'Automated Battery Swap Station Integration',
  'Obstacle Detection via Vision',
  'Silent Flight Mode Profile',
  'Cold-Chain Temperature Monitoring',
  'Customer OTP Safe Drop',
  'Fail-Safe Return-To-Home',
  'Wind Resistance Compensation Engine',
  'In-Flight Fleet Telemetry Analytics',
  'Dynamic Delivery Time Predictor',
  'Payload Compartment Locking',
  'Swarm Communication Panel',
  'Predictive Maintenance Alerts',
  'Live 3D Drone Stream Preview',
  'Real-Time ADS-B Air Traffic Integration',
  'Regulatory Flight Plan Submission',
  'Per-Flight Insurance & Liability',
  'Chain-of-Custody Telemetry Logging',
  'Expiring Tracking Links',
  'Emergency Landing Zone Database',
  'Secure Firmware OTA Updates',
  'Fleet Battery Health Prediction',
  'Cybersecurity & Anti-Spoofing',
  'Delivery Proof Capture',
  'Live Delivery Support Chat',
  'Offline PWA Shell Indicator',
  'Audit Trail Viewer',
  'System Health & Rate-Limit Monitor',
];

export function FeatureModules() {
  const [selected, setSelected] = useState(featureModules[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)]">
        <div className="mb-4 text-lg font-bold tracking-[-0.04em] text-[var(--foreground)]">SRS Feature Modules</div>
        <div className="space-y-2">
          {featureModules.map((module) => (
            <button
              key={module}
              type="button"
              onClick={() => setSelected(module)}
              className={`w-full rounded-2xl border px-3 py-3 text-left text-sm transition ${
                selected === module
                  ? 'border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)]'
                  : 'border-[var(--border)] text-[var(--muted)] hover:bg-white/5'
              }`}
            >
              {module}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]"
      >
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Active module</div>
        <h2 className="text-2xl font-black tracking-[-0.05em] text-[var(--foreground)]">{selected}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Frontend</div>
            <p className="mt-3 text-sm text-[var(--foreground)]">Interactive map overlays, decision panels, and operator visual status indicators.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Backend Logic</div>
            <p className="mt-3 text-sm text-[var(--foreground)]">State engines, fallback logic, real-time policy checks, and simulation-safe automation.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Data & APIs</div>
            <p className="mt-3 text-sm text-[var(--foreground)]">Supabase, Open-Meteo, OpenSky, Turf.js, WebRTC, and Redis-backed fallback flows.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Simulation Label</div>
            <p className="mt-3 text-sm text-[var(--foreground)]">All simulated values are clearly marked as simulated / predicted for compliance and transparency.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
