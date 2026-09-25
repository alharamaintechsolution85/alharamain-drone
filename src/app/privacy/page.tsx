'use client';

import { AppShell } from '@/components/app-shell';

export default function PrivacyPage() {
  return (
    <AppShell pageTitle="Privacy Policy">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] text-sm leading-7 text-[var(--muted)]">
        <p>
          We collect operational telemetry, compliance metadata, and service diagnostics to maintain safe drone operations. Data is used only for operational monitoring, alerts, and security orchestration.
        </p>
        <p className="mt-4">
          Access to sensitive data is restricted to authorized personnel through role-based access controls and encrypted transport.
        </p>
      </div>
    </AppShell>
  );
}
