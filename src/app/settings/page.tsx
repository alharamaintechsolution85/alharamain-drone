'use client';

import { AppShell } from '@/components/app-shell';
import { SettingsPage } from '@/components/settings-page';

export default function SettingsRoutePage() {
  return (
    <AppShell pageTitle="Settings Center">
      <SettingsPage />
    </AppShell>
  );
}
