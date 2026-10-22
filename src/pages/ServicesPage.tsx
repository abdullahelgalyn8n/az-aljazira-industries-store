import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  Settings,
  Wrench,
  Truck,
  Headphones,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ServicesPage: React.FC = () => {
  const { showToast } = useStore();
  const [serviceName, setServiceName] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [serviceGov, setServiceGov] = useState('القاهرة');
  const [serviceType, setServiceType] = useState('صيانة منزلية لعجانة');
  const [serviceDetails, setServiceDetails] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const services = [
    {
      id: 'manufacturing',
      icon: Factory,
      title: 'التصنيع الهندسي',
      description:
        'تصنيع أجهزة كهربائية هندسية بمعايير جودة عالية، وتطوير خطوط العجانات والأفران وفق احتياجات السوق المصري والعربي.',
      features: [
        'تصميم وتصنيع بسعات خاصة للمخابز والمصانع',
        'استخدام ستانلس ستيل 304 غذائي ومواتير نحاس 100%',
      ],
      actionLabel: 'تصفح منتجات المصنع',
      actionLink: '/shop',
    },
    {
      id: 'spare-parts',
      icon: Settings,
      title: 'قطع الغيار الأصلية',
      description:
        'توفير قطع غيار أصلية مع توافق كامل مع منتجات المصنع لضمان أعلى أداء وأطول عمر افتراضي للمعدة.',
      features: [
        'علب وتروس جرابوكس فولاذية معالجة حرارياً',
        'شحن فوري لجميع قطع الغيار لأي محافظة',
      ],
      actionLabel: 'اطلب قطع الغيار',
      actionLink: '/shop?category=قطع الغيار',
    },
    {
      id: 'maintenance',
      icon: Wrench,
      title: 'الصيانة المنزلية والدعم الفني',
      description:
        'صيانة معتمدة للأجهزة والمعدات مع فريق فني متخصص. خدمة سريعة وموثوقة داخل القاهرة وجميع محافظات مصر.',
      features: [
        'فحص وإصلاح بالمنزل أو المخبز بقطع غيار أصلية',
        'ضمان معتمد على جميع أعمال الصيانة والإصلاح',
      ],
      actionLabel: 'احجز موعد صيانة بالأسفل',
      actionLink: '#book-service',
    },
    {
      id: 'delivery',
      icon: Truck,
      title: 'التوصيل لجميع المحافظات',
      description:
        'خدمة توصيل سريعة وموثوقة لجميع محافظات مصر مع دعم التركيب والتشغيل الاحترافي للمعدات الثقيلة.',
      features: [
        'تغليف آمن يحمي المعدات أثناء النقل لمسافات طويلة',
        'شحن مجاني لطلبات قطع الغيار فوق 500 جنيه',
      ],
      actionLabel: 'تتبع شحنتك',
      actionLink: '/track-order',
    },
    {
      id: 'consultation',
      icon: Headphones,
      title: 'الاستشارات الفنية وتجهيز المخابز',
      description:
        'استشارات فنية مجانية لمساعدتك في اختيار المعدات والسعات المناسبة لاحتياجات مخبزك أو مطعمك أو مشروعك المنزلي.',
      features: [
        'حساب القدرة الإنتاجية واستهلاك الطاقة المناسب',
        'ترشيح الموديلات الأنسب لميزانيتك ومساحة المكان',
      ],
      actionLabel: 'تواصل مع مهندس المبيعات',
      actionLink: '/contact',
    },
    {
      id: 'warranty',
      icon: ShieldCheck,
      title: 'ضمان ممتد ومعتمد',
      description:
        'ضمان لمدة عامين على جميع المنتجات مع تغطية شاملة وقطع غيار مجانية خلال فترة الضمان.',
      features: [
        'شهادة ضمان مختومة من مصنع الجزيرة مع كل منتج',
        'استبدال فوري في حالة وجود أي عيب صناعة',
      ],
      actionLabel: 'الأسئلة الشائعة عن الضمان',
      actionLink: '/faq',
    },
  ];

  const handleServiceBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || !servicePhone.trim()) {
      showToast('يرجى إدخال الاسم ورقم الهاتف لتأكيد طلب الصيانة');
      return;
    }
    const ticketId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket(ticketId);
    showToast(`تم تسجيل طلب الصيانة رقم ${ticketId} بنجاح!`);
  };

  return (
    <div className="pb-16">
      {/* Dark Hero Header */}
      <section className="bg-[#231F1A] text-white py-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-white">خدماتنا</h1>
          <p className="text-base text-stone-300 max-w-2xl mx-auto">
            نقدم حلولاً صناعية وهندسية متكاملة لتلبية جميع احتياجاتكم من التصنيع، قطع الغيار الأصلية، والصيانة المنزلية المعتمدة
          </p>
        </div>
      </section>

      {/* 6 Services Grid (High-Contrast Light Mode Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-stone-200/90 hover:border-[#8A5606] p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#C8860A] text-stone-950 flex items-center justify-center mx-auto shadow-xs">
                  <srv.icon className="w-8 h-8 stroke-[2.2]" />
                </div>

                <h2 className="text-xl font-extrabold text-stone-900">
                  {srv.title}
                </h2>

                <p className="text-sm text-stone-700 leading-relaxed">
                  {srv.description}
                </p>

                <ul className="space-y-2 pt-3 border-t border-stone-100 text-right">
                  {srv.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs font-bold text-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#8A5606] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200/80 text-center">
                {srv.actionLink.startsWith('#') ? (
                  <a
                    href={srv.actionLink}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-[#1E1B16] text-stone-900 hover:text-white text-xs font-extrabold transition-colors"
                  >
                    <span>{srv.actionLabel}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    to={srv.actionLink}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-[#1E1B16] text-stone-900 hover:text-white text-xs font-extrabold transition-colors"
                  >
                    <span>{srv.actionLabel}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Maintenance & Technical Consultation Booking Section */}
      <section
        id="book-service"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
      >
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-extrabold text-[#8A5606] block mb-1">
              خدمة عملاء وصيانة مصنع الجزيرة
            </span>
            <h2 className="text-2xl font-black text-stone-900">
              طلب صيانة منزلية أو استشارة فنية
            </h2>
            <p className="text-sm text-stone-700 mt-1">
              سجل بياناتك وسيتواصل معك مهندس الصيانة المختص خلال ساعات لتحديد الموعد أو توفير قطعة الغيار المطلوبة
            </p>
          </div>

          {submittedTicket ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="text-lg font-extrabold text-emerald-950">
                تم استلام طلب الخدمة بنجاح!
              </h3>
              <p className="text-sm text-emerald-900">
                رقم تذكرة الصيانة الخاصة بك:{' '}
                <strong className="font-mono-num">{submittedTicket}</strong>
              </p>
              <p className="text-xs text-emerald-800">
                سيتصل بك فريق الدعم الفني على الرقم {servicePhone} لتأكيد موعد الزيارة.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedTicket(null);
                  setServiceName('');
                  setServicePhone('');
                  setServiceDetails('');
                }}
                className="px-5 py-2 rounded-lg bg-emerald-800 text-white text-xs font-bold cursor-pointer"
              >
                إرسال طلب آخر
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleServiceBooking}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  رقم الهاتف / واتساب *
                </label>
                <input
                  type="tel"
                  required
                  value={servicePhone}
                  onChange={(e) => setServicePhone(e.target.value)}
                  placeholder="010xxxxxxxx"
                  className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  المحافظة
                </label>
                <select
                  value={serviceGov}
                  onChange={(e) => setServiceGov(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm font-bold text-stone-900 outline-none"
                >
                  <option value="القاهرة">القاهرة</option>
                  <option value="الجيزة">الجيزة</option>
                  <option value="الإسكندرية">الإسكندرية</option>
                  <option value="أسيوط">أسيوط</option>
                  <option value="المنيا">المنيا</option>
                  <option value="سوهاج">سوهاج</option>
                  <option value="قنا">قنا</option>
                  <option value="الغربية">الغربية</option>
                  <option value="الدقهلية">الدقهلية</option>
                  <option value="الشرقية">الشرقية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  نوع الخدمة المطلوبة
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm font-bold text-stone-900 outline-none"
                >
                  <option value="صيانة منزلية لعجانة">صيانة منزلية لعجانة</option>
                  <option value="صيانة فرن صناعي / منزلي">
                    صيانة فرن صناعي / منزلي
                  </option>
                  <option value="تركيب قطعة غيار أصلية">
                    تركيب قطعة غيار أصلية
                  </option>
                  <option value="استشارة لتجهيز مخبز أو مطعم">
                    استشارة لتجهيز مخبز أو مطعم
                  </option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  وصف العطل أو تفاصيل الطلب
                </label>
                <textarea
                  rows={3}
                  value={serviceDetails}
                  onChange={(e) => setServiceDetails(e.target.value)}
                  placeholder="اذكر موديل العجانة أو الفرن وتفاصيل الخدمة المطلوبة..."
                  className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C8860A] hover:bg-[#B47814] text-stone-950 font-black text-sm transition-colors cursor-pointer shadow-xs"
                >
                  تأكيد حجز طلب الصيانة / الاستشارة
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
