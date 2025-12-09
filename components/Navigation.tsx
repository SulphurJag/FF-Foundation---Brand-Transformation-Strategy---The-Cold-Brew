import React from 'react';

interface NavigationProps {
  activeSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSlide, totalSlides, onNavigate }) => {
  return (
    <div className="hidden md:flex fixed bottom-20 right-12 flex-col gap-2 z-50">
      <button 
        onClick={() => onNavigate(Math.max(activeSlide - 1, 0))}
        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        aria-label="Previous Slide"
        disabled={activeSlide === 0}
      >
        ↑
      </button>
      <button 
        onClick={() => onNavigate(Math.min(activeSlide + 1, totalSlides - 1))}
        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        aria-label="Next Slide"
        disabled={activeSlide === totalSlides - 1}
      >
        ↓
      </button>
    </div>
  );
};