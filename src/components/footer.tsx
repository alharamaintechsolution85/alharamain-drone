import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-8 rounded-[28px] border border-slate-200 bg-[#0d1f36] px-5 py-8 text-white shadow-soft md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-black tracking-[-0.05em]">Built for Real-World Scenarios</div>
          <div className="mt-2 text-sm text-slate-300">
            Test, iterate, and optimize delivery operations at scale — all in simulation.
          </div>
        </div>
        <Link href="/simulation" className="rounded-full bg-[#0f6ecf] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d61b4]">
          Start Your Simulation
        </Link>
      </div>
    </footer>
  );
}
