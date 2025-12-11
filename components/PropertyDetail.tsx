import React, { useState } from 'react';
import { ArrowLeft, MapPin, GitCompare, CheckCircle, PlayCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../types';
import { POPULAR_PROPERTIES } from '../constants';
import { SectionHeader } from './SectionHeader';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onToggleCompare: (e: React.MouseEvent, property: Property) => void;
  isCompared: (id: string) => boolean;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  property, 
  onBack, 
  onToggleCompare, 
  isCompared,
  onSelectProperty 
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Use the images array if available, otherwise fallback to the single image
  const galleryImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.image];

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 pt-20">
        {/* Detail Page Header - Fixed Position */}
        <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-primary transition"
                >
                    <ArrowLeft size={20} /> Back to Listings
                </button>
                <div className="text-xl font-bold text-primary hidden md:block">
                    Future <span className="text-secondary">Real Estate</span>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Content */}
                <div className="flex-grow lg:w-2/3">
                    {/* Image Carousel */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-8 relative group">
                        <div className="relative h-[40vh] md:h-[500px] w-full bg-gray-200">
                            <img 
                                src={galleryImages[currentImgIndex]} 
                                alt={`${property.title} - View ${currentImgIndex + 1}`} 
                                className="w-full h-full object-cover transition-opacity duration-300" 
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

                            {/* Status Badges */}
                            <div className="absolute top-4 left-4 flex gap-2 z-10">
                                <span className="bg-secondary text-white font-bold px-4 py-1.5 rounded-full shadow-md text-sm">
                                    {property.status || 'For Sale'}
                                </span>
                                {property.isFeatured && (
                                    <span className="bg-primary text-white font-bold px-4 py-1.5 rounded-full shadow-md text-sm">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Compare Button */}
                            <button 
                                onClick={(e) => onToggleCompare(e, property)}
                                className={`absolute top-4 right-4 p-2 rounded-full shadow-md z-20 transition-all ${isCompared(property.id) ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100 text-gray-600'}`}
                                title={isCompared(property.id) ? "Remove from Compare" : "Add to Compare"}
                            >
                                <GitCompare size={20} />
                            </button>

                            {/* Navigation Controls (Only if multiple images) */}
                            {galleryImages.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/90 text-white hover:text-gray-800 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/90 text-white hover:text-gray-800 p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                        {galleryImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImgIndex(idx)}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    idx === currentImgIndex 
                                                        ? 'bg-white w-6' 
                                                        : 'bg-white/50 hover:bg-white/80'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <div className="p-6 md:p-8">
                             <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b border-gray-100 pb-6">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{property.title}</h1>
                                    <p className="text-gray-600 flex items-center gap-2 text-lg">
                                        <span className="text-primary">📍</span> {property.location}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 text-left md:text-right">
                                     <p className="text-3xl font-bold text-primary">{property.price}</p>
                                     <p className="text-gray-500 font-medium">{property.size || 'Size On Request'} | {property.type}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {property.description || "Experience the best of nature and luxury with this property. Situated in a prime location with excellent connectivity, this property offers a perfect blend of tranquility and modern living. Whether you are looking for an investment opportunity or your dream second home, this project delivers on all fronts with top-tier infrastructure and scenic surroundings."}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {(property.amenities || ['Garden', '24x7 Security', 'Water Supply', 'Electricity', 'Parking', 'Kids Play Area']).map(am => (
                                            <div key={am} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <CheckCircle size={16} className="text-green-500" />
                                                <span className="text-sm font-medium">{am}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Video Tour Section */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Video Tour</h3>
                                    {property.videoUrl ? (
                                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-black">
                                            <iframe 
                                                src={property.videoUrl} 
                                                title={`Video tour of ${property.title}`}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                loading="lazy"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <div className="aspect-video w-full rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-gray-400 border border-gray-200 border-dashed hover:bg-gray-100 transition duration-300">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-gray-300">
                                                <PlayCircle size={32} />
                                            </div>
                                            <span className="font-semibold text-gray-500">Video Tour Coming Soon</span>
                                            <p className="text-xs mt-1 text-gray-400">Contact us to schedule a physical visit</p>
                                        </div>
                                    )}
                                </div>

                                {/* Location Map Section */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Location Map</h3>
                                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100 relative group">
                                        <iframe 
                                            width="100%" 
                                            height="100%" 
                                            frameBorder="0" 
                                            scrolling="no" 
                                            marginHeight={0} 
                                            marginWidth={0} 
                                            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                            title={`${property.title} Location`}
                                            loading="lazy"
                                            className="w-full h-full grayscale group-hover:grayscale-0 transition duration-700"
                                        ></iframe>
                                        <div className="absolute inset-0 pointer-events-none border-4 border-white/20 rounded-2xl"></div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                        <MapPin size={12} /> Map view is approximate based on location name.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Similar Properties */}
                    <div className="mt-12">
                        <SectionHeader title="Similar Properties" linkText="" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {POPULAR_PROPERTIES.filter(p => p.id !== property.id).slice(0, 2).map(p => (
                                <div 
                                    key={`sim-${p.id}`} 
                                    onClick={() => onSelectProperty(p)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition flex flex-col relative group"
                                >
                                    <div className="h-48 relative">
                                        <img src={p.image} className="w-full h-full object-cover" alt={p.title}/>
                                        <button 
                                            onClick={(e) => onToggleCompare(e, p)}
                                            className={`absolute top-2 right-2 p-2 rounded-full shadow-md z-20 transition-all ${isCompared(p.id) ? 'bg-primary text-white scale-100' : 'bg-white hover:bg-gray-100 text-gray-600 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}
                                        >
                                            <GitCompare size={18} />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-lg">{p.price}</h4>
                                        <p className="text-sm text-gray-600">{p.title}</p>
                                        <p className="text-xs text-gray-400 mt-1">{p.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Sticky Enquiry Form */}
                <div className="lg:w-1/3 relative">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <div className="bg-primary/5 p-4 rounded-xl mb-6 text-center">
                            <p className="text-sm text-gray-600">Interested in this property?</p>
                            <h3 className="text-xl font-bold text-primary">Request a Callback</h3>
                        </div>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our agent will contact you shortly.'); }}>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                <input required type="text" placeholder="Your Name" className="bg-white w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                                <input required type="tel" placeholder="+91 XXXXX XXXXX" className="bg-white w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                <input required type="email" placeholder="email@example.com" className="bg-white w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                                <textarea placeholder="I am interested in..." className="bg-white w-full border border-gray-300 p-3 rounded-lg h-24 resize-none focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"></textarea>
                            </div>
                            
                            <div className="flex flex-col gap-3 pt-2">
                                <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary/90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Send Enquiry
                                </button>
                                <button type="button" onClick={() => alert('Viewing scheduling feature coming soon!')} className="w-full bg-white border-2 border-primary text-primary font-bold py-3.5 rounded-lg hover:bg-primary/5 transition flex items-center justify-center gap-2">
                                    <Calendar size={18} /> Schedule Viewing
                                </button>
                            </div>
                        </form>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            By clicking Send Enquiry, you agree to our Terms and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};