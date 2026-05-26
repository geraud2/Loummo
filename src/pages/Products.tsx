import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layouts/Layout';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Filter, 
  ChevronDown,
  Star,
  TrendingUp,
  Tag,
  Grid3X3,
  List
} from 'lucide-react';

export default function Products() {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState(100000);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categorySlug = slug;

  let filteredProducts = [...products];

  // Filtre par catégorie
  if (categorySlug) {
    const categoryMap: { [key: string]: string } = {
      'mode-femme': 'Mode Femme',
      'mode-homme': 'Mode Homme',
      'chaussures': 'Chaussures',
      'electronique': 'Électronique',
      'maison': 'Maison',
      'beaute': 'Beauté',
      'accessoires': 'Accessoires',
      'sport': 'Sport',
      'enfants': 'Enfants',
    };
    const categoryName = categoryMap[categorySlug];
    if (categoryName) {
      filteredProducts = filteredProducts.filter(p => p.category === categoryName);
    }
  }

  // Filtre par prix
  filteredProducts = filteredProducts.filter(p => p.price <= priceRange);

  // Filtre par recherche
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filtre par fournisseur
  if (selectedSupplier.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedSupplier.includes(p.supplier));
  }

  // Tri
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    filteredProducts.sort((a, b) => b.discount - a.discount);
  }

  const suppliers = ['SHEIN', 'TEMU', 'Amazon', 'AliExpress', 'El Amèxpress'];
  const categories = ['Mode Femme', 'Mode Homme', 'Chaussures', 'Électronique', 'Maison', 'Beauté', 'Accessoires', 'Sport', 'Enfants'];

  const toggleSupplier = (supplier: string) => {
    setSelectedSupplier(prev =>
      prev.includes(supplier)
        ? prev.filter(s => s !== supplier)
        : [...prev, supplier]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSupplier([]);
    setSelectedCategories([]);
    setPriceRange(100000);
    setSortBy('popular');
  };

  const hasActiveFilters = searchTerm || selectedSupplier.length > 0 || selectedCategories.length > 0 || priceRange < 100000;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {categorySlug 
              ? categorySlug.replace(/-/g, ' ').toUpperCase() 
              : 'Tous les produits'}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              <span className="font-bold text-orange-500">{filteredProducts.length}</span> produits trouvés
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
              >
                <X size={16} />
                Effacer les filtres
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-orange-500" />
                  Trier par
                </h3>
                <div className="space-y-3">
                  {[
                    { value: 'popular', label: 'Les plus populaires' },
                    { value: 'price-low', label: 'Prix: Moins au plus' },
                    { value: 'price-high', label: 'Prix: Plus au moins' },
                    { value: 'rating', label: 'Les mieux notés' },
                    { value: 'discount', label: 'Meilleur rabais' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sortBy === option.value}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-gray-700 group-hover:text-orange-500 transition">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag size={18} className="text-orange-500" />
                  Prix maximum
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-orange-500"
                    style={{
                      background: `linear-gradient(to right, #f97316 0%, #f97316 ${(priceRange / 100000) * 100}%, #e5e7eb ${(priceRange / 100000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">0 FCFA</span>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {priceRange.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>

              {/* Suppliers */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Fournisseurs</h3>
                <div className="space-y-3">
                  {suppliers.map((supplier) => (
                    <label key={supplier} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedSupplier.includes(supplier)}
                        onChange={() => toggleSupplier(supplier)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                      />
                      <span className="text-gray-700 group-hover:text-orange-500 transition">
                        {supplier}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Catégories</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                      />
                      <span className="text-gray-700 text-sm group-hover:text-orange-500 transition">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              <Filter size={20} />
              {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden bg-white border border-gray-200 rounded-lg p-4 mb-4">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-2">Trier par</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="popular">Les plus populaires</option>
                  <option value="price-low">Prix: Moins au plus</option>
                  <option value="price-high">Prix: Plus au moins</option>
                  <option value="rating">Les mieux notés</option>
                  <option value="discount">Meilleur rabais</option>
                </select>
              </div>

              {/* Price */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-2">Prix maximum: {priceRange.toLocaleString()} FCFA</h3>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
              >
                Effacer les filtres
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-bold text-orange-500">{filteredProducts.length}</span> produits
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchTerm && (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Recherche: {searchTerm}
                    <button onClick={() => setSearchTerm('')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {selectedSupplier.map(supplier => (
                  <span key={supplier} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {supplier}
                    <button onClick={() => toggleSupplier(supplier)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {priceRange < 100000 && (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    ≤ {priceRange.toLocaleString()} FCFA
                    <button onClick={() => setPriceRange(100000)}>
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <Search size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg mb-4">Aucun produit trouvé</p>
                <button
                  onClick={clearFilters}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-bold"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredProducts.length > 9 && (
              <div className="text-center mt-8">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition">
                  Charger plus de produits
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}