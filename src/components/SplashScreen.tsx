import { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Truck, Shield, Package, Tag } from 'lucide-react';

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
    <div className={`fixed inset-0 z-50 flex transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Partie gauche - Image femme noire au marché */}
      <div className="hidden md:flex w-1/2 h-full relative overflow-hidden">
        <img 
       src="./woman-shopping-vegetables-supermarket.jpg"
          alt="Femme noire au marché LOUMMO" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-green-700/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <ShoppingBag size={64} className="mx-auto mb-4 opacity-80" />
            <p className="text-3xl font-bold">Shopping</p>
            <p className="text-xl opacity-80">au Mali</p>
          </div>
        </div>
      </div>

      {/* Partie droite - LOUMMO */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-green-700">
        <div className="text-center px-4 max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <div className="relative inline-block">
              <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <ShoppingBag size={56} className="text-orange-500 md:w-[72px] md:h-[72px]" />
              </div>
              <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg animate-pulse">
                <Sparkles size={18} className="text-orange-500" />
              </div>
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
            <span>L</span>
            <span className="text-orange-200">OUMM</span>
            <span>O</span>
          </h1>
          
          {/* Sous-titre */}
          <p className="text-white text-base md:text-lg mb-6 opacity-90">
            Achetez facilement, livré rapidement
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Tag size={12} /> Mode
            </span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Tag size={12} /> Électronique
            </span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Tag size={12} /> Maison
            </span>
          </div>

          {/* Barre de chargement */}
          <div className="w-full max-w-xs mx-auto mb-6">
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-white/75 text-sm mt-2">{progress}%</p>
          </div>

          {/* Icônes de confiance */}
          <div className="flex justify-center gap-4 md:gap-8 text-white">
            <div className="flex flex-col items-center gap-1 opacity-80">
              <Truck size={20} className="md:w-6 md:h-6" />
              <span className="text-xs">Livraison</span>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-80">
              <Shield size={20} className="md:w-6 md:h-6" />
              <span className="text-xs">Sécurisé</span>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-80">
              <Sparkles size={20} className="md:w-6 md:h-6" />
              <span className="text-xs">Qualité</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}