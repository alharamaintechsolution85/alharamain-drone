'use client';

import { AppShell } from '@/components/app-shell';

export default function TermsPage() {
  return (
    <AppShell pageTitle="Terms of Service">
      <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] text-sm leading-7 text-[var(--muted)]">
        <p>
          By using this platform, operators agree to comply with local airspace restrictions, mission safety policies, and system operating procedures.
        </p>
        <p className="mt-4">
          The platform is provided for operational planning and supervisory automation and is not a substitute for pilot judgment or regulatory compliance.
        </p>
      </div>
    </AppShell>
  );
}
