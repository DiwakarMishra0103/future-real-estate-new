import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  onLinkClick?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkText = "See More Properties", onLinkClick }) => {
  return (
    <div className="flex justify-between items-end mb-6 px-4 md:px-0">
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 z-10 relative">{title}</h2>
        <div className="absolute -bottom-1 left-0 w-1/2 h-1 bg-yellow-400 rounded-full"></div>
      </div>
      {linkText && (
        <button 
            onClick={onLinkClick}
            className="hidden md:flex items-center text-sm md:text-base text-gray-600 hover:text-primary font-medium transition group"
        >
          {linkText} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition" />
        </button>
      )}
    </div>
  );
};