import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/catalog';
import { CartItem, calculateCartTotals } from '../utils/shopLogic';

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  governorate: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'instapay' | 'bank';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'قيد المراجعة والتجهيز' | 'تم الشحن مع المندوب' | 'تم التسليم بنجاح';
  createdAt: string;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlistIds: string[];
  orders: OrderRecord[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (data: Omit<OrderRecord, 'id' | 'items' | 'subtotal' | 'shipping' | 'total' | 'status' | 'createdAt'>) => OrderRecord;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const INITIAL_DEMO_ORDER: OrderRecord = {
  id: 'JZ-2026-1042',
  customerName: 'أحمد محمود حسن',
  phone: '01065050165',
  governorate: 'القاهرة',
  address: 'شارع عباس العقاد، مدينة نصر',
  paymentMethod: 'cod',
  items: [
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[3], quantity: 1 },
  ],
  subtotal: 8750,
  shipping: 0,
  total: 8750,
  status: 'تم الشحن مع المندوب',
  createdAt: '2026-10-20',
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aljazira_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aljazira_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aljazira_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [INITIAL_DEMO_ORDER];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('aljazira_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aljazira_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('aljazira_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, openDrawer = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    } else {
      showToast(`تمت إضافة "${product.name}" إلى سلة التسوق`);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      showToast(
        exists ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى قائمة المفضلة'
      );
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const placeOrder = (
    data: Omit<
      OrderRecord,
      'id' | 'items' | 'subtotal' | 'shipping' | 'total' | 'status' | 'createdAt'
    >
  ): OrderRecord => {
    const totals = calculateCartTotals(cart);
    const randomNum = Math.floor(1050 + Math.random() * 8900);
    const newOrder: OrderRecord = {
      ...data,
      id: `JZ-2026-${randomNum}`,
      items: [...cart],
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      status: 'قيد المراجعة والتجهيز',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlistIds,
        orders,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
