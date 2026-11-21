'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Gauge,
  Sliders,
  CheckCircle2,
  Clock,
  BookOpen,
  Target,
  Plus,
  Trash2,
  LogOut,
  ArrowLeft,
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  Cpu,
  ShieldAlert,
  Save,
  CheckSquare,
  Square,
  Users,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { SkillCategory } from '@/types/portfolio';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, userEmail, logout, isSupabaseAuth } = useAuth();
  const {
    data,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    deleteSkill,
    addPrize,
    deletePrize,
    addExtracurricular,
    deleteExtracurricular,
    addCourse,
    deleteCourse,
    addCertificate,
    deleteCertificate,
    addProjectToEnd,
    updateProjectToEnd,
    deleteProjectToEnd,
    addTopicToStudy,
    updateTopicToStudy,
    deleteTopicToStudy,
    addFocusArea,
    deleteFocusArea,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'monitor' | 'cms'>('monitor');
  const [activeSector, setActiveSector] = useState<'degree' | 'projects' | 'skills' | 'prizes' | 'extracurricular' | 'courses' | 'certificates' | 'summary'>('degree');

  // Sync profile form state with loaded data
  const [profileForm, setProfileForm] = useState(data.profile);
  const [saveToast, setSaveToast] = useState('');

  useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);

  // Monitor form states
  const [showAddProjectToEnd, setShowAddProjectToEnd] = useState(false);
  const [newProjectToEnd, setNewProjectToEnd] = useState({
    title: '',
    targetEndDate: '',
    progress: 50,
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    pendingMilestones: '',
  });

  const [showAddTopic, setShowAddTopic] = useState(false);
  const [newTopic, setNewTopic] = useState({
    topic: '',
    category: 'Systems & Engineering',
    status: 'To Learn' as 'To Learn' | 'Learning' | 'Mastered',
    notes: '',
  });

  const [showAddFocus, setShowAddFocus] = useState(false);
  const [newFocus, setNewFocus] = useState({
    title: '',
    timeframe: 'Current Quarter',
    concentrationWeight: 40,
    description: '',
    keyGoals: '',
  });

  // Project CMS state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProj, setNewProj] = useState({
    title: '',
    description: '',
    techStack: 'TypeScript, Next.js, Tailwind CSS',
    status: 'in_progress' as 'completed' | 'in_progress',
    category: 'Web Engineering',
    targetEndDate: '2027-01-30',
    progressPercent: 50,
    repoUrl: '',
    liveUrl: '',
  });

  // Skill CMS state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>('Frontend');
  const [newSkillProficiency, setNewSkillProficiency] = useState(85);

  // Prize CMS state
  const [showAddPrize, setShowAddPrize] = useState(false);
  const [newPrize, setNewPrize] = useState({
    title: '',
    competition: '',
    organizer: '',
    position: '1st Place Winner',
    year: '2026',
    description: '',
  });

  // Extracurricular CMS state
  const [showAddEC, setShowAddEC] = useState(false);
  const [newEC, setNewEC] = useState({
    role: '',
    organization: '',
    period: '2025 - Present',
    description: '',
    highlights: '',
  });

  // Course CMS state
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    platform: '',
    instructor: '',
    completedDate: 'November 2026',
    keyTopics: '',
  });

  // Certificate CMS state
  const [showAddCert, setShowAddCert] = useState(false);
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    issueDate: 'October 2026',
    credentialUrl: '',
    badgeId: '',
  });

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Auth Guard
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl glass-panel bg-white border border-slate-200 text-center shadow-xl shadow-blue-500/5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Owner Authentication Required</h2>
          <p className="text-xs text-slate-600 mt-2">
            The Personal Monitor and Sector Update Manager are restricted to the portfolio owner.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition"
            >
              Sign In to Monitor
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-blue-600 font-semibold transition"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 border-b border-slate-200 backdrop-blur-md px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 transition"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base">Personal Growth Monitor</span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {isSupabaseAuth ? 'Supabase Cloud Auth' : 'Local Admin Active'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Logged in as {userEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch */}
            <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1">
              <button
                onClick={() => setActiveTab('monitor')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'monitor'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>Personal Monitor</span>
              </button>
              <button
                onClick={() => setActiveTab('cms')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === 'cms'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Update Sectors (CMS)</span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-red-600 transition cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {saveToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xl shadow-blue-600/30 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </motion.div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ======================================================== */}
        {/* VIEW 1: PERSONAL MONITOR */}
        {/* ======================================================== */}
        {activeTab === 'monitor' && (
          <div className="space-y-12">
            
            {/* Monitor Header */}
            <div className="p-6 rounded-3xl glass-panel bg-white border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Personal Execution & Growth Monitor
                  </h1>
                  <p className="text-xs text-slate-600 mt-1">
                    Continuous monitoring of deadlines, study targets, and quarterly concentration pillars.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center min-w-[110px]">
                    <span className="text-[11px] text-slate-500 font-semibold block">Pending Projects</span>
                    <span className="text-base font-black text-blue-700">
                      {data.monitor.projectsToEnd.length}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center min-w-[110px]">
                    <span className="text-[11px] text-slate-500 font-semibold block">Topics Queue</span>
                    <span className="text-base font-black text-blue-700">
                      {data.monitor.topicsToStudy.filter((t) => t.status !== 'Mastered').length}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center min-w-[110px]">
                    <span className="text-[11px] text-slate-500 font-semibold block">Focus Pillars</span>
                    <span className="text-base font-black text-blue-700">
                      {data.monitor.focusAreas.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTOR A: PROJECTS WANT TO END */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Projects Want to End (Deadlines & Milestones)</h2>
                    <p className="text-xs text-slate-500">Active project deadlines with checklist of final deliverables</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddProjectToEnd(!showAddProjectToEnd)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Track New Project Deadline</span>
                </button>
              </div>

              {/* Add form */}
              {showAddProjectToEnd && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    addProjectToEnd({
                      title: newProjectToEnd.title,
                      targetEndDate: newProjectToEnd.targetEndDate || '2026-12-31',
                      progress: Number(newProjectToEnd.progress),
                      priority: newProjectToEnd.priority,
                      pendingMilestones: newProjectToEnd.pendingMilestones
                        .split('\n')
                        .filter(Boolean),
                    });
                    setShowAddProjectToEnd(false);
                    setNewProjectToEnd({ title: '', targetEndDate: '', progress: 50, priority: 'Medium', pendingMilestones: '' });
                    triggerToast('Added project to monitor! Changes saved.');
                  }}
                  className="mb-6 p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm"
                >
                  <h4 className="text-sm font-bold text-slate-900">Track Project to Finish</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={newProjectToEnd.title}
                      onChange={(e) => setNewProjectToEnd({ ...newProjectToEnd, title: e.target.value })}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="date"
                      value={newProjectToEnd.targetEndDate}
                      onChange={(e) => setNewProjectToEnd({ ...newProjectToEnd, targetEndDate: e.target.value })}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <select
                      value={newProjectToEnd.priority}
                      onChange={(e) => setNewProjectToEnd({ ...newProjectToEnd, priority: e.target.value as any })}
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="High">Priority: High</option>
                      <option value="Medium">Priority: Medium</option>
                      <option value="Low">Priority: Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      Pending Milestones (one per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write benchmark tests&#10;Deploy to staging&#10;Record launch video"
                      value={newProjectToEnd.pendingMilestones}
                      onChange={(e) => setNewProjectToEnd({ ...newProjectToEnd, pendingMilestones: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProjectToEnd(false)}
                      className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      Save Tracker
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Grid of Projects to End */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.monitor.projectsToEnd.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl glass-card bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            item.priority === 'High'
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : item.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {item.priority} Priority
                        </span>
                        <button
                          onClick={() => {
                            deleteProjectToEnd(item.id);
                            triggerToast('Removed project from monitor');
                          }}
                          className="text-slate-400 hover:text-red-600 transition"
                          title="Remove from monitor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-blue-600 font-semibold mt-1">
                        Target Deadline: {item.targetEndDate}
                      </p>

                      {/* Progress slider */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span className="font-medium">Completion Progress</span>
                          <span className="font-mono text-blue-700 font-bold">{item.progress}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={item.progress}
                          onChange={(e) => updateProjectToEnd(item.id, { progress: Number(e.target.value) })}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>

                      {/* Milestones checklist */}
                      <div className="mt-4 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-700 block mb-1">
                          Key Deliverables to Close:
                        </span>
                        {item.pendingMilestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="text-blue-600 font-bold mt-0.5">•</span>
                            <span>{milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Live Monitor Active</span>
                      {item.progress === 100 && (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Ready to Ship!
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTOR B: TOPICS WANT TO STUDY */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Topics Want to Study (Continuous Learning Roadmap)</h2>
                    <p className="text-xs text-slate-500">Queue of engineering concepts, papers, and paradigms to master</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddTopic(!showAddTopic)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Topic to Study</span>
                </button>
              </div>

              {/* Add Topic Form */}
              {showAddTopic && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTopicToStudy(newTopic);
                    setShowAddTopic(false);
                    setNewTopic({ topic: '', category: 'Systems & Engineering', status: 'To Learn', notes: '' });
                    triggerToast('Added topic to learning queue! Changes saved.');
                  }}
                  className="mb-6 p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm"
                >
                  <h4 className="text-sm font-bold text-slate-900">Add Topic to Learning Queue</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Topic (e.g., eBPF Kernel Tracing)"
                      value={newTopic.topic}
                      onChange={(e) => setNewTopic({ ...newTopic, topic: e.target.value })}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                      type="text"
                      placeholder="Category (e.g., Systems Programming)"
                      value={newTopic.category}
                      onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <select
                      value={newTopic.status}
                      onChange={(e) => setNewTopic({ ...newTopic, status: e.target.value as any })}
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="To Learn">Status: To Learn</option>
                      <option value="Learning">Status: Learning</option>
                      <option value="Mastered">Status: Mastered</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Learning notes or reference links..."
                      value={newTopic.notes}
                      onChange={(e) => setNewTopic({ ...newTopic, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTopic(false)}
                      className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      Add Topic
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Topics List */}
              <div className="space-y-3">
                {data.monitor.topicsToStudy.map((top) => (
                  <div
                    key={top.id}
                    className="p-4 rounded-xl glass-card bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <button
                        onClick={() => {
                          const nextStatus: 'To Learn' | 'Learning' | 'Mastered' =
                            top.status === 'To Learn'
                              ? 'Learning'
                              : top.status === 'Learning'
                              ? 'Mastered'
                              : 'To Learn';
                          updateTopicToStudy(top.id, { status: nextStatus });
                          if (nextStatus === 'Mastered') {
                            confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
                            triggerToast('Topic marked as Mastered! 🎉');
                          }
                        }}
                        className="mt-0.5 sm:mt-0 text-slate-400 hover:text-blue-600 transition cursor-pointer"
                        title="Click to cycle status: To Learn -> Learning -> Mastered"
                      >
                        {top.status === 'Mastered' ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600" />
                        ) : top.status === 'Learning' ? (
                          <Square className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold ${top.status === 'Mastered' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {top.topic}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                            {top.category}
                          </span>
                        </div>
                        {top.notes && (
                          <p className="text-xs text-slate-500 mt-1">{top.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          top.status === 'Mastered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : top.status === 'Learning'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {top.status}
                      </span>
                      <button
                        onClick={() => {
                          deleteTopicToStudy(top.id);
                          triggerToast('Deleted topic');
                        }}
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTOR C: AREAS TO CONCENTRATE ON */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Which Area I Want to Concentrate (Focus Pillars)</h2>
                    <p className="text-xs text-slate-500">Quarterly effort allocation & top growth vectors</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddFocus(!showAddFocus)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Define New Focus Pillar</span>
                </button>
              </div>

              {/* Add Focus Area Form */}
              {showAddFocus && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    addFocusArea({
                      title: newFocus.title,
                      timeframe: newFocus.timeframe,
                      concentrationWeight: Number(newFocus.concentrationWeight),
                      description: newFocus.description,
                      keyGoals: newFocus.keyGoals.split('\n').filter(Boolean),
                    });
                    setShowAddFocus(false);
                    setNewFocus({ title: '', timeframe: 'Current Quarter', concentrationWeight: 40, description: '', keyGoals: '' });
                    triggerToast('Added focus pillar! Changes saved.');
                  }}
                  className="mb-6 p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm"
                >
                  <h4 className="text-sm font-bold text-slate-900">Define Concentration Area</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Title (e.g. AI Agent Architectures)"
                      value={newFocus.title}
                      onChange={(e) => setNewFocus({ ...newFocus, title: e.target.value })}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                    />
                    <input
                      type="text"
                      placeholder="Timeframe (e.g. Q4 2026 Focus)"
                      value={newFocus.timeframe}
                      onChange={(e) => setNewFocus({ ...newFocus, timeframe: e.target.value })}
                      required
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                    />
                    <div>
                      <label className="text-[10px] text-slate-600 font-bold block mb-1">
                        Concentration Weight: {newFocus.concentrationWeight}%
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={newFocus.concentrationWeight}
                        onChange={(e) => setNewFocus({ ...newFocus, concentrationWeight: Number(e.target.value) })}
                        className="w-full accent-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Focus description / why this area is critical right now..."
                      value={newFocus.description}
                      onChange={(e) => setNewFocus({ ...newFocus, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Key goals (one per line)..."
                      value={newFocus.keyGoals}
                      onChange={(e) => setNewFocus({ ...newFocus, keyGoals: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFocus(false)}
                      className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                    >
                      Save Focus Area
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Focus Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.monitor.focusAreas.map((foc) => (
                  <div
                    key={foc.id}
                    className="p-5 rounded-2xl glass-card bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-blue-600">
                          {foc.timeframe}
                        </span>
                        <button
                          onClick={() => {
                            deleteFocusArea(foc.id);
                            triggerToast('Deleted focus pillar');
                          }}
                          className="text-slate-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">
                        {foc.title}
                      </h4>

                      {/* Concentration bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span className="font-medium">Focus Allocation</span>
                          <span className="font-mono text-blue-700 font-bold">
                            {foc.concentrationWeight}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full"
                            style={{ width: `${foc.concentrationWeight}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-3 leading-relaxed font-normal">
                        {foc.description}
                      </p>

                      {foc.keyGoals && foc.keyGoals.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-700 block">
                            Key Objectives:
                          </span>
                          {foc.keyGoals.map((goal, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 font-medium">
                              <span className="text-blue-600 font-bold">•</span>
                              <span>{goal}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: SECTOR UPDATE CMS (Manage all website data) */}
        {/* ======================================================== */}
        {activeTab === 'cms' && (
          <div className="space-y-8">
            
            <div className="p-6 rounded-3xl glass-panel bg-white border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">
                Reliable Sector Update Manager
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Directly add, modify, and manage every sector displayed across your public portfolio website.
              </p>

              {/* Sector selector buttons */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { id: 'degree', label: '1. Degree & Academics' },
                  { id: 'extracurricular', label: '2. Extracurriculars' },
                  { id: 'prizes', label: '3. Prizes Won' },
                  { id: 'skills', label: '4. Skills Matrix' },
                  { id: 'projects', label: '5 & 6. Projects' },
                  { id: 'summary', label: '7. Net Portfolio' },
                  { id: 'courses', label: '8. Courses' },
                  { id: 'certificates', label: '9. Certificates' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSector(sec.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      activeSector === sec.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTOR 1: DEGREE & ACADEMICS */}
            {activeSector === 'degree' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>Update Current Degree & Academic Info (Sector 1)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Current Degree</label>
                    <input
                      type="text"
                      value={profileForm.currentDegree}
                      onChange={(e) => setProfileForm({ ...profileForm, currentDegree: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Institution / University</label>
                    <input
                      type="text"
                      value={profileForm.institution}
                      onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Year / Semester of Study</label>
                    <input
                      type="text"
                      value={profileForm.yearOfStudy}
                      onChange={(e) => setProfileForm({ ...profileForm, yearOfStudy: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-700 font-bold block mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      updateProfile(profileForm);
                      triggerToast('Academic profile updated and saved successfully! ✅');
                    }}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-600/25"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Academic Details</span>
                  </button>
                </div>
              </div>
            )}

            {/* SECTOR 2: EXTRACURRICULARS */}
            {activeSector === 'extracurricular' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Extracurricular Activities (Sector 2)</span>
                  </h3>
                  <button
                    onClick={() => setShowAddEC(!showAddEC)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Extracurricular</span>
                  </button>
                </div>

                {showAddEC && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addExtracurricular({
                        role: newEC.role,
                        organization: newEC.organization,
                        period: newEC.period,
                        description: newEC.description,
                        highlights: newEC.highlights.split('\n').filter(Boolean),
                      });
                      setShowAddEC(false);
                      setNewEC({ role: '', organization: '', period: '2025 - Present', description: '', highlights: '' });
                      triggerToast('Added extracurricular activity! Changes saved.');
                    }}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Activity Entry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Role (e.g. Club President)"
                        value={newEC.role}
                        onChange={(e) => setNewEC({ ...newEC, role: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Organization (e.g. Developers Club)"
                        value={newEC.organization}
                        onChange={(e) => setNewEC({ ...newEC, organization: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Period (e.g. 2025 - Present)"
                        value={newEC.period}
                        onChange={(e) => setNewEC({ ...newEC, period: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Description of leadership or activities..."
                      value={newEC.description}
                      onChange={(e) => setNewEC({ ...newEC, description: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                    />
                    <textarea
                      rows={2}
                      placeholder="Highlights (one per line)..."
                      value={newEC.highlights}
                      onChange={(e) => setNewEC({ ...newEC, highlights: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddEC(false)}
                        className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        Save Activity
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {data.extracurriculars.map((ec) => (
                    <div
                      key={ec.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{ec.role}</h4>
                          <span className="text-[11px] font-semibold text-blue-600">• {ec.organization}</span>
                          <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-slate-200/70">{ec.period}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">{ec.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          deleteExtracurricular(ec.id);
                          triggerToast('Deleted extracurricular activity');
                        }}
                        className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTOR 3: PRIZES */}
            {activeSector === 'prizes' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span>Competitive Prizes & Awards (Sector 3)</span>
                  </h3>
                  <button
                    onClick={() => setShowAddPrize(!showAddPrize)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Prize</span>
                  </button>
                </div>

                {showAddPrize && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addPrize({
                        title: newPrize.title,
                        competition: newPrize.competition,
                        organizer: newPrize.organizer,
                        position: newPrize.position,
                        year: newPrize.year,
                        description: newPrize.description,
                      });
                      setShowAddPrize(false);
                      setNewPrize({ title: '', competition: '', organizer: '', position: '1st Place Winner', year: '2026', description: '' });
                      triggerToast('Added prize to portfolio! Changes saved.');
                    }}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Prize Entry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Award Title"
                        value={newPrize.title}
                        onChange={(e) => setNewPrize({ ...newPrize, title: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Competition / Hackathon"
                        value={newPrize.competition}
                        onChange={(e) => setNewPrize({ ...newPrize, competition: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Rank / Position (e.g. 1st of 500)"
                        value={newPrize.position}
                        onChange={(e) => setNewPrize({ ...newPrize, position: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Organizer / Institution"
                        value={newPrize.organizer}
                        onChange={(e) => setNewPrize({ ...newPrize, organizer: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Year (e.g. 2026)"
                        value={newPrize.year}
                        onChange={(e) => setNewPrize({ ...newPrize, year: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Brief description of the solution or achievement..."
                      value={newPrize.description}
                      onChange={(e) => setNewPrize({ ...newPrize, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddPrize(false)}
                        className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        Save Prize
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {data.prizes.map((pz) => (
                    <div
                      key={pz.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-amber-600 block">{pz.position}</span>
                        <h4 className="text-sm font-bold text-slate-900">{pz.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{pz.competition} ({pz.year})</p>
                      </div>
                      <button
                        onClick={() => {
                          deletePrize(pz.id);
                          triggerToast('Deleted prize');
                        }}
                        className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTOR 4: SKILLS */}
            {activeSector === 'skills' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span>Skills Matrix (Sector 4)</span>
                </h3>

                {/* Add Skill Row */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newSkillName) return;
                    addSkill({
                      name: newSkillName,
                      category: newSkillCategory,
                      proficiency: newSkillProficiency,
                      experience: '2+ years',
                    });
                    setNewSkillName('');
                    triggerToast('Added skill! Changes saved.');
                  }}
                  className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <input
                    type="text"
                    placeholder="Skill name (e.g. GraphQL)"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    required
                    className="flex-1 min-w-[180px] px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                  />
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI / Machine Learning">AI / Machine Learning</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Core CS & Data">Core CS & Data</option>
                  </select>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                    <span>Proficiency: {newSkillProficiency}%</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={newSkillProficiency}
                      onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                      className="accent-blue-600 w-24"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                  >
                    Add Skill
                  </button>
                </form>

                {/* Skill List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{skill.name}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{skill.category} • {skill.proficiency}%</span>
                      </div>
                      <button
                        onClick={() => {
                          deleteSkill(skill.id);
                          triggerToast('Deleted skill');
                        }}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTORS 5 & 6: PROJECTS */}
            {activeSector === 'projects' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>Projects: Completed & In Progress (Sectors 5 & 6)</span>
                  </h3>
                  <button
                    onClick={() => setShowAddProject(!showAddProject)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {showAddProject && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addProject({
                        title: newProj.title,
                        description: newProj.description,
                        techStack: newProj.techStack.split(',').map((s) => s.trim()),
                        status: newProj.status,
                        category: newProj.category,
                        targetEndDate: newProj.targetEndDate,
                        progressPercent: Number(newProj.progressPercent),
                        repoUrl: newProj.repoUrl || undefined,
                        liveUrl: newProj.liveUrl || undefined,
                      });
                      setShowAddProject(false);
                      triggerToast('Added project to portfolio! Changes saved.');
                    }}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Project Entry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newProj.title}
                        onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <select
                        value={newProj.status}
                        onChange={(e) => setNewProj({ ...newProj, status: e.target.value as any })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-semibold"
                      >
                        <option value="in_progress">Status: 🚀 In Progress (Sector 6)</option>
                        <option value="completed">Status: ✅ Completed (Sector 5)</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Category (e.g. AI Systems)"
                        value={newProj.category}
                        onChange={(e) => setNewProj({ ...newProj, category: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Tech stack (comma-separated, e.g. React, Next.js, Go)"
                        value={newProj.techStack}
                        onChange={(e) => setNewProj({ ...newProj, techStack: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="url"
                        placeholder="GitHub URL (optional)"
                        value={newProj.repoUrl}
                        onChange={(e) => setNewProj({ ...newProj, repoUrl: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="url"
                        placeholder="Live Demo URL (optional)"
                        value={newProj.liveUrl}
                        onChange={(e) => setNewProj({ ...newProj, liveUrl: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Project description..."
                      value={newProj.description}
                      onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddProject(false)}
                        className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                )}

                {/* Existing Projects List */}
                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              proj.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {proj.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-1">{proj.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newStatus = proj.status === 'completed' ? 'in_progress' : 'completed';
                            updateProject(proj.id, { status: newStatus });
                            triggerToast(`Project status updated to ${newStatus}`);
                          }}
                          className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 text-xs font-semibold text-slate-700"
                        >
                          Toggle Status
                        </button>
                        <button
                          onClick={() => {
                            deleteProject(proj.id);
                            triggerToast('Project deleted');
                          }}
                          className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTOR 7: NET PORTFOLIO */}
            {activeSector === 'summary' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">
                  Update Net Portfolio Executive Statement (Sector 7)
                </h3>
                <textarea
                  rows={4}
                  value={profileForm.netPortfolioSummary}
                  onChange={(e) => setProfileForm({ ...profileForm, netPortfolioSummary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      updateProfile(profileForm);
                      triggerToast('Net portfolio summary saved! ✅');
                    }}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/25"
                  >
                    Save Net Portfolio
                  </button>
                </div>
              </div>
            )}

            {/* SECTOR 8: COURSES */}
            {activeSector === 'courses' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>Courses Completed (Sector 8)</span>
                  </h3>
                  <button
                    onClick={() => setShowAddCourse(!showAddCourse)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Course</span>
                  </button>
                </div>

                {showAddCourse && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addCourse({
                        title: newCourse.title,
                        platform: newCourse.platform,
                        instructor: newCourse.instructor,
                        completedDate: newCourse.completedDate,
                        keyTopics: newCourse.keyTopics.split(',').map((s) => s.trim()),
                      });
                      setShowAddCourse(false);
                      setNewCourse({ title: '', platform: '', instructor: '', completedDate: 'November 2026', keyTopics: '' });
                      triggerToast('Added course! Changes saved.');
                    }}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Course Entry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Course Title (e.g. Distributed Systems)"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Platform / University (e.g. MIT OCW)"
                        value={newCourse.platform}
                        onChange={(e) => setNewCourse({ ...newCourse, platform: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Instructor (e.g. Robert Morris)"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Completion Date (e.g. October 2026)"
                        value={newCourse.completedDate}
                        onChange={(e) => setNewCourse({ ...newCourse, completedDate: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Key topics (comma separated, e.g. Raft, Paxos, MapReduce)"
                      value={newCourse.keyTopics}
                      onChange={(e) => setNewCourse({ ...newCourse, keyTopics: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddCourse(false)}
                        className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        Save Course
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {data.courses.map((crs) => (
                    <div
                      key={crs.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-blue-600">{crs.platform}</span>
                        <h4 className="text-sm font-bold text-slate-900">{crs.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">Instructor: {crs.instructor} • {crs.completedDate}</p>
                      </div>
                      <button
                        onClick={() => {
                          deleteCourse(crs.id);
                          triggerToast('Deleted course');
                        }}
                        className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTOR 9: CERTIFICATES */}
            {activeSector === 'certificates' && (
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span>Verified Certifications (Sector 9)</span>
                  </h3>
                  <button
                    onClick={() => setShowAddCert(!showAddCert)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certificate</span>
                  </button>
                </div>

                {showAddCert && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addCertificate({
                        title: newCert.title,
                        issuer: newCert.issuer,
                        issueDate: newCert.issueDate,
                        credentialUrl: newCert.credentialUrl || undefined,
                        badgeId: newCert.badgeId || undefined,
                      });
                      setShowAddCert(false);
                      setNewCert({ title: '', issuer: '', issueDate: 'October 2026', credentialUrl: '', badgeId: '' });
                      triggerToast('Added certificate! Changes saved.');
                    }}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Certificate Entry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Certificate Title (e.g. AWS Solutions Architect)"
                        value={newCert.title}
                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Issuer (e.g. Amazon Web Services)"
                        value={newCert.issuer}
                        onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Issue Date (e.g. August 2026)"
                        value={newCert.issueDate}
                        onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                        required
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        placeholder="Badge ID / Credential ID (optional)"
                        value={newCert.badgeId}
                        onChange={(e) => setNewCert({ ...newCert, badgeId: e.target.value })}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Credential Verification URL (optional)"
                      value={newCert.credentialUrl}
                      onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddCert(false)}
                        className="px-4 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        Save Certificate
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {data.certificates.map((crt) => (
                    <div
                      key={crt.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-blue-600">{crt.issuer}</span>
                        <h4 className="text-sm font-bold text-slate-900">{crt.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">Issued: {crt.issueDate} {crt.badgeId && `• ID: ${crt.badgeId}`}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {crt.credentialUrl && (
                          <a
                            href={crt.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-white text-blue-600 border border-slate-200 hover:bg-blue-50"
                            title="Verify link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            deleteCertificate(crt.id);
                            triggerToast('Deleted certificate');
                          }}
                          className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
