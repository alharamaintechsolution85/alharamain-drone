'use client';

import { AppShell } from '@/components/app-shell';

export default function SupportPage() {
  return (
    <AppShell pageTitle="Support Center">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Contact</div>
          <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <p>Email: support@alharamaindrones.io</p>
            <p>Phone: +966 12 345 6789</p>
            <p>Service Hours: 24/7 Operations Desk</p>
          </div>
        </div>
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Escalation</div>
          <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <li>• Fleet issue triage</li>
            <li>• Network outage reports</li>
            <li>• Safety and compliance alerts</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
