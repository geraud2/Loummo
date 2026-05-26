import { Link } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, Package, Clock, CreditCard, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      {/* Top Banner - Caché sur mobile */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white text-xs md:text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center overflow-x-auto gap-4">
            <span className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <Package size={14} />
              LIVRAISON À DOMICILE
            </span>
            <span className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <Clock size={14} />
              ULTRA RAPIDE
            </span>
            <span className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <CreditCard size={14} />
              PAIEMENT À LA LIVRAISON
            </span>
            <span className="flex items-center gap-1 md:gap-2 whitespace-nowrap">
              <Shield size={14} />
              PAIEMENT 100% SÉCURISÉ
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl md:text-4xl font-bold">
                <span className="text-orange-500">L</span>
                <span className="text-gray-800">OUMM</span>
                <span className="text-orange-500">O</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="flex items-center bg-gray-100 rounded-lg w-full">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 outline-none text-gray-700 rounded-l-lg"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-lg transition">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile Search Toggle */}
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="md:hidden p-2 hover:text-orange-500 transition"
              >
                <Search size={20} />
              </button>

              <button className="p-2 hover:text-orange-500 transition hidden sm:flex items-center gap-1">
                <Heart size={20} />
                <span className="text-xs hidden lg:inline">Wishlist</span>
              </button>
              
              <button className="p-2 hover:text-orange-500 transition hidden sm:flex items-center gap-1">
                <User size={20} />
                <span className="text-xs hidden lg:inline">Compte</span>
              </button>
              
              <Link to="/cart" className="flex items-center gap-1 md:gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 md:px-4 py-2 rounded-lg transition">
                <ShoppingCart size={18} />
                <span className="text-xs md:text-sm font-bold">3</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:text-orange-500 transition"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="mt-3 md:hidden">
              <div className="flex items-center bg-gray-100 rounded-lg">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 outline-none text-gray-700 rounded-l-lg text-sm"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg transition">
                  <Search size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block bg-green-700 text-white w-full">
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-6 lg:gap-8 overflow-x-auto text-sm font-medium">
              <Link to="/category/mode-femme" className="hover:text-orange-400 transition whitespace-nowrap">Mode Femme</Link>
              <Link to="/category/mode-homme" className="hover:text-orange-400 transition whitespace-nowrap">Mode Homme</Link>
              <Link to="/category/chaussures" className="hover:text-orange-400 transition whitespace-nowrap">Chaussures</Link>
              <Link to="/category/electronique" className="hover:text-orange-400 transition whitespace-nowrap">Électronique</Link>
              <Link to="/category/maison" className="hover:text-orange-400 transition whitespace-nowrap">Maison</Link>
              <Link to="/category/beaute" className="hover:text-orange-400 transition whitespace-nowrap">Beauté</Link>
              <Link to="/category/accessoires" className="hover:text-orange-400 transition whitespace-nowrap">Accessoires</Link>
              <Link to="/category/sport" className="hover:text-orange-400 transition whitespace-nowrap">Sport</Link>
              <Link to="/category/enfants" className="hover:text-orange-400 transition whitespace-nowrap">Enfants</Link>
              <Link to="/products" className="hover:text-orange-400 transition whitespace-nowrap ml-auto">Tous les catégories</Link>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-green-700 text-white w-full">
            <div className="container mx-auto px-4 py-3">
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                <Link to="/category/mode-femme" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Mode Femme</Link>
                <Link to="/category/mode-homme" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Mode Homme</Link>
                <Link to="/category/chaussures" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Chaussures</Link>
                <Link to="/category/electronique" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Électronique</Link>
                <Link to="/category/maison" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Maison</Link>
                <Link to="/category/beaute" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Beauté</Link>
                <Link to="/category/accessoires" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Accessoires</Link>
                <Link to="/category/sport" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Sport</Link>
                <Link to="/category/enfants" className="hover:text-orange-400 transition p-2" onClick={() => setIsMenuOpen(false)}>Enfants</Link>
                <Link to="/products" className="hover:text-orange-400 transition p-2 col-span-2 text-center border-t border-green-600 mt-2 pt-2" onClick={() => setIsMenuOpen(false)}>Tous les catégories</Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}