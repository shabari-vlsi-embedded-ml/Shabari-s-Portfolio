import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NetPortfolio from '@/components/NetPortfolio';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationAndPrizes from '@/components/EducationAndPrizes';
import CoursesAndCertificates from '@/components/CoursesAndCertificates';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Background ambient animations */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Sector 1: Current Degree & Hero */}
        <Hero />

        {/* Sector 7: Net Portfolio Overview */}
        <NetPortfolio />

        {/* Sector 4: Skills Matrix */}
        <SkillsSection />

        {/* Sectors 5 & 6: Completed & In Progress Projects */}
        <ProjectsSection />

        {/* Sectors 1, 2 & 3: Degree, Extracurriculars & Prizes Won */}
        <EducationAndPrizes />

        {/* Sectors 8 & 9: Courses & Certificates */}
        <CoursesAndCertificates />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
