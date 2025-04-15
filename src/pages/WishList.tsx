import React from 'react';
import { Heart, ShoppingCart, Tag } from 'lucide-react';
import { useWishList } from '../context/WishListContext';
import { useCart } from '../context/CartContext';

const WishList: React.FC = () => {
  const { wishList, removeFromWishList } = useWishList();
  const { addToCart } = useCart();

  if (wishList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Lista de Deseados</h1>
        <div className="text-center text-gray-400">
          <Heart className="h-16 w-16 mx-auto mb-4" fill="none" />
          <p>Tu lista de deseados está vacía</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Lista de Deseados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishList.map((game) => (
          <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden">
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
              <button
                onClick={() => removeFromWishList(game.id)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <Heart className="h-5 w-5" fill="white" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{game.title}</h3>
                <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-sm">
                  {game.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{game.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {game.salePrice ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">${game.price}</span>
                      <span className="text-2xl font-bold text-purple-500">${game.salePrice}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">${game.price}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(game)}
                  className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Añadir al Carrito</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;