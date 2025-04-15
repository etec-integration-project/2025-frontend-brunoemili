import React, { createContext, useContext, useState } from 'react';
import { Game } from '../data/games';

interface WishListContextType {
  wishList: Game[];
  toggleWishList: (game: Game) => void;
  removeFromWishList: (gameId: number) => void;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const WishListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishList, setWishList] = useState<Game[]>([]);

  const toggleWishList = (game: Game) => {
    setWishList(prev => {
      const exists = prev.some(item => item.id === game.id);
      if (exists) {
        return prev.filter(item => item.id !== game.id);
      }
      return [...prev, game];
    });
  };

  const removeFromWishList = (gameId: number) => {
    setWishList(prev => prev.filter(item => item.id !== gameId));
  };

  return (
    <WishListContext.Provider value={{ wishList, toggleWishList, removeFromWishList }}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (context === undefined) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
};