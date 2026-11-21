import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SectorBar from '@/components/SectorBar';
import EducationAndPrizes from '@/components/EducationAndPrizes';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import NetPortfolio from '@/components/NetPortfolio';
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

      {/* Main Content Sections - Strictly Ordered by Sector Numbers 1 through 9 */}
      <main className="relative z-10">
        {/* Sector 1: Name, Slogan & Degree */}
        <Hero />

        {/* Horizontal Sector Navigator Bar (Lined up in exact numerical order 1 to 9 with scroll-spy) */}
        <SectorBar />

        {/* Sectors 2 & 3: Extracurriculars (Sector 2) & Prizes Won (Sector 3) */}
        <EducationAndPrizes />

        {/* Sector 4: Skills Matrix & Custom Tags */}
        <SkillsSection />

        {/* Sectors 5 & 6: Projects (Completed & In Progress) */}
        <ProjectsSection />

        {/* Sector 7: Net Portfolio Statement & Trajectory */}
        <NetPortfolio />

        {/* Sectors 8 & 9: Courses Completed (Sector 8) & Verified Certifications (Sector 9) */}
        <CoursesAndCertificates />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
