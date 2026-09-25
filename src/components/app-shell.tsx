'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, Moon, Search, SunMedium, Bell, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/brand-mark';
import { NotificationPanel } from '@/components/notification-panel';
import { RegisterDroneModal } from '@/components/register-drone-modal';
import { SearchModal } from '@/components/search-modal';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Simulation', href: '/simulation' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Features', href: '/features' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Settings', href: '/settings' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: '/documentation' },
  { label: 'Support', href: '/support' },
];

export function AppShell({ children, pageTitle }: { children: React.ReactNode; pageTitle?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeToggleIcon = mounted && theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />;

  return (
    <>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300" suppressHydrationWarning>
        <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:var(--card)]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                className="rounded-full border border-[var(--border)] p-2 text-[var(--foreground)] md:hidden"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle navigation menu"
              >
                <Menu size={18} />
              </button>

              <BrandMark compact={false} />
            </div>

            <nav className="hidden items-center gap-5 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-full border border-[var(--border)] bg-white/5 p-2 text-[var(--foreground)]"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
              <button
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
                className="rounded-full border border-[var(--border)] bg-white/5 p-2 text-[var(--foreground)]"
                aria-label="Notifications"
              >
                <Bell size={16} />
              </button>
              <button
                className="rounded-full border border-[var(--border)] bg-white/5 p-2 text-[var(--foreground)]"
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {themeToggleIcon}
              </button>
              <button
                type="button"
                onClick={() => setConnectOpen(true)}
                className="hidden items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[rgba(14,116,144,0.25)] md:inline-flex"
              >
                Connect & Register Drone
              </button>
              <Link
                href="/simulation"
                className="hidden items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[rgba(14,116,144,0.25)] md:inline-flex"
              >
                Launch Simulation
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
              <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setConnectOpen(true);
                    setMenuOpen(false);
                  }}
                  className="mt-2 rounded-xl bg-[var(--primary)] px-3 py-2 text-left text-sm font-semibold text-white"
                >
                  Connect & Register Drone
                </button>
              </nav>
            </div>
          )}
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {pageTitle && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Drone operations</p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--foreground)]">{pageTitle}</h1>
              </div>
            </motion.div>
          )}
          {children}
        </main>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <RegisterDroneModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </>
  );
}
