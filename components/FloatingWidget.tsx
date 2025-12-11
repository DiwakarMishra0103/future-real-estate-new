import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

export const FloatingWidget = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-2">
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 relative max-w-[250px] animate-bounce-slow">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
        >
          <X size={14} />
        </button>
        <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-full">
                <MessageCircle size={20} className="text-green-600" />
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-800">Are you looking to invest in Plot?</p>
                <div className="flex gap-2 mt-2">
                    <button 
                        onClick={onOpenModal}
                        className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
                    >
                        Yes
                    </button>
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="text-xs border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Floating Logo/Icon (Simulated Future Real Estate Icon) */}
      <button onClick={onOpenModal} className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-green-500 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform">
        <span className="text-green-700 font-bold text-xs">F</span>
      </button>
    </div>
  );
};