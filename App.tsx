import React, { useRef, useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import * as Slides from './components/Slides';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideCount = 12; // Total number of slides

  // Use IntersectionObserver to track which slide is currently in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      threshold: 0.5, // Trigger when 50% of the slide is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Extract index from ID "slideX"
          const id = entry.target.id;
          const index = parseInt(id.replace('slide', ''), 10);
          if (!isNaN(index)) {
            setActiveSlide(index);
          }
        }
      });
    }, observerOptions);

    // Observe all slide children
    const slides = container.querySelectorAll('[id^="slide"]');
    slides.forEach((slide) => observer.observe(slide));

    return () => {
      slides.forEach((slide) => observer.unobserve(slide));
      observer.disconnect();
    };
  }, []);

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      const targetSlide = containerRef.current.querySelector(`#slide${index}`);
      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      scrollToSlide(Math.min(activeSlide + 1, slideCount - 1));
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      scrollToSlide(Math.max(activeSlide - 1, 0));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg text-primary font-sans antialiased selection:bg-accent selection:text-white">
      <Header activeSlide={activeSlide} scrollToSlide={scrollToSlide} />
      
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        <Slides.TitleSlide id="slide0" />
        <Slides.AnalysisSlide id="slide1" />
        <Slides.BusinessImpactSlide id="slide2" />
        <Slides.StrategyOverviewSlide id="slide3" />
        <Slides.PhaseOneSlide id="slide4" />
        <Slides.PhaseTwoSlide id="slide5" />
        <Slides.PhaseThreeSlide id="slide6" />
        <Slides.PhaseFourSlide id="slide7" />
        <Slides.PhaseFiveSlide id="slide8" />
        <Slides.IntegrationSlide id="slide9" />
        <Slides.OutcomesSlide id="slide10" />
        <Slides.NextStepsSlide id="slide11" />
      </div>

      <Navigation 
        activeSlide={activeSlide} 
        totalSlides={slideCount} 
        onNavigate={scrollToSlide} 
      />
      
      <Footer />
    </div>
  );
};

export default App;