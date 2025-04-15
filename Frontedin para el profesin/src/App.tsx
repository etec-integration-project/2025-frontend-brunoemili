import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeaturedGames from './components/FeaturedGames';
import GameGrid from './components/GameGrid';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import WishList from './pages/WishList';
import { AuthPage } from './pages/AuthPage';
import { CartProvider } from './context/CartContext';
import { WishListProvider } from './context/WishListContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <WishListProvider>
          <Router>
            <div className="min-h-screen bg-gray-900 text-white">
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              
              <Routes>
                <Route path="/" element={
                  <main className="container mx-auto px-4 py-8">
                    <FeaturedGames />
                    <GameGrid />
                  </main>
                } />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<WishList />} />
              </Routes>

              <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
          </Router>
        </WishListProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;