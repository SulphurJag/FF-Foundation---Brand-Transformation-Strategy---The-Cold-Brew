import React from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  activeSlide: number;
  scrollToSlide: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSlide, scrollToSlide }) => {
  const getLinkClass = (targetIndex: number, rangeEnd?: number) => {
    const isActive = rangeEnd 
      ? activeSlide >= targetIndex && activeSlide <= rangeEnd
      : activeSlide === targetIndex;
      
    return `text-xs font-medium tracking-wide cursor-pointer transition-colors duration-300 relative pb-1
      ${isActive ? 'text-accent' : 'text-secondary hover:text-accent'}
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300
      ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
    `;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-white/90 backdrop-blur-md border-b border-border transition-all duration-300">
      <Logo onClick={() => scrollToSlide(0)} />
      
      <nav className="hidden md:flex gap-10">
        <button onClick={() => scrollToSlide(0)} className={getLinkClass(0)}>Overview</button>
        <button onClick={() => scrollToSlide(1)} className={getLinkClass(1, 2)}>Analysis</button>
        <button onClick={() => scrollToSlide(3)} className={getLinkClass(3, 9)}>Strategy</button>
        <button onClick={() => scrollToSlide(10)} className={getLinkClass(10)}>Outcomes</button>
        <button onClick={() => scrollToSlide(11)} className={getLinkClass(11)}>Next Steps</button>
      </nav>

      <div className="text-xs font-semibold text-[#999] tracking-[1.2px] uppercase">
        F.F. Foundation Ltd.
      </div>
    </header>
  );
};