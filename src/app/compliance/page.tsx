'use client';

import { AppShell } from '@/components/app-shell';

const complianceChecks = [
  { label: 'Airspace Restrictions', value: 'Validated' },
  { label: 'Flight Logs', value: 'Synced' },
  { label: 'Battery Safety', value: 'Nominal' },
  { label: 'Proof of Delivery', value: 'Captured' },
  { label: 'Geo-fence Alerts', value: 'Monitoring' },
  { label: 'Audit Trails', value: 'Enabled' },
];

export default function CompliancePage() {
  return (
    <AppShell pageTitle="Compliance & Safety Center">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Operational Compliance</div>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Every drone mission is checked against regulatory constraints, geofence rules, and safety thresholds before launch and while airborne.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {complianceChecks.map((check) => (
              <div key={check.label} className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{check.label}</div>
                <div className="mt-2 text-lg font-bold text-[var(--foreground)]">{check.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)]">
          <div className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Regulatory Notes</div>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            <li>• No-fly zones are enforced automatically within the route planner.</li>
            <li>• Airspace checks occur before takeoff and during route deviations.</li>
            <li>• Proof-of-delivery logs are retained for operational audits.</li>
            <li>• Emergency return-to-home is enabled when battery thresholds are crossed.</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
