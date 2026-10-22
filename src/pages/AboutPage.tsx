import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  TrendingUp,
  Target,
  Eye,
  HeartHandshake,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pb-16">
      {/* 1. Hero Header */}
      <section className="bg-[#231F1A] text-white py-14 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            عن مصنع الجزيرة
          </h1>
          <p className="text-base text-stone-200 leading-relaxed">
            مصنع الجزيرة للصناعات الهندسية هو أحد الكيانات الصناعية المصرية المتخصصة في تصنيع الأجهزة الكهربائية الهندسية، وعلى رأسها العجانات الكهربائية والأفران، حيث استطاع المصنع أن يفرض اسمه بقوة في السوق المصري بفضل جودة منتجاته واعتماديته العالية.
          </p>
        </div>
      </section>

      {/* 2. Key Statistics Strip */}
      <section className="bg-white border-b border-stone-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-14 h-14 rounded-full bg-[#C8860A] text-stone-950 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Users className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="text-3xl font-black text-[#8A5606] font-mono-num">
                2001
              </div>
              <div className="text-sm font-bold text-stone-800 mt-1">
                سنة التأسيس
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-14 h-14 rounded-full bg-[#C8860A] text-stone-950 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Award className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="text-3xl font-black text-[#8A5606] font-mono-num">
                100%
              </div>
              <div className="text-sm font-bold text-stone-800 mt-1">
                صناعة مصرية
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="w-14 h-14 rounded-full bg-[#C8860A] text-stone-950 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <TrendingUp className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div className="text-3xl font-black text-[#8A5606] font-mono-num">
                20+
              </div>
              <div className="text-sm font-bold text-stone-800 mt-1">
                سنة خبرة
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values (Fixed Contrast in Light Mode!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {[
            {
              icon: Target,
              title: 'مهمتنا',
              text: 'تقديم منتجات هندسية مصرية عالية الجودة، تلبي احتياجات السوق المحلي، وتساهم في تقليل الاعتماد على الاستيراد، مع توفير خدمات صيانة ودعم فني تضمن ثقة العملاء على المدى الطويل.',
            },
            {
              icon: Eye,
              title: 'رؤيتنا',
              text: 'أن يكون مصنع الجزيرة من أكبر وأقوى الكيانات الصناعية الهندسية في مصر والشرق الأوسط، ورمزاً للجودة والاعتماد على المنتج المصري.',
            },
            {
              icon: HeartHandshake,
              title: 'قيمنا',
              text: 'إحياء الصناعات المصرية وتقوية الاقتصاد المصري — إيماناً بأن الصناعة المحلية هي العمود الفقري للتنمية المستدامة.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-stone-200/90 p-7 text-center shadow-xs space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1E1B16] text-[#F5C451] flex items-center justify-center mx-auto">
                <card.icon className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900">
                {card.title}
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed font-medium">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Our Story Section */}
      <section className="bg-stone-100/90 border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-extrabold text-[#8A5606] block">
                مسيرة أكثر من عقدين من الإنجاز
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                قصتنا
              </h2>
              <p className="text-base text-stone-800 leading-relaxed">
                انطلق مصنع الجزيرة للصناعات الهندسية منذ عام 2001 برؤية واضحة تهدف إلى دعم الصناعة الوطنية وتقديم منتجات هندسية مصرية بمعايير جودة عالية تنافس المنتجات المستوردة.
              </p>
              <p className="text-base text-stone-800 leading-relaxed">
                من قلب صعيد مصر، استطاع المصنع أن يوسّع نطاق أعماله ليغطي مختلف محافظات الجمهورية، معتمداً على خبرات هندسية متخصصة وخطوط إنتاج تركّز على الكفاءة، المتانة، وسهولة الاستخدام. يقدّم المصنع منظومة متكاملة تشمل: توفير قطع الغيار الأصلية، خدمات الصيانة والدعم الفني، وحلول ما بعد البيع لضمان رضا العملاء واستمرارية الأداء.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E1B16] hover:bg-[#8A5606] text-white text-sm font-bold transition-colors"
                >
                  <span>استعرض منتجات المصنع</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-md bg-white">
                <img
                  src="/assets/brand/about-story.png"
                  alt="فريق العمل الهندسي في مصنع الجزيرة"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Al-Jazira Factory? */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            لماذا مصنع الجزيرة؟
          </h2>
          <p className="text-sm text-stone-700 mt-1.5">
            مقومات النجاح التي جعلت مصنع الجزيرة الاختيار الأول للبيوت والمخابز المصرية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'شركة تصنيع مصرية 100%',
            'ريادة صناعية من قلب صعيد مصر لكل الجمهورية',
            'انتشار واسع وثقة في السوق المصري',
            'منتجات بجودة عالية وأسعار تنافسية مباشرة من المصنع',
            'منظومة متكاملة (تصنيع - قطع غيار أصلية - صيانة)',
            'التزام بدعم الاقتصاد والصناعة الوطنية',
          ].map((reason) => (
            <div
              key={reason}
              className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs"
            >
              <div className="w-9 h-9 rounded-full bg-[#FAF6EE] border border-[#C8860A] text-[#8A5606] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-extrabold text-stone-900">
                {reason}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
