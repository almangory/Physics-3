import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  BookOpen, 
  Cpu, 
  TrendingUp, 
  Search, 
  CornerDownLeft, 
  ChevronLeft,
  GraduationCap,
  Volume2
} from 'lucide-react';
import { chaptersData } from '../data/chapters';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  lessonLink?: {
    lessonId: string;
    chapterId: string;
    title: string;
  };
}

interface SmartAssistantProps {
  setActivePage: (page: 'dashboard' | 'favorites' | 'chapters' | 'labs' | 'flashcards' | 'worksheets' | 'quiz') => void;
}

export default function SmartAssistant({ setActivePage }: SmartAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'مرحباً بك يا بطل! 👋 أنا "نقلة"، مساعدك الفيزيائي الذكي للمنهج السوداني. 🇸🇩\n\nأستطيع البحث الفوري لك في كافة أبواب المنهج، واستخراج القوانين، الشروحات، والتعاريف بسرعة فائقة ودون أي تكاليف! \n\nاطرح سؤالك أو جرب الضغط على أحد الاقتراحات الجاهزة بالأسفل 👇',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Quick prompt suggestions
  const suggestions = [
    { text: 'قوانين كبلر 🪐', q: 'قوانين كبلر' },
    { text: 'ثابت التثاقل 🍎', q: 'قانون التثاقل الكوني' },
    { text: 'الأشعة السينية ⚡', q: 'الأشعة السينية' },
    { text: 'الترانزستور 💾', q: 'الترانزستور' },
    { text: 'الألياف الضوئية 📞', q: 'الألياف الضوئية' },
    { text: 'الموشور الزجاجي 📐', q: 'الموشور' }
  ];

  // Pre-crafted answers for perfect matching
  const preCraftedAnswers: { [key: string]: { text: string; lessonId: string; chapterId: string; lessonTitle: string } } = {
    'كبلر': {
      text: `🪐 **قوانين كبلر الثلاثة لحركة الكواكب:**\n\n1. **القانون الأول (قانون المدارات):** كل كوكب يتحرك في مدار إهليلجي (بيضاوي) بحيث تكون الشمس في إحدى بؤرتيه.\n\n2. **القانون الثاني (قانون المساحات):** الخط الواصل بين الشمس والكوكب يمسح مساحات متساوية في أزمنة متساوية. (سرعة الكوكب تزداد كلما اقترب من الحضيض وتبطئ عند الأوج).\n\n3. **القانون الثالث (قانون الأزمنة):** مكعب متوسط بعد الكوكب عن الشمس يتناسب طردياً مع مربع زمنه الدوري:\n**نق³ / ز² = ثابت**`,
      lessonId: 'les-1-3',
      chapterId: 'chap-1',
      lessonTitle: 'الباب الأول - الفصل الثالث: حركة الكواكب والأقمار الاصطناعية'
    },
    'التثاقل': {
      text: `🍎 **قانون التثاقل الكوني لنيوتن:**\n\nينص على أن أي جسمين في الكون يتجاذبان بقوة (ق) تتناسب طردياً مع حاصل ضرب كتلتيهما وعكسياً مع مربع المسافة بين مركزيهما.\n\nالصيغة الرياضية:\n**ق = ج × (ك₁ × ك₂) / ف²**\n\nحيث:\n- **ج** هو ثابت التثاقل الكوني وقيمته الثابتة: **6.67 × 10⁻¹¹ نيوتن . م² / كجم²**.\n- **ك₁ ، ك₂** كتلتا الجسمين المتجاذبين.\n- **ف** المسافة الفاصلة بين مركزيهما.`,
      lessonId: 'les-1-1',
      chapterId: 'chap-1',
      lessonTitle: 'الباب الأول - الفصل الأول: المجال التثاقلي (مجال الجاذبية)'
    },
    'الجاذبية': {
      text: `🌍 **مجال الجاذبية الأرضية وعجلة السقوط الحر:**\n\n- **المجال التثاقلي:** المنطقة المحيطة بالأرض التي تظهر فيها آثار قوتها الجاذبة للأجسام.\n- **عجلة السقوط الحر (د):** تعتمد على كتلة الكوكب ونصف قطره ولا تعتمد إطلاقاً على كتلة الجسم الساقط:\n**د = (ج × ك_أ) / ف²**\n\nوعلى سطح الأرض مباشرة قيمتها العظمى تعادل **9.8 م/ث²**. تقل كلما ارتفعنا عن سطح الأرض وتصبح صفراً تماماً في مركز الأرض.`,
      lessonId: 'les-1-1',
      chapterId: 'chap-1',
      lessonTitle: 'الباب الأول - الفصل الأول: المجال التثاقلي (مجال الجاذبية)'
    },
    'السينية': {
      text: `⚡ **الأشعة السينية (أشعة رونتجن):**\n\nهي موجات كهرومغناطيسية ذات تردد عالٍ جداً وطول موجي قصير جداً (تقع بين الأشعة فوق البنفسجية وأشعة غاما).\n\n- **كيفية إنتاجها:** تنتج في أنبوبة كولج عند اصطدام إلكترونات سريعة منبعثة من فتيل ساخن بهدف معدني ذو درجة انصهار عالية (مثل التنجستن).\n- **خصائصها:** قدرة نفاذ هائلة، تسبب تأين الغازات، تؤثر على الألواح الفوتوغرافية.\n- **تطبيقاتها:** كشف كسور العظام، فحص أمتعة المطارات، الكشف عن عيوب الصناعة والمعادن.`,
      lessonId: 'les-4-1',
      chapterId: 'chap-4',
      lessonTitle: 'الباب الرابع - الفصل الأول: بنية الذرة ونموذج بور والأشعة السينية'
    },
    'الترانزستور': {
      text: `💾 **الترانزستور (Transistor):**\n\nهو نبيطة إلكترونية تصنع من مواد شبه موصلة (سيليكون أو جرمانيوم) وتتكون من ثلاثة مناطق بلورية معالجة:\n1. **الباعث (E - Emitter):** يطلق حاملات الشحنة ويكون مشوباً بكثافة عالية.\n2. **القاعدة (B - Base):** منطقة وسطى رقيقة جداً وذات شوائب قليلة.\n3. **المجمع (C - Collector):** يجمع حاملات الشحنة القادمة من الباعث عبر القاعدة.\n\n- **الأنواع:** يتوفر بنوعين رئيسيين **NPN** و **PNP**.\n- **الاستخدام:** يعمل كمفتاح إلكتروني فائق السرعة، ومكبر ذكي للإشارات الكهربائية الضعيفة.`,
      lessonId: 'les-4-4',
      chapterId: 'chap-4',
      lessonTitle: 'الباب الرابع - الفصل الرابع: الموجات الكهرومغناطيسية وتعديل الإشارات'
    },
    'الألياف': {
      text: `📞 **الألياف الضوئية (الليفات البصرية):**\n\nعبارة عن أنابيب أو شعيرات زجاجية مرنة دقيقة جداً ومصقولة بدقة، وتعتمد فكرة عملها على ظاهرة **الانعكاس الكلي الداخلي** للضوء.\n\n- **آلية العمل:** يدخل الضوء من أحد طرفيها بزاوية أكبر من الزاوية الحرجة، فيتعرض لسلسلة من الانعكاسات الكلية المتتالية بداخلها دون فقد يذكر في الطاقة حتى يخرج من الطرف الآخر.\n- **الاستخدامات:**\n1. نقل إشارات الاتصالات الرقمية فائق السرعة عبر البحار والقارات.\n2. المناظير الطبية الاستكشافية للفحص الطبي والجراحي الداخلي.`,
      lessonId: 'les-2-4',
      chapterId: 'chap-2',
      lessonTitle: 'الباب الثاني - الفصل الرابع: انكسار الضوء وقانون سنل والمنشور'
    },
    'الموشور': {
      text: `📐 **الموشور الزجاجي وتحليل الضوء:**\n\nالموشور هو وسط كاسر شفاف ذو أسطح مستوية يسبب **انحراف** حزمة الضوء الساقطة عليه و**تحليلها** لألوان الطيف السبعة.\n\n- **أسباب التحليل:** يرجع تشتت الضوء الأبيض إلى أن الأطوال الموجية المختلفة للألوان تمتلك معاملات انكسار مختلفة داخل الزجاج؛ حيث يكون **اللون البنفسجي** هو الأكثر انحرافاً (الأقصر موجياً والأكبر انكساراً)، و**اللون الأحمر** هو الأقل انحرافاً.`,
      lessonId: 'les-2-4',
      chapterId: 'chap-2',
      lessonTitle: 'الباب الثاني - الفصل الرابع: انكسار الضوء وقانون سنل والمنشور'
    },
    'المنشور': {
      text: `📐 **المنشور الزجاجي وتحليل الضوء:**\n\nالمنشور هو وسط كاسر شفاف ذو أسطح مستوية يسبب **انحراف** حزمة الضوء الساقطة عليه و**تحليلها** لألوان الطيف السبعة.\n\n- **أسباب التحليل:** يرجع تشتت الضوء الأبيض إلى أن الأطوال الموجية المختلفة للألوان تمتلك معاملات انكسار مختلفة داخل الزجاج؛ حيث يكون **اللون البنفسجي** هو الأكثر انحرافاً (الأقصر موجياً والأكبر انكساراً)، و**اللون الأحمر** هو الأقل انحرافاً.`,
      lessonId: 'les-2-4',
      chapterId: 'chap-2',
      lessonTitle: 'الباب الثاني - الفصل الرابع: انكسار الضوء وقانون سنل والمنشور'
    },
    'انكسار': {
      text: `🌈 **انكسار الضوء وقوانينه والمناشير والألياف:**\n\nانكسار الضوء هو تغير مسار واتجاه الشعاع الضوئي عند انتقاله من وسط شفاف إلى وسط شفاف آخر كثافته الضوئية مختلفة نتيجة لتغير سرعته.\n\n- **أهم القوانين والتعاريف:**\n1. **قانون الانكسار الأول:** الشعاع الساقط والمنكسر والعمود الناظم تقع جميعها في مستوى واحد.\n2. **قانون سنل العام للانكسار:** م₁ × جا س₁ = م₂ × جا س₂.\n3. **معامل الانكسار المطلق (م):** م = سرعة الضوء في الهواء / سرعته في الوسط = العمق الحقيقي / العمق الظاهري.\n4. **الزاوية الحرجة (ح):** زاوية سقوط في الوسط الأكبر كثافة تقابلها زاوية انكسار 90 درجة في الوسط الأقل كثافة.\n\n- **التطبيقات العملية:** الألياف الضوئية (اللياف البصرية)، والمنشور الزجاجي، والعدسات والمرايا الكرية.`,
      lessonId: 'les-2-4',
      chapterId: 'chap-2',
      lessonTitle: 'الباب الثاني - الفصل الرابع: انكسار الضوء وقانون سنل والمنشور'
    },
    'الانكسار': {
      text: `🌈 **انكسار الضوء وقوانينه والمناشير والألياف:**\n\nانكسار الضوء هو تغير مسار واتجاه الشعاع الضوئي عند انتقاله من وسط شفاف إلى وسط شفاف آخر كثافته الضوئية مختلفة نتيجة لتغير سرعته.\n\n- **أهم القوانين والتعاريف:**\n1. **قانون الانكسار الأول:** الشعاع الساقط والمنكسر والعمود الناظم تقع جميعها في مستوى واحد.\n2. **قانون سنل العام للانكسار:** م₁ × جا س₁ = م₂ × جا س₂.\n3. **معامل الانكسار المطلق (م):** م = سرعة الضوء في الهواء / سرعته في الوسط = العمق الحقيقي / العمق الظاهري.\n4. **الزاوية الحرجة (ح):** زاوية سقوط في الوسط الأكبر كثافة تقابلها زاوية انكسار 90 درجة في الوسط الأقل كثافة.\n\n- **التطبيقات العملية:** الألياف الضوئية (اللياف البصرية)، والمنشور الزجاجي، والعدسات والمرايا الكرية.`,
      lessonId: 'les-2-4',
      chapterId: 'chap-2',
      lessonTitle: 'الباب الثاني - الفصل الرابع: انكسار الضوء وقانون سنل والمنشور'
    },
    'ليزر': {
      text: `✨ **أشعة الليزر (LASER):**\n\nتضخيم الضوء بواسطة الانبعاث المستحث للإشعاع. وهي أشعة فريدة تتميز بـ:\n1. **النقاء الطيفي (أحادية الطول الموجي):** فوتوناتها ذات تردد ولون واحد دقيق.\n2. **التوازي الشديد:** تسير لمسافات شاسعة كحزمة رفيعة جداً دون تشتت.\n3. **الترابط الزمني والمكاني:** الفوتونات تنطلق متفقة في الطور والاتجاه.\n\n- **استخداماتها:** الجراحات الدقيقة (مثل تصحيح النظر)، الاتصالات عبر الألياف الضوئية، قراءة الأقراص المدمجة، وفي التطبيقات العسكرية والصناعية لقطع المعادن.`,
      lessonId: 'les-4-2',
      chapterId: 'chap-4',
      lessonTitle: 'الباب الرابع - الفصل الأول: الانبعاث التلقائي والمستحث والليزر'
    }
  };

  const handleSearch = (searchText: string) => {
    if (!searchText.trim()) return;

    // Add user message to stack
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: searchText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI thinking and smart rule-based indexing lookup
    setTimeout(() => {
      const normalized = searchText.toLowerCase().trim();
      
      // 1. Check direct pre-crafted answers
      let foundResponse: Message | null = null;
      for (const [key, val] of Object.entries(preCraftedAnswers)) {
        if (normalized.includes(key)) {
          foundResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: val.text,
            timestamp: new Date(),
            lessonLink: {
              lessonId: val.lessonId,
              chapterId: val.chapterId,
              title: val.lessonTitle
            }
          };
          break;
        }
      }

      // 2. Fallback to curriculum keyword indexer
      if (!foundResponse) {
        const stopWords = new Set(['ما', 'هو', 'هي', 'في', 'من', 'على', 'عن', 'ماذا', 'كيف', 'احسب', 'قانون', 'تعريف', 'شرح', 'درس', 'الذي', 'التي', 'هل', 'ماهي', 'ماهو', 'فيزياء', 'صف', 'ثالث', 'سوداني']);
        const keywords = normalized
          .split(/[\s،,._?؟\-]+/)
          .filter(word => word.length > 2 && !stopWords.has(word));

        if (keywords.length === 0 && normalized.length > 0) {
          keywords.push(normalized);
        }

        const matches: Array<{ chapter: any; lesson: any; score: number; bestSentence: string }> = [];

        for (const chap of chaptersData) {
          for (const les of chap.lessons) {
            let score = 0;
            let bestSentence = '';

            const titleLower = les.title.toLowerCase();
            const subtitleLower = (les.subtitle || '').toLowerCase();
            const contentLower = les.content.replace(/<[^>]*>/g, ' ').toLowerCase();

            keywords.forEach(kw => {
              if (titleLower.includes(kw)) score += 30;
              if (subtitleLower.includes(kw)) score += 15;
              if (contentLower.includes(kw)) score += 5;
            });

            // Find best matching sentence in content
            if (score > 0) {
              const cleanContent = les.content.replace(/<[^>]*>/g, ' ');
              const sentences = cleanContent.split(/[.،。\n\r]/);
              let highestSentenceScore = 0;

              sentences.forEach(s => {
                let sScore = 0;
                keywords.forEach(kw => {
                  if (s.toLowerCase().includes(kw)) sScore += 1;
                });
                if (sScore > highestSentenceScore) {
                  highestSentenceScore = sScore;
                  bestSentence = s.trim();
                }
              });

              matches.push({
                chapter: chap,
                lesson: les,
                score,
                bestSentence: bestSentence || les.subtitle || ''
              });
            }
          }
        }

        // Sort by score
        matches.sort((a, b) => b.score - a.score);

        if (matches.length > 0) {
          const topMatch = matches[0];
          let formattedReply = `🔍 **لقد عثرت على تطابق في المنهج لطلبك!**\n\n📖 **${topMatch.chapter.title} - ${topMatch.lesson.title}**\n\n"${topMatch.bestSentence}"\n\n`;
          
          if (topMatch.lesson.formulas && topMatch.lesson.formulas.length > 0) {
            formattedReply += `📐 **أهم القوانين في هذا الدرس:**\n`;
            topMatch.lesson.formulas.slice(0, 2).forEach((f: any) => {
              formattedReply += `- **${f.name}:** \`${f.formula}\` (${f.explanation})\n`;
            });
            formattedReply += `\n`;
          }

          if (topMatch.lesson.keyPoints && topMatch.lesson.keyPoints.length > 0) {
            formattedReply += `💡 **النقاط الجوهرية للدرس:**\n`;
            topMatch.lesson.keyPoints.slice(0, 2).forEach((kp: string) => {
              formattedReply += `- ${kp}\n`;
            });
          }

          foundResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: formattedReply,
            timestamp: new Date(),
            lessonLink: {
              lessonId: topMatch.lesson.id,
              chapterId: topMatch.chapter.id,
              title: `${topMatch.chapter.title.split('：')[0].split(':')[0]} - ${topMatch.lesson.title}`
            }
          };
        } else {
          foundResponse = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `⚠️ **لم أجد تطابقاً دقيقاً في المنهج لـ "${searchText}"**\n\nأنا أبحث داخل محتويات ومسائل فيزياء الصف الثالث الثانوي السوداني مجاناً وبسرعة فائقة.\n\n**جرّب الاستفسار بكلمات مفتاحية مبسطة مثل:**\n- كبلر، الجاذبية، الموشور، الضوء\n- الأشعة السينية، الليزر، الترانزستور، أشباه الموصلات\n- طيف الهيدروجين، التلسكوب، البندول البسيط.`,
            timestamp: new Date()
          };
        }
      }

      setMessages(prev => [...prev, foundResponse!]);
      setIsTyping(false);
    }, 1000);
  };

  const handleLinkClick = (link: { lessonId: string; chapterId: string; title: string }) => {
    localStorage.setItem('highlight_lesson_id', link.lessonId);
    setActivePage('chapters');
    setIsOpen(false);
  };

  return (
    <>
      {/* 🔴 FLOATING ACTION BUTTON (FAB) IN BOTTOM-LEFT */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              id="smart-assistant-fab"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-700 text-white flex items-center justify-center shadow-xl hover:shadow-sky-500/20 transition-all duration-300 relative border-2 border-white focus:outline-none"
            >
              {/* Pulsing glow ring */}
              <span className="absolute -inset-1 rounded-full bg-sky-500/30 animate-ping opacity-75" />
              <Sparkles className="w-6 h-6" />
              
              {/* Mini badge / label next to it */}
              <span className="absolute right-16 bg-slate-900 text-white text-[11px] px-2.5 py-1.5 rounded-xl font-bold whitespace-nowrap opacity-90 border border-slate-700 shadow-md">
                اسأل "نقلة" الذكي 🧠
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 🟢 CHAT DIALOG PANEL (EXPANDS FROM BOTTOM LEFT) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="smart-assistant-panel"
            initial={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col focus:outline-none text-slate-900"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-sky-900 text-white p-4 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sky-300 relative">
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-indigo-900" />
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm">الباحث الذكي للمنهج السوداني</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-sky-200 font-bold">مساعدك الذكي "نقلة" ⚡</span>
                    <span className="text-[10px] text-emerald-400 font-bold">• متصل بالمنهج</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 bg-white/10 hover:bg-white/25 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/70 space-y-4 text-right">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm font-semibold whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-sky-600 text-white rounded-bl-none text-right'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-br-none text-right'
                    }`}
                  >
                    {msg.text}

                    {/* Quick navigation link back to lessons if recommended */}
                    {msg.lessonLink && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-bold block mb-1">الدرس المقترح للمراجعة:</span>
                        <button
                          onClick={() => handleLinkClick(msg.lessonLink!)}
                          className="w-full py-2 px-3 bg-sky-50 hover:bg-sky-100 text-sky-700 font-black text-[11px] rounded-lg text-center transition flex items-center justify-center gap-1.5 border border-sky-100"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          قراءة شرح {msg.lessonLink.title} 📖
                        </button>
                        <button
                          onClick={() => {
                            setActivePage('quiz');
                            setIsOpen(false);
                          }}
                          className="w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-[11px] rounded-lg text-center transition flex items-center justify-center gap-1.5 border border-indigo-100"
                        >
                          <Cpu className="w-3.5 h-3.5" />
                          بدء اختبار تفاعلي في هذا الباب 📝
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-end">
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2 border-t border-slate-100 bg-white">
              <span className="text-[10px] text-slate-400 font-bold block mb-1.5 text-right">💡 أسئلة شائعة في المنهج للاستفسار السريع:</span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {suggestions.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(s.q)}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-[10px] rounded-lg font-bold border border-slate-200 hover:border-sky-200 transition"
                  >
                    {s.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2 items-center"
            >
              <button
                type="submit"
                className="w-10 h-10 bg-sky-600 hover:bg-sky-700 text-white rounded-xl flex items-center justify-center transition active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4 transform rotate-180" />
              </button>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="اسألني عن: كبلر، الجاذبية، الموشور..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-right focus:outline-none focus:border-sky-500 font-bold"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
