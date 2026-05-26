export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  discount: number;
  rating: number;
  reviews: number;
  supplier: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}
