import { Truck, Lock, Users, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-16">
      {/* Why Buy Section */}
      <div className="border-b border-green-600">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Pourquoi acheter sur LOUMMO ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex gap-4">
              <Truck size={40} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Livraison vers le Mali</h3>
                <p className="text-sm text-green-100">Vers les principales villes 1*** à 3 Jours</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Lock size={40} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Paiement sécurisé</h3>
                <p className="text-sm text-green-100">Vos transactions bancaires, Lors disponibilités</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users size={40} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Des milliers de produits</h3>
                <p className="text-sm text-green-100">Fiancés, Shuzin sees de supartos</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Headphones size={40} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Support client disponible</h3>
                <p className="text-sm text-green-100">Tailaffé salafés et maiteron un canceled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers Section */}
      <div className="border-b border-green-600">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Nos produits proviennent ces meilleures</h2>
          <div className="flex flex-wrap items-center gap-8 justify-center">
            <span className="text-2xl font-bold">SHEIN</span>
            <span className="text-orange-400 bg-white text-black px-2 py-1 rounded text-xs font-bold">TEMU</span>
            <span className="text-2xl">amazon</span>
            <span className="text-orange-500 text-2xl font-bold">AliExpress</span>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-green-600">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <input
              type="email"
              placeholder="Introstec: voirr amal forme"
              className="flex-1 px-4 py-3 rounded text-gray-800"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-bold transition">
              S'inscrire
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">À propos</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href="#" className="hover:text-white transition">Qui sommes nous?</a></li>
              <li><a href="#" className="hover:text-white transition">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href="#" className="hover:text-white transition">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-white transition">Contactez-nous</a></li>
              <li><a href="#" className="hover:text-white transition">Suivre ma commande</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Politique</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href="#" className="hover:text-white transition">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-white transition">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition">Retours</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Paiement</h3>
            <div className="space-y-2 text-sm text-green-100">
              <p>Nous acceptons:</p>
              <p>Virement Bancaire</p>
              <p>Paiement à la livraison</p>
              <p>Orange Money / Moov Money</p>
            </div>
          </div>
        </div>
        <div className="border-t border-green-600 pt-8 text-center text-sm text-green-100">
          <p>&copy; 2024 LOUMMO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
