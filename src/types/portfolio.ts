export interface Profile {
  fullName: string;
  currentDegree: string;
  institution: string;
  yearOfStudy: string; // e.g. "3rd Year, Semester 6"
  expectedGraduation: string;
  bio: string;
  netPortfolioSummary: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  metrics: {
    totalProjects: number;
    completedProjects: number;
    inProgressProjects: number;
    certificationsCount: number;
    coursesCount: number;
    prizesCount: number;
    impactScore: string; // e.g., "Top 5% Student Dev"
  };
}

export type SkillCategory = 'Frontend' | 'Backend' | 'AI / Machine Learning' | 'DevOps & Cloud' | 'Core CS & Data';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 to 100
  experience: string; // e.g., "2 years"
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'completed' | 'in_progress';
  category: string;
  repoUrl?: string;
  liveUrl?: string;
  targetEndDate?: string; // for in_progress projects
  progressPercent?: number; // 0 to 100
  keyAchievements?: string[];
}

export interface Prize {
  id: string;
  title: string;
  competition: string;
  organizer: string;
  position: string; // e.g. "1st Place (National Winner)", "Runner Up"
  year: string;
  description: string;
}

export interface ExtraCurricular {
  id: string;
  role: string;
  organization: string;
  period: string; // e.g., "2024 - Present"
  description: string;
  highlights: string[];
}

export interface Course {
  id: string;
  title: string;
  platform: string; // e.g., "Coursera / Stanford Online", "edX"
  instructor: string;
  completedDate: string;
  keyTopics: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string; // e.g., "Amazon Web Services", "Google Cloud", "Meta"
  issueDate: string;
  credentialUrl?: string;
  badgeId?: string;
}

// Personal Monitor Interfaces
export interface ProjectToEnd {
  id: string;
  title: string;
  targetEndDate: string;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
  pendingMilestones: string[];
}

export interface TopicToStudy {
  id: string;
  topic: string;
  category: string;
  status: 'To Learn' | 'Learning' | 'Mastered';
  targetDate?: string;
  notes?: string;
}

export interface FocusArea {
  id: string;
  title: string;
  timeframe: string; // e.g. "Q1 - Target Focus"
  concentrationWeight: number; // e.g. 50%
  description: string;
  keyGoals: string[];
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  prizes: Prize[];
  extracurriculars: ExtraCurricular[];
  courses: Course[];
  certificates: Certificate[];
  monitor: {
    projectsToEnd: ProjectToEnd[];
    topicsToStudy: TopicToStudy[];
    focusAreas: FocusArea[];
  };
}
