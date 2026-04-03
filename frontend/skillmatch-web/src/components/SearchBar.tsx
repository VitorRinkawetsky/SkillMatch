import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl mx-auto mb-12">
      <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        <input 
          type="text" 
          placeholder="Search projects by title, skill, or field (e.g., Python machine learning)..." 
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
        />
        <button className="p-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          <Search className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-blue-500 cursor-pointer w-full md:w-auto">
          <option>Field</option>
          <option>Engineering</option>
          <option>Research</option>
          <option>Data Science</option>
        </select>
        
        <select className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 outline-none focus:border-blue-500 cursor-pointer w-full md:w-auto">
          <option>Skill</option>
          <option>Python</option>
          <option>Machine Learning</option>
        </select>
      </div>
    </div>
  );
}