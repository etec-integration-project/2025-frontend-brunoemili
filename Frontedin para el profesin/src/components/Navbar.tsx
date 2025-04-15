import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Home, Flame, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { Login } from './Login';
import { Register } from './Register';
import { Profile } from './Profile';
import { SearchBar } from './SearchBar';
interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/logo.png"
                  alt="Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="ml-2 text-xl font-bold text-white">Steam Clone</span>
              </Link>
            </div>
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
          </div>

          <div className="mx-4 hidden md:block flex-1">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hidden md:flex items-center text-gray-300 hover:text-white">
              <Heart className="h-4 w-4 mr-1" />
              Lista de Deseados
            </Link>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-300 hover:text-white"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2">
          <div className="mb-4">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-gray-300 hover:text-white py-2">Inicio</Link>
            <Link to="/wishlist" className="text-gray-300 hover:text-white py-2">Lista de Deseados</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;