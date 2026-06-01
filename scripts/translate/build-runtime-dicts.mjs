#!/usr/bin/env node
/**
 * Build the runtime translation dictionaries consumed by Layout.astro.
 *
 * The master map below is keyed by the exact English source string (the
 * `data-en` value rendered in the markup) and holds the translation for each
 * non-en/es locale. Strings absent from a locale fall back to English at
 * runtime, so partial coverage is safe to ship.
 *
 * This curated set covers the site's UI vocabulary — navigation, buttons,
 * headings, tool names, form fields, CTAs, and footer. Long-form editorial
 * content (candidate biographies, detailed policy paragraphs, and data
 * citations) is intentionally left to the Gemini translation pipeline
 * (scripts/translate/translate.js), which includes the required native-speaker
 * review step for Amharic.
 *
 * Regenerate after editing the map:
 *   node scripts/translate/build-runtime-dicts.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../../src/i18n/runtime');
const LOCALES = ['vi', 'zh', 'ar', 'am'];

// English source -> { vi, zh, ar, am }
const M = {
  // ── Navigation ──────────────────────────────────────────────────────────
  Platform: { vi: 'Cương lĩnh', zh: '政纲', ar: 'البرنامج', am: 'መድረክ' },
  'Run For Denver': {
    vi: 'Tranh cử cho Denver',
    zh: '竞选 Denver',
    ar: 'ترشّح عن دنفر',
    am: 'ለዴንቨር ይወዳደሩ',
  },
  Tools: { vi: 'Công cụ', zh: '工具', ar: 'الأدوات', am: 'መሣሪያዎች' },
  'Take Action': { vi: 'Hành động', zh: '立即行动', ar: 'اتخذ إجراءً', am: 'እርምጃ ይውሰዱ' },
  About: { vi: 'Giới thiệu', zh: '关于我们', ar: 'من نحن', am: 'ስለ እኛ' },
  Connect: { vi: 'Kết nối', zh: '联系', ar: 'تواصل', am: 'ይገናኙ' },

  // ── Hero / homepage ─────────────────────────────────────────────────────
  'Denver Belongs to All of Us': {
    vi: 'Denver thuộc về tất cả chúng ta',
    zh: 'Denver 属于我们所有人',
    ar: 'دنفر مِلكٌ لنا جميعًا',
    am: 'ዴንቨር የሁላችንም ናት',
  },
  'Not just developers. Not just landlords. Not just corporations. All of us.': {
    vi: 'Không chỉ các nhà phát triển. Không chỉ chủ nhà. Không chỉ các tập đoàn. Tất cả chúng ta.',
    zh: '不只是开发商。不只是房东。不只是企业。是我们所有人。',
    ar: 'ليس المطوّرين العقاريين فقط. ولا الملّاك فقط. ولا الشركات فقط. بل نحن جميعًا.',
    am: 'ገንቢዎች ብቻ አይደሉም። አከራዮች ብቻ አይደሉም። ኩባንያዎች ብቻ አይደሉም። ሁላችንም ነን።',
  },
  'Read the Platform': {
    vi: 'Đọc cương lĩnh',
    zh: '阅读政纲',
    ar: 'اقرأ البرنامج',
    am: 'መድረኩን ያንብቡ',
  },
  'Browse the Platform': {
    vi: 'Xem cương lĩnh',
    zh: '浏览政纲',
    ar: 'تصفّح البرنامج',
    am: 'መድረኩን ይመልከቱ',
  },
  'The Platform': { vi: 'Cương lĩnh', zh: '政纲', ar: 'البرنامج', am: 'መድረክ' },

  // ── Email capture ───────────────────────────────────────────────────────
  'Join the Movement': {
    vi: 'Tham gia phong trào',
    zh: '加入运动',
    ar: 'انضم إلى الحركة',
    am: 'ንቅናቄውን ይቀላቀሉ',
  },
  'Get updates on policy proposals, actions, and how to fight for a Denver that works for everyone.':
    {
      vi: 'Nhận thông tin cập nhật về các đề xuất chính sách, hành động và cách đấu tranh cho một Denver phục vụ tất cả mọi người.',
      zh: '获取关于政策提案、行动以及如何为人人共享的 Denver 而奋斗的最新动态。',
      ar: 'احصل على مستجدّات حول مقترحات السياسات والإجراءات وكيفية النضال من أجل دنفر تعمل للجميع.',
      am: 'ስለ ፖሊሲ ሀሳቦች፣ እርምጃዎች እና ለሁሉም የምትሰራ ዴንቨር ለመታገል ስለሚቻልበት መንገድ ዝማኔዎችን ያግኙ።',
    },
  'Sign Up': { vi: 'Đăng ký', zh: '注册', ar: 'اشترك', am: 'ይመዝገቡ' },
  'Sign Up for Updates': {
    vi: 'Đăng ký nhận cập nhật',
    zh: '订阅更新',
    ar: 'اشترك للحصول على المستجدّات',
    am: 'ለዝማኔዎች ይመዝገቡ',
  },
  'We respect your privacy. Unsubscribe anytime.': {
    vi: 'Chúng tôi tôn trọng quyền riêng tư của bạn. Hủy đăng ký bất cứ lúc nào.',
    zh: '我们尊重您的隐私。可随时取消订阅。',
    ar: 'نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
    am: 'ግላዊነትዎን እናከብራለን። በማንኛውም ጊዜ መውጣት ይችላሉ።',
  },
  'your@email.com': {
    vi: 'ban@email.com',
    zh: 'your@email.com',
    ar: 'your@email.com',
    am: 'your@email.com',
  },
  "You're in! Check your inbox for a welcome email.": {
    vi: 'Đã xong! Hãy kiểm tra hộp thư để xem email chào mừng.',
    zh: '完成！请查收欢迎邮件。',
    ar: 'تم تسجيلك! تحقّق من بريدك الوارد لرسالة الترحيب.',
    am: 'ተመዝግበዋል! የእንኳን ደህና መጡ ኢሜል ለማየት መልእክት ሳጥንዎን ይመልከቱ።',
  },
  'Something went wrong. Please try again.': {
    vi: 'Đã xảy ra lỗi. Vui lòng thử lại.',
    zh: '出错了，请重试。',
    ar: 'حدث خطأ ما. يُرجى المحاولة مرة أخرى.',
    am: 'የሆነ ችግር ተፈጥሯል። እባክዎ እንደገና ይሞክሩ።',
  },

  // ── Run-for-Denver CTA ──────────────────────────────────────────────────
  'Are You Ready to Run?': {
    vi: 'Bạn đã sẵn sàng tranh cử chưa?',
    zh: '你准备好竞选了吗？',
    ar: 'هل أنت مستعدّ للترشّح؟',
    am: 'ለመወዳደር ዝግጁ ነዎት?',
  },
  'Ready to Run?': {
    vi: 'Sẵn sàng tranh cử?',
    zh: '准备好竞选了吗？',
    ar: 'مستعدّ للترشّح؟',
    am: 'ለመወዳደር ዝግጁ?',
  },
  'Ready to Win': {
    vi: 'Sẵn sàng chiến thắng',
    zh: '准备好胜选',
    ar: 'مستعدّون للفوز',
    am: 'ለማሸነፍ ዝግጁ',
  },
  "We're building a movement for economic justice in Denver. We have the platform, the policy, and the people. We need a candidate who will fight for it.":
    {
      vi: 'Chúng tôi đang xây dựng một phong trào vì công bằng kinh tế ở Denver. Chúng tôi có cương lĩnh, có chính sách và có con người. Chúng tôi cần một ứng cử viên sẽ đấu tranh cho điều đó.',
      zh: '我们正在 Denver 建设一场争取经济公正的运动。我们有政纲、有政策、也有人民。我们需要一位愿意为之奋斗的候选人。',
      ar: 'نحن نبني حركة من أجل العدالة الاقتصادية في دنفر. لدينا البرنامج والسياسات والناس. نحتاج إلى مرشّح يناضل من أجلها.',
      am: 'በዴንቨር ለኢኮኖሚ ፍትህ ንቅናቄ እየገነባን ነው። መድረኩ፣ ፖሊሲው እና ሕዝቡ አሉን። ለዚህ የሚታገል እጩ እንፈልጋለን።',
    },
  'Learn More': { vi: 'Tìm hiểu thêm', zh: '了解更多', ar: 'اعرف المزيد', am: 'ተጨማሪ ይወቁ' },

  // ── Tools index ─────────────────────────────────────────────────────────
  'Tools for the People': {
    vi: 'Công cụ cho người dân',
    zh: '为人民服务的工具',
    ar: 'أدوات للناس',
    am: 'ለሕዝብ የሚሆኑ መሣሪያዎች',
  },
  'Free, open-source tools to hold power accountable and protect your rights. Built by the community, for the community.':
    {
      vi: 'Các công cụ miễn phí, mã nguồn mở để buộc chính quyền chịu trách nhiệm và bảo vệ quyền lợi của bạn. Được cộng đồng xây dựng, vì cộng đồng.',
      zh: '免费、开源的工具，用于追究权力问责并保护你的权利。由社区打造，服务社区。',
      ar: 'أدوات مجانية ومفتوحة المصدر لمساءلة السلطة وحماية حقوقك. صُنعت بواسطة المجتمع، ومن أجل المجتمع.',
      am: 'ሥልጣንን ተጠያቂ ለማድረግ እና መብቶችዎን ለመጠበቅ ነፃ እና ክፍት ምንጭ መሣሪያዎች። በማኅበረሰቡ፣ ለማኅበረሰቡ የተገነቡ።',
    },
  'Free, open-source tools to hold power accountable.': {
    vi: 'Công cụ miễn phí, mã nguồn mở để buộc chính quyền chịu trách nhiệm.',
    zh: '免费、开源的工具，用于追究权力问责。',
    ar: 'أدوات مجانية ومفتوحة المصدر لمساءلة السلطة.',
    am: 'ሥልጣንን ተጠያቂ ለማድረግ ነፃ እና ክፍት ምንጭ መሣሪያዎች።',
  },
  'View All Tools': {
    vi: 'Xem tất cả công cụ',
    zh: '查看所有工具',
    ar: 'عرض كل الأدوات',
    am: 'ሁሉንም መሣሪያዎች ይመልከቱ',
  },
  'View All Proposals': {
    vi: 'Xem tất cả đề xuất',
    zh: '查看所有提案',
    ar: 'عرض كل المقترحات',
    am: 'ሁሉንም ሀሳቦች ይመልከቱ',
  },

  // ── Common buttons / links ──────────────────────────────────────────────
  'Read Full Proposal →': {
    vi: 'Đọc toàn bộ đề xuất →',
    zh: '阅读完整提案 →',
    ar: '← اقرأ المقترح كاملًا',
    am: 'ሙሉ ሀሳቡን ያንብቡ →',
  },
  'Read Full Proposal': {
    vi: 'Đọc toàn bộ đề xuất',
    zh: '阅读完整提案',
    ar: 'اقرأ المقترح كاملًا',
    am: 'ሙሉ ሀሳቡን ያንብቡ',
  },
  'Read the Full Policy': {
    vi: 'Đọc toàn bộ chính sách',
    zh: '阅读完整政策',
    ar: 'اقرأ السياسة كاملة',
    am: 'ሙሉ ፖሊሲውን ያንብቡ',
  },
  'Read the Policy': { vi: 'Đọc chính sách', zh: '阅读政策', ar: 'اقرأ السياسة', am: 'ፖሊሲውን ያንብቡ' },
  'Read the Proposal →': {
    vi: 'Đọc đề xuất →',
    zh: '阅读提案 →',
    ar: '← اقرأ المقترح',
    am: 'ሀሳቡን ያንብቡ →',
  },
  'Read the Full Proposal': {
    vi: 'Đọc toàn bộ đề xuất',
    zh: '阅读完整提案',
    ar: 'اقرأ المقترح كاملًا',
    am: 'ሙሉ ሀሳቡን ያንብቡ',
  },
  Share: { vi: 'Chia sẻ', zh: '分享', ar: 'شارك', am: 'አጋራ' },
  'Share This Data': {
    vi: 'Chia sẻ dữ liệu này',
    zh: '分享此数据',
    ar: 'شارك هذه البيانات',
    am: 'ይህን መረጃ ያጋሩ',
  },
  'Share This Proposal': {
    vi: 'Chia sẻ đề xuất này',
    zh: '分享此提案',
    ar: 'شارك هذا المقترح',
    am: 'ይህን ሀሳብ ያጋሩ',
  },
  'Share Your Results': {
    vi: 'Chia sẻ kết quả của bạn',
    zh: '分享你的结果',
    ar: 'شارك نتائجك',
    am: 'ውጤትዎን ያጋሩ',
  },
  'Share Our Policy Proposals': {
    vi: 'Chia sẻ các đề xuất chính sách của chúng tôi',
    zh: '分享我们的政策提案',
    ar: 'شارك مقترحاتنا السياسية',
    am: 'የፖሊሲ ሀሳቦቻችንን ያጋሩ',
  },
  'Copy Link': { vi: 'Sao chép liên kết', zh: '复制链接', ar: 'انسخ الرابط', am: 'ማስፈንጠሪያ ቅዳ' },
  'Copy Letter': { vi: 'Sao chép thư', zh: '复制信件', ar: 'انسخ الرسالة', am: 'ደብዳቤ ቅዳ' },
  'Copy Full Text': {
    vi: 'Sao chép toàn văn',
    zh: '复制全文',
    ar: 'انسخ النص كاملًا',
    am: 'ሙሉ ጽሑፍ ቅዳ',
  },
  'Copied!': { vi: 'Đã sao chép!', zh: '已复制！', ar: 'تم النسخ!', am: 'ተቀድቷል!' },
  'Sign the Petition': {
    vi: 'Ký vào kiến nghị',
    zh: '签署请愿',
    ar: 'وقّع العريضة',
    am: 'አቤቱታውን ይፈርሙ',
  },
  'Sign Petition': { vi: 'Ký kiến nghị', zh: '签署请愿', ar: 'وقّع العريضة', am: 'አቤቱታ ይፈርሙ' },
  'Petition Coming Soon': {
    vi: 'Kiến nghị sắp ra mắt',
    zh: '请愿即将推出',
    ar: 'العريضة قريبًا',
    am: 'አቤቱታ በቅርቡ ይመጣል',
  },
  'Track Bill': {
    vi: 'Theo dõi dự luật',
    zh: '追踪法案',
    ar: 'تتبّع مشروع القانون',
    am: 'ረቂቅ ሕግ ይከታተሉ',
  },
  '← Back to Platform': {
    vi: '← Quay lại cương lĩnh',
    zh: '← 返回政纲',
    ar: 'العودة إلى البرنامج →',
    am: '← ወደ መድረክ ተመለስ',
  },
  'Legislative Status': {
    vi: 'Tình trạng lập pháp',
    zh: '立法状态',
    ar: 'الحالة التشريعية',
    am: 'የሕግ አወጣጥ ሁኔታ',
  },
  'Related State Legislation': {
    vi: 'Luật pháp tiểu bang liên quan',
    zh: '相关州立法',
    ar: 'تشريعات الولاية ذات الصلة',
    am: 'ተዛማጅ የክፍለ ሀገር ሕግ',
  },
  'Launch Tool →': { vi: 'Mở công cụ →', zh: '启动工具 →', ar: '← افتح الأداة', am: 'መሣሪያ ክፈት →' },
  'Explore Data →': {
    vi: 'Khám phá dữ liệu →',
    zh: '探索数据 →',
    ar: '← استكشف البيانات',
    am: 'መረጃ ያስሱ →',
  },
  'Explore Map →': {
    vi: 'Khám phá bản đồ →',
    zh: '探索地图 →',
    ar: '← استكشف الخريطة',
    am: 'ካርታ ያስሱ →',
  },
  'View Data →': { vi: 'Xem dữ liệu →', zh: '查看数据 →', ar: '← عرض البيانات', am: 'መረጃ ይመልከቱ →' },
  'View Dashboard →': {
    vi: 'Xem bảng điều khiển →',
    zh: '查看仪表板 →',
    ar: '← عرض اللوحة',
    am: 'ዳሽቦርድ ይመልከቱ →',
  },
  'Download as PDF': {
    vi: 'Tải xuống dưới dạng PDF',
    zh: '下载为 PDF',
    ar: 'تنزيل بصيغة PDF',
    am: 'እንደ PDF ያውርዱ',
  },
  'Open Chat': { vi: 'Mở trò chuyện', zh: '打开聊天', ar: 'افتح المحادثة', am: 'ውይይት ክፈት' },
  'View Source': { vi: 'Xem mã nguồn', zh: '查看源代码', ar: 'عرض المصدر', am: 'ምንጭ ይመልከቱ' },
  'Open an Issue': {
    vi: 'Mở một vấn đề',
    zh: '提交问题',
    ar: 'افتح مشكلة (Issue)',
    am: 'ጉዳይ ይክፈቱ',
  },

  // ── Section headings ────────────────────────────────────────────────────
  'Our Approach': {
    vi: 'Cách tiếp cận của chúng tôi',
    zh: '我们的方法',
    ar: 'نهجنا',
    am: 'አቀራረባችን',
  },
  'What We Do': {
    vi: 'Những gì chúng tôi làm',
    zh: '我们做什么',
    ar: 'ماذا نفعل',
    am: 'የምንሰራው ነገር',
  },
  'What We Believe': {
    vi: 'Điều chúng tôi tin',
    zh: '我们的信念',
    ar: 'بماذا نؤمن',
    am: 'የምናምነው ነገር',
  },
  'Who We Are': { vi: 'Chúng tôi là ai', zh: '我们是谁', ar: 'من نحن', am: 'እኛ እነማን ነን' },
  'Why This Matters': {
    vi: 'Tại sao điều này quan trọng',
    zh: '为何重要',
    ar: 'لماذا هذا مهم',
    am: 'ይህ ለምን ይጠቅማል',
  },
  'What You Can Do': {
    vi: 'Những gì bạn có thể làm',
    zh: '你能做什么',
    ar: 'ما الذي يمكنك فعله',
    am: 'ምን ማድረግ ይችላሉ',
  },
  'Key Numbers': { vi: 'Các con số chính', zh: '关键数据', ar: 'أرقام رئيسية', am: 'ቁልፍ ቁጥሮች' },
  'Data Sources': { vi: 'Nguồn dữ liệu', zh: '数据来源', ar: 'مصادر البيانات', am: 'የመረጃ ምንጮች' },
  'About This Data': {
    vi: 'Về dữ liệu này',
    zh: '关于此数据',
    ar: 'حول هذه البيانات',
    am: 'ስለዚህ መረጃ',
  },
  'Data Story': { vi: 'Câu chuyện dữ liệu', zh: '数据故事', ar: 'قصة البيانات', am: 'የመረጃ ታሪክ' },
  'What the Data Shows': {
    vi: 'Dữ liệu cho thấy điều gì',
    zh: '数据揭示了什么',
    ar: 'ما تُظهره البيانات',
    am: 'መረጃው የሚያሳየው',
  },
  'The Pattern': { vi: 'Mô hình', zh: '规律', ar: 'النمط', am: 'ስርዓቱ' },
  'How can we help?': {
    vi: 'Chúng tôi có thể giúp gì?',
    zh: '我们能帮您什么？',
    ar: 'كيف يمكننا المساعدة؟',
    am: 'እንዴት ልንረዳዎ እንችላለን?',
  },
  'Follow the Money': {
    vi: 'Lần theo dòng tiền',
    zh: '追踪资金流向',
    ar: 'تتبّع المال',
    am: 'ገንዘቡን ይከታተሉ',
  },
  Transparency: { vi: 'Minh bạch', zh: '透明度', ar: 'الشفافية', am: 'ግልጽነት' },
  Research: { vi: 'Nghiên cứu', zh: '研究', ar: 'بحث', am: 'ምርምር' },
  Interactive: { vi: 'Tương tác', zh: '互动', ar: 'تفاعلي', am: 'መስተጋብራዊ' },
  Official: { vi: 'Chính thức', zh: '官方', ar: 'رسمي', am: 'ይፋዊ' },

  // ── Policy categories ───────────────────────────────────────────────────
  Housing: { vi: 'Nhà ở', zh: '住房', ar: 'الإسكان', am: 'መኖሪያ ቤት' },
  'Public Safety': {
    vi: 'An toàn công cộng',
    zh: '公共安全',
    ar: 'السلامة العامة',
    am: 'የሕዝብ ደህንነት',
  },
  Immigration: { vi: 'Nhập cư', zh: '移民', ar: 'الهجرة', am: 'ስደት' },
  Democracy: { vi: 'Dân chủ', zh: '民主', ar: 'الديمقراطية', am: 'ዴሞክራሲ' },

  // ── Tool names ──────────────────────────────────────────────────────────
  'Eviction Tracker': {
    vi: 'Trình theo dõi trục xuất',
    zh: '驱逐追踪器',
    ar: 'متتبّع الإخلاءات',
    am: 'የማስወጣት መከታተያ',
  },
  'Rent Calculator': {
    vi: 'Máy tính tiền thuê',
    zh: '租金计算器',
    ar: 'حاسبة الإيجار',
    am: 'የኪራይ ካልኩሌተር',
  },
  'Rent Control Calculator': {
    vi: 'Máy tính kiểm soát tiền thuê',
    zh: '租金管制计算器',
    ar: 'حاسبة ضبط الإيجار',
    am: 'የኪራይ ቁጥጥር ካልኩሌተር',
  },
  'Candidate Tracker': {
    vi: 'Trình theo dõi ứng cử viên',
    zh: '候选人追踪器',
    ar: 'متتبّع المرشّحين',
    am: 'የእጩ መከታተያ',
  },
  'Council Candidate Tracker': {
    vi: 'Theo dõi ứng cử viên hội đồng',
    zh: '市议会候选人追踪器',
    ar: 'متتبّع مرشّحي المجلس',
    am: 'የምክር ቤት እጩ መከታተያ',
  },
  'Mayoral Tracker': {
    vi: 'Theo dõi ứng cử viên thị trưởng',
    zh: '市长候选人追踪器',
    ar: 'متتبّع مرشّحي العمدة',
    am: 'የከንቲባ መከታተያ',
  },
  'Money in Denver Politics': {
    vi: 'Tiền trong chính trị Denver',
    zh: 'Denver 政治中的金钱',
    ar: 'المال في سياسة دنفر',
    am: 'በዴንቨር ፖለቲካ ውስጥ ያለ ገንዘብ',
  },
  'Sidewalk Data Explorer': {
    vi: 'Trình khám phá dữ liệu vỉa hè',
    zh: '人行道数据浏览器',
    ar: 'مستكشف بيانات الأرصفة',
    am: 'የእግረኛ መንገድ መረጃ መመርመሪያ',
  },
  'State Sponsor Tracker': {
    vi: 'Theo dõi nhà bảo trợ cấp tiểu bang',
    zh: '州提案人追踪器',
    ar: 'متتبّع رعاة الولاية',
    am: 'የክፍለ ሀገር ስፖንሰር መከታተያ',
  },
  'Council Scorecard': {
    vi: 'Bảng điểm hội đồng',
    zh: '市议会评分卡',
    ar: 'بطاقة تقييم المجلس',
    am: 'የምክር ቤት የውጤት ካርድ',
  },
  'Resistbot Campaigns': {
    vi: 'Chiến dịch Resistbot',
    zh: 'Resistbot 行动',
    ar: 'حملات Resistbot',
    am: 'የResistbot ዘመቻዎች',
  },
  'Know Your Rights': {
    vi: 'Biết quyền của bạn',
    zh: '了解你的权利',
    ar: 'اعرف حقوقك',
    am: 'መብቶችዎን ይወቁ',
  },

  // ── Rent calculator UI ──────────────────────────────────────────────────
  'Your current monthly rent': {
    vi: 'Tiền thuê hàng tháng hiện tại của bạn',
    zh: '你目前的月租金',
    ar: 'إيجارك الشهري الحالي',
    am: 'የአሁኑ ወርሃዊ ኪራይዎ',
  },
  'Years into the future': {
    vi: 'Số năm tới',
    zh: '未来年数',
    ar: 'عدد السنوات المقبلة',
    am: 'ወደፊት ያሉ ዓመታት',
  },
  'Expected annual market rent increase': {
    vi: 'Mức tăng tiền thuê thị trường hàng năm dự kiến',
    zh: '预期的市场年度租金涨幅',
    ar: 'الزيادة السنوية المتوقّعة في إيجار السوق',
    am: 'የሚጠበቀው ዓመታዊ የገበያ ኪራይ ጭማሪ',
  },
  'Your Savings': { vi: 'Khoản tiết kiệm của bạn', zh: '你节省的金额', ar: 'مدّخراتك', am: 'ቁጠባዎ' },
  'You save': { vi: 'Bạn tiết kiệm', zh: '你节省了', ar: 'أنت توفّر', am: 'ይቆጥባሉ' },
  'With Denver For All Plan': {
    vi: 'Với kế hoạch Denver For All',
    zh: '采用 Denver For All 方案',
    ar: 'مع خطة Denver For All',
    am: 'በDenver For All ዕቅድ',
  },
  'Without Rent Control': {
    vi: 'Không có kiểm soát tiền thuê',
    zh: '没有租金管制',
    ar: 'بدون ضبط الإيجار',
    am: 'ያለ ኪራይ ቁጥጥር',
  },
  "See how much you'd save if Denver had real rent stabilization.": {
    vi: 'Xem bạn sẽ tiết kiệm được bao nhiêu nếu Denver có sự ổn định tiền thuê thực sự.',
    zh: '看看如果 Denver 实行真正的租金稳定政策，你能省多少。',
    ar: 'اطّلع على ما يمكن أن توفّره لو طبّقت دنفر تثبيتًا حقيقيًا للإيجارات.',
    am: 'ዴንቨር እውነተኛ የኪራይ መረጋጋት ቢኖራት ምን ያህል እንደሚቆጥቡ ይመልከቱ።',
  },

  // ── Take-action / run-for-Denver ────────────────────────────────────────
  'Find Legal Help': {
    vi: 'Tìm trợ giúp pháp lý',
    zh: '寻找法律援助',
    ar: 'ابحث عن مساعدة قانونية',
    am: 'የሕግ ድጋፍ ያግኙ',
  },
  'Facing Eviction?': {
    vi: 'Đang đối mặt với việc bị trục xuất?',
    zh: '面临驱逐？',
    ar: 'تواجه الإخلاء؟',
    am: 'መውጣት ገጥሞዎታል?',
  },
  'Need urgent legal help?': {
    vi: 'Cần trợ giúp pháp lý khẩn cấp?',
    zh: '需要紧急法律援助？',
    ar: 'تحتاج مساعدة قانونية عاجلة؟',
    am: 'አስቸኳይ የሕግ እርዳታ ይፈልጋሉ?',
  },
  'Volunteer Your Skills': {
    vi: 'Đóng góp kỹ năng của bạn',
    zh: '贡献你的技能',
    ar: 'تطوّع بمهاراتك',
    am: 'ችሎታዎን በበጎ ፈቃደኝነት ያበርክቱ',
  },
  'Volunteer Sign-Up': {
    vi: 'Đăng ký tình nguyện',
    zh: '志愿者报名',
    ar: 'تسجيل المتطوّعين',
    am: 'የበጎ ፈቃደኝነት ምዝገባ',
  },
  'Who Should Apply': {
    vi: 'Ai nên ứng tuyển',
    zh: '谁应该申请',
    ar: 'من ينبغي أن يتقدّم',
    am: 'ማን ማመልከት አለበት',
  },
  "What We're Looking For": {
    vi: 'Điều chúng tôi tìm kiếm',
    zh: '我们在寻找什么',
    ar: 'ما الذي نبحث عنه',
    am: 'የምንፈልገው ነገር',
  },
  'Tell Us About Yourself': {
    vi: 'Hãy kể cho chúng tôi về bạn',
    zh: '介绍一下你自己',
    ar: 'حدّثنا عن نفسك',
    am: 'ስለ ራስዎ ይንገሩን',
  },
  'Working Class Roots': {
    vi: 'Gốc rễ tầng lớp lao động',
    zh: '工人阶级根基',
    ar: 'جذور الطبقة العاملة',
    am: 'የሠራተኛ መደብ መሠረት',
  },
  'Public Comment': { vi: 'Ý kiến công chúng', zh: '公众评论', ar: 'تعليق عام', am: 'የሕዝብ አስተያየት' },
  'Spread the word': {
    vi: 'Lan tỏa thông điệp',
    zh: '广而告之',
    ar: 'انشر الكلمة',
    am: 'ቃሉን ያስፋፉ',
  },
  'Take Action on This Issue': {
    vi: 'Hành động về vấn đề này',
    zh: '就此问题采取行动',
    ar: 'اتّخذ إجراءً بشأن هذه القضية',
    am: 'በዚህ ጉዳይ ላይ እርምጃ ይውሰዱ',
  },
  'Text RESIST to 50409': {
    vi: 'Nhắn RESIST đến 50409',
    zh: '发送 RESIST 至 50409',
    ar: 'أرسل RESIST إلى 50409',
    am: 'RESIST ወደ 50409 ይላኩ',
  },
  'Write your own letter': {
    vi: 'Tự viết thư của bạn',
    zh: '撰写你自己的信',
    ar: 'اكتب رسالتك الخاصة',
    am: 'የራስዎን ደብዳቤ ይጻፉ',
  },

  // ── Grant / proposal metadata ───────────────────────────────────────────
  'Funding Agency': {
    vi: 'Cơ quan tài trợ',
    zh: '资助机构',
    ar: 'جهة التمويل',
    am: 'የገንዘብ ድጋፍ ኤጀንሲ',
  },
  'Grant Program': {
    vi: 'Chương trình tài trợ',
    zh: '资助计划',
    ar: 'برنامج المنحة',
    am: 'የስጦታ ፕሮግራም',
  },
  'Estimated Amount': {
    vi: 'Số tiền ước tính',
    zh: '预计金额',
    ar: 'المبلغ المقدّر',
    am: 'የተገመተ መጠን',
  },
  Deadline: { vi: 'Hạn chót', zh: '截止日期', ar: 'الموعد النهائي', am: 'የመጨረሻ ቀን' },
  Session: { vi: 'Kỳ họp', zh: '会期', ar: 'الدورة', am: 'ክፍለ ጊዜ' },

  // ── Footer ──────────────────────────────────────────────────────────────
  'All Proposals': { vi: 'Tất cả đề xuất', zh: '所有提案', ar: 'كل المقترحات', am: 'ሁሉም ሀሳቦች' },
  'Sidewalk Data': {
    vi: 'Dữ liệu vỉa hè',
    zh: '人行道数据',
    ar: 'بيانات الأرصفة',
    am: 'የእግረኛ መንገድ መረጃ',
  },
  'Eviction Data': {
    vi: 'Dữ liệu trục xuất',
    zh: '驱逐数据',
    ar: 'بيانات الإخلاء',
    am: 'የማስወጣት መረጃ',
  },
  'Money in Politics': {
    vi: 'Tiền trong chính trị',
    zh: '政治中的金钱',
    ar: 'المال في السياسة',
    am: 'በፖለቲካ ውስጥ ያለ ገንዘብ',
  },
  'Email Us': { vi: 'Gửi email cho chúng tôi', zh: '给我们发邮件', ar: 'راسلنا', am: 'ኢሜል ይላኩልን' },
  'Signal Group': { vi: 'Nhóm Signal', zh: 'Signal 群组', ar: 'مجموعة Signal', am: 'የSignal ቡድን' },
  'Donate · Public Ledger': {
    vi: 'Quyên góp · Sổ cái công khai',
    zh: '捐款 · 公开账本',
    ar: 'تبرّع · السجلّ العام',
    am: 'ይለግሱ · ይፋዊ መዝገብ',
  },
  'GitHub · Source Code': {
    vi: 'GitHub · Mã nguồn',
    zh: 'GitHub · 源代码',
    ar: 'GitHub · الكود المصدري',
    am: 'GitHub · ምንጭ ኮድ',
  },
  'This site is open source.': {
    vi: 'Trang web này là mã nguồn mở.',
    zh: '本网站为开源项目。',
    ar: 'هذا الموقع مفتوح المصدر.',
    am: 'ይህ ድረ-ገጽ ክፍት ምንጭ ነው።',
  },
  'Built with solidarity and open-source tools.': {
    vi: 'Được xây dựng bằng tinh thần đoàn kết và các công cụ mã nguồn mở.',
    zh: '以团结精神和开源工具构建。',
    ar: 'بُني بروح التضامن وأدوات مفتوحة المصدر.',
    am: 'በአንድነት እና በክፍት ምንጭ መሣሪያዎች የተገነባ።',
  },
};

const counts = {};
for (const code of LOCALES) {
  const dict = {};
  for (const [en, t] of Object.entries(M)) {
    if (t[code]) dict[en] = t[code];
  }
  fs.writeFileSync(path.join(OUT, `${code}.json`), JSON.stringify(dict, null, 2) + '\n');
  counts[code] = Object.keys(dict).length;
}
console.log('Wrote runtime dictionaries:', counts, `(of ${Object.keys(M).length} source strings)`);
