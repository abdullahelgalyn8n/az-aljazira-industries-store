import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      showToast('يرجى إدخال الاسم والرسالة قبل الإرسال');
      return;
    }
    setSubmitted(true);
    showToast('تم إرسال رسالتك إلى فريق مصنع الجزيرة بنجاح!');
  };

  return (
    <div className="pb-16">
      {/* Dark Hero Header */}
      <section className="bg-[#231F1A] text-white py-14 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            اتصل بنا
          </h1>
          <p className="text-base text-stone-300">
            تواصل مع فريق مبيعات وصيانة مصنع الجزيرة للصناعات الهندسية
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column in RTL: Contact Form ("أرسل لنا رسالة") */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-extrabold text-stone-900 mb-2">
              أرسل لنا رسالة
            </h2>
            <p className="text-xs text-stone-600 mb-6">
              نسعد بتلقي استفساراتكم وطلبات عروض الأسعار للمخابز والتجار والأفراد
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h3 className="text-lg font-extrabold text-emerald-950">
                  شكراً لتواصلك معنا يا {name}!
                </h3>
                <p className="text-sm text-emerald-900">
                  تم استلام رسالتك بنجاح وسيتواصل معك فريق خدمة العملاء في أقرب وقت.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                >
                  إرسال رسالة جديدة
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                    الاسم *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك"
                    className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="أدخل بريدك الإلكتروني"
                      className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                      رقم الهاتف / واتساب
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010xxxxxxxx"
                      className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                    الرسالة *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full bg-stone-50 border border-stone-300 focus:border-[#8A5606] rounded-xl px-4 py-3 text-sm text-stone-900 placeholder:text-stone-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C8860A] hover:bg-[#B47814] text-stone-950 font-black text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>

          {/* Left Column in RTL: Contact Cards + Cairo Map + Socials */}
          <div className="lg:col-span-6 space-y-6">
            {/* 4 Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-600 mb-1">
                    الهاتف
                  </div>
                  <a
                    href="tel:+201065050165"
                    dir="ltr"
                    className="text-sm font-black font-mono-num text-stone-900 hover:text-[#8A5606]"
                  >
                    +20 106 5050165
                  </a>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#C8860A] text-stone-950 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-600 mb-1">
                    واتساب
                  </div>
                  <a
                    href="https://wa.me/201065050165"
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                    className="text-xs font-black font-mono-num text-stone-900 hover:text-[#8A5606] block"
                  >
                    01065050165 - 01226060955
                  </a>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#C8860A] text-stone-950 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-600 mb-1">
                    البريد الإلكتروني
                  </div>
                  <a
                    href="mailto:support@matjarcom.com"
                    dir="ltr"
                    className="text-xs font-black font-mono-num text-stone-900 hover:text-[#8A5606]"
                  >
                    support@matjarcom.com
                  </a>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#C8860A] text-stone-950 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-600 mb-1">
                    العنوان
                  </div>
                  <div className="text-sm font-black text-stone-900">
                    القاهرة، مصر
                  </div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#C8860A] text-stone-950 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Cairo Map Card */}
            <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs relative">
              <img
                src="/assets/brand/cairo-map.png"
                alt="خريطة موقع مصنع الجزيرة - القاهرة، مصر"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-extrabold text-stone-900">
                    مركز المبيعات والتوزيع — القاهرة، مصر
                  </div>
                  <div className="text-[11px] text-stone-600">
                    مواعيد العمل: السبت إلى الخميس من 9 صباحاً حتى 9 مساءً
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Cairo,Egypt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-bold transition-colors shrink-0"
                >
                  <span>فتح في الخرائط</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-extrabold text-stone-900">
                تابعنا على منصات التواصل
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'Facebook', href: 'https://facebook.com' },
                  { name: 'Instagram', href: 'https://instagram.com' },
                  { name: 'TikTok', href: 'https://tiktok.com' },
                  { name: 'WhatsApp', href: 'https://wa.me/201065050165' },
                ].map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-[#1E1B16] text-stone-800 hover:text-white text-xs font-bold transition-colors border border-stone-200"
                  >
                    {soc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
