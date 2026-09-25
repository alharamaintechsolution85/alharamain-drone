'use client';

import { AppShell } from '@/components/app-shell';

export default function DocumentationPage() {
  return (
    <AppShell pageTitle="Documentation & API Specs">
      <div className="grid gap-6 lg:grid-cols-3">
        {['Architecture', 'User Guides', 'API Reference', 'Compliance Notes'].map((section) => (
          <div key={section} className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]">
            <div className="text-lg font-bold tracking-[-0.04em] text-[var(--foreground)]">{section}</div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              <li>• Overview</li>
              <li>• Security model</li>
              <li>• RBAC and RLS</li>
              <li>• Telemetry flow</li>
            </ul>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
