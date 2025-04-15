import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const featuredGames = [
  {
    id: 1,
    title: "God of War Ragnarök",
    description: "Embárcate en un viaje épico lleno de emociones fuertes mientras Kratos y Atreus luchan por aferrarse y soltarse en esta aventura mítica.",
    price: 69.99,
    image: "https://phantom-marca.unidadeditorial.es/bb7b198a80f3cf58aa3686542587b8ec/resize/660/f/webp/assets/multimedia/imagenes/2024/09/20/17268240316467.jpg"
  },
  {
    id: 2,
    title: "Call of Duty: Black Ops 6",
    description: "La última entrega de la icónica serie Black Ops lleva la guerra moderna a un nuevo nivel con gráficos impresionantes y una jugabilidad revolucionaria.",
    price: 69.99,
    image: "https://i.blogs.es/027089/black-ops-6/1200_800.webp"
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    description: "Sumérgete en Night City, una megalópolis obsesionada con el poder y la modificación corporal en esta aventura de mundo abierto.",
    price: 59.99,
    image: "https://cdn.forbes.com.mx/2023/08/Cyberpunk-2077-640x360.webp"
  }
];

const FeaturedGames: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentGame = featuredGames[currentIndex];

  return (
    <div className="mb-12">
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        <img
          src={currentGame.image}
          alt={currentGame.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
            Nuevo Lanzamiento
          </span>
          <h2 className="text-4xl font-bold text-white mb-2">{currentGame.title}</h2>
          <p className="text-gray-200 mb-4 max-w-2xl">
            {currentGame.description}
          </p>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Comprar Ahora ${currentGame.price}
          </button>
        </div>
        {/* Puntos centrados */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="flex items-center space-x-3">
            {featuredGames.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGames;