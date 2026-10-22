import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  PackageSearch,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { useStore, OrderRecord } from '../context/StoreContext';
import { calculateCartTotals, formatPriceEGP } from '../utils/shopLogic';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();
  const totals = calculateCartTotals(cart);

  return (
    <div className="pb-16">
      <section className="bg-[#231F1A] text-white py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl font-black text-white">سلة التسوق</h1>
          <p className="text-sm text-stone-300">
            مراجعة المنتجات المختارة قبل إتمام الطلب
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4 max-w-xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto" />
            <h2 className="text-xl font-extrabold text-stone-900">
              سلة التسوق فارغة حالياً
            </h2>
            <p className="text-sm text-stone-600">
              لم تقم بإضافة أي منتجات بعد. استعرض كتالوج العجانات والأفران وقطع الغيار الأصلية.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-extrabold transition-colors"
            >
              <span>تصفح المتجر الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <h2 className="text-base font-extrabold text-stone-900">
                  المنتجات ({totals.itemCount})
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-red-700 hover:underline cursor-pointer"
                >
                  إفراغ السلة
                </button>
              </div>

              <div className="divide-y divide-stone-200">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/product/${product.slug}`}
                        className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div>
                        <span className="text-xs font-bold text-[#8A5606] block">
                          {product.category} · {product.sku}
                        </span>
                        <Link
                          to={`/product/${product.slug}`}
                          className="text-base font-extrabold text-stone-900 hover:text-[#8A5606]"
                        >
                          {product.name}
                        </Link>
                        <div className="text-xs font-bold text-stone-600 mt-1 font-mono-num">
                          سعر الوحدة: {formatPriceEGP(product.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="inline-flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label="تقليل الكمية"
                          className="p-2 text-stone-800 hover:bg-stone-200 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 text-sm font-black font-mono-num text-stone-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          aria-label="زيادة الكمية"
                          className="p-2 text-stone-800 hover:bg-stone-200 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-base font-black text-stone-900 font-mono-num min-w-[90px] text-left">
                        {formatPriceEGP(product.price * quantity)}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`حذف ${product.name}`}
                        className="p-2 text-stone-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
              <h2 className="text-lg font-extrabold text-stone-900 pb-3 border-b border-stone-200">
                ملخص الطلب
              </h2>
              <div className="space-y-2.5 text-sm">
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
                <div className="pt-3 border-t border-stone-200 flex justify-between text-lg font-black text-stone-950">
                  <span>الإجمالي الكلي:</span>
                  <span className="font-mono-num text-[#8A5606]">
                    {formatPriceEGP(totals.total)}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-3.5 px-6 rounded-xl bg-[#C8860A] hover:bg-[#B47814] text-stone-950 font-black text-sm text-center block transition-colors"
              >
                المتابعة لإتمام الطلب
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CheckoutPage: React.FC = () => {
  const { cart, placeOrder, showToast } = useStore();
  const totals = calculateCartTotals(cart);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'instapay' | 'bank'>(
    'cod'
  );
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      showToast('يرجى استكمال الاسم ورقم الهاتف والعنوان بالتفصيل');
      return;
    }
    const order = placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      governorate,
      address: address.trim(),
      notes: notes.trim(),
      paymentMethod,
    });
    setConfirmedOrder(order);
    showToast(`تم تأكيد طلبك بنجاح! رقم الطلب: ${order.id}`);
  };

  if (confirmedOrder) {
    return (
      <div className="py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-emerald-800">
              تم تسجيل طلبك في مصنع الجزيرة
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              شكراً لثقتك بنا يا {confirmedOrder.customerName}!
            </h1>
            <p className="text-sm text-stone-700">
              رقم الطلب الخاص بك هو:{' '}
              <code className="font-mono-num font-black bg-stone-100 border border-stone-300 px-3 py-1 rounded text-[#8A5606]">
                {confirmedOrder.id}
              </code>
            </p>
          </div>

          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-right space-y-2 text-xs text-stone-800">
            <div className="flex justify-between">
              <span className="font-bold">الحالة الحالية:</span>
              <span className="font-extrabold text-emerald-800">
                {confirmedOrder.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">العنوان:</span>
              <span>
                {confirmedOrder.governorate} — {confirmedOrder.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">الإجمالي المطلوب عند الاستلام:</span>
              <span className="font-black font-mono-num text-sm text-[#8A5606]">
                {formatPriceEGP(confirmedOrder.total)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to={`/track-order?id=${confirmedOrder.id}`}
              className="px-6 py-3 rounded-xl bg-[#1E1B16] hover:bg-[#8A5606] text-white text-xs font-extrabold transition-colors"
            >
              تتبع حالة الطلب
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-900 text-xs font-extrabold transition-colors"
            >
              مواصلة التسوق
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <section className="bg-[#231F1A] text-white py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl font-black text-white">إتمام الطلب</h1>
          <p className="text-sm text-stone-300">
            الدفع عند الاستلام بعد المعاينة · شحن سريع لجميع محافظات مصر
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4 max-w-xl mx-auto">
            <p className="text-lg font-extrabold text-stone-900">
              سلة التسوق فارغة
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 rounded-xl bg-[#1E1B16] text-white text-xs font-bold"
            >
              العودة للمتجر
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleCheckoutSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-5">
              <h2 className="text-xl font-extrabold text-stone-900">
                بيانات الشحن والتوصيل
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                    الاسم الثلاثي *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسم المستلم"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#8A5606]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                    رقم الموبايل / واتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010xxxxxxxx"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#8A5606]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  المحافظة *
                </label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-bold text-stone-900 outline-none focus:border-[#8A5606]"
                >
                  {[
                    'القاهرة',
                    'الجيزة',
                    'الإسكندرية',
                    'أسيوط',
                    'المنيا',
                    'سوهاج',
                    'قنا',
                    'الأقصر',
                    'أسوان',
                    'بني سويف',
                    'الفيوم',
                    'الغربية',
                    'الدقهلية',
                    'الشرقية',
                    'المنوفية',
                    'البحيرة',
                  ].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  العنوان بالتفصيل *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="المركز / الحي، اسم الشارع، رقم العقار أو علامة مميزة"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none focus:border-[#8A5606]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-2">
                  طريقة الدفع
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'cod', label: 'الدفع عند الاستلام (نقدي)' },
                    { id: 'instapay', label: 'إنستا باي / فودافون كاش' },
                    { id: 'bank', label: 'تحويل بنكي للمصنع' },
                  ].map((pm) => (
                    <label
                      key={pm.id}
                      className={`p-3 rounded-xl border text-xs font-extrabold cursor-pointer flex items-center gap-2 ${
                        paymentMethod === pm.id
                          ? 'bg-[#FAF6EE] border-[#8A5606] text-stone-950'
                          : 'bg-stone-50 border-stone-300 text-stone-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === pm.id}
                        onChange={() =>
                          setPaymentMethod(
                            pm.id as 'cod' | 'instapay' | 'bank'
                          )
                        }
                        className="accent-[#8A5606]"
                      />
                      <span>{pm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-900 mb-1.5">
                  ملاحظات إضافية للمندوب (اختياري)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مواعيد التواجد المفضلة..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-[#8A5606]"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
              <h2 className="text-lg font-extrabold text-stone-900 pb-3 border-b border-stone-200">
                ملخص طلبك ({totals.itemCount} منتج)
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-lg object-cover border border-stone-200"
                      />
                      <div>
                        <div className="font-extrabold text-stone-900">
                          {product.name}
                        </div>
                        <div className="text-stone-600 font-mono-num">
                          الكمية: {quantity}
                        </div>
                      </div>
                    </div>
                    <span className="font-extrabold font-mono-num text-stone-900">
                      {formatPriceEGP(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2 text-sm">
                <div className="flex justify-between text-stone-700">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold font-mono-num">
                    {formatPriceEGP(totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>الشحن والتوصيل:</span>
                  <span className="font-bold font-mono-num text-emerald-800">
                    {totals.shipping === 0
                      ? 'مجاني'
                      : formatPriceEGP(totals.shipping)}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between text-lg font-black text-stone-950">
                  <span>الإجمالي الكلي:</span>
                  <span className="font-mono-num text-[#8A5606]">
                    {formatPriceEGP(totals.total)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#C8860A] hover:bg-[#B47814] text-stone-950 font-black text-sm transition-colors cursor-pointer shadow-sm"
              >
                تأكيد الطلب الآن ({formatPriceEGP(totals.total)})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export const TrackOrderPage: React.FC = () => {
  const { orders } = useStore();
  const [queryId, setQueryId] = useState('JZ-2026-1042');
  const foundOrder = orders.find(
    (o) =>
      o.id.toLowerCase() === queryId.trim().toLowerCase() ||
      o.phone === queryId.trim()
  );

  return (
    <div className="pb-16">
      <section className="bg-[#231F1A] text-white py-12 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl font-black text-white">تتبع الطلب</h1>
          <p className="text-sm text-stone-300">
            أدخل رقم الطلب (مثال: JZ-2026-1042) أو رقم الهاتف لمتابعة حالة الشحن
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <label className="block text-xs font-extrabold text-stone-900 mb-2">
            رقم الطلب أو رقم الموبايل
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={queryId}
              onChange={(e) => setQueryId(e.target.value)}
              placeholder="مثال: JZ-2026-1042"
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-mono-num text-stone-900 outline-none focus:border-[#8A5606]"
            />
          </div>
        </div>

        {foundOrder ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-stone-600 block">
                  رقم الطلب الموثق
                </span>
                <h2 className="text-xl font-black font-mono-num text-stone-900">
                  {foundOrder.id}
                </h2>
              </div>
              <span className="px-3.5 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-extrabold">
                {foundOrder.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-stone-600 font-bold mb-1">اسم العميل</div>
                <div className="font-extrabold text-stone-900">
                  {foundOrder.customerName}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-stone-600 font-bold mb-1">وجهة الشحن</div>
                <div className="font-extrabold text-stone-900">
                  {foundOrder.governorate} — {foundOrder.address}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="text-stone-600 font-bold mb-1">إجمالي الطلب</div>
                <div className="font-black font-mono-num text-[#8A5606] text-sm">
                  {formatPriceEGP(foundOrder.total)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-sm text-stone-700">
            لم يتم العثور على طلب بهذا الرقم. يمكنك تجربة رقم الطلب التجريبي:{' '}
            <button
              type="button"
              onClick={() => setQueryId('JZ-2026-1042')}
              className="font-mono-num font-bold text-[#8A5606] underline cursor-pointer"
            >
              JZ-2026-1042
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const isPrivacy = type === 'privacy';
  return (
    <div className="pb-16">
      <section className="bg-[#231F1A] text-white py-12 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <h1 className="text-3xl font-black text-white">
            {isPrivacy ? 'سياسة الخصوصية' : 'الشروط والأحكام'}
          </h1>
          <p className="text-sm text-stone-300">
            مصنع الجزيرة للصناعات الهندسية الحديثة — التزام تام بحقوق العملاء والضمان المعتمد
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-5 text-sm text-stone-800 leading-relaxed shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
            <ShieldCheck className="w-6 h-6 text-[#8A5606]" />
            <h2 className="text-lg font-extrabold text-stone-900">
              {isPrivacy
                ? 'حماية بيانات عملاء مصنع الجزيرة'
                : 'بنود الضمان والشحن والاستبدال'}
            </h2>
          </div>
          <p>
            يلتزم مصنع الجزيرة للصناعات الهندسية الحديثة بالحفاظ على سرية بيانات العملاء (الاسم، رقم الهاتف، العنوان) واستخدامها حصرياً لأغراض توصيل الطلبات وتفعيل شهادة الضمان وخدمات الصيانة المنزلية.
          </p>
          <p>
            جميع العجانات والأفران الصناعية المشمولة بالضمان تتمتع بضمان مصنعي شامل لمدة عامين ضد عيوب الصناعة، مع أحقية العميل في الاستبدال أو الإرجاع خلال 30 يوماً من تاريخ الفاتورة وفقاً لشروط سلامة المنتج.
          </p>
        </div>
      </div>
    </div>
  );
};
