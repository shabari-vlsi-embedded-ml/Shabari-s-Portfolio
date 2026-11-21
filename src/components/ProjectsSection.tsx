'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, CheckCircle2, Flame, Calendar, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import { GithubIcon } from './Icons';

export default function ProjectsSection() {
  const { data } = usePortfolio();
  const { projects } = data;
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sectors 5 & 6 • Engineering Work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Projects: Shipped & Under Construction
          </motion.h2>

          <p className="mt-3 text-slate-600 text-base">
            Explore completed architectures alongside active developments tracked in real-time.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                filter === 'in_progress'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>In Progress ({projects.filter((p) => p.status === 'in_progress').length})</span>
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Completed ({projects.filter((p) => p.status === 'completed').length})</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const isInProgress = project.status === 'in_progress';

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl glass-card bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between overflow-hidden group hover:border-blue-400"
                >
                  <div className="p-6">
                    {/* Top status bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-semibold text-slate-600 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
                        {project.category}
                      </span>

                      {isInProgress ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          In Development
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Completed
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {project.description}
                    </p>

                    {/* In-progress progress indicator */}
                    {isInProgress && project.progressPercent !== undefined && (
                      <div className="mt-4 p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                          <span className="flex items-center gap-1 text-[11px] font-medium">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            Target: {project.targetEndDate || 'Upcoming'}
                          </span>
                          <span className="font-mono font-bold text-blue-700">
                            {project.progressPercent}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${project.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Achievements List */}
                    {project.keyAchievements && project.keyAchievements.length > 0 && (
                      <div className="mt-4 space-y-1.5">
                        {project.keyAchievements.slice(0, 2).map((ach, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                            <span className="text-blue-600 font-bold mt-0.5">•</span>
                            <span className="line-clamp-1">{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Links */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono font-semibold">
                      {isInProgress ? 'ACTIVE WORK' : 'SHIPPED'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
