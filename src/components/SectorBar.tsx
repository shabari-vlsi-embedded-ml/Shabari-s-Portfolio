'use client';

import React, { useState, useEffect } from 'react';

export default function SectorBar() {
  const [activeSector, setActiveSector] = useState<string>('sector-1');

  const sectors = [
    { id: 'sector-1', label: '1. Name, Slogan & Degree', href: '#hero' },
    { id: 'sector-2', label: '2. Extracurriculars', href: '#extracurriculars' },
    { id: 'sector-3', label: '3. Prizes Won', href: '#prizes' },
    { id: 'sector-4', label: '4. Skills (Custom Tags)', href: '#skills' },
    { id: 'sector-5-6', label: '5 & 6. Projects', href: '#projects' },
    { id: 'sector-7', label: '7. Net Portfolio Statement', href: '#net-portfolio' },
    { id: 'sector-8', label: '8. Courses', href: '#courses' },
    { id: 'sector-9', label: '9. Certificates', href: '#certificates' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      
      for (let i = sectors.length - 1; i >= 0; i--) {
        const sec = sectors[i];
        const targetId = sec.href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSector(sec.id);
            return;
          }
        }
      }
      setActiveSector('sector-1');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSector(id);
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[69px] z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/90 py-2.5 px-4 shadow-sm shadow-blue-500/5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {sectors.map((sec) => {
            const isActive = activeSector === sec.id;
            return (
              <a
                key={sec.id}
                href={sec.href}
                onClick={(e) => handleSectorClick(e, sec.href, sec.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-600/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                {sec.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
