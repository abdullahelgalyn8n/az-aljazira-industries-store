import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ArrowUpLeft, Check } from 'lucide-react';
import { Product } from '../data/catalog';
import { formatPriceEGP } from '../utils/shopLogic';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const wished = isInWishlist(product.id);
  const productUrl = `/product/${product.slug}`;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  if (viewMode === 'list') {
    return (
      <article className="group bg-white rounded-xl border border-stone-200/90 hover:border-[#9A640C]/60 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row">
        <Link
          to={productUrl}
          className="relative sm:w-64 h-52 sm:h-auto shrink-0 bg-stone-100 overflow-hidden block"
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-700 p-4 text-center">
              <span className="font-mono-num text-xs text-stone-500 mb-1">
                {product.sku}
              </span>
              <span className="font-bold text-sm">{product.name}</span>
            </div>
          )}
        </Link>

        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-stone-600 mb-2">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-[#8A5606] font-semibold">
                  {product.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num text-stone-500">
                  {product.sku}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-800 font-semibold">
                  متوفر بالمصنع ({product.stockCount})
                </span>
              </div>
              <div className="flex items-center gap-1 text-stone-800 font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#C8860A] text-[#C8860A]" />
                <span className="tabular-nums">{product.rating}</span>
                <span className="text-stone-500 text-xs">
                  ({product.reviewCount} تقييم)
                </span>
              </div>
            </div>

            <Link to={productUrl} className="block group/title">
              <h3 className="text-lg font-bold text-stone-900 group-hover/title:text-[#8A5606] transition-colors mb-1.5">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                {formatPriceEGP(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-500 line-through tabular-nums">
                  {formatPriceEGP(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={`إضافة ${product.name} للمفضلة`}
                className={`p-2.5 rounded-lg border transition-colors ${
                  wished
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Heart className={`w-4 h-4 ${wished ? 'fill-red-600' : ''}`} />
              </button>
              <Link
                to={productUrl}
                className="px-3.5 py-2 rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs font-bold transition-colors whitespace-nowrap"
              >
                التفاصيل والمواصفات
              </Link>
              <button
                type="button"
                onClick={handleQuickAdd}
                className="px-4 py-2 rounded-lg bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تمت الإضافة</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>أضف للسلة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-xl border border-stone-200/90 hover:border-[#9A640C]/60 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <Link to={productUrl} className="block w-full h-full">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-700 p-4 text-center">
              <span className="font-mono-num text-xs text-stone-500 mb-1">
                {product.sku}
              </span>
              <span className="font-bold text-sm">{product.name}</span>
            </div>
          )}
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={`إضافة ${product.name} للمفضلة`}
          className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
            wished
              ? 'bg-red-600 text-white'
              : 'bg-white/95 text-stone-800 hover:bg-stone-900 hover:text-white border border-stone-200'
          }`}
        >
          <Heart className={`w-4 h-4 ${wished ? 'fill-current' : ''}`} />
        </button>

        {/* Single subtle text tag if on sale */}
        {product.onSale && product.originalPrice && (
          <span className="absolute top-3 right-3 bg-[#1E1B16]/90 text-[#F5C451] text-[11px] font-bold px-2.5 py-1 rounded-md">
            وفر {formatPriceEGP(product.originalPrice - product.price)}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex items-center justify-between gap-2 text-xs text-stone-600 mb-1.5">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-semibold text-[#8A5606]">
                {product.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num text-stone-500">{product.sku}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 text-stone-800 font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#C8860A] text-[#C8860A]" />
              <span className="tabular-nums">{product.rating}</span>
              <span className="text-stone-500 text-[11px]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          <Link to={productUrl} className="block group/title">
            <h3 className="text-base font-bold text-stone-900 group-hover/title:text-[#8A5606] transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {product.subtitle}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-extrabold text-stone-900 tabular-nums leading-tight">
              {formatPriceEGP(product.price)}
            </div>
            {product.originalPrice ? (
              <div className="text-xs text-stone-500 line-through tabular-nums">
                {formatPriceEGP(product.originalPrice)}
              </div>
            ) : (
              <div className="text-[11px] text-emerald-800 font-semibold">
                متوفر للشحن الفوري
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={productUrl}
              aria-label={`عرض صفحة ${product.name}`}
              className="p-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
              title="رابط المنتج المستقل"
            >
              <ArrowUpLeft className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="px-3.5 py-2 rounded-lg bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>أُضيف</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
