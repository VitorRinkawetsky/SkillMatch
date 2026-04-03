import React from 'react';
import { Plus } from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-xl italic font-serif">S</span>
        </div>
        <span className="text-xl font-semibold text-gray-800">SkillMatch</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          Create Project
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium">
            {user.avatarInitials}
          </div>
          <span className="text-sm font-medium text-gray-700">{user.name}</span>
        </div>
      </div>
    </header>
  );
}