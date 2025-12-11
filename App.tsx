import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Home, User, PlusCircle, ArrowRight, GitCompare, Trash2 } from 'lucide-react';
import { Hero } from './components/Hero';
import { Carousel } from './components/Carousel';
import { SectionHeader } from './components/SectionHeader';
import { LeadGenModal } from './components/LeadGenModal';
import { ChatWidget } from './components/ChatWidget';
import { CompareModal } from './components/CompareModal';
import { PropertyListing } from './components/PropertyListing';
import { BlogDetail } from './components/BlogDetail';
import { PropertyDetail } from './components/PropertyDetail';
import { HIGHLIGHTED_PROJECTS, POPULAR_PROPERTIES, TOP_LOCATIONS, DREAM_CATEGORIES, BLOGS, BlogItemExtended } from './constants';
import { Property } from './types';

type ViewState = 'HOME' | 'PROPERTY_DETAILS' | 'LISTING' | 'BLOG_DETAILS';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selection State
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogItemExtended | null>(null);
  
  // Comparison State
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Navigation Handlers
  const goHome = () => {
    setCurrentView('HOME');
    setSelectedProperty(null);
    setSelectedBlog(null);
    window.scrollTo(0, 0);
  };

  const goToDetails = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('PROPERTY_DETAILS');
    window.scrollTo(0, 0);
  };

  const goToListing = () => {
    setCurrentView('LISTING');
    window.scrollTo(0, 0);
  };

  const goToBlog = (blog: BlogItemExtended) => {
    setSelectedBlog(blog);
    setCurrentView('BLOG_DETAILS');
    window.scrollTo(0, 0);
  };

  // Security Measures: Disable Right Click and DevTools Shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Block Ctrl+Shift+I (DevTools), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect)
      if (e.ctrlKey && e.shiftKey && (['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key))) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Auto-open modal after 5 seconds to generate leads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsModalOpen(true);

  // Comparison Logic
  const toggleCompare = (e: React.MouseEvent, property: Property) => {
    e.stopPropagation();
    const exists = compareList.find(p => p.id === property.id);
    
    if (exists) {
        setCompareList(prev => prev.filter(p => p.id !== property.id));
    } else {
        if (compareList.length >= 3) {
            alert("You can compare up to 3 properties at a time.");
            return;
        }
        setCompareList(prev => [...prev, property]);
    }
  };

  const isCompared = (id: string) => compareList.some(p => p.id === id);

  // Common Chat and LeadGen Render
  const CommonWidgets = () => (
      <>
        <ChatWidget />
        <LeadGenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <CompareModal 
            isOpen={isCompareModalOpen} 
            onClose={() => setIsCompareModalOpen(false)}
            properties={compareList}
            onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
            onClear={() => setCompareList([])}
        />
        {compareList.length > 0 && !isCompareModalOpen && (
            <div className="fixed bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 z-40 animate-slide-up w-[90%] md:w-auto">
                <div className="bg-gray-900/90 backdrop-blur-md text-white px-4 py-3 rounded-full shadow-2xl flex items-center justify-between md:justify-start gap-4 border border-white/10 ring-1 ring-black/20">
                    <div className="flex items-center gap-3">
                        <div className="bg-secondary text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm shrink-0">
                            {compareList.length}
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setIsCompareModalOpen(true)}
                            className="bg-secondary hover:bg-yellow-400 text-primary font-bold px-4 py-1.5 rounded-full text-xs md:text-sm transition flex items-center gap-1.5 whitespace-nowrap"
                        >
                            Compare <ArrowRight size={14} />
                        </button>
                        <button 
                            onClick={() => setCompareList([])}
                            className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition"
                            title="Clear"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        )}
      </>
  );

  // --- VIEW RENDERING ---

  // 1. Blog Details View
  if (currentView === 'BLOG_DETAILS' && selectedBlog) {
    return (
        <>
            <BlogDetail blog={selectedBlog} onBack={goHome} />
            <CommonWidgets />
        </>
    );
  }

  // 2. Property Listing View
  if (currentView === 'LISTING') {
    return (
        <>
            <PropertyListing 
                onSelectProperty={goToDetails} 
                onBack={goHome}
                onToggleCompare={toggleCompare}
                isCompared={isCompared}
            />
            <CommonWidgets />
        </>
    );
  }

  // 3. Detail Page View
  if (currentView === 'PROPERTY_DETAILS' && selectedProperty) {
    return (
      <>
        <PropertyDetail 
          property={selectedProperty} 
          onBack={goHome}
          onToggleCompare={toggleCompare}
          isCompared={isCompared}
          onSelectProperty={goToDetails}
        />
        <CommonWidgets />
      </>
    );
  }

  // 4. Main Home Page View
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* Top Header */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={goHome}>
                <div className="text-2xl font-bold tracking-tighter">
                    Future <span className="text-secondary">Real Estate</span>
                </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#" onClick={goHome} className="flex items-center gap-1.5 hover:text-secondary transition"><Home size={16}/> Home</a>
                <a href="#" className="flex items-center gap-1.5 hover:text-secondary transition"><User size={16}/> For Buyer</a>
                <a href="#" className="flex items-center gap-1.5 hover:text-secondary transition"><User size={16}/> For Seller</a>
                <button 
                  onClick={openModal}
                  className="bg-white text-primary px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition shadow-sm hover:shadow-md"
                >
                    Post Property <span className="bg-accent text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wide">Free</span>
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-primary border-t border-white/10 p-4 space-y-4 shadow-xl absolute w-full left-0 z-50">
                <a href="#" onClick={() => { goHome(); setMobileMenuOpen(false); }} className="block py-2 hover:text-secondary border-b border-white/10">Home</a>
                <a href="#" className="block py-2 hover:text-secondary border-b border-white/10">For Buyer</a>
                <a href="#" className="block py-2 hover:text-secondary border-b border-white/10">For Seller</a>
                <button onClick={openModal} className="w-full text-left py-3 font-bold text-secondary">Post Property FREE</button>
            </div>
        )}
      </header>

      {/* Hero Section */}
      <Hero onSelectProperty={goToDetails} />

      <main className="container mx-auto px-4 py-12 space-y-20 pb-32">
        
        {/* Highlighted Projects */}
        <section>
            <SectionHeader title="Top Highlighted Projects" onLinkClick={goToListing} />
            <Carousel>
                {HIGHLIGHTED_PROJECTS.map((project) => (
                    <div 
                        key={project.id} 
                        onClick={() => goToDetails(project)}
                        className="min-w-[280px] md:min-w-[380px] snap-center cursor-pointer group px-1 pb-4"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] transform transition duration-500 group-hover:scale-[1.02]">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            
                            {/* Compare Button */}
                            <button 
                                onClick={(e) => toggleCompare(e, project)}
                                className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-30 transition-all ${isCompared(project.id) ? 'bg-primary text-white' : 'bg-white/90 hover:bg-white text-gray-700'}`}
                                title={isCompared(project.id) ? "Remove from Compare" : "Add to Compare"}
                            >
                                <GitCompare size={18} />
                            </button>

                            <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                                <h3 className="text-xl font-bold leading-tight mb-1">{project.title}</h3>
                                <p className="text-sm opacity-90 mb-2">{project.location}</p>
                                <div className="flex justify-between items-end">
                                    <span className="text-2xl font-bold text-secondary">{project.price}</span>
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">View Details</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>

        {/* Popular Properties */}
        <section>
            <SectionHeader title="Popular Properties" onLinkClick={goToListing} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {POPULAR_PROPERTIES.map((property) => (
                    <div 
                        key={property.id} 
                        onClick={() => goToDetails(property)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group flex flex-col h-full relative"
                    >
                        <div className="h-52 overflow-hidden relative">
                            <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-white/95 backdrop-blur px-2 py-1 text-xs font-bold rounded text-gray-800 shadow-sm">
                                    {property.type}
                                </span>
                            </div>
                             {/* Compare Button */}
                             <button 
                                onClick={(e) => toggleCompare(e, property)}
                                className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-30 transition-all ${isCompared(property.id) ? 'bg-primary text-white scale-100' : 'bg-white hover:bg-gray-100 text-gray-600 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`}
                                title={isCompared(property.id) ? "Remove from Compare" : "Add to Compare"}
                            >
                                <GitCompare size={18} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h4 className="font-bold text-xl text-primary mb-1">{property.price}</h4>
                            <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 font-medium">
                                <span>{property.size}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span>{property.status}</span>
                            </div>
                            <p className="text-gray-700 text-sm font-medium line-clamp-1">{property.location}</p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs text-gray-400">Verified Listing</span>
                                <span className="text-xs font-bold text-primary group-hover:underline">View Details</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Top Locations */}
        <section>
            <SectionHeader title="Top Locations" linkText="" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {TOP_LOCATIONS.map((loc) => (
                    <div key={loc.id} className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md aspect-[4/3]">
                        <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4 md:pb-6">
                            <h3 className="text-white font-bold text-lg md:text-xl text-center shadow-black drop-shadow-md px-2">{loc.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Recommended Property */}
        <section>
            <SectionHeader title="Recommended Property" onLinkClick={goToListing} />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...POPULAR_PROPERTIES].reverse().map((property) => (
                    <div 
                        key={`rec-${property.id}`} 
                        onClick={() => goToDetails(property)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group relative"
                    >
                         <div className="h-48 overflow-hidden relative">
                            <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                             {/* Moved Hot Deal to left to accommodate compare button */}
                             <span className="absolute top-3 left-3 bg-secondary text-primary px-3 py-1 text-xs font-bold rounded-full shadow-md z-10">
                                Hot Deal
                            </span>
                            {/* Compare Button */}
                            <button 
                                onClick={(e) => toggleCompare(e, property)}
                                className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-30 transition-all ${isCompared(property.id) ? 'bg-primary text-white scale-100' : 'bg-white hover:bg-gray-100 text-gray-600 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`}
                                title={isCompared(property.id) ? "Remove from Compare" : "Add to Compare"}
                            >
                                <GitCompare size={18} />
                            </button>
                        </div>
                        <div className="p-5">
                            <h4 className="font-bold text-xl text-gray-800">{property.price}</h4>
                             <h5 className="font-medium text-gray-700 text-sm mb-1">{property.title}</h5>
                            <p className="text-gray-500 text-xs mb-3 flex items-center gap-1">📍 {property.location}</p>
                            <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">Ready To Move</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Dream Plots / Categories */}
        <section>
             <SectionHeader title="Find Your Dream Plots With Future Real Estate" linkText="" />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {DREAM_CATEGORIES.map((cat) => (
                     <div key={cat.id} className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition duration-300 group relative">
                         <div className="h-44 overflow-hidden relative rounded-t-2xl">
                             <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                         </div>
                         {/* Button absolutely positioned on the seam of image and text, outside overflow-hidden */}
                         <div className="absolute top-44 right-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-50 z-20 group-hover:bg-primary group-hover:border-primary transition-colors cursor-pointer" onClick={goToListing}>
                             <PlusCircle className="text-primary group-hover:text-white transition-colors" />
                         </div>
                         <div className="p-6 pt-8 flex-grow">
                             <h3 className="font-bold text-lg mb-3 text-gray-800 group-hover:text-primary transition">{cat.title}</h3>
                             <p className="text-gray-500 text-sm leading-relaxed">{cat.description}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </section>

        {/* Featured Properties (99Villa) */}
        <section className="py-8">
            <div className="bg-gray-50 rounded-[2.5rem] p-6 md:p-12 lg:p-16 relative overflow-hidden">
                 {/* Decorative background element */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                 <div className="text-center mb-10 md:mb-16 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Properties</h2>
                    <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
                 </div>

                 <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                     <div className="flex-1 space-y-6">
                         <h3 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Welcome to 99Villa</h3>
                         <h4 className="text-xl font-bold text-gray-700">*Riverhill - With Nature In the Nature!</h4>
                         <p className="text-gray-600 leading-loose text-base md:text-lg">
                             Enjoy exclusive bungalow + plot offerings with <span className="font-bold text-primary">20+ amenities</span> for the ultimate living experience. Moreover, connect with nature through farming opportunities. We value sustainable living and the joy of growing your own veggies. That's why we bring you closer to nature.
                         </p>
                         <button onClick={goToListing} className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition shadow-lg">See More Details</button>
                     </div>
                     <div className="flex-1">
                        <img src="https://picsum.photos/seed/nature_home/600/400" alt="Nature Home" className="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500 w-full object-cover" />
                     </div>
                 </div>
            </div>
        </section>

        {/* Blogs & News */}
        <section>
            <SectionHeader title="News & Blogs" linkText="See More blogs" onLinkClick={() => alert('Blog listing page coming soon!')} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOGS.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
                        <div className="h-56 overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-6">
                             <div className="text-xs text-secondary font-bold uppercase tracking-wider mb-2">{blog.date}</div>
                             <h3 className="font-bold text-lg mb-3 text-gray-800 line-clamp-2 leading-tight group-hover:text-primary transition">{blog.title}</h3>
                             <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{blog.excerpt}</p>
                             <button onClick={() => goToBlog(blog)} className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <div className="text-2xl font-bold tracking-tighter mb-4">
                        Future <span className="text-secondary">Real Estate</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Your trusted partner for finding the best plots, villas, and investment opportunities in Navi Mumbai and beyond.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="#" onClick={goHome} className="hover:text-white transition flex items-center gap-2"><ArrowRight size={12} className="text-secondary"/> Home</a></li>
                        <li><a href="#" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={12} className="text-secondary"/> About Us</a></li>
                        <li><a href="#" onClick={goToListing} className="hover:text-white transition flex items-center gap-2"><ArrowRight size={12} className="text-secondary"/> Properties</a></li>
                        <li><a href="#" className="hover:text-white transition flex items-center gap-2"><ArrowRight size={12} className="text-secondary"/> Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
                    <div className="space-y-4 text-gray-400 text-sm">
                        <p className="flex items-center gap-3"><span className="bg-gray-800 p-2 rounded-full"><Phone size={14} className="text-secondary"/></span> +91 98765 43210</p>
                        <p className="flex items-center gap-3"><span className="bg-gray-800 p-2 rounded-full"><Mail size={14} className="text-secondary"/></span> info@futurerealestate.com</p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="hover:text-secondary transition bg-gray-800 p-2 rounded-full"><Facebook size={18}/></a>
                            <a href="#" className="hover:text-secondary transition bg-gray-800 p-2 rounded-full"><Instagram size={18}/></a>
                            <a href="#" className="hover:text-secondary transition bg-gray-800 p-2 rounded-full"><Linkedin size={18}/></a>
                            <a href="#" className="hover:text-secondary transition bg-gray-800 p-2 rounded-full"><Youtube size={18}/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Future Real Estate. All rights reserved.
            </div>
        </div>
      </footer>
      
      <CommonWidgets />
    </div>
  );
}

export default App;