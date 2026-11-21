'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Activity, Cpu, Radio, Wifi, Code, Sparkles, Wrench } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero() {
  const { data } = usePortfolio();
  const { profile } = data;

  const defaultSpecializations = [
    { label: 'VLSI Design', icon: Cpu, desc: 'Digital Logic & Verilog' },
    { label: 'Embedded Systems', icon: Radio, desc: 'Microcontrollers & C/C++' },
    { label: 'Industrial IoT (IIoT)', icon: Wifi, desc: 'Telemetry & Smart Sensors' },
    { label: 'Electronics & Comm', icon: Radio, desc: 'Circuits & Signals' },
    { label: 'Vibe Coding', icon: Code, desc: 'AI-Powered Workflows' },
    { label: 'Website Builder', icon: Code, desc: 'Modern Web Portals' },
    { label: 'Content Creator', icon: Sparkles, desc: 'Technical Media' },
    { label: 'Engineering Services', icon: Wrench, desc: 'Hardware & Code Solutions' },
  ];

  const specializationsToDisplay = (profile.specializations || profile.domainTags || []).length > 0
    ? (profile.specializations || profile.domainTags || []).map((name) => {
        const found = defaultSpecializations.find((d) => d.label.toLowerCase() === name.toLowerCase());
        return found || { label: name, icon: Cpu, desc: 'Domain Specialization' };
      })
    : defaultSpecializations;

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          
          {/* Left Column: Slogan, Name & Degree */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-1 max-w-3xl"
          >
            {/* Status Pill: Sector 1, Current Degree & University */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-5 shadow-sm backdrop-blur-md"
            >
              <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider">
                Sector 1
              </span>
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>{profile.currentDegree}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-slate-600 font-medium">{profile.yearOfStudy}</span>
            </motion.div>

            {/* Prominent Student Name & Tagline */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Hi, I am <span className="text-blue-600 underline decoration-blue-300 decoration-wavy underline-offset-4">{profile.fullName || 'L.S.Shabari'}</span>
              </h2>
              {profile.tagline && (
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 shadow-sm">
                  {profile.tagline}
                </span>
              )}
            </div>

            {/* Main Slogan / Headline (Fully Customizable by User in Dashboard) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
              {profile.slogan ? (
                <span>{profile.slogan}</span>
              ) : (
                <>
                  Engineering{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                    VLSI, Embedded Systems
                  </span>
                  , IIoT & Intelligent Web Services.
                </>
              )}
            </h1>

            {/* University & Sub-badge */}
            <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium flex items-center gap-2">
              <span className="text-blue-600 font-bold">{profile.institution}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal">Class of {profile.expectedGraduation}</span>
            </p>

            {/* Bio Paragraph */}
            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              {profile.bio}
            </p>

            {/* Interactive CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/25 hover:shadow-blue-600/35 transition-all duration-200 active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm hover:border-blue-300 shadow-sm transition-all duration-200 active:scale-95"
              >
                <Activity className="w-4 h-4 text-blue-600" />
                <span>Open Personal Monitor</span>
              </Link>

              {/* Social Icon Links */}
              <div className="flex items-center gap-2 ml-2">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Electronics, VLSI, IIoT & Services Hub (Replaced Unwanted Dev Radar) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-[420px] w-full"
          >
            <div className="relative p-6 rounded-3xl glass-panel bg-white/95 border border-slate-200 shadow-xl shadow-blue-500/5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Core Domains & Services
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  ECE • VLSI • IIoT
                </span>
              </div>

              {/* Specializations & Services Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {specializationsToDisplay.map((spec, i) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-150 group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-100/70 text-blue-700 group-hover:scale-105 transition-transform">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
                          {spec.label}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 font-medium">
                        {spec.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Degree & College Badge */}
              <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider block">
                    Undergrad Department
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {profile.institution}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-blue-700 font-mono">
                  {profile.yearOfStudy}
                </span>
              </div>

              {/* Action Link to Monitor */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <Link
                  href="/dashboard"
                  className="text-xs text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1"
                >
                  Edit Domains, Degree & Slogan in Dashboard &rarr;
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
