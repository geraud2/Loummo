import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye, Zap } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isNew = product.discount >= 40;
  const isFlashSale = product.discount >= 50;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-2 md:mb-4">
        {/* Discount Badge */}
        <div className={`absolute top-1.5 left-1.5 md:top-3 md:left-3 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold z-10 ${
          isFlashSale ? 'bg-red-500 animate-pulse' : 'bg-orange-500'
        }`}>
          {isFlashSale ? (
            <span className="flex items-center gap-0.5 md:gap-1">
              <Zap size={10} className="md:w-3 md:h-3" />
              -{discountPercentage}%
            </span>
          ) : (
            `-${discountPercentage}%`
          )}
        </div>

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-1.5 right-1.5 md:top-3 md:right-3 bg-green-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold z-10">
            NEW
          </div>
        )}

        {/* Quick Actions - Desktop only (hidden on mobile) */}
        <div className={`hidden md:flex absolute right-3 top-12 flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full shadow-lg transition ${
              isFavorite 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-400 hover:text-orange-500 hover:bg-orange-50'
            }`}
          >
            <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="p-2 rounded-full bg-white shadow-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Mobile Quick Actions */}
        <div className="md:hidden absolute right-1.5 top-8 flex flex-col gap-1">
          <button
            onClick={handleToggleFavorite}
            className={`p-1.5 rounded-full shadow-md transition ${
              isFavorite 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-400'
            }`}
          >
            <Heart size={12} className={isFavorite ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 sm:h-44 md:h-52 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Hover Overlay - Desktop only */}
        {isHovered && (
          <div className="hidden md:flex absolute inset-0 bg-black bg-opacity-20 items-center justify-center transition-opacity duration-300">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
              <Eye size={16} />
              Voir le produit
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-0.5 md:px-1">
        {/* Supplier */}
        <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 md:mb-1">{product.supplier}</p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-1 md:mb-2 line-clamp-2 group-hover:text-orange-500 transition text-xs sm:text-sm md:text-base">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
          <span className="text-sm sm:text-base md:text-lg font-bold text-orange-500">
            {product.price.toLocaleString()} FCFA
          </span>
          <span className="text-[10px] md:text-xs text-gray-400 line-through">
            {product.originalPrice.toLocaleString()} FCFA
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={`md:w-3.5 md:h-3.5 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-orange-400 text-orange-400' 
                    : i < product.rating 
                      ? 'fill-orange-400 text-orange-400 opacity-50' 
                      : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] md:text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full font-bold py-2 md:py-2.5 px-2 md:px-4 rounded-lg transition flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm ${
            isAddedToCart
              ? 'bg-green-500 text-white'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <ShoppingCart size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">
            {isAddedToCart ? 'Ajouté ✓' : 'Ajouter au panier'}
          </span>
          <span className="sm:hidden">
            {isAddedToCart ? '✓' : 'Ajouter'}
          </span>
        </button>
      </div>
    </Link>
  );
}