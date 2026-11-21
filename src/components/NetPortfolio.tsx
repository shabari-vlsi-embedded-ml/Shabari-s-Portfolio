'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Award, BookOpen, CheckCircle2, TrendingUp, Sparkles, Terminal } from 'lucide-react';
import { usePortfolio } from '@/lib/store';

export default function NetPortfolio() {
  const { data } = usePortfolio();
  const { profile, projects, certificates, prizes, courses } = data;

  // Dynamically compute exact counts from your live personal monitor & sectors!
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const inProgressProjects = projects.filter((p) => p.status === 'in_progress').length;
  const certificationsCount = certificates.length;
  const prizesCount = prizes.length;
  const coursesCount = courses.length;

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      subtext: `${completedProjects} completed & ${inProgressProjects} in progress`,
      icon: FolderGit2,
      color: 'from-blue-600 to-sky-500',
      shadow: 'shadow-blue-500/20',
    },
    {
      label: 'Verified Certifications',
      value: certificationsCount,
      subtext: certificationsCount > 0 ? `${certificationsCount} active credentials` : 'Ready to add credentials',
      icon: CheckCircle2,
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      label: 'Competitive Prizes',
      value: prizesCount,
      subtext: prizesCount > 0 ? `${prizesCount} hackathon & sprint awards` : 'Competitions & tech fest awards',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/20',
    },
    {
      label: 'Completed Courses',
      value: coursesCount,
      subtext: coursesCount > 0 ? `${coursesCount} engineering courses` : 'Academic & professional coursework',
      icon: BookOpen,
      color: 'from-indigo-600 to-blue-600',
      shadow: 'shadow-indigo-500/20',
    },
  ];

  return (
    <section id="net-portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sector 7 • Executive Overview</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            The Net Portfolio & Trajectory
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-600 text-base"
          >
            Real-time live aggregation of your hardware & software projects, courses, certifications, and achievements.
          </motion.p>
        </div>

        {/* 4 Dynamic Metric Cards (Syncs directly with your updates!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl glass-card bg-white border border-slate-200 shadow-sm group overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-md ${stat.shadow} group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {stat.subtext}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Net Portfolio Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative rounded-2xl p-6 sm:p-8 glass-panel bg-white/95 border border-slate-200 shadow-md shadow-blue-500/5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Executive Trajectory Statement</span>
              </div>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                &ldquo;{profile.netPortfolioSummary}&rdquo;
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50/80 border border-blue-100 text-center min-w-[180px]">
              <Sparkles className="w-6 h-6 text-blue-600 mb-1" />
              <div className="text-xs text-slate-600 font-semibold">Specialization Focus</div>
              <div className="text-sm font-black text-blue-700 mt-0.5">{profile.metrics?.impactScore || "ECE Innovator"}</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
