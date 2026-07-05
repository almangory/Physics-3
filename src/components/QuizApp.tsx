import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  BookOpen, 
  AlertCircle, 
  ChevronLeft, 
  Info,
  Sparkles,
  ArrowLeftRight,
  Trash2,
  Link,
  Check
} from 'lucide-react';
import { chaptersData, questionsData } from '../data/chapters';
import { Question } from '../types';

const MATCHING_POOLS = [
  {
    id: "pool-1",
    category: "مجال الجاذبية وحركة الكواكب 🪐",
    pairs: [
      { id: "p1", term: "قانون التثاقل الكوني لنيوتن", formula: "ق = ج × (ك₁ × ك₂) / ف²", explanation: "يحسب قوة التجاذب المادي المتبادلة بين أي جسمين في الكون." },
      { id: "p2", term: "القانون الثالث لكبلر (قانون الأزمنة)", formula: "نق³ / ز² = ثابت", explanation: "ينص على أن مكعب متوسط بعد الكوكب يتناسب مع مربع زمنه الدوري." },
      { id: "p3", term: "شدة مجال الجاذبية (عجلة السقوط الحر)", formula: "د = (ج × ك_أ) / ف²", explanation: "تسارع الأجسام الساقطة حراً في مجال كوكب كتلته ك_أ." },
      { id: "p4", term: "الجهد التثاقلي عند نقطة", formula: "جـ = - (ج × ك_أ) / ف", explanation: "طاقة الوضع لوحدة الكتل الموضوعة عند تلك النقطة في المجال." },
      { id: "p5", term: "سرعة الإفلات من الجاذبية الأرضية", formula: "ع = √(٢ × ج × ك / نق)", explanation: "السرعة الأدنى المطلوبة لينفلت المقذوف تماماً من قبضة كوكب ما." }
    ]
  },
  {
    id: "pool-2",
    category: "الضوء والحركة الموجية والأجهزة البصرية 🔬",
    pairs: [
      { id: "p6", term: "قانون الانكسار العام (قانون سنيل)", formula: "م = جيب س / جيب ص", explanation: "يربط بين زاوية السقوط وزاوية الانكسار في الأوساط الشفافة المختلفة." },
      { id: "p7", term: "تكبير التلسكوب الفلكي البسيط", formula: "ت = ع_ش / ع_ع", explanation: "النسبة بين البعد البؤري للعدسة الشيئية إلى البعد البؤري للعدسة العينية." },
      { id: "p8", term: "البعد البؤري للمرآة الكروية", formula: "ع = نق / ٢", explanation: "نصف قطر تكور المرآة مقسوماً على اثنين." },
      { id: "p9", term: "السرعة الزاوية لحركة دائرية", formula: "و = ٢ × ط × د", explanation: "المعدل الزمني لتغير الإزاحة الزاوية للجسم الدوار." },
      { id: "p10", term: "التردد الطبيعي للاهتزاز", formula: "ت = س / ل", explanation: "تردد الموجة يساوي سرعة انتشارها مقسومة على طولها الموجي." }
    ]
  },
  {
    id: "pool-3",
    category: "إلكترونيات الحالة الصلبة والفيزياء الحديثة ⚡",
    pairs: [
      { id: "p11", term: "كسب التيار في الترانزستور", formula: "أ = ت_م / ت_ب", explanation: "النسبة بين تيار المجمع الخارج وتيار الباعث في قاعدة مشتركة." },
      { id: "p12", term: "طاقة فوتون الأشعة السينية", formula: "ط = هـ × ت_د", explanation: "طاقة الكم الضوئي تتناسب طردياً مع تردده عبر ثابت بلانك." },
      { id: "p13", term: "أقصى تردد للأشعة السينية المستمرة", formula: "ت_د_أقصى = (ش_هـ × ج) / هـ", explanation: "يحسب أعلى تردد كهرومغناطيسي منبعث عند جهد كهرومغناطيسي ج." },
      { id: "p14", term: "معادلة أينشتاين لتكافؤ الكتلة والطاقة", formula: "ط = ك × س²", explanation: "الطاقة الناتجة عن تحول كتلة ذرية تساوي حاصل ضربها في مربع سرعة الضوء." },
      { id: "p15", term: "معامل تكبير الجهد في المضخم", formula: "ج_كسب = ج_خروج / ج_دخول", explanation: "كسب فرق الجهد الكهربائي بين دائرتي الخرج والدخل." }
    ]
  }
];

interface QuizAppProps {
  favoriteLessonIds: string[];
  setActivePage: (page: 'dashboard' | 'favorites' | 'chapters' | 'labs' | 'flashcards' | 'worksheets' | 'quiz') => void;
}

export default function QuizApp({ favoriteLessonIds, setActivePage }: QuizAppProps) {
  const [quizMode, setQuizMode] = useState<'standard' | 'matching'>('standard');
  const [selectedPoolIndex, setSelectedPoolIndex] = useState<number>(0);
  
  // Matching Game States
  const [matchingTerms, setMatchingTerms] = useState<Array<{ id: string; term: string }>>([]);
  const [matchingFormulas, setMatchingFormulas] = useState<Array<{ id: string; formula: string; explanation: string }>>([]);
  const [matchedPairs, setMatchedPairs] = useState<{ [termId: string]: string }>({}); // termId -> formulaId
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);
  const [matchingChecked, setMatchingChecked] = useState<boolean>(false);
  const [matchingScore, setMatchingScore] = useState<number>(0);
  const [draggedTermId, setDraggedTermId] = useState<string | null>(null);

  const [selectedSource, setSelectedSource] = useState<'all' | 'chapter' | 'lesson' | 'favorites'>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');

  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({});
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);

  // Available lessons list based on chosen chapter
  const availableLessons = chaptersData.find((ch) => ch.id === selectedChapterId)?.lessons || [];

  const handleStartQuiz = () => {
    let filtered: Question[] = [];

    if (selectedSource === 'all') {
      filtered = [...questionsData];
    } else if (selectedSource === 'chapter') {
      filtered = questionsData.filter((q) => q.chapterId === selectedChapterId);
    } else if (selectedSource === 'lesson') {
      filtered = questionsData.filter((q) => q.lessonId === selectedLessonId);
    } else if (selectedSource === 'favorites') {
      filtered = questionsData.filter((q) => favoriteLessonIds.includes(q.lessonId));
    }

    if (filtered.length === 0) {
      setErrorMessage('عذراً، لا توجد أسئلة متوفرة في قسم المفضلات حالياً. يرجى تصفح المنهج وتفضيل بعض الدروس أولاً!');
      return;
    }

    setErrorMessage(null);
    // Shuffle questions randomly
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setActiveQuestions(shuffled.slice(0, 10)); // Limit to 10 questions per quiz
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    const currentQuestion = activeQuestions[currentQuestionIndex];
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    setIsAnswered(true);

    const isCorrect = answer.trim() === currentQuestion.correctAnswer.trim();
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Save and update weakness statistics in localStorage
    try {
      const savedTracker = localStorage.getItem('physics_weakness_tracker');
      const tracker = savedTracker ? JSON.parse(savedTracker) : {};
      
      const lessonId = currentQuestion.lessonId;
      if (!tracker[lessonId]) {
        let foundTitle = "درس فيزياء";
        const chapter = chaptersData.find(c => c.id === currentQuestion.chapterId);
        if (chapter) {
          const lesson = chapter.lessons.find(l => l.id === lessonId);
          if (lesson) foundTitle = lesson.title;
        }

        tracker[lessonId] = {
          lessonId,
          lessonTitle: foundTitle,
          chapterId: currentQuestion.chapterId,
          wrongCount: 0,
          correctCount: 0,
          totalCount: 0
        };
      }

      tracker[lessonId].totalCount += 1;
      if (isCorrect) {
        tracker[lessonId].correctCount += 1;
      } else {
        tracker[lessonId].wrongCount += 1;
      }

      // If the student answers everything perfectly after subsequent tries, we can keep the record but show 100% success.
      // If we want to filter out lessons that are fully mastered (successRate === 100%), we can optionally do that on display.
      localStorage.setItem('physics_weakness_tracker', JSON.stringify(tracker));
      
      // Dispatch event to update App.tsx immediately
      window.dispatchEvent(new Event('physics_weakness_updated'));
    } catch (e) {
      console.error('Error updating weakness tracker', e);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setActiveQuestions([]);
    setErrorMessage(null);
    setShowAnalysis(false);
    setMatchedPairs({});
    setSelectedTermId(null);
    setSelectedFormulaId(null);
    setMatchingChecked(false);
    setMatchingScore(0);
  };

  const handleStartMatching = () => {
    const pool = MATCHING_POOLS[selectedPoolIndex];
    // Create random order for terms and formulas independently
    const terms = pool.pairs.map(p => ({ id: p.id, term: p.term })).sort(() => 0.5 - Math.random());
    const formulas = pool.pairs.map(p => ({ id: p.id, formula: p.formula, explanation: p.explanation })).sort(() => 0.5 - Math.random());
    
    setMatchingTerms(terms);
    setMatchingFormulas(formulas);
    setMatchedPairs({});
    setSelectedTermId(null);
    setSelectedFormulaId(null);
    setMatchingChecked(false);
    setMatchingScore(0);
    setQuizStarted(true);
    setQuizFinished(false);
  };

  const handleTermClick = (termId: string) => {
    if (matchingChecked) return;
    
    if (selectedTermId === termId) {
      setSelectedTermId(null);
      return;
    }
    
    setSelectedTermId(termId);
    
    if (selectedFormulaId) {
      pairItems(termId, selectedFormulaId);
    }
  };

  const handleFormulaClick = (formulaId: string) => {
    if (matchingChecked) return;
    
    if (selectedFormulaId === formulaId) {
      setSelectedFormulaId(null);
      return;
    }
    
    setSelectedFormulaId(formulaId);
    
    if (selectedTermId) {
      pairItems(selectedTermId, formulaId);
    }
  };

  const pairItems = (termId: string, formulaId: string) => {
    const newPairs = { ...matchedPairs };
    
    // Clear other terms that might have had this formula
    Object.keys(newPairs).forEach(tId => {
      if (newPairs[tId] === formulaId) {
        delete newPairs[tId];
      }
    });
    
    newPairs[termId] = formulaId;
    
    setMatchedPairs(newPairs);
    setSelectedTermId(null);
    setSelectedFormulaId(null);
  };

  const handleUnpair = (termId: string) => {
    if (matchingChecked) return;
    const newPairs = { ...matchedPairs };
    delete newPairs[termId];
    setMatchedPairs(newPairs);
  };

  const checkMatchingAnswers = () => {
    const pool = MATCHING_POOLS[selectedPoolIndex];
    let correctCount = 0;
    
    pool.pairs.forEach(pair => {
      if (matchedPairs[pair.id] === pair.id) {
        correctCount += 1;
      }
    });
    
    setMatchingScore(correctCount);
    setMatchingChecked(true);
  };

  // Get wrong questions in the current quiz specifically
  const wrongQuestions = activeQuestions.filter(q => {
    const ans = userAnswers[q.id];
    return ans !== undefined && ans.trim() !== q.correctAnswer.trim();
  });

  // Unique lessons of wrong questions
  const wrongLessonsMap = new Map<string, { lessonTitle: string; chapterTitle: string; wrongQuestionsList: Question[] }>();
  wrongQuestions.forEach(q => {
    let lessonTitle = "درس فيزياء";
    let chapterTitle = "باب دراسي";
    
    const chapter = chaptersData.find(c => c.id === q.chapterId);
    if (chapter) {
      chapterTitle = chapter.title;
      const lesson = chapter.lessons.find(l => l.id === q.lessonId);
      if (lesson) {
        lessonTitle = lesson.title;
      }
    }
    
    if (!wrongLessonsMap.has(q.lessonId)) {
      wrongLessonsMap.set(q.lessonId, {
        lessonTitle,
        chapterTitle,
        wrongQuestionsList: []
      });
    }
    wrongLessonsMap.get(q.lessonId)!.wrongQuestionsList.push(q);
  });

  const uniqueWrongLessons = Array.from(wrongLessonsMap.entries()).map(([lessonId, data]) => ({
    lessonId,
    ...data
  }));

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!quizStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-black text-slate-800">الاختبارات التفاعلية والتقييم الفوري</h2>
              <p className="text-sm text-slate-500">
                اختر نوع ومجال اختبارك لتحدي معرفتك بالفيزياء، والحصول على تقييم فوري مصحح تلقائياً بالكامل في ثوانٍ.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-sm font-bold">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 border-b border-slate-200 pb-4">
                <button
                  onClick={() => { setQuizMode('standard'); setErrorMessage(null); }}
                  className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                    quizMode === 'standard' 
                      ? 'bg-sky-600 text-white shadow-sm' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100/50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  الأسئلة والمسائل والتقييم
                </button>
                <button
                  onClick={() => { setQuizMode('matching'); setErrorMessage(null); }}
                  className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                    quizMode === 'matching' 
                      ? 'bg-amber-600 text-white shadow-sm' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  لعبة وصل المصطلحات بالقوانين 📐
                </button>
              </div>

              {quizMode === 'standard' ? (
                <>
                  <h3 className="text-lg font-black text-slate-800">تخصيص أسئلة الاختبار:</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                      onClick={() => {
                        setSelectedSource('all');
                        setErrorMessage(null);
                      }}
                      className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between transition h-32 ${
                        selectedSource === 'all'
                          ? 'border-[#0c4a6e] bg-sky-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="font-black text-sm text-slate-800">المنهج كاملاً</span>
                      <span className="text-xs text-slate-400 font-medium">اختبار عشوائي شامل لجميع فصول المنهج</span>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedSource('chapter');
                        setErrorMessage(null);
                        if (!selectedChapterId) setSelectedChapterId('chap-1');
                      }}
                      className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between transition h-32 ${
                        selectedSource === 'chapter'
                          ? 'border-[#0c4a6e] bg-sky-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="font-black text-sm text-slate-800">تحديد باب معين</span>
                      <span className="text-xs text-slate-400 font-medium">اختبار يركز على وحدة معينة تختارها</span>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedSource('lesson');
                        setErrorMessage(null);
                        if (!selectedChapterId) setSelectedChapterId('chap-1');
                        if (!selectedLessonId) setSelectedLessonId('les-1-1');
                      }}
                      className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between transition h-32 ${
                        selectedSource === 'lesson'
                          ? 'border-[#0c4a6e] bg-sky-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-100/50'
                      }`}
                    >
                      <span className="font-black text-sm text-slate-800">تحديد درس محدد</span>
                      <span className="text-xs text-slate-400 font-medium">اختبار مخصص لدرس واحد بعينه للفهم الدقيق</span>
                    </div>

                    <div
                      onClick={() => {
                        if (favoriteLessonIds.length === 0) {
                          setErrorMessage('لم تقم بتفضيل أي دروس حتى الآن! يرجى الانتقال إلى قسم الدروس وتفضيلها أولاً.');
                          return;
                        }
                        setSelectedSource('favorites');
                        setErrorMessage(null);
                      }}
                      className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between transition h-32 ${
                        selectedSource === 'favorites'
                          ? 'border-[#0c4a6e] bg-sky-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-100/50'
                      } ${favoriteLessonIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span className="font-black text-sm text-slate-800">الدروس المفضلة</span>
                      <span className="text-xs text-slate-400 font-medium">اختبار مخصص للدروس التي أضفتها للمفضلة ({favoriteLessonIds.length})</span>
                    </div>
                  </div>

                  {/* Conditional dropdowns based on selections */}
                  {selectedSource === 'chapter' && (
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500">اختر الباب المطلوب:</label>
                      <select
                        value={selectedChapterId}
                        onChange={(e) => setSelectedChapterId(e.target.value)}
                        className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e] font-bold text-slate-700"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
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
                          className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e] font-bold text-slate-700"
                        >
                          {chaptersData.map((ch) => (
                            <option key={ch.id} value={ch.id}>
                              {ch.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-500">اختر الدرس المطلوب:</label>
                        <select
                          value={selectedLessonId}
                          onChange={(e) => setSelectedLessonId(e.target.value)}
                          className="w-full p-3.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e] font-bold text-slate-700"
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

                  <button
                    onClick={handleStartQuiz}
                    className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-xl transition shadow-sm flex items-center justify-center gap-2 text-sm"
                  >
                    <BookOpen className="w-5 h-5" /> ابدأ الاختبار الآن
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-black text-slate-800">اختر موضوع لعبة التوصيل:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MATCHING_POOLS.map((pool, idx) => (
                      <div
                        key={pool.id}
                        onClick={() => setSelectedPoolIndex(idx)}
                        className={`p-5 rounded-2xl border cursor-pointer flex flex-col justify-between transition min-h-[120px] ${
                          selectedPoolIndex === idx
                            ? 'border-amber-600 bg-amber-50/40 shadow-sm'
                            : 'border-slate-200 bg-white hover:bg-slate-100/50'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-black text-sm text-slate-800 block">{pool.category}</span>
                          <span className="text-[11px] text-slate-400 font-bold block">{pool.pairs.length} مصطلحات وقوانين</span>
                        </div>
                        <span className="text-[10px] text-amber-700 font-bold mt-2">انقر للاختيار</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl text-xs text-amber-800 font-bold space-y-1 leading-relaxed">
                    <p className="font-black">💡 ميكانيكية اللعبة التفاعلية:</p>
                    <p>قم بسحب المصطلح وإلقائه فوق القانون الرياضي المطابق له، أو بكل بساطة انقر على المصطلح (سيتوهج باللون الأزرق) ثم انقر على القانون المناسب لتوصيلهما معاً فوراً!</p>
                  </div>

                  <button
                    onClick={handleStartMatching}
                    className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl transition shadow-sm flex items-center justify-center gap-2 text-sm"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300 animate-bounce" /> ابدأ لعبة التوصيل الآن
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ) : quizFinished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${showAnalysis ? 'max-w-2xl' : 'max-w-md'} mx-auto text-center space-y-6 py-8 transition-all duration-300`}
          >
            <div className="p-4 bg-sky-50 text-sky-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-800">تهانينا! أكملت الاختبار</h2>
              <p className="text-sm text-slate-500 mt-2">إليك النتيجة النهائية لتقييم مستواك في مادة الفيزياء:</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-sm">
              <span className="text-6xl font-black text-sky-600 font-mono">{score}</span>
              <span className="text-xl text-slate-400 font-bold"> / {activeQuestions.length}</span>
              <p className="text-xs text-slate-500 mt-3 font-medium">
                النسبة المئوية للحل الصحيح: <span className="font-bold text-slate-800 font-mono">{Math.round((score / activeQuestions.length) * 100)}%</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRestart}
                className="flex-1 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-xl transition shadow-sm text-sm"
              >
                اختبار جديد
              </button>
              
              {uniqueWrongLessons.length > 0 && (
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className={`flex-1 py-3.5 font-black rounded-xl transition shadow-sm text-sm flex items-center justify-center gap-2 ${
                    showAnalysis 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-350'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  {showAnalysis ? 'إخفاء تحليل الأخطاء' : 'تحليل الأخطاء'}
                </button>
              )}
            </div>

            {showAnalysis && uniqueWrongLessons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50/50 border border-amber-200 rounded-3xl p-6 text-right space-y-4 mt-6"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-black text-slate-800">تحليل الأخطاء والضعف الأكاديمي:</h3>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  بناءً على إجاباتك في هذا الاختبار، قمنا بتحديد الدروس التي تحتاج لتركيز إضافي. إليك التفاصيل والاقتراحات المباشرة للمراجعة السريعة:
                </p>

                <div className="space-y-4 pt-2">
                  {uniqueWrongLessons.map(({ lessonId, lessonTitle, chapterTitle, wrongQuestionsList }) => (
                    <div key={lessonId} className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md font-bold">
                            {chapterTitle.split(':')[0] || chapterTitle}
                          </span>
                          <h4 className="text-sm font-black text-slate-800 mt-1">{lessonTitle}</h4>
                        </div>
                        <button
                          onClick={() => {
                            localStorage.setItem('highlight_lesson_id', lessonId);
                            setActivePage('chapters');
                          }}
                          className="text-xs text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1 hover:underline self-end sm:self-auto"
                        >
                          مراجعة الدرس الآن ←
                        </button>
                      </div>

                      {/* Diagnostic summary / suggestion */}
                      <div className="p-3 bg-amber-50/40 rounded-xl border border-dashed border-amber-250 text-xs text-slate-600 space-y-1">
                        <div className="font-bold text-amber-800 flex items-center gap-1">
                          <Info className="w-3.5 h-3.5" /> نصيحة ذكية للمذاكرة:
                        </div>
                        <p className="font-medium leading-relaxed">
                          أخطأت في {wrongQuestionsList.length} {wrongQuestionsList.length === 1 ? 'سؤال' : 'أسئلة'} يتعلق بهذا الدرس. نقترح عليك فتح المنهج ومطالعة القوانين الرياضية المرتبطة به وحل المحاكاة التفاعلية لترسيخ الفهم.
                        </p>
                      </div>

                      {/* Display the questions they got wrong */}
                      <div className="space-y-2.5 pt-1">
                        <span className="text-[10px] text-slate-400 font-black block">الأسئلة التي لم توفق في إجابتها:</span>
                        {wrongQuestionsList.map((q, idx) => (
                          <div key={`${q.id}-${idx}`} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
                            <div className="font-bold text-slate-700 leading-relaxed">
                              {idx + 1}. {q.questionText}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              <div className="flex items-center gap-1.5 text-red-600 font-bold bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100">
                                <XCircle className="w-4 h-4" />
                                <span>إجابتك: {userAnswers[q.id] || 'لم تجب'}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>الإجابة الصحيحة: {q.correctAnswer}</span>
                              </div>
                            </div>
                            {q.explanation && (
                              <p className="text-[11px] text-slate-500 border-r-2 border-slate-300 pr-2 italic font-medium leading-relaxed mt-1">
                                {q.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : quizMode === 'matching' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Top Navigation & Title */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-black text-amber-700 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                  {MATCHING_POOLS[selectedPoolIndex].category}
                </span>
                <h3 className="text-xl font-black text-slate-800 mt-2">لعبة وصل المصطلحات بالقوانين</h3>
              </div>
              <button
                onClick={handleRestart}
                className="text-xs font-black text-slate-500 hover:text-slate-700 flex items-center gap-1 bg-slate-100 px-3 py-2 rounded-xl border"
              >
                <RotateCcw className="w-4 h-4" /> العودة للتخصيص
              </button>
            </div>

            {/* If Checked, Show score summary */}
            {matchingChecked && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 bg-gradient-to-r from-amber-550 to-amber-650 bg-amber-600 text-white rounded-3xl shadow-md text-center space-y-3"
              >
                <Award className="w-12 h-12 mx-auto animate-bounce text-amber-200" />
                <h4 className="text-2xl font-black">نتيجتك: {matchingScore} من {MATCHING_POOLS[selectedPoolIndex].pairs.length}</h4>
                <p className="text-sm font-bold text-amber-100">
                  {matchingScore === MATCHING_POOLS[selectedPoolIndex].pairs.length 
                    ? "عبقري فيزياء متميز! 🌟 قمت بحل جميع التوصيلات بنجاح تام."
                    : "عمل رائع! تصفح تفاصيل الإجابات الصحيحة والتوضيح العلمي بالأسفل لتقوية مهاراتك."}
                </p>
                <button
                  onClick={handleRestart}
                  className="mt-2 px-5 py-2 bg-white text-amber-700 font-black rounded-xl text-xs hover:bg-slate-100 transition shadow"
                >
                  العب مجدداً بموضوع آخر
                </button>
              </motion.div>
            )}

            {/* The Match board columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              
              {/* Column A: Terms */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-black text-slate-400">العمود (أ): المصطلح الفيزيائي</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">انقر للتحديد</span>
                </div>
                
                <div className="space-y-3">
                  {matchingTerms.map((t) => {
                    const matchedFormulaId = matchedPairs[t.id];
                    const isSelected = selectedTermId === t.id;
                    const originalPairIdx = MATCHING_POOLS[selectedPoolIndex].pairs.findIndex(p => p.id === t.id);
                    
                    const MATCHING_BADGES = [
                      { label: 'أ', bg: 'bg-blue-100 text-blue-800 border-blue-200' },
                      { label: 'ب', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
                      { label: 'ج', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                      { label: 'د', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
                      { label: 'هـ', bg: 'bg-rose-100 text-rose-800 border-rose-200' },
                    ];
                    const badge = originalPairIdx !== -1 ? MATCHING_BADGES[originalPairIdx] : null;

                    // Styling based on state
                    let borderClass = "border-slate-200 bg-white hover:border-sky-300";
                    if (isSelected) {
                      borderClass = "border-sky-500 ring-2 ring-sky-100 bg-sky-50/40";
                    } else if (matchedFormulaId) {
                      borderClass = "border-slate-300 bg-slate-50/50";
                    }

                    if (matchingChecked) {
                      const isCorrect = matchedFormulaId === t.id;
                      borderClass = isCorrect 
                        ? "border-emerald-500 bg-emerald-50/40" 
                        : "border-red-500 bg-red-50/40";
                    }

                    return (
                      <div
                        key={t.id}
                        draggable={!matchingChecked}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", t.id);
                          setDraggedTermId(t.id);
                        }}
                        onDragEnd={() => setDraggedTermId(null)}
                        onClick={() => handleTermClick(t.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group shadow-sm ${borderClass}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-sky-50 transition">
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs md:text-sm font-black text-slate-800 leading-relaxed">{t.term}</span>
                        </div>

                        {/* Connection indicators */}
                        <div className="flex items-center gap-2">
                          {matchedFormulaId && badge && (
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-black ${badge.bg}`}>
                              الرمز: {badge.label}
                            </span>
                          )}

                          {matchingChecked && (
                            matchedFormulaId === t.id 
                              ? <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          )}

                          {matchedFormulaId && !matchingChecked && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUnpair(t.id);
                              }}
                              className="p-1 text-slate-300 hover:text-red-500 rounded transition"
                              title="إلغاء التوصيل"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column B: Formulas */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-black text-slate-400">العمود (ب): القانون الرياضي</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">اسحب هنا</span>
                </div>

                <div className="space-y-3">
                  {matchingFormulas.map((f) => {
                    // Find if any term matches this formula
                    const matchingTermId = Object.keys(matchedPairs).find(tId => matchedPairs[tId] === f.id);
                    const isSelected = selectedFormulaId === f.id;
                    const originalPairIdx = MATCHING_POOLS[selectedPoolIndex].pairs.findIndex(p => p.id === matchingTermId);
                    
                    const MATCHING_BADGES = [
                      { label: 'أ', bg: 'bg-blue-100 text-blue-800 border-blue-200' },
                      { label: 'ب', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
                      { label: 'ج', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                      { label: 'د', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
                      { label: 'هـ', bg: 'bg-rose-100 text-rose-800 border-rose-200' },
                    ];
                    const badge = originalPairIdx !== -1 ? MATCHING_BADGES[originalPairIdx] : null;

                    let borderClass = "border-slate-200 bg-white hover:border-amber-300";
                    if (isSelected) {
                      borderClass = "border-amber-500 ring-2 ring-amber-100 bg-amber-50/40";
                    } else if (matchingTermId) {
                      borderClass = "border-slate-300 bg-slate-50/50";
                    }

                    if (matchingChecked) {
                      const isCorrect = matchingTermId === f.id;
                      borderClass = isCorrect 
                        ? "border-emerald-500 bg-emerald-50/40" 
                        : "border-red-500 bg-red-50/40";
                    }

                    return (
                      <div
                        key={f.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const termId = e.dataTransfer.getData("text/plain") || draggedTermId;
                          if (termId) {
                            pairItems(termId, f.id);
                          }
                        }}
                        onClick={() => handleFormulaClick(f.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group shadow-sm ${borderClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border group-hover:bg-amber-50 group-hover:text-amber-900 transition" dir="ltr">
                            {f.formula}
                          </span>
                        </div>

                        {/* Connection indicators */}
                        <div className="flex items-center gap-2">
                          {matchingTermId && badge && (
                            <span className={`text-xs px-2.5 py-1 rounded-full border font-black ${badge.bg}`}>
                              موصول بـ: {badge.label}
                            </span>
                          )}
                          
                          {matchingChecked && (
                            matchingTermId === f.id
                              ? <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Connections summary list */}
            {!matchingChecked && Object.keys(matchedPairs).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm text-right font-semibold"
              >
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 pb-2 border-b">
                  <Link className="w-4 h-4 text-sky-600" />
                  <span>توصيلاتك النشطة حالياً:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                  {Object.entries(matchedPairs).map(([tId, fId]) => {
                    const termObj = matchingTerms.find(t => t.id === tId);
                    const formulaObj = matchingFormulas.find(f => f.id === fId);
                    const origIdx = MATCHING_POOLS[selectedPoolIndex].pairs.findIndex(p => p.id === tId);
                    
                    const MATCHING_BADGES = [
                      { label: 'أ', bg: 'bg-blue-100 text-blue-800 border-blue-200' },
                      { label: 'ب', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
                      { label: 'ج', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                      { label: 'د', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
                      { label: 'هـ', bg: 'bg-rose-100 text-rose-800 border-rose-200' },
                    ];
                    const badge = origIdx !== -1 ? MATCHING_BADGES[origIdx] : null;

                    if (!termObj || !formulaObj) return null;

                    return (
                      <div key={tId} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 overflow-hidden truncate">
                          {badge && <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black shrink-0 ${badge.bg}`}>{badge.label}</span>}
                          <span className="truncate max-w-[120px]">{termObj.term}</span>
                          <span className="text-slate-400 font-normal">←</span>
                          <span className="font-mono" dir="ltr">{formulaObj.formula}</span>
                        </div>
                        <button
                          onClick={() => handleUnpair(tId)}
                          className="text-red-400 hover:text-red-600 transition p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Check answers and Action button */}
            {!matchingChecked ? (
              <button
                disabled={Object.keys(matchedPairs).length < MATCHING_POOLS[selectedPoolIndex].pairs.length}
                onClick={checkMatchingAnswers}
                className={`w-full py-4 font-black rounded-xl transition shadow flex items-center justify-center gap-2 text-sm ${
                  Object.keys(matchedPairs).length === MATCHING_POOLS[selectedPoolIndex].pairs.length
                    ? "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Check className="w-5 h-5" />
                {Object.keys(matchedPairs).length < MATCHING_POOLS[selectedPoolIndex].pairs.length 
                  ? `قم بتوصيل جميع العناصر للمتابعة (${Object.keys(matchedPairs).length} من أصل ${MATCHING_POOLS[selectedPoolIndex].pairs.length})`
                  : "تحقق من صحة التوصيلات وتقييم الحل"
                }
              </button>
            ) : (
              <div className="space-y-4 pt-4 text-right">
                <div className="p-5 bg-sky-50 border border-sky-100 rounded-2xl space-y-3 shadow-inner">
                  <div className="flex items-center gap-1.5 text-xs font-black text-sky-800 pb-1.5 border-b border-sky-100">
                    <Info className="w-4 h-4 text-sky-600" />
                    <span>التقرير الأكاديمي والتحليل العلمي للقوانين والمفاهيم:</span>
                  </div>
                  <div className="space-y-4 pt-1">
                    {MATCHING_POOLS[selectedPoolIndex].pairs.map((pair, idx) => {
                      const userMatchedFormulaId = matchedPairs[pair.id];
                      const isCorrect = userMatchedFormulaId === pair.id;
                      
                      const MATCHING_BADGES = [
                        { label: 'أ', bg: 'bg-blue-100 text-blue-800 border-blue-200' },
                        { label: 'ب', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
                        { label: 'ج', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
                        { label: 'د', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
                        { label: 'هـ', bg: 'bg-rose-100 text-rose-800 border-rose-200' },
                      ];
                      const badge = MATCHING_BADGES[idx];

                      return (
                        <div key={pair.id} className="p-3.5 bg-white border border-slate-100 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1.5">
                              {badge && <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black ${badge.bg}`}>{badge.label}</span>}
                              <strong className="text-slate-800">{pair.term}</strong>
                            </div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                            }`}>
                              {isCorrect ? "توصيل صحيح" : "توصيل غير موفق"}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-1 border-y border-dashed border-slate-100 my-1 font-semibold text-slate-600">
                            <div dir="ltr" className="text-left font-mono bg-slate-50 p-2 rounded-lg text-[11px]">
                              صيغتك المقترحة: {userMatchedFormulaId 
                                ? MATCHING_POOLS[selectedPoolIndex].pairs.find(p => p.id === userMatchedFormulaId)?.formula 
                                : 'لم تقم بالتوصيل'}
                            </div>
                            <div dir="ltr" className="text-left font-mono bg-emerald-50 text-emerald-900 p-2 rounded-lg text-[11px]">
                              القانون الصحيح: {pair.formula}
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500 italic leading-relaxed font-medium">
                            💡 شرح مبسط: {pair.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleRestart}
                    className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl transition text-sm flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> العودة للقائمة الرئيسية
                  </button>
                  <button
                    onClick={handleStartMatching}
                    className="flex-1 py-4 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl transition text-sm flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> العب مجدداً
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            {/* Header info */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-400">سؤال {currentQuestionIndex + 1} من {activeQuestions.length}</span>
              <span className="text-xs font-black text-sky-700 px-3 py-1 bg-sky-50 rounded-full">النقاط: {score}</span>
            </div>

            {/* Question Text */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex gap-3 items-start">
                <HelpCircle className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" />
                <h3 className="text-lg font-black text-slate-800 leading-relaxed">
                  {activeQuestions[currentQuestionIndex].questionText}
                </h3>
              </div>

              {/* Render inputs based on type */}
              {activeQuestions[currentQuestionIndex].type === 'choice' && activeQuestions[currentQuestionIndex].options && (
                <div className="grid grid-cols-1 gap-3 pt-4">
                  {activeQuestions[currentQuestionIndex].options?.map((opt, idx) => {
                    const isSelected = userAnswers[activeQuestions[currentQuestionIndex].id] === opt;
                    const isCorrect = opt === activeQuestions[currentQuestionIndex].correctAnswer;

                    let btnClass = 'border-slate-200 hover:bg-slate-50 bg-white text-slate-700';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                      } else if (isSelected) {
                        btnClass = 'border-red-500 bg-red-50 text-red-800';
                      } else {
                        btnClass = 'opacity-50 border-slate-100';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(opt)}
                        disabled={isAnswered}
                        className={`p-4 rounded-xl border text-right text-sm font-bold transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Boolean Quiz Option */}
              {activeQuestions[currentQuestionIndex].type === 'boolean' && (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {['صح', 'خطأ'].map((opt, idx) => {
                    const isSelected = userAnswers[activeQuestions[currentQuestionIndex].id] === opt;
                    const isCorrect = opt === activeQuestions[currentQuestionIndex].correctAnswer;

                    let btnClass = 'border-slate-200 hover:bg-slate-50 bg-white text-slate-700';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                      } else if (isSelected) {
                        btnClass = 'border-red-500 bg-red-50 text-red-800';
                      } else {
                        btnClass = 'opacity-50 border-slate-100';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(opt)}
                        disabled={isAnswered}
                        className={`p-4 rounded-xl border text-center font-black text-sm transition-all ${btnClass}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Text / Filling Quiz Option */}
              {activeQuestions[currentQuestionIndex].type === 'fill' && (
                <div className="pt-4 space-y-3">
                  <input
                    type="text"
                    placeholder="اكتب الإجابة الصحيحة باللغة العربية..."
                    disabled={isAnswered}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAnswerSelect((e.target as HTMLInputElement).value.trim());
                      }
                    }}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-600 text-slate-800 font-bold"
                  />
                  <div className="text-[11px] text-slate-400 font-bold">انقر Enter للتأكيد وإرسال إجابتك</div>
                </div>
              )}

              {/* Show explanation if answered */}
              {isAnswered && (
                <div className="p-5 bg-sky-50/50 rounded-2xl border border-sky-100 mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black text-sky-800">
                    <AlertCircle className="w-4 h-4 text-sky-600" /> التوضيح العلمي وحل المسألة:
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    إجابة السؤال الصحيحة هي: <strong className="text-emerald-600 font-black">{activeQuestions[currentQuestionIndex].correctAnswer}</strong>. {activeQuestions[currentQuestionIndex].explanation || ''}
                  </p>
                </div>
              )}
            </div>

            {/* Next question or finish button */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-xl transition shadow flex items-center justify-center gap-2 text-sm"
              >
                <span>{currentQuestionIndex < activeQuestions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة النهائية'}</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
