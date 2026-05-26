import { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Truck, Shield } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-500 to-green-700 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
              <ShoppingBag size={64} className="text-orange-500 md:w-20 md:h-20" />
            </div>
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg animate-pulse">
              <Sparkles size={20} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          <span className="text-white">L</span>
          <span className="text-orange-200">OUMM</span>
          <span className="text-white">O</span>
        </h1>
        
        {/* Sous-titre */}
        <p className="text-white text-lg md:text-xl mb-8 opacity-90">
          Achetez facilement, livré rapidement
        </p>

        {/* Barre de chargement */}
        <div className="w-64 md:w-80 mx-auto mb-8">
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white text-sm mt-2 opacity-75">{progress}%</p>
        </div>

        {/* Icônes de confiance */}
        <div className="flex justify-center gap-6 md:gap-10 text-white">
          <div className="flex flex-col items-center gap-1 opacity-80">
            <Truck size={24} className="md:w-7 md:h-7" />
            <span className="text-xs">Livraison rapide</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-80">
            <Shield size={24} className="md:w-7 md:h-7" />
            <span className="text-xs">Paiement sécurisé</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-80">
            <Sparkles size={24} className="md:w-7 md:h-7" />
            <span className="text-xs">Qualité garantie</span>
          </div>
        </div>
      </div>
    </div>
  );
}