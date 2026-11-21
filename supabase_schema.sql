-- =========================================================================
-- COMPLETE SUPABASE SQL SCHEMA FOR ANIMATED PORTFOLIO & PERSONAL MONITOR
-- =========================================================================
-- Instructions:
-- 1. Create a free project at https://supabase.com
-- 2. Open the "SQL Editor" in your Supabase dashboard
-- 3. Paste this entire script and click "Run"
-- 4. Copy your Project URL & Anon Key from Settings -> API into .env.local
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    current_degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    expected_graduation TEXT,
    bio TEXT,
    net_portfolio_summary TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    email TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    proficiency INT CHECK (proficiency >= 0 AND proficiency <= 100) DEFAULT 80,
    experience TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('completed', 'in_progress')),
    category TEXT DEFAULT 'General',
    repo_url TEXT,
    live_url TEXT,
    target_end_date TEXT,
    progress_percent INT DEFAULT 0,
    key_achievements TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Prizes & Awards Table
CREATE TABLE IF NOT EXISTS prizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    competition TEXT NOT NULL,
    organizer TEXT,
    position TEXT NOT NULL,
    year TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Extracurricular Activities Table
CREATE TABLE IF NOT EXISTS extracurriculars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    organization TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    platform TEXT NOT NULL,
    instructor TEXT,
    completed_date TEXT NOT NULL,
    key_topics TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_url TEXT,
    badge_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Personal Monitor: Projects to End
CREATE TABLE IF NOT EXISTS monitor_projects_to_end (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    target_end_date TEXT NOT NULL,
    progress INT DEFAULT 0,
    priority TEXT CHECK (priority IN ('High', 'Medium', 'Low')) DEFAULT 'Medium',
    pending_milestones TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Personal Monitor: Topics to Study
CREATE TABLE IF NOT EXISTS monitor_topics_to_study (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT CHECK (status IN ('To Learn', 'Learning', 'Mastered')) DEFAULT 'To Learn',
    target_date TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. Personal Monitor: Focus Areas
CREATE TABLE IF NOT EXISTS monitor_focus_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    timeframe TEXT NOT NULL,
    concentration_weight INT DEFAULT 30,
    description TEXT,
    key_goals TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS across all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracurriculars ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_projects_to_end ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_topics_to_study ENABLE ROW LEVEL SECURITY;
ALTER TABLE monitor_focus_areas ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Allow anyone to see portfolio items)
CREATE POLICY "Public Read Profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Prizes" ON prizes FOR SELECT USING (true);
CREATE POLICY "Public Read Extracurriculars" ON extracurriculars FOR SELECT USING (true);
CREATE POLICY "Public Read Courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON certificates FOR SELECT USING (true);

-- 2. Authenticated Admin Policies (Full control for you after logging in)
CREATE POLICY "Admin Full Access Profiles" ON profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Skills" ON skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Prizes" ON prizes FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Extracurriculars" ON extracurriculars FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Courses" ON courses FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Certificates" ON certificates FOR ALL TO authenticated USING (true);

-- 3. Private Monitor Policies (ONLY Authenticated Admin can read or write)
CREATE POLICY "Admin Read Monitor Projects" ON monitor_projects_to_end FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Read Monitor Topics" ON monitor_topics_to_study FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Read Monitor Focus" ON monitor_focus_areas FOR ALL TO authenticated USING (true);
