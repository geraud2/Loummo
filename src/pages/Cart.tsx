import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Truck, 
  CreditCard, 
  RotateCcw,
  Shield,
  ArrowRight,
  Package,
  Heart
} from 'lucide-react';
import { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Sup femme SHEIN',
      price: 9500,
      quantity: 1,
      image: 'https://images.pexels.com/photos/3762269/pexels-photo-3762269.jpeg'
    },
    {
      id: '2',
      name: 'Brides surdiphiones Nholi noir',
      price: 9500,
      quantity: 2,
      image: 'https://images.pexels.com/photos/7974/pexels-photo.jpeg'
    }
  ]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 2000;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-orange-500 transition">Accueil</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Panier</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <ShoppingCart size={36} className="text-orange-500" />
          Mon Panier
        </h1>
        <p className="text-gray-500 mb-8">
          {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-lg transition relative">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <button className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow hover:bg-orange-50 transition">
                        <Heart size={14} className="text-gray-400 hover:text-orange-500" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-orange-500 transition">
                        {item.name}
                      </Link>
                      <p className="text-orange-500 font-bold text-lg mt-1">
                        {(item.price * item.quantity).toLocaleString()} FCFA
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.price.toLocaleString()} FCFA / unité
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-orange-100 hover:bg-orange-200 w-10 h-10 rounded-lg transition flex items-center justify-center"
                      >
                        <Minus size={18} className="text-orange-600" />
                      </button>
                      <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-orange-100 hover:bg-orange-200 w-10 h-10 rounded-lg transition flex items-center justify-center"
                      >
                        <Plus size={18} className="text-orange-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart size={40} className="text-orange-500" />
                </div>
                <p className="text-gray-600 text-lg mb-4">Votre panier est vide</p>
                <p className="text-gray-500 mb-6">Découvrez nos produits et commencez vos achats !</p>
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-bold"
                >
                  <Package size={20} />
                  Explorer la boutique
                  <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <div className="md:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield size={20} className="text-orange-500" />
                  Résumé de la commande
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})</span>
                    <span className="font-bold">{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Livraison</span>
                    {shipping === 0 ? (
                      <span className="text-orange-500 font-bold">Gratuite</span>
                    ) : (
                      <span>{shipping.toLocaleString()} FCFA</span>
                    )}
                  </div>
                  {shipping > 0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm">
                      <p className="text-orange-600 flex items-center gap-2">
                        <Truck size={14} />
                        Plus que {(50000 - subtotal).toLocaleString()} FCFA pour la livraison gratuite
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min((subtotal / 50000) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="border-t-2 border-gray-200 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">{total.toLocaleString()} FCFA</span>
                  </div>
                  <p className="text-xs text-gray-500">TVA incluse si applicable</p>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-4 rounded-lg transition mb-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  <CreditCard size={20} />
                  Procéder au paiement
                </button>

                <Link
                  to="/products"
                  className="flex items-center justify-center gap-2 text-orange-500 hover:text-orange-600 font-bold transition mb-6"
                >
                  <ArrowRight size={18} />
                  Continuer vos achats
                </Link>

                {/* Info */}
                <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-orange-500 flex-shrink-0" />
                    <span>Livraison gratuite pour commandes &gt; 50 000 FCFA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} className="text-orange-500 flex-shrink-0" />
                    <span>Paiement à la livraison disponible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw size={18} className="text-orange-500 flex-shrink-0" />
                    <span>Retour gratuit sous 14 jours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-orange-500 flex-shrink-0" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}