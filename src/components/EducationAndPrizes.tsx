'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, GraduationCap, Medal, Building, Calendar } from 'lucide-react';
import { usePortfolio } from '@/lib/store';

export default function EducationAndPrizes() {
  const { data } = usePortfolio();
  const { profile, prizes, extracurriculars } = data;

  return (
    <section id="awards" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Sectors 1, 2 & 3 • Academics, Prizes & Leadership</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Prizes Won & Extracurricular Impact
          </motion.h2>

          <p className="mt-3 text-slate-600 text-base">
            Recognitions in national hackathons and collegiate leadership outside the lecture hall.
          </p>
        </div>

        {/* 1. Academic Degree Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 p-6 sm:p-8 rounded-2xl glass-panel bg-white border border-slate-200 shadow-md shadow-blue-500/5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Degree In Progress (Sector 1)
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {profile.currentDegree}
                </h3>
                <p className="text-sm text-slate-600 font-semibold mt-1 flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>{profile.institution}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-left">
                <span className="text-[11px] text-slate-500 font-medium block">Current Level</span>
                <span className="text-xs font-bold text-emerald-700">{profile.yearOfStudy}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-left">
                <span className="text-[11px] text-slate-500 font-medium block">Expected Graduation</span>
                <span className="text-xs font-bold text-blue-700">{profile.expectedGraduation}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two Columns: Prizes (Left) & Extracurriculars (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Prizes Won */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                <Medal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Competitive Prizes Won (Sector 3)</h3>
                <p className="text-xs text-slate-500 font-medium">Podiums in hackathons and coding tournaments</p>
              </div>
            </div>

            <div className="space-y-4">
              {prizes.map((prize, idx) => (
                <motion.div
                  key={prize.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-2xl glass-card bg-white border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-amber-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                          {prize.position}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {prize.year}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                        {prize.title}
                      </h4>
                      <p className="text-xs text-blue-600 font-semibold mt-0.5">
                        {prize.competition} • <span className="text-slate-500 font-medium">{prize.organizer}</span>
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                        {prize.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Extracurricular Activities */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Extracurricular Activities (Sector 2)</h3>
                <p className="text-xs text-slate-500 font-medium">Club leadership, mentoring & community organizing</p>
              </div>
            </div>

            <div className="space-y-4">
              {extracurriculars.map((ec, idx) => (
                <motion.div
                  key={ec.id}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-2xl glass-card bg-white border border-slate-200/90 shadow-sm group hover:border-blue-300"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ec.role}
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-600 px-2.5 py-0.5 rounded bg-slate-100">
                      {ec.period}
                    </span>
                  </div>
                  
                  <p className="text-xs font-bold text-blue-600 mt-0.5">
                    {ec.organization}
                  </p>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                    {ec.description}
                  </p>

                  {ec.highlights && ec.highlights.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                      {ec.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-medium">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
