'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, CheckCircle, ShieldCheck, Calendar, Plus } from 'lucide-react';
import { usePortfolio } from '@/lib/store';
import Link from 'next/link';

export default function CoursesAndCertificates() {
  const { data } = usePortfolio();
  const { courses, certificates } = data;

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sectors 8 & 9 • Continuous Education</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Courses Completed & Verified Certifications
          </motion.h2>

          <p className="mt-3 text-slate-600 text-base">
            Continuous technical learning across VLSI, embedded microcontrollers, and engineering disciplines.
          </p>
        </div>

        {/* 2 Grids: Certificates (Top) & Courses (Bottom) */}
        <div className="space-y-16">
          
          {/* 1. Industry & Technical Certificates */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Industry & Technical Certifications (Sector 9)</h3>
                  <p className="text-xs text-slate-500 font-medium">Standardized technical accreditations & certificates</p>
                </div>
              </div>
              <span className="text-xs text-blue-700 font-mono font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {certificates.length} Verified
              </span>
            </div>

            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {certificates.map((cert, idx) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-5 rounded-2xl glass-card bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:border-blue-400"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="text-blue-700 font-bold">{cert.issuer}</span>
                        <span className="flex items-center gap-1 text-[11px] font-medium">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {cert.issueDate}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {cert.title}
                      </h4>

                      {cert.badgeId && (
                        <span className="inline-block mt-2 font-mono text-[10px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          ID: {cert.badgeId}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Credential Active
                      </span>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center max-w-lg mx-auto shadow-sm">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2 opacity-50" />
                <h4 className="text-sm font-bold text-slate-900">No Certificates Added Yet</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Add your VLSI, Embedded, or technical credentials to showcase them here.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certificate in Dashboard</span>
                </Link>
              </div>
            )}
          </div>

          {/* 2. Engineering & Academic Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Courses Completed (Sector 8)</h3>
                  <p className="text-xs text-slate-500 font-medium">In-depth specializations from premier universities, NPTEL and platforms</p>
                </div>
              </div>
              <span className="text-xs text-blue-700 font-mono font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {courses.length} Completed
              </span>
            </div>

            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {courses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-5 rounded-2xl glass-card bg-white border border-slate-200/90 shadow-sm group hover:border-blue-400"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-blue-600">
                          {course.platform}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Instructor: <span className="text-slate-800 font-medium">{course.instructor}</span> • {course.completedDate}
                        </p>
                      </div>
                    </div>

                    {/* Key Topics Covered */}
                    {course.keyTopics && course.keyTopics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {course.keyTopics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center max-w-lg mx-auto shadow-sm">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2 opacity-50" />
                <h4 className="text-sm font-bold text-slate-900">No Courses Added Yet</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Add NPTEL, college specializations, or online courses to display them here.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Course in Dashboard</span>
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
