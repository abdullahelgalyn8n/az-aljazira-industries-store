import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/catalog';

export const FaqPage: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    'الكل',
    'المنتجات والضمان',
    'الصيانة وقطع الغيار',
    'الشحن والطلبات',
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (selectedCategory !== 'الكل' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pb-16">
      {/* High-Contrast Hero Header (Fixes the washed-out white header on the original FAQ screenshot) */}
      <section className="bg-[#231F1A] text-white py-14 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            الأسئلة الشائعة
          </h1>
          <p className="text-base text-stone-300">
            اعثر على إجابات وافية للأسئلة الشائعة حول منتجات مصنع الجزيرة، الضمان، الصيانة المنزلية، وقطع الغيار الأصلية
          </p>

          <div className="max-w-lg mx-auto relative pt-2">
            <Search className="w-5 h-5 text-stone-500 absolute right-4 top-1/2 -translate-y-1/2 mt-1" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن سؤالك (مثال: الضمان، الصيانة، الشحن)..."
              aria-label="ابحث في الأسئلة الشائعة"
              className="w-full bg-white text-stone-900 placeholder:text-stone-500 rounded-full pr-12 pl-5 py-3 text-sm font-medium outline-none border-2 border-transparent focus:border-[#E09F1F]"
            />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1E1B16] text-white shadow-xs'
                  : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs divide-y divide-stone-200 overflow-hidden">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div key={faq.id} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-right hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#8A5606] block">
                      {faq.category}
                    </span>
                    <span className="text-base font-extrabold text-stone-900 block">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#1E1B16] text-[#F5C451]'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-stone-700 leading-relaxed bg-stone-50/60 border-t border-stone-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Callout */}
        <div className="bg-[#FAF6EE] rounded-2xl border border-[#DFC082] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1E1B16] text-[#F5C451] flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-stone-900">
                لم تجد إجابة لسؤالك؟
              </h2>
              <p className="text-sm text-stone-700 mt-1">
                فريق خدمة عملاء مصنع الجزيرة متاح للرد على جميع استفساراتك الفنية والتجارية.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-extrabold transition-colors whitespace-nowrap shrink-0"
          >
            تواصل معنا الآن
          </Link>
        </div>
      </section>
    </div>
  );
};
