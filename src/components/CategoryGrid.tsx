import { Link } from 'react-router-dom';
import { categories, categoryIcons } from '../data/products';

export default function CategoryGrid() {
  const getIcon = (iconName: string) => {
    const IconComponent = categoryIcons[iconName as keyof typeof categoryIcons];
    return IconComponent ? <IconComponent size={32} /> : null;
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Nos Catégories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition group border border-gray-100"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-100 transition group-hover:scale-110">
              <span className="text-green-700">
                {getIcon(category.icon)}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}