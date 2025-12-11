import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building, Waves, GitMerge, ArrowRightLeft } from 'lucide-react';
import { HERO_SLIDES, HIGHLIGHTED_PROJECTS, POPULAR_PROPERTIES, TOP_LOCATIONS } from '../constants';
import { Property } from '../types';

interface HeroProps {
  onSelectProperty?: (property: Property) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProperty }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Buy');
  
  // Search State
  const [locationQuery, setLocationQuery] = useState('');
  const [projectQuery, setProjectQuery] = useState('');
  const [showLocSuggestions, setShowLocSuggestions] = useState(false);
  const [showProjSuggestions, setShowProjSuggestions] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocSuggestions(false);
      }
      if (projectRef.current && !projectRef.current.contains(event.target as Node)) {
        setShowProjSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Logic
  const getAllProperties = () => [...HIGHLIGHTED_PROJECTS, ...POPULAR_PROPERTIES];

  const getFilteredPropertiesByType = () => {
    const all = getAllProperties();
    if (activeTab === 'Buy') return all;
    if (activeTab === 'Villa/Bungalow') return all.filter(p => p.type === 'Villa' || p.type === 'Bungalow');
    if (activeTab === 'Residential') return all.filter(p => p.type === 'Residential' || p.type === 'Plot');
    if (activeTab === 'Commercial') return all.filter(p => p.type === 'Commercial');
    return all;
  };

  const availableProperties = getFilteredPropertiesByType();

  // Get unique locations from available properties + TOP_LOCATIONS
  const availableLocations = Array.from(new Set([
    ...TOP_LOCATIONS.map(l => l.name),
    ...availableProperties.map(p => p.location)
  ])).filter(loc => loc.toLowerCase().includes(locationQuery.toLowerCase()));

  // Filter projects based on query and selected location (if any)
  const filteredProjects = availableProperties.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(projectQuery.toLowerCase()) || 
                         p.location.toLowerCase().includes(projectQuery.toLowerCase());
    return matchesQuery;
  });

  const handleLocationSelect = (loc: string) => {
    setLocationQuery(loc);
    setShowLocSuggestions(false);
  };

  const handleProjectSelect = (property: Property) => {
    setProjectQuery(property.title);
    setShowProjSuggestions(false);
    if (onSelectProperty) {
      onSelectProperty(property);
    }
  };

  return (
    <div className="relative bg-gray-100 pb-16 md:pb-12">
      {/* Background Slideshow */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
              <div className="container mx-auto px-4 md:px-12">
                <div className="max-w-xl text-white">
                  <h3 className="text-xl md:text-2xl font-light mb-2">{slide.subtitle}</h3>
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                    {slide.title.split(',').map((part, i) => (
                      <span key={i} className="block">{part}{i === 0 ? ',' : ''}</span>
                    ))}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Overlay */}
      <div className="container mx-auto px-4 relative z-20 -mt-16 mb-12">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-4 mb-4">
            {['Buy', 'Residential', 'Commercial', 'Villa/Bungalow'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setLocationQuery(''); setProjectQuery(''); }}
                className={`text-sm md:text-base font-medium pb-2 px-2 transition border-b-2 ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Location Input with Autocomplete */}
            <div className="flex-grow w-full relative" ref={locationRef}>
              <div className="flex items-center border-b border-gray-300 focus-within:border-primary transition-colors">
                <MapPin size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => { setLocationQuery(e.target.value); setShowLocSuggestions(true); }}
                  onFocus={() => setShowLocSuggestions(true)}
                  placeholder="Select Location"
                  className="w-full py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
              
              {/* Dropdown */}
              {showLocSuggestions && (locationQuery || availableLocations.length > 0) && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-lg mt-1 z-50 max-h-60 overflow-y-auto border border-gray-100">
                  {availableLocations.length > 0 ? (
                    availableLocations.map((loc, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleLocationSelect(loc)}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 flex items-center gap-2"
                      >
                        <MapPin size={14} className="text-gray-400" /> {loc}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400 italic">No locations found</div>
                  )}
                </div>
              )}
            </div>

            {/* Project Search Input with Autocomplete */}
            <div className="flex-grow w-full relative" ref={projectRef}>
               <div className="flex items-center border-b border-gray-300 focus-within:border-primary transition-colors">
                  <Building size={18} className="text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    value={projectQuery}
                    onChange={(e) => { setProjectQuery(e.target.value); setShowProjSuggestions(true); }}
                    onFocus={() => setShowProjSuggestions(true)}
                    placeholder={`Search ${activeTab === 'Buy' ? 'Project' : activeTab}...`}
                    className="w-full py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
                  />
               </div>

                {/* Dropdown */}
               {showProjSuggestions && (
                 <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-lg mt-1 z-50 max-h-60 overflow-y-auto border border-gray-100">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((p) => (
                        <div 
                          key={p.id}
                          onClick={() => handleProjectSelect(p)}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-semibold text-gray-800">{p.title}</div>
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin size={10} /> {p.location}
                                </div>
                            </div>
                            <div className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">
                                {p.type}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-400 italic">
                        No projects found for "{projectQuery}" in {activeTab}
                      </div>
                    )}
                 </div>
               )}
            </div>

            <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition shadow-md whitespace-nowrap">
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </div>
      
      {/* Promo Strip */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-gradient-to-r from-[#2e7d32] to-[#4caf50] rounded-2xl p-4 md:py-5 md:px-8 flex flex-col lg:flex-row items-center justify-between text-white shadow-2xl gap-6 relative overflow-hidden ring-4 ring-green-50/50">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

            {/* Left Side: Ambassador & Branding */}
            <div className="flex items-center gap-5 z-10 w-full lg:w-auto justify-center lg:justify-start">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 bg-gray-200">
                         {/* Using a professional looking placeholder */}
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Brand Ambassador" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-xs font-bold text-gray-900 px-2 py-0.5 rounded-full shadow-sm border border-white">
                        Expert
                    </div>
                </div>
                <div className="text-left leading-none">
                    <h3 className="font-black text-3xl italic tracking-tighter uppercase drop-shadow-md">
                        3<sup className="text-lg underline decoration-2 decoration-yellow-400 underline-offset-2">rd</sup> Mumbai
                    </h3>
                    <p className="text-sm font-bold bg-black/20 px-2 py-0.5 rounded inline-block mt-1 tracking-widest text-yellow-300">
                        [MAHAMUMBAI]
                    </p>
                </div>
            </div>

            {/* Center: Feature Pills */}
            <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full lg:w-auto">
                {[
                    { text: 'ATAL SETU SEALINK', icon: <Waves size={16} /> },
                    { text: 'CHIRLE JUNCTION', icon: <GitMerge size={16} className="rotate-90" /> },
                    { text: 'MUMBAI GOA HIGHWAY', icon: <ArrowRightLeft size={16} /> }
                ].map((item, idx) => (
                    <div key={idx} className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 shadow-sm transition-all duration-300 cursor-default w-full sm:w-auto justify-center">
                        <span className="text-yellow-300 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                        <span className="font-bold text-xs md:text-sm tracking-wide">{item.text}</span>
                    </div>
                ))}
            </div>

            {/* Right: Call to Action / Slogan */}
            <div className="text-center lg:text-right z-10 w-full lg:w-auto bg-white/5 rounded-xl p-3 border border-white/10 lg:border-0 lg:bg-transparent lg:p-0">
                <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-green-100 mb-1">
                    The Smart Choice For
                </div>
                <div className="font-black text-xl md:text-2xl uppercase leading-none text-white drop-shadow-md">
                    Investment <span className="text-yellow-300">&</span><br className="hidden lg:block"/> Growth!
                </div>
            </div>
            
            {/* Decorative Gloss */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
