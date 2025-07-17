"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Film, Heart, Home, User, Bell } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/home', label: 'Accueil', icon: Home },
  { href: '/movies', label: 'Films', icon: Film },
  { href: '/movies?view=favorites', label: 'Favoris', icon: Heart },
];

export function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full bg-slate-900 shadow-xl sticky top-0 z-50 border-b border-slate-700">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/home" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Film className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Vizion
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-400 transition-colors" />
            <input
              type="text"
              placeholder="Rechercher des films, acteurs, réalisateurs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:bg-slate-700"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = pathname === link.href || (link.href === '/movies?view=favorites' && pathname === '/movies' && typeof window !== 'undefined' && window.location.search.includes('view=favorites'));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComponent className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`} />
                <span className="hidden md:block">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-3 ml-6">
          <button className="relative p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <Link href="/account" className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all group">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <User className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
