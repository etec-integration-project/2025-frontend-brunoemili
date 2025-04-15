import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { games, Game } from '../data/games';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Cerrar sugerencias al hacer clic fuera
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const filtered = games.filter(game =>
      game.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
    setIsOpen(true);
  };

  const handleBuyNow = (game: Game) => {
    addToCart(game);
    navigate('/checkout');
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleAddToCart = (game: Game, event: React.MouseEvent) => {
    event.stopPropagation();
    addToCart(game);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative flex-1 max-w-2xl" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar juegos..."
          className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* Panel de sugerencias */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {suggestions.map((game) => (
            <div
              key={game.id}
              className="p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0"
              onClick={() => handleBuyNow(game)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{game.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {game.salePrice ? (
                        <>
                          <span className="text-gray-400 line-through text-sm mr-2">
                            ${game.price}
                          </span>
                          <span className="text-purple-500 font-semibold">
                            ${game.salePrice}
                          </span>
                        </>
                      ) : (
                        <span className="text-white font-semibold">
                          ${game.price}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(game, e)}
                      className="p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 