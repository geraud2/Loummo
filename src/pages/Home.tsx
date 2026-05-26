import { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryGrid from '../components/CategoryGrid';
import { products } from '../data/products';
import { 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Zap, 
  Star, 
  Truck, 
  Package, 
  Sparkles, 
  Percent,
  TrendingUp,
  Shield,
  Shirt,
  Sofa,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  User,
  Quote,
  Clock,
  Headphones,
  BadgeCheck,
  Globe,
  Gift,
  ThumbsUp,
  Leaf
} from 'lucide-react';

export default function Home() {
  const trendingProducts = products.slice(0, 10);
  const flashOfferProducts = products.slice(6, 11);
  const newArrivals = products.slice(10, 15);
  const bestSellers = products.slice(0, 8);
  
  // Nombre de slides adapté : 2 produits par slide sur mobile, 5 sur desktop
  const productsPerSlide = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 5;
  const bestSellersPerSlide = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4;
  const [slidesCount, setSlidesCount] = useState(Math.ceil(trendingProducts.length / 2));
  const [bestSlidesCount, setBestSlidesCount] = useState(Math.ceil(bestSellers.length / 2));
  const [newSlidesCount, setNewSlidesCount] = useState(Math.ceil(newArrivals.length / 2));
  const [flashSlidesCount, setFlashSlidesCount] = useState(Math.ceil(flashOfferProducts.length / 1));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFlashSlide, setCurrentFlashSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [currentNewArrivalSlide, setCurrentNewArrivalSlide] = useState(0);
  const [currentBestSellerSlide, setCurrentBestSellerSlide] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 12, minutes: 45, seconds: 30 });

  // Mettre à jour le nombre de slides au redimensionnement
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setSlidesCount(Math.ceil(trendingProducts.length / (isMobile ? 2 : 5)));
      setBestSlidesCount(Math.ceil(bestSellers.length / (isMobile ? 2 : 4)));
      setNewSlidesCount(Math.ceil(newArrivals.length / (isMobile ? 2 : 5)));
      setFlashSlidesCount(Math.ceil(flashOfferProducts.length / (isMobile ? 1 : 3)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    { id: 1, name: "Aminata Diallo", location: "Bamako, Mali", comment: "J'ai commandé une robe sur LOUMMO et je suis très satisfaite ! La livraison a été rapide et le produit correspond exactement à la description.", rating: 5, avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg", purchaseCount: 12 },
    { id: 2, name: "Moussa Koné", location: "Kayes, Mali", comment: "Excellent service client ! J'ai eu un petit problème avec ma commande et l'équipe a réagi très rapidement.", rating: 5, avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", purchaseCount: 8 },
    { id: 3, name: "Fatoumata Camara", location: "Ségou, Mali", comment: "La qualité des produits est impressionnante. J'achète régulièrement sur LOUMMO et je n'ai jamais été déçue.", rating: 4, avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg", purchaseCount: 15 },
    { id: 4, name: "Ibrahim Traoré", location: "Mopti, Mali", comment: "Très bonne expérience d'achat. Les produits viennent de marques connues et la livraison est sécurisée.", rating: 5, avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg", purchaseCount: 20 }
  ];

  const stats = [
    { icon: ShoppingBag, value: "10,000+", label: "Produits disponibles" },
    { icon: User, value: "5,000+", label: "Clients satisfaits" },
    { icon: Truck, value: "2,500+", label: "Livraisons réussies" },
    { icon: Globe, value: "15+", label: "Pays de livraison" }
  ];

  const advantages = [
    { icon: Truck, title: "Livraison rapide", description: "Livraison en 5-10 jours ouvrés partout au Mali avec suivi inclus", color: "bg-blue-50 text-blue-600" },
    { icon: Shield, title: "Paiement sécurisé", description: "Vos transactions sont 100% sécurisées avec un cryptage SSL", color: "bg-green-50 text-green-600" },
    { icon: Headphones, title: "Support 24/7", description: "Notre équipe est disponible 24h/24 et 7j/7 pour vous assister", color: "bg-purple-50 text-purple-600" },
    { icon: BadgeCheck, title: "Qualité garantie", description: "Tous nos produits sont vérifiés et authentiques à 100%", color: "bg-orange-50 text-orange-600" }
  ];

  useEffect(() => { const i = setInterval(() => setCurrentSlide(p => (p + 1) % slidesCount), 4000); return () => clearInterval(i); }, [slidesCount]);
  useEffect(() => { const i = setInterval(() => setCurrentFlashSlide(p => (p + 1) % flashSlidesCount), 3000); return () => clearInterval(i); }, [flashSlidesCount]);
  useEffect(() => { const i = setInterval(() => setCurrentTestimonialSlide(p => (p + 1) % 2), 4000); return () => clearInterval(i); }, []);
  useEffect(() => { const i = setInterval(() => setCurrentNewArrivalSlide(p => (p + 1) % newSlidesCount), 4000); return () => clearInterval(i); }, [newSlidesCount]);
  useEffect(() => { const i = setInterval(() => setCurrentBestSellerSlide(p => (p + 1) % bestSlidesCount), 4000); return () => clearInterval(i); }, [bestSlidesCount]);

  const nextSlide = () => setCurrentSlide(p => (p + 1) % slidesCount);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + slidesCount) % slidesCount);

  // Rendu des slides pour produits tendances (2 sur mobile, 5 sur desktop)
  const renderTrendingSlides = () => {
    const perSlide = window.innerWidth < 768 ? 2 : 5;
    const totalSlides = Math.ceil(trendingProducts.length / perSlide);
    return Array.from({ length: totalSlides }, (_, slideIndex) => (
      <div key={slideIndex} className="w-full flex-shrink-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
          {trendingProducts.slice(slideIndex * perSlide, (slideIndex + 1) * perSlide).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    ));
  };

  // Rendu des slides pour meilleures ventes (2 sur mobile, 4 sur desktop)
  const renderBestSellerSlides = () => {
    const perSlide = window.innerWidth < 768 ? 2 : 4;
    const totalSlides = Math.ceil(bestSellers.length / perSlide);
    return Array.from({ length: totalSlides }, (_, slideIndex) => (
      <div key={slideIndex} className="w-full flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {bestSellers.slice(slideIndex * perSlide, (slideIndex + 1) * perSlide).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    ));
  };

  // Rendu des slides pour nouveautés (2 sur mobile, 5 sur desktop)
  const renderNewArrivalSlides = () => {
    const perSlide = window.innerWidth < 768 ? 2 : 5;
    const totalSlides = Math.ceil(newArrivals.length / perSlide);
    return Array.from({ length: totalSlides }, (_, slideIndex) => (
      <div key={slideIndex} className="w-full flex-shrink-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
          {newArrivals.slice(slideIndex * perSlide, (slideIndex + 1) * perSlide).map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <span className="absolute top-2 right-2 bg-purple-500 text-white px-1.5 md:px-2 py-0.5 rounded text-xs font-bold">NEW</span>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-orange-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-4">
                Achetez facilement<br />
                sur <span className="text-orange-500">LOUMMO</span>
              </h1>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                <span className="bg-orange-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold inline-flex items-center gap-1 md:gap-2">
                  <Package size={14} className="md:w-4 md:h-4" />
                  Des milliers de produits disponibles
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-3 mb-4 md:mb-8">
                <span className="bg-orange-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded text-xs font-bold inline-flex items-center gap-1"><ShoppingBag size={10} className="md:w-3 md:h-3" />SHEIN</span>
                <span className="bg-orange-400 text-white px-2 md:px-3 py-0.5 md:py-1 rounded text-xs font-bold inline-flex items-center gap-1"><Package size={10} className="md:w-3 md:h-3" />TEMU</span>
                <span className="bg-blue-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded text-xs font-bold inline-flex items-center gap-1"><ShoppingBag size={10} className="md:w-3 md:h-3" />Amazon</span>
                <span className="bg-orange-600 text-white px-2 md:px-3 py-0.5 md:py-1 rounded text-xs font-bold inline-flex items-center gap-1"><Truck size={10} className="md:w-3 md:h-3" />El Amèxpress</span>
              </div>
              <p className="text-gray-700 mb-6 md:mb-8 text-sm md:text-lg inline-flex items-center gap-2">
                <Sparkles size={16} className="md:w-[18px] md:h-[18px] text-orange-500" />
                Mode, électronique, maison et accessoires livrés vers le Mali
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to="/products" className="bg-green-700 hover:bg-green-800 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold transition inline-flex items-center justify-center gap-2 text-sm md:text-base">
                  <ShoppingBag size={18} className="md:w-5 md:h-5" />
                  Explorer la boutique
                </Link>
                <Link to="/" className="bg-transparent border-2 border-green-700 text-green-700 hover:bg-green-50 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold transition inline-flex items-center justify-center gap-2 text-sm md:text-base">
                  <Tag size={18} className="md:w-5 md:h-5" />
                  Voir les promotions
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-48 sm:h-64 md:h-80 lg:h-96">
              <img src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg" alt="Hero" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-orange-400 text-white p-2 md:p-4 rounded-full shadow-lg">
                <div className="flex items-center gap-1 md:gap-2"><Percent size={16} className="md:w-6 md:h-6" /><span className="text-sm md:text-2xl font-bold">-30%</span></div>
              </div>
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-green-700 text-white p-2 md:p-4 rounded-full shadow-lg">
                <div className="flex items-center gap-1 md:gap-2"><Zap size={16} className="md:w-6 md:h-6" /><span className="text-sm md:text-2xl font-bold">-50%</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center p-3 md:p-6 rounded-lg hover:shadow-lg transition">
              <div className={`w-10 h-10 md:w-16 md:h-16 ${advantage.color} rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4`}>
                <advantage.icon size={18} className="md:w-7 md:h-7" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-xs md:text-base">{advantage.title}</h3>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <CategoryGrid />

      {/* Trending Products Carousel - 2 par slide mobile, 5 desktop */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 inline-flex items-center gap-2 md:gap-3">
            <TrendingUp size={22} className="md:w-7 md:h-7 text-orange-500" />
            Produits tendances
          </h2>
          <Link to="/products" className="inline-flex items-center gap-1 md:gap-2 text-green-700 hover:text-green-800 font-bold text-sm md:text-base">
            Toutes les catégories <ArrowRight size={16} className="md:w-5 md:h-5" />
          </Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {renderTrendingSlides()}
            </div>
          </div>
          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10">
            <ChevronLeft size={16} className="md:w-6 md:h-6 text-gray-700" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10">
            <ChevronRight size={16} className="md:w-6 md:h-6 text-gray-700" />
          </button>
          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {Array.from({ length: slidesCount }, (_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${currentSlide === index ? 'bg-green-700 w-4 md:w-6' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Offers */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 inline-flex items-center gap-2 md:gap-3">
              <Zap size={22} className="md:w-7 md:h-7 text-orange-500" />
              Offres Flash
            </h2>
            <div className="flex items-center gap-3 md:gap-4 bg-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-md">
              <Clock size={18} className="md:w-6 md:h-6 text-red-500" />
              <div className="flex gap-1 md:gap-2">
                <div className="text-center"><span className="bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded text-sm md:text-lg font-bold">{String(countdown.hours).padStart(2, '0')}</span><p className="text-xs text-gray-500 mt-0.5">Heures</p></div>
                <span className="text-lg md:text-2xl font-bold text-gray-400">:</span>
                <div className="text-center"><span className="bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded text-sm md:text-lg font-bold">{String(countdown.minutes).padStart(2, '0')}</span><p className="text-xs text-gray-500 mt-0.5">Minutes</p></div>
                <span className="text-lg md:text-2xl font-bold text-gray-400">:</span>
                <div className="text-center"><span className="bg-red-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded text-sm md:text-lg font-bold">{String(countdown.seconds).padStart(2, '0')}</span><p className="text-xs text-gray-500 mt-0.5">Secondes</p></div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentFlashSlide * 100}%)` }}>
                {[0, 1].map((slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {slideIndex === 0 ? (
                        <>
                          {flashOfferProducts.slice(0, 2).map((product) => (
                            <div key={product.id} className="relative bg-white rounded-lg overflow-hidden shadow-lg">
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</div>
                              <img src={product.image} alt={product.name} className="w-full h-40 md:h-48 object-cover" />
                              <div className="p-3 md:p-4">
                                <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">{product.name.substring(0, 30)}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-base md:text-lg font-bold text-red-500">{product.price.toLocaleString()} FCFA</span>
                                  <span className="text-xs md:text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString()} FCFA</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2"><div className="bg-red-500 h-1.5 md:h-2 rounded-full" style={{ width: '75%' }}></div></div>
                                <p className="text-xs text-gray-500 mt-1">Déjà 75% vendu</p>
                              </div>
                            </div>
                          ))}
                          <Link to="/category/mode-femme" className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition group">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-pink-200 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform"><Shirt size={28} className="md:w-10 md:h-10 text-pink-500" /></div>
                            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Mode Femme</h3>
                            <span className="bg-green-700 text-white px-4 md:px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition inline-flex items-center gap-1 md:gap-2 text-sm md:text-base">Voir la collection <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" /></span>
                          </Link>
                        </>
                      ) : (
                        <>
                          {flashOfferProducts.slice(2, 4).map((product) => (
                            <div key={product.id} className="relative bg-white rounded-lg overflow-hidden shadow-lg">
                              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</div>
                              <img src={product.image} alt={product.name} className="w-full h-40 md:h-48 object-cover" />
                              <div className="p-3 md:p-4">
                                <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">{product.name.substring(0, 30)}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-base md:text-lg font-bold text-red-500">{product.price.toLocaleString()} FCFA</span>
                                  <span className="text-xs md:text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString()} FCFA</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2"><div className="bg-red-500 h-1.5 md:h-2 rounded-full" style={{ width: '60%' }}></div></div>
                                <p className="text-xs text-gray-500 mt-1">Déjà 60% vendu</p>
                              </div>
                            </div>
                          ))}
                          <Link to="/category/electronique" className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition group">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-purple-200 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform"><Smartphone size={28} className="md:w-10 md:h-10 text-purple-500" /></div>
                            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Électronique</h3>
                            <span className="bg-green-700 text-white px-4 md:px-6 py-2 rounded-lg font-bold hover:bg-green-800 transition inline-flex items-center gap-1 md:gap-2 text-sm md:text-base">Voir la collection <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" /></span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setCurrentFlashSlide(p => (p - 1 + 2) % 2)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"><ChevronLeft size={16} className="md:w-6 md:h-6 text-gray-700" /></button>
            <button onClick={() => setCurrentFlashSlide(p => (p + 1) % 2)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"><ChevronRight size={16} className="md:w-6 md:h-6 text-gray-700" /></button>
            <div className="flex justify-center gap-2 mt-4 md:mt-6">{[0, 1].map((index) => (<button key={index} onClick={() => setCurrentFlashSlide(index)} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${currentFlashSlide === index ? 'bg-green-700 w-4 md:w-6' : 'bg-gray-300'}`} />))}</div>
          </div>
        </div>
      </section>

      {/* Meilleures ventes - 2 par slide mobile, 4 desktop */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 inline-flex items-center gap-2 md:gap-3"><ThumbsUp size={22} className="md:w-7 md:h-7 text-green-700" />Meilleures ventes</h2>
          <Link to="/products" className="inline-flex items-center gap-1 md:gap-2 text-green-700 hover:text-green-800 font-bold text-sm md:text-base">Voir tout <ArrowRight size={16} className="md:w-5 md:h-5" /></Link>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentBestSellerSlide * 100}%)` }}>
              {renderBestSellerSlides()}
            </div>
          </div>
          <button onClick={() => setCurrentBestSellerSlide(p => (p - 1 + bestSlidesCount) % bestSlidesCount)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"><ChevronLeft size={16} className="md:w-6 md:h-6 text-gray-700" /></button>
          <button onClick={() => setCurrentBestSellerSlide(p => (p + 1) % bestSlidesCount)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"><ChevronRight size={16} className="md:w-6 md:h-6 text-gray-700" /></button>
          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {Array.from({ length: bestSlidesCount }, (_, index) => (<button key={index} onClick={() => setCurrentBestSellerSlide(index)} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${currentBestSellerSlide === index ? 'bg-green-700 w-4 md:w-6' : 'bg-gray-300'}`} />))}
          </div>
        </div>
      </section>

      {/* Nouveautés - 2 par slide mobile, 5 desktop */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 inline-flex items-center gap-2 md:gap-3"><Sparkles size={22} className="md:w-7 md:h-7 text-purple-500" />Nouveautés</h2>
            <Link to="/products" className="inline-flex items-center gap-1 md:gap-2 text-green-700 hover:text-green-800 font-bold text-sm md:text-base">Voir tout <ArrowRight size={16} className="md:w-5 md:h-5" /></Link>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentNewArrivalSlide * 100}%)` }}>
                {renderNewArrivalSlides()}
              </div>
            </div>
            <button onClick={() => setCurrentNewArrivalSlide(p => (p - 1 + newSlidesCount) % newSlidesCount)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"><ChevronLeft size={16} className="md:w-6 md:h-6 text-gray-700" /></button>
            <button onClick={() => setCurrentNewArrivalSlide(p => (p + 1) % newSlidesCount)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-gray-100 transition z-10"><ChevronRight size={16} className="md:w-6 md:h-6 text-gray-700" /></button>
            <div className="flex justify-center gap-2 mt-4 md:mt-6">
              {Array.from({ length: newSlidesCount }, (_, index) => (<button key={index} onClick={() => setCurrentNewArrivalSlide(index)} className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition ${currentNewArrivalSlide === index ? 'bg-green-700 w-4 md:w-6' : 'bg-gray-300'}`} />))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques, Témoignages, Newsletter, Suppliers (inchangés) */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4"><stat.icon size={22} className="md:w-7 md:h-7 text-green-700" /></div>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs md:text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-50 to-orange-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center"><MessageCircle size={24} className="md:w-8 md:h-8 text-green-700 inline mr-2" />Ce que disent nos clients</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}>
                {[0, 1].map((slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      {testimonials.slice(slideIndex * 2, (slideIndex + 1) * 2).map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
                          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover" />
                            <div>
                              <h3 className="font-bold text-gray-900 text-sm md:text-base">{testimonial.name}</h3>
                              <p className="text-xs md:text-sm text-gray-500">{testimonial.location}</p>
                            </div>
                          </div>
                          <div className="flex mb-2 md:mb-3">{[...Array(5)].map((_, i) => (<Star key={i} size={12} className={`md:w-4 md:h-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />))}</div>
                          <p className="text-gray-700 italic text-xs md:text-base">"{testimonial.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setCurrentTestimonialSlide(p => (p - 1 + 2) % 2)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg"><ChevronLeft size={16} className="md:w-6 md:h-6" /></button>
            <button onClick={() => setCurrentTestimonialSlide(p => (p + 1) % 2)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white p-1.5 md:p-2 rounded-full shadow-lg"><ChevronRight size={16} className="md:w-6 md:h-6" /></button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl md:rounded-2xl p-6 md:p-12 text-center text-white">
          <Gift size={32} className="mx-auto mb-3 md:mb-4 md:w-12 md:h-12" />
          <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">Recevez nos offres exclusives</h2>
          <p className="text-green-100 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">Inscrivez-vous à notre newsletter !</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input type="email" placeholder="Votre adresse email" className="flex-1 px-4 py-2.5 md:py-3 rounded-lg text-gray-900 text-sm md:text-base" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 md:py-3 rounded-lg font-bold transition text-sm md:text-base">S'inscrire</button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8"><Shield size={22} className="md:w-7 md:h-7 text-green-700 inline mr-2" />Brands & Suppliers de confiance</h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <div className="text-xl md:text-3xl font-bold text-orange-500"><ShoppingBag size={24} className="md:w-8 md:h-8 inline mr-1" />SHEIN</div>
            <div className="text-orange-400 bg-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-base md:text-lg font-bold border-2 border-orange-400"><Package size={20} className="md:w-6 md:h-6 inline mr-1" />TEMU</div>
            <div className="text-xl md:text-3xl font-bold text-blue-600"><Truck size={24} className="md:w-8 md:h-8 inline mr-1" />amazon</div>
            <div className="text-xl md:text-3xl font-bold text-orange-600"><ShoppingBag size={24} className="md:w-8 md:h-8 inline mr-1" />AliExpress</div>
          </div>
        </div>
      </section>
    </Layout>
  );
}