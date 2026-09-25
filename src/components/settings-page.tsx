'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Bell, Palette, ShieldCheck, Database, SlidersHorizontal, MoonStar, KeyRound } from 'lucide-react';
import { useTheme } from 'next-themes';

const tabs = [
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'workspace', label: 'Workspace', icon: SlidersHorizontal },
  { key: 'rbac', label: 'RBAC', icon: ShieldCheck },
  { key: 'connections', label: 'Connections', icon: KeyRound },
  { key: 'security', label: 'Security', icon: Lock },
  { key: 'notifications', label: 'Alerts', icon: Bell },
  { key: 'privacy', label: 'Privacy', icon: Database },
] as const;

const accentOptions = ['#0d5c9e', '#10b981', '#06b6d4', '#6366f1'];
const fontOptions = ['Inter', 'Tajawal', 'Noto Nastaliq Urdu'];

export function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('appearance');
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  const [rtlEnabled, setRtlEnabled] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState('#0d5c9e');
  const [selectedFont, setSelectedFont] = useState('Inter');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('drone-theme-mode');
    const storedAccent = localStorage.getItem('drone-accent');
    const storedFont = localStorage.getItem('drone-font');
    const storedRtl = localStorage.getItem('drone-rtl');

    if (storedTheme) setThemeMode(storedTheme as 'light' | 'dark' | 'system');
    if (storedAccent) setSelectedAccent(storedAccent);
    if (storedFont) setSelectedFont(storedFont);
    if (storedRtl) setRtlEnabled(storedRtl === 'true');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('drone-theme-mode', themeMode);
    if (themeMode === 'system') {
      setTheme(resolvedTheme ?? 'light');
    } else {
      setTheme(themeMode);
    }
  }, [mounted, themeMode, setTheme, resolvedTheme]);

  useEffect(() => {
    localStorage.setItem('drone-accent', selectedAccent);
    document.documentElement.style.setProperty('--primary', selectedAccent);
    document.documentElement.style.setProperty('--secondary', selectedAccent + '22');
  }, [selectedAccent]);

  useEffect(() => {
    localStorage.setItem('drone-font', selectedFont);
    document.body.style.fontFamily = selectedFont === 'Tajawal' ? 'Tajawal, sans-serif' : selectedFont === 'Noto Nastaliq Urdu' ? 'Noto Nastaliq Urdu, serif' : 'Inter, Segoe UI, sans-serif';
  }, [selectedFont]);

  useEffect(() => {
    localStorage.setItem('drone-rtl', String(rtlEnabled));
    document.documentElement.dir = rtlEnabled ? 'rtl' : 'ltr';
  }, [rtlEnabled]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow)]">
        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Settings</div>
        <div className="space-y-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                activeTab === key ? 'bg-[var(--secondary)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted)] hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </aside>

      <motion.section
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow)]"
      >
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Appearance & Theme</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Tune the visual language for operators and executives.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] p-4">
                <div className="mb-3 text-sm font-semibold text-[var(--foreground)]">Theme mode</div>
                <div className="flex gap-2">
                  {(['light', 'dark', 'system'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setThemeMode(option)}
                      className={`rounded-full border px-3 py-2 text-sm ${themeMode === option ? 'border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)]' : 'border-[var(--border)] text-[var(--muted)]'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[var(--border)] p-4">
                <div className="mb-3 text-sm font-semibold text-[var(--foreground)]">Accent color</div>
                <div className="flex gap-2">
                  {accentOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedAccent(color)}
                      aria-label={`Set accent ${color}`}
                      className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color, borderColor: selectedAccent === color ? '#0f172a' : '#fff' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] p-4">
              <div className="mb-3 text-sm font-semibold text-[var(--foreground)]">Typography</div>
              <select
                value={selectedFont}
                onChange={(event) => setSelectedFont(event.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-[var(--foreground)] outline-none"
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-[var(--border)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--foreground)]">RTL / Urdu support</span>
                <button
                  type="button"
                  onClick={() => setRtlEnabled((value) => !value)}
                  className={`relative h-6 w-11 rounded-full ${rtlEnabled ? 'bg-[var(--primary)]' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${rtlEnabled ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <div className="text-sm text-[var(--muted)]">{rtlEnabled ? 'RTL enabled for Urdu/Arabic flows.' : 'LTR layout selected.'}</div>
            </div>
          </div>
        )}

        {activeTab === 'workspace' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Workspace & General</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block rounded-2xl border border-[var(--border)] p-4 text-sm text-[var(--foreground)]">
                Organization name
                <input defaultValue="Al Haramain Drone Group" className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none" />
              </label>
              <label className="block rounded-2xl border border-[var(--border)] p-4 text-sm text-[var(--foreground)]">
                Currency
                <input defaultValue="SAR" className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none" />
              </label>
            </div>
            <div className="rounded-2xl border border-[var(--border)] p-4">
              <div className="text-sm font-semibold text-[var(--foreground)]">Distance units</div>
              <div className="mt-3 flex gap-2">
                {['Metric', 'Imperial'].map((unit) => (
                  <button key={unit} type="button" className="rounded-full border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted)]">
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rbac' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Role-Based Access Control</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {['Super Admin', 'Fleet Manager', 'Dispatcher', 'Drone Operator', 'Maintenance Staff', 'Customer', 'Auditor'].map((role) => (
                <div key={role} className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="text-sm font-semibold text-[var(--foreground)]">{role}</div>
                  <div className="mt-2 text-xs text-[var(--muted)]">Permissions: READ / WRITE / AUDIT</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">External API Keys & Connections</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {['Supabase', 'Cloudflare R2', 'Open-Meteo', 'OpenSky Network', 'Groq / Gemini', 'Upstash Redis'].map((item) => (
                <div key={item} className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="text-sm font-semibold text-[var(--foreground)]">{item}</div>
                  <div className="mt-2 text-xs text-emerald-600">Connected / Verified</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Security & Biometrics</h2>
            <div className="grid gap-3">
              <div className="rounded-2xl border border-[var(--border)] p-4">Passkeys / WebAuthn enabled</div>
              <div className="rounded-2xl border border-[var(--border)] p-4">TOTP 2FA enrolled and active</div>
              <div className="rounded-2xl border border-[var(--border)] p-4">3 active sessions tracked</div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Notifications & Alert Thresholds</h2>
            <div className="grid gap-3">
              <div className="rounded-2xl border border-[var(--border)] p-4">Battery critical warnings: 18%</div>
              <div className="rounded-2xl border border-[var(--border)] p-4">Geofence breaches: enabled</div>
              <div className="rounded-2xl border border-[var(--border)] p-4">Push notifications: on</div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">Privacy & Data Controls</h2>
            <div className="grid gap-3">
              <button type="button" className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-4 text-left text-sm font-medium text-[var(--foreground)]">Export all telemetry logs</button>
              <button type="button" className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-4 text-left text-sm font-medium text-[var(--foreground)]">Request account erasure</button>
              <button type="button" className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-4 text-left text-sm font-medium text-[var(--foreground)]">GDPR delete workflow</button>
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
}
