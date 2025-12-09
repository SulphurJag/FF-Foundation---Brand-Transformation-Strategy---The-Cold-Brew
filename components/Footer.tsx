import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex flex-col md:flex-row justify-between px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md border-t border-border text-[0.6875rem] text-[#999] tracking-wider">
      <div className="mb-2 md:mb-0">
        Consultancy Firm: <a href="https://naveedconsults.com" target="_blank" rel="noreferrer" className="text-accent font-medium hover:underline">naveedconsults.com</a>
      </div>
      <div>
        Brand & Communication Strategy: <span className="text-primary font-medium">The Cold Brew</span>
      </div>
    </footer>
  );
};