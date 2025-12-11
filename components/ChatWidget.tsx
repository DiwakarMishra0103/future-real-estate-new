import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
  isOption?: boolean;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! Welcome to Future Real Estate. 👋", sender: 'bot', time: 'Just now' },
    { id: 2, text: "I'm your virtual assistant. How can I help you find your dream property today?", sender: 'bot', time: 'Just now' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate Bot Response
    setTimeout(() => {
      let botResponseText = "Thanks for your inquiry! Our agents are currently busy, but we'll get back to you shortly.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('price') || lowerText.includes('cost')) {
        botResponseText = "Our properties range from ₹9L to ₹2Cr+. Would you like to see properties within a specific budget?";
      } else if (lowerText.includes('location') || lowerText.includes('where')) {
        botResponseText = "We have prime properties in Karjat, Alibaug, and near the new Atal Setu. Which location interests you?";
      } else if (lowerText.includes('villa') || lowerText.includes('house')) {
        botResponseText = "Villas are a great choice! We have 3BHK and 4BHK luxury villas available.";
      } else if (lowerText.includes('plot') || lowerText.includes('land')) {
        botResponseText = "Investing in plots is a smart move. We have residential and commercial plots with high ROI potential.";
      } else if (lowerText.includes('contact') || lowerText.includes('call')) {
        botResponseText = "You can reach us at +91 98765 43210 or email info@futurerealestate.com.";
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickOptions = [
    "View Properties",
    "Request Callback",
    "Investment Plans",
    "Contact Support"
  ];

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[90vw] md:w-[350px] h-[500px] max-h-[80vh] flex flex-col mb-4 overflow-hidden border border-gray-200 animate-slide-up origin-bottom-right transition-all">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full relative">
                <Bot size={20} />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-primary"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">Future Assistant</h3>
                <p className="text-[10px] text-white/80 flex items-center gap-1">
                  <Sparkles size={10} className="text-secondary" /> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition">
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-primary" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                  <div className={`text-[9px] mt-1 opacity-70 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          {messages.length < 4 && (
             <div className="px-4 pb-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
                {quickOptions.map(opt => (
                    <button 
                        key={opt}
                        onClick={() => handleSend(opt)}
                        className="whitespace-nowrap bg-white border border-gray-200 text-xs text-primary font-medium px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition shadow-sm"
                    >
                        {opt}
                    </button>
                ))}
             </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-primary text-white p-2.5 rounded-full hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="relative group">
         {!isOpen && (
            <div className="absolute bottom-full right-0 mb-3 w-48 bg-white p-3 rounded-xl shadow-lg border border-gray-100 origin-bottom-right animate-bounce-slow hidden md:block">
                <div className="text-sm text-gray-700 font-medium">Hi there! 👋 <br/>Need help finding a property?</div>
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </div>
         )}
         <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-14 h-14 bg-primary rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 relative"
         >
            {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            {!isOpen && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
         </button>
      </div>
    </div>
  );
};