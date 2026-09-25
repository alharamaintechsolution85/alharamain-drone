'use client';

import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { FeatureGrid } from '@/components/feature-grid';
import { LiveTelemetry } from '@/components/live-telemetry';
import { SystemFeatures } from '@/components/system-features';
import { Footer } from '@/components/footer';
import { useDashboardData } from '@/hooks/use-dashboard-data';

export default function HomePage() {
  const { data, loading, error } = useDashboardData();

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-3 pb-10 pt-4 md:px-6">
        <Header />
        <Hero summary={data} loading={loading} error={error} />
        <FeatureGrid />
        <LiveTelemetry summary={data} loading={loading} error={error} />
        <SystemFeatures />
        <Footer />
      </div>
    </main>
  );
}
