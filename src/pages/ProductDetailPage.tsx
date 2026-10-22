import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Zap,
  Heart,
  Star,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Share2,
  MessageCircle,
} from 'lucide-react';
import {
  PRODUCTS,
  INITIAL_REVIEWS,
  ProductReview,
} from '../data/catalog';
import {
  findProductByIdentifier,
  getRelatedProducts,
  formatPriceEGP,
} from '../utils/shopLogic';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const product = findProductByIdentifier(PRODUCTS, productSlug || '');

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews'>(
    'specs'
  );
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setReviews(
        INITIAL_REVIEWS[product.id] || [
          {
            id: `default-${product.id}`,
            author: 'عميل موثق - مصنع الجزيرة',
            role: 'مشتري معتمد',
            rating: 5,
            date: 'منذ شهر',
            comment: `${product.name} ممتاز جداً وخاماته أصلية ومطابقة للمواصفات الهندسية.`,
          },
        ]
      );
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <h1 className="text-2xl font-black text-stone-900">
          عذراً، لم يتم العثور على هذا المنتج
        </h1>
        <p className="text-sm text-stone-600">
          قد يكون الرابط غير صحيح أو تم نقل المنتج إلى قسم آخر في المتجر.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 rounded-xl bg-[#1E1B16] text-white text-sm font-bold hover:bg-[#8A5606] transition-colors"
        >
          العودة إلى المتجر الكامل
        </Link>
      </div>
    );
  }

  const wished = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(PRODUCTS, product, 4);
  const galleryImages = product.gallery?.length
    ? product.gallery
    : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/checkout');
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}/product/${product.slug}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    showToast(`تم نسخ رابط المنتج: /product/${product.slug}`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      showToast('يرجى كتابة الاسم والتعليق لإضافة التقييم');
      return;
    }
    const added: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      role: 'عميل متجر الجزيرة',
      rating: newReviewRating,
      date: 'الآن',
      comment: newReviewComment.trim(),
    };
    setReviews((prev) => [added, ...prev]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    showToast('شكراً لك! تم نشر تقييمك للمنتج بنجاح');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* High-Contrast Breadcrumb */}
      <nav
        aria-label="مسار الصفحة"
        className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-stone-700 bg-white px-4 py-3 rounded-xl border border-stone-200"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-[#8A5606] transition-colors">
            الرئيسية
          </Link>
          <span className="text-stone-400">/</span>
          <Link to="/shop" className="hover:text-[#8A5606] transition-colors">
            المتجر
          </Link>
          <span className="text-stone-400">/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="text-[#8A5606] hover:underline"
          >
            {product.category}
          </Link>
          <span className="text-stone-400">/</span>
          <span className="text-stone-950 font-extrabold">{product.name}</span>
        </div>

        <button
          type="button"
          onClick={handleShareLink}
          className="inline-flex items-center gap-1.5 text-stone-800 hover:text-[#8A5606] transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>مشاركة رابط المنتج</span>
        </button>
      </nav>

      {/* Main Contiguous Purchase Module (2-Column Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Right Column in RTL: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square w-full rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden relative">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.onSale && product.originalPrice && (
              <span className="absolute top-4 right-4 bg-[#1E1B16] text-[#F5C451] text-xs font-extrabold px-3 py-1.5 rounded-lg">
                خصم خاص — وفر {formatPriceEGP(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  aria-label={`صورة المنتج ${idx + 1}`}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === imgUrl
                      ? 'border-[#8A5606] ring-2 ring-[#8A5606]/30'
                      : 'border-stone-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} - ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Left Column in RTL: Contiguous Purchase Module */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
                <span className="text-[#8A5606]">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">كود المنتج: {product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
                {product.name}
              </h1>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label="إضافة إلى المفضلة"
              className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                wished
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-stone-50 border-stone-300 text-stone-800 hover:bg-stone-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${wished ? 'fill-red-600' : ''}`} />
            </button>
          </div>

          {/* Rating & Availability */}
          <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? 'fill-[#C8860A] text-[#C8860A]'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-extrabold text-stone-900 font-mono-num">
                {product.rating}
              </span>
              <span className="text-xs text-stone-600 font-medium">
                ({reviews.length} تقييمات)
              </span>
            </div>

            <span className="text-stone-300">|</span>

            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>
                متوفر في المصنع ({product.stockCount} قطعة جاهزة للشحن)
              </span>
            </div>
          </div>

          {/* Price Display */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-[#8A5606] font-mono-num">
              {formatPriceEGP(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-stone-500 line-through font-mono-num">
                {formatPriceEGP(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-stone-600 font-semibold">
              (شامل ضريبة القيمة المضافة)
            </span>
          </div>

          {/* Description Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-stone-900">الوصف</h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Highlights List */}
          <ul className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
            {product.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs font-bold text-stone-800"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8A5606] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Quantity Stepper */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-stone-800">
              الكمية المطلوبة
            </label>
            <div className="flex items-center justify-between border border-stone-300 rounded-xl px-4 py-2.5 bg-stone-50">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="إنقاص الكمية"
                className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-900 hover:bg-stone-100 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-black font-mono-num text-stone-950">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stockCount, q + 1))
                }
                aria-label="زيادة الكمية"
                className="w-8 h-8 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-900 hover:bg-stone-100 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High-Contrast Action Buttons (Fixes the washed-out tan buttons in original screenshot) */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3.5 px-6 rounded-xl bg-[#1E1B16] hover:bg-stone-800 text-white font-extrabold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5C451]" />
              <span>
                أضف للسلة ({formatPriceEGP(product.price * quantity)})
              </span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-xl bg-[#E09F1F] hover:bg-[#C8860A] text-stone-950 font-black text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>اشتر الآن — الدفع عند الاستلام</span>
            </button>

            <a
              href={`https://wa.me/201065050165?text=${encodeURIComponent(
                `مرحباً مصنع الجزيرة، أرغب في الاستفسار عن منتج: ${product.name} (${product.sku})`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-6 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-900 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span>اطلب أو استفسر مباشرة عبر واتساب المبيعات</span>
            </a>
          </div>

          {/* Warranty & Shipping Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-200 text-xs">
            <div className="flex items-center gap-2.5 text-stone-800 font-bold">
              <ShieldCheck className="w-5 h-5 text-[#8A5606] shrink-0" />
              <span>{product.warranty}</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-800 font-bold">
              <Truck className="w-5 h-5 text-[#8A5606] shrink-0" />
              <span>توصيل سريع لجميع محافظات مصر</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specs & Customer Reviews Tabs */}
      <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 pt-3 gap-2">
          {[
            { id: 'specs', label: 'المواصفات الفنية والهندسية' },
            { id: 'description', label: 'تفاصيل الصناعة والتشغيل' },
            { id: 'reviews', label: `تقييمات العملاء (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id as 'specs' | 'description' | 'reviews')
              }
              className={`px-5 py-3 text-xs sm:text-sm font-extrabold rounded-t-xl border-t border-x transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white border-stone-200 text-[#8A5606] -mb-px'
                  : 'border-transparent text-stone-700 hover:text-stone-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <h3 className="text-base font-extrabold text-stone-900 mb-4">
                جدول المواصفات القياسية لـ {product.name}
              </h3>
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-right">
                  <tbody className="divide-y divide-stone-200">
                    {product.specs.map((spec, idx) => (
                      <tr
                        key={spec.label}
                        className={idx % 2 === 0 ? 'bg-stone-50/70' : 'bg-white'}
                      >
                        <th className="py-3.5 px-4 font-extrabold text-stone-900 w-1/3 border-l border-stone-200">
                          {spec.label}
                        </th>
                        <td className="py-3.5 px-4 font-medium text-stone-800">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'description' && (
            <div className="max-w-3xl space-y-4 text-sm text-stone-800 leading-relaxed">
              <p className="font-bold text-base text-stone-900">
                {product.subtitle}
              </p>
              <p>{product.description}</p>
              <p>
                يتم تصنيع واختبار هذا المنتج داخل خطوط إنتاج مصنع الجزيرة للصناعات الهندسية الحديثة تحت إشراف مهندسين وفنيين متخصصين لضمان مطابقة الأبعاد القياسية، وجودة الخامات المعدنية والكهربائية، وتوفير قطع الغيار الأصلية على المدى الطويل.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-extrabold text-stone-900">
                          {rev.author}
                        </span>
                        <span className="text-xs text-stone-600 mr-2">
                          · {rev.role}
                        </span>
                      </div>
                      <span className="text-xs text-stone-500">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#C8860A] text-[#C8860A]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-stone-800">{rev.comment}</p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 bg-stone-50 p-5 rounded-xl border border-stone-200">
                <h4 className="text-sm font-extrabold text-stone-900 mb-3">
                  أضف تقييمك للمنتج
                </h4>
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      الاسم
                    </label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="أدخل اسمك"
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      التقييم
                    </label>
                    <select
                      value={newReviewRating}
                      onChange={(e) =>
                        setNewReviewRating(Number(e.target.value))
                      }
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-bold text-stone-900"
                    >
                      <option value={5}>5 نجوم - ممتاز جداً</option>
                      <option value={4}>4 نجوم - جيد جداً</option>
                      <option value={3}>3 نجوم - جيد</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      رأيك في المنتج
                    </label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="شارك تجربتك مع هذا المنتج..."
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    إرسال التقييم
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-stone-900">منتجات مشابهة</h2>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="text-xs font-extrabold text-[#8A5606] hover:underline"
          >
            عرض كل {product.category}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>
    </div>
  );
};
