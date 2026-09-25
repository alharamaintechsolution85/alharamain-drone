'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

const searchablePages = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Simulation', href: '/simulation' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Features', href: '/features' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Settings', href: '/settings' },
  { label: 'About', href: '/about' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'Support', href: '/support' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return searchablePages;
    return searchablePages.filter((page) => page.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-950/60 p-4 pt-16 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_26px_80px_rgba(15,23,42,0.28)]">
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Search size={18} className="text-slate-500" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, modules, and dashboards"
            className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="rounded-full border border-slate-200 p-1.5 text-slate-600">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">No pages match that search.</div>
          ) : (
            results.map((page) => (
              <button
                key={page.href}
                type="button"
                onClick={() => handleSelect(page.href)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <span>{page.label}</span>
                <span className="text-xs uppercase tracking-[0.14em] text-slate-400">Go</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
