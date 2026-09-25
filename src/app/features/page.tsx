'use client';

import { AppShell } from '@/components/app-shell';
import { FeatureModules } from '@/components/feature-modules';

export default function FeaturesPage() {
  return (
    <AppShell pageTitle="Complete SRS Feature Explorer">
      <FeatureModules />
    </AppShell>
  );
}
