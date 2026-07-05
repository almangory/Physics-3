import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Printer, ShieldAlert, Sparkles, Sliders, CheckCircle, AlertCircle, Check, HelpCircle, CheckSquare, Award, Activity, RotateCcw } from 'lucide-react';
import { chaptersData, questionsData } from '../data/chapters';
import { sudanExamPages, SudanPage, SudanQuestion } from '../data/sudanExam';
import { Question } from '../types';

const SUDAN_ALTERNATIVES: { [key: string]: { text: string; modelAnswer: any; options?: string[]; tableData?: any; subQuestions?: string[]; pairs?: any }[] } = {
  'p2-q1': [
    {
      text: "قارن بين الموجة الميكانيكية والموجة الكهرومغناطيسية في الجدول التالي:",
      tableData: {
        headers: ["وجه المقارنة", "الموجة الميكانيكية", "الموجة الكهرومغناطيسية"],
        rows: [
          ["(i) الوسط المادي لانتشارها", "تحتاج لوسط مادي لانتشارها ولا تنتشر بالفراغ", "لا تحتاج لوسط مادي وتنتشر بالفراغ والهواء"],
          ["(ii) النموذج أو المثال", "موجات الصوت / موجات زلزلية", "موجات الضوء / أشعة الليزر / الراديو"]
        ]
      },
      modelAnswer: ["تحتاج لوسط مادي", "لا تحتاج لوسط مادي", "موجات الصوت", "موجات الضوء"]
    },
    {
      text: "أكمل جدول المقارنة التالي بين الصوت والضوء من حيث الخصائص العامة للموجات:",
      tableData: {
        headers: ["وجه المقارنة", "موجات الصوت", "موجات الضوء"],
        rows: [
          ["(i) نوع الموجة", "موجات طولية ميكانيكية", "موجات مستعرضة كهرومغناطيسية"],
          ["(ii) السرعة في الهواء", "بطيئة نسبياً (حوالي ٣٤٠ م/ث)", "سريعة جداً (٣ × ١٠٨ م/ث)"]
        ]
      },
      modelAnswer: ["طولية ميكانيكية", "مستعرضة كهرومغناطيسية", "بطيئة نسبياً", "سريعة جداً"]
    }
  ],
  'p2-q2': [
    {
      text: "رتب مناطق الطيف الكهرومغناطيسي التالية تصاعدياً ابتداءً بأقصرها طولاً موجياً (من الأقصر للأطول): الضوء المرئي - أشعة غاما - الأشعة السينية - تحت الحمراء.",
      modelAnswer: "أشعة غاما ⟸ الأشعة السينية ⟸ الضوء المرئي ⟸ تحت الحمراء"
    },
    {
      text: "رتب الألوان التالية تنازلياً ابتداءً بأكبرها تردداً (من الأعلى تردداً للأقل): الأحمر - الأزرق - البنفسجي - الأصفر.",
      modelAnswer: "البنفسجي ⟸ الأزرق ⟸ الأصفر ⟸ الأحمر"
    }
  ],
  'p2-q3': [
    {
      text: "حركة توافقية بسيطة ترددها 400 هيرتز وسرعتها 200 م/ث وسعتها 10 سم. احسب:",
      subQuestions: [
        "(i) طول الموجة (λ)",
        "(ii) السرعة الزاوية للحركة (ω)"
      ],
      modelAnswer: [
        "(i) طول الموجة (λ): λ = ع / د = 200 / 400 = 0.5 متر (٥٠ سم).",
        "(ii) السرعة الزاوية: ω = ٢ ط د = ٢ × ط × 400 = 800 ط راديان/ثانية."
      ]
    }
  ],
  'p2-q4': [
    {
      text: "سرعة الضوء في وسط شفاف تعادل 1.5 × 10⁸ م/ث، وسرعة الضوء في الهواء 3 × 10⁸ م/ث، احسب معامل الانكسار المطلق للوسط.",
      modelAnswer: "معامل الانكسار (م) = جـ / ع = (3 × 10⁸) / (1.5 × 10⁸) = 2.0"
    },
    {
      text: "إذا كان معامل انكسار الماس يساوي 2.4، وسرعة الضوء في الهواء 3 × 10⁸ م/ث، فما هي سرعة الضوء داخل الماس؟",
      modelAnswer: "سرعة الضوء في الماس (ع) = جـ / م = (3 × 10⁸) / 2.4 = 1.25 × 10⁸ م/ث."
    }
  ],
  'p2-q5': [
    {
      text: "علل لما يلي تعليلاً علمياً دقيقاً وموجزاً:",
      subQuestions: [
        "(i) لا يحدث الانعكاس الكلي الداخلي إلا عند انتقال الضوء من وسط أكبر كثافة لوسط أقل.",
        "(ii) يفضل استخدام الألياف الضوئية على الأسلاك النحاسية في الاتصالات."
      ],
      modelAnswer: [
        "(i) لأن زاوية الانكسار تكون أكبر من زاوية السقوط، فلا بد أن ينحرف الشعاع مبتعداً عن العمود ليصل لزاوية ٩٠ درجة (الزاوية الحرجة) ثم ينعكس كلياً.",
        "(ii) لأنها تنقل كميات هائلة من البيانات بسرعة الضوء دون فقد في الإشارة وتتحمل المسافات الشاسعة دون تداخل كهرومغناطيسي."
      ]
    }
  ],
  'p2-q6': [
    {
      text: "في التلسكوب الكاسر في وضع الضبط العادي، يحسب التكبير الزاوي (ت) من الصيغة:",
      modelAnswer: "ت = ع_ش / ع_ع (حيث ع_ش البعد البؤري للشيئية، وع_ع البعد البؤري للعينية)"
    }
  ],
  'p3-q2': [
    {
      text: "إذا كانت عجلة حركة توافقية بسيطة تعطى بالعلاقة: جـ = -١٦ ص (متر/ثانية²). جد:",
      subQuestions: [
        "(i) التردد الزاوي للحركة (ω) والتردد الطبيعي (د)",
        "(ii) مقدار العجلة عندما تكون الإزاحة ص = 2 متر"
      ],
      modelAnswer: [
        "(i) التردد الزاوي (ω): ω² = 16 ⟹ ω = 4 راد/ث. التردد د = ω / ٢ ط = 2 / ط هرتز.",
        "(ii) جـ = -١٦ × 2 = -32 م/ث²."
      ]
    }
  ],
  'p3-q3': [
    {
      text: "ارسم دائرة حول الحرف الذي يمثل الإجابة الصحيحة لكل مما يلي:",
      options: [
        "١. في الحركة التوافقية البسيطة للبندول، طاقة الحركة تكون عظمى عند:\nأ) أقصى إزاحة   ب) موضع الاستقرار   ج) منتصف الطريق   د) نقطة التعليق",
        "٢. الخاصية التي تتيح للضوء الانتشار في الفراغ هي أنه موجة:\nأ) طولية ميكانيكية   ب) كهرومغناطيسية مستعرضة   ج) صوتية مستعرضة   د) اهتزازية مقيدة",
        "٣. معامل الانكسار المطلق لجميع الأوساط الشفافة يكون دائماً:\nأ) أقل من الواحد   ب) مساوياً للصفر   ج) أكبر من الواحد الصحيح   د) سالباً",
        "٤. يتكون قوس قزح بسبب تداخل ظاهرتين في قطرة المطر هما:\nأ) الانعكاس والحيود   ب) الانكسار والانعكاس الكلي   ج) التداخل والامتصاص   د) الاستقطاب والتشتت"
      ],
      modelAnswer: [
        "١. ب) موضع الاستقرار",
        "٢. ب) كهرومغناطيسية مستعرضة",
        "٣. ج) أكبر من الواحد الصحيح",
        "٤. ب) الانكسار والانعكاس الكلي"
      ]
    }
  ],
  'p4-q5': [
    {
      text: "احسب عدد الإلكترونات المارة في موصل يمر به تيار شدته 8 أمبير خلال زمن قدره 10 ثواني (علماً بأن شحنة الإلكترون ش_إ = 1.6 × 10⁻١٩ كولوم):",
      modelAnswer: "الشحنة الكلية ش = ت × ن = 8 × 10 = 80 كولوم.\nعدد الإلكترونات ن = ش / ش_إ = 80 / (1.6 × 10⁻١٩) = 5 × 10٢⁰ إلكترون."
    }
  ],
  'p5-q3': [
    {
      text: "سقط ضوء تردده 1.2 × 10¹٥ هرتز على فلز دالة شغله 4.0 × 10⁻١٩ جول. إذا علمت أن ثابت بلانك هـ = 6.6 × 10⁻٣٤ جول.ثانية، احسب:",
      subQuestions: [
        "(i) طاقة الفوتون الساقط بالدول",
        "(ii) طاقة الحركة العظمى للإلكترونات الضوئية المنبعثة"
      ],
      modelAnswer: [
        "(i) طاقة الفوتون ط = هـ د = 6.6 × 10⁻٣٤ × 1.2 × 10¹٥ = 7.92 × 10⁻١٩ جول.",
        "(ii) طاقة الحركة العظمى ط_ح = ط - ش_٠ = 7.92 × 10⁻١٩ - 4.0 × 10⁻١٩ = 3.92 × 10⁻١٩ جول."
      ]
    }
  ],
  'p7-q2': [
    {
      text: "سلكان من النحاس لهما نفس المقاومة والنوع، فإذا كان طول الأول ضعف طول الثاني، احسب النسبة بين مساحة مقطع الأول ومساحة مقطع الثاني (أ_١ / أ_٢):",
      modelAnswer: "بما أن المقاومة والنوع متماثلان فإن ل_١ / أ_١ = ل_٢ / أ_٢.\nبما أن ل_١ = ٢ ل_٢ فإن ٢ ل_٢ / أ_١ = ل_٢ / أ_٢ ⟹ أ_١ / أ_٢ = 2. أي مساحة الأول ضعف الثاني."
    }
  ],
  'p7-q6': [
    {
      text: "احسب القوة المغناطيسية المؤثرة على سلك طوله 2 متر يمر به تيار 5 أمبير موضوع عمودياً في مجال مغناطيسي شدته 3 تسلا:",
      modelAnswer: "ق = ت ل شـ جا θ\nبما أنه موضوع عمودياً فإن جا θ = 1.\nق = 5 × 2 × 3 × 1 = 30 نيوتن."
    }
  ],
  'p8-q2': [
    {
      text: "جد التردد الأعظم للأشعة السينية الناتجة عن تعجيل الإلكترونات تحت فرق جهد 20,000 فولت (٢٠ كيلو فولت) في أنبوبة كولدج (علماً بأن هـ = 6.6 × 10⁻٣٤ جول.ثانية، ش_إ = 1.6 × 10⁻١٩ كولوم):",
      modelAnswer: "هـ × د_الأعظم = ش_إ × جـ\nد_الأعظم = (ش_إ × جـ) / هـ = (1.6 × 10⁻١٩ × 20000) / (6.6 × 10⁻٣٤) = 3.2 × 10⁻١٥ / (6.6 × 10⁻٣٤) ≈ 4.85 × 10¹⁷ هيرتز."
    }
  ]
};

interface WorksheetGeneratorProps {
  favoriteLessonIds: string[];
}

const renderSudanSVG = (svgType: string) => {
  switch (svgType) {
    case 'prism':
      return (
        <div className="flex flex-col items-center my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <svg width="220" height="130" viewBox="0 0 220 130" className="mx-auto">
            {/* Triangular Glass Prism */}
            <polygon points="110,15 40,110 180,110" fill="rgba(186, 230, 253, 0.3)" stroke="#0369a1" strokeWidth="2" />
            <text x="110" y="75" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">منشور زجاجي</text>
            
            {/* Incident Ray */}
            <line x1="5" y1="85" x2="72" y2="68" stroke="#ef4444" strokeWidth="2" />
            <path d="M40,76 L48,74 L42,82 Z" fill="#ef4444" /> {/* Arrow */}
            <text x="10" y="105" fill="#ef4444" fontSize="8" fontWeight="bold">الشعاع الساقط</text>
            
            {/* Normal line 1 */}
            <line x1="50" y1="40" x2="90" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            
            {/* Refracted Ray inside prism */}
            <line x1="72" y1="68" x2="148" y2="72" stroke="#ef4444" strokeWidth="2" strokeDasharray="2,2" />
            
            {/* Normal line 2 */}
            <line x1="130" y1="40" x2="165" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Emergent Ray */}
            <line x1="148" y1="72" x2="215" y2="110" stroke="#ef4444" strokeWidth="2" />
            <path d="M180,90 L188,94 L184,86 Z" fill="#ef4444" /> {/* Arrow */}
            <text x="175" y="60" fill="#475569" fontSize="8">أكمل مسار الانكسار</text>
          </svg>
        </div>
      );
    case 'earth':
      return (
        <div className="flex flex-col items-center my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <svg width="220" height="130" viewBox="0 0 220 130" className="mx-auto">
            {/* Earth Sphere */}
            <circle cx="110" cy="65" r="40" fill="rgba(14, 165, 233, 0.15)" stroke="#0284c7" strokeWidth="2" />
            <line x1="110" y1="15" x2="110" y2="115" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,4" /> {/* Axis */}
            
            <text x="110" y="12" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">الشمال الجغرافي (جـ)</text>
            <text x="110" y="125" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">الجنوب الجغرافي (شـ)</text>
            
            {/* Earth magnetic poles inside */}
            <rect x="105" y="45" width="10" height="40" rx="2" fill="#f43f5e" stroke="#e11d48" strokeWidth="1" />
            <text x="110" y="55" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">S</text>
            <text x="110" y="80" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
            
            {/* Magnetic Field Lines Placeholder */}
            <path d="M107,80 C60,85 60,50 107,50" fill="none" stroke="#e11d48" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M113,80 C160,85 160,50 113,50" fill="none" stroke="#e11d48" strokeWidth="1" strokeDasharray="3,3" />
            <text x="45" y="65" fill="#e11d48" fontSize="8">خطوط الفيض</text>
          </svg>
        </div>
      );
    case 'wave':
      return (
        <div className="flex flex-col items-center my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <svg width="400" height="120" viewBox="0 0 400 120" className="mx-auto">
            {/* Grid axis */}
            <line x1="10" y1="60" x2="390" y2="60" stroke="#475569" strokeWidth="1.5" />
            <line x1="20" y1="10" x2="20" y2="110" stroke="#475569" strokeWidth="1.5" />
            
            {/* Ticks & Labels */}
            <text x="385" y="75" fill="#475569" fontSize="9" fontWeight="bold">المسافة (م)</text>
            <text x="10" y="20" fill="#475569" fontSize="9" fontWeight="bold">الإزاحة (ص)</text>
            
            {/* Sine wave path: Amplitude = 35px, 2.5 wavelengths */}
            {/* 1 wave = 140px, total 2.5 waves = 350px */}
            <path d="M 20 60 Q 55 20, 90 60 T 160 60 T 230 60 T 300 60 T 370 60" fill="none" stroke="#0891b2" strokeWidth="2" />
            
            {/* Amplitude Indicator */}
            <line x1="55" y1="60" x2="55" y2="20" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="60" y="35" fill="#f43f5e" fontSize="8" fontWeight="bold">ر = 4 متر</text>
            
            {/* Points A and C */}
            <circle cx="20" cy="60" r="4" fill="#ef4444" />
            <text x="15" y="50" fill="#ef4444" fontSize="10" fontWeight="bold">أ</text>

            <circle cx="370" cy="60" r="4" fill="#ef4444" />
            <text x="375" y="50" fill="#ef4444" fontSize="10" fontWeight="bold">جـ</text>
            
            {/* Total distance bracket */}
            <line x1="20" y1="100" x2="370" y2="100" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="95" x2="20" y2="105" stroke="#475569" strokeWidth="1" />
            <line x1="370" y1="95" x2="370" y2="105" stroke="#475569" strokeWidth="1" />
            <text x="195" y="112" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">المسافة الكلية أ جـ = 20 متر (خلال 5 ثواني)</text>
          </svg>
        </div>
      );
    case 'lens_types':
      return (
        <div className="flex justify-around items-center my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          {/* Lens 1: Double Concave */}
          <div className="text-center">
            <svg width="70" height="90" viewBox="0 0 70 90" className="mx-auto">
              <path d="M25,10 C35,25 35,65 25,80 L45,80 C35,65 35,25 45,10 Z" fill="rgba(14, 165, 233, 0.15)" stroke="#0284c7" strokeWidth="1.5" />
            </svg>
            <span className="text-[9px] text-slate-500 block font-bold mt-1">(i) ............................</span>
          </div>
          {/* Lens 2: Meniscus */}
          <div className="text-center">
            <svg width="70" height="90" viewBox="0 0 70 90" className="mx-auto">
              <path d="M25,10 C45,25 45,65 25,80 C35,65 35,25 25,10 Z" fill="rgba(14, 165, 233, 0.15)" stroke="#0284c7" strokeWidth="1.5" />
            </svg>
            <span className="text-[9px] text-slate-500 block font-bold mt-1">(ii) ............................</span>
          </div>
          {/* Lens 3: Double Convex */}
          <div className="text-center">
            <svg width="70" height="90" viewBox="0 0 70 90" className="mx-auto">
              <path d="M35,10 C45,30 45,60 35,80 C25,60 25,30 35,10 Z" fill="rgba(14, 165, 233, 0.15)" stroke="#0284c7" strokeWidth="1.5" />
            </svg>
            <span className="text-[9px] text-slate-500 block font-bold mt-1">(iii) ............................</span>
          </div>
        </div>
      );
    case 'mirror':
      return (
        <div className="flex flex-col items-center my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <svg width="250" height="110" viewBox="0 0 250 110" className="mx-auto">
            {/* Principal Axis */}
            <line x1="10" y1="55" x2="230" y2="55" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
            
            {/* Concave Mirror Curve */}
            <path d="M190,15 Q215,55 190,95" fill="none" stroke="#0284c7" strokeWidth="3" />
            {/* Hatching ticks behind mirror */}
            <path d="M193,15 L198,18 M197,30 L202,33 M201,45 L206,48 M202,60 L207,63 M201,75 L206,78 M197,90 L202,93" stroke="#94a3b8" strokeWidth="1" />
            
            {/* Center (م), Focus (ب), Pole (ق) */}
            <circle cx="50" cy="55" r="3" fill="#475569" />
            <text x="50" y="70" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">م</text>

            <circle cx="120" cy="55" r="3" fill="#475569" />
            <text x="120" y="70" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">ب</text>
            
            <text x="210" y="68" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">ق</text>
            
            {/* Object Arrow */}
            <line x1="85" y1="55" x2="85" y2="25" stroke="#ef4444" strokeWidth="2.5" />
            <path d="M85,25 L81,32 L89,32 Z" fill="#ef4444" />
            <text x="85" y="18" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">الجسم</text>
            
            <text x="140" y="100" fill="#64748b" fontSize="8">تتبع مسار الأشعة لإيجاد الصورة</text>
          </svg>
        </div>
      );
    case 'circuit':
      return (
        <div className="flex flex-col items-center my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <svg width="280" height="120" viewBox="0 0 280 120" className="mx-auto">
            {/* Main Outer Rectangle Loop */}
            <rect x="20" y="15" width="240" height="90" fill="none" stroke="#475569" strokeWidth="1.5" />
            
            {/* Battery 1 (ق_د1 = 35V) */}
            <line x1="60" y1="15" x2="80" y2="15" stroke="#ffffff" strokeWidth="4" /> {/* gap */}
            <line x1="65" y1="5" x2="65" y2="25" stroke="#0284c7" strokeWidth="2" /> {/* positive long */}
            <line x1="75" y1="10" x2="75" y2="20" stroke="#f43f5e" strokeWidth="3.5" /> {/* negative short */}
            <text x="70" y="37" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">ق_د١=٣٥ف، ١أوم</text>
            
            {/* Battery 2 (ق_د2 = 10V) on opposing connection */}
            <line x1="180" y1="15" x2="200" y2="15" stroke="#ffffff" strokeWidth="4" /> {/* gap */}
            <line x1="185" y1="10" x2="185" y2="20" stroke="#f43f5e" strokeWidth="3.5" /> {/* negative short */}
            <line x1="195" y1="5" x2="195" y2="25" stroke="#0284c7" strokeWidth="2" /> {/* positive long */}
            <text x="190" y="37" fill="#f43f5e" fontSize="7" fontWeight="bold" textAnchor="middle">ق_د٢=١٠ف، ٢أوم</text>
            
            {/* Resistor 1 (م1 = 2 أوم) */}
            <line x1="20" y1="50" x2="20" y2="70" stroke="#ffffff" strokeWidth="10" />
            <path d="M20,45 L15,48 L25,52 L15,56 L25,60 L15,64 L25,68 L20,71" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="35" y="60" fill="#10b981" fontSize="8" fontWeight="bold">م١ = ٢ أوم</text>
            
            {/* Resistor 2 (م2 = 2 أوم) */}
            <line x1="140" y1="105" x2="160" y2="105" stroke="#ffffff" strokeWidth="10" />
            <path d="M135,105 L138,100 L142,110 L146,100 L150,110 L154,100 L158,110 L161,105" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="148" y="97" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">م٢ = ٢ أوم</text>
            
            {/* Resistor 3 (م3 = 3 أوم) */}
            <line x1="260" y1="50" x2="260" y2="70" stroke="#ffffff" strokeWidth="10" />
            <path d="M260,45 L255,48 L265,52 L255,56 L265,60 L255,64 L265,68 L260,71" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="245" y="60" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="left">م٣ = ٣ أوم</text>
            
            {/* Current Arrow indicator */}
            <path d="M 120 15 L 128 15" stroke="#475569" strokeWidth="1.5" />
            <polygon points="128,15 124,12 124,18" fill="#475569" />
            <text x="124" y="27" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">ت ⟸</text>
          </svg>
        </div>
      );
    case 'solenoid':
      return (
        <div className="flex flex-col items-center my-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <svg width="260" height="100" viewBox="0 0 260 100" className="mx-auto">
            {/* Central cylindrical core */}
            <rect x="50" y="30" width="160" height="30" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            
            {/* Wire wrapping around core */}
            <path d="M 60,60 C 58,15 78,15 80,60" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 80,60 C 78,15 98,15 100,60" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 100,60 C 98,15 118,15 120,60" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 120,60 C 118,15 138,15 140,60" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 140,60 C 138,15 158,15 160,60" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 160,60 C 158,15 178,15 180,60" fill="none" stroke="#b45309" strokeWidth="2.5" />
            <path d="M 180,60 C 178,15 198,15 200,60" fill="none" stroke="#b45309" strokeWidth="2.5" />

            {/* Connecting terminals */}
            <line x1="60" y1="60" x2="60" y2="85" stroke="#b45309" strokeWidth="2" />
            <line x1="200" y1="60" x2="200" y2="85" stroke="#b45309" strokeWidth="2" />
            
            {/* Plus / Minus labels */}
            <text x="55" y="95" fill="#e11d48" fontSize="10" fontWeight="bold">(+)</text>
            <text x="205" y="95" fill="#475569" fontSize="10" fontWeight="bold">(-)</text>
            
            {/* Current Direction labels */}
            <text x="73" y="90" fill="#b45309" fontSize="8" fontWeight="bold">ت ⟰</text>
            
            <text x="130" y="95" fill="#64748b" fontSize="8" textAnchor="middle">ارسم خطوط الفيض المغناطيسي وأقطاب الملف</text>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

const getQuestionLines = (q: SudanQuestion): { text: string; isAnswerLine: boolean }[] => {
  const lines: { text: string; isAnswerLine: boolean }[] = [];

  // Case 1: If q.subQuestions is explicitly defined, use them!
  if (q.subQuestions && q.subQuestions.length > 0) {
    q.subQuestions.forEach(sq => {
      const cleanSq = sq.replace(/\[([^\]]+)\]/g, '........................');
      lines.push({ text: cleanSq, isAnswerLine: false });
      lines.push({ text: '............................................................................................................................................', isAnswerLine: true });
    });
    return lines;
  }

  // Case 2: If q.modelAnswer is an array of strings
  if (Array.isArray(q.modelAnswer)) {
    // If it's like p4-q6 where there's just one big string with newlines in the array
    if (q.modelAnswer.length === 1 && typeof q.modelAnswer[0] === 'string' && q.modelAnswer[0].includes('\n')) {
      const parts = q.modelAnswer[0].split('\n');
      parts.forEach(part => {
        if (part.includes('[') && part.includes(']')) {
          const cleanPart = part.replace(/\[([^\]]+)\]/g, ' (........................) ');
          lines.push({ text: cleanPart, isAnswerLine: false });
        } else {
          lines.push({ text: part, isAnswerLine: false });
          if (part.trim().endsWith(':') || /^\s*[\(\u0660-\u0669\d\-\*]/.test(part)) {
             lines.push({ text: '............................................................................................................................................', isAnswerLine: true });
          }
        }
      });
      return lines;
    }

    // Otherwise, loop through each item in the modelAnswer array
    q.modelAnswer.forEach(ans => {
      if (typeof ans === 'string') {
        const parts = ans.split('\n');
        const firstLine = parts[0];
        
        if (firstLine.includes('[') && firstLine.includes(']')) {
          const cleanLine = firstLine.replace(/\[([^\]]+)\]/g, ' (........................) ');
          lines.push({ text: cleanLine, isAnswerLine: false });
        } else {
          const cleanLine = firstLine.trim();
          lines.push({ text: cleanLine, isAnswerLine: false });
          lines.push({ text: '............................................................................................................................................', isAnswerLine: true });
          if (parts.length > 2) {
            lines.push({ text: '............................................................................................................................................', isAnswerLine: true });
          }
        }
      }
    });
    return lines;
  }

  // Case 3: Single string modelAnswer
  if (typeof q.modelAnswer === 'string') {
    if (q.modelAnswer.includes('[') && q.modelAnswer.includes(']')) {
      const parts = q.modelAnswer.split('\n');
      parts.forEach(part => {
        const cleanPart = part.replace(/\[([^\]]+)\]/g, ' (........................) ');
        lines.push({ text: cleanPart, isAnswerLine: false });
      });
    } else {
      lines.push({ text: '............................................................................................................................................', isAnswerLine: true });
      lines.push({ text: '............................................................................................................................................', isAnswerLine: true });
    }
    return lines;
  }

  // Fallback
  return [
    { text: '............................................................................................................................................', isAnswerLine: true },
    { text: '............................................................................................................................................', isAnswerLine: true }
  ];
};

interface WorksheetGeneratorProps {
  favoriteLessonIds: string[];
}

export default function WorksheetGenerator({ favoriteLessonIds }: WorksheetGeneratorProps) {
  const [selectedSource, setSelectedSource] = useState<'all' | 'chapter' | 'lesson' | 'favorites' | 'sudan-exam'>('sudan-exam');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chap-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-1-1');

  const [sudanPages, setSudanPages] = useState<SudanPage[]>(() => {
    const saved = localStorage.getItem('sudan_exam_custom_pages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return sudanExamPages;
  });

  const [editPageNumber, setEditPageNumber] = useState<number>(2);
  const [editQuestionId, setEditQuestionId] = useState<string>('');

  useEffect(() => {
    const page = sudanPages.find(p => p.pageNumber === editPageNumber);
    if (page && page.questions.length > 0) {
      setEditQuestionId(page.questions[0].id);
    } else {
      setEditQuestionId('');
    }
  }, [editPageNumber, sudanPages]);

  const handleUpdateQuestionField = (pageNo: number, qId: string, field: keyof SudanQuestion, value: any) => {
    const updatedPages = sudanPages.map((page) => {
      if (page.pageNumber === pageNo) {
        return {
          ...page,
          questions: page.questions.map((q) => {
            if (q.id === qId) {
              return { ...q, [field]: value };
            }
            return q;
          })
        };
      }
      return page;
    });
    setSudanPages(updatedPages);
    localStorage.setItem('sudan_exam_custom_pages', JSON.stringify(updatedPages));
  };

  const handleResetSudanExam = () => {
    setSudanPages(sudanExamPages);
    localStorage.removeItem('sudan_exam_custom_pages');
    setNotification({
      type: 'success',
      text: '✓ تم إعادة ضبط أسئلة امتحان الشهادة السودانية المحدث إلى الصيغ والمسائل القياسية بنجاح!'
    });
  };

  const [questionTypes, setQuestionTypes] = useState<string[]>(['choice', 'boolean', 'fill', 'match', 'diagram']);
  const [numPages, setNumPages] = useState<number>(3); // 1 to 20
  const [title, setTitle] = useState<string>('نقلة  السودان - مادة الفيزياء');
  const [password, setPassword] = useState<string>('');
  const [isWatermarkRemoved, setIsWatermarkRemoved] = useState<boolean>(false);
  const [generatedPages, setGeneratedPages] = useState<any[]>([]);
  const [isGenerated, setIsGenerated] = useState<boolean>(true); // Pre-set true so Sudan Exam displays on load!
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>({
    type: 'info',
    text: '✓ تم تحميل نموذج امتحان الشهادة السودانية لمادة الفيزياء (A4 القياسي) تلقائياً! يمكنك معاينته وطباعته أو التبديل للوضع المخصص.'
  });

  const [isSolvingMode, setIsSolvingMode] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [gradingResult, setGradingResult] = useState<{
    score: number;
    maxScore: number;
    graded: boolean;
    feedback: string;
    incorrectLessons: string[];
  } | null>(null);

  const checkAnswerCorrectness = (userVal: string | undefined, modelVal: string): boolean => {
    if (!userVal) return false;
    const cleanStr = (s: string) => s.trim().toLowerCase()
      .replace(/[\s\-\_\(\)\[\]\{\}\.\،\:\⟸\=]/g, '')
      .replace(/أ/g, 'ا')
      .replace(/إ/g, 'ا')
      .replace(/آ/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي');
    const u = cleanStr(userVal);
    const m = cleanStr(modelVal);
    return u.includes(m) || m.includes(u) || u === m;
  };

  const getLessonTitle = (id: string): string => {
    for (const chap of chaptersData) {
      const found = chap.lessons.find((l) => l.id === id);
      if (found) return found.title;
    }
    const customMap: { [key: string]: string } = {
      'sudan-waves': 'الحركة الموجية وخصائص الضوء',
      'sudan-optics': 'المرايا والعدسات والأجهزة البصرية',
      'sudan-static': 'الكهرباء الساكنة والمجال المغناطيسي',
      'sudan-current': 'الكهرباء التيارية والدوائر الكهربية',
      'sudan-modern': 'الفيزياء الحديثة والنواة والمفاعلات',
      'sudan-circular': 'الحركة الدائرية وقوانين الحركة'
    };
    return customMap[id] || 'مراجعة عامة لمادة الفيزياء';
  };

  const handleGradeWorksheet = () => {
    let score = 0;
    let maxScore = 0;
    const incorrectLessons: string[] = [];

    const getSudanQuestionLesson = (qId: string): string => {
      if (qId.startsWith('p2-q1') || qId.startsWith('p2-q2') || qId.startsWith('p2-q3') || qId.startsWith('p3-q2') || qId.startsWith('p3-q5') || qId.startsWith('p6-q3')) {
        return 'sudan-waves';
      }
      if (qId.startsWith('p2-q4') || qId.startsWith('p2-q6') || qId.startsWith('p3-q1') || qId.startsWith('p3-q4') || qId.startsWith('p4-q1') || qId.startsWith('p5-q4') || qId.startsWith('p6-q2') || qId.startsWith('p6-q4') || qId.startsWith('p6-q5')) {
        return 'sudan-optics';
      }
      if (qId.startsWith('p4-q2') || qId.startsWith('p4-q3') || qId.startsWith('p4-q4') || qId.startsWith('p7-q1')) {
        return 'sudan-static';
      }
      if (qId.startsWith('p4-q5') || qId.startsWith('p7-q2') || qId.startsWith('p7-q3')) {
        return 'sudan-current';
      }
      if (qId.startsWith('p2-q5') || qId.startsWith('p4-q6') || qId.startsWith('p5-q3') || qId.startsWith('p6-q1')) {
        return 'sudan-modern';
      }
      if (qId.startsWith('p5-q1') || qId.startsWith('p5-q2') || qId.startsWith('p5-q5')) {
        return 'sudan-circular';
      }
      if (qId.startsWith('p3-q3_0')) return 'sudan-waves';
      if (qId.startsWith('p3-q3_1')) return 'sudan-modern';
      if (qId.startsWith('p3-q3_2')) return 'sudan-optics';
      if (qId.startsWith('p3-q3_3')) return 'sudan-optics';
      return 'general-physics';
    };

    if (selectedSource === 'sudan-exam') {
      sudanPages.forEach((page) => {
        page.questions.forEach((q) => {
          if (q.type === 'table' && q.tableData) {
            q.tableData.rows.forEach((row, rIdx) => {
              maxScore += 1;
              const ans1 = userAnswers[q.id + '_cell_' + rIdx + '_1'];
              if (checkAnswerCorrectness(ans1, row[1])) {
                score += 1;
              } else {
                incorrectLessons.push(getSudanQuestionLesson(q.id));
              }

              maxScore += 1;
              const ans2 = userAnswers[q.id + '_cell_' + rIdx + '_2'];
              if (checkAnswerCorrectness(ans2, row[2])) {
                score += 1;
              } else {
                incorrectLessons.push(getSudanQuestionLesson(q.id));
              }
            });
          } else if (q.type === 'blank') {
            maxScore += 2;
            const ans = userAnswers[q.id];
            if (checkAnswerCorrectness(ans, q.modelAnswer as string)) {
              score += 2;
            } else {
              incorrectLessons.push(getSudanQuestionLesson(q.id));
            }
          } else if (q.type === 'choice' && q.options) {
            q.options.forEach((opt, oIdx) => {
              maxScore += 2;
              const userChoice = userAnswers[q.id + '_' + oIdx];
              const correctModel = q.modelAnswer && q.modelAnswer[oIdx];
              if (userChoice && correctModel && correctModel.includes(userChoice + ')')) {
                score += 2;
              } else {
                incorrectLessons.push(getSudanQuestionLesson(q.id + '_' + oIdx));
              }
            });
          } else if (q.type === 'matching' && q.pairs) {
            q.pairs.forEach((pair, pIdx) => {
              maxScore += 2;
              const userMatch = userAnswers[q.id + '_' + pIdx];
              if (userMatch === String(pair.matchIndex)) {
                score += 2;
              } else {
                incorrectLessons.push(getSudanQuestionLesson(q.id));
              }
            });
          } else if (q.type === 'text') {
            if (q.subQuestions && q.subQuestions.length > 0) {
              q.subQuestions.forEach((sub, subIdx) => {
                maxScore += 1.5;
                const subAns = userAnswers[q.id + '_sub_' + subIdx];
                if (subAns && subAns.trim().length > 3) {
                  score += 1.5;
                } else {
                  incorrectLessons.push(getSudanQuestionLesson(q.id));
                }
              });
            } else {
              maxScore += 3;
              const ans = userAnswers[q.id];
              if (ans && ans.trim().length > 5) {
                score += 3;
              } else {
                incorrectLessons.push(getSudanQuestionLesson(q.id));
              }
            }
          } else if (q.type === 'svg') {
            maxScore += 2;
            const ans = userAnswers[q.id];
            if (ans && ans.trim().length > 3) {
              score += 2;
            } else {
              incorrectLessons.push(getSudanQuestionLesson(q.id));
            }
          }
        });
      });
    } else {
      generatedPages.forEach((page) => {
        page.questions.forEach((q: Question) => {
          if (q.type === 'choice') {
            maxScore += 2;
            const userAns = userAnswers[q.id];
            if (userAns && userAns.trim() === q.correctAnswer.trim()) {
              score += 2;
            } else {
              if (q.lessonId) incorrectLessons.push(q.lessonId);
            }
          } else if (q.type === 'boolean') {
            maxScore += 2;
            const userAns = userAnswers[q.id];
            if (userAns && userAns === q.correctAnswer) {
              score += 2;
            } else {
              if (q.lessonId) incorrectLessons.push(q.lessonId);
            }
          } else if (q.type === 'fill') {
            maxScore += 2;
            const userAns = userAnswers[q.id];
            if (checkAnswerCorrectness(userAns, q.correctAnswer)) {
              score += 2;
            } else {
              if (q.lessonId) incorrectLessons.push(q.lessonId);
            }
          } else if (q.type === 'match' && q.pairs) {
            const sortedPairs = [...q.pairs].sort((a, b) => a.right.localeCompare(b.right, 'ar'));
            q.pairs.forEach((pair, pIdx) => {
              maxScore += 1.5;
              const userAns = userAnswers[q.id + '_' + pIdx];
              const correctDefIdx = sortedPairs.findIndex(p => p.right === pair.right);
              if (userAns === String(correctDefIdx + 1)) {
                score += 1.5;
              } else {
                if (q.lessonId) incorrectLessons.push(q.lessonId);
              }
            });
          } else if (q.type === 'diagram' && q.diagramLabels) {
            q.diagramLabels.forEach((lbl, lIdx) => {
              maxScore += 2;
              const userAns = userAnswers[q.id + '_' + lIdx];
              if (checkAnswerCorrectness(userAns, lbl.correctLabel)) {
                score += 2;
              } else {
                if (q.lessonId) incorrectLessons.push(q.lessonId);
              }
            });
          }
        });
      });
    }

    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
    let feedback = '';
    if (pct >= 85) feedback = 'رائع جداً! أداء متفوق ومتميز ينم عن فهم عميق لمفاهيم الفيزياء الكونية والحديثة. استمر يا بطل!';
    else if (pct >= 65) feedback = 'أداء جيد جداً! لديك أساس قوي في الفيزياء، ولكن هناك بعض النقاط التي تحتاج إلى صقل ومراجعة طفيفة.';
    else feedback = 'أداء مقبول. الفيزياء تحتاج إلى تركيز وتدريب مستمر. نوصي بمراجعة الدروس التي تمت الإشارة إليها!';

    setGradingResult({
      score: Math.round(score),
      maxScore: Math.round(maxScore),
      graded: true,
      feedback,
      incorrectLessons: Array.from(new Set(incorrectLessons))
    });

    const trackerStr = localStorage.getItem('physics_student_tracker');
    let trackerData: any = { readLessons: [], needsReviewLessons: [], quizHistory: [], worksheetHistory: [] };
    if (trackerStr) {
      try { trackerData = JSON.parse(trackerStr); } catch (e) {}
    }
    
    const attempt = {
      id: 'ws_' + Date.now(),
      date: new Date().toLocaleDateString('ar-EG'),
      score: Math.round(score),
      total: Math.round(maxScore),
      title: selectedSource === 'sudan-exam' ? 'امتحان الشهادة السودانية لجمهورية السودان' : title,
      isSudanExam: selectedSource === 'sudan-exam'
    };

    trackerData.worksheetHistory = [attempt, ...(trackerData.worksheetHistory || [])];
    
    if (incorrectLessons.length > 0) {
      const currentNeeds = trackerData.needsReviewLessons || [];
      const updatedNeeds = Array.from(new Set([...currentNeeds, ...incorrectLessons]));
      trackerData.needsReviewLessons = updatedNeeds;
      
      if (trackerData.readLessons) {
        trackerData.readLessons = trackerData.readLessons.filter((lId: string) => !incorrectLessons.includes(lId));
      }
    }

    localStorage.setItem('physics_student_tracker', JSON.stringify(trackerData));
    
    setNotification({
      type: 'success',
      text: `✓ تم تصحيح ورقة العمل بنجاح! النتيجة: ${Math.round(score)} من أصل ${Math.round(maxScore)} درجات (${Math.round(pct)}%). تفقد تقرير التقييم الذاتي أسفل الصفحة.`
    });
  };

  const handleResetSolving = () => {
    setUserAnswers({});
    setGradingResult(null);
    setNotification({
      type: 'info',
      text: '✓ تم تصفية الإجابات وإعادة ضبط الامتحان للبدء من جديد.'
    });
  };

  const availableLessons = chaptersData.find((ch) => ch.id === selectedChapterId)?.lessons || [];

  const handleToggleType = (type: string) => {
    setQuestionTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleUnlockPassword = () => {
    if (password === '20302060') {
      setIsWatermarkRemoved(true);
      setNotification({
        type: 'success',
        text: '✓ تم إلغاء قفل العلامة المائية بنجاح! تم إزالة العلامة المائية من أوراق العمل للطباعة النظيفة.'
      });
    } else {
      setNotification({
        type: 'error',
        text: '✗ كلمة المرور غير صحيحة. يرجى إدخال كلمة المرور الصحيحة لإزالة العلامة المائية.'
      });
    }
  };

  const handleGenerate = () => {
    if (selectedSource === 'sudan-exam') {
      setTitle('نقلة للمناهج الالكترونية - مادة الفيزياء');
      setIsGenerated(true);
      setNotification({
        type: 'success',
        text: 'تم تحميل نموذج امتحان الشهادة السودانية الكامل (٨ صفحات) للطباعة قياس A4!'
      });
      return;
    }

    if (questionTypes.length === 0) {
      setNotification({
        type: 'error',
        text: 'يرجى تحديد نوع واحد على الأقل من الأسئلة لتوليد ورقة العمل.'
      });
      return;
    }

    // Filter baseline questions
    let baseQuestions: Question[] = [];
    if (selectedSource === 'all') {
      baseQuestions = [...questionsData];
    } else if (selectedSource === 'chapter') {
      baseQuestions = questionsData.filter((q) => q.chapterId === selectedChapterId);
    } else if (selectedSource === 'lesson') {
      baseQuestions = questionsData.filter((q) => q.lessonId === selectedLessonId);
    } else if (selectedSource === 'favorites') {
      baseQuestions = questionsData.filter((q) => favoriteLessonIds.includes(q.lessonId));
    }

    if (baseQuestions.length === 0) {
      setNotification({
        type: 'error',
        text: 'لم يتم العثور على أسئلة مطابقة للخيارات المحددة لتوليد ورقة عمل.'
      });
      return;
    }

    setNotification(null);

    // Group matching question types
    const filteredByType = baseQuestions.filter((q) => questionTypes.includes(q.type));

    // Construct exactly 'numPages' A4 pages
    // Each page gets a beautifully-organized layout
    const pages: any[] = [];

    for (let p = 1; p <= numPages; p++) {
      // Pick questions for this page. Shuffling and ensuring variation
      const pageQuestions = [...filteredByType]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5); // 5 questions per page is standard for A4 with spacing

      // If we don't have enough, duplicate with minor adjustments
      while (pageQuestions.length < 4 && filteredByType.length > 0) {
        pageQuestions.push(filteredByType[Math.floor(Math.random() * filteredByType.length)]);
      }

      pages.push({
        pageNumber: p,
        questions: pageQuestions
      });
    }

    setGeneratedPages(pages);
    setIsGenerated(true);
    setNotification({
      type: 'success',
      text: 'تم توليد أوراق العمل المخصصة ومعاينتها بنجاح! جاهزة للطباعة الآن.'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 print:hidden">
        <div>
          <h2 className="text-2xl font-black text-slate-800">مولّد أوراق العمل ومستندات المذاكرة A4</h2>
          <p className="text-sm text-slate-500">
            أداة احترافية لتوليد أوراق عمل فيزيائية منسقة وجاهزة للطباعة والتحميل مباشرة بحجم A4 قياسي مع خيار العلامة المائية.
          </p>
        </div>
      </div>

      {notification && (
        <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 text-sm font-bold print:hidden ${
          notification.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : notification.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-blue-50 border-blue-200 text-blue-850'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:hidden">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6 self-start">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Sliders className="w-4 h-4 text-[#0c4a6e]" />
            <h3 className="font-black text-sm text-slate-800">خيارات توليد ورقة العمل</h3>
          </div>

          {/* Title input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-500">عنوان ورقة العمل الرئيسي:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="اكتب عنواناً منسقاً للورقة..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e]"
            />
          </div>

          {/* Page Source selector */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500">مصدر ومنهج أوراق العمل:</label>
            <select
              value={selectedSource}
              onChange={(e) => {
                const val = e.target.value as any;
                setSelectedSource(val);
                if (val === 'sudan-exam') {
                  setTitle('نقلة للمناهج الالكترونية - مادة الفيزياء');
                } else {
                  setTitle('ورقة عمل مادة الفيزياء - الصف الثالث الثانوي');
                }
              }}
              className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e] font-bold text-[#0c4a6e] ring-2 ring-sky-100"
            >
              <option value="sudan-exam">🇸🇩 نموذج امتحان الشهادة السودانية المحدث (A4)</option>
              <option value="all">توليد عشوائي: كامل المنهج الدراسي</option>
              <option value="chapter">توليد عشوائي: تخصيص حسب الباب</option>
              <option value="lesson">توليد عشوائي: تخصيص حسب درس محدد</option>
              {favoriteLessonIds.length > 0 && <option value="favorites">الدروس المفضلة فقط</option>}
            </select>
          </div>

          {selectedSource === 'sudan-exam' ? (
            <div className="space-y-4">
              {/* Teacher controls */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 space-y-3">
                <span className="block text-xs font-black text-sky-800">خيارات الكنترول والحلول للأستاذ:</span>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border border-sky-200 text-sky-950 font-black text-xs shadow-sm hover:border-sky-300 transition">
                  <input
                    type="checkbox"
                    checked={showModelAnswer}
                    onChange={(e) => setShowModelAnswer(e.target.checked)}
                    className="accent-sky-700 w-4 h-4 cursor-pointer"
                  />
                  <span>تضمين نموذج الإجابة النموذجي (مفتاح الحل)</span>
                </label>
                <p className="text-[10px] text-sky-600 leading-relaxed font-semibold">
                  عند تفعيل هذا الخيار، سيتم عرض وحل جميع الأسئلة تلقائياً وتلوين الإجابات باللون الأزرق لطباعة ورقة المعلم أو مفتاح التصحيح.
                </p>
              </div>

              {/* Advanced Editor & Formulator */}
              <div className="bg-gradient-to-br from-[#0c4a6e]/5 to-[#0284c7]/5 p-5 rounded-2xl border border-sky-100 space-y-4">
                <div className="flex items-center justify-between border-b border-sky-150 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-600 animate-pulse" />
                    <span className="text-xs font-black text-sky-950">تعديل وتشكيل أسئلة الامتحان</span>
                  </div>
                  <button
                    onClick={handleResetSudanExam}
                    className="text-[10px] font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> إعادة الضبط
                  </button>
                </div>

                {/* Page Selection Tabs */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500">اختر صفحة الامتحان للتعديل (٢ - ٨):</label>
                  <div className="flex flex-wrap gap-1">
                    {[2, 3, 4, 5, 6, 7, 8].map((pNum) => (
                      <button
                        key={pNum}
                        onClick={() => setEditPageNumber(pNum)}
                        className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                          editPageNumber === pNum
                            ? 'bg-[#0c4a6e] text-white shadow-sm'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        ص {pNum}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Selection Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500">اختر السؤال المراد صياغته وتغييره:</label>
                  <select
                    value={editQuestionId}
                    onChange={(e) => setEditQuestionId(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-600"
                  >
                    {sudanPages
                      .find((p) => p.pageNumber === editPageNumber)
                      ?.questions.map((q, idx) => (
                        <option key={q.id} value={q.id}>
                          س{idx + 1}: {q.questionText.substring(0, 45)}... ({q.type === 'table' ? 'جدول مقارنة' : q.type === 'choice' ? 'اختيار متعدد' : q.type === 'matching' ? 'توصيل' : q.type === 'svg' ? 'سؤال رسم' : q.type === 'blank' ? 'أكمل الفراغ' : 'سؤال مقالي'})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Active Question Editor */}
                {(() => {
                  const activePage = sudanPages.find((p) => p.pageNumber === editPageNumber);
                  const activeQuestion = activePage?.questions.find((q) => q.id === editQuestionId);
                  if (!activeQuestion) return null;

                  return (
                    <div className="space-y-4 bg-white p-4 rounded-xl border border-sky-50 shadow-sm text-xs">
                      {/* Edit Question Text */}
                      <div className="space-y-1">
                        <span className="font-black text-slate-700 block font-bold">نص السؤال الحالي:</span>
                        <textarea
                          rows={2}
                          value={activeQuestion.questionText}
                          onChange={(e) => handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'questionText', e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 font-bold text-slate-800 text-[11px] leading-relaxed"
                        />
                      </div>

                      {/* Edit Points */}
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-black text-slate-700 font-bold">الدرجة المخصصة للسؤال:</span>
                        <input
                          type="text"
                          value={activeQuestion.points || ''}
                          onChange={(e) => handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'points', e.target.value)}
                          className="w-20 p-1 border border-slate-200 rounded-lg text-center font-bold text-sky-850 bg-sky-50/50"
                          placeholder="مثال: ٣"
                        />
                      </div>

                      {/* Smart Re-Formulation Alternatives Bank */}
                      {SUDAN_ALTERNATIVES[activeQuestion.id] && (
                        <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-lg space-y-2">
                          <div className="flex items-center gap-1.5 text-amber-900 font-black text-[10px]">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                            <span>تشكيل وتغيير فوري (خيارات الصياغة المنهجية):</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5">
                            {SUDAN_ALTERNATIVES[activeQuestion.id].map((alt, altIdx) => (
                              <button
                                key={altIdx}
                                onClick={() => {
                                  // Update text, model answer, tableData, subQuestions, options, pairs
                                  const updated = { ...activeQuestion };
                                  updated.questionText = alt.text;
                                  updated.modelAnswer = alt.modelAnswer;
                                  if (alt.tableData) updated.tableData = alt.tableData;
                                  if (alt.subQuestions) updated.subQuestions = alt.subQuestions;
                                  if (alt.options) updated.options = alt.options;
                                  if (alt.pairs) updated.pairs = alt.pairs;

                                  // Apply change
                                  const newPages = sudanPages.map(p => {
                                    if (p.pageNumber === editPageNumber) {
                                      return {
                                        ...p,
                                        questions: p.questions.map(q => q.id === activeQuestion.id ? updated : q)
                                      };
                                    }
                                    return p;
                                  });
                                  setSudanPages(newPages);
                                  localStorage.setItem('sudan_exam_custom_pages', JSON.stringify(newPages));
                                  setNotification({
                                    type: 'success',
                                    text: `✓ تم إعادة تشكيل السؤال بنجاح إلى الصيغة البديلة رقم (${altIdx + 1})!`
                                  });
                                }}
                                className="w-full text-right p-2 bg-white hover:bg-amber-100/50 border border-amber-150 rounded text-[10px] text-amber-900 font-bold transition-all line-clamp-2 cursor-pointer"
                              >
                                {altIdx + 1}. {alt.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Customize Answers depending on type */}
                      <div className="border-t border-slate-100 pt-3 space-y-3">
                        <span className="font-black text-slate-700 block text-[11px] border-b border-slate-50 pb-1 font-bold">مفتاح الحل والإجابة النموذجية:</span>

                        {/* Type: Blank or SVG */}
                        {(activeQuestion.type === 'blank' || activeQuestion.type === 'svg') && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-500">نص الإجابة النموذجية:</span>
                            <textarea
                              rows={2}
                              value={activeQuestion.modelAnswer || ''}
                              onChange={(e) => handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'modelAnswer', e.target.value)}
                              className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 text-[10px] font-bold text-slate-800"
                            />
                          </div>
                        )}

                        {/* Type: Text question (often has subQuestions) */}
                        {activeQuestion.type === 'text' && (
                          <div className="space-y-3">
                            {activeQuestion.subQuestions && activeQuestion.subQuestions.length > 0 ? (
                              activeQuestion.subQuestions.map((subQ, subIdx) => {
                                const currentAnswers = Array.isArray(activeQuestion.modelAnswer) ? [...activeQuestion.modelAnswer] : [activeQuestion.modelAnswer];
                                return (
                                  <div key={subIdx} className="space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center text-[10px] font-black text-slate-600 font-bold">
                                      <span>الفرع ({subIdx + 1}):</span>
                                      <input
                                        type="text"
                                        value={subQ}
                                        onChange={(e) => {
                                          const updatedSubs = [...(activeQuestion.subQuestions || [])];
                                          updatedSubs[subIdx] = e.target.value;
                                          handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'subQuestions', updatedSubs);
                                        }}
                                        className="bg-white border rounded px-1.5 py-0.5 w-[80%] font-semibold"
                                      />
                                    </div>
                                    <div className="space-y-1 mt-1">
                                      <span className="text-[9px] font-bold text-slate-400">الإجابة النموذجية للفرع:</span>
                                      <textarea
                                        rows={1.5}
                                        value={currentAnswers[subIdx] || ''}
                                        onChange={(e) => {
                                          currentAnswers[subIdx] = e.target.value;
                                          handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'modelAnswer', currentAnswers);
                                        }}
                                        className="w-full p-1.5 border border-slate-200 bg-white rounded-md text-[10px] font-semibold text-slate-800"
                                      />
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="space-y-1">
                                <span className="text-[10px] font-black text-slate-500">نص الإجابة النموذجية:</span>
                                <textarea
                                  rows={3}
                                  value={Array.isArray(activeQuestion.modelAnswer) ? activeQuestion.modelAnswer.join('\n') : activeQuestion.modelAnswer || ''}
                                  onChange={(e) => handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'modelAnswer', e.target.value)}
                                  className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 text-[10px] font-bold text-slate-800"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Type: MCQ (Choice) */}
                        {activeQuestion.type === 'choice' && activeQuestion.options && (
                          <div className="space-y-3">
                            {activeQuestion.options.map((opt, oIdx) => {
                              const currentModelAnsList = Array.isArray(activeQuestion.modelAnswer) ? [...activeQuestion.modelAnswer] : [];
                              const currentAnsForThis = currentModelAnsList[oIdx] || '';
                              
                              return (
                                <div key={oIdx} className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                  <div className="flex justify-between items-center text-[10px] font-black text-slate-600 font-bold">
                                    <span>سؤال الخيار ({oIdx + 1}):</span>
                                  </div>
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const updatedOpts = [...(activeQuestion.options || [])];
                                      updatedOpts[oIdx] = e.target.value;
                                      handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'options', updatedOpts);
                                    }}
                                    className="w-full bg-white border border-slate-200 rounded p-1.5 font-bold"
                                  />
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] font-bold text-sky-700">تغيير الحرف الصحيح:</span>
                                    {(['أ', 'ب', 'ج', 'د'] as const).map((letter) => {
                                      const isCorrect = currentAnsForThis.includes(letter + ')');
                                      return (
                                        <button
                                          key={letter}
                                          type="button"
                                          onClick={() => {
                                            const letterLabel = letter === 'أ' ? '١' : letter === 'ب' ? '٢' : letter === 'ج' ? '٣' : '٤';
                                            const keyText = `${letterLabel}. ${letter}) الإجابة الصحيحة`;
                                            const updatedAns = [...currentModelAnsList];
                                            updatedAns[oIdx] = keyText;
                                            handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'modelAnswer', updatedAns);
                                          }}
                                          className={`px-2 py-0.5 border text-[9px] font-black rounded cursor-pointer ${
                                            isCorrect
                                              ? 'bg-sky-600 border-sky-600 text-white'
                                              : 'bg-white text-slate-600'
                                          }`}
                                        >
                                          {letter}
                                        </button>
                                      );
                                    })}
                                    {currentAnsForThis && (
                                      <span className="text-[9px] text-sky-600 font-bold mr-auto">
                                        الحل: {currentAnsForThis.split(')')[0] || 'لم يحدد'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Type: Table */}
                        {activeQuestion.type === 'table' && activeQuestion.tableData && (
                          <div className="space-y-3">
                            {activeQuestion.tableData.rows.map((row, rIdx) => (
                              <div key={rIdx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 space-y-2">
                                <span className="font-bold text-slate-600 text-[10px]">مقارنة صف {rIdx + 1}: {row[0]}</span>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400">{activeQuestion.tableData.headers[1] || 'العمود ١'}:</span>
                                    <input
                                      type="text"
                                      value={row[1]}
                                      onChange={(e) => {
                                        const updatedRows = [...(activeQuestion.tableData?.rows || [])];
                                        updatedRows[rIdx][1] = e.target.value;
                                        const tableData = { ...activeQuestion.tableData!, rows: updatedRows };
                                        handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'tableData', tableData);
                                        
                                        const modelList = [...(activeQuestion.modelAnswer || [])];
                                        modelList[rIdx * 2] = e.target.value;
                                        handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'modelAnswer', modelList);
                                      }}
                                      className="w-full p-1 border rounded bg-white text-[10px] font-bold text-sky-850"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400">{activeQuestion.tableData.headers[2] || 'العمود ٢'}:</span>
                                    <input
                                      type="text"
                                      value={row[2]}
                                      onChange={(e) => {
                                        const updatedRows = [...(activeQuestion.tableData?.rows || [])];
                                        updatedRows[rIdx][2] = e.target.value;
                                        const tableData = { ...activeQuestion.tableData!, rows: updatedRows };
                                        handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'tableData', tableData);

                                        const modelList = [...(activeQuestion.modelAnswer || [])];
                                        modelList[rIdx * 2 + 1] = e.target.value;
                                        handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'modelAnswer', modelList);
                                      }}
                                      className="w-full p-1 border rounded bg-white text-[10px] font-bold text-sky-850"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Type: Matching */}
                        {activeQuestion.type === 'matching' && activeQuestion.pairs && (
                          <div className="space-y-3">
                            {activeQuestion.pairs.map((pair, pIdx) => {
                              const optionList = activeQuestion.pairs ? activeQuestion.pairs[0]?.options || [] : [];
                              return (
                                <div key={pIdx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-150 space-y-2">
                                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 font-bold">
                                    <span>عنصر التوصيل ({pIdx + 1}):</span>
                                  </div>
                                  <input
                                    type="text"
                                    value={pair.item}
                                    onChange={(e) => {
                                      const updatedPairs = [...(activeQuestion.pairs || [])];
                                      updatedPairs[pIdx].item = e.target.value;
                                      handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'pairs', updatedPairs);
                                    }}
                                    className="w-full bg-white border rounded p-1.5 font-bold"
                                  />
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black text-slate-500">الرقم الصحيح المطابق:</span>
                                    <select
                                      value={pair.matchIndex}
                                      onChange={(e) => {
                                        const updatedPairs = [...(activeQuestion.pairs || [])];
                                        updatedPairs[pIdx].matchIndex = Number(e.target.value);
                                        handleUpdateQuestionField(editPageNumber, activeQuestion.id, 'pairs', updatedPairs);
                                      }}
                                      className="p-1 border bg-white rounded text-[10px] font-bold text-sky-850"
                                    >
                                      {optionList.map((opt, oIdx) => (
                                        <option key={oIdx} value={oIdx + 1}>رقم ({oIdx + 1})</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <>
              {/* Conditional Dropdowns */}
              {selectedSource === 'chapter' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-500">اختر الباب المطلوب:</label>
                  <select
                    value={selectedChapterId}
                    onChange={(e) => setSelectedChapterId(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                  >
                    {chaptersData.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedSource === 'lesson' && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500">اختر الباب:</label>
                    <select
                      value={selectedChapterId}
                      onChange={(e) => {
                        setSelectedChapterId(e.target.value);
                        const targetCh = chaptersData.find((c) => c.id === e.target.value);
                        if (targetCh && targetCh.lessons.length > 0) {
                          setSelectedLessonId(targetCh.lessons[0].id);
                        }
                      }}
                      className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                    >
                      {chaptersData.map((ch) => (
                        <option key={ch.id} value={ch.id}>
                          {ch.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-500">اختر الدرس:</label>
                    <select
                      value={selectedLessonId}
                      onChange={(e) => setSelectedLessonId(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                    >
                      {availableLessons.map((les) => (
                        <option key={les.id} value={les.id}>
                          {les.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Num pages (1 to 20) */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-slate-500">
                  <span>عدد أوراق العمل المطلوبة:</span>
                  <span className="text-[#0c4a6e] font-mono">{numPages} ورقة (A4)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={numPages}
                  onChange={(e) => setNumPages(Number(e.target.value))}
                  className="w-full accent-[#0c4a6e] bg-slate-200 rounded-lg h-1.5"
                />
              </div>

              {/* Question types checklist */}
              <div className="space-y-2">
                <span className="block text-xs font-black text-slate-500">أقسام وأنواع الأسئلة المضمنة:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { type: 'choice', label: 'اختيار من متعدد' },
                    { type: 'boolean', label: 'صح أو خطأ' },
                    { type: 'fill', label: 'أكمل الفراغ' },
                    { type: 'match', label: 'وصل الكلمات' },
                    { type: 'diagram', label: 'مكونات الرسمة' }
                  ].map((item) => (
                    <label key={item.type} className="flex items-center gap-2 cursor-pointer p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 font-bold">
                      <input
                        type="checkbox"
                        checked={questionTypes.includes(item.type)}
                        onChange={() => handleToggleType(item.type)}
                        className="accent-[#0c4a6e]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleGenerate}
            className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-xl transition shadow flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> {selectedSource === 'sudan-exam' ? 'تحديث معاينة الامتحان' : 'توليد ومعاينة أوراق العمل'}
          </button>

          {/* Secret Watermark Password section */}
          <div className="pt-4 border-t border-slate-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>إدارة قفل العلامة المائية للطباعة</span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="أدخل الباسورد لإزالة العلامة..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none"
              />
              <button
                onClick={handleUnlockPassword}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-lg transition"
              >
                تحقق
              </button>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-7 space-y-6">
          {isGenerated ? (
            <div className="flex flex-col w-full items-center">
              {/* Controls Bar for Printing & Offline & Solving */}
              <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <button
                      onClick={handlePrint}
                      className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition shadow flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <Printer className="w-4 h-4" /> طباعة أوراق العمل (A4)
                    </button>

                    <button
                      onClick={() => {
                        setIsSolvingMode(!isSolvingMode);
                        if (!isSolvingMode) {
                          setGradingResult(null);
                        }
                      }}
                      className={`py-2.5 px-4 font-black rounded-xl transition shadow flex items-center gap-2 text-xs cursor-pointer ${
                        isSolvingMode
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-sky-600 hover:bg-sky-700 text-white'
                      }`}
                    >
                      <CheckSquare className="w-4 h-4" />
                      {isSolvingMode ? 'إيقاف وضع الحل التفاعلي' : 'بدء الحل تفاعلياً داخل الموقع'}
                    </button>

                    {isSolvingMode && (
                      <>
                        <button
                          onClick={handleGradeWorksheet}
                          disabled={gradingResult?.graded}
                          className={`py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl transition shadow flex items-center gap-2 text-xs cursor-pointer ${
                            gradingResult?.graded ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <Award className="w-4 h-4" /> تصحيح الإجابات ورصد الدرجة
                        </button>

                        <button
                          onClick={() => {
                            setUserAnswers({});
                            setGradingResult(null);
                          }}
                          className="py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black rounded-xl transition flex items-center gap-1.5 text-xs cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" /> إعادة البدء والمسح
                        </button>
                      </>
                    )}
                  </div>

                  {/* Connection & Offline Status */}
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1 text-[10px] font-black">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>جاهز للعمل بدون اتصال بالإنترنت (Offline 100%)</span>
                  </div>
                </div>

                {/* Grading Result dashboard */}
                {isSolvingMode && gradingResult?.graded && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm animate-fade-in text-right">
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-100 pb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                           <Award className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-black text-slate-900">بطاقة التقييم والنتائج النهائية</h3>
                          <p className="text-xs text-slate-500 font-bold">تم تصحيح كافة إجابات ورقة العمل بنجاح!</p>
                        </div>
                      </div>
                      <div className="text-center bg-indigo-50 border border-indigo-100 rounded-2xl p-2 px-5">
                        <span className="text-[10px] block font-black text-indigo-700">الدرجة الكلية المستحقة</span>
                        <span className="text-2xl font-mono font-black text-indigo-950 block" dir="ltr">
                          {gradingResult.score} / {gradingResult.maxScore}
                        </span>
                        <span className="text-[10px] block font-bold text-slate-500">
                          ({Math.round((gradingResult.score / (gradingResult.maxScore || 1)) * 100)}%)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-black text-slate-800 block">توجيهات المعلم والتحليل الذكي:</span>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-bold leading-relaxed">
                        {gradingResult.score === 0 ? "يرجى كتابة وحل الإجابات أولاً ليقوم النظام الذكي بتصحيحها ورصد درجتك المستحقة ومساعدتك في المراجعة." : gradingResult.feedback}
                      </p>
                    </div>

                    {/* Needs review lessons list */}
                    <div className="space-y-2.5 pt-1">
                      <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-rose-500" />
                        <span>مستويات التقدم والتحصيل بالدروس:</span>
                      </span>
                      {gradingResult.score === 0 ? (
                        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-black leading-relaxed">
                          ⚠️ لم تقم بالإجابة على أي سؤال بشكل صحيح بعد، أو أنك تركت ورقة الأسئلة فارغة بالكامل. يرجى محاولة حل الأسئلة لتحديد مستواك ومراجعة الدروس!
                        </div>
                      ) : gradingResult.incorrectLessons.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-xs text-rose-600 font-bold">
                            لقد أخطأت في بعض الأسئلة التابعة للدروس التالية. ننصحك بقراءتها ومراجعتها فوراً لتقوية تحصيلك:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {gradingResult.incorrectLessons.map((lesId) => (
                              <span
                                key={lesId}
                                className="px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-900 rounded-xl text-[10px] font-black shadow-sm"
                              >
                                {getLessonTitle(lesId)} ({lesId})
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-black">
                          ✓ تهانينا! لقد أجبت على كافة الأسئلة بشكل صحيح تماماً، لا توجد دروس تحتاج لمراجعة حالياً!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center text-xs text-slate-400 mb-6 flex items-center justify-center gap-1.5 font-medium">
                <span>تنبيه: سيقوم متصفحك بطباعة الصفحات المعروضة أدناه بحجم A4 حقيقي بشكل مباشر.</span>
              </div>

              {/* Printable sheet container */}
              <div id="worksheet-print-area" className="w-full space-y-8">
                {selectedSource === 'sudan-exam' ? (
                  // Sudanese Certificate Physics Exam (8-Page Mode)
                  <>
                    {/* PAGE 1: COVER SHEET */}
                    <div
                      className="A4-page relative bg-white border border-slate-300 shadow-md p-[15mm] text-slate-900 select-none overflow-hidden mx-auto rounded-3xl"
                      style={{
                        width: '210mm',
                        height: '297mm',
                        pageBreakAfter: 'always',
                        direction: 'rtl'
                      }}
                    >
                      {/* Watermark */}
                      {!isWatermarkRemoved && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-20">
                          <span className="text-[40px] font-black text-slate-100 rotate-[-45deg] whitespace-nowrap">
                            جمهورية السودان - امتحانات نقلة تجريبية
                          </span>
                        </div>
                      )}

                      <div className="relative z-10 h-full flex flex-col justify-between border-4 border-double border-slate-800 p-6">
                        {/* Top Headers */}
                        <div className="text-center space-y-2">
                          <p className="text-xs font-black">بسم الله الرحمن الرحيم</p>
                          <div className="flex justify-between items-start">
                            <div className="text-right space-y-0.5 text-[10px] font-bold text-slate-700">
                              <p>جمهورية السودان</p>
                              <p>نقلة للمناهج الألكترونية</p>
                              <p>امتحان تدريبي من نقلة </p>
                            </div>
                            <div className="text-center space-y-1">
                              <span className="inline-block px-4 py-1.5 border border-slate-800 text-xs font-black rounded-lg">نقلة</span>
                              <h1 className="text-lg font-black text-slate-900">امتحان الشهادة الثانوية</h1>
                            </div>
                            <div className="text-left space-y-0.5 text-[10px] font-bold text-slate-700">
                              <p>المساق: الأكاديمي</p>
                              <p>المادة: الفيزياء</p>
                              <p>الزمن: ثلاث ساعات</p>
                            </div>
                          </div>
                        </div>

                        {/* Middle Title Box */}
                        <div className="border-y-2 border-slate-800 py-4 my-4 text-center">
                          <h2 className="text-xl font-black tracking-wide text-slate-900">دفتر إجابة امتحان مادة الفيزياء</h2>
                          <p className="text-xs font-bold text-slate-600 mt-1">الصف الثالث الثانوي - للعام الدراسي ١٤٤٧هـ / ٢٠٢٦م</p>
                        </div>

                        {/* Candidate Information Box */}
                        <div className="border-2 border-slate-800 p-4 rounded-xl space-y-4">
                          <h3 className="text-xs font-black text-slate-800 border-b border-slate-300 pb-1.5">بيانات الطالب المرشح (تُملأ بدقة):</h3>
                          <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                            <div>الاسم رباعياً: .......................................................................</div>
                            <div>اسم مدرسة الطالب: ...........................................................</div>
                            <div>مركز الامتحان المحتسب: ......................................................</div>
                            <div className="flex items-center gap-2">
                              <span>رقم الجلوس:</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5, 6].map((idx) => (
                                  <span key={idx} className="w-6 h-6 border-2 border-slate-800 rounded bg-slate-50 flex items-center justify-center font-mono font-black text-xs text-slate-800">
                                    {showModelAnswer && idx === 1 ? '٩' : showModelAnswer && idx === 2 ? '٥' : showModelAnswer && idx === 3 ? '٢' : ''}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Control Grades Table */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-slate-500 block">خاص بأعضاء لجنة الكنترول والرصد (درجات الطلاب):</span>
                          <table className="w-full text-center border-collapse border-2 border-slate-800 text-[10px] font-bold">
                            <thead>
                              <tr className="bg-slate-100 border-b-2 border-slate-800">
                                <th className="border-l border-slate-800 p-1.5">القسم</th>
                                <th className="border-l border-slate-800 p-1.5">رقم السؤال</th>
                                <th className="border-l border-slate-800 p-1.5">الدرجة الكلية</th>
                                <th className="border-l border-slate-800 p-1.5">الدرجة رقماً</th>
                                <th className="border-l border-slate-800 p-1.5">الدرجة كتابةً</th>
                                <th className="border-l border-slate-800 p-1.5">توقيع المصحح</th>
                                <th className="p-1.5">توقيع المراجع الرئيسي</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Section 1 */}
                              <tr className="border-b border-slate-800">
                                <td rowSpan={3} className="border-l border-slate-800 font-black bg-slate-50 text-xs">القسم الأول</td>
                                <td className="border-l border-slate-800 p-1">السؤال (أ)</td>
                                <td className="border-l border-slate-800 p-1">١٤ درجة</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? '١٤' : '.......'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? 'أربعة عشر' : '......................'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-300">أحمد محمود</td>
                                <td className="p-1 text-slate-300">علي حسن</td>
                              </tr>
                              <tr className="border-b border-slate-800">
                                <td className="border-l border-slate-800 p-1">السؤال (ب)</td>
                                <td className="border-l border-slate-800 p-1">١٣ درجة</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? '١٣' : '.......'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? 'ثلاثة عشر' : '......................'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-300">أحمد محمود</td>
                                <td className="p-1 text-slate-300">علي حسن</td>
                              </tr>
                              <tr className="border-b-2 border-slate-800">
                                <td className="border-l border-slate-800 p-1">السؤال (ج)</td>
                                <td className="border-l border-slate-800 p-1">١٣ درجة</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? '١٣' : '.......'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? 'ثلاثة عشر' : '......................'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-300">أحمد محمود</td>
                                <td className="p-1 text-slate-300">علي حسن</td>
                              </tr>
                              {/* Section 2 */}
                              <tr className="border-b border-slate-800">
                                <td rowSpan={4} className="border-l border-slate-800 font-black bg-slate-50 text-xs">القسم الثاني</td>
                                <td className="border-l border-slate-800 p-1">السؤال الأول</td>
                                <td className="border-l border-slate-800 p-1">١٥ درجة</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? '١٥' : '.......'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? 'خمسة عشر' : '......................'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-300">محمد علي</td>
                                <td className="p-1 text-slate-300">سالم جابر</td>
                              </tr>
                              <tr className="border-b border-slate-800">
                                <td className="border-l border-slate-800 p-1">السؤال الثاني</td>
                                <td className="border-l border-slate-800 p-1">١٥ درجة</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? '١٥' : '.......'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? 'خمسة عشر' : '......................'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-300">محمد علي</td>
                                <td className="p-1 text-slate-300">سالم جابر</td>
                              </tr>
                              <tr className="border-b border-slate-800">
                                <td className="border-l border-slate-800 p-1">السؤال الثالث</td>
                                <td className="border-l border-slate-800 p-1">١٥ درجة</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? '١٥' : '.......'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? 'خمسة عشر' : '......................'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-300">محمد علي</td>
                                <td className="p-1 text-slate-300">سالم جابر</td>
                              </tr>
                              <tr className="border-b-2 border-slate-800">
                                <td className="border-l border-slate-800 p-1">السؤال الرابع</td>
                                <td className="border-l border-slate-800 p-1">١٥ درجة</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? '١٥' : '.......'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-400">{showModelAnswer ? 'خمسة عشر' : '......................'}</td>
                                <td className="border-l border-slate-800 p-1 text-slate-300">محمد علي</td>
                                <td className="p-1 text-slate-300">سالم جابر</td>
                              </tr>
                              {/* Total */}
                              <tr className="bg-slate-200 text-xs font-black">
                                <td colSpan={2} className="border-l border-slate-800 p-2">المجموع الكلي المكتوب</td>
                                <td className="border-l border-slate-800 p-2">١٠٠ درجة</td>
                                <td className="border-l border-slate-800 p-2 text-sky-800 font-mono">{showModelAnswer ? '١٠٠' : '.......'}</td>
                                <td colSpan={3} className="p-2 text-sky-800">{showModelAnswer ? 'مائة درجة فقط لا غير' : '..................................................................'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Cover Instructions Footer */}
                        <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg text-[9px] text-slate-600 leading-relaxed space-y-1">
                          <p className="font-black text-slate-800 text-xs">تنبيهات هامة للمرشح:</p>
                          <p>١. أجب عن جميع الأسئلة المطلوبة منك بوضوح مستخدماً القلم الأزرق الجاف فقط.</p>
                          <p>٢. لا تقم أبداً بالكتابة في المساحات المظللة أعلى الصفحات الداخلية أو على الهوامش المخصصة للتصحيح.</p>
                          <p>٣. تأكد من سلامة وعدد صفحات دفتر الإجابة الخاص بك وهي (٨ صفحات) كاملة قبل الشروع في الحل.</p>
                        </div>
                      </div>
                    </div>

                    {/* PAGES 2 TO 8: CONTENT PAGES */}
                    {sudanPages.map((page) => (
                      <div
                        key={page.pageNumber}
                        className="A4-page relative bg-white border border-slate-300 shadow-md p-[15mm] text-slate-900 select-none overflow-hidden mx-auto rounded-3xl"
                        style={{
                          width: '210mm',
                          height: '297mm',
                          pageBreakAfter: 'always',
                          direction: 'rtl'
                        }}
                      >
                        {/* Shaded Area "لا تكتب في هذه المساحة المظللة" */}
                        <div
                          className="absolute top-[8mm] left-[15mm] right-[15mm] h-[10mm] border border-slate-300 flex items-center justify-center text-[10px] font-black text-slate-500 rounded-md"
                          style={{
                            background: 'repeating-linear-gradient(45deg, #f8fafc, #f8fafc 10px, #f1f5f9 10px, #f1f5f9 20px)'
                          }}
                        >
                          لا تكتب في هذه المساحة المظللة مطلقاً (خاصة بالكنترول الإداري والفرز)
                        </div>

                        {/* Marker circle columns in left/right margins */}
                        <div className="absolute top-[25mm] left-[4mm] w-[14mm] flex flex-col gap-10 items-center justify-start border-r border-dashed border-slate-200 pt-6 h-[240mm]">
                          {[1, 2, 3].map((num) => (
                            <div key={num} className="flex flex-col items-center gap-1">
                              <span className="text-[7px] font-bold text-slate-400">الدرجة الفرعية</span>
                              <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center text-[9px] font-mono font-black text-slate-700">
                                {showModelAnswer ? '✔' : ''}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Content Area */}
                        <div className="relative z-10 h-full pt-[14mm] flex flex-col justify-between">
                          <div className="space-y-4">
                            {/* Sub header */}
                            <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 text-slate-400 text-[10px] font-bold">
                              <span>جمهورية السودان - نقلة للمناهج الألكترونية</span>
                              <span className="text-slate-800 font-black">{page.section}</span>
                              <span className="text-[#0c4a6e] font-black">{page.title}</span>
                            </div>

                            {/* Questions */}
                            <div className="space-y-4">
                              {page.questions.map((q, qIdx) => (
                                <div key={`${q.id}-${qIdx}`} className="space-y-1.5 text-xs text-slate-800">
                                  <div className="font-black text-slate-900 flex justify-between items-start gap-1">
                                    <span>
                                      س{qIdx + 1}: {q.questionText}
                                    </span>
                                    {q.points && <span className="text-[10px] text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded font-black">({q.points} درجة)</span>}
                                  </div>

                                  {/* Render table question */}
                                  {q.type === 'table' && q.tableData && (
                                    <div className="my-2 overflow-x-auto">
                                      <table className="w-full border-collapse border border-slate-300 text-[10px] font-bold">
                                        <thead>
                                          <tr className="bg-slate-50">
                                            {q.tableData.headers.map((h, hIdx) => (
                                              <th key={hIdx} className="border border-slate-300 p-1 text-slate-700 font-black">{h}</th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {q.tableData.rows.map((row, rIdx) => (
                                            <tr key={rIdx}>
                                              <td className="border border-slate-300 p-1 bg-slate-50 font-black">{row[0]}</td>
                                              <td className="border border-slate-300 p-1 text-sky-800">
                                                {showModelAnswer ? (
                                                  row[1]
                                                ) : isSolvingMode ? (
                                                  <input
                                                    type="text"
                                                    placeholder="اكتب الإجابة..."
                                                    value={userAnswers[q.id + '_cell_' + rIdx + '_1'] || ''}
                                                    onChange={(e) => {
                                                      setUserAnswers({
                                                        ...userAnswers,
                                                        [q.id + '_cell_' + rIdx + '_1']: e.target.value
                                                      });
                                                    }}
                                                    disabled={gradingResult?.graded}
                                                    className={`w-full p-1 text-[10px] bg-slate-50 border rounded focus:outline-none focus:border-sky-600 font-bold ${
                                                      gradingResult?.graded
                                                        ? checkAnswerCorrectness(userAnswers[q.id + '_cell_' + rIdx + '_1'], row[1])
                                                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                                          : 'bg-red-50 border-red-300 text-red-800'
                                                        : 'border-slate-300 text-slate-800'
                                                    }`}
                                                  />
                                                ) : (
                                                  '...................................................'
                                                )}
                                                {gradingResult?.graded && !checkAnswerCorrectness(userAnswers[q.id + '_cell_' + rIdx + '_1'], row[1]) && (
                                                  <div className="text-[9px] text-sky-700 mt-0.5">الصح: {row[1]}</div>
                                                )}
                                              </td>
                                              <td className="border border-slate-300 p-1 text-sky-800">
                                                {showModelAnswer ? (
                                                  row[2]
                                                ) : isSolvingMode ? (
                                                  <input
                                                    type="text"
                                                    placeholder="اكتب الإجابة..."
                                                    value={userAnswers[q.id + '_cell_' + rIdx + '_2'] || ''}
                                                    onChange={(e) => {
                                                      setUserAnswers({
                                                        ...userAnswers,
                                                        [q.id + '_cell_' + rIdx + '_2']: e.target.value
                                                      });
                                                    }}
                                                    disabled={gradingResult?.graded}
                                                    className={`w-full p-1 text-[10px] bg-slate-50 border rounded focus:outline-none focus:border-sky-600 font-bold ${
                                                      gradingResult?.graded
                                                        ? checkAnswerCorrectness(userAnswers[q.id + '_cell_' + rIdx + '_2'], row[2])
                                                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                                          : 'bg-red-50 border-red-300 text-red-800'
                                                        : 'border-slate-300 text-slate-800'
                                                    }`}
                                                  />
                                                ) : (
                                                  '...................................................'
                                                )}
                                                {gradingResult?.graded && !checkAnswerCorrectness(userAnswers[q.id + '_cell_' + rIdx + '_2'], row[2]) && (
                                                  <div className="text-[9px] text-sky-700 mt-0.5">الصح: {row[2]}</div>
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}

                                  {/* Render standard blank filling spaces */}
                                  {q.type === 'blank' && (
                                    <div className="pl-6 py-1 leading-relaxed">
                                      {showModelAnswer ? (
                                        <div className="p-2 bg-sky-50 border border-sky-100 rounded-lg text-sky-800 font-bold">
                                          الإجابة النموذجية: {q.modelAnswer}
                                        </div>
                                      ) : isSolvingMode ? (
                                        <div className="space-y-1.5">
                                          <div className="flex gap-2 items-center">
                                            <span className="text-xs font-black text-slate-500 flex-shrink-0">إجابتك:</span>
                                            <input
                                              type="text"
                                              placeholder="اكتب الكلمة أو العبارة المناسبة للفراغ هنا..."
                                              value={userAnswers[q.id] || ''}
                                              onChange={(e) => {
                                                setUserAnswers({
                                                  ...userAnswers,
                                                  [q.id]: e.target.value
                                                });
                                              }}
                                              disabled={gradingResult?.graded}
                                              className={`flex-1 px-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-sky-600 ${
                                                gradingResult?.graded
                                                  ? checkAnswerCorrectness(userAnswers[q.id], q.modelAnswer as string)
                                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                                    : 'bg-red-50 border-red-300 text-red-800'
                                                  : 'bg-white border-slate-200 text-slate-800'
                                              }`}
                                            />
                                          </div>
                                          {gradingResult?.graded && (
                                            <div className="p-2 bg-sky-50/50 border border-sky-100 rounded-lg text-[10px] text-sky-800 font-bold leading-relaxed text-right">
                                              <span className="font-black">الإجابة النموذجية:</span> {q.modelAnswer}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="text-slate-400 font-mono">
                                          الإجابة: ...................................................................................................................................................
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Render text with multi lines and answers */}
                                  {q.type === 'text' && (
                                    <div className="pl-6 space-y-2 py-1 leading-relaxed">
                                      {showModelAnswer && q.modelAnswer ? (
                                        <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-xl text-sky-800 space-y-1.5">
                                          <span className="font-black text-[10px] text-sky-900 block border-b border-sky-200 pb-1">مفتاح الحل والتحليل الرياضي:</span>
                                          {Array.isArray(q.modelAnswer) ? (
                                            q.modelAnswer.map((ans, aIdx) => <p key={aIdx} className="font-bold">{ans}</p>)
                                          ) : (
                                            <p className="font-bold whitespace-pre-line">{q.modelAnswer}</p>
                                          )}
                                        </div>
                                      ) : isSolvingMode ? (
                                        <div className="space-y-3">
                                          {q.subQuestions && q.subQuestions.length > 0 ? (
                                            q.subQuestions.map((subQ, subIdx) => (
                                              <div key={subIdx} className="space-y-1">
                                                <p className="text-[10px] font-black text-slate-800">{subQ}</p>
                                                <input
                                                  type="text"
                                                  placeholder="أدخل إجابتك للفرع..."
                                                  value={userAnswers[q.id + '_sub_' + subIdx] || ''}
                                                  onChange={(e) => {
                                                    setUserAnswers({
                                                      ...userAnswers,
                                                      [q.id + '_sub_' + subIdx]: e.target.value
                                                    });
                                                  }}
                                                  disabled={gradingResult?.graded}
                                                  className={`w-full px-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-sky-600 ${
                                                    gradingResult?.graded
                                                      ? 'bg-slate-50 border-slate-300'
                                                      : 'bg-white border-slate-200 text-slate-800'
                                                  }`}
                                                />
                                                {gradingResult?.graded && q.modelAnswer && Array.isArray(q.modelAnswer) && q.modelAnswer[subIdx] && (
                                                  <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-[10px] text-emerald-800 font-bold text-right">
                                                    <span className="font-black">مفتاح الحل:</span> {q.modelAnswer[subIdx]}
                                                  </div>
                                                )}
                                              </div>
                                            ))
                                          ) : (
                                            <div className="space-y-1">
                                              <textarea
                                                placeholder="اكتب خطوات الحل الفيزيائي والإجابة هنا..."
                                                rows={3}
                                                value={userAnswers[q.id] || ''}
                                                onChange={(e) => {
                                                  setUserAnswers({
                                                    ...userAnswers,
                                                    [q.id]: e.target.value
                                                  });
                                                }}
                                                disabled={gradingResult?.graded}
                                                className={`w-full p-3 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-sky-600 font-bold ${
                                                  gradingResult?.graded
                                                    ? 'bg-slate-50 border-slate-300'
                                                    : 'bg-white border-slate-200 text-slate-800'
                                                }`}
                                              />
                                              {gradingResult?.graded && q.modelAnswer && (
                                                <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl text-[10px] text-emerald-900 font-bold leading-relaxed space-y-1 text-right">
                                                  <span className="font-black text-emerald-950 block border-b border-emerald-200 pb-1 mb-1">نموذج الحل والتحليل:</span>
                                                  {Array.isArray(q.modelAnswer) ? (
                                                    q.modelAnswer.map((ans, aIdx) => <p key={aIdx}>{ans}</p>)
                                                  ) : (
                                                    <p className="whitespace-pre-line">{q.modelAnswer}</p>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="space-y-2 text-slate-700">
                                          {getQuestionLines(q).map((line, lIdx) => (
                                            <p
                                              key={lIdx}
                                              className={line.isAnswerLine ? 'text-slate-400 font-mono text-[9px] mt-1 mb-2 tracking-wider' : 'text-slate-800 font-bold text-[10px] leading-relaxed'}
                                            >
                                              {line.text}
                                            </p>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Render Multiple choices with options */}
                                  {q.type === 'choice' && q.options && (
                                    <div className="pl-6 space-y-3 py-1.5">
                                      {q.options.map((opt, oIdx) => {
                                        const selectedOptionVal = userAnswers[q.id + '_' + oIdx];
                                        const modelAnswerForThis = q.modelAnswer && q.modelAnswer[oIdx];
                                        const isSelectedLetter = (letter: string) => selectedOptionVal === letter;
                                        
                                        return (
                                          <div key={oIdx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                                            <p className="text-[10px] text-slate-800 font-black leading-relaxed">{opt}</p>
                                            {isSolvingMode ? (
                                              <div className="flex flex-wrap gap-2 items-center">
                                                <span className="text-[9px] font-bold text-slate-500">اختر إجابتك:</span>
                                                {(['أ', 'ب', 'ج', 'د'] as const).map((choiceLetter) => {
                                                  const isUserSelected = isSelectedLetter(choiceLetter);
                                                  const isThisLetterCorrect = modelAnswerForThis && modelAnswerForThis.includes(choiceLetter + ')');
                                                  
                                                  return (
                                                    <button
                                                      type="button"
                                                      key={choiceLetter}
                                                      disabled={gradingResult?.graded}
                                                      onClick={() => {
                                                        setUserAnswers({
                                                          ...userAnswers,
                                                          [q.id + '_' + oIdx]: choiceLetter
                                                        });
                                                      }}
                                                      className={`px-3 py-1 rounded-lg text-[9px] font-black border transition-all ${
                                                        gradingResult?.graded
                                                          ? isThisLetterCorrect
                                                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-black ring-2 ring-emerald-100'
                                                            : isUserSelected
                                                            ? 'bg-red-100 border-red-400 text-red-800 ring-2 ring-red-100'
                                                            : 'bg-white border-slate-200 text-slate-400'
                                                          : isUserSelected
                                                          ? 'bg-[#0c4a6e] border-[#0c4a6e] text-white shadow-sm scale-105'
                                                          : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                                                      }`}
                                                    >
                                                      {choiceLetter}
                                                    </button>
                                                  );
                                                })}
                                                {gradingResult?.graded && modelAnswerForThis && (
                                                  <span className="text-[9px] font-black text-sky-800 bg-sky-50 px-2 py-0.5 rounded mr-auto">
                                                    الإجابة النموذجية: {modelAnswerForThis.split(')')[1] || modelAnswerForThis}
                                                  </span>
                                                )}
                                              </div>
                                            ) : (
                                              <div className="pl-4 py-1 flex items-center gap-2 text-[9px] text-slate-400 font-semibold">
                                                <span>( أ )</span>
                                                <span>( ب )</span>
                                                <span>( ج )</span>
                                                <span>( د )</span>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Render matching questions */}
                                  {q.type === 'matching' && q.pairs && (
                                    <div className="my-2 border border-slate-200 rounded-xl overflow-hidden text-[10px]">
                                      <div className="grid grid-cols-2 bg-slate-100 font-black p-2 border-b border-slate-200 text-slate-800 text-center">
                                        <span>المجموعة (أ)</span>
                                        <span>المجموعة (ب)</span>
                                      </div>
                                      {q.pairs.map((pair, pIdx) => {
                                        const selectedIndex = userAnswers[q.id + '_' + pIdx];
                                        const isCorrect = selectedIndex === String(pair.matchIndex);
                                        const optionList = q.pairs ? q.pairs[0]?.options || [] : [];

                                        return (
                                          <div key={pIdx} className="grid grid-cols-2 border-b border-slate-100 last:border-0 font-bold p-2 text-slate-700 items-center">
                                            <div className="flex justify-between items-center pl-4 border-l border-slate-200 gap-2">
                                              <span>- {pair.item}</span>
                                              {isSolvingMode ? (
                                                <select
                                                  disabled={gradingResult?.graded}
                                                  value={selectedIndex || ''}
                                                  onChange={(e) => {
                                                    setUserAnswers({
                                                      ...userAnswers,
                                                      [q.id + '_' + pIdx]: e.target.value
                                                    });
                                                  }}
                                                  className={`p-1 border rounded text-[9px] font-black text-[#0c4a6e] focus:outline-none ${
                                                    gradingResult?.graded
                                                      ? isCorrect
                                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-black'
                                                        : 'bg-red-50 border-red-300 text-red-800'
                                                      : 'bg-white border-slate-300'
                                                  }`}
                                                >
                                                  <option value="">(اختر الرقم)</option>
                                                  {optionList.map((opt, optIdx) => {
                                                    const numberMatch = opt.match(/^\d+/);
                                                    const numVal = numberMatch ? numberMatch[0] : String(optIdx + 1);
                                                    return (
                                                      <option key={optIdx} value={numVal}>
                                                        ({numVal}) {opt.substring(2)}
                                                      </option>
                                                    );
                                                  })}
                                                </select>
                                              ) : (
                                                <span className="px-2.5 py-0.5 border-2 border-slate-800 rounded bg-slate-50 font-mono font-black text-slate-900">
                                                  ( {showModelAnswer ? pair.matchIndex : '  '} )
                                                </span>
                                              )}
                                            </div>
                                            <div className="pr-4 space-y-1 text-slate-500">
                                              {optionList.map((opt, optIdx) => (
                                                <p key={optIdx} className="font-bold">{opt}</p>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Render Custom SVGs */}
                                  {q.type === 'svg' && q.svgType && (
                                    <div className="my-2 text-center">
                                      {renderSudanSVG(q.svgType)}
                                      {isSolvingMode && (
                                        <div className="mt-2 text-right space-y-1">
                                          <p className="text-[10px] font-black text-slate-600">اكتب تأشيرك أو وصف مسار الرسم كإجابة فيزيائية:</p>
                                          <input
                                            type="text"
                                            placeholder="مثال: يخرج المنشور منحرفاً نحو القاعدة..."
                                            value={userAnswers[q.id] || ''}
                                            onChange={(e) => {
                                              setUserAnswers({
                                                ...userAnswers,
                                                [q.id]: e.target.value
                                              });
                                            }}
                                            disabled={gradingResult?.graded}
                                            className={`w-full px-3 py-1.5 text-xs rounded-xl border focus:outline-none ${
                                              gradingResult?.graded
                                                ? 'bg-slate-50 border-slate-200'
                                                : 'bg-white border-slate-200 text-slate-800'
                                            }`}
                                          />
                                        </div>
                                      )}
                                      {(showModelAnswer || gradingResult?.graded) && (
                                        <div className="mt-1.5 p-2 bg-sky-50 border border-sky-100 rounded-xl text-sky-800 font-bold text-right leading-relaxed text-[10px]">
                                          <span className="font-black block text-sky-900 border-b border-sky-200 pb-1.5 mb-1 text-xs">الشرح النموذجي للتأشير والرسم:</span>
                                          {q.modelAnswer}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-[9px] text-slate-400 font-bold">
                            <span>نقلة امتحانات السودان - امتحان الفيزياء</span>
                            <span>صفحة {page.pageNumber} من ٨</span>
                            <span className="text-slate-500 font-black">مجموع الصفحة: / {page.totalMarks || '١٥'} درجات</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  // Custom Dynamic Generated Sheets
                  generatedPages.map((page, pIdx) => (
                    <div
                      key={pIdx}
                      className="A4-page relative bg-white border border-slate-300 shadow-md p-[20mm] text-slate-900 select-none overflow-hidden mx-auto rounded-3xl"
                      style={{
                        width: '210mm',
                        height: '297mm',
                        pageBreakAfter: 'always',
                        direction: 'rtl'
                      }}
                    >
                      {/* Page Watermark text */}
                      {!isWatermarkRemoved && (
                        <div
                          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                          style={{ zIndex: 0 }}
                        >
                          <span
                            className="text-[40px] font-black text-slate-100 rotate-[-45deg] whitespace-nowrap opacity-40 select-none"
                            style={{ letterSpacing: '4px' }}
                          >
                            نقلة للمناهج الإلكترونية
                          </span>
                        </div>
                      )}

                      {/* Content Layer */}
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        {/* Page Header */}
                        <div className="border-b-2 border-sky-600 pb-4 mb-6">
                          <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-bold">
                            <span>نقلة للمناهج السودانية</span>
                            <span>الصف الثالث الثانوي - مادة الفيزياء</span>
                          </div>
                          <h1 className="text-xl font-black text-slate-800 text-right">{title}</h1>
                          <div className="grid grid-cols-3 gap-4 text-[10px] text-slate-500 mt-4 bg-slate-50 p-2 rounded-lg border border-slate-100 font-bold">
                            <div>اسم الطالب: .......................................</div>
                            <div>الصف والشعبة: ..........................</div>
                            <div>التاريخ: .... / .... / 1447 هـ</div>
                          </div>
                        </div>

                        {/* Questions Container */}
                        <div className="flex-1 space-y-6">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1 mb-4">الصفحة {page.pageNumber}</h4>
                          {page.questions.map((q: Question, qIdx: number) => (
                            <div key={`${q.id}-${qIdx}`} className="space-y-2">
                              <div className="text-sm font-bold text-slate-800">
                                <span>س {qIdx + 1}: </span>
                                <span>{q.questionText}</span>
                              </div>

                              {/* Question body placeholder inputs so students can fill out */}
                              {q.type === 'choice' && q.options && (
                                <div className="space-y-2">
                                  {isSolvingMode ? (
                                    <div className="grid grid-cols-2 gap-2 pl-8 text-xs font-semibold">
                                      {q.options.map((opt, oIdx) => {
                                        const isSelected = userAnswers[q.id] === opt;
                                        const isCorrect = opt.trim() === q.correctAnswer.trim();
                                        
                                        return (
                                          <button
                                            type="button"
                                            key={oIdx}
                                            disabled={gradingResult?.graded}
                                            onClick={() => {
                                              setUserAnswers({
                                                ...userAnswers,
                                                [q.id]: opt
                                              });
                                            }}
                                            className={`flex items-center gap-2 p-2 rounded-xl border text-right transition-all ${
                                              gradingResult?.graded
                                                ? isCorrect
                                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-black'
                                                  : isSelected
                                                  ? 'bg-red-50 border-red-400 text-red-800'
                                                  : 'bg-white border-slate-200 text-slate-400'
                                                : isSelected
                                                ? 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-100 scale-[1.01]'
                                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                                            }`}
                                          >
                                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-black ${
                                              isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white border-slate-300'
                                            }`}>
                                              {isSelected && '✓'}
                                            </span>
                                            <span>{opt}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 gap-3 pl-8 text-xs text-slate-600 font-semibold">
                                      {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} className="flex items-center gap-2">
                                          <span className="w-4 h-4 rounded-full border border-slate-300 inline-block bg-white" />
                                          <span>{opt}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {gradingResult?.graded && (
                                    <div className="mr-8 p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-[10px] text-emerald-800 font-black text-right">
                                      الخيار الصحيح: {q.correctAnswer}
                                    </div>
                                  )}
                                </div>
                              )}

                              {q.type === 'boolean' && (
                                <div className="space-y-2">
                                  {isSolvingMode ? (
                                    <div className="flex gap-4 pl-8 text-xs font-semibold">
                                      {(['صح', 'خطأ'] as const).map((choiceVal) => {
                                        const isSelected = userAnswers[q.id] === choiceVal;
                                        const isCorrect = choiceVal === q.correctAnswer;
                                        
                                        return (
                                          <button
                                            type="button"
                                            key={choiceVal}
                                            disabled={gradingResult?.graded}
                                            onClick={() => {
                                              setUserAnswers({
                                                ...userAnswers,
                                                [q.id]: choiceVal
                                              });
                                            }}
                                            className={`px-4 py-1.5 rounded-xl border transition-all ${
                                              gradingResult?.graded
                                                ? isCorrect
                                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-black'
                                                  : isSelected
                                                  ? 'bg-red-50 border-red-400 text-red-800'
                                                  : 'bg-white border-slate-200 text-slate-400'
                                                : isSelected
                                                ? 'bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-100'
                                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                                            }`}
                                          >
                                            {choiceVal}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="flex gap-6 pl-8 text-xs text-slate-600 font-semibold">
                                      <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded border border-slate-300 inline-block bg-white" />
                                        <span>صح</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded border border-slate-300 inline-block bg-white" />
                                        <span>خطأ</span>
                                      </div>
                                    </div>
                                  )}
                                  {gradingResult?.graded && (
                                    <div className="mr-8 p-1 px-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg text-[10px] text-emerald-800 font-black inline-block text-right">
                                      الإجابة الصحيحة: {q.correctAnswer}
                                    </div>
                                  )}
                                </div>
                              )}

                              {q.type === 'fill' && (
                                <div className="space-y-2 pl-8">
                                  {isSolvingMode ? (
                                    <div className="flex gap-2 items-center">
                                      <span className="text-xs font-black text-slate-500">إجابتك:</span>
                                      <input
                                        type="text"
                                        placeholder="اكتب الكلمة أو العبارة المناسبة للفراغ هنا..."
                                        value={userAnswers[q.id] || ''}
                                        onChange={(e) => {
                                          setUserAnswers({
                                            ...userAnswers,
                                            [q.id]: e.target.value
                                          });
                                        }}
                                        disabled={gradingResult?.graded}
                                        className={`flex-1 px-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-sky-600 ${
                                          gradingResult?.graded
                                            ? checkAnswerCorrectness(userAnswers[q.id], q.correctAnswer)
                                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                              : 'bg-red-50 border-red-300 text-red-800'
                                            : 'bg-white border-slate-200 text-slate-800'
                                        }`}
                                      />
                                    </div>
                                  ) : (
                                    <div className="text-xs text-slate-400 font-serif italic pt-1">
                                      الإجابة: ..........................................................................................................
                                    </div>
                                  )}
                                  {gradingResult?.graded && (
                                    <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded-lg text-[10px] text-emerald-800 font-bold text-right">
                                      <span className="font-black">الإجابة النموذجية للفراغ:</span> {q.correctAnswer}
                                    </div>
                                  )}
                                </div>
                              )}

                              {q.type === 'match' && (() => {
                                const sortedPairs = [...(q.pairs || [])].sort((a, b) => a.right.localeCompare(b.right, 'ar'));
                                return (
                                  <div className="pl-8 space-y-2 pt-2 text-xs">
                                    {isSolvingMode ? (
                                      <div className="grid grid-cols-2 gap-4 text-slate-700">
                                        <div className="space-y-1.5 font-semibold">
                                          <div className="flex justify-between border-b pb-1 font-bold text-slate-800">
                                            <span>المصطلح (أ)</span>
                                            <span>التوصيل</span>
                                          </div>
                                          {q.pairs?.map((pair, pIdx) => {
                                            const selectedIndex = userAnswers[q.id + '_' + pIdx];
                                            const correctDefIdx = sortedPairs.findIndex(p => p.right === pair.right);
                                            const isCorrect = selectedIndex === String(correctDefIdx + 1);
                                            
                                            return (
                                              <div key={pIdx} className="flex justify-between items-center gap-2">
                                                <span>{pIdx + 1}. {pair.left}</span>
                                                <select
                                                  disabled={gradingResult?.graded}
                                                  value={selectedIndex || ''}
                                                  onChange={(e) => {
                                                    setUserAnswers({
                                                      ...userAnswers,
                                                      [q.id + '_' + pIdx]: e.target.value
                                                    });
                                                  }}
                                                  className={`p-1 border rounded text-[10px] font-black focus:outline-none ${
                                                    gradingResult?.graded
                                                      ? isCorrect
                                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                                        : 'bg-red-50 border-red-300 text-red-800'
                                                      : 'bg-white border-slate-300'
                                                  }`}
                                                >
                                                  <option value="">اختر التعريف</option>
                                                  {q.pairs?.map((_, optIdx) => (
                                                    <option key={optIdx} value={optIdx + 1}>التعريف رقم ({optIdx + 1})</option>
                                                  ))}
                                                </select>
                                                {gradingResult?.graded && !isCorrect && (
                                                  <span className="text-[10px] text-emerald-700 font-black">({correctDefIdx + 1})</span>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                        <div className="space-y-1.5 font-semibold">
                                          <div className="flex justify-between border-b pb-1 font-bold text-slate-800">
                                            <span>التعريف (ب)</span>
                                          </div>
                                          {sortedPairs.map((pair, pIdx) => (
                                            <div key={pIdx} className="border-b border-slate-50 pb-1">
                                              <span>({pIdx + 1}) - {pair.right}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="grid grid-cols-2 gap-4 text-slate-700">
                                        <div className="space-y-1.5 font-semibold">
                                          <div className="flex justify-between border-b pb-1">
                                            <span className="font-bold text-slate-800">المصطلح (أ)</span>
                                          </div>
                                          {q.pairs?.map((pair, pIdx) => (
                                            <div key={pIdx} className="flex justify-between">
                                              <span>{pIdx + 1}. {pair.left}</span>
                                              <span className="text-slate-400">(   )</span>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="space-y-1.5 font-semibold">
                                          <div className="flex justify-between border-b pb-1">
                                            <span className="font-bold text-slate-800">التعريف (ب)</span>
                                          </div>
                                          {sortedPairs.map((pair, pIdx) => (
                                            <div key={pIdx}>
                                              <span>- {pair.right}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}

                              {q.type === 'diagram' && q.diagramLabels && (
                                <div className="pl-8 pt-2 space-y-3">
                                  <div className="w-full max-w-[200px] h-[120px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-[10px] text-slate-400 relative">
                                    {/* Schematic Representation Placeholder */}
                                    <div className="text-center font-bold px-4">أنبوبة أشعة كاثود أو كولدج المخططة</div>
                                    {q.diagramLabels.map((lbl, lIdx) => (
                                      <div
                                        key={lIdx}
                                        className="absolute px-1.5 py-0.5 bg-white border border-slate-200 text-[8px] font-bold text-slate-700 rounded shadow-sm"
                                        style={{ left: `${lbl.x}%`, top: `${lbl.y}%` }}
                                      >
                                        {lIdx + 1}
                                      </div>
                                    ))}
                                  </div>
                                  {isSolvingMode ? (
                                    <div className="grid grid-cols-2 gap-2.5 text-[10px] font-bold">
                                      {q.diagramLabels.map((lbl, lIdx) => {
                                        const userLabel = userAnswers[q.id + '_' + lIdx];
                                        const isCorrect = checkAnswerCorrectness(userLabel, lbl.correctLabel);
                                        
                                        return (
                                          <div key={lIdx} className="space-y-1">
                                            <span>البيان رقم ({lIdx + 1}):</span>
                                            <input
                                              type="text"
                                              placeholder="اكتب التسمية..."
                                              value={userLabel || ''}
                                              onChange={(e) => {
                                                setUserAnswers({
                                                  ...userAnswers,
                                                  [q.id + '_' + lIdx]: e.target.value
                                                });
                                              }}
                                              disabled={gradingResult?.graded}
                                              className={`w-full p-1.5 text-[10px] rounded border focus:outline-none focus:ring-1 focus:ring-sky-600 ${
                                                gradingResult?.graded
                                                  ? isCorrect
                                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                                    : 'bg-red-50 border-red-300 text-red-800'
                                                  : 'bg-white border-slate-200 text-slate-800'
                                              }`}
                                            />
                                            {gradingResult?.graded && !isCorrect && (
                                              <p className="text-[9px] text-emerald-700">التسمية الصحيحة: {lbl.correctLabel}</p>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 gap-2 text-[10px] mt-2 text-slate-500 font-bold">
                                      {q.diagramLabels.map((lbl, lIdx) => (
                                        <div key={lIdx}>
                                          البيان رقم ({lIdx + 1}): .....................................................
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Page Footer */}
                        <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-bold">
                          <span>نقلة للمناهج الإلكترونية الكبرى</span>
                          <span>صفحة {page.pageNumber} من {generatedPages.length}</span>
                          <span>درجة الصفحة: / 20</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
              <FileText className="w-16 h-12 text-slate-300 mx-auto mb-4 animate-bounce" />
              <p className="text-slate-700 font-bold text-lg">لم يتم توليد أي مستندات حتى الآن</p>
              <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed font-semibold">
                اضبط الخيارات على اليمين ثم اضغط على زر التوليد لمعاينة وطباعة أوراق عمل منسقة حقيقية بجودة A4.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

