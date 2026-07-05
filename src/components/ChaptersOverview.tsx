import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Star, ChevronDown, ChevronUp, Search, Info, HelpCircle, Eye, Type, Maximize2, Minimize2 } from 'lucide-react';
import { chaptersData } from '../data/chapters';
import { Lesson } from '../types';
import { getSvgForFigure } from './LessonFigures';

interface ChaptersOverviewProps {
  favoriteLessonIds: string[];
  onToggleFavoriteLesson: (lessonId: string) => void;
}

// Dynamically replace static physical figure descriptions with highly detailed vector laboratory diagrams
function getEnrichedContent(content: string): string {
  const regex = /<div class="(?:bg-slate-50|bg-sky-50\/50)[^"]*">((?:(?!<div).)*?)<strong>الشكل \((.*?)\):<\/strong>((?:(?!<\/div>).)*?)<\/div>/gs;
  
  return content.replace(regex, (match, prefix, figId, suffix) => {
    const trimmedId = figId.trim();
    const svgCode = getSvgForFigure(trimmedId);
    
    if (!svgCode) {
      return match;
    }

    const cleanPrefix = prefix.replace(/<p>|<span.*?>|<\/p>|<\/span>/g, '').trim();
    const cleanSuffix = suffix.replace(/<p>|<span.*?>|<\/p>|<\/span>/g, '').trim();
    
    return `
      <div class="my-6 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-950 p-6 flex flex-col items-center gap-4 text-center shadow-lg transition-all hover:border-sky-500/30">
        <div class="w-full flex justify-center items-center">
          ${svgCode}
        </div>
        <div class="text-xs font-bold text-slate-400 leading-relaxed mt-2 border-t border-slate-900 pt-3 w-full">
          ${cleanPrefix ? `<div class="mb-1.5 text-slate-500">${cleanPrefix}</div>` : ''}
          <strong class="text-sky-400">الشكل (${trimmedId}):</strong> ${cleanSuffix}
        </div>
      </div>
    `;
  });
}

export default function ChaptersOverview({ favoriteLessonIds, onToggleFavoriteLesson }: ChaptersOverviewProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('chap-1');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(chaptersData[0].lessons[0]);

  // Comfort Reading Mode States - Warm ('sepia') is now the absolute default
  const [readingTheme, setReadingTheme] = useState<'default' | 'sepia' | 'dark'>(() => {
    const saved = localStorage.getItem('readingTheme');
    return (saved === 'default' || saved === 'sepia' || saved === 'dark') ? saved : 'sepia';
  });
  const [readingFontSize, setReadingFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>(() => {
    const saved = localStorage.getItem('readingFontSize');
    return (saved === 'sm' || saved === 'base' || saved === 'lg' || saved === 'xl') ? saved : 'base';
  });
  const [readingLineHeight, setReadingLineHeight] = useState<'normal' | 'relaxed' | 'loose'>('relaxed');
  const [focusMode, setFocusMode] = useState<boolean>(() => {
    return localStorage.getItem('physics_focus_mode') === 'true';
  });

  // Weakness tracker state
  const [weaknessTracker, setWeaknessTracker] = useState<{ [key: string]: any }>({});

  // Persist reading mode selection
  useEffect(() => {
    localStorage.setItem('readingTheme', readingTheme);
  }, [readingTheme]);

  // Persist font size selection
  useEffect(() => {
    localStorage.setItem('readingFontSize', readingFontSize);
  }, [readingFontSize]);

  // Toggle Focus Mode and apply comfortable eye configurations
  const handleToggleFocusMode = () => {
    const nextFocusMode = !focusMode;
    setFocusMode(nextFocusMode);
    localStorage.setItem('physics_focus_mode', String(nextFocusMode));
    
    if (nextFocusMode) {
      // Force comfortable sepia background theme
      setReadingTheme('sepia');
      // Enlarge the font size to 'lg' or 'xl' for better focus
      setReadingFontSize('lg');
    }
    
    // Dispatch window event so App.tsx is notified to hide global sidebars & headers
    window.dispatchEvent(new Event('physics_focus_mode_updated'));
  };

  // Load weakness tracker and check for highlighted lesson
  useEffect(() => {
    const loadWeakness = () => {
      const saved = localStorage.getItem('physics_weakness_tracker');
      if (saved) {
        try {
          setWeaknessTracker(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadWeakness();

    const handleFocusSync = () => {
      setFocusMode(localStorage.getItem('physics_focus_mode') === 'true');
    };
    window.addEventListener('physics_focus_mode_updated', handleFocusSync);

    // Check if we came from dashboard wanting to view a specific weak lesson
    const highlightId = localStorage.getItem('highlight_lesson_id');
    if (highlightId) {
      const chapter = chaptersData.find((c) => c.lessons.some((l) => l.id === highlightId));
      if (chapter) {
        const lesson = chapter.lessons.find((l) => l.id === highlightId);
        if (lesson) {
          setSelectedLesson(lesson);
          setExpandedChapterId(chapter.id);
        }
      }
      localStorage.removeItem('highlight_lesson_id');
    }

    return () => {
      window.removeEventListener('physics_focus_mode_updated', handleFocusSync);
    };
  }, []);


  // Search & Filter lessons
  const filteredChapters = chaptersData.map((chap) => {
    const matchedLessons = chap.lessons.filter(
      (les) =>
        les.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        les.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...chap, lessons: matchedLessons };
  }).filter((chap) => chap.lessons.length > 0);

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800">منهج الفيزياء المقرّر والتفصيلي</h2>
        <p className="text-sm text-slate-500">
          تصفح فصول المنهج الأربعة بالتفصيل الكامل، واستعرض القوانين، والملاحظات الهامة، وحدد دروسك المفضلة للمراجعة والاختبار اللاحق.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="ابحث عن درس، أو مفهوم فيزيائي..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-10 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e] focus:ring-1 focus:ring-[#0c4a6e] transition shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chapters & Lessons Sidebar */}
        {!focusMode && (
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-[#0c4a6e]" />
              <span className="text-xs font-bold text-slate-600">أبواب وفصول المنهج:</span>
            </div>

            <div className="space-y-3">
            {filteredChapters.map((chap) => {
              const isExpanded = expandedChapterId === chap.id;

              return (
                <div
                  key={chap.id}
                  className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm"
                >
                  {/* Chapter Header Toggle */}
                  <button
                    onClick={() => setExpandedChapterId(isExpanded ? null : chap.id)}
                    className="w-full p-4 flex items-center justify-between text-right font-black text-sm text-slate-800 hover:bg-slate-50 transition-all"
                  >
                    <span className="flex-1 pr-1">{chap.title}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>

                  {/* Lessons list */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-slate-50 border-t border-slate-100"
                      >
                        <div className="p-2 space-y-1">
                          {chap.lessons.map((les) => {
                            const isSelected = selectedLesson?.id === les.id;
                            const isFavorite = favoriteLessonIds.includes(les.id);
                            const isWeak = weaknessTracker[les.id] && weaknessTracker[les.id].wrongCount > 0;

                            return (
                              <div
                                key={les.id}
                                className={`w-full p-3 rounded-lg text-right text-xs transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-sky-50 text-[#0c4a6e] font-black shadow-sm'
                                    : 'hover:bg-slate-100/70 text-slate-600'
                                }`}
                                onClick={() => setSelectedLesson(les)}
                              >
                                <div className="flex-1 text-right flex items-center gap-1.5 min-w-0">
                                  <span className="font-semibold truncate">{les.title}</span>
                                  {isWeak && (
                                    <span className="bg-rose-100 text-rose-700 text-[9px] px-1.5 py-0.5 rounded-full font-black flex-shrink-0 animate-pulse">
                                      بحاجة لمراجعة ⚠️
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavoriteLesson(les.id);
                                  }}
                                  className="p-1 hover:bg-amber-100 rounded-md transition text-amber-500"
                                >
                                  <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* Detailed Lesson Viewer */}
        <div className={focusMode ? 'lg:col-span-12' : 'lg:col-span-8'}>
          <AnimatePresence mode="wait">
            {selectedLesson ? (
              <motion.div
                key={selectedLesson.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className={`rounded-3xl border p-6 md:p-8 space-y-6 shadow-sm transition-all duration-300 ${
                  readingTheme === 'sepia'
                    ? 'reading-sepia border-[#e6d3b3]'
                    : readingTheme === 'dark'
                    ? 'reading-dark border-zinc-800'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {/* Header with Title and Favorite Toggle */}
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-zinc-800/80 pb-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-1">{selectedLesson.title}</h3>
                    {selectedLesson.subtitle && <p className="text-xs text-slate-500 font-medium">{selectedLesson.subtitle}</p>}
                  </div>

                  <button
                    onClick={() => onToggleFavoriteLesson(selectedLesson.id)}
                    className="flex items-center gap-1.5 py-1.5 px-3 border border-slate-200 rounded-xl text-xs font-bold transition hover:bg-slate-50 text-amber-500"
                  >
                    <Star className={`w-4 h-4 ${favoriteLessonIds.includes(selectedLesson.id) ? 'fill-amber-500' : 'text-slate-400'}`} />
                    <span>{favoriteLessonIds.includes(selectedLesson.id) ? 'مفضل ✓' : 'إضافة للمفضلة'}</span>
                  </button>
                </div>

                {/* Comfort Reading Settings Toolbar */}
                <div className="p-3 bg-slate-50/80 dark:bg-zinc-900/60 rounded-2xl border border-slate-200/50 dark:border-zinc-800/60 flex flex-wrap gap-3 items-center justify-between text-xs transition-colors">
                  {/* Right side: Title & Quick description */}
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-zinc-300">
                    <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>تخصيص القراءة المريحة:</span>
                  </div>

                  {/* Settings Groups */}
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* 1. Theme Selection */}
                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 p-1 rounded-xl border border-slate-200/60 shadow-sm dark:border-zinc-700/60">
                      <button
                        title="افتراضي"
                        onClick={() => setReadingTheme('default')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                          readingTheme === 'default'
                            ? 'bg-sky-50 dark:bg-zinc-700 text-sky-800 dark:text-sky-200 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white border border-slate-400"></span>
                        <span className="hidden sm:inline">افتراضي</span>
                      </button>

                      <button
                        title="وضع سيبيا مريح"
                        onClick={() => setReadingTheme('sepia')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                          readingTheme === 'sepia'
                            ? 'bg-[#ebdcb9] text-[#5c3b16] shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-[#ebdcb9]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#fdf6e3] border border-[#d3c6a2]"></span>
                        <span>دافئ</span>
                      </button>

                      <button
                        title="وضع ليلي"
                        onClick={() => setReadingTheme('dark')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                          readingTheme === 'dark'
                            ? 'bg-zinc-950 text-zinc-100 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-zinc-950 border border-zinc-700"></span>
                        <span>ليلي</span>
                      </button>
                    </div>

                    {/* 2. Font Size Selection */}
                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 p-1 rounded-xl border border-slate-200/60 shadow-sm dark:border-zinc-700/60">
                      <span className="px-1.5 font-bold text-slate-400"><Type className="w-3.5 h-3.5" /></span>
                      {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => {
                        const labels = { sm: 'A-', base: 'A', lg: 'A+', xl: 'A++' };
                        const titles = { sm: 'صغير', base: 'عادي', lg: 'كبير', xl: 'ضخم' };
                        return (
                          <button
                            key={sz}
                            title={titles[sz]}
                            onClick={() => setReadingFontSize(sz)}
                            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                              readingFontSize === sz
                                ? 'bg-sky-600 text-white shadow-sm'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200'
                            }`}
                          >
                            {labels[sz]}
                          </button>
                        );
                      })}
                    </div>

                    {/* 3. Focus Mode Toggle */}
                    <button
                      onClick={handleToggleFocusMode}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl border font-bold transition-all ${
                        focusMode
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400 shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200/60 text-slate-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {focusMode ? (
                        <>
                          <Minimize2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>عرض جانبي</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                          <span>تركيز كامل</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* ⚠️ تذكير مخصص للدروس الضعيفة */}
                {weaknessTracker[selectedLesson.id] && weaknessTracker[selectedLesson.id].wrongCount > 0 && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 leading-relaxed font-bold flex items-start gap-2.5 shadow-sm">
                    <span className="text-xl">💡</span>
                    <div>
                      <strong className="text-rose-800 block mb-1">تذكير تمكين الفهم والتقوية الذاتية:</strong>
                      لقد أظهرت نتائج اختباراتك السابقة بعض الصعوبة في استيعاب أسئلة هذا الدرس (لديك <span className="font-mono text-rose-700 font-bold">{weaknessTracker[selectedLesson.id].wrongCount}</span> إجابات خاطئة سابقاً). نوصيك بقراءة الشرح المرفق أدناه بتركيز فائق، وتدوين الملاحظات لتفوقك الدراسي!
                    </div>
                  </div>
                )}

                {/* Main Content Body */}
                <div
                  className={`prose max-w-none text-right transition-all duration-300 ${
                    readingFontSize === 'sm'
                      ? 'text-xs prose-sm md:text-sm'
                      : readingFontSize === 'base'
                      ? 'text-sm prose-base md:text-base'
                      : readingFontSize === 'lg'
                      ? 'text-base prose-lg md:text-lg'
                      : 'text-lg prose-xl md:text-xl'
                  } ${
                    readingLineHeight === 'normal'
                      ? 'leading-normal space-y-3'
                      : readingLineHeight === 'relaxed'
                      ? 'leading-relaxed space-y-4'
                      : 'leading-loose space-y-6'
                  } ${
                    readingTheme === 'sepia'
                      ? 'text-[#433422]'
                      : readingTheme === 'dark'
                      ? 'text-zinc-200'
                      : 'text-slate-700'
                  }`}
                  dangerouslySetInnerHTML={{ __html: getEnrichedContent(selectedLesson.content) }}
                />

                {/* Formulas Section */}
                {selectedLesson.formulas && selectedLesson.formulas.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 dark:border-zinc-800/80 space-y-4">
                    <h4 className="font-black text-sm text-slate-800">القوانين والعلاقات الرياضية في هذا الدرس:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedLesson.formulas.map((formula, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2 hover:shadow-sm transition"
                        >
                          <div className="text-xs font-bold text-slate-500">{formula.name}</div>
                          <div className="font-mono text-sm text-[#0c4a6e] font-black">{formula.formula}</div>
                          <div className="text-[11px] text-slate-500 leading-relaxed">{formula.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Points / Exam Warnings */}
                {selectedLesson.keyPoints && selectedLesson.keyPoints.length > 0 && (
                  <div className="bg-amber-50/50 border border-amber-200/70 rounded-2xl p-5 space-y-2">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                      <HelpCircle className="w-4 h-4" /> كبسولة التفوق وملاحظات الامتحان:
                    </h4>
                    <ul className="list-disc pr-5 text-xs text-amber-800 leading-relaxed space-y-1.5">
                      {selectedLesson.keyPoints.map((point, idx) => (
                        <li key={idx} className="font-medium">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200/60">
                <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-bold">يرجى اختيار درس من القائمة الجانبية لقراءة محتوياته وتفاصيله.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
