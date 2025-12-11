import React from 'react';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { BlogItemExtended } from '../constants';

interface BlogDetailProps {
  blog: BlogItemExtended;
  onBack: () => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ blog, onBack }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar Placeholder for Consistency */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
            >
                <ArrowLeft size={24} />
            </button>
            <span className="font-semibold text-lg text-gray-800">Back to News</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
         <div className="mb-6">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
                Real Estate News
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1"><Calendar size={14}/> {blog.date}</span>
                <span>•</span>
                <span>5 min read</span>
            </div>
         </div>

         <div className="rounded-2xl overflow-hidden shadow-lg mb-8 h-[300px] md:h-[500px]">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
         </div>

         <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
                <div 
                    className="prose prose-lg text-gray-700 leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }}
                />
            </div>
            
            <div className="md:w-1/4">
                <div className="sticky top-24 space-y-6">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Share2 size={18} /> Share this article
                        </h4>
                        <div className="flex gap-2">
                            <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"><Facebook size={18}/></button>
                            <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"><Twitter size={18}/></button>
                            <button className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"><Linkedin size={18}/></button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </article>
    </div>
  );
};