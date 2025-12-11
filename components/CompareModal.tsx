import React, { useState } from 'react';
import { X, MapPin, Ruler, CheckCircle, Trash2, Eye, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Property } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

// Helper Component for Expandable Description
const ExpandableText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > 100;

  return (
    <div className="flex flex-col items-start">
      <div className={`text-xs text-gray-500 leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
        {text}
      </div>
      {shouldTruncate && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] font-bold text-primary mt-1 flex items-center gap-0.5 hover:underline"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
      )}
    </div>
  );
};

// Helper Component for Expandable Amenities
const ExpandableAmenities = ({ amenities }: { amenities: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = amenities.length > 4;
  const shownAmenities = isExpanded ? amenities : amenities.slice(0, 4);

  return (
    <div className="flex flex-col gap-1.5">
      {shownAmenities.map((a, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-gray-600 animate-fade-in">
           <CheckCircle size={12} className="text-green-500 shrink-0" /> 
           <span>{a}</span>
        </div>
      ))}
      {hasMore && (
        <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10px] font-bold text-primary pl-5 text-left hover:underline flex items-center gap-0.5 mt-1"
        >
            {isExpanded ? 'Show Less' : `+${amenities.length - 4} more`}
            {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
      )}
    </div>
  );
};

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, properties, onRemove, onClear }) => {
  const [quickViewProp, setQuickViewProp] = useState<Property | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  if (!isOpen) return null;

  // Filter logic
  const filteredProperties = properties.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Plot') return p.type === 'Plot' || p.type === 'Residential' || p.type === 'Commercial';
    return p.type === activeFilter;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-primary p-4 md:p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-bold text-xl md:text-2xl">Compare Properties</h3>
            <p className="text-white/70 text-sm">{properties.length} properties selected</p>
          </div>
          <div className="flex items-center gap-3">
            {properties.length > 0 && (
                <button 
                    onClick={onClear}
                    className="text-xs bg-red-500/20 hover:bg-red-500/40 text-red-100 px-3 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap"
                >
                    <Trash2 size={14} /> <span className="hidden sm:inline">Clear All</span>
                </button>
            )}
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
                <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto p-4 md:p-8 bg-gray-50 flex-grow scroll-smooth">
          
          {/* Filter Bar */}
          {properties.length > 0 && (
             <div className="flex flex-wrap items-center gap-3 mb-6 sticky left-0 z-10">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mr-2">
                    <Filter size={16} /> Filter:
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['All', 'Villa', 'Bungalow', 'Plot'].map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border whitespace-nowrap ${
                                activeFilter === type
                                ? 'bg-primary border-primary text-white shadow-md'
                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
             </div>
          )}

          {properties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                 <span className="text-3xl">⚖️</span>
              </div>
              <p className="text-lg font-medium">No properties selected for comparison.</p>
              <button onClick={onClose} className="text-primary hover:underline">Go back to listings</button>
            </div>
          ) : filteredProperties.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 py-12">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                     <Filter size={24} className="text-gray-300"/>
                 </div>
                 <p className="text-lg font-medium">No {activeFilter} properties in selection.</p>
                 <button onClick={() => setActiveFilter('All')} className="text-primary hover:underline font-medium">Show all selected properties</button>
             </div>
          ) : (
            <>
                {/* Desktop/Tablet View: Side-by-Side Table */}
                <div className="hidden lg:block min-w-[800px] border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
                   {/* Grid Layout for Comparison */}
                   <div 
                     className="grid gap-0" 
                     style={{ 
                       gridTemplateColumns: `180px repeat(${filteredProperties.length}, minmax(220px, 1fr))` 
                     }}
                   >
                      {/* Property Header / Image */}
                      <div className="contents">
                          <div className="p-4 bg-gray-100 font-bold text-gray-700 flex items-center border-b border-r border-gray-200 sticky left-0 z-10">
                            Property
                          </div>
                          {filteredProperties.map(p => (
                              <div key={p.id} className="p-4 border-b border-r border-gray-200 relative min-w-[220px] group bg-white hover:bg-gray-50 transition">
                                  <button 
                                    onClick={() => onRemove(p.id)} 
                                    className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow hover:bg-red-50 transition z-10 border border-gray-100 opacity-0 group-hover:opacity-100"
                                    title="Remove"
                                  >
                                      <X size={14} />
                                  </button>
                                  <div className="h-40 rounded-lg overflow-hidden mb-3 border border-gray-100 relative group/image">
                                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition duration-300 flex items-center justify-center">
                                          <button 
                                            onClick={() => setQuickViewProp(p)}
                                            className="bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg transform translate-y-2 group-hover/image:translate-y-0 transition"
                                          >
                                              <Eye size={14} /> Quick View
                                          </button>
                                      </div>
                                  </div>
                                  <h4 className="font-bold text-primary text-xl mb-1">{p.price}</h4>
                                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{p.title}</p>
                              </div>
                          ))}
                      </div>

                      {/* Location */}
                      <div className="contents">
                          <div className="p-4 bg-gray-50 font-semibold text-gray-600 flex items-center border-b border-r border-gray-200 sticky left-0 sticky-col-bg">Location</div>
                          {filteredProperties.map(p => (
                              <div key={p.id} className="p-4 border-b border-r border-gray-200 text-sm text-gray-700 bg-white">
                                  <div className="flex items-start gap-2">
                                      <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                      {p.location}
                                  </div>
                              </div>
                          ))}
                      </div>

                      {/* Type */}
                      <div className="contents">
                          <div className="p-4 bg-gray-50 font-semibold text-gray-600 flex items-center border-b border-r border-gray-200 sticky left-0 sticky-col-bg">Type</div>
                          {filteredProperties.map(p => (
                              <div key={p.id} className="p-4 border-b border-r border-gray-200 text-sm text-gray-700 bg-white">
                                  <span className="bg-secondary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-secondary/20">{p.type}</span>
                              </div>
                          ))}
                      </div>

                      {/* Size */}
                      <div className="contents">
                          <div className="p-4 bg-gray-50 font-semibold text-gray-600 flex items-center border-b border-r border-gray-200 sticky left-0 sticky-col-bg">Size</div>
                          {filteredProperties.map(p => (
                              <div key={p.id} className="p-4 border-b border-r border-gray-200 text-sm text-gray-700 bg-white">
                                  <div className="flex items-center gap-2">
                                      <Ruler size={16} className="text-gray-400" />
                                      {p.size || 'N/A'}
                                  </div>
                              </div>
                          ))}
                      </div>

                      {/* Amenities */}
                      <div className="contents">
                          <div className="p-4 bg-gray-50 font-semibold text-gray-600 flex items-center border-b border-r border-gray-200 sticky left-0 sticky-col-bg">Amenities</div>
                          {filteredProperties.map(p => (
                              <div key={p.id} className="p-4 border-b border-r border-gray-200 text-sm text-gray-700 bg-white">
                                  <ExpandableAmenities amenities={p.amenities || ['Standard Amenities']} />
                              </div>
                          ))}
                      </div>

                       {/* Status */}
                       <div className="contents">
                          <div className="p-4 bg-gray-50 font-semibold text-gray-600 flex items-center border-b border-r border-gray-200 sticky left-0 sticky-col-bg">Status</div>
                          {filteredProperties.map(p => (
                              <div key={p.id} className="p-4 border-b border-r border-gray-200 text-sm text-gray-700 bg-white">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${p.status === 'Ready Move' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {p.status || 'For Sale'}
                                  </span>
                              </div>
                          ))}
                      </div>

                      {/* Description */}
                      <div className="contents">
                          <div className="p-4 bg-gray-50 font-semibold text-gray-600 flex items-center border-r border-gray-200 sticky left-0 sticky-col-bg">Description</div>
                          {filteredProperties.map(p => (
                              <div key={p.id} className="p-4 border-r border-gray-200 bg-white">
                                  <ExpandableText text={p.description || "A beautiful property situated in a prime location with excellent connectivity and modern amenities."} />
                              </div>
                          ))}
                      </div>
                   </div>
                </div>

                {/* Mobile/Tablet View: Vertical Stack */}
                <div className="lg:hidden flex flex-col gap-6">
                    {filteredProperties.map(p => (
                        <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                             {/* Remove Button */}
                             <button 
                                onClick={() => onRemove(p.id)} 
                                className="absolute top-3 right-3 bg-white/90 text-red-500 p-2 rounded-full shadow-sm z-20"
                                title="Remove"
                             >
                                <X size={16} />
                             </button>

                             {/* Image Header */}
                             <div className="h-48 relative">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                                    <h4 className="text-white font-bold text-xl">{p.price}</h4>
                                    <p className="text-white/90 text-sm truncate pr-8">{p.title}</p>
                                </div>
                                <button 
                                    onClick={() => setQuickViewProp(p)}
                                    className="absolute top-3 left-3 bg-white/90 text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
                                >
                                    <Eye size={14} /> Quick View
                                </button>
                             </div>

                             {/* Attributes Body */}
                             <div className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Location</p>
                                        <p className="text-sm font-semibold text-gray-700 flex items-start gap-1 leading-tight">
                                            <MapPin size={14} className="mt-0.5 shrink-0" /> {p.location}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Type</p>
                                        <span className="bg-secondary/10 text-primary px-2 py-0.5 rounded text-xs font-bold inline-block">{p.type}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Size</p>
                                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                            <Ruler size={14} /> {p.size || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Status</p>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded inline-block ${p.status === 'Ready Move' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {p.status || 'For Sale'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-100 pt-3">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Amenities</p>
                                    <ExpandableAmenities amenities={p.amenities || ['Standard Amenities']} />
                                </div>

                                <div className="border-t border-gray-100 pt-3">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Description</p>
                                    <ExpandableText text={p.description || "A beautiful property situated in a prime location with excellent connectivity and modern amenities."} />
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </>
          )}
        </div>

        {/* Quick View Modal */}
        {quickViewProp && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in relative">
                    <button 
                        onClick={() => setQuickViewProp(null)}
                        className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full hover:bg-white text-gray-700 z-10 transition"
                    >
                        <X size={20} />
                    </button>
                    <div className="h-56 relative">
                        <img src={quickViewProp.image} alt={quickViewProp.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-sm">
                            {quickViewProp.status || 'For Sale'}
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 leading-tight mb-1">{quickViewProp.title}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/> {quickViewProp.location}</p>
                            </div>
                            <div className="text-right shrink-0 ml-4">
                                <div className="text-2xl font-bold text-primary">{quickViewProp.price}</div>
                                <div className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded text-gray-600 inline-block mt-1">{quickViewProp.type}</div>
                            </div>
                        </div>
                        
                        <div className="mb-5">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</h4>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                                {quickViewProp.description || "Situated in a prime location with excellent connectivity, this property offers a perfect blend of tranquility and modern living. Ideal for investment or building your dream home."}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Key Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {(quickViewProp.amenities || ['Garden', 'Security', 'Parking', 'Water Supply']).slice(0, 6).map((am, i) => (
                                    <span key={i} className="text-xs bg-green-50 border border-green-100 px-2 py-1.5 rounded-md text-green-700 flex items-center gap-1.5 font-medium">
                                        <CheckCircle size={12} /> {am}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={() => setQuickViewProp(null)}
                            className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition shadow-lg"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
      <style>{`
        .sticky-col-bg {
          background-color: #f9fafb; /* gray-50 */
          z-index: 5;
        }
      `}</style>
    </div>
  );
};