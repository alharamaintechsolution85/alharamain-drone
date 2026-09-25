'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Order Management',
    desc: 'Create, track, and manage delivery orders in one workflow.',
    icon: '▣',
    href: '/features',
    metrics: ['98.4% order completion', '12 active routes', '3 pending approvals'],
    srs: 'Order orchestration, dispatch controls, and fulfillment tracking for every mission lifecycle.'
  },
  {
    title: 'Route Planning',
    desc: 'AI-assisted path optimization with constraints and safety checks.',
    icon: '◎',
    href: '/simulation',
    metrics: ['ETA reduced by 12%', '3 no-fly regions detected', '2 route alternatives'],
    srs: 'Dynamic optimization engine balancing payload, airspace restrictions, and predicted weather conditions.'
  },
  {
    title: 'Digital Twin Simulation',
    desc: 'Watch drone behavior, telemetry, and routing in real time.',
    icon: '◈',
    href: '/simulation',
    metrics: ['Live digital twin', '3D airspace view', '72 simulation runs'],
    srs: 'Virtual operational mirror for validating drone behavior before field execution.'
  },
  {
    title: 'Real-Time Telemetry',
    desc: 'Battery, altitude, speed, and health data stream live.',
    icon: '◉',
    href: '/dashboard',
    metrics: ['24 drones online', '76% battery average', '4 min ETA'],
    srs: 'Live telemetry ingestion, anomaly warnings, and performance visibility for all assigned flights.'
  },
  {
    title: 'Safety Systems',
    desc: 'Parachutes, geofencing, RTH, and emergency escalation logic.',
    icon: '⛨',
    href: '/compliance',
    metrics: ['2 emergency zones', 'RTH auto-enabled', '1 alert escalated'],
    srs: 'Airspace protection, emergency handling, and safe return logic across mission classes.'
  },
  {
    title: 'Compliance & Reporting',
    desc: 'Flight plans, audit logs, certificates, and proof records.',
    icon: '▤',
    href: '/compliance',
    metrics: ['Audit trails active', '7 flight reports', '1 certification pending'],
    srs: 'Operational evidence capture and compliance reporting for mission accountability.'
  }
];

export function FeatureGrid() {
  const [selectedFeature, setSelectedFeature] = useState<(typeof features)[number] | null>(null);

  return (
    <>
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white px-5 py-6 shadow-soft md:px-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-bold tracking-[-0.04em] text-[#0a243d]">Core System Features</div>
            <div className="mt-1 text-slate-500">Complete simulation platform covering the entire drone lifecycle.</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <motion.button
              key={feature.title}
              type="button"
              onClick={() => setSelectedFeature(feature)}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-100 hover:bg-white hover:shadow-[0_16px_32px_rgba(13,92,158,0.08)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf6ff] text-xl text-[#0d5c9e] shadow-inner transition group-hover:scale-105 group-hover:bg-[#dfefff]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0a243d]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.desc}</p>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0d5c9e]">Open module details</div>
            </motion.button>
          ))}
        </div>
      </section>

      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.28)]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0d5c9e]">Feature module</div>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.05em] text-[#0a243d]">{selectedFeature.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600"
              >
                Close
              </button>
            </div>

            <p className="text-sm leading-7 text-slate-600">{selectedFeature.srs}</p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {selectedFeature.metrics.map((metric) => (
                <div key={metric} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                  {metric}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={selectedFeature.href} className="rounded-full bg-[#0d5c9e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-[#0a4f92]">
                Open module
              </a>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Continue browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
