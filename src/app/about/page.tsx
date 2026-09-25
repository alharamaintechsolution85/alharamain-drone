'use client';

import { AppShell } from '@/components/app-shell';

export default function AboutPage() {
  return (
    <AppShell pageTitle="About Al Haramain Drone Group">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Our Vision</div>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            We build intelligent, safe, and scalable drone logistics simulation systems for high-density smart-city operations and autonomous delivery orchestration.
          </p>
        </div>
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Technology Stack</div>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li>Next.js 14 + TypeScript</li>
            <li>Supabase + Postgres + Realtime</li>
            <li>Framer Motion + Tailwind UI</li>
            <li>MapLibre + Turf.js + Recharts</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
