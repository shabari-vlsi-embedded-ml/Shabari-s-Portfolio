'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Activity, Layers, Award } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import Link from 'next/link';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Hero() {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          
          {/* Left Column: Introduction & Current Degree */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex-1 max-w-3xl"
          >
            {/* Status Pill: Current Degree & University */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md"
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>{profile.currentDegree}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-slate-600 font-medium">{profile.yearOfStudy}</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Architecting scalable software,{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                intelligent agents
              </span>
              , & cloud systems.
            </h1>

            {/* University & Sub-badge */}
            <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium flex items-center gap-2">
              <span className="text-blue-600 font-bold">{profile.institution}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal">Class of {profile.expectedGraduation}</span>
            </p>

            {/* Bio Paragraph */}
            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">
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

          {/* Right Column: Dynamic Live Degree & Growth Radar Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-96 w-full"
          >
            <div className="relative p-6 rounded-2xl glass-panel bg-white/90 border border-slate-200 shadow-xl shadow-blue-500/5">
              {/* Top Accent Light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Student & Dev Radar
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                  ACTIVE
                </span>
              </div>

              {/* Quick Status Cards */}
              <div className="mt-4 space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      Degree Status
                    </span>
                    <span className="text-blue-700 font-bold">{profile.yearOfStudy}</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-slate-900 truncate">
                    {profile.currentDegree}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      Active Projects
                    </span>
                    <span className="text-blue-700 font-bold">
                      {profile.metrics.inProgressProjects} In Progress
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full"
                      style={{
                        width: `${Math.round(
                          (profile.metrics.completedProjects / profile.metrics.totalProjects) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>{profile.metrics.completedProjects} Completed</span>
                    <span>{profile.metrics.totalProjects} Total</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Prizes Won
                    </span>
                    <span className="text-amber-600 font-bold">{profile.metrics.prizesCount} Awards</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 font-normal">
                    Hackathons, algorithmic tournaments & sprint podiums.
                  </p>
                </div>
              </div>

              {/* Action Link to Monitor */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <Link
                  href="/dashboard"
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                >
                  Configure & Update Portfolio Sectors &rarr;
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
