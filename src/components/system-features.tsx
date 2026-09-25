import Link from 'next/link';

const architecture = [
  'Next.js 14+ (App Router)',
  'Frontend & API Layer',
  'Supabase + Postgres + RLS',
  'Realtime telemetry engine',
  'Dockerized simulation services',
  'Cloudflare R2 storage'
];

export function SystemFeatures() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 text-3xl font-bold tracking-[-0.05em] text-[#0a243d]">Simulation in Action</div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3 text-[#0a243d]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf6ff] text-[#0d5c9e]">◧</span>
              <span className="font-semibold">3D View</span>
            </div>
            <div className="flex items-center gap-3 text-[#0a243d]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf6ff] text-[#0d5c9e]">◫</span>
              <span className="font-semibold">Route Planning</span>
            </div>
            <div className="flex items-center gap-3 text-[#0a243d]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf6ff] text-[#0d5c9e]">◍</span>
              <span className="font-semibold">Telemetry Data</span>
            </div>
            <div className="flex items-center gap-3 text-[#0a243d]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf6ff] text-[#0d5c9e]">◌</span>
              <span className="font-semibold">Delivery Flow</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-[linear-gradient(180deg,#cfe9ff_0%,#f6fbff_48%,#d9eaf9_100%)] p-3">
            <img
              src="/drone-hero.png"
              alt="Drone simulation preview"
              className="h-full min-h-[260px] w-full rounded-[18px] object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/50 bg-white/70 p-3 backdrop-blur-md">
              <div className="text-xs uppercase tracking-[0.12em] text-slate-500">Simulation status</div>
              <div className="mt-1 text-sm font-semibold text-[#0a243d]">Drones in flight: 12</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 text-3xl font-bold tracking-[-0.05em] text-[#0a243d]">System Architecture</div>
        <div className="space-y-3">
          {architecture.map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf6ff] text-xs font-bold text-[#0d5c9e]">
                {index + 1}
              </div>
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
