import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { api } from './services/api';

interface BackendMessage {
  message: string;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get<BackendMessage>('/');
        setMessage(response.message);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        setMessage('Error al conectar con el backend');
      }
    };

    testConnection();
  }, []);

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