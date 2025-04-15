import React, { useEffect, useState } from 'react';
import { userService } from '../services/user';
import { Game } from '../types/game';

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await userService.getWishlist();
      setWishlist(data);
    } catch (err) {
      setError('Error al cargar wishlist');
    }
  };

  const removeFromWishlist = async (gameId: string) => {
    try {
      await userService.toggleWishlist(gameId);
      loadWishlist();
    } catch (err) {
      setError('Error al remover juego');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Mi Lista de Deseos</h2>
      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((game) => (
          <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden">
            <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-400 mb-4">${game.price}</p>
              <button
                onClick={() => removeFromWishlist(game.id.toString())}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 