import React from 'react';

export const Logo: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <div onClick={onClick} className="cursor-pointer hover:opacity-70 transition-opacity duration-300">
    <svg width="140" height="42" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="35" x2="165" y2="35" stroke="#1a1a1a" strokeWidth="2"/>
      <text x="200" y="40" textAnchor="middle" fontFamily="'Georgia', serif" fontSize="16" fill="#1a1a1a">The</text>
      <line x1="235" y1="35" x2="340" y2="35" stroke="#1a1a1a" strokeWidth="2"/>
      <text x="200" y="75" textAnchor="middle" fontFamily="'Georgia', serif" fontSize="32" fill="#1a1a1a">Cold Brew</text>
      <line x1="40" y1="92" x2="360" y2="92" stroke="#1a1a1a" strokeWidth="2"/>
    </svg>
  </div>
);