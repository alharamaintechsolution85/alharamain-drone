'use client';

import Link from 'next/link';
import { ArrowRight, Bell, Menu, Moon, Search, ShieldCheck, SunMedium } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/brand-mark';
import { NotificationPanel } from '@/components/notification-panel';
import { RegisterDroneModal } from '@/components/register-drone-modal';
import { SearchModal } from '@/components/search-modal';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Simulation', href: '/simulation' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeToggleIcon = mounted && theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 mb-6 rounded-[22px] border border-slate-200 bg-white/80 px-4 py-3 shadow-soft backdrop-blur-md"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-full border border-slate-200 p-2 text-slate-700 md:hidden" aria-label="Open menu">
              <Menu size={18} />
            </button>
            <BrandMark />
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${index === 0 ? 'text-[#0d5c9e]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button type="button" onClick={() => setSearchOpen(true)} className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50" aria-label="Search">
              <Search size={16} />
            </button>
            <button type="button" onClick={() => setNotificationsOpen((value) => !value)} className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50" aria-label="Notifications">
              <Bell size={16} />
            </button>
            <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50" aria-label="Theme switch">
              {themeToggleIcon}
            </button>
            <button type="button" onClick={() => setConnectOpen(true)} className="flex items-center gap-2 rounded-full bg-[#0d5c9e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#0a4f92]">
              Connect & Register Drone
            </button>
            <Link href="/simulation" className="flex items-center gap-2 rounded-full bg-[#0d5c9e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#0a4f92]">
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button type="button" onClick={() => setConnectOpen(true)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
              <ShieldCheck size={16} className="text-[#0d5c9e]" />
              Connect
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-3 rounded-[18px] border border-slate-200 bg-slate-50 p-2 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </motion.header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      <RegisterDroneModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </>
  );
}
