import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  Award, 
  HelpCircle, 
  BookOpen, 
  TrendingUp, 
  Globe, 
  Bookmark, 
  BookOpenCheck
} from 'lucide-react';
import { chaptersData } from '../data/chapters';

// Types for dynamically generated problem
interface GeneratedProblem {
  id: string;
  chapterId: string;
  lessonId: string;
  chapterTitle: string;
  lessonTitle: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  formulaUsed: string;
  correctValue: number;
  unit: string;
  choices: string[];
  correctChoiceIndex: number;
  detailedSolution: string;
  isInternational: boolean;
  contextName?: string; // e.g. "NASA Juno Spacecraft", "Large Hadron Collider", etc.
}

export default function ProblemsBank() {
  // State variables
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chap-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentProblem, setCurrentProblem] = useState<GeneratedProblem | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  
  // Stats
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // Load stats from localStorage
  useEffect(() => {
    const savedSolved = localStorage.getItem('physics_calc_solved_count');
    const savedStreak = localStorage.getItem('physics_calc_streak');
    if (savedSolved) setSolvedCount(parseInt(savedSolved, 10));
    if (savedStreak) setStreak(parseInt(savedStreak, 10));

    // Support external triggers (e.g. from dashboard weaknesses)
    const triggerLessonId = localStorage.getItem('practice_calc_lesson_id');
    const triggerChapterId = localStorage.getItem('practice_calc_chapter_id');
    if (triggerLessonId && triggerChapterId) {
      setSelectedChapterId(triggerChapterId);
      setSelectedLessonId(triggerLessonId);
      localStorage.removeItem('practice_calc_lesson_id');
      localStorage.removeItem('practice_calc_chapter_id');
    }
  }, []);

  // Update lesson selection when chapter changes
  useEffect(() => {
    setSelectedLessonId('all');
  }, [selectedChapterId]);

  // Generate a problem
  const generateProblem = () => {
    setSelectedChoice(null);
    setIsAnswered(false);

    // Determine target lesson
    let targetLessonId = selectedLessonId;
    let targetChapterId = selectedChapterId;

    if (selectedLessonId === 'all') {
      const chap = chaptersData.find(c => c.id === selectedChapterId);
      if (chap && chap.lessons.length > 0) {
        // pick random lesson
        const idx = Math.floor(Math.random() * chap.lessons.length);
        targetLessonId = chap.lessons[idx].id;
      }
    }

    const chap = chaptersData.find(c => c.id === targetChapterId);
    const les = chap?.lessons.find(l => l.id === targetLessonId);
    
    if (!chap || !les) return;

    const problem = buildProblemTemplate(targetChapterId, targetLessonId, difficulty, chap.title, les.title);
    setCurrentProblem(problem);
  };

  // Build a physical math problem using templates
  const buildProblemTemplate = (
    chapId: string, 
    lesId: string, 
    diff: 'easy' | 'medium' | 'hard',
    chapTitle: string,
    lesTitle: string
  ): GeneratedProblem => {
    const isHard = diff === 'hard';
    const isMed = diff === 'medium';
    
    // Random variables generators
    const randBetween = (min: number, max: number, decimals = 1) => {
      const val = Math.random() * (max - min) + min;
      return parseFloat(val.toFixed(decimals));
    };

    let questionText = '';
    let formulaUsed = '';
    let correctValue = 0;
    let unit = '';
    let detailedSolution = '';
    let isInternational = isHard;
    let contextName = '';

    // Constants
    const G = 6.67e-11;
    const M_earth = 5.97e24;
    const R_earth = 6.37e6; // 6370 km
    const h_planck = 6.63e-34;
    const c_light = 3.0e8;

    // Build specific math logic for each lesson in the Sudanese physics curriculum
    if (chapId === 'chap-1') {
      // ==== الباب الأول: الجاذبية والحركة الدائرية والكواكب ====
      if (lesId.includes('les-1-1') || lesId.includes('les-1-3')) {
        // قانون الجذب العام أو شدة المجال التثاقلي
        if (diff === 'easy') {
          // direct F = G * m1 * m2 / r^2
          const m1 = randBetween(100, 900, 0); // kg
          const m2 = randBetween(1000, 9000, 0); // kg
          const r = randBetween(5, 50, 1); // m
          correctValue = (G * m1 * m2) / (r * r);
          unit = 'نيوتن';
          questionText = `احسب قوة التجاذب المادي (بالنيوتن) بين جسمين كتلتاهما الأول ${m1} كجم والثاني ${m2} كجم، إذا كانت المسافة الفاصلة بين مركزيهما تساوي ${r} متر.`;
          formulaUsed = 'ق = ج × (ك₁ × ك₂) / ف²';
          detailedSolution = `1. المعطيات:\n   - ك₁ = ${m1} كجم\n   - ك₂ = ${m2} كجم\n   - ف = ${r} م\n   - ثابت الجذب العام ج = 6.67 × 10⁻¹¹ ن.م²/كجم²\n\n2. القانون المستخدم: ق = ج × (ك₁ × ك₂) / ف²\n\n3. التعويض المباشر:\n   - ق = (6.67 × 10⁻¹¹) × (${m1} × ${m2}) / (${r})²\n   - ق = (6.67 × 10⁻¹¹) × (${m1 * m2}) / ${parseFloat((r*r).toFixed(2))}\n   - القيمة النهائية = ${correctValue.toExponential(3)} نيوتن.`;
        } else if (diff === 'medium') {
          // find field intensity g at altitude h
          const h = randBetween(200, 1200, 0); // km altitude
          const r_total = R_earth + h * 1000;
          correctValue = (G * M_earth) / (r_total * r_total);
          unit = 'م/ث²';
          questionText = `جد شدة مجال الجاذبية (ج) للأرض عند نقطة ترتفع مسافة قدرها ${h} كيلومتر عن سطح الأرض. (علماً بأن نصف قطر الأرض = 6370 كم، وكتلتها ك = 5.97 × 10²⁴ كجم)`;
          formulaUsed = 'ج_ح = ج_عام × ك_الأرض / (نق + هـ)²';
          detailedSolution = `1. المعطيات:\n   - الارتفاع (هـ) = ${h} كم = ${h * 1000} متر\n   - نصف قطر الأرض (نق) = 6370 كم = 6.37 × 10⁶ متر\n   - المسافة الكلية من المركز (ف) = نق + هـ = ${(r_total / 1e6).toFixed(3)} × 10⁶ متر\n\n2. القانون: ج = ج_عام × ك / ف²\n\n3. التعويض:\n   - ج = (6.67 × 10⁻¹¹) × (5.97 × 10²⁴) / (${r_total.toExponential(3)})²\n   - ج = 3.982 × 10¹⁴ / ${(r_total * r_total).toExponential(3)}\n   - ج = ${correctValue.toFixed(3)} م/ث².`;
        } else {
          // Advanced / International
          contextName = 'مسبار ناسا "جونو" حول المشتري';
          const r_jup_multiplier = randBetween(1.2, 5.0, 1);
          const Jupiter_mass = 1.898e27;
          const Jupiter_radius = 6.99e7;
          const dist = r_jup_multiplier * Jupiter_radius;
          correctValue = (G * Jupiter_mass) / (dist * dist);
          unit = 'م/ث²';
          questionText = `أثناء مهمة مسبار "جونو" التابع لوكالة ناسا الأمريكية حول كوكب المشتري، اقترب المسبار إلى مسافة تعادل ${r_jup_multiplier} مرة من نصف قطر المشتري من مركزه. احسب شدة الجاذبية المؤثرة على المسبار عند تلك النقطة. (كتلة المشتري = 1.898 × 10²⁷ كجم، ونصف قطره = 69,900 كم)`;
          formulaUsed = 'ج = ج_عام × ك_المشتري / ف²';
          detailedSolution = `1. المعطيات من المسودة العالمية:\n   - كتلة المشتري = 1.898 × 10²⁷ كجم\n   - المسافة الكلية (ف) = ${r_jup_multiplier} × 69,900 كم = ${(dist / 1000).toLocaleString('ar-EG')} كم = ${dist.toExponential(4)} متر\n\n2. التعويض:\n   - ج = (6.67 × 10⁻¹¹) × (1.898 × 10²⁷) / (${dist.toExponential(3)})²\n   - ج = ${correctValue.toFixed(3)} م/ث².`;
        }
      } else if (lesId.includes('les-1-2')) {
        // الحركة الدائرية المنتظمة
        if (diff === 'easy') {
          const v = randBetween(5, 30, 0); // m/s
          const r = randBetween(2, 20, 0); // m
          correctValue = (v * v) / r;
          unit = 'م/ث²';
          questionText = `يتحرك جسم في مسار دائري منتظم قطره ${r * 2} متر بسرعة مماسية ثابتة قدرها ${v} م/ث. احسب العجلة المركزية (ج_م) المؤثرة عليه.`;
          formulaUsed = 'ج_م = ع² / نق';
          detailedSolution = `1. المعطيات:\n   - السرعة (ع) = ${v} م/ث\n   - القطر = ${r * 2} م => نصف القطر (نق) = ${r} م\n\n2. القانون: ج_م = ع² / نق\n\n3. الحساب:\n   - ج_م = (${v})² / ${r} = ${v * v} / ${r} = ${correctValue.toFixed(2)} م/ث².`;
        } else if (diff === 'medium') {
          const m = randBetween(0.5, 4.0, 1); // kg
          const r = randBetween(1, 5, 1); // m
          const T_rev = randBetween(0.5, 3.0, 1); // seconds for one revolution
          const omega = (2 * Math.PI) / T_rev;
          correctValue = m * omega * omega * r;
          unit = 'نيوتن';
          questionText = `يربط حجر كتلته ${m} كجم بطرف خيط طوله ${r} متر، ويُدار في مستوى أفقي دائري ليصنع دورة كاملة كل ${T_rev} ثانية. احسب قوة الشد في الخيط بالنيوتن (والتي تمثل القوة الجاذبة المركزية).`;
          formulaUsed = 'ق_م = ك × ω² × نق   حيث  ω = ٢π / ن';
          detailedSolution = `1. المعطيات:\n   - الكتلة (ك) = ${m} كجم\n   - نصف القطر (نق) = ${r} م\n   - زمن الدورة (ن) = ${T_rev} ث\n\n2. الخطوات:\n   - السرعة الزاوية (ω) = ٢ × ٣.١٤ / ${T_rev} = ${omega.toFixed(3)} راديان/ث\n   - القوة الجاذبة المركزية ق_م = ك × ω² × نق\n   - ق_م = ${m} × (${omega.toFixed(2)})² × ${r} = ${correctValue.toFixed(2)} نيوتن.`;
        } else {
          contextName = 'مصادم الهادرونات الكبير LHC في جنيف';
          const p_speed = 0.99 * c_light; // Proton speed approx.
          const r_lhc = 4300; // Radius in meters
          const m_proton = 1.67e-27;
          correctValue = (m_proton * p_speed * p_speed) / r_lhc;
          unit = 'نيوتن';
          questionText = `في مصادم الهادرونات الكبير (LHC) التابع للمنظمة الأوروبية للأبحاث النووية (CERN)، يتم توجيه بروتون كتلته 1.67 × 10⁻²⁷ كجم في أنبوب دائري نصف قطره 4.3 كم بسرعة تقارب سرعة الضوء وتساوي 2.97 × 10⁸ م/ث. احسب القوة الجاذبة المركزية المغناطيسية اللازمة لإبقاء البروتون في مساره الدائري.`;
          formulaUsed = 'ق_م = ك × ع² / نق';
          detailedSolution = `1. المعطيات العالمية:\n   - الكتلة (ك) = 1.67 × 10⁻²⁷ كجم\n   - السرعة (ع) = 2.97 × 10⁸ م/ث\n   - نصف القطر (نق) = 4.3 كم = 4300 متر\n\n2. الحساب المباشر:\n   - ق_م = (1.67 × 10⁻²⁷) × (2.97 × 10⁸)² / 4300\n   - ق_م = (1.67 × 10⁻²⁷) × (8.82 × 10¹⁶) / 4300\n   - ق_م = ${correctValue.toExponential(4)} نيوتن.`;
        }
      } else {
        // حركة الكواكب والأقمار الاصطناعية
        const h_sat = randBetween(300, 36000, 0); // Altitude in km
        const r_sat = R_earth + h_sat * 1000;
        correctValue = Math.sqrt((G * M_earth) / r_sat);
        unit = 'م/ث';
        if (diff === 'easy') {
          questionText = `احسب السرعة المدارية (ع) لقمر اصطناعي يدور حول الأرض في مدار دائري على ارتفاع 630 كم من سطح الأرض، علماً بأن نصف قطر المدار الكلي من مركز الأرض يساوي 7,000,000 متر.`;
          formulaUsed = 'ع = جذر (ج × ك / ف)';
          detailedSolution = `1. المعطيات:\n   - المسافة الكلية ف = 7.0 × 10⁶ متر\n   - كتلة الأرض ك = 5.97 × 10²⁴ كجم\n   - ج = 6.67 × 10⁻¹¹ ن.م²/كجم²\n\n2. التعويض:\n   - ع = جذر [ (6.67 × 10⁻¹¹) × (5.97 × 10²⁴) / 7.0 × 10⁶ ]\n   - ع = جذر [ 3.982 × 10¹⁴ / 7.0 × 10⁶ ] = جذر [ 56885814 ] = ${correctValue.toFixed(1)} م/ث.`;
        } else if (diff === 'medium') {
          questionText = `أوجد السرعة المدارية اللازمة لقمر أرصاد جوية يدور على ارتفاع ${h_sat} كم من سطح الأرض. (علماً بأن نصف قطر الأرض نق = 6370 كم وكتلتها ك = 5.97 × 10²⁴ كجم)`;
          formulaUsed = 'ع = جذر [ ج × ك / (نق + هـ) ]';
          detailedSolution = `1. المعطيات:\n   - الارتفاع (هـ) = ${h_sat} كم = ${h_sat * 1000} م\n   - ف = نق + هـ = ${r_sat.toLocaleString('ar-EG')} متر\n\n2. الحساب المباشر:\n   - ع = جذر [ (6.67 × 10⁻¹¹) × (5.97 × 10²⁴) / ${r_sat} ]\n   - ع = ${correctValue.toFixed(1)} م/ث (أي حوالي ${(correctValue * 3.6 / 1000).toFixed(1)} كم/ساعة).`;
        } else {
          contextName = 'تحديد كتلة النجم التابع لـ Kepler-186f';
          const r_orbit = 5.98e10; // 0.4 AU in meters
          const T_seconds = 130 * 24 * 3600; // 130 days orbital period
          correctValue = (4 * Math.PI * Math.PI * Math.pow(r_orbit, 3)) / (G * T_seconds * T_seconds);
          unit = 'كجم';
          questionText = `تم اكتشاف الكوكب الشبيه بالأرض Kepler-186f الذي يدور حول نجمه الأحمر القزم في مدار متوسط مسافته 5.98 × 10¹⁰ متر ويستغرق 130 يوماً أرضياً لإكمال دورة كاملة. باستخدام قانون كبلر الثالث وصيغة نيوتن، احسب كتلة هذا النجم البعيد بالكجم.`;
          formulaUsed = 'ك = (٤π² × ف³) / (ج × ن²)';
          detailedSolution = `1. المعطيات العالمية:\n   - نصف قطر المدار (ف) = 5.98 × 10¹⁰ م\n   - الزمن الدوري (ن) = 130 يوماً × 24 ساعة × 3600 ثانية = ${T_seconds.toLocaleString('ar-EG')} ثانية\n\n2. القانون: ن² = (٤π² × ف³) / (ج × ك) => ك = (٤π² × ف³) / (ج × ن²)\n\n3. الحساب:\n   - ف³ = ${(Math.pow(r_orbit, 3)).toExponential(4)}\n   - ن² = ${(T_seconds * T_seconds).toExponential(4)}\n   - ك = (39.478 × ${Math.pow(r_orbit, 3).toExponential(3)}) / (6.67 × 10⁻¹¹ × ${(T_seconds * T_seconds).toExponential(3)})\n   - ك = ${correctValue.toExponential(3)} كجم.`;
        }
      }
    } else if (chapId === 'chap-2') {
      // ==== الباب الثاني: التوافقية والاهتزازات والضوء والعدسات ====
      if (lesId.includes('les-2-1')) {
        // الحركة التوافقية البسيطة (البندول البسيط)
        if (diff === 'easy') {
          const L = randBetween(0.5, 3.0, 1);
          correctValue = 2 * Math.PI * Math.sqrt(L / 9.8);
          unit = 'ثانية';
          questionText = `بندول بسيط طول خيطه معلق به كرة يساوي ${L} متر. احسب الزمن الدوري (ن) لذبذبته في بيئة تعتبر فيها عجلة الجاذبية د = 9.8 م/ث².`;
          formulaUsed = 'ن = ٢π × جذر (ل / د)';
          detailedSolution = `1. المعطيات:\n   - طول الخيط (ل) = ${L} م\n   - العجلة (د) = 9.8 م/ث²\n\n2. القانون: ن = ٢ × ٣.١٤١٦ × جذر(${L} / 9.8)\n\n3. التعويض والحل المباشر:\n   - ن = 6.283 × جذر(${parseFloat((L / 9.8).toFixed(4))}) = ${correctValue.toFixed(3)} ثانية.`;
        } else if (diff === 'medium') {
          // find g on moon if L and T are given
          const L = randBetween(1.0, 2.0, 1);
          const T = randBetween(4.0, 7.0, 1);
          correctValue = (4 * Math.PI * Math.PI * L) / (T * T);
          unit = 'م/ث²';
          questionText = `إذا كان بندول طول خيطه ${L} متر يكمل ذبذبة كاملة خلال ${T} ثوانٍ على سطح كوكب آخر، فما مقدار عجلة الجاذبية على سطح ذلك الكوكب؟`;
          formulaUsed = 'د = ٤π² × ل / ن²';
          detailedSolution = `1. المعطيات:\n   - ل = ${L} م\n   - ن = ${T} ث\n\n2. اشتقاق القانون:\n   - ن = ٢π جذر(ل/د) => ن² = ٤π² (ل/د) => د = ٤π² ل / ن²\n\n3. الحساب:\n   - د = (39.478 × ${L}) / (${T * T})\n   - د = ${correctValue.toFixed(2)} م/ث².`;
        } else {
          contextName = 'بندول فوكو بمقر الأمم المتحدة بالولايات المتحدة';
          const L_foucault = 22.0; // 22 meters
          correctValue = 2 * Math.PI * Math.sqrt(L_foucault / 9.81);
          unit = 'ثانية';
          questionText = `يوجد بمبنى الأمم المتحدة في نيويورك بندول فوكو الشهير لإثبات دوران الأرض، ويبلغ طول سلكه النحاسي 22 متر معلقاً بالسقف. احسب كم يستغرق هذا البندول العالمي لإتمام دورة اهتزازية كاملة واحدة (الزمن الدوري) بفرض د = 9.81 م/ث².`;
          formulaUsed = 'ن = ٢π × جذر (ل / د)';
          detailedSolution = `1. المعطيات الفنية العالمية:\n   - ل = 22.0 متر\n   - د = 9.81 م/ث²\n\n2. الحساب بالتفصيل:\n   - ن = ٢ × ٣.١٤١٥٩ × جذر(22.0 / 9.81)\n   - ن = 6.28318 × جذر(2.2426) = 6.28318 × 1.4975\n   - ن = ${correctValue.toFixed(2)} ثانية.`;
        }
      } else if (lesId.includes('les-2-2') || lesId.includes('les-2-3')) {
        // الأمواج والتردد
        const freq = randBetween(100, 2000, 0); // Hz
        const speed = 340; // m/s (speed of sound)
        correctValue = speed / freq;
        unit = 'متر';
        if (diff === 'easy') {
          questionText = `تنتشر موجة صوتية في هواء درجة حرارته عادية بسرعة 340 م/ث وبتردد قدره ${freq} هرتز. احسب طول الموجة (ل) لهذه الموجة الصوتية بالمتر.`;
          formulaUsed = 'ل = ع / د';
          detailedSolution = `1. المعطيات:\n   - السرعة (ع) = 340 م/ث\n   - التردد (د) = ${freq} هرتز\n\n2. القانون: ل = ع / د\n\n3. التعويض:\n   - ل = 340 / ${freq} = ${correctValue.toFixed(4)} متر (أو ${parseFloat((correctValue * 100).toFixed(2))} سم).`;
        } else if (diff === 'medium') {
          // Doppler effect
          const fs = randBetween(300, 800, 0); // source freq in Hz
          const vs = randBetween(20, 50, 0); // source speed m/s moving towards observer
          correctValue = fs * (speed / (speed - vs));
          unit = 'هرتز';
          questionText = `تتحرك سيارة إسعاف تطلق صافرة ترددها ${fs} هرتز بسرعة ${vs} م/ث مقتربة من مراقب ساكن على الرصيف. أوجد التردد الظاهري الذي يسمعه هذا المراقب، علماً بأن سرعة الصوت في الهواء هي 340 م/ث.`;
          formulaUsed = 'د_ظاهري = د_المصدر × [ ع / (ع - ع_المصدر) ]';
          detailedSolution = `1. المعطيات:\n   - تردد المصدر (د) = ${fs} هرتز\n   - سرعة الصوت (ع) = 340 م/ث\n   - سرعة الإسعاف المقترب (ع_س) = ${vs} م/ث\n\n2. قانون تأثير دوبلر للتقارب:\n   - د_ظ = د × [ ع / (ع - ع_س) ]\n\n3. الحساب:\n   - د_ظ = ${fs} × [ 340 / (340 - ${vs}) ]\n   - د_ظ = ${fs} × [ 340 / ${340 - vs} ] = ${correctValue.toFixed(1)} هرتز.`;
        } else {
          contextName = 'برج مراقبة الحركة الجوية بمطار الخرطوم ورادار دوبلر';
          const f_radar = 9.35e9; // 9.35 GHz X-band radar
          const jet_speed = randBetween(240, 320, 0); // m/s moving away
          const delta_f = (2 * jet_speed * f_radar) / c_light;
          correctValue = delta_f / 1000;
          unit = 'كيلوهرتز';
          questionText = `يستخدم مطار الخرطوم رادار طيران يرسل موجات كهرومغناطيسية بتردد 9.35 جيجاهرتز (9.35 × 10⁹ هرتز). إذا رصد الرادار طائرة نفاثة تبتعد بسرعة ${jet_speed} م/ث، فما هو مقدار الإزاحة في التردد (تردد دبلر بالـ kHz) المرتد للرادار؟`;
          formulaUsed = 'Δد = (٢ × ع_طائرة × د_الرادار) / س';
          detailedSolution = `1. المعطيات العالمية:\n   - تردد الإرسال (د) = 9.35 × 10⁹ هرتز\n   - سرعة الطائرة الابتعادية (ع) = ${jet_speed} م/ث\n   - سرعة الضوء (س) = 3 × 10⁸ م/ث\n\n2. معادلة التغير في التردد في رادار دوبلر:\n   - Δد = (٢ × ${jet_speed} × 9.35 × 10⁹) / (3 × 10⁸)\n   - Δد = ${(2 * jet_speed * 9.35e9).toExponential(3)} / (3 × 10⁸) = ${delta_f.toFixed(1)} هرتز\n\n3. التحويل لـ كيلوهرتز:\n   - Δد = ${correctValue.toFixed(2)} كيلوهرتز.`;
        }
      } else if (lesId.includes('les-2-4') || lesId.includes('les-2-5') || lesId.includes('les-2-6') || lesId.includes('les-2-7')) {
        // انكسار الضوء وقانون سنل والعدسات والمرايا
        if (diff === 'easy') {
          // magnification in convex lens or mirror
          const u = randBetween(10, 40, 0); // object dist in cm
          const v = randBetween(15, 60, 0); // image dist in cm
          correctValue = v / u;
          unit = 'مرة تكبير';
          questionText = `وضع جسم على بعد ${u} سم من عدسة محدبة، فتشكلت له صورة حقيقية واضحة على حائل يبعد مسافة ${v} سم عن المركز البصري للعدسة. احسب معامل التكبير (ت) الحاصل للصورة.`;
          formulaUsed = 'ت = ص / س';
          detailedSolution = `1. المعطيات:\n   - بعد الجسم (س) = ${u} سم\n   - بعد الصورة (ص) = ${v} سم\n\n2. قانون التكبير المباشر: ت = ص / س\n\n3. التعويض:\n   - ت = ${v} / ${u} = ${correctValue.toFixed(2)} مرة.`;
        } else if (diff === 'medium') {
          // Snell's law: find angle of refraction s2
          const n1 = 1.0; // air
          const n2 = 1.5; // glass
          const s1 = 45; // angle of incidence 45 deg
          const sin_s2 = (n1 * Math.sin(s1 * Math.PI / 180)) / n2;
          correctValue = Math.asin(sin_s2) * 180 / Math.PI;
          unit = 'درجة';
          questionText = `سقط شعاع ضوئي من الهواء (معامل انكساره المطلق = 1) بزاوية سقوط مقدارها 45 درجة على سطح لوح زجاجي مسطح معامل انكساره المطلق = 1.5. احسب زاوية انكسار الشعاع داخل الزجاج (بالدرجات).`;
          formulaUsed = 'م١ × جا س١ = م٢ × جا س٢';
          detailedSolution = `1. المعطيات:\n   - م₁ = 1.0 (الهواء)\n   - م₂ = 1.5 (الزجاج)\n   - زاوية السقوط (س₁) = 45 درجة => جا 45 = 0.707\n\n2. قانون سنل العام: م₁ × جا س₁ = م₂ × جا س₂\n   - 1.0 × 0.707 = 1.5 × جا س₂\n   - جا س₂ = 0.707 / 1.5 = ${sin_s2.toFixed(4)}\n\n3. إيجاد الزاوية المقابلة:\n   - س₂ = جا⁻¹(${sin_s2.toFixed(4)}) = ${correctValue.toFixed(1)} درجة.`;
        } else {
          contextName = 'كابل الاتصالات البحري العابر للأطلسي (TAT-14)';
          const core_index = randBetween(1.45, 1.48, 2);
          const cladding_index = core_index - 0.03; // slightly lower
          const sin_critical = cladding_index / core_index;
          correctValue = Math.asin(sin_critical) * 180 / Math.PI;
          unit = 'درجة';
          questionText = `كابل الاتصالات البحري العابر للمحيط الأطلسي (TAT-14) ينقل البيانات عبر ألياف بصرية زجاجية. إذا كان معامل انكسار قلب الليفة الضوئية (القلب) هو ${core_index} ومعامل انكسار غلافها الخارجي (الكسوة) هو ${cladding_index.toFixed(2)}، فما هي قيمة زاوية السقوط الحرجة (ح) اللازمة لحدوث الانعكاس الكلي الداخلي وضمان نقل البيانات دون فقدان؟`;
          formulaUsed = 'جا ح = م_الكسوة / م_القلب';
          detailedSolution = `1. المعطيات العالمية:\n   - م_القلب (الوسط الأكبر كثافة م₁) = ${core_index}\n   - م_الكسوة (الوسط الأقل كثافة م₂) = ${cladding_index.toFixed(2)}\n\n2. شرط الزاوية الحرجة للانعكاس الكلي:\n   - جا ح = م₂ / م₁\n   - جا ح = ${cladding_index.toFixed(2)} / ${core_index} = ${sin_critical.toFixed(4)}\n\n3. الحساب بالدرجات:\n   - ح = جا⁻¹(${sin_critical.toFixed(4)}) = ${correctValue.toFixed(2)} درجة.`;
        }
      }
    } else if (chapId === 'chap-3') {
      // ==== الباب الثالث: الكهربية والمغناطيسية ====
      if (lesId.includes('les-3-1') || lesId.includes('les-3-2')) {
        // الكهربية الساكنة وقانون كولوم
        if (diff === 'easy') {
          const q1 = randBetween(2, 9, 0); // micro-coulombs
          const q2 = randBetween(1, 5, 0); // micro-coulombs
          const r = randBetween(0.1, 0.9, 1); // meters
          correctValue = (9e9 * q1 * 1e-6 * q2 * 1e-6) / (r * r);
          unit = 'نيوتن';
          questionText = `شحنتان نقطيتان موضوعتان في الفراغ، قيمة الأولى ${q1} ميكروكولوم والثانية ${q2} ميكروكولوم، تفصلهما مسافة قدرها ${r} متر. احسب قوة التنافر الكهروستاتيكي بينهما بالنيوتن. (ثابت كولوم أ = 9 × 10⁹ ن.م²/ك²).`;
          formulaUsed = 'ق = أ × (ش١ × ش٢) / ف²';
          detailedSolution = `1. المعطيات:\n   - ش₁ = ${q1} × 10⁻⁶ كولوم\n   - ش₂ = ${q2} × 10⁻⁶ كولوم\n   - ف = ${r} م\n   - أ = 9 × 10⁹ ن.م²/ك²\n\n2. التعويض:\n   - ق = (9 × 10⁹) × (${q1} × 10⁻⁶ × ${q2} × 10⁻⁶) / (${r})²\n   - ق = (9 × 10⁹) × (${q1 * q2} × 10⁻¹²) / ${parseFloat((r*r).toFixed(2))}\n   - ق = ${correctValue.toFixed(3)} نيوتن.`;
        } else if (diff === 'medium') {
          // find electric field intensity E = F / q or k*q/r^2
          const q = randBetween(10, 80, 0); // micro-coulombs
          const r = randBetween(0.5, 3.0, 1); // meters
          correctValue = (9e9 * q * 1e-6) / (r * r);
          unit = 'نيوتن/كولوم';
          questionText = `احسب شدة المجال الكهربي (جـ) عند نقطة تبعد مسافة ${r} متر عن شحنة نقطية سالبة مقدارها ${q} ميكروكولوم في الفراغ.`;
          formulaUsed = 'جـ = أ × ش / ف²';
          detailedSolution = `1. المعطيات:\n   - الشحنة ش = ${q} × 10⁻⁶ كولوم\n   - ف = ${r} م\n\n2. القانون: جـ = أ × ش / ف²\n\n3. التعويض:\n   - جـ = (9 × 10⁹) × (${q} × 10⁻⁶) / (${r})²\n   - جـ = ${correctValue.toExponential(4)} نيوتن/كولوم.`;
        } else {
          contextName = 'حساب طاقة صاعقة برق طبيعية';
          const distance_cloud = randBetween(800, 2000, 0); // meters
          const voltage = randBetween(20, 100, 0) * 1e6; // MV to V
          correctValue = voltage / distance_cloud;
          unit = 'فولت/متر';
          questionText = `تتشكل صاعقة برق عندما يصبح المجال الكهربائي بين قاعدة سحابة منخفضة وسطح الأرض شديداً جداً لدرجة تأيين الهواء. إذا كان ارتفاع قاعدة السحابة ${distance_cloud} متر وكان فرق الجهد الكهربي بينها وبين الأرض يبلغ ${voltage / 1e6} مليون فولت، فما هي شدة المجال الكهربائي المتوسط الناتج بالـ (V/m)؟`;
          formulaUsed = 'جـ = ج / ف';
          detailedSolution = `1. المعطيات العالمية:\n   - فرق الجهد (ج) = ${voltage.toExponential(2)} فولت\n   - المسافة (ف) = ${distance_cloud} متر\n\n2. القانون الكهروستاتيكي الموحد: جـ = ج / ف\n\n3. الحساب:\n   - جـ = ${voltage.toExponential(2)} / ${distance_cloud}\n   - جـ = ${correctValue.toFixed(1)} فولت/متر.`;
        }
      } else if (lesId.includes('les-3-3')) {
        // الكهربية التيارية وقوانين أوم والمقاومات
        if (diff === 'easy') {
          const v = randBetween(6, 240, 0); // volts
          const r = randBetween(10, 500, 0); // ohms
          correctValue = v / r;
          unit = 'أمبير';
          questionText = `وُصلت مقاومة كهربائية قيمتها ${r} أوم بمصدر جهد كهربائي مستمر جهده ${v} فولت. احسب شدة التيار المار في الدائرة بالأمبير.`;
          formulaUsed = 'ت = ج / م';
          detailedSolution = `1. المعطيات:\n   - الجهد (ج) = ${v} فولت\n   - المقاومة (م) = ${r} أوم\n\n2. قانون أوم: ت = ج / م\n\n3. الحساب:\n   - ت = ${v} / ${r} = ${correctValue.toFixed(4)} أمبير.`;
        } else if (diff === 'medium') {
          // copper wire resistance R = rho * L / A
          const L = randBetween(10, 150, 0); // meters
          const diameter_mm = randBetween(0.5, 2.5, 1); // wire diameter in mm
          const area_m2 = Math.PI * Math.pow((diameter_mm * 1e-3) / 2, 2);
          const rho_copper = 1.72e-8; // ohm.m
          correctValue = rho_copper * L / area_m2;
          unit = 'أوم';
          questionText = `احسب مقاومة سلك نحاسي طوله ${L} متر وقطر مقطعه الدائري يبلغ ${diameter_mm} ملم، علماً بأن المقاومة النوعية للنحاس تبلغ 1.72 × 10⁻⁸ أوم.متر.`;
          formulaUsed = 'م = م_نوعية × ل / س   حيث س = π × نق²';
          detailedSolution = `1. المعطيات:\n   - الطول (ل) = ${L} م\n   - القطر = ${diameter_mm} مم => نصف القطر (نق) = ${diameter_mm / 2} مم = ${(diameter_mm / 2 * 1e-3).toExponential(3)} متر\n   - مساحة المقطع (س) = ٣.١٤١٦ × (${(diameter_mm / 2 * 1e-3).toExponential(2)})² = ${area_m2.toExponential(4)} م²\n\n2. التعويض:\n   - م = (1.72 × 10⁻⁸) × ${L} / ${area_m2.toExponential(4)}\n   - م = ${correctValue.toFixed(3)} أوم.`;
        } else {
          contextName = 'نقل طاقة السد العالي الكهربائية';
          const p_power = randBetween(100, 500, 0) * 1e6; // MW to W
          const v_transmission = 500e3; // 500 kV transmission
          const r_line = randBetween(2, 15, 0); // total line resistance in ohms
          const I = p_power / v_transmission;
          correctValue = I * I * r_line;
          unit = 'وات (فقد)';
          questionText = `تنقل خطوط النقل الهوائية عالية الجهد الطاقة الكهربائية المولدة من محطة كهرومائية بقدرة ${p_power / 1e6} ميجاوات تحت جهد إرسال يبلغ 500 كيلوفولت (500,000 فولت) عبر مسافة طويلة. إذا كانت المقاومة الإجمالية لأسلاك النقل تبلغ ${r_line} أوم، فما هو مقدار القدرة المفقودة (حرارياً) في الأسلاك نتيجة لمرور التيار الكهربي؟`;
          formulaUsed = 'القدرة_المفقودة = ت² × م   حيث ت = ق / ج';
          detailedSolution = `1. المعطيات الفنية للشبكات الفائقة:\n   - القدرة الكلية المرسلة (ق) = ${p_power.toLocaleString('ar-EG')} وات\n   - جهد الخط (ج) = 500,000 فولت\n   - مقاومة الكابلات (م) = ${r_line} أوم\n\n2. حساب التيار الإجمالي (ت):\n   - ت = ق / ج = ${p_power} / 500,000 = ${I} أمبير\n\n3. حساب الفقد الحراري (ت² م):\n   - الفقد = (${I})² × ${r_line} = ${I * I} × ${r_line}\n   - الفقد = ${correctValue.toLocaleString('ar-EG')} وات (أي حوالي ${(correctValue / 1e6).toFixed(2)} ميجاوات من القدرة الكلية).`;
        }
      } else {
        // المجال المغناطيسي للتيار الكهربي
        if (diff === 'easy') {
          // Force on moving charge F = q * v * B
          const q = 1.6e-19; // charge of electron
          const v = randBetween(1, 8, 0) * 1e6; // m/s
          const B = randBetween(0.1, 1.5, 1); // Tesla
          correctValue = q * v * B;
          unit = 'نيوتن';
          questionText = `يتحرك إلكترون شحنته 1.6 × 10⁻١٩ كولوم بسرعة ${v / 1e6} × 10⁶ م/ث عمودياً على مجال مغناطيسي منتظم شدته ${B} تسلا. احسب القوة المغناطيسية المؤثرة عليه بالنيوتن.`;
          formulaUsed = 'ق = ش × ع × ح   (جا ٩٠ = ١)';
          detailedSolution = `1. المعطيات:\n   - ش = 1.6 × 10⁻١٩ كولوم\n   - ع = ${v.toExponential(1)} م/ث\n   - ح = ${B} تسلا\n\n2. القانون: ق = ش × ع × ح × جا(هـ)\n\n3. الحساب:\n   - ق = (1.6 × 10⁻١٩) × (${v.toExponential(1)}) × ${B} × 1\n   - ق = ${correctValue.toExponential(4)} نيوتن.`;
        } else if (diff === 'medium') {
          // B around wire B = mu0 * I / 2pi * r
          const I = randBetween(5, 50, 0); // amps
          const r_cm = randBetween(2, 25, 0); // cm
          const mu0 = 4 * Math.PI * 1e-7;
          correctValue = (mu0 * I) / (2 * Math.PI * (r_cm / 100));
          unit = 'تسلا';
          questionText = `يمر تيار مستمر شدته ${I} أمبير في سلك طويل مستقيم في الهواء. احسب شدة المجال المغناطيسي (ح) الناتج عند نقطة تبعد مسافة ${r_cm} سم عن السلك. (علماً بأن نفاذية الهواء المغناطيسية ن = 4π × 10⁻⁷ تسلا.م/أمبير)`;
          formulaUsed = 'ح = (ن × ت) / (٢π × ف)';
          detailedSolution = `1. المعطيات:\n   - ت = ${I} أمبير\n   - ف = ${r_cm} سم = ${r_cm / 100} متر\n\n2. القانون: ح = (ن × ت) / (٢π × ف) = (٢ × 10⁻⁷ × ت) / ف\n\n3. التعويض:\n   - ح = (٢ × 10⁻⁷ × ${I}) / ${r_cm / 100}\n   - ح = ${correctValue.toExponential(4)} تسلا.`;
        } else {
          contextName = 'مفاعل الاندماج النووي توكاماك Tokamak ITER';
          const I_fusion = randBetween(10, 20, 0) * 1e6; // 10-20 MA in Tokamak solenoid
          const radius_sol = 2.0; // meters
          const turns = 1000;
          const mu0 = 4 * Math.PI * 1e-7;
          // B = mu0 * N * I / L (using idealized formula for extreme science)
          correctValue = (mu0 * turns * I_fusion) / (2 * Math.PI * radius_sol);
          unit = 'تسلا';
          questionText = `في مفاعل "توكاماك" الدولي للاندماج النووي (ITER)، تُستخدم مغناطيسات عملاقة فائقة التوصيل لحصر بلازما حرارية تدور في مسار دائري قطره 4 أمتار (نق = 2م). إذا كانت شدة التيار الكهربي الكلي المغذي للملفات تبلغ ${I_fusion / 1e6} مليون أمبير، وعدد لفات الملف الحلقي الكلية 1000 لفة، فما شدة المجال المغناطيسي الناتج بالـ Tesla؟`;
          formulaUsed = 'ح = (ن × د × ت) / (٢π × نق)';
          detailedSolution = `1. المعطيات للمشروع النووي العالمي:\n   - عدد اللفات (د) = 1000 لفة\n   - التيار (ت) = ${I_fusion.toExponential(2)} أمبير\n   - نصف القطر (نق) = 2.0 متر\n\n2. قانون الملف الحلقي لشدة المجال:\n   - ح = (ن × د × ت) / (٢π × نق)\n   - ح = (4π × 10⁻⁷ × 1000 × ${I_fusion.toExponential(1)}) / (٢π × 2)\n   - ح = ${correctValue.toFixed(2)} تسلا.`;
        }
      }
    } else {
      // ==== الباب الرابع: الفيزياء الحديثة والنووية والإلكترونيات ====
      if (lesId.includes('les-4-1') || lesId.includes('les-4-2') || lesId.includes('les-4-3')) {
        // الخلية الكهرضوئية وبنية الذرة ونموذج بور
        if (diff === 'easy') {
          // Energy of a photon E = h * f
          const freq = randBetween(4, 9, 1) * 1e14; // Hz (visible light)
          correctValue = h_planck * freq;
          unit = 'جول';
          questionText = `سقط ضوء بتردد يبلغ ${freq.toExponential(1)} هرتز على خلية كهرضوئية. احسب طاقة فوتون هذا الضوء بالجول. (ثابت بلانك هـ = 6.63 × 10⁻٣٤ جول.ث)`;
          formulaUsed = 'ط = هـ × د';
          detailedSolution = `1. المعطيات:\n   - التردد د = ${freq.toExponential(1)} هرتز\n   - هـ = 6.63 × 10⁻٣٤ جول.ث\n\n2. قانون طاقة الفوتون لكوانتم بلانك: ط = هـ × د\n\n3. الحساب المباشر:\n   - ط = (6.63 × 10⁻٣٤) × (${freq.toExponential(1)})\n   - ط = ${correctValue.toExponential(4)} جول.`;
        } else if (diff === 'medium') {
          // Bohr hydrogen energy level transition emission
          const n_initial = 3;
          const n_final = 2;
          const E_initial = -13.6 / (n_initial * n_initial);
          const E_final = -13.6 / (n_final * n_final);
          const dE_eV = E_initial - E_final; // positive energy difference
          correctValue = 1242 / dE_eV; // wavelength in nm
          unit = 'نانومتر';
          questionText = `طبقاً لنموذج بور لذرة الهيدروجين، هبط إلكترون من المدار الثالث (ن = 3) إلى المدار الثاني (ن = 2). أوجد الطول الموجي للفوتون المنبعث بالنانومتر (nm). (علماً بأن طاقة المستوى ن لذرة الهيدروجين تعادل ط_ن = -13.6 / ن² إلكترون فولت، ومعادلة الطول الموجي λ = 1242 / Δط_eV)`;
          formulaUsed = 'λ = ١٢٤٢ / Δط   (بالـ nm)';
          detailedSolution = `1. المعطيات:\n   - ط_٣ = -13.6 / (٣)² = -13.6 / 9 = -1.51 eV\n   - ط_٢ = -13.6 / (٢)² = -13.6 / 4 = -3.40 eV\n\n2. التغير في الطاقة (فرق المستويين):\n   - Δط = ط_٣ - ط_٢ = -1.51 - (-3.40) = 1.89 إلكترون فولت\n\n3. حساب الطول الموجي المنبعث:\n   - λ = 1242 / 1.89 = ${correctValue.toFixed(1)} نانومتر (هذا الخط يمثل خط بالمر الأحمر في طيف الهيدروجين).`;
        } else {
          contextName = 'تلسكوب جيمس ويب ومجرات الكون السحيق';
          const redshift = randBetween(8.0, 15.0, 1);
          // Lyman-alpha wavelength is 121.6 nm in laboratory rest frame.
          // Due to expansion, observed wavelength is lambda_obs = lambda_rest * (1 + z)
          const lyman_rest = 121.6;
          correctValue = lyman_rest * (1 + redshift);
          unit = 'نانومتر (تحت الحمراء)';
          questionText = `رصد تلسكوب "جيمس ويب" الفضائي (JWST) مجرة بدائية تشكلت في فجر الكون المبكر تبلغ انزياحها الأحمر الفلكي (z) حوالي ${redshift}. إذا علمت أن فوتونات خط انبعاث غاز الهيدروجين Lyman-Alpha تنبعث في الأصل بطول موجي معملي قدره 121.6 نانومتر، فما هو الطول الموجي المرصود بالتلسكوب اليوم لهذه الفوتونات بالنانومتر؟`;
          formulaUsed = 'λ_مرصود = λ_أصلي × (١ + z)';
          detailedSolution = `1. المعطيات الكونية والفيزياء الحديثة:\n   - الطول الموجي في المختبر لخط لايمان = 121.6 نانومتر\n   - معامل الانزياح الأحمر الفلكي z = ${redshift}\n\n2. معادلة تمدد الطول الموجي لبلانك الكوني:\n   - λ_مرصود = 121.6 × (١ + ${redshift})\n   - λ_مرصود = 121.6 × ${1 + redshift}\n   - λ_مرصود = ${correctValue.toFixed(1)} نانومتر (وقد انزاح هذا الخط بالكامل من فوق البنفسجية إلى الأشعة تحت الحمراء القريبة، ولهذا تم تزويد جيمس ويب بمستشعرات IR).`;
        }
      } else {
        // النشاط الإشعاعي وطاقة الربط والانشطار والاندماج النووي والاتصالات
        if (diff === 'easy') {
          // Energy from mass defect E = dm * c^2
          const mass_defect_kg = randBetween(1, 9, 1) * 1e-30;
          correctValue = mass_defect_kg * c_light * c_light;
          unit = 'جول';
          questionText = `في تفاعل نووي، حدث نقص في الكتلة (كتلة مفقودة تحولت لطاقة) يبلغ ${mass_defect_kg.toExponential(1)} كجم. احسب كمية الطاقة الناتجة بالجول طبقاً لمعادلة أينشتاين لتكافؤ الكتلة والطاقة.`;
          formulaUsed = 'ط = ك × س²';
          detailedSolution = `1. المعطيات:\n   - الكتلة المفقودة ك = ${mass_defect_kg.toExponential(1)} كجم\n   - سرعة الضوء س = 3 × 10⁸ م/ث\n\n2. معادلة أينشتاين: ط = ك × س²\n\n3. التعويض والحل:\n   - ط = (${mass_defect_kg.toExponential(1)}) × (3 × 10⁸)²\n   - ط = (${mass_defect_kg.toExponential(1)}) × (9 × 10¹⁶)\n   - ط = ${correctValue.toExponential(4)} جول.`;
        } else if (diff === 'medium') {
          // Half-life radioactive decay remaining amount
          const half_life_days = randBetween(5, 30, 0);
          const elapsed_days = half_life_days * 3;
          const initial_mass = randBetween(50, 400, 0); // grams
          correctValue = initial_mass / 8; // 3 half lives elapsed
          unit = 'جرام';
          questionText = `عنصر مشع نصف عمره ${half_life_days} يوماً. إذا كانت كتلته الابتدائية ${initial_mass} جراماً، فكم يتبقى منه بعد مرور ${elapsed_days} يوماً؟`;
          formulaUsed = 'الكتلة_المتبقية = ك_الابتدائية / ٢^ن   حيث ن = الزمن الكلي / عمر النصف';
          detailedSolution = `1. المعطيات:\n   - ك_الابتدائية = ${initial_mass} جرام\n   - عمر النصف = ${half_life_days} يوماً\n   - الزمن الكلي = ${elapsed_days} يوماً\n\n2. الخطوات:\n   - عدد فترات عمر النصف المنقضية (ن) = ${elapsed_days} / ${half_life_days} = 3 فترات.\n   - ك_المتبقية = ${initial_mass} / (٢)³ = ${initial_mass} / 8\n   - ك_المتبقية = ${correctValue.toFixed(2)} جرام.`;
        } else {
          contextName = 'دورة الاندماج النووي لإنتاج طاقة الشمس';
          const h_fusion_rate = randBetween(500, 650, 0); // Million tons of hydrogen fused per second
          const h_rate_kg = h_fusion_rate * 1e6 * 1000; // to kg
          // conversion efficiency of P-P chain is ~ 0.71%
          const mass_to_energy_kg = h_rate_kg * 0.0071;
          correctValue = mass_to_energy_kg * c_light * c_light;
          unit = 'وات (جول/ث)';
          questionText = `في قلب الشمس، تندمج أنوية الهيدروجين لإنتاج الهيليوم بمعدل يبلغ حوالي ${h_fusion_rate} مليون طن من الهيدروجين في الثانية الواحدة. إذا علمت أن كفاءة تحويل الكتلة لطاقة في تفاعل الاندماج هذا تبلغ 0.71% فقط، فاحسب القدرة الإشعاعية الكلية للشمس بالـ Watt الناتجة عن فناء هذه الكتلة بالثانية الواحدة.`;
          formulaUsed = 'القدرة = (الكتلة_المحولة_بالثانية × كفاءة_التحويل) × س²';
          detailedSolution = `1. المعطيات الكونية الفائقة:\n   - كتلة الهيدروجين في الثانية = ${h_fusion_rate} مليون طن = ${(h_rate_kg).toExponential(3)} كجم/ث\n   - الكتلة التي تفنى وتتحول كلياً لطاقة ك = ${(h_rate_kg).toExponential(1)} × 0.0071 = ${mass_to_energy_kg.toExponential(3)} كجم/ث\n\n2. التعويض في صيغة أينشتاين:\n   - ط = ك × س² = (${mass_to_energy_kg.toExponential(3)}) × (3 × 10⁸)²\n   - ط = (${mass_to_energy_kg.toExponential(3)}) × (9 × 10¹⁶)\n   - ط = ${correctValue.toExponential(4)} جول بالثانية (وات) وهي تعادل تقريباً القدرة الإشعاعية الكلية المرصودة للشمس علمياً.`;
        }
      }
    }

    // Generate smart multiple choices
    const choicesList: string[] = [];
    
    // Add correct option
    let formattedCorrect = '';
    if (correctValue < 1e-3 || correctValue > 1e4) {
      formattedCorrect = correctValue.toExponential(3);
    } else {
      formattedCorrect = correctValue.toFixed(2);
    }

    choicesList.push(formattedCorrect);

    // Create realistic distractors (forgetting to square, dividing instead of multiplying, doubling/halving, order of magnitude mistakes)
    const factor_options = [1.5, 0.5, 2.0, 10.0, 0.1, 1 / 1.5];
    while (choicesList.length < 4) {
      const idx = Math.floor(Math.random() * factor_options.length);
      const wrongVal = correctValue * factor_options[idx];
      let formattedWrong = '';
      if (wrongVal < 1e-3 || wrongVal > 1e4) {
        formattedWrong = wrongVal.toExponential(3);
      } else {
        formattedWrong = wrongVal.toFixed(2);
      }

      if (!choicesList.includes(formattedWrong)) {
        choicesList.push(formattedWrong);
      }
    }

    // Shuffle options but track correct index
    const shuffledChoices = [...choicesList];
    for (let i = shuffledChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
    }

    const correctChoiceIndex = shuffledChoices.indexOf(formattedCorrect);

    return {
      id: `calc-${chapId}-${lesId}-${diff}-${Date.now()}`,
      chapterId: chapId,
      lessonId: lesId,
      chapterTitle: chapTitle,
      lessonTitle: lesTitle,
      difficulty: diff,
      questionText,
      formulaUsed,
      correctValue,
      unit,
      choices: shuffledChoices,
      correctChoiceIndex,
      detailedSolution,
      isInternational,
      contextName: contextName || undefined
    };
  };

  // Submit Answer
  const handleAnswerSubmit = (choiceIdx: number) => {
    if (isAnswered) return;
    
    setSelectedChoice(choiceIdx);
    setIsAnswered(true);

    const isAnswerCorrect = choiceIdx === currentProblem?.correctChoiceIndex;
    setIsCorrect(isAnswerCorrect);

    // Update locally stored stats & weaknesses
    const newSolvedCount = solvedCount + 1;
    const newStreak = isAnswerCorrect ? streak + 1 : 0;
    
    setSolvedCount(newSolvedCount);
    setStreak(newStreak);
    
    localStorage.setItem('physics_calc_solved_count', newSolvedCount.toString());
    localStorage.setItem('physics_calc_streak', newStreak.toString());

    // Update the official weakness tracker
    try {
      const savedTracker = localStorage.getItem('physics_weakness_tracker');
      const tracker = savedTracker ? JSON.parse(savedTracker) : {};
      
      const lessonId = currentProblem?.lessonId || '';
      const lessonTitle = currentProblem?.lessonTitle || '';
      const chapterId = currentProblem?.chapterId || '';

      if (lessonId) {
        if (!tracker[lessonId]) {
          tracker[lessonId] = {
            lessonId,
            lessonTitle,
            chapterId,
            wrongCount: 0,
            correctCount: 0,
            totalCount: 0
          };
        }

        tracker[lessonId].totalCount += 1;
        if (isAnswerCorrect) {
          tracker[lessonId].correctCount += 1;
        } else {
          // Student failed - increment weakness errors!
          tracker[lessonId].wrongCount += 1;
        }

        localStorage.setItem('physics_weakness_tracker', JSON.stringify(tracker));
        
        // Dispatch custom event to notify main App immediately
        window.dispatchEvent(new Event('physics_weakness_updated'));
      }
    } catch (e) {
      console.error('Failed to update weakness tracker in calculations', e);
    }
  };

  // Initialize first problem on load
  useEffect(() => {
    generateProblem();
  }, [selectedChapterId, selectedLessonId, difficulty]);

  return (
    <div className="space-y-6" id="numerical-problems-bank">
      {/* Upper Status Banner / Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-sky-50 dark:bg-sky-950/40 p-4 rounded-2xl border border-sky-100 dark:border-sky-900/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-600">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold block">المسائل المنجزة</span>
            <span className="text-lg font-black text-sky-900 dark:text-white font-mono">{solvedCount} مسألة</span>
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">سلسلة الحل الصحيح (Streak)</span>
            <span className="text-lg font-black text-emerald-900 dark:text-white font-mono">{streak} متتالي</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold block">مستوى التدريب الحالي</span>
            <span className="text-sm font-black text-purple-900 dark:text-white">
              {difficulty === 'easy' ? 'سهل (تطبيق مباشر)' : difficulty === 'medium' ? 'متوسط (مركب)' : 'متقدم وعالمي 🌍'}
            </span>
          </div>
        </div>
      </div>

      {/* Control filters panel */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-850 space-y-4">
        <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
          <BookOpenCheck className="w-4 h-4 text-sky-600" />
          تهيئة محرك توليد المسائل التفاعلي العشوائي
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Chapter Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">اختر الباب الرئيسي</label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="w-full text-xs font-black p-2.5 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {chaptersData.map((c) => (
                <option key={c.id} value={c.id}>{c.title.split('：')[0].split(':')[0]}</option>
              ))}
            </select>
          </div>

          {/* Lesson Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">اختر الفصل/الدرس</label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="w-full text-xs font-black p-2.5 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">كل دروس هذا الباب (عشوائي)</option>
              {chaptersData
                .find((c) => c.id === selectedChapterId)
                ?.lessons.map((l) => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
            </select>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 dark:text-zinc-500">مستوى الصعوبة المطلوب</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`py-1.5 text-[10px] font-black rounded-lg transition ${
                    difficulty === level
                      ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200'
                  }`}
                >
                  {level === 'easy' ? 'سهل' : level === 'medium' ? 'متوسط' : 'عالمي 🌍'}
                </button>
              ))}
            </div>
          </div>

          {/* Force New Problem */}
          <div className="flex items-end">
            <button
              onClick={generateProblem}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
              توليد مسألة برقم عشوائي جديد
            </button>
          </div>
        </div>
      </div>

      {/* Main problem display card */}
      {currentProblem && (
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
          {/* Header of problem */}
          <div className="p-5 bg-slate-50 dark:bg-zinc-850/60 border-b border-slate-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-2.5 py-1 rounded-lg font-bold">
                {currentProblem.chapterTitle.split(':')[0]}
              </span>
              <span className="text-[10px] bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300 px-2.5 py-1 rounded-lg font-bold">
                {currentProblem.lessonTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {currentProblem.isInternational && (
                <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 animate-pulse">
                  <Globe className="w-3 h-3" />
                  مسألة فيزيائية عالمية مرجعية
                </span>
              )}
              <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold ${
                currentProblem.difficulty === 'easy' 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                  : currentProblem.difficulty === 'medium' 
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20' 
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-950/20'
              }`}>
                الصعوبة: {currentProblem.difficulty === 'easy' ? 'سهل' : currentProblem.difficulty === 'medium' ? 'متوسط' : 'متقدم جداً'}
              </span>
            </div>
          </div>

          {/* Body content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* International Context Banner if exists */}
            {currentProblem.contextName && (
              <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-black">
                <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                <span>السياق العلمي: {currentProblem.contextName}</span>
              </div>
            )}

            {/* Problem Statement */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-bold">نص السؤال والمسألة المطروحة:</span>
              <p className="text-base md:text-lg font-bold text-slate-800 dark:text-white leading-relaxed font-sans">
                {currentProblem.questionText}
              </p>
            </div>

            {/* Law indicator */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                القانون الرياضي المستهدف:
              </span>
              <span className="font-mono font-black text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1 rounded">
                {currentProblem.formulaUsed}
              </span>
            </div>

            {/* Choice buttons */}
            <div className="space-y-3">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-bold">خيارات الحل المقترحة (الرجاء اختيار النتيجة الأدق):</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProblem.choices.map((choice, idx) => {
                  const isSelected = selectedChoice === idx;
                  const isThisCorrect = idx === currentProblem.correctChoiceIndex;
                  
                  let buttonStyle = 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-750';
                  
                  if (isAnswered) {
                    if (isThisCorrect) {
                      buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20';
                    } else if (isSelected) {
                      buttonStyle = 'bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20';
                    } else {
                      buttonStyle = 'bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-800 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    buttonStyle = 'bg-sky-50 dark:bg-sky-950/20 border-sky-500 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/20';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`p-4 rounded-2xl border text-right font-mono font-black text-sm flex items-center justify-between transition group active:scale-98 ${buttonStyle}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 flex items-center justify-center font-bold font-sans text-xs text-slate-500 dark:text-zinc-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{choice} {currentProblem.unit}</span>
                      </span>

                      {isAnswered && isThisCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                      {isAnswered && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Feedback & detailed solution explanation */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 border-t border-slate-100 dark:border-zinc-800 space-y-4"
              >
                {/* Status Callout */}
                <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
                  isCorrect 
                    ? 'bg-emerald-50/60 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300' 
                    : 'bg-rose-50/60 border-rose-100 dark:bg-rose-950/10 dark:border-rose-900/30 text-rose-800 dark:text-rose-300'
                }`}>
                  <div className="mt-0.5">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-sm">{isCorrect ? 'إجابة صحيحة! أحسنت صنعاً 🎯' : 'لم توفق في المحاولة! لا تقلق 📖'}</h4>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">
                      {isCorrect 
                        ? 'لقد قمت بتطبيق العلاقات الرياضية بنجاح وحساب القيمة الصحيحة بدقة متناهية.' 
                        : 'تم تسجيل هذا الدرس ضمن مسار التقوية والمراجعة لمساعدتك في التمكين والتدرب اللاحق.'}
                    </p>
                  </div>
                </div>

                {/* Step-by-step Solution */}
                <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-100 dark:border-zinc-800/80 space-y-3">
                  <h4 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1">
                    <Bookmark className="w-4 h-4 text-sky-600" />
                    خطوات الحل الإرشادية النموذجية (بالتفصيل):
                  </h4>
                  
                  <div className="text-xs text-slate-700 dark:text-zinc-300 whitespace-pre-line font-medium leading-relaxed font-sans">
                    {currentProblem.detailedSolution}
                  </div>
                </div>

                {/* Actions button */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={generateProblem}
                    className="px-6 py-2.5 bg-slate-850 hover:bg-slate-800 dark:bg-zinc-700 dark:hover:bg-zinc-650 text-white font-black text-xs rounded-xl shadow-sm hover:shadow-md transition active:scale-95 flex items-center gap-1"
                  >
                    حل مسألة عشوائية أخرى
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
