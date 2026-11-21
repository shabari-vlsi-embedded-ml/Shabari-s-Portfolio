export interface Profile {
  fullName: string;
  initials?: string;
  currentDegree: string;
  institution: string;
  yearOfStudy: string;
  expectedGraduation: string;
  bio: string;
  tagline: string;         // Short sub-tagline shown in Navbar
  taglineHighlight?: string; // Highlighted word/phrase in hero headline
  slogan?: string;         // Big hero headline text (editable from CMS)
  domainTags?: string[];   // ECE domain badges
  specializations?: string[]; // Legacy alias for domainTags
  netPortfolioSummary: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  metrics?: {
    impactScore?: string;
    totalProjects?: number;
    completedProjects?: number;
    inProgressProjects?: number;
    prizesCount?: number;
    coursesCount?: number;
    certificationsCount?: number;
  };
}

export interface Skill {
  id: string;
  name: string;
  category: string; // Free-text, user defines their own (e.g. VLSI, Embedded, IIoT)
  proficiency: number;
  experience: string;
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
  targetEndDate?: string;
  progressPercent?: number;
  keyAchievements?: string[];
}

export interface Prize {
  id: string;
  title: string;
  competition: string;
  organizer: string;
  position: string;
  year: string;
  description: string;
}

export interface ExtraCurricular {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  instructor: string;
  completedDate: string;
  keyTopics: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  badgeId?: string;
}

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
  timeframe: string;
  concentrationWeight: number;
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
