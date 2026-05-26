import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { products } from '../data/products';
import { 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  Lock, 
  ArrowLeft, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Shield, 
  RotateCcw, 
  MessageCircle,
  Award,
  Check,
  AlertCircle,
  ChevronRight,
  Facebook,
  Twitter,
  Link2
} from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showShareMenu, setShowShareMenu] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg mb-4">Produit non trouvé</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-bold"
          >
            Retour à l'accueil
          </button>
        </div>
      </Layout>
    );
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const features = [
    'Livraison gratuite à partir de 50,000 FCFA',
    'Retour gratuit sous 14 jours',
    'Garantie satisfait ou remboursé',
    'Service client disponible 24/7'
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-orange-500 transition">Accueil</button>
          <ChevronRight size={14} />
          <button 
            onClick={() => navigate(`/category/${product.category.toLowerCase().replace(' ', '-')}`)} 
            className="hover:text-orange-500 transition"
          >
            {product.category}
          </button>
          <ChevronRight size={14} />
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden relative mb-4">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                -{discountPercentage}%
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"
              >
                <Heart 
                  size={20} 
                  className={isFavorite ? 'fill-orange-500 text-orange-500' : 'text-gray-400 hover:text-orange-500'} 
                />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-orange-500' : 'border-transparent hover:border-orange-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Title & Brand */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">{product.supplier}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500">
                Catégorie: <span className="text-orange-500 font-semibold">{product.category}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">{product.rating}/5</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">({product.reviews.toLocaleString()} avis vérifiés)</span>
              <span className="text-gray-400">|</span>
              <span className="text-orange-500 font-semibold">98% recommandent</span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 mb-6 border border-orange-200">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl font-bold text-orange-500">{product.price.toLocaleString()} FCFA</span>
                <span className="text-xl text-gray-400 line-through">{product.originalPrice.toLocaleString()} FCFA</span>
              </div>
              <div className="flex items-center gap-2 text-orange-600 font-bold">
                <Check size={16} />
                Économisez {(product.originalPrice - product.price).toLocaleString()} FCFA (-{discountPercentage}%)
              </div>
              <p className="text-sm text-gray-500 mt-2">Prix TTC - Livraison calculée à la caisse</p>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <Check size={16} />
                <span className="font-semibold">En stock</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                <span className="text-orange-500 font-bold">65%</span> déjà vendu - Dépêchez-vous !
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-bold mb-3">Quantité:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-orange-100 hover:bg-orange-200 w-12 h-12 rounded-lg transition flex items-center justify-center"
                  >
                    <Minus size={20} className="text-orange-600" />
                  </button>
                  <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-orange-100 hover:bg-orange-200 w-12 h-12 rounded-lg transition flex items-center justify-center"
                  >
                    <Plus size={20} className="text-orange-600" />
                  </button>
                  <span className="text-sm text-gray-500">
                    Total: <span className="font-bold text-orange-500">{(product.price * quantity).toLocaleString()} FCFA</span>
                  </span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <ShoppingCart size={24} />
                Ajouter au panier ({quantity})
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 border-2 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                    isFavorite
                      ? 'border-orange-500 text-orange-500 bg-orange-50'
                      : 'border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
                  }`}
                >
                  <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                  {isFavorite ? 'En favoris' : 'Favoris'}
                </button>
                <div className="relative flex-1">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Share2 size={20} />
                    Partager
                  </button>
                  {showShareMenu && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded transition text-sm">
                        <Facebook size={16} className="text-blue-600" />
                        Facebook
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded transition text-sm">
                        <Twitter size={16} className="text-blue-400" />
                        Twitter
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded transition text-sm">
                        <Link2 size={16} className="text-gray-600" />
                        Copier le lien
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg border border-orange-100">
                <Truck size={18} className="text-orange-500" />
                <span className="text-sm font-medium">Livraison 2-5 jours</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg border border-orange-100">
                <RotateCcw size={18} className="text-orange-500" />
                <span className="text-sm font-medium">Retour gratuit</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg border border-orange-100">
                <Shield size={18} className="text-orange-500" />
                <span className="text-sm font-medium">Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 p-3 rounded-lg border border-orange-100">
                <Award size={18} className="text-orange-500" />
                <span className="text-sm font-medium">Qualité garantie</span>
              </div>
            </div>

            {/* Features List */}
            <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Check size={18} className="text-orange-500" />
                Avantages LOUMMO
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-orange-500 flex-shrink-0 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs: Description, Avis, Livraison */}
        <div className="mb-12">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 font-bold transition border-b-2 ${
                  activeTab === 'description' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 font-bold transition border-b-2 ${
                  activeTab === 'reviews' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Avis ({product.reviews.toLocaleString()})
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-4 font-bold transition border-b-2 ${
                  activeTab === 'shipping' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Livraison & Retours
              </button>
            </div>
          </div>

          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description du produit</h3>
              <p className="text-gray-700 mb-4">
                Découvrez notre {product.name.toLowerCase()} de qualité supérieure, proposé par <span className="text-orange-500 font-semibold">{product.supplier}</span>. 
                Ce produit allie design élégant et fonctionnalité pour répondre à tous vos besoins.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Matériaux de haute qualité</li>
                <li>Design moderne et élégant</li>
                <li>Garantie fabricant incluse</li>
                <li>Emballage soigné et sécurisé</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">{product.rating}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{product.reviews.toLocaleString()} avis</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-8">{star} ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${star * 15}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">{star * 15}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Les avis clients seront affichés ici.</p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Truck size={20} className="text-orange-500" />
                  Informations de livraison
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Livraison standard</span>
                    <span className="font-bold text-orange-500">2-5 jours ouvrés</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Livraison express</span>
                    <span className="font-bold text-orange-500">1-2 jours ouvrés</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Zone de livraison</span>
                    <span className="font-bold">Mali & International</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <RotateCcw size={20} className="text-orange-500" />
                  Politique de retour
                </h3>
                <p className="text-gray-700">
                  Vous avez 14 jours pour retourner votre produit s'il ne vous satisfait pas. 
                  Le retour est gratuit et le remboursement est effectué sous 48h.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ShoppingCart size={24} className="text-orange-500" />
            Produits similaires
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="cursor-pointer group"
                >
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3 h-48">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-orange-500 transition mb-2">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-orange-500">{p.price.toLocaleString()} FCFA</span>
                    <span className="text-xs text-gray-400 line-through">{p.originalPrice.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(p.rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-xs text-gray-500">({p.reviews})</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}