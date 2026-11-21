'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Radio, Sparkles, Plus, Layers } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import Link from 'next/link';

export default function SkillsSection() {
  const { data } = usePortfolio();
  const { skills } = data;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Dynamically derive categories from whatever the user has actually created!
  const uniqueCategories = Array.from(
    new Set(skills.map((s) => s.category?.trim()).filter(Boolean))
  );
  const categories = ['All', ...uniqueCategories];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Sector 4 • Technical Core</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Skills & Technical Proficiencies
          </motion.h2>

          <p className="mt-3 text-slate-600 text-base">
            Custom domain competencies across hardware architectures, embedded firmware, IIoT, and software toolchains.
          </p>
        </div>

        {/* Dynamic Filter Pills: Built from your actual skill tags! */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold scale-105'
                    : 'bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 border border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 rounded-2xl glass-card bg-white border border-slate-200/90 shadow-sm group relative overflow-hidden hover:border-blue-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 group-hover:scale-110 transition-transform">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-blue-700">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Progress Meter Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Experience: {skill.experience || '1+ year'}</span>
                    <span className="text-blue-600 font-bold">
                      {skill.proficiency >= 90 ? 'Mastery' : skill.proficiency >= 80 ? 'Advanced' : 'Proficient'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center p-12 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-md mx-auto">
            <Layers className="w-10 h-10 text-blue-600 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-slate-900">No skills in this category yet</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add your custom domain skills (VLSI, Embedded, IIoT, etc.) in your dashboard.
            </p>
            <Link
              href="/dashboard"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Skill in Dashboard</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
