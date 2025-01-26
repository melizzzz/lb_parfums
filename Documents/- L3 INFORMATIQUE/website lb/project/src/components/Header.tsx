import React, { useState } from 'react';
import { SprayCan as  Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <img src="src\public\images\logo.png" alt="LB PARFUMS LOGO" className="h-16 w-auto" />
              <span className="text-xl font-serif font-medium">THE SMELL OF EXCELLENCE</span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#new-arrivals" className="text-gray-600 hover:text-gray-900 transition">Nouveautés</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition">À Propos</a>
            <a href="#femme" className="text-gray-600 hover:text-gray-900 transition">Femme</a>
            <a href="#homme" className="text-gray-600 hover:text-gray-900 transition">Homme</a>
            <a href="#unisex" className="text-gray-600 hover:text-gray-900 transition">Unisex</a>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-gray-900 transition flex items-center"
            >
              <Search className="h-5 w-5" />
            </button>
          </nav>
        </div>
        
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un parfum ou une note (ex: rose, jasmin)..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;