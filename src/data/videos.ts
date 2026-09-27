// مكتبة الفيديو: مقاطع مقسّمة حسب الموضوع من تسجيل لقاء ناجية الافتراضي
// «سرطان الثدي: ماذا بعد رحلة العلاج؟» (١٥ أكتوبر ٢٠٢٠، قناة ناجية على يوتيوب).
// كل عنوان ووصف مأخوذ من السؤال الذي طُرح في اللقاء نفسه (من نص التسجيل)،
// والمقاطع مستضافة على الموقع مباشرة. المواضع (بداية/نهاية) بالثواني من التسجيل الأصلي.

export type LibraryVideo = {
  slug: string;
  title: string;
  desc: string;
  topic: string; // من knowledgeTopics
  src: string;
  poster: string;
  duration: string; // دقائق:ثوانٍ
  series: string; // slug السلسلة (اللقاء المقسّم)
};

const V = (slug: string) => ({ src: `/videos/${slug}.mp4`, poster: `/videos/${slug}.jpg` });

export const libraryVideos: LibraryVideo[] = [
  { slug: 'survivor-testimony', ...V('survivor-testimony'), title: 'ناجية تحكي: ماذا بعد العلاج؟', desc: 'افتتاح اللقاء بتجربة إحدى المتعافيات وانتقالها من المرض إلى التعافي، والتحديات التي واجهتها بعد انتهاء العلاج.', topic: 'جودة الحياة بعد السرطان', duration: '١٢:١٤', series: 'virtual-2020' },
  { slug: 'fear-of-recurrence', ...V('fear-of-recurrence'), title: 'القلق من عودة المرض', desc: 'ما أثر هاجس عودة المرض على الصحة الجسدية والنفسية، وكيف نضع المخاوف في حجمها الحقيقي؟', topic: 'الصحة النفسية والخوف من الانتكاس', duration: '٩:٥١', series: 'virtual-2020' },
  { slug: 'radiation-new-cancer', ...V('radiation-new-cancer'), title: 'هل يسبب العلاج الإشعاعي سرطانًا جديدًا؟', desc: 'سؤال من سيدة قرأت على الإنترنت أن الإشعاع بعد الاستئصال الجزئي قد يعرّضها لإصابة أخرى: ما مدى صحة المعلومة؟', topic: 'المتابعة طويلة الأمد', duration: '٥:٢٨', series: 'virtual-2020' },
  { slug: 'bones-joints', ...V('bones-joints'), title: 'آلام العظام والمفاصل مع العلاج الهرموني', desc: 'الفرق بين آلام العظام وآلام المفاصل المصاحبة للعلاج الهرموني، وهل هي أعراض شائعة؟', topic: 'صحة القلب والعظام', duration: '٥:٥١', series: 'virtual-2020' },
  { slug: 'pregnancy', ...V('pregnancy'), title: 'الحمل بعد سرطان الثدي', desc: 'متى يكون الوقت المناسب للحمل بعد العلاج الهرموني، وهل يزيد الحمل خطر عودة المرض؟', topic: 'الخصوبة والحمل بعد السرطان', duration: '٦:١٠', series: 'virtual-2020' },
  { slug: 'arm-movement', ...V('arm-movement'), title: 'حركة الذراع بعد الجراحة', desc: 'سيدة خضعت للعملية منذ سنتين وما زالت حركة ذراعها محدودة: ما المتوقع بعد العملية وما الذي يساعد؟', topic: 'الرياضة والنشاط البدني', duration: '٨:٠٣', series: 'virtual-2020' },
  { slug: 'depression-support', ...V('depression-support'), title: 'الاكتئاب والدعم النفسي', desc: 'الاكتئاب خلال العلاج الكيميائي وبعده: كيف تظهر أعراضه، ومتى تحتاج السيدة إلى دعم متخصص؟', topic: 'الصحة النفسية والخوف من الانتكاس', duration: '٨:٠٩', series: 'virtual-2020' },
  { slug: 'radiation-heart-lung', ...V('radiation-heart-lung'), title: 'الإشعاع والقلب والرئة', desc: 'هل هناك خطر على القلب في المستقبل بعد العلاج الإشعاعي؟', topic: 'صحة القلب والعظام', duration: '٤:٤٢', series: 'virtual-2020' },
  { slug: 'intimacy', ...V('intimacy'), title: 'العلاقة الحميمة مع العلاج الهرموني', desc: 'فقدان الرغبة والألم أثناء العلاقة مع العلاج الهرموني: هل هي مشكلة شائعة، وما الذي يساعد؟', topic: 'الصحة الجنسية', duration: '٧:٥٥', series: 'virtual-2020' },
  { slug: 'hair', ...V('hair'), title: 'الشعر بعد العلاج الكيميائي', desc: 'سيدة انتهت من العلاج منذ أشهر وما زال شعرها خفيفًا: متى يعود الشعر، وما المتوقع؟', topic: 'الشعر والجلد والتغيّرات التجميلية', duration: '٥:١٤', series: 'virtual-2020' },
  { slug: 'reconstruction', ...V('reconstruction'), title: 'ترميم الثدي: متى وكيف؟', desc: 'ما الوقت المثالي لعملية الترميم، ولماذا لا يُعرض على كل سيدة من البداية؟', topic: 'صورة الجسد', duration: '٨:٤٠', series: 'virtual-2020' },
  { slug: 'body-image', ...V('body-image'), title: 'صورة الجسد بعد الاستئصال', desc: '«لا أستطيع النظر إلى نفسي في المرآة»: كيف تتعامل السيدة مع مشاعرها تجاه جسدها بعد الاستئصال؟', topic: 'صورة الجسد', duration: '٩:٢٠', series: 'virtual-2020' },
  { slug: 'skin-colour', ...V('skin-colour'), title: 'لون الجلد بعد العلاج الإشعاعي', desc: 'تغيّر لون الجلد في منطقة الإشعاع: هل يعود، وهل تفيد كريمات التفتيح؟', topic: 'الشعر والجلد والتغيّرات التجميلية', duration: '٣:٥٠', series: 'virtual-2020' },
  { slug: 'periods-contraception', ...V('periods-contraception'), title: 'الدورة الشهرية بعد العلاج', desc: 'هل تعود الدورة الشهرية بعد العلاج الكيميائي، وماذا يعني انقطاعها مع العلاج الهرموني؟', topic: 'الخصوبة والحمل بعد السرطان', duration: '٥:٥٣', series: 'virtual-2020' },
  { slug: 'sensation', ...V('sensation'), title: 'تغيّر الإحساس بعد العملية', desc: 'إحساس غريب في الجلد فوق منطقة العملية بعد سنة منها: هل ينتهي ويعود الإحساس طبيعيًا؟', topic: 'المتابعة طويلة الأمد', duration: '٤:٠٣', series: 'virtual-2020' },
  { slug: 'weight-hormonal', ...V('weight-hormonal'), title: 'الوزن والعلاج الهرموني', desc: 'هل يسبب العلاج الهرموني زيادة الوزن، وهل من طريقة للتعامل معها؟', topic: 'التغذية والوزن', duration: '٤:٤٩', series: 'virtual-2020' },
  { slug: 'lymphedema', ...V('lymphedema'), title: 'الوذمة اللمفاوية: تورّم الذراع', desc: 'ذراع أكبر قليلًا من الأخرى بعد ثلاث سنوات من الاستئصال: هل للإشعاع أثر، وما طرق الوقاية؟', topic: 'المتابعة طويلة الأمد', duration: '٧:٠٤', series: 'virtual-2020' },
  { slug: 'redness-follow-up', ...V('redness-follow-up'), title: 'الاحمرار بعد الإشعاع وأهمية المتابعة', desc: 'احمرار وتورّم في الثدي بعد أشهر من الإشعاع دون التهاب: هل هو شائع، ولماذا لا تُفوَّت مواعيد المتابعة؟', topic: 'المتابعة طويلة الأمد', duration: '٤:١٤', series: 'virtual-2020' },
];

export const videoBySlug = (slug: string) => libraryVideos.find((v) => v.slug === slug);

// سلاسل الفيديو: كل لقاء مقسّم يظهر بطاقةً واحدة في «فيديوهات المعرفة»، وصفحته
// تعرض المقاطع كلها مع قائمة تشغيل. بيانات اللقاء نفسها (التاريخ والتفاصيل
// والمصادر) في events.ts تحت الـ slug نفسه.
export type VideoSeries = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  date: string;
  cover: string;
  summary: string;
  speakers: string[];
};

export const videoSeriesList: VideoSeries[] = [
  {
    slug: 'virtual-2020',
    title: 'سرطان الثدي: ماذا بعد رحلة العلاج؟',
    kind: 'لقاء افتراضي',
    year: '٢٠٢٠',
    date: '١٥ أكتوبر ٢٠٢٠',
    cover: '/videos/fear-of-recurrence.jpg',
    summary: 'أول لقاء افتراضي لناجية: ساعتان من أسئلة الناجيات عن الحياة بعد العلاج، يجيب عنها فريق من الأطباء والمختصين — مقسّمة هنا سؤالًا بسؤال.',
    speakers: ['د. أطلال أبوسند', 'د. رلى المفتي', 'د. ريم عجيمي', 'د. سماح الشنقيطي', 'أ. سلمى المفتي'],
  },
];

export const seriesBySlug = (slug: string) => videoSeriesList.find((s) => s.slug === slug);
export const clipsOf = (slug: string) => libraryVideos.filter((v) => v.series === slug);

const toSeconds = (d: string) => {
  const [m, s] = d.replace(/[٠-٩]/g, (c) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).split(':').map(Number);
  return m * 60 + s;
};
export const totalMinutes = (slug: string) => Math.round(clipsOf(slug).reduce((t, v) => t + toSeconds(v.duration), 0) / 60);
