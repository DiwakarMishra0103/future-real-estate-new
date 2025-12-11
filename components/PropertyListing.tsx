import React, { useState } from 'react';
import { Filter, Search, MapPin, ArrowLeft, GitCompare, X, SlidersHorizontal } from 'lucide-react';
import { Property } from '../types';
import { ALL_PROPERTIES } from '../constants';

interface PropertyListingProps {
  onSelectProperty: (property: Property) => void;
  onBack: () => void;
  onToggleCompare: (e: React.MouseEvent, property: Property) => void;
  isCompared: (id: string) => boolean;
}

export const PropertyListing: React.FC<PropertyListingProps> = ({ onSelectProperty, onBack, onToggleCompare, isCompared }) => {
  const [filters, setFilters] = useState({
    type: 'All',
    maxPrice: 200, // in Lakhs
    location: '',
  });

  const [sortBy, setSortBy] = useState('Featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Helper to parse price string to number for filtering (Very basic approx)
  const getPriceValue = (priceStr: string) => {
    if (priceStr.includes('Cr')) return parseFloat(priceStr.replace(/[^0-9.]/g, '')) * 100;
    if (priceStr.includes('L')) return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return 0;
  };

  const filteredProperties = ALL_PROPERTIES.filter(p => {
    // Type Filter
    if (filters.type !== 'All' && p.type !== filters.type) return false;
    
    // Price Filter
    const priceVal = getPriceValue(p.price);
    if (priceVal > filters.maxPrice) return false;

    // Location Filter
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-primary">All Properties</h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
             <button 
                className="lg:hidden flex items-center gap-2 text-sm font-semibold bg-gray-100 px-3 py-2 rounded-lg text-gray-700"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
             >
                <SlidersHorizontal size={16} /> Filters
             </button>

             <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden md:inline">Sort By:</span>
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2 focus:ring-primary focus:border-primary outline-none"
                >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 flex flex-col lg:flex-row gap-8 relative">
        
        {/* Sidebar Filters - Desktop */}
        <div className={`
            lg:block lg:w-1/4 
            ${showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
            lg:relative lg:inset-auto lg:p-0 lg:bg-transparent lg:overflow-visible
        `}>
           {showMobileFilters && (
               <div className="flex justify-between items-center mb-6 lg:hidden">
                   <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                   <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full">
                       <X size={20} />
                   </button>
               </div>
           )}

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold border-b pb-2">
                 <Filter size={18} /> Filters
              </div>
              
              <div className="space-y-6">
                 {/* Type */}
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
                    <div className="space-y-2">
                       {['All', 'Villa', 'Bungalow', 'Plot', 'Commercial'].map(type => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer group">
                             <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.type === type ? 'border-primary' : 'border-gray-300'}`}>
                                {filters.type === type && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                             </div>
                             <input 
                                type="radio" 
                                name="propType" 
                                checked={filters.type === type}
                                onChange={() => setFilters({...filters, type})}
                                className="hidden"
                             />
                             <span className={`text-sm ${filters.type === type ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>{type}</span>
                          </label>
                       ))}
                    </div>
                 </div>

                 {/* Price Range */}
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price (₹ {filters.maxPrice} L)</label>
                    <input 
                        type="range" 
                        min="5" 
                        max="200" 
                        step="5"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                       <span>₹ 5 L</span>
                       <span>₹ 2 Cr+</span>
                    </div>
                 </div>

                 {/* Location */}
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <div className="relative">
                       <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                       <input 
                          type="text" 
                          placeholder="Search location..."
                          value={filters.location}
                          onChange={(e) => setFilters({...filters, location: e.target.value})}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary transition"
                       />
                    </div>
                 </div>

                 <div className="flex gap-2">
                     <button 
                        onClick={() => setFilters({ type: 'All', maxPrice: 200, location: '' })}
                        className="flex-1 py-2 text-sm text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition border border-gray-200"
                     >
                        Reset
                     </button>
                     <button 
                         onClick={() => setShowMobileFilters(false)}
                         className="flex-1 py-2 text-sm bg-primary text-white font-bold rounded-lg lg:hidden"
                     >
                         Apply
                     </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Listings Grid */}
        <div className="w-full lg:w-3/4">
           {filteredProperties.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map(property => (
                      <div 
                        key={property.id} 
                        onClick={() => onSelectProperty(property)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group flex flex-col relative"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-white/95 backdrop-blur px-2 py-1 text-xs font-bold rounded text-gray-800 shadow-sm">
                                    {property.type}
                                </span>
                            </div>
                            <button 
                                onClick={(e) => onToggleCompare(e, property)}
                                className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-30 transition-all ${isCompared(property.id) ? 'bg-primary text-white scale-100' : 'bg-white hover:bg-gray-100 text-gray-600 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`}
                                title={isCompared(property.id) ? "Remove from Compare" : "Add to Compare"}
                            >
                                <GitCompare size={18} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h4 className="font-bold text-xl text-primary mb-1">{property.price}</h4>
                            <p className="text-gray-700 text-sm font-medium mb-1 line-clamp-1">{property.title}</p>
                            <p className="text-gray-500 text-xs flex items-center gap-1 mb-3"><MapPin size={12}/> {property.location}</p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs text-gray-400">{property.size || 'Size N/A'}</span>
                                <span className="text-xs font-bold text-primary group-hover:underline">View Details</span>
                            </div>
                        </div>
                    </div>
                  ))}
               </div>
           ) : (
               <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                     <Search size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">No Properties Found</h3>
                  <p className="text-gray-500 text-sm mt-1 mb-4">Try adjusting your filters to find what you're looking for.</p>
                  <button 
                    onClick={() => setFilters({ type: 'All', maxPrice: 200, location: '' })}
                    className="text-primary font-bold hover:underline"
                  >
                    Clear Filters
                  </button>
               </div>
           )}
        </div>
      </div>
    </div>
  );
};