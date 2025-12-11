import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LeadGenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadGenModal: React.FC<LeadGenModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-4 text-white flex justify-between items-center">
          <h3 className="font-semibold text-lg">Enquire Now</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🎉</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Thank You!</h4>
                <p className="text-gray-600 mt-2">Our expert will contact you shortly.</p>
            </div>
          ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-500 mb-4">Get the best deals on Plots & Villas. Fill out the form below.</p>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                  <input type="text" required className="bg-white w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm" placeholder="Enter your name" />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                  <input type="tel" required className="bg-white w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm" placeholder="+91 XXXXX XXXXX" />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Interested In</label>
                    <select className="bg-white w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm">
                        <option>Buying Plot</option>
                        <option>Buying Villa</option>
                        <option>Investment</option>
                        <option>Selling Property</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition transform hover:scale-[1.02] shadow-md">
                  Get Callback
                </button>
              </form>
          )}
        </div>
      </div>
    </div>
  );
};