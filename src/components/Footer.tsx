'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '@/lib/store';

export default function Footer() {
  const { data } = usePortfolio();
  const { profile } = data;
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/80 backdrop-blur-xl py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base">{profile.fullName}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-blue-600 font-semibold">{profile.currentDegree}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Personal Portfolio & Personal Growth Monitor • Theme: White & Blue • Secured with Data Authentication
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-xs text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Owner Monitor Portal</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
          © {currentYear} {profile.fullName}. Built with Next.js, Framer Motion, Tailwind CSS & Supabase.
        </div>
      </div>
    </footer>
  );
}
