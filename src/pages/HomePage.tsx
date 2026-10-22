import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Truck,
  CreditCard,
  Headphones,
  RotateCcw,
  Factory,
  Award,
  Wrench,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';
import {
  PRODUCTS,
  CATEGORIES,
  TESTIMONIALS,
  ProductCategory,
} from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | ProductCategory>('all');

  const displayedProducts =
    activeTab === 'all'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative bg-[#1D1914] text-white overflow-hidden border-b border-stone-800">
        {/* Background Industrial Image with high-contrast measured scrim */}
        <div className="absolute inset-0 opacity-25">
          <img
            src="/assets/brand/hero-mixer-bg.png"
            alt="خطوط إنتاج مصنع الجزيرة"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-left"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#181410] via-[#1D1914]/95 to-[#1D1914]/75" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Right Column: Primary Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5C451] tracking-wide">
                <Factory className="w-4 h-4" />
                <span>صناعة مصرية 100% · منذ عام 2001</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black leading-[1.18] text-white">
                رائدون في الصناعة الهندسية المصرية
              </h1>

              <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
                مصنع الجزيرة للصناعات الهندسية الحديثة — أكثر من 25 عاماً من التميز في تصنيع العجانات الكهربائية والأفران الصناعية وقطع الغيار الأصلية بأعلى معايير الجودة والاعتمادية. صنع في مصر بفخر.
              </p>

              {/* Primary & Secondary CTAs with high contrast */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-7 py-3.5 rounded-xl bg-[#E09F1F] hover:bg-[#C8860A] text-stone-950 font-black text-sm transition-all flex items-center gap-2.5 shadow-lg"
                >
                  <span>تصفح جميع المنتجات ({PRODUCTS.length})</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm transition-colors"
                >
                  اعرف المزيد عن المصنع
                </Link>
              </div>

              {/* Key Quantitative Proof Metrics */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#F5C451] font-mono-num">
                    +25
                  </div>
                  <div className="text-xs text-stone-300 font-semibold mt-0.5">
                    سنة خبرة صناعية
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#F5C451] font-mono-num">
                    100%
                  </div>
                  <div className="text-xs text-stone-300 font-semibold mt-0.5">
                    تصنيع مصري أصلي
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#F5C451] font-mono-num">
                    2 سنة
                  </div>
                  <div className="text-xs text-stone-300 font-semibold mt-0.5">
                    ضمان شامل ومعتمد
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column: Direct Category & Service Cards */}
            <div className="lg:col-span-5 space-y-4">
              <Link
                to="/shop?category=العجانات الكهربائية"
                className="group flex items-center justify-between p-5 rounded-2xl bg-stone-900/90 hover:bg-stone-800/95 border border-stone-700/80 hover:border-[#F5C451]/60 transition-all"
              >
                <div className="space-y-1">
                  <h2 className="text-base font-extrabold text-white group-hover:text-[#F5C451] transition-colors">
                    العجانات الكهربائية
                  </h2>
                  <p className="text-xs text-stone-300">
                    سعات متعددة (10، 15، 25، 40، 50 كجم) بحلة ستانلس 304 وموتور نحاس
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#E09F1F]/20 border border-[#E09F1F]/40 flex items-center justify-center text-[#F5C451] shrink-0">
                  <Factory className="w-6 h-6" />
                </div>
              </Link>

              <Link
                to="/shop?category=الأفران الصناعية"
                className="group flex items-center justify-between p-5 rounded-2xl bg-stone-900/90 hover:bg-stone-800/95 border border-stone-700/80 hover:border-[#F5C451]/60 transition-all"
              >
                <div className="space-y-1">
                  <h2 className="text-base font-extrabold text-white group-hover:text-[#F5C451] transition-colors">
                    الأفران الصناعية والمنزلية
                  </h2>
                  <p className="text-xs text-stone-300">
                    أفران خبيز وفطائر وكونفكشن بعزل حراري فائق وتوزيع متوازن
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#E09F1F]/20 border border-[#E09F1F]/40 flex items-center justify-center text-[#F5C451] shrink-0">
                  <Award className="w-6 h-6" />
                </div>
              </Link>

              <Link
                to="/shop?category=قطع الغيار"
                className="group flex items-center justify-between p-5 rounded-2xl bg-stone-900/90 hover:bg-stone-800/95 border border-stone-700/80 hover:border-[#F5C451]/60 transition-all"
              >
                <div className="space-y-1">
                  <h2 className="text-base font-extrabold text-white group-hover:text-[#F5C451] transition-colors">
                    قطع الغيار والصيانة المعتمدة
                  </h2>
                  <p className="text-xs text-stone-300">
                    جرابوكسات، تروس صلب، مواتير نحاس، وصيانة منزلية لجميع المحافظات
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#E09F1F]/20 border border-[#E09F1F]/40 flex items-center justify-center text-[#F5C451] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value & Trust Strip (High-contrast Light Mode) */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: 'شحن سريع لجميع المحافظات',
                desc: 'شحن مجاني لطلبات قطع الغيار فوق 500 جنيه',
              },
              {
                icon: CreditCard,
                title: 'طرق دفع مرنة وآمنة',
                desc: 'الدفع عند الاستلام أو عبر المحافظ البنكية',
              },
              {
                icon: Headphones,
                title: 'دعم فني وهندسي متخصص',
                desc: 'استشارات فنية مجانية للمخابز والمطاعم',
              },
              {
                icon: RotateCcw,
                title: 'ضمان شامل وإرجاع سهل',
                desc: 'ضمان مصنع الجزيرة لمدة عامين وسياسة إرجاع 30 يوم',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 p-3 rounded-xl bg-stone-50/80 border border-stone-200/80"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1E1B16] text-[#F5C451] flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Browse Categories + Featured Products Catalog */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Structured Category Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-extrabold text-[#8A5606] block mb-1">
                خطوط الإنتاج الرئيسية
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                تصفح أقسام مصنع الجزيرة
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-bold text-[#8A5606] hover:text-stone-900 flex items-center gap-1.5"
            >
              <span>عرض الكتالوج الكامل ({PRODUCTS.length} منتج)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${encodeURIComponent(cat.id)}`}
                className="group bg-white rounded-2xl border border-stone-200 hover:border-[#8A5606] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/9] bg-stone-100 overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-white">
                    <h3 className="text-lg font-extrabold">{cat.name}</h3>
                    <span className="text-xs font-mono-num bg-[#E09F1F] text-stone-950 font-black px-2.5 py-1 rounded-md">
                      {cat.count} منتجات
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between gap-3 bg-white">
                  <p className="text-xs text-stone-700 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="text-xs font-extrabold text-[#8A5606] group-hover:translate-x-[-4px] transition-transform shrink-0 flex items-center gap-1">
                    <span>تصفح</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured & Categorized Product Grid */}
        <div className="pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-extrabold text-[#8A5606] block mb-1">
                منتجات المصنع الأصلية
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                منتجات مميزة وأكثر طلباً
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-xl">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'العجانات الكهربائية', label: 'العجانات الكهربائية' },
                { id: 'الأفران الصناعية', label: 'الأفران الصناعية' },
                { id: 'قطع الغيار', label: 'قطع الغيار الأصلية' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as 'all' | ProductCategory)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#1E1B16] text-white shadow-xs'
                      : 'text-stone-800 hover:bg-stone-300/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1E1B16] hover:bg-[#8A5606] text-white font-bold text-sm transition-colors shadow-sm"
            >
              <span>استعراض جميع المنتجات في المتجر ({PRODUCTS.length} منتج)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Factory Story & Industrial Craftsmanship Section */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div>
                <span className="text-xs font-extrabold text-[#8A5606] block mb-1">
                  منذ عام 2001 · ريادة الصناعة الوطنية
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-stone-900 leading-tight">
                  الجزيرة للصناعات الهندسية الحديثة
                </h2>
              </div>

              <p className="text-base text-stone-700 leading-relaxed">
                يُعد مصنع الجزيرة رائداً في تصنيع العجانات الكهربائية والأفران الصناعية في مصر. نجمع بين التكنولوجيا الهندسية الحديثة والخامات المعتمدة لتقديم معدات عالية الجودة تخدم المنازل والمخابز والمطاعم والمنشآت الغذائية في جميع أنحاء الجمهورية والشرق الأوسط.
              </p>

              <blockquote className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E2CCA0] text-sm font-extrabold text-[#6E4404]">
                «إحياء الصناعات المصرية وتقوية الاقتصاد الوطني بمنتج هندسي ينافس المستورد ويدوم لسنوات»
              </blockquote>

              {/* High-contrast Feature Pillars (Fixing the low-contrast cream icons from original screenshot) */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <div className="w-10 h-10 rounded-lg bg-[#1E1B16] text-[#F5C451] flex items-center justify-center mx-auto mb-2.5">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-extrabold text-stone-900">
                    تصنيع مصري 100%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <div className="w-10 h-10 rounded-lg bg-[#1E1B16] text-[#F5C451] flex items-center justify-center mx-auto mb-2.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-extrabold text-stone-900">
                    جودة هندسية عالية
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                  <div className="w-10 h-10 rounded-lg bg-[#1E1B16] text-[#F5C451] flex items-center justify-center mx-auto mb-2.5">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-extrabold text-stone-900">
                    صيانة وقطع غيار
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8A5606] hover:bg-[#6E4404] text-white text-sm font-bold transition-colors"
                >
                  <span>اعرف المزيد عنا</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-900 text-sm font-bold transition-colors"
                >
                  <span>استكشف خدمات الصيانة</span>
                </Link>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[340px] rounded-2xl overflow-hidden border border-stone-200 shadow-md">
                <img
                  src="/assets/brand/factory-hall.png"
                  alt="خطوط الإنتاج داخل مصنع الجزيرة للصناعات الهندسية"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 left-4 bg-[#1E1B16]/90 backdrop-blur-xs text-white p-4 rounded-xl border border-white/15 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-extrabold text-[#F5C451]">
                      خطوط إنتاج متكاملة ورقابة جودة صارمة
                    </div>
                    <div className="text-xs text-stone-300 mt-0.5">
                      اختبار فعلي لكل عجانة وفرن قبل الخروج من المصنع
                    </div>
                  </div>
                  <span className="font-mono-num text-xs font-bold bg-white/10 px-3 py-1 rounded-md">
                    ISO Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#8A5606] block mb-1">
            ثقة عملائنا في جميع المحافظات
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            آراء عملائنا
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            ماذا يقول أصحاب المخابز والمطاعم وربات البيوت عن تجربتهم مع منتجات مصنع الجزيرة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#C8860A] text-[#C8860A]"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>
                <p className="text-sm text-stone-800 leading-relaxed font-medium mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-full bg-[#1E1B16] text-[#F5C451] font-extrabold text-xs flex items-center justify-center shrink-0">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-stone-900">
                    {item.name}
                  </div>
                  <div className="text-xs text-stone-600">
                    {item.role} · {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
