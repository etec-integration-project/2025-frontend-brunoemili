import React from 'react';
import { Heart, ShoppingCart, Tag } from 'lucide-react';
import { games } from '../data/games';
import { useWishList } from '../context/WishListContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const GameGrid: React.FC = () => {
  const { wishList, toggleWishList } = useWishList();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (game: typeof games[0]) => {
    addToCart(game);
    navigate('/checkout');
  };

  const isInCart = (gameId: number) => {
    return cartItems.some(item => Number(item.id) === gameId);
  };

  const toggleCart = (game: typeof games[0]) => {
    const gameInCart = isInCart(game.id);
    if (gameInCart) {
      removeFromCart(game.id.toString());
    } else {
      addToCart({
        id: game.id.toString(),
        title: game.title,
        price: game.price,
        salePrice: game.salePrice,
        image: game.image
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Todos los Juegos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              {game.salePrice && (
                <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {Math.round((1 - game.salePrice / game.price) * 100)}% OFF
                </div>
              )}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => toggleCart(game)}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ShoppingCart 
                    className="h-5 w-5" 
                    fill={isInCart(game.id) ? "white" : "none"} 
                  />
                </button>
                <button
                  onClick={() => toggleWishList(game)}
                  className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <Heart 
                    className="h-5 w-5" 
                    fill={wishList.some((item) => item.id === game.id) ? "white" : "none"}
                  />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{game.title}</h3>
                <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">
                  {game.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {game.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {game.salePrice ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">
                        ${game.price}
                      </span>
                      <span className="text-2xl font-bold text-purple-500">
                        ${game.salePrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">${game.price}</span>
                  )}
                </div>
                <button
                  onClick={() => handleBuyNow(game)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Comprar Ahora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;