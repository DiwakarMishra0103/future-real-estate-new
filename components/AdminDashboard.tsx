import React, { useState, useRef } from 'react';
import { Property } from '../types';
import { LayoutDashboard, Plus, Trash2, LogOut, Upload, Image as ImageIcon, X, CheckCircle, ShieldCheck, Lock, User, ArrowLeft, Loader2 } from 'lucide-react';

interface AdminDashboardProps {
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  properties, 
  onAddProperty, 
  onDeleteProperty, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'LIST' | 'ADD'>('LIST');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    price: '',
    location: '',
    type: 'Plot',
    description: '',
    image: '',
    images: []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- LOGIN LOGIC ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
        if (loginCreds.username === 'admin' && loginCreds.password === 'admin') {
            setIsAuthenticated(true);
            setIsLoading(false);
        } else {
            setError('Invalid username or password. Please try again.');
            setIsLoading(false);
        }
    }, 800);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary to-gray-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>

        {/* Back Button */}
        <button
            onClick={onLogout}
            className="absolute top-6 left-6 text-white/70 hover:text-white flex items-center gap-2 transition z-20 group"
        >
            <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition backdrop-blur-sm">
                <ArrowLeft size={20} />
            </div>
            <span className="font-medium text-sm md:text-base">Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10">
            {/* Login Header */}
            <div className="bg-primary p-8 pb-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/20 shadow-lg transform transition hover:rotate-0 duration-500">
                     <ShieldCheck size={32} className="text-white drop-shadow-md" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Admin Portal</h2>
                <p className="text-white/70 text-sm mt-1 font-medium">Secure access for management</p>
            </div>

            {/* Login Form */}
            <div className="p-8 -mt-4 bg-white rounded-t-3xl relative z-10">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-start gap-3">
                         <X size={18} className="mt-0.5 shrink-0" /> 
                         <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Username</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors duration-300">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={loginCreds.username}
                                onChange={(e) => { setLoginCreds({...loginCreds, username: e.target.value}); setError(''); }}
                                className={`w-full bg-gray-50 border ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'} rounded-xl py-3.5 pl-12 pr-4 text-gray-800 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder-gray-400`}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors duration-300">
                                <Lock size={20} />
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={loginCreds.password}
                                onChange={(e) => { setLoginCreds({...loginCreds, password: e.target.value}); setError(''); }}
                                className={`w-full bg-gray-50 border ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'} rounded-xl py-3.5 pl-12 pr-4 text-gray-800 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder-gray-400`}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> Verifying...
                            </>
                        ) : (
                            <>Access Dashboard <ArrowLeft className="rotate-180" size={18} /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                     <p className="text-xs text-gray-400">
                        Restricted Area. Unauthorized access is prohibited.<br/>
                        <span className="opacity-50 mt-2 block">(Default: admin / admin)</span>
                     </p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- IMAGE UPLOAD LOGIC ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store Base64 string
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty: Property = {
        id: `prop-${Date.now()}`,
        title: formData.title || 'Untitled Property',
        location: formData.location || 'Unknown',
        price: formData.price || 'Price on Request',
        type: formData.type as any || 'Plot',
        image: formData.image || 'https://picsum.photos/seed/new/600/400', // Fallback
        description: formData.description,
        status: 'For Sale',
        isFeatured: false,
        images: formData.image ? [formData.image!] : []
    };
    onAddProperty(newProperty);
    alert('Property Added Successfully!');
    setActiveTab('LIST');
    setFormData({ title: '', price: '', location: '', type: 'Plot', description: '', image: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-xs text-gray-400 mt-1">Manage Properties</p>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('LIST')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'LIST' ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
             onClick={() => setActiveTab('ADD')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'ADD' ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            <Plus size={20} /> Add Property
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/50 text-red-400 mt-8 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        
        {/* ADD PROPERTY FORM */}
        {activeTab === 'ADD' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Plus className="text-primary" /> Add New Property
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Property Title</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. Luxury Villa in Karjat"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. ₹ 45 L"
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. Navi Mumbai"
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                        <select 
                            value={formData.type}
                            onChange={e => setFormData({...formData, type: e.target.value as any})}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none bg-white"
                        >
                            <option value="Plot">Plot</option>
                            <option value="Villa">Villa</option>
                            <option value="Bungalow">Bungalow</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea 
                        rows={4}
                        placeholder="Describe the property..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none resize-none"
                    />
                </div>

                {/* IMAGE UPLOAD */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Property Image</label>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative overflow-hidden group"
                    >
                        {formData.image ? (
                            <div className="relative w-full h-48">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <p className="text-white font-bold flex items-center gap-2"><Upload size={18}/> Change Image</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-primary/10 p-4 rounded-full mb-3">
                                    <ImageIcon className="text-primary" size={24} />
                                </div>
                                <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                                <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </>
                        )}
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button 
                        type="button" 
                        onClick={() => setActiveTab('LIST')}
                        className="px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="px-8 py-3 rounded-lg font-bold bg-primary text-white hover:bg-opacity-90 transition shadow-lg flex items-center gap-2"
                    >
                        <CheckCircle size={18} /> Publish Property
                    </button>
                </div>
            </form>
          </div>
        )}

        {/* LIST PROPERTIES */}
        {activeTab === 'LIST' && (
          <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Properties</h2>
                <button 
                    onClick={() => setActiveTab('ADD')}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition flex items-center gap-2"
                >
                    <Plus size={16} /> Add New
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Type</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {properties.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{p.title}</td>
                                    <td className="p-4 text-gray-600 text-sm">{p.location}</td>
                                    <td className="p-4 text-primary font-bold text-sm">{p.price}</td>
                                    <td className="p-4">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold border border-gray-200">
                                            {p.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => {
                                                if(confirm('Are you sure you want to delete this property?')) {
                                                    onDeleteProperty(p.id);
                                                }
                                            }}
                                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition"
                                            title="Delete Property"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {properties.length === 0 && (
                        <div className="p-8 text-center text-gray-400">
                            No properties found. Click "Add New" to create one.
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};