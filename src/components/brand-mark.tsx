'use client';

import Image from 'next/image';
import Link from 'next/link';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Go to home page">
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-lg shadow-blue-200">
        <Image
          src="/drone-logo.png"
          alt="Al Haramain logo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          unoptimized
        />
      </div>
      {!compact && (
        <div>
          <div className="text-lg font-black tracking-tight text-[#0a2d56]">AL HARAMAIN</div>
          <div className="-mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Drone Delivery System
          </div>
        </div>
      )}
    </Link>
  );
}
