import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, HelpCircle, Layers, Play, Settings, Sparkles, Star } from 'lucide-react';
import { chaptersData } from '../data/chapters';

// Import Chapter 1 Labs
import { GravityLab, CircularMotionLab, OrbitSatelliteLab } from './labs/Chapter1Labs';

// Import Chapter 2 Labs
import { 
  PendulumLab, 
  WavePropagationLab, 
  DopplerLab, 
  RefractionLab, 
  ThinLensesLab, 
  OpticalInstrumentsLab, 
  CurvedMirrorsLab 
} from './labs/Chapter2Labs';

// Import Chapter 3 Labs
import { 
  MagnetismLab, 
  StaticElectricityLab, 
  CurrentElectricityLab, 
  CurrentFieldLab 
} from './labs/Chapter3Labs';

// Import Chapter 4 Labs
import { 
  BohrModelLab, 
  LaserLab, 
  NuclearReactorLab, 
  SignalModulationLab, 
  RadioTuningLab 
} from './labs/Chapter4Labs';

export default function VirtualLabs() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chap-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-1-1');

  const selectedChapter = chaptersData.find(c => c.id === selectedChapterId) || chaptersData[0];

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    const chapter = chaptersData.find(c => c.id === chapterId);
    if (chapter && chapter.lessons.length > 0) {
      setSelectedLessonId(chapter.lessons[0].id);
    }
  };

  // Helper to render the active experiment based on selectedLessonId
  const renderActiveExperiment = () => {
    switch (selectedLessonId) {
      // Chapter 1
      case 'les-1-1':
        return <GravityLab />;
      case 'les-1-2':
        return <CircularMotionLab />;
      case 'les-1-3':
        return <OrbitSatelliteLab />;

      // Chapter 2
      case 'les-2-1':
        return <PendulumLab />;
      case 'les-2-2':
        return <WavePropagationLab />;
      case 'les-2-3':
        return <DopplerLab />;
      case 'les-2-4':
        return <RefractionLab />;
      case 'les-2-5':
        return <ThinLensesLab />;
      case 'les-2-6':
        return <OpticalInstrumentsLab />;
      case 'les-2-7':
        return <CurvedMirrorsLab />;

      // Chapter 3
      case 'les-3-1':
        return <MagnetismLab />;
      case 'les-3-2':
        return <StaticElectricityLab />;
      case 'les-3-3':
        return <CurrentElectricityLab />;
      case 'les-3-4':
        return <CurrentFieldLab />;

      // Chapter 4
      case 'les-4-1':
        return <BohrModelLab />;
      case 'les-4-2':
        return <LaserLab />;
      case 'les-4-3':
        return <NuclearReactorLab />;
      case 'les-4-4':
        return <SignalModulationLab />;
      case 'les-4-5':
        return <RadioTuningLab />;

      default:
        return (
          <div className="p-8 text-center text-slate-500">
            يرجى تحديد درس لتشغيل التجربة التفاعلية الخاصة به.
          </div>
        );
    }
  };

  const activeLesson = selectedChapter.lessons.find(l => l.id === selectedLessonId);

  return (
    <div className="w-full text-right space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-900 via-[#0c4a6e] to-sky-950 text-white rounded-3xl p-6 md:p-8 shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-sky-400/20">جاهز للتجربة والتطبيق</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-black">مختبر الفيزياء الافتراضي المتكامل</h2>
          <p className="text-xs text-sky-200 leading-relaxed font-semibold">
            نظام محاكاة متكامل يوفر تجربة فيزيائية تفاعلية تفصيلية لكل درس من دروس منهج الصف الثاني الثانوي لجمهورية السودان. اضبط المتغيرات وراقب تطور القياسات فوراً.
          </p>
        </div>
      </div>

      {/* Chapters Horizontal Menu */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-1 scrollbar-thin">
        {chaptersData.map((chap) => (
          <button
            key={chap.id}
            onClick={() => handleChapterSelect(chap.id)}
            className={`py-2.5 px-4 text-xs font-black border-b-2 whitespace-nowrap flex items-center gap-2 transition-all rounded-t-xl ${
              selectedChapterId === chap.id
                ? 'border-sky-600 text-sky-700 bg-sky-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            {chap.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Lessons list of active chapter */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 p-4 space-y-2">
            <h3 className="text-xs font-black text-slate-800 dark:text-zinc-300 border-b border-slate-100 dark:border-zinc-800 pb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              تجارب الباب الدراسي الحالية:
            </h3>

            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
              {selectedChapter.lessons.map((lesson) => {
                const isActive = selectedLessonId === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full text-right p-3 rounded-xl text-xs font-semibold flex flex-col gap-1 transition-all border ${
                      isActive
                        ? 'bg-sky-50 dark:bg-sky-950/20 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-900/50 shadow-sm'
                        : 'bg-white dark:bg-zinc-950 hover:bg-slate-50 text-slate-600 dark:text-zinc-400 border-transparent'
                    }`}
                  >
                    <span className="font-bold">{lesson.title}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{lesson.subtitle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick instructions */}
          <div className="p-4 bg-slate-50 dark:bg-zinc-850 rounded-2xl border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-zinc-300">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" /> كيفية العمل:
            </div>
            <p className="text-[10px] leading-relaxed">
              قم باختيار الدرس من القائمة، ثم استخدم لوحة التحكم المخصصة لضبط المعايير الفيزيائية لرؤية التمثيل الرياضي والمرئي للمحاكاة بالوقت الحقيقي.
            </p>
          </div>
        </div>

        {/* Right Side: Render Active Lab */}
        <div className="lg:col-span-9 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 md:p-6 shadow-sm min-h-[500px]">
          {activeLesson && (
            <div className="mb-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-[10px] bg-slate-100 dark:bg-zinc-850 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                تحديد الموضع: {selectedChapter.title.split(':')[0]}
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-1.5">{activeLesson.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{activeLesson.subtitle}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLessonId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {renderActiveExperiment()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
