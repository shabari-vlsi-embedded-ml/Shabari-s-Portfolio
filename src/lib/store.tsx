'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  Profile,
  Project,
  Skill,
  Prize,
  ExtraCurricular,
  Course,
  Certificate,
  ProjectToEnd,
  TopicToStudy,
  FocusArea,
} from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialData';
import { createClient } from './supabase/client';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isSupabaseConnected: boolean;
  updateProfile: (profile: Partial<Profile>) => void;
  // Projects
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  deleteSkill: (id: string) => void;
  // Prizes
  addPrize: (prize: Omit<Prize, 'id'>) => void;
  deletePrize: (id: string) => void;
  // Extracurriculars
  addExtracurricular: (item: Omit<ExtraCurricular, 'id'>) => void;
  deleteExtracurricular: (id: string) => void;
  // Courses
  addCourse: (course: Omit<Course, 'id'>) => void;
  deleteCourse: (id: string) => void;
  // Certificates
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  deleteCertificate: (id: string) => void;
  // Personal Monitor
  addProjectToEnd: (item: Omit<ProjectToEnd, 'id'>) => void;
  updateProjectToEnd: (id: string, updates: Partial<ProjectToEnd>) => void;
  deleteProjectToEnd: (id: string) => void;
  addTopicToStudy: (item: Omit<TopicToStudy, 'id'>) => void;
  updateTopicToStudy: (id: string, updates: Partial<TopicToStudy>) => void;
  deleteTopicToStudy: (id: string) => void;
  addFocusArea: (item: Omit<FocusArea, 'id'>) => void;
  updateFocusArea: (id: string, updates: Partial<FocusArea>) => void;
  deleteFocusArea: (id: string) => void;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const STORAGE_KEY = 'animated_portfolio_data_v1';

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      setIsSupabaseConnected(true);
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch {
      // Fallback to initial data if localStorage fails
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return next;
    });
  };

  const updateProfile = (profileUpdate: Partial<Profile>) => {
    persistData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate },
    }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = { ...project, id: `proj-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
      profile: {
        ...prev.profile,
        metrics: {
          ...prev.profile.metrics,
          totalProjects: prev.profile.metrics.totalProjects + 1,
          completedProjects:
            project.status === 'completed'
              ? prev.profile.metrics.completedProjects + 1
              : prev.profile.metrics.completedProjects,
          inProgressProjects:
            project.status === 'in_progress'
              ? prev.profile.metrics.inProgressProjects + 1
              : prev.profile.metrics.inProgressProjects,
        },
      },
    }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    persistData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    persistData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: `sk-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const deleteSkill = (id: string) => {
    persistData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addPrize = (prize: Omit<Prize, 'id'>) => {
    const newPrize: Prize = { ...prize, id: `prz-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      prizes: [newPrize, ...prev.prizes],
      profile: {
        ...prev.profile,
        metrics: {
          ...prev.profile.metrics,
          prizesCount: prev.profile.metrics.prizesCount + 1,
        },
      },
    }));
  };

  const deletePrize = (id: string) => {
    persistData((prev) => ({
      ...prev,
      prizes: prev.prizes.filter((p) => p.id !== id),
    }));
  };

  const addExtracurricular = (item: Omit<ExtraCurricular, 'id'>) => {
    const newItem: ExtraCurricular = { ...item, id: `ec-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      extracurriculars: [newItem, ...prev.extracurriculars],
    }));
  };

  const deleteExtracurricular = (id: string) => {
    persistData((prev) => ({
      ...prev,
      extracurriculars: prev.extracurriculars.filter((e) => e.id !== id),
    }));
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...course, id: `crs-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      courses: [newCourse, ...prev.courses],
      profile: {
        ...prev.profile,
        metrics: {
          ...prev.profile.metrics,
          coursesCount: prev.profile.metrics.coursesCount + 1,
        },
      },
    }));
  };

  const deleteCourse = (id: string) => {
    persistData((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== id),
    }));
  };

  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = { ...cert, id: `crt-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
      profile: {
        ...prev.profile,
        metrics: {
          ...prev.profile.metrics,
          certificationsCount: prev.profile.metrics.certificationsCount + 1,
        },
      },
    }));
  };

  const deleteCertificate = (id: string) => {
    persistData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  };

  // Monitor methods
  const addProjectToEnd = (item: Omit<ProjectToEnd, 'id'>) => {
    const newItem: ProjectToEnd = { ...item, id: `pte-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        projectsToEnd: [newItem, ...prev.monitor.projectsToEnd],
      },
    }));
  };

  const updateProjectToEnd = (id: string, updates: Partial<ProjectToEnd>) => {
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        projectsToEnd: prev.monitor.projectsToEnd.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        ),
      },
    }));
  };

  const deleteProjectToEnd = (id: string) => {
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        projectsToEnd: prev.monitor.projectsToEnd.filter((p) => p.id !== id),
      },
    }));
  };

  const addTopicToStudy = (item: Omit<TopicToStudy, 'id'>) => {
    const newItem: TopicToStudy = { ...item, id: `tts-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        topicsToStudy: [...prev.monitor.topicsToStudy, newItem],
      },
    }));
  };

  const updateTopicToStudy = (id: string, updates: Partial<TopicToStudy>) => {
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        topicsToStudy: prev.monitor.topicsToStudy.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
      },
    }));
  };

  const deleteTopicToStudy = (id: string) => {
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        topicsToStudy: prev.monitor.topicsToStudy.filter((t) => t.id !== id),
      },
    }));
  };

  const addFocusArea = (item: Omit<FocusArea, 'id'>) => {
    const newItem: FocusArea = { ...item, id: `foc-${Date.now()}` };
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        focusAreas: [...prev.monitor.focusAreas, newItem],
      },
    }));
  };

  const updateFocusArea = (id: string, updates: Partial<FocusArea>) => {
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        focusAreas: prev.monitor.focusAreas.map((f) =>
          f.id === id ? { ...f, ...updates } : f
        ),
      },
    }));
  };

  const deleteFocusArea = (id: string) => {
    persistData((prev) => ({
      ...prev,
      monitor: {
        ...prev.monitor,
        focusAreas: prev.monitor.focusAreas.filter((f) => f.id !== id),
      },
    }));
  };

  const resetToDefault = () => {
    persistData(() => initialPortfolioData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isSupabaseConnected,
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
        updateFocusArea,
        deleteFocusArea,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
