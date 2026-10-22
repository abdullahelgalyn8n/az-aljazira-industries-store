import React, { useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  Trash2,
  Plus,
  Minus,
  Link2,
  Check,
  MessageCircle,
  PackageSearch,
} from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { calculateCartTotals, formatPriceEGP } from '../utils/shopLogic';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    toastMessage,
    showToast,
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const totals = calculateCartTotals(cart);

  const currentFullPath = `${location.pathname}${location.search}`;

  const handleCopyPageLink = () => {
    const fullUrl = `${window.location.origin}${currentFullPath}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    setCopiedUrl(true);
    showToast(`تم نسخ رابط الصفحة: ${currentFullPath}`);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/shop?q=${encodeURIComponent(quickSearch.trim())}`);
      setSearchModalOpen(false);
      setQuickSearch('');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      showToast('يرجى إدخال بريد إلكتروني صحيح للاشتراك');
      return;
    }
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    showToast('تم اشتراكك في النشرة البريدية لمصنع الجزيرة بنجاح');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      {/* Main Sticky Header (Strictly adhering to 3-zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
          {/* Zone 1: Brand Lockup */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 whitespace-nowrap group"
          >
            <img
              src="/assets/brand/logo.png"
              alt="شعار مصنع الجزيرة"
              referrerPolicy="no-referrer"
              className="w-11 h-11 object-contain"
            />
            <span className="font-display text-lg font-extrabold text-stone-900 group-hover:text-[#8A5606] transition-colors">
              مصنع الجزيرة
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center gap-6 text-sm font-bold text-stone-700"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#8A5606] border-[#B47814]'
                    : 'border-transparent hover:text-stone-950'
                }`
              }
            >
              الرئيسية
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#8A5606] border-[#B47814]'
                    : 'border-transparent hover:text-stone-950'
                }`
              }
            >
              المتجر
            </NavLink>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() =>
                  setCategoriesDropdownOpen((prev) => !prev)
                }
                aria-expanded={categoriesDropdownOpen}
                className="flex items-center gap-1 py-1 text-stone-700 hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>التصنيفات</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 w-60 z-50">
                  <div className="bg-white rounded-xl border border-stone-200 shadow-lg py-2 overflow-hidden">
                    <Link
                      to="/shop"
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm font-bold text-stone-800 hover:bg-stone-100 hover:text-[#8A5606] transition-colors"
                    >
                      جميع المنتجات ({CATEGORIES.reduce((s, c) => s + c.count, 0)})
                    </Link>
                    <div className="h-px bg-stone-100 my-1" />
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${encodeURIComponent(cat.id)}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-100 hover:text-[#8A5606] transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs font-mono-num text-stone-500">
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#8A5606] border-[#B47814]'
                    : 'border-transparent hover:text-stone-950'
                }`
              }
            >
              خدماتنا
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#8A5606] border-[#B47814]'
                    : 'border-transparent hover:text-stone-950'
                }`
              }
            >
              من نحن
            </NavLink>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#8A5606] border-[#B47814]'
                    : 'border-transparent hover:text-stone-950'
                }`
              }
            >
              الأسئلة الشائعة
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#8A5606] border-[#B47814]'
                    : 'border-transparent hover:text-stone-950'
                }`
              }
            >
              تواصل معنا
            </NavLink>
          </nav>

          {/* Zone 3: Actions (Search + Cart Primary CTA + Mobile Toggle) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchModalOpen((prev) => !prev)}
              aria-label="بحث في المنتجات"
              className="p-2.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/track-order"
              aria-label="تتبع الطلب"
              title="تتبع الطلب"
              className="hidden sm:flex p-2.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors"
            >
              <PackageSearch className="w-5 h-5" />
            </Link>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="سلة التسوق"
              className="px-4 py-2.5 rounded-lg bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5C451]" />
              <span>السلة</span>
              <span className="font-mono-num bg-white/15 px-1.5 py-0.5 rounded text-[11px] text-white">
                {totals.itemCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="فتح القائمة"
              className="lg:hidden p-2.5 rounded-lg text-stone-800 hover:bg-stone-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Search Bar Dropdown */}
        {searchModalOpen && (
          <div className="border-t border-stone-200 bg-stone-50 py-3 px-4">
            <form
              onSubmit={handleQuickSearchSubmit}
              className="max-w-3xl mx-auto flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="ابحث عن عجانة، فرن صناعي، جرابوكس، زرار سحب، أو رقم الكود..."
                  className="w-full bg-white border border-stone-300 focus:border-[#8A5606] rounded-lg pr-10 pl-4 py-2 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#8A5606] hover:bg-[#6E4404] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                بحث
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2">
            {[
              { to: '/', label: 'الرئيسية' },
              { to: '/shop', label: 'المتجر (جميع المنتجات)' },
              {
                to: '/shop?category=العجانات الكهربائية',
                label: 'قسم العجانات الكهربائية',
              },
              {
                to: '/shop?category=الأفران الصناعية',
                label: 'قسم الأفران الصناعية',
              },
              { to: '/shop?category=قطع الغيار', label: 'قسم قطع الغيار الأصلية' },
              { to: '/services', label: 'خدماتنا وحجز الصيانة' },
              { to: '/about', label: 'من نحن' },
              { to: '/faq', label: 'الأسئلة الشائعة' },
              { to: '/contact', label: 'تواصل معنا' },
              { to: '/track-order', label: 'تتبع حالة الطلب' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-bold text-stone-800 hover:bg-stone-100 hover:text-[#8A5606]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Dedicated Route / Shareable URL Bar (Shows current page URL & quick copy) */}
      <div className="bg-stone-100 border-b border-stone-200/90 text-xs text-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="font-bold text-stone-800 whitespace-nowrap">
              رابط الصفحة الحالي:
            </span>
            <code
              dir="ltr"
              className="font-mono-num text-[11px] bg-white border border-stone-300 text-stone-900 px-2.5 py-0.5 rounded select-all"
            >
              {decodeURIComponent(currentFullPath)}
            </code>
            <button
              type="button"
              onClick={handleCopyPageLink}
              className="inline-flex items-center gap-1 text-[#8A5606] hover:text-stone-950 font-bold transition-colors whitespace-nowrap cursor-pointer"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-emerald-800">تم النسخ</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" />
                  <span>نسخ الرابط</span>
                </>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-stone-700 font-medium">
            <span>شحن لجميع المحافظات</span>
            <span aria-hidden="true">·</span>
            <span dir="ltr" className="font-mono-num font-semibold text-stone-900">
              +20 106 5050165
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B16] text-white border border-[#C8860A] px-5 py-3 rounded-xl shadow-xl text-sm font-bold flex items-center gap-2.5"
        >
          <Check className="w-4 h-4 text-[#F5C451] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-Over Shopping Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="سلة التسوق"
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#8A5606]" />
                <h2 className="text-lg font-extrabold text-stone-900">
                  سلة التسوق ({totals.itemCount})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="إغلاق السلة"
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="px-5 py-3 bg-[#FAF6EE] border-b border-[#E8D5B0] text-xs font-bold text-stone-800">
              {totals.freeShippingApplied ? (
                <span className="text-emerald-800">
                  🎉 طلبك مؤهل للحصول على شحن مجاني!
                </span>
              ) : (
                <span>
                  أضف منتجات بقيمة{' '}
                  <strong className="font-mono-num text-[#8A5606]">
                    {formatPriceEGP(Math.max(0, 500 - totals.subtotal))}
                  </strong>{' '}
                  إضافية للحصول على شحن مجاني!
                </span>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-base font-bold text-stone-800">
                    سلة التسوق فارغة حالياً
                  </p>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto">
                    تصفح متجر مصنع الجزيرة واختر من العجانات الكهربائية، الأفران الصناعية، أو قطع الغيار الأصلية.
                  </p>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block px-5 py-2.5 rounded-lg bg-[#1E1B16] text-white text-xs font-bold hover:bg-[#8A5606] transition-colors"
                  >
                    تصفح المنتجات الآن
                  </Link>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3.5 p-3 rounded-xl border border-stone-200 bg-white"
                  >
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="w-20 h-20 rounded-lg bg-stone-100 overflow-hidden shrink-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-sm font-bold text-stone-900 hover:text-[#8A5606] line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <div className="text-xs text-stone-500 font-mono-num mt-0.5">
                        {formatPriceEGP(product.price)} × {quantity}
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center border border-stone-300 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            aria-label="تقليل الكمية"
                            className="p-1.5 text-stone-700 hover:bg-stone-100 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold font-mono-num text-stone-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                            aria-label="زيادة الكمية"
                            className="p-1.5 text-stone-700 hover:bg-stone-100 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`حذف ${product.name}`}
                          className="p-1.5 text-stone-500 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-stone-700">
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold font-mono-num">
                      {formatPriceEGP(totals.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>مصاريف الشحن:</span>
                    <span className="font-bold font-mono-num text-emerald-800">
                      {totals.shipping === 0
                        ? 'مجاني'
                        : formatPriceEGP(totals.shipping)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-extrabold text-stone-900">
                    <span>الإجمالي الكلي:</span>
                    <span className="font-mono-num text-[#8A5606]">
                      {formatPriceEGP(totals.total)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="py-2.5 px-4 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold text-center transition-colors"
                  >
                    عرض السلة
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="py-2.5 px-4 rounded-lg bg-[#8A5606] hover:bg-[#6E4404] text-white text-xs font-bold text-center transition-colors"
                  >
                    إتمام الطلب
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer matching Al-Jazira Industries dark theme with high-contrast text */}
      <footer className="bg-[#231F1A] text-stone-200 pt-14 pb-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-700/70">
            {/* Col 1: Factory Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/brand/logo.png"
                  alt="مصنع الجزيرة"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                />
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    مصنع الجزيرة
                  </h3>
                  <p className="text-xs text-[#F5C451] font-semibold">
                    للصناعات الهندسية الحديثة
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                مصنع الجزيرة للصناعات الهندسية - مصنع مصري متخصص في تصنيع العجانات الكهربائية والأفران بجودة عالية، يقدم حلولاً صناعية متكاملة تشمل التصنيع وقطع الغيار والصيانة المنزلية.
              </p>
            </div>

            {/* Col 2: Quick Links & Legal */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-extrabold text-white mb-4">
                  روابط سريعة
                </h4>
                <ul className="space-y-2.5 text-sm text-stone-300">
                  <li>
                    <Link to="/" className="hover:text-[#F5C451] transition-colors">
                      الرئيسية
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" className="hover:text-[#F5C451] transition-colors">
                      المتجر
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="hover:text-[#F5C451] transition-colors">
                      خدماتنا
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-[#F5C451] transition-colors">
                      من نحن
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-[#F5C451] transition-colors">
                      تواصل معنا
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white mb-4">
                  معلومات قانونية
                </h4>
                <ul className="space-y-2.5 text-sm text-stone-300">
                  <li>
                    <Link to="/privacy" className="hover:text-[#F5C451] transition-colors">
                      سياسة الخصوصية
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="hover:text-[#F5C451] transition-colors">
                      الشروط والأحكام
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="hover:text-[#F5C451] transition-colors">
                      الأسئلة الشائعة
                    </Link>
                  </li>
                  <li>
                    <Link to="/track-order" className="hover:text-[#F5C451] transition-colors">
                      تتبع الطلب
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Col 3: Contact Info */}
            <div>
              <h4 className="text-sm font-extrabold text-white mb-4">
                تواصل معنا
              </h4>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F5C451] shrink-0" />
                  <a
                    href="tel:+201065050165"
                    dir="ltr"
                    className="font-mono-num hover:text-[#F5C451] transition-colors"
                  >
                    +20 106 5050165
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#F5C451] shrink-0" />
                  <span dir="ltr" className="font-mono-num">
                    01065050165 - 01226060955
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F5C451] shrink-0" />
                  <span>القاهرة، مصر (والتوصيل لجميع المحافظات)</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Newsletter & Social */}
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-extrabold text-white mb-3">
                  النشرة البريدية
                </h4>
                <p className="text-xs text-stone-300 mb-3">
                  اشترك ليصلك أحدث عروض العجانات والأفران وتوفر قطع الغيار.
                </p>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-center gap-2"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="البريد الإلكتروني"
                    aria-label="البريد الإلكتروني للنشرة البريدية"
                    className="flex-1 min-w-0 bg-stone-800/90 border border-stone-600 focus:border-[#F5C451] rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#C8860A] hover:bg-[#B47814] text-stone-950 font-extrabold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    اشترك
                  </button>
                </form>
                {newsletterSubscribed && (
                  <p className="text-xs text-emerald-400 mt-2 font-semibold">
                    تم تسجيل بريدك بنجاح!
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-300 mb-2.5">
                  تابعنا على
                </h4>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'فيسبوك', href: 'https://facebook.com' },
                    { label: 'انستجرام', href: 'https://instagram.com' },
                    { label: 'تيك توك', href: 'https://tiktok.com' },
                    { label: 'واتساب', href: 'https://wa.me/201065050165' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 rounded-md bg-stone-800 hover:bg-[#C8860A] hover:text-stone-950 text-stone-200 text-xs font-semibold transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
            <p dir="ltr">
              Developed by <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="text-[#F5C451] font-bold hover:underline">A.Z Agency</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
