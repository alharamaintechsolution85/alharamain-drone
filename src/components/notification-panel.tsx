'use client';

import { Bell, ShieldAlert, Wifi, Zap } from 'lucide-react';

const alerts = [
  {
    id: 'A-001',
    title: 'Battery warning',
    detail: 'Drone AH-066 dropped below the 20% safety threshold.',
    time: '2 min ago',
    severity: 'warning',
    icon: ShieldAlert,
  },
  {
    id: 'A-002',
    title: 'Telemetry sync',
    detail: 'GPS lock recovered for AH-102 over the urban corridor.',
    time: '7 min ago',
    severity: 'info',
    icon: Wifi,
  },
  {
    id: 'A-003',
    title: 'Charging complete',
    detail: 'Drone AH-041 completed a fast-charge cycle and is ready.',
    time: '11 min ago',
    severity: 'success',
    icon: Zap,
  },
];

export function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-20 z-[70] mx-auto w-[min(90vw,440px)] rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
      <div className="mb-3 flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-[#0d5c9e]" />
          <div className="text-sm font-bold text-slate-800">Notifications</div>
        </div>
        <button type="button" onClick={onClose} className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Close</button>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const tone =
            alert.severity === 'warning'
              ? 'border-amber-200 bg-amber-50'
              : alert.severity === 'success'
                ? 'border-emerald-200 bg-emerald-50'
                : 'border-blue-200 bg-blue-50';

          return (
            <div key={alert.id} className={`rounded-2xl border p-3 ${tone}`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className="h-4 w-4 text-slate-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-800">{alert.title}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{alert.time}</div>
                  </div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">{alert.detail}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
