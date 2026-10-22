import { Product, ProductCategory } from '../data/catalog';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface ShopFilterState {
  searchQuery: string;
  category: ProductCategory | 'all';
  minPrice: number;
  maxPrice: number;
  minRating: number | null;
  onlyInStock: boolean;
  onlyOnSale: boolean;
  onlyFeatured: boolean;
  sortBy: SortOption;
}

export const DEFAULT_FILTERS: ShopFilterState = {
  searchQuery: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 20000,
  minRating: null,
  onlyInStock: false,
  onlyOnSale: false,
  onlyFeatured: false,
  sortBy: 'newest',
};

export interface CartItem {
  product: Product;
  quantity: number;
}

export function filterAndSortProducts(
  products: Product[],
  filters: ShopFilterState
): Product[] {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    if (filters.minRating !== null && product.rating < filters.minRating) {
      return false;
    }

    if (filters.onlyInStock && !product.inStock) {
      return false;
    }

    if (filters.onlyOnSale && !product.onSale) {
      return false;
    }

    if (filters.onlyFeatured && !product.featured) {
      return false;
    }

    if (query.length > 0) {
      const haystack = `${product.name} ${product.subtitle} ${product.category} ${product.sku} ${product.description}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case 'newest':
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });
}

export function findProductByIdentifier(
  products: Product[],
  identifier: string
): Product | undefined {
  const decoded = decodeURIComponent(identifier).trim();
  return products.find(
    (p) =>
      p.slug === decoded ||
      p.id === decoded ||
      p.sku.toLowerCase() === decoded.toLowerCase()
  );
}

export function getRelatedProducts(
  products: Product[],
  currentProduct: Product,
  limit = 4
): Product[] {
  const sameCategory = products.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  );
  const others = products.filter(
    (p) => p.category !== currentProduct.category && p.id !== currentProduct.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function calculateCartTotals(items: CartItem[]): {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
  freeShippingApplied: boolean;
} {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount === 0) {
    return {
      subtotal: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      itemCount: 0,
      freeShippingApplied: false,
    };
  }

  // Free shipping on orders >= 500 EGP (as stated in the Home page banner: "شحن مجاني للطلبات فوق 500 جنيه")
  const freeShippingApplied = subtotal >= 500;
  const shipping = freeShippingApplied ? 0 : 75;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return {
    subtotal,
    shipping,
    discount,
    total,
    itemCount,
    freeShippingApplied,
  };
}

export function formatPriceEGP(amount: number): string {
  return `${amount.toLocaleString('en-US')} ج.م`;
}
