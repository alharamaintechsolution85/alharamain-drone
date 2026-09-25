'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPinned, Route, ShieldCheck, Sparkles } from 'lucide-react';
import type { DashboardSummary } from '@/types/api';

function DroneGlyph() {
  return (
    <svg
      viewBox="0 0 220 110"
      role="img"
      aria-label="Futuristic drone"
      className="h-auto w-[150px] drop-shadow-[0_25px_40px_rgba(255,255,255,0.15)]"
      style={{ filter: 'brightness(1.3) contrast(1.15)' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="drone-body" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <stop offset="45%" stopColor="rgba(203,213,225,0.96)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.92)" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 60 L70 40 L150 40 L180 60 L150 80 L70 80 Z" fill="url(#drone-body)" stroke="rgba(255,255,255,0.8)" />
        <path d="M85 40 L100 20 L120 20 L135 40" fill="none" />
        <path d="M76 80 L90 96 L110 96 L124 80" fill="none" />
        <path d="M54 60 L32 58 M166 60 L194 58 M110 28 L110 12 M110 92 L110 106" />
        <circle cx="65" cy="60" r="9" fill="rgba(255,255,255,0.85)" stroke="rgba(148,163,184,0.9)" />
        <circle cx="155" cy="60" r="9" fill="rgba(255,255,255,0.85)" stroke="rgba(148,163,184,0.9)" />
        <path d="M52 60 H32 M188 60 H168 M110 28 V12 M110 92 V106" stroke="rgba(255,255,255,0.75)" />
      </g>

      <g fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 52 L18 45 M20 68 L18 75 M200 52 L202 45 M200 68 L202 75" />
      </g>
    </svg>
  );
}

const stats = [
  { icon: Sparkles, label: 'Fleet Simulation', value: 'Real-time', href: '/simulation' },
  { icon: Route, label: 'Route Optimization', value: 'AI Planners', href: '/features' },
  { icon: MapPinned, label: 'Live Tracking', value: 'Geo-aware', href: '/dashboard' },
  { icon: ShieldCheck, label: 'Compliance', value: 'Secure', href: '/compliance' }
];

export function Hero({ summary, loading, error }: { summary?: DashboardSummary; loading?: boolean; error?: string | null }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[30px] border border-slate-200 bg-slate-900 shadow-soft">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.38),_transparent_28%),linear-gradient(90deg,rgba(15,23,42,0.84)_0%,rgba(15,23,42,0.68)_38%,rgba(15,23,42,0.55)_100%)]" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30"
        animate={{ x: ['2%', '82%', '2%'], y: [35, -20, 25, -10, 35], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 30, pointerEvents: 'none' }}
      >
        <div
          style={{
            position: 'absolute',
            left: '0%',
            top: '18%',
            width: '150px',
            height: 'auto',
            lineHeight: 0,
          }}
        >
          <DroneGlyph />
        </div>
      </motion.div>

      <div className="relative z-10 grid gap-8 px-5 py-8 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-12">
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/7 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-blue-100 backdrop-blur-sm">
            Autonomous drone operations
          </div>

          <h1 className="max-w-[620px] text-4xl font-black leading-[1.04] tracking-[-0.06em] text-white md:text-[4.3rem]">
            Simulate Smarter
            <span className="mt-2 block text-white">Deliver Further</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-200 md:text-lg">
            A complete software simulation platform for autonomous drone fleet management, delivery operations,
            route planning, live tracking, and regulatory compliance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/simulation" className="rounded-full bg-[#0d5c9e] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/30 transition hover:bg-[#0a4f92]">
              Launch Simulation
            </Link>
            <Link href="/features" className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15">
              Explore Features
            </Link>
          </div>

          <div className="mt-7 grid max-w-[540px] grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, href }) => (
              <motion.div key={label} whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="relative">
                <Link
                  href={href}
                  className="group block rounded-2xl border border-white/10 bg-slate-900/30 p-3 shadow-sm backdrop-blur-md transition hover:border-blue-200/50 hover:bg-slate-900/40"
                  aria-label={`Open ${label}`}
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf7ff] text-[#0d5c9e] shadow-inner transition group-hover:bg-[#dfefff] group-hover:text-[#0b4e8d]">
                    <Icon size={16} />
                  </div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-300">{label}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{value}</div>
                </Link>
              </motion.div>
            ))}
          </div>

          {loading && <div className="mt-4 text-xs text-slate-300">Loading live simulation data…</div>}
          {error && <div className="mt-4 text-xs text-amber-200">Simulated fallback active: {error}</div>}
        </div>

        <div className="relative flex min-h-[420px] items-end justify-end lg:py-6" />
      </div>
    </section>
  );
}
