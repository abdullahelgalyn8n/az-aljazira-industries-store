export type ProductCategory = 'العجانات الكهربائية' | 'الأفران الصناعية' | 'قطع الغيار';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  onSale: boolean;
  image: string;
  gallery?: string[];
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  warranty: string;
  createdAt: string;
}

export const CATEGORIES: {
  id: ProductCategory;
  slug: string;
  name: ProductCategory;
  description: string;
  count: number;
  image: string;
}[] = [
  {
    id: 'العجانات الكهربائية',
    slug: 'electric-mixers',
    name: 'العجانات الكهربائية',
    description: 'عجانات ستانلس ستيل أصلية بسعات متعددة للمنازل والمخابز والمطاعم بموتور نحاس خالص.',
    count: 6,
    image: '/assets/products/electric-mixer.png',
  },
  {
    id: 'الأفران الصناعية',
    slug: 'industrial-ovens',
    name: 'الأفران الصناعية',
    description: 'أفران خبيز وفطائر وحلواني بتوزيع حراري متساوي وعزل حراري فائق الكفاءة.',
    count: 5,
    image: '/assets/products/industrial-oven.png',
  },
  {
    id: 'قطع الغيار',
    slug: 'spare-parts',
    name: 'قطع الغيار',
    description: 'قطع غيار أصلية 100% من مصنع الجزيرة مباشرة مع ضمان التوافق التام والعمر الطويل.',
    count: 10,
    image: '/assets/products/gearbox-housing.png',
  },
];

export const PRODUCTS: Product[] = [
  // === 1. ORIGINAL 9 PRODUCTS FROM SCREENSHOTS (WITH ENHANCED ENGINEERING DETAILS) ===
  {
    id: 'prod-electric-mixer-main',
    slug: 'aljazira-electric-mixer-25kg',
    sku: 'JZ-MX-250',
    name: 'عجانة الجزيرة الكهربائية ستانلس (25 كجم)',
    subtitle: 'عجانة خدمة شاقة بحلة ستانلس ستيل 304 غذائي وجرابوكس تروس صلب معالج',
    category: 'العجانات الكهربائية',
    price: 7500,
    originalPrice: 8200,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 14,
    featured: true,
    onSale: true,
    image: '/assets/products/electric-mixer.png',
    gallery: [
      '/assets/products/electric-mixer.png',
      '/assets/products/mixer-25kg.png',
      '/assets/products/stainless-bowl.png',
    ],
    description:
      'عجانة مصنع الجزيرة الأصلية سعة 25 كجم، مصممة خصيصاً لتحمل ضغط العمل اليومي في المخابز والمطاعم والمنازل الكبيرة. مزودة بحلة من الستانلس ستيل الغذائي عالي السماكة غير قابل للصدأ، مع صندوق تروس (جرابوكس) هندسي مانع للتسريب وموتور ملفات نحاس 100% يضمن عزماً قوياً مع استهلاك اقتصادي للكهرباء.',
    highlights: [
      'حلة ستانلس ستيل 304 غذائي بسماكة عالية مقاومة للصدأ والأحماض',
      'جرابوكس تروس صلب معالج حرارياً يعمل بهدوء تام وبدون اهتزاز',
      'موتور ملفات نحاس 100% يتحمل التشغيل المتواصل في درجات الحرارة العالية',
      'ضمان شامل لمدة عامين مع توفر كافة قطع الغيار الأصلية من المصنع',
    ],
    specs: [
      { label: 'السعة الفعلية', value: '25 كجم عجين (حلة 35 لتر)' },
      { label: 'قدرة المحرك', value: '1.5 حصان - ملفات نحاس خالص' },
      { label: 'خامة الحلة والسلاح', value: 'ستانلس ستيل 304 غذائي معتمد' },
      { label: 'الجهد الكهربائي', value: '220 فولت / 50 هرتز (كهرباء منزلية)' },
      { label: 'ناقل الحركة', value: 'جرابوكس تروس فولاذية + سير مسنن' },
      { label: 'بلد المنشأ', value: 'صناعة مصرية 100% - مصنع الجزيرة' },
    ],
    warranty: 'ضمان شامل لمدة عامين + صيانة منزلية معتمدة',
    createdAt: '2026-10-18',
  },
  {
    id: 'prod-industrial-oven-main',
    slug: 'aljazira-industrial-bakery-oven',
    sku: 'JZ-OV-550',
    name: 'فرن الجزيرة الصناعي للخبيز والمخبوزات',
    subtitle: 'فرن صناعي عالي الكفاءة بتوزيع حراري متساوي وعزل صوف صخري حراري',
    category: 'الأفران الصناعية',
    price: 5500,
    originalPrice: 6100,
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    stockCount: 9,
    featured: true,
    onSale: true,
    image: '/assets/products/industrial-oven.png',
    gallery: [
      '/assets/products/industrial-oven.png',
      '/assets/products/oven-double-deck.png',
      '/assets/products/oven-convection.png',
    ],
    description:
      'فرن الجزيرة الصناعي المصمم لتقديم تسوية مثالية وموحدة للخبز، الفطائر، القرص، والمخبوزات الشرقية والغربية. يتميز بهيكل معدني مزدوج معزول بطبقات الصوف الصخري الكثيف للاحتفاظ بالحرارة وتقليل استهلاك الغاز أو الكهرباء بنسبة تصل إلى 35%.',
    highlights: [
      'توزيع حراري متوازن من الأسفل والأعلى لضمان نضج موحد',
      'عزل حراري كامل بالصوف الصخري يحافظ على برودة السطح الخارجي',
      'بلاطة خبيز سميكة تتحمل درجات الحرارة العالية حتى 400 درجة مئوية',
      'محابس وشعلات أمان نحاسية عالية الاعتمادية',
    ],
    specs: [
      { label: 'نوع التشغيل', value: 'غاز طبيعي أو أنبوبة + إشعال' },
      { label: 'العزل الحراري', value: 'صوف صخري كثافة 100 كجم/م3' },
      { label: 'سمك الصاج الداخلي', value: '3 مم محمل معالج ضد التقوس' },
      { label: 'أقصى درجة حرارة', value: '400 درجة مئوية' },
      { label: 'الأبعاد الخارجية', value: '110 × 90 × 125 سم' },
      { label: 'بلد المنشأ', value: 'صناعة مصرية 100% - مصنع الجزيرة' },
    ],
    warranty: 'ضمان شامل لمدة عامين شامل الشعلات والهيكل',
    createdAt: '2026-10-17',
  },
  {
    id: 'a78459cd-a724-4fe8-a5d6-0f894d00ddf6',
    slug: 'pull-button',
    sku: 'JZ-SP-400',
    name: 'زرار سحب (مقبض تعشيق عجانة أصلي)',
    subtitle: 'مقبض سحب وتعشيق فولاذي برأس بوليسترين مقوى لعجانات الجزيرة',
    category: 'قطع الغيار',
    price: 400,
    rating: 4.5,
    reviewCount: 16,
    inStock: true,
    stockCount: 5,
    featured: true,
    onSale: false,
    image: '/assets/products/pull-button.png',
    gallery: ['/assets/products/pull-button.png', '/assets/products/gearbox-housing.png'],
    description:
      'زرار سحب (مقبض تعشيق وتثبيت) أصلي من إنتاج مصنع الجزيرة للصناعات الهندسية. مصنوع من عمود صلب مخروط بدقة عالية مع مقبض مريح مقاوم للحرارة والاحتكاك لضمان سهولة تعشيق وفصل حركة العجانة بأمان تام.',
    highlights: [
      'عمود فولاذي مخروط بدقة ميكانيكية عالية مقاوم للتآكل',
      'مقبض أملس مريح لليد يتحمل السحب المتكرر في المخابز',
      'متوافق 100% مع جميع موديلات عجانات الجزيرة (15 و25 و50 كجم)',
    ],
    specs: [
      { label: 'الخامة الأساسية', value: 'صلب كربوني معالج + مقبض بولي أميد مقوى' },
      { label: 'الاستخدام', value: 'تعشيق وتثبيت رأس العجانة' },
      { label: 'التوافق', value: 'جميع عجانات الجزيرة القياسية' },
      { label: 'بلد المنشأ', value: 'مصر - مصنع الجزيرة الأصلي' },
    ],
    warranty: 'ضمان توافق واستبدال لمدة 6 أشهر',
    createdAt: '2026-10-16',
  },
  {
    id: 'prod-gearbox-housing',
    slug: 'gearbox-housing',
    sku: 'JZ-SP-125',
    name: 'علبة جرابوكس عجانة أصلية',
    subtitle: 'فانوس وعلبة تروس جرابوكس هندسية مقواة لعجانات الجزيرة',
    category: 'قطع الغيار',
    price: 1250,
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    stockCount: 18,
    featured: true,
    onSale: false,
    image: '/assets/products/gearbox-housing.png',
    description:
      'علبة جرابوكس (صندوق التروس) الأصلية لعجانات الجزيرة الكهربائية. مصبوبة بدقة هندسية فائقة مع أعصاب تقوية داخلية لتحمل أقصى أحمال العجن الثقيل، ومزودة بمبيّت قياسي لرولمان البلي والأويل سيل لمنع أي تسريب للشحم.',
    highlights: [
      'أعصاب تقوية داخلية تمنع الكسر أو الشروخ تحت الأحمال العالية',
      'أبعاد قياسية مطابقة لمواصفات المصنع لتركيب فوري بدون تعديل',
      'عزل محكم يحافظ على شحم التروس الداخلي ويطيل عمر البلي',
    ],
    specs: [
      { label: 'الخامة', value: 'بوليمر هندسي مسلح عالي الكثافة / سبيكة مقواة' },
      { label: 'الوزن التقريبي', value: '1.85 كجم' },
      { label: 'التوافق', value: 'عجانات الجزيرة 15 كجم و25 كجم' },
      { label: 'الملحقات', value: 'علبة الجرابوكس جاهزة لتركيب البلي والتروس' },
    ],
    warranty: 'ضمان استبدال ضد عيوب الصناعة لمدة عام',
    createdAt: '2026-10-15',
  },
  {
    id: 'prod-mixer-tray-axle',
    slug: 'mixer-tray-with-axle',
    sku: 'JZ-SP-550',
    name: 'صينية عجانة بالاكس محملة',
    subtitle: 'صينية ارتكاز حلة العجانة كاملة بعمود الأكس الفولاذي المخرط',
    category: 'قطع الغيار',
    price: 550,
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    stockCount: 22,
    featured: false,
    onSale: false,
    image: '/assets/products/mixer-tray-axle.png',
    description:
      'صينية عجانة كاملة بعمود الأكس من مصنع الجزيرة. تعمل كقاعدة دوران متزنة لحلة العجانة، ملحومة ومخروطة بدقة لضمان دوران انسيابي مركزي بدون رفة أو اهتزاز أثناء خلط العجين الثقيل.',
    highlights: [
      'قرص صلب متزن ديناميكياً لمنع اهتزاز الحلة أثناء الدوران',
      'عمود أكس فولاذي صلب ملحوم بزاوية عمودية دقيقة 90 درجة',
      'طلاء حراري مقاوم للصدأ والرطوبة',
    ],
    specs: [
      { label: 'الخامة', value: 'صلب كربوني محمل سمك 8 مم' },
      { label: 'قطر الصينية', value: '24 سم قياسي' },
      { label: 'قطر الأكس', value: '20 مم مخروط للبلي القياسي' },
      { label: 'بلد المنشأ', value: 'مصر - مصنع الجزيرة' },
    ],
    warranty: 'ضمان لمدة عام ضد الكسر أو الانحناء',
    createdAt: '2026-10-14',
  },
  {
    id: 'prod-gearbox-cover',
    slug: 'gearbox-cover-no-bearing',
    sku: 'JZ-SP-750',
    name: 'غطاء جرابوكس بدون بلي',
    subtitle: 'وش جرابوكس علوي أصلي بفتحات تثبيت قياسية مزدوجة',
    category: 'قطع الغيار',
    price: 750,
    rating: 4.6,
    reviewCount: 12,
    inStock: true,
    stockCount: 15,
    featured: false,
    onSale: false,
    image: '/assets/products/gearbox-cover.png',
    description:
      'غطاء علبة الجرابوكس الأصلي (بدون رولمان بلي) لعجانات الجزيرة. مصمم لإحكام غلق صندوق التروس وحماية المجموعة الميكانيكية من الأتربة والدقيق، مع تطابق تام لفتحات المسامير ومبيّت الأعمدة.',
    highlights: [
      'إحكام غلق تام يمنع دخول الدقيق أو الرطوبة لعلبة التروس',
      'فتحات مسامير قياسية متطابقة مع علبة جرابوكس الجزيرة',
      'مقاوم للحرارة والالتواء مع الاستخدام الطويل',
    ],
    specs: [
      { label: 'النوع', value: 'غطاء جرابوكس علوي (بدون بلي)' },
      { label: 'عدد فتحات التثبيت', value: '8 فتحات محيطية + مبيّت مزدوج' },
      { label: 'التوافق', value: 'علبة جرابوكس الجزيرة القياسية' },
      { label: 'بلد المنشأ', value: 'مصر - مصنع الجزيرة' },
    ],
    warranty: 'ضمان توافق أصلي 100%',
    createdAt: '2026-10-13',
  },
  {
    id: 'prod-mixer-tray-bearing',
    slug: 'mixer-tray-bearing-seat',
    sku: 'JZ-SP-450',
    name: 'كرسي صينية عجانة',
    subtitle: 'بيت بلي وكرسي تحميل صينية العجانة من الصلب المكبوس',
    category: 'قطع الغيار',
    price: 450,
    rating: 4.6,
    reviewCount: 14,
    inStock: true,
    stockCount: 27,
    featured: false,
    onSale: false,
    image: '/assets/products/mixer-tray-bearing.png',
    description:
      'كرسي صينية عجانة (مبيّت تحميل رولمان البلي السفلي) مصنوع من الصلب المكبوس على البارد ليتحمل الوزن الرأسي لحلة العجين أثناء الدوران بسرعات عالية.',
    highlights: [
      'مكبوس من قطعة واحدة بدون لحامات لضمان أقصى متانة',
      'سطح مصقول مقاوم للصدأ والتآكل',
      'يحافظ على استقامة محور دوران صينية العجانة',
    ],
    specs: [
      { label: 'الخامة', value: 'صلب مكبوس معالج السطح' },
      { label: 'الوظيفة', value: 'حامل ومبيّت بلي صينية العجانة' },
      { label: 'التوافق', value: 'عجانات الجزيرة بجميع سعاتها' },
    ],
    warranty: 'ضمان لمدة عام',
    createdAt: '2026-10-12',
  },
  {
    id: 'prod-power-switch',
    slug: 'industrial-power-switch',
    sku: 'JZ-SP-350',
    name: 'مفتاح كهرباء أون/أوف صناعي',
    subtitle: 'مفتاح تشغيل وفصل محمل بلمبة بيان داخلية للأحمال العالية',
    category: 'قطع الغيار',
    price: 350,
    rating: 4.5,
    reviewCount: 21,
    inStock: true,
    stockCount: 40,
    featured: false,
    onSale: false,
    image: '/assets/products/power-switch.png',
    description:
      'مفتاح تشغيل كهربائي صناعي (On/Off) أصلي بلمبة إشارة مدمجة، مخصص لتحمل تيار بدء تشغيل مواتير العجانات والأفران الكهربائية دون سخونة أو شرار كهربائي.',
    highlights: [
      'نقاط تلامس داخلية من النحاس والفضة تتحمل حتى 30 أمبير',
      'لمبة بيان مدمجة عالية الوضوح لبيان حالة التشغيل',
      'إطار عازل مقاوم للحرارة والغبار ورذاذ الماء',
    ],
    specs: [
      { label: 'التيار الأقصى', value: '25 - 30 أمبير / 250 فولت' },
      { label: 'الإضاءة', value: 'لمبة بيان نيون حمراء مدمجة' },
      { label: 'التركيب', value: 'كباس قياسي سهل التركيب في تابلوه العجانة' },
    ],
    warranty: 'ضمان استبدال لمدة 6 أشهر',
    createdAt: '2026-10-11',
  },
  {
    id: 'prod-power-cable',
    slug: 'heavy-duty-power-cable',
    sku: 'JZ-SP-175',
    name: 'كبل كهرباء محمل بفيشة صناعية',
    subtitle: 'كابل تغذية كهربائية نحاس شعر محمل بطول 3 أمتار وعزل مزدوج',
    category: 'قطع الغيار',
    price: 175,
    rating: 4.7,
    reviewCount: 29,
    inStock: true,
    stockCount: 55,
    featured: false,
    onSale: false,
    image: '/assets/products/power-cable.png',
    description:
      'كبل كهرباء أصلي محمل من النحاس الشعر النقي مع فيشة صب متينة وعروة تثبيت مانعة للشد، مصمم خصيصاً لتشغيل العجانات الكهربائية والمعدات الهندسية بأمان تام دون سخونة الكابل.',
    highlights: [
      'قلب نحاس شعر نقي 100% بقطر 2×2.5 مم لتحمل الأحمال المستمرة',
      'طبقة عزل خارجية PVC مرنة مقاومة للزيوت والحرارة والقطع',
      'مزود بمانع شد (Stress Relief) لحماية نقاط التوصيل بالمحرك',
    ],
    specs: [
      { label: 'طول الكابل', value: '3 أمتار كاملة' },
      { label: 'مقطع السلك', value: '2 × 2.5 مم نحاس شعر معتمد' },
      { label: 'الفيشة', value: 'فيشة صب محملة 16 أمبير بالأرضي' },
    ],
    warranty: 'ضمان لمدة 6 أشهر',
    createdAt: '2026-10-10',
  },

  // === 2. EXPANDED CATALOG: MORE MIXERS, OVENS, AND SPARE PARTS (11 MORE ITEMS = 20 TOTAL) ===
  {
    id: 'prod-mixer-15kg',
    slug: 'aljazira-electric-mixer-15kg',
    sku: 'JZ-MX-150',
    name: 'عجانة الجزيرة ستانلس سعة 15 كجم (العائلية والتجارية)',
    subtitle: 'الحجم المثالي للمنازل الكبيرة ومشاريع المخبوزات والحلويات المنزلية',
    category: 'العجانات الكهربائية',
    price: 5800,
    originalPrice: 6300,
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    stockCount: 19,
    featured: true,
    onSale: true,
    image: '/assets/products/mixer-15kg.png',
    gallery: ['/assets/products/mixer-15kg.png', '/assets/products/electric-mixer.png'],
    description:
      'عجانة الجزيرة سعة 15 كجم تجمع بين الحجم العملي والقوة الصناعية. مثالية للعائلات المصرية ومشاريع الخبيز والفطير والبيتزا من المنزل، بحلة ستانلس 304 وموتور نحاس هادئ الصوت.',
    highlights: [
      'سعة مثالية من 2 كجم حتى 15 كجم عجين بكفاءة خلط عالية',
      'تصميم مدمج لا يشغل مساحة كبيرة في المطبخ مع ثبات كامل',
      'استهلاك اقتصادي للكهرباء وصوت هادئ بفضل الجرابوكس المطور',
    ],
    specs: [
      { label: 'السعة الفعلية', value: '15 كجم عجين (حلة 22 لتر)' },
      { label: 'قدرة المحرك', value: '1 حصان - ملفات نحاس 100%' },
      { label: 'خامة الحلة', value: 'ستانلس ستيل 304 غير قابل للصدأ' },
      { label: 'الضمان', value: 'عامان شامل من مصنع الجزيرة' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-09',
  },
  {
    id: 'prod-mixer-50kg',
    slug: 'aljazira-heavy-mixer-50kg',
    sku: 'JZ-MX-500',
    name: 'عجانة الجزيرة العملاقة سعة 50 كجم للمخابز',
    subtitle: 'عجانة إنتاجية شاقة للمخابز البلدية والأفرنجية والمطاعم الكبرى',
    category: 'العجانات الكهربائية',
    price: 12500,
    originalPrice: 13500,
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    stockCount: 7,
    featured: true,
    onSale: true,
    image: '/assets/products/mixer-50kg.png',
    gallery: ['/assets/products/mixer-50kg.png', '/assets/products/electric-mixer.png'],
    description:
      'عجانة الخدمة الشاقة سعة 50 كجم من مصنع الجزيرة، مصممة للعمل المتواصل على مدار الساعة في المخابز والمصانع الغذائية. شاسيه فولاذي سميك مدعم وموتور 2.5 حصان عالي العزم.',
    highlights: [
      'شاسيه فولاذي ثقيل مانع للاهتزاز مع قواعد تثبيت أرضية',
      'سلاح عجن مزدوج السماكة يضمن تجانس شيكارة الدقيق الكاملة في دقائق',
      'جرابوكس صناعي مقوى يتحمل التشغيل المستمر لورديات متتالية',
    ],
    specs: [
      { label: 'السعة الفعلية', value: '50 كجم عجين (شيكارة كاملة)' },
      { label: 'قدرة المحرك', value: '2.5 حصان - 220 أو 380 فولت' },
      { label: 'سمك الحلة', value: '2.5 مم ستانلس ستيل 304' },
      { label: 'وزن المعدة', value: '95 كجم تقريباً' },
    ],
    warranty: 'ضمان شامل لمدة عامين + زيارات صيانة دورية',
    createdAt: '2026-10-08',
  },
  {
    id: 'prod-spiral-mixer-40kg',
    slug: 'industrial-spiral-mixer-40kg',
    sku: 'JZ-MX-400S',
    name: 'عجانة حلزونية صناعية سرعتين سعة 40 كجم',
    subtitle: 'عجانة إيطالي التصميم بحركة مزدوجة للحلة والخطاف وشبكة أمان ستانلس',
    category: 'العجانات الكهربائية',
    price: 16200,
    rating: 5.0,
    reviewCount: 15,
    inStock: true,
    stockCount: 4,
    featured: true,
    onSale: false,
    image: '/assets/products/spiral-mixer.png',
    description:
      'عجانة حلزونية احترافية بسرعتين مع دوران متزامن للحلة وسلاح العجن الحلزوني، مخصصة لمخابز الفينو والبيتزا والكرواسون للحصول على شبكة جلوتين مثالية وعجين بارد متجانس.',
    highlights: [
      'سرعتان للخلط والعجن مع تايمر رقمي لفصل الحركة أوتوماتيكياً',
      'شبكة حماية علوية من الستانلس ستيل مع حساس أمان يفصل عند الفتح',
      'دوران متزامن للحلة والسلاح الحلزوني لعجن أسرع بـ 50%',
    ],
    specs: [
      { label: 'السعة', value: '40 كجم عجين (حلة 60 لتر)' },
      { label: 'السرعات', value: 'سرعتان (بطيئة للخلط / سريعة للعجن)' },
      { label: 'نظام الأمان', value: 'شبكة ستانلس بحساس فصل أوتوماتيكي + زر طوارئ' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-07',
  },
  {
    id: 'prod-mixer-10kg-home',
    slug: 'aljazira-compact-mixer-10kg',
    sku: 'JZ-MX-100',
    name: 'عجانة الجزيرة الاقتصادية سعة 10 كجم',
    subtitle: 'عجانة منزلية عملية وقوية للاستخدام اليومي المريح',
    category: 'العجانات الكهربائية',
    price: 4400,
    rating: 4.7,
    reviewCount: 51,
    inStock: true,
    stockCount: 25,
    featured: false,
    onSale: false,
    image: '/assets/products/mixer-25kg.png',
    description:
      'أصغر فرد في عائلة عجانات مصنع الجزيرة بنفس المتانة الهندسية المعهودة. سعة 10 كجم مثالية للاستخدام المنزلي لتحضير العيش، الفطير، الكحك، والبسكويت بدون أي مجهود.',
    highlights: [
      'حجم مدمج ووزن مناسب لسهولة النقل والتخزين في المطبخ المنزلي',
      'حلة ستانلس ستيل صحية سهلة الفك والتنظيف',
      'سعر اقتصادي مباشر من المصنع مع ضمان عامين',
    ],
    specs: [
      { label: 'السعة', value: '10 كجم عجين' },
      { label: 'المحرك', value: '0.75 حصان ملفات نحاس' },
      { label: 'الجهد', value: '220 فولت منزلي' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-06',
  },
  {
    id: 'prod-planetary-mixer-20l',
    slug: 'planetary-pastry-mixer-20l',
    sku: 'JZ-MX-20P',
    name: 'مضرب وعجان حلواني ستانلس 20 لتر (3 سرعات)',
    subtitle: 'مزود بـ 3 أسلحة ستانلس (مضرب سلك، كف تقليب، خطاف عجن)',
    category: 'العجانات الكهربائية',
    price: 8900,
    originalPrice: 9600,
    rating: 4.8,
    reviewCount: 18,
    inStock: true,
    stockCount: 8,
    featured: false,
    onSale: true,
    image: '/assets/products/stainless-bowl.png',
    description:
      'مضرب وعجان حلواني متعدد الاستخدامات بسعة 20 لتر و3 سرعات ميكانيكية. مثالي لخفق الكريمة، البيض، الكيك الاسفنجي، البتي فور، والعجائن الخفيفة والمتوسطة.',
    highlights: [
      'يأتي مع 3 ملحقات ستانلس أصلية: مضرب سلك، كف، وخطاف حلزوني',
      '3 سرعات تروس صلب (بطيئة - متوسطة - عالية للخفق)',
      'رافعة يدوية لرفع وخفض الحلة بسهولة وأمان',
    ],
    specs: [
      { label: 'السعة', value: '20 لتر' },
      { label: 'عدد السرعات', value: '3 سرعات ميكانيكية' },
      { label: 'الملحقات', value: '3 أسلحة ستانلس + حلة ستانلس 304' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-05',
  },
  {
    id: 'prod-oven-double-deck',
    slug: 'double-deck-bakery-oven',
    sku: 'JZ-OV-820',
    name: 'فرن خبيز وفطائر غاز محمل 2 بلاطة (دورين)',
    subtitle: 'إنتاجية مضاعفة بدورين مستقلين في التحكم بدرجة الحرارة',
    category: 'الأفران الصناعية',
    price: 8200,
    originalPrice: 8900,
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    stockCount: 6,
    featured: true,
    onSale: true,
    image: '/assets/products/oven-double-deck.png',
    description:
      'فرن الجزيرة ذو الدورين (2 بلاطة) يمنحك ضعف القدرة الإنتاجية في نفس المساحة. كل دور مزود بشعلات ومحبس تحكم مستقل تماماً لخبز صنفين مختلفين في وقت واحد.',
    highlights: [
      'تحكم حراري مستقل لكل دور على حدة لتوفير الغاز عند قلة الإنتاج',
      'أبواب متزنة بمفصلات خدمة شاقة ومقابض عازلة للحرارة',
      'مزود بعجل صناعي محمل بالفرامل لسهولة التحريك والتثبيت',
    ],
    specs: [
      { label: 'عدد الأدوار', value: '2 دور (بلاطتين خبيز مستقلتين)' },
      { label: 'سعة الصواني', value: 'يستوعب 4 صواني مقاس 40×60 سم' },
      { label: 'العزل', value: 'صوف صخري كثيف مانع لتسرب الحرارة' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-04',
  },
  {
    id: 'prod-oven-convection-digital',
    slug: 'digital-convection-oven-4-trays',
    sku: 'JZ-OV-148',
    name: 'فرن كونفكشن حراري ديجيتال 4 صواني بالمروحة',
    subtitle: 'لوحة تحكم رقمية وتوزيع هواء ساخن بالمروحة للمخبوزات والحلواني',
    category: 'الأفران الصناعية',
    price: 14800,
    rating: 4.9,
    reviewCount: 11,
    inStock: true,
    stockCount: 5,
    featured: true,
    onSale: false,
    image: '/assets/products/oven-convection.png',
    description:
      'فرن كونفكشن احترافي بلوحة تحكم ديجيتال ومروحة توزيع هواء ساخن عكسية الاتجاه لضمان تسوية ذهبية متطابقة في جميع الصواني الأربع في نفس اللحظة.',
    highlights: [
      'تحكم رقمي دقيق في الحرارة والتايمر ونظام ترطيب بالبخار',
      'مروحة داخلية من الستانلس ستيل توزع الحرارة في كل ركن بالتساوي',
      'واجهة ستانلس ستيل بالكامل سهلة التنظيف ومطابقة للمواصفات الصحية',
    ],
    specs: [
      { label: 'السعة', value: '4 صواني قياسية 40 × 60 سم' },
      { label: 'التحكم', value: 'تابلوه ديجيتال ذكي + منبه صوتي' },
      { label: 'نظام التسخين', value: 'مروحة توزيع حراري + بخار ترطيب' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-03',
  },
  {
    id: 'prod-oven-home-commercial',
    slug: 'home-commercial-gas-oven',
    sku: 'JZ-OV-395',
    name: 'فرن الجزيرة المنزلي والتجاري ستانلس (الحجم المتوسط)',
    subtitle: 'فرن خبيز وفطير مشلتت وصواني بمقاس مثالي للمنزل والمشاريع الصغيرة',
    category: 'الأفران الصناعية',
    price: 3950,
    originalPrice: 4300,
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    stockCount: 16,
    featured: false,
    onSale: true,
    image: '/assets/products/industrial-oven.png',
    description:
      'فرن الجزيرة المتوسط المصمم ليناسب البلكونة أو المطبخ الواسع والمشاريع المنزلية. يمنحك طعم ونتيجة الأفران الكبيرة في الفطير المشلتت والعيش الفلاحي والطواجن.',
    highlights: [
      'يشتعل بسهولة وأمان على أنبوبة البوتاجاز المنزلية أو الغاز الطبيعي',
      'بلاطة صاج محملة توزع الحرارة بدون حرق قاع المخبوزات',
      'مزود بحامل معدني متين ورف سفلي للتخزين',
    ],
    specs: [
      { label: 'الأبعاد', value: '85 × 70 × 105 سم بالقاعدة' },
      { label: 'الشعلات', value: 'شعلتان جانبيتان + شعلة سفلية بمحابيس نحاس' },
      { label: 'الواجهة', value: 'ستانلس ستيل لامع مقاوم للصدأ' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-02',
  },
  {
    id: 'prod-oven-pizza-deck',
    slug: 'stone-pizza-bakery-oven',
    sku: 'JZ-OV-950',
    name: 'فرن بيتزا ومخبوزات بحجر حراري وترمومتر',
    subtitle: 'أرضية حجر حراري إيطالي المواصفات لبيتزا مقرمشة ومخبوزات احترافية',
    category: 'الأفران الصناعية',
    price: 9500,
    rating: 4.8,
    reviewCount: 14,
    inStock: true,
    stockCount: 6,
    featured: false,
    onSale: false,
    image: '/assets/products/oven-double-deck.png',
    description:
      'فرن متخصص لمطاعم البيتزا والفطائر مزود بأرضية حجر حراري يمتص الرطوبة ويمنح قرمشة مثالية، مع عداد حرارة (ترمومتر) أمامي وزجاج حراري لمراقبة النضج.',
    highlights: [
      'بلاطة حجر حراري تحافظ على ثبات درجة الحرارة مع الفتح المتكرر',
      'ترمومتر قياس حرارة تدريج حتى 500 درجة مئوية',
      'إضاءة داخلية حرارية ونافذة زجاج سيكوريت مزدوج',
    ],
    specs: [
      { label: 'أرضية الخبيز', value: 'حجر حراري سمك 20 مم' },
      { label: 'درجة الحرارة', value: 'حتى 450 درجة مئوية' },
      { label: 'الجسم الخارجي', value: 'ستانلس ستيل 430/304' },
    ],
    warranty: 'ضمان شامل لمدة عامين',
    createdAt: '2026-10-01',
  },
  {
    id: 'prod-stainless-bowl-spare',
    slug: 'stainless-steel-mixer-bowl-25kg',
    sku: 'JZ-SP-185',
    name: 'حلة عجانة ستانلس ستيل 304 أصلية (25 كجم)',
    subtitle: 'حلة عجانة بديلة أصلية من الستانلس الغذائي الحر غير القابل للصدأ',
    category: 'قطع الغيار',
    price: 1850,
    originalPrice: 2100,
    rating: 4.9,
    reviewCount: 20,
    inStock: true,
    stockCount: 12,
    featured: false,
    onSale: true,
    image: '/assets/products/stainless-bowl.png',
    description:
      'حلة عجانة أصلية من مصنع الجزيرة مصنوعة بالكامل من الستانلس ستيل 304 الغذائي غير المغناطيسي، مصقولة من الداخل والخارج لسهولة التنظيف ومنع التصاق العجين.',
    highlights: [
      'ستانلس ستيل 304 حر لا يتفاعل مع الخميرة أو الأملاح',
      'حافة علوية ملفوفة ومقواة لزيادة المتانة وأمان الاستخدام',
      'قاعدة سفلية جاهزة للتركيب المباشر على صينية العجانة',
    ],
    specs: [
      { label: 'السعة', value: '25 كجم عجين (متوفر أيضاً مقاس 15 كجم)' },
      { label: 'الخامة', value: 'ستانلس ستيل 304 غذائي سمك 1.5 مم' },
      { label: 'التوافق', value: 'عجانات الجزيرة القياسية' },
    ],
    warranty: 'ضمان 5 سنوات ضد الصدأ',
    createdAt: '2026-09-29',
  },
  {
    id: 'prod-copper-motor-15hp',
    slug: 'pure-copper-mixer-motor-1-5hp',
    sku: 'JZ-SP-320',
    name: 'موتور عجانة نحاس خالص 1.5 حصان أصلي',
    subtitle: 'محرك كهربائي عالي العزم بملفات نحاس 100% ومروحة تبريد مدمجة',
    category: 'قطع الغيار',
    price: 3200,
    rating: 4.9,
    reviewCount: 17,
    inStock: true,
    stockCount: 10,
    featured: false,
    onSale: false,
    image: '/assets/products/gearbox-housing.png',
    description:
      'موتور عجانة أصلي بقدرة 1.5 حصان وملفات نحاس خالص 100% مع كوندنسر تقويم قوي لتحمل بدء الدوران تحت حمل العجين الثقيل دون هبوط في العزم أو ارتفاع الحرارة.',
    highlights: [
      'ملفات نحاس معزولة حرارياً طبقة F لتحمل درجات الحرارة المرتفعة',
      'عمود دوران صلب على رولمان بلي ياباني هادئ الحركة',
      'جاهز بالترس والطنبورة والروزتة للتركيب المباشر',
    ],
    specs: [
      { label: 'القدرة', value: '1.5 حصان (1100 وات فعلي)' },
      { label: 'عدد اللفات', value: '1400 لفة / دقيقة (عزم عالي)' },
      { label: 'الملفات', value: 'نحاس أحمر نقي 100%' },
    ],
    warranty: 'ضمان لمدة عام كامل',
    createdAt: '2026-09-28',
  },
  {
    id: 'prod-gearbox-steel-gear',
    slug: 'hardened-steel-gearbox-gear',
    sku: 'JZ-SP-850',
    name: 'طقم تروس جرابوكس صلب معالج حرارياً',
    subtitle: 'ترس كبير وترس بنين فولاذي مقسى ضد التآكل والفرط',
    category: 'قطع الغيار',
    price: 850,
    originalPrice: 950,
    rating: 4.8,
    reviewCount: 26,
    inStock: true,
    stockCount: 30,
    featured: false,
    onSale: true,
    image: '/assets/products/gearbox-cover.png',
    description:
      'طقم تروس الجرابوكس الأصلي من مصنع الجزيرة، مشكل على مخارط وفرايز CNC ومعالج حرارياً لصلابة فائقة تمنع تآكل الأسنان وتضمن نقل حركة سلس وهادئ لسنوات طويلة.',
    highlights: [
      'أسنان تروس مشطوفة بدقة CNC لمنع الصوت العالي والاحتكاك',
      'معالجة حرارية تحمي الترس من الكسر عند العجن الثقيل',
      'يأتي مع خابور التثبيت وشحم حراري أصلي',
    ],
    specs: [
      { label: 'الخامة', value: 'صلب سبائكي معالج حرارياً' },
      { label: 'المحتويات', value: 'الترس الرئيسي + ترس البنيون + الخابور' },
      { label: 'التوافق', value: 'جميع جرابوكسات عجانات الجزيرة' },
    ],
    warranty: 'ضمان لمدة عام ضد التآكل أو الكسر',
    createdAt: '2026-09-27',
  },
];

export const INITIAL_REVIEWS: Record<string, ProductReview[]> = {
  'prod-electric-mixer-main': [
    {
      id: 'rev-1',
      author: 'الحاج محمود عبد السلام',
      role: 'صاحب مخبز وحلواني - أسيوط',
      rating: 5,
      date: 'منذ أسبوعين',
      comment: 'عجانة محترمة جداً ومصنع الجزيرة غني عن التعريف في الصعيد ومصر كلها. شغالة عندنا يومياً بدون أي أعطال وصوتها ناعم جداً.',
    },
    {
      id: 'rev-2',
      author: 'أميرة حسن',
      role: 'مشروع مخبوزات منزلية - القاهرة',
      rating: 5,
      date: 'منذ شهر',
      comment: 'طلبتها ووصلتني لحد باب البيت في مدينة نصر في 3 أيام. الحلة الستانلس تقيلة ونظيفة جداً وفرقت معايا في شغل الفطير والبيتزا.',
    },
  ],
  'a78459cd-a724-4fe8-a5d6-0f894d00ddf6': [
    {
      id: 'rev-3',
      author: 'م. طارق المنياوي',
      role: 'فني صيانة معدات مخابز',
      rating: 5,
      date: 'منذ 3 أسابيع',
      comment: 'قطعة غيار أصلية بالملي، بتركب على طول من غير أي تعديل وخامة الحديد ممتازة.',
    },
  ],
};

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'عمر خالد',
    role: 'صاحب مخبز الأمل الحديث',
    location: 'القاهرة',
    rating: 5,
    quote: 'خدمة عملاء احترافية وسرعة في الرد على الاستفسارات، والعجانات جودتها تفوق المستورد بمراحل مع توفر كل قطع الغيار.',
    initials: 'ع خ',
  },
  {
    id: 'test-2',
    name: 'أحمد محمد',
    role: 'مدير مطعم ومخبز فطائر',
    location: 'الجيزة',
    rating: 5,
    quote: 'تجربة تسوق رائعة! المنتجات أصلية والتوصيل سريع جداً، وفرن الجزيرة وفر معانا في استهلاك الغاز وبيطلع تسوية ممتازة.',
    initials: 'أ م',
  },
  {
    id: 'test-3',
    name: 'سارة أحمد',
    role: 'صاحبة مشروع حلويات ومخبوزات',
    location: 'الإسكندرية',
    rating: 5,
    quote: 'أفضل مصنع ومتجر إلكتروني تعاملت معه. خدمة عملاء ممتازة وضمان حقيقي، طلبنا قطع غيار إضافية ووصلت خلال 48 ساعة.',
    initials: 'س أ',
  },
  {
    id: 'test-4',
    name: 'الحاج عبد الرحمن القناوي',
    role: 'تاجر معدات مخابز',
    location: 'سوهاج',
    rating: 5,
    quote: 'بنتعامل مع مصنع الجزيرة من أكثر من 12 سنة، صناعة مصرية تشرف واعتمادية عالية جداً عند كل الزبائن في الصعيد ووجه بحري.',
    initials: 'ع ق',
  },
];

export interface FAQItem {
  id: string;
  category: 'المنتجات والضمان' | 'الصيانة وقطع الغيار' | 'الشحن والطلبات';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'المنتجات والضمان',
    question: 'ما هي المنتجات التي يصنعها مصنع الجزيرة؟',
    answer:
      'يتخصص مصنع الجزيرة للصناعات الهندسية الحديثة منذ عام 2001 في تصنيع العجانات الكهربائية بجميع سعاتها (10، 15، 25، 40، 50 كجم)، والأفران الصناعية والمنزلية للخبيز والفطائر والبيتزا، بالإضافة إلى تصنيع كافة قطع الغيار الميكانيكية والكهربائية الأصلية مثل علب الجرابوكس، التروس الصلب، الحلل الستانلس، وصواني العجانات.',
  },
  {
    id: 'faq-2',
    category: 'المنتجات والضمان',
    question: 'هل توفرون ضمان على منتجاتكم؟',
    answer:
      'نعم، جميع منتجات مصنع الجزيرة تأتي مع ضمان شامل ومعتمد لمدة عامين كاملين ضد عيوب الصناعة، وتختلف مدة ضمان قطع الغيار حسب نوع القطعة، مع توفير دعم فني كامل وقطع غيار مجانية خلال فترة الضمان.',
  },
  {
    id: 'faq-3',
    category: 'الصيانة وقطع الغيار',
    question: 'هل توفرون خدمة الصيانة المنزلية وللمخابز؟',
    answer:
      'نعم، نوفر خدمة الصيانة المنزلية والميدانية المعتمدة للأجهزة والمعدات من خلال فريق فني وهندسي متخصص يغطي القاهرة الكبرى ومحافظات الصعيد والوجه البحري، مع إمكانية حجز موعد صيانة مباشرة عبر صفحة خدماتنا أو الواتساب.',
  },
  {
    id: 'faq-4',
    category: 'الصيانة وقطع الغيار',
    question: 'أين يمكنني إيجاد قطع الغيار الأصلية؟',
    answer:
      'جميع قطع الغيار الأصلية متوفرة مباشرة عبر قسم "قطع الغيار" في متجرنا الإلكتروني بأسعار المصنع، ونضمن توافقها التام 100% مع منتجاتنا مع الشحن السريع لأي محافظة في مصر.',
  },
  {
    id: 'faq-5',
    category: 'الشحن والطلبات',
    question: 'ما هي خيارات التوصيل المتاحة ومدة الشحن؟',
    answer:
      'نوفر شحناً سريعاً ومؤمّناً لجميع محافظات جمهورية مصر العربية خلال 2 إلى 4 أيام عمل. كما نقدم شحناً مجانياً للطلبات فوق 500 جنيه لقطع الغيار، مع خدمة التركيب والتشغيل للأفران والعجانات الصناعية.',
  },
  {
    id: 'faq-6',
    category: 'الشحن والطلبات',
    question: 'هل يمكنني إرجاع أو استبدال المنتج؟',
    answer:
      'نعم، نطبق سياسة إرجاع واستبدال مرنة خلال 30 يوماً من تاريخ الاستلام بشرط أن يكون المنتج في حالته الأصلية، وفي حال وجود أي عيب مصنعي يتم الاستبدال الفوري مجاناً دون أي مصاريف شحن إضافية.',
  },
];
