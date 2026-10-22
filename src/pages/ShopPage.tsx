import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Star,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, ProductCategory } from '../data/catalog';
import {
  DEFAULT_FILTERS,
  ShopFilterState,
  SortOption,
  filterAndSortProducts,
  formatPriceEGP,
} from '../utils/shopLogic';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams<{ categorySlug?: string }>();

  const initialCategory = useMemo((): ProductCategory | 'all' => {
    if (categorySlug) {
      const found = CATEGORIES.find((c) => c.slug === categorySlug);
      if (found) return found.id;
    }
    const paramCat = searchParams.get('category');
    if (
      paramCat === 'العجانات الكهربائية' ||
      paramCat === 'الأفران الصناعية' ||
      paramCat === 'قطع الغيار'
    ) {
      return paramCat;
    }
    return 'all';
  }, [categorySlug, searchParams]);

  const [filters, setFilters] = useState<ShopFilterState>({
    ...DEFAULT_FILTERS,
    category: initialCategory,
    searchQuery: searchParams.get('q') || '',
    sortBy: (searchParams.get('sort') as SortOption) || 'newest',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    rating: true,
    special: true,
  });

  // Sync URL query params -> filter state when navigating from header dropdown or search
  useEffect(() => {
    const paramCat = searchParams.get('category');
    const validCat: ProductCategory | 'all' =
      paramCat === 'العجانات الكهربائية' ||
      paramCat === 'الأفران الصناعية' ||
      paramCat === 'قطع الغيار'
        ? paramCat
        : categorySlug
        ? CATEGORIES.find((c) => c.slug === categorySlug)?.id || 'all'
        : 'all';
    const paramQ = searchParams.get('q') || '';
    setFilters((prev) => ({
      ...prev,
      category: validCat,
      searchQuery: paramQ,
    }));
  }, [searchParams, categorySlug]);

  const updateCategory = (cat: ProductCategory | 'all') => {
    setFilters((prev) => ({ ...prev, category: cat }));
    const next = new URLSearchParams(searchParams);
    if (cat === 'all') {
      next.delete('category');
    } else {
      next.set('category', cat);
    }
    setSearchParams(next, { replace: true });
  };

  const updateSearch = (q: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: q }));
    const next = new URLSearchParams(searchParams);
    if (!q.trim()) {
      next.delete('q');
    } else {
      next.set('q', q);
    }
    setSearchParams(next, { replace: true });
  };

  const resetAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchParams({}, { replace: true });
  };

  const filteredProducts = useMemo(
    () => filterAndSortProducts(PRODUCTS, filters),
    [filters]
  );

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.searchQuery.trim() !== '' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 20000 ||
    filters.minRating !== null ||
    filters.onlyInStock ||
    filters.onlyOnSale ||
    filters.onlyFeatured;

  return (
    <div className="pb-16">
      {/* Page Hero Banner with Search */}
      <section className="bg-[#231F1A] text-white py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {filters.category === 'all' ? 'جميع المنتجات' : filters.category}
            </h1>
            <p className="text-sm text-stone-300 max-w-xl mx-auto">
              تصفح كتالوج مصنع الجزيرة الكامل للعجانات الكهربائية والأفران الصناعية وقطع الغيار الأصلية بأسعار المصنع مباشرة
            </p>
          </div>

          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-stone-500 absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={filters.searchQuery}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="ابحث عن منتجات... (مثال: عجانة، فرن، جرابوكس، زرار سحب)"
              aria-label="ابحث عن منتجات"
              className="w-full bg-white text-stone-900 placeholder:text-stone-500 rounded-full pr-12 pl-5 py-3.5 text-sm font-medium border-2 border-transparent focus:border-[#E09F1F] shadow-lg outline-none"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => updateSearch('')}
                aria-label="مسح البحث"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-xl border border-stone-200">
            <span className="text-xs font-extrabold text-stone-700 ml-1">
              الفلاتر النشطة:
            </span>

            {filters.category !== 'all' && (
              <button
                type="button"
                onClick={() => updateCategory('all')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1B16] text-white text-xs font-bold cursor-pointer hover:bg-stone-800"
              >
                <span>{filters.category}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {filters.searchQuery.trim() !== '' && (
              <button
                type="button"
                onClick={() => updateSearch('')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1B16] text-white text-xs font-bold cursor-pointer hover:bg-stone-800"
              >
                <span>بحث: "{filters.searchQuery}"</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {(filters.minPrice > 0 || filters.maxPrice < 20000) && (
              <button
                type="button"
                onClick={() =>
                  setFilters((p) => ({ ...p, minPrice: 0, maxPrice: 20000 }))
                }
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1B16] text-white text-xs font-bold cursor-pointer"
              >
                <span>
                  السعر: {filters.minPrice} - {filters.maxPrice} ج.م
                </span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {filters.minRating !== null && (
              <button
                type="button"
                onClick={() => setFilters((p) => ({ ...p, minRating: null }))}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1B16] text-white text-xs font-bold cursor-pointer"
              >
                <span>تقييم {filters.minRating}+ نجوم</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {filters.onlyOnSale && (
              <button
                type="button"
                onClick={() => setFilters((p) => ({ ...p, onlyOnSale: false }))}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1B16] text-white text-xs font-bold cursor-pointer"
              >
                <span>عروض وتخفيضات</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {filters.onlyFeatured && (
              <button
                type="button"
                onClick={() =>
                  setFilters((p) => ({ ...p, onlyFeatured: false }))
                }
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1B16] text-white text-xs font-bold cursor-pointer"
              >
                <span>منتجات مميزة</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-xs font-extrabold text-red-700 hover:text-red-900 mr-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>مسح الكل</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters (Right Column in RTL) */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-stone-200/90 shadow-xs p-5 space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 text-base font-extrabold text-stone-900">
                <SlidersHorizontal className="w-4 h-4 text-[#8A5606]" />
                <span>فلترة المنتجات</span>
              </div>
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#8A5606] hover:text-stone-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>مسح الفلاتر</span>
              </button>
            </div>

            {/* 1. Category Filter */}
            <div className="border-b border-stone-200 pb-5">
              <button
                type="button"
                onClick={() =>
                  setOpenSections((s) => ({ ...s, category: !s.category }))
                }
                className="w-full flex items-center justify-between text-sm font-extrabold text-stone-900 mb-3 cursor-pointer"
              >
                <span>الفئة</span>
                {openSections.category ? (
                  <ChevronUp className="w-4 h-4 text-stone-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-600" />
                )}
              </button>

              {openSections.category && (
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'جميع المنتجات', count: PRODUCTS.length },
                    {
                      id: 'قطع الغيار',
                      label: 'قطع الغيار',
                      count: PRODUCTS.filter((p) => p.category === 'قطع الغيار').length,
                    },
                    {
                      id: 'العجانات الكهربائية',
                      label: 'العجانات الكهربائية',
                      count: PRODUCTS.filter(
                        (p) => p.category === 'العجانات الكهربائية'
                      ).length,
                    },
                    {
                      id: 'الأفران الصناعية',
                      label: 'الأفران الصناعية',
                      count: PRODUCTS.filter(
                        (p) => p.category === 'الأفران الصناعية'
                      ).length,
                    },
                  ].map((item) => {
                    const active = filters.category === item.id;
                    return (
                      <label
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                          active
                            ? 'bg-[#FAF6EE] border border-[#DFC082] text-stone-950 font-extrabold'
                            : 'hover:bg-stone-50 text-stone-800 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="shop-category"
                            checked={active}
                            onChange={() =>
                              updateCategory(item.id as ProductCategory | 'all')
                            }
                            className="w-4 h-4 accent-[#8A5606]"
                          />
                          <span className="text-xs">{item.label}</span>
                        </div>
                        <span className="text-xs font-mono-num text-stone-600 font-bold">
                          ({item.count})
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Price Range Filter */}
            <div className="border-b border-stone-200 pb-5">
              <button
                type="button"
                onClick={() =>
                  setOpenSections((s) => ({ ...s, price: !s.price }))
                }
                className="w-full flex items-center justify-between text-sm font-extrabold text-stone-900 mb-3 cursor-pointer"
              >
                <span>نطاق السعر</span>
                {openSections.price ? (
                  <ChevronUp className="w-4 h-4 text-stone-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-600" />
                )}
              </button>

              {openSections.price && (
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={20000}
                    step={100}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        maxPrice: Number(e.target.value),
                      }))
                    }
                    aria-label="الحد الأقصى للسعر"
                    className="w-full accent-[#8A5606] cursor-pointer"
                  />

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        من (ج.م)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={filters.maxPrice}
                        value={filters.minPrice}
                        onChange={(e) =>
                          setFilters((p) => ({
                            ...p,
                            minPrice: Math.max(0, Number(e.target.value)),
                          }))
                        }
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-mono-num font-bold text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        إلى (ج.م)
                      </label>
                      <input
                        type="number"
                        min={filters.minPrice}
                        max={20000}
                        value={filters.maxPrice}
                        onChange={(e) =>
                          setFilters((p) => ({
                            ...p,
                            maxPrice: Math.min(20000, Number(e.target.value)),
                          }))
                        }
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs font-mono-num font-bold text-stone-900"
                      />
                    </div>
                  </div>
                  <div className="text-center text-xs font-bold text-stone-700 font-mono-num">
                    {formatPriceEGP(filters.minPrice)} —{' '}
                    {formatPriceEGP(filters.maxPrice)}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Rating Filter */}
            <div className="border-b border-stone-200 pb-5">
              <button
                type="button"
                onClick={() =>
                  setOpenSections((s) => ({ ...s, rating: !s.rating }))
                }
                className="w-full flex items-center justify-between text-sm font-extrabold text-stone-900 mb-3 cursor-pointer"
              >
                <span>التقييم</span>
                {openSections.rating ? (
                  <ChevronUp className="w-4 h-4 text-stone-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-600" />
                )}
              </button>

              {openSections.rating && (
                <div className="space-y-1.5">
                  {[4.5, 4, 3].map((stars) => {
                    const active = filters.minRating === stars;
                    return (
                      <button
                        key={stars}
                        type="button"
                        onClick={() =>
                          setFilters((p) => ({
                            ...p,
                            minRating: active ? null : stars,
                          }))
                        }
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#FAF6EE] border border-[#DFC082] font-extrabold text-stone-950'
                            : 'hover:bg-stone-50 text-stone-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#C8860A] text-[#C8860A]" />
                          <span className="font-mono-num">{stars}</span>
                          <span>نجوم وأكثر</span>
                        </div>
                        {active && <span className="text-[#8A5606]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Special Filters */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setOpenSections((s) => ({ ...s, special: !s.special }))
                }
                className="w-full flex items-center justify-between text-sm font-extrabold text-stone-900 mb-3 cursor-pointer"
              >
                <span>فلاتر خاصة</span>
                {openSections.special ? (
                  <ChevronUp className="w-4 h-4 text-stone-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-600" />
                )}
              </button>

              {openSections.special && (
                <div className="space-y-2.5 text-xs font-bold text-stone-800">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.onlyInStock}
                      onChange={(e) =>
                        setFilters((p) => ({
                          ...p,
                          onlyInStock: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 accent-[#8A5606] rounded"
                    />
                    <span>متوفر في المخزون</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.onlyOnSale}
                      onChange={(e) =>
                        setFilters((p) => ({
                          ...p,
                          onlyOnSale: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 accent-[#8A5606] rounded"
                    />
                    <span>عروض وتخفيضات</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.onlyFeatured}
                      onChange={(e) =>
                        setFilters((p) => ({
                          ...p,
                          onlyFeatured: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 accent-[#8A5606] rounded"
                    />
                    <span>منتجات مميزة</span>
                  </label>
                </div>
              )}
            </div>
          </aside>

          {/* Main Product Catalog Column */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white rounded-xl border border-stone-200/90 px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div className="text-sm font-extrabold text-stone-800">
                عرض{' '}
                <span className="font-mono-num text-[#8A5606]">
                  {filteredProducts.length}
                </span>{' '}
                منتج من أصل{' '}
                <span className="font-mono-num">{PRODUCTS.length}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Select */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="shop-sort"
                    className="text-xs font-bold text-stone-700 whitespace-nowrap"
                  >
                    ترتيب حسب:
                  </label>
                  <select
                    id="shop-sort"
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        sortBy: e.target.value as SortOption,
                      }))
                    }
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-900 outline-none focus:border-[#8A5606]"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                    <option value="rating-desc">الأعلى تقييماً</option>
                  </select>
                </div>

                {/* Grid / List View Switcher */}
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="عرض شبكي"
                    className={`p-2 transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#8A5606] text-white'
                        : 'bg-white text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="عرض قائمة"
                    className={`p-2 transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-[#8A5606] text-white'
                        : 'bg-white text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Results */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
                <p className="text-lg font-extrabold text-stone-900">
                  لا توجد منتجات مطابقة للفلاتر المحددة
                </p>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  جرب تغيير كلمات البحث أو توسيع نطاق السعر لاستعراض جميع منتجات مصنع الجزيرة.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  إعادة ضبط جميع الفلاتر
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="list"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
