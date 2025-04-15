import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-500/10 text-green-400 p-8 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">¡Pedido Confirmado!</h2>
          <p>Tu pedido ha sido procesado exitosamente.</p>
        </div>
        <div className="space-x-4">
          <Link
            to="/orders"
            className="inline-block bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            Ver Mis Pedidos
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 