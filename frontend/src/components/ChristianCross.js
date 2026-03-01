import React from 'react';

/**
 * Croix chrétienne (croix latine) - barre verticale longue + barre horizontale courte en haut
 * Remplace l'icône Cross de Lucide (qui est une croix médicale/classique)
 */
const ChristianCross = ({ className = "w-5 h-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Barre verticale (longue) */}
    <line x1="12" y1="2" x2="12" y2="22" />
    {/* Barre horizontale (courte, placée en haut) */}
    <line x1="5" y1="8" x2="19" y2="8" />
  </svg>
);

export default ChristianCross;
