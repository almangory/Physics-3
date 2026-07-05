import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Layers,
  BookOpen,
  Sparkles,
  Zap,
  Activity,
  Heart,
  Moon,
  Sun,
  Menu,
  X,
  Award,
  HelpCircle,
  FileText,
  AlertTriangle,
  Calculator
} from 'lucide-react';

import ChaptersOverview from './components/ChaptersOverview';
import VirtualLabs from './components/VirtualLabs';
import Flashcards from './components/Flashcards';
import WorksheetGenerator from './components/WorksheetGenerator';
import QuizApp from './components/QuizApp';
import SmartAssistant from './components/SmartAssistant';
import ProblemsBank from './components/ProblemsBank';
import { chaptersData } from './data/chapters';

type ActivePage = 'dashboard' | 'favorites' | 'chapters' | 'labs' | 'flashcards' | 'worksheets' | 'quiz' | 'problems';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  // Synchronize browser history and handle back navigation for mobile & desktop
  useEffect(() => {
    // Replace the current state with 'exit' and push the initial 'dashboard' state
    window.history.replaceState({ page: 'exit' }, '');
    window.history.pushState({ page: 'dashboard' }, '');
    
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.page) {
        if (state.page === 'exit') {
          const confirmExit = window.confirm("هل أنت متأكد من رغبتك في مغادرة منصة الفيزياء التفاعلية؟");
          if (confirmExit) {
            window.history.back();
          } else {
            // Put 'dashboard' back into the history stack so they stay
            window.history.pushState({ page: 'dashboard' }, '');
            setActivePage('dashboard');
          }
        } else {
          setActivePage(state.page as ActivePage);
        }
      } else {
        const confirmExit = window.confirm("هل أنت متأكد من رغبتك في مغادرة منصة الفيزياء التفاعلية؟");
        if (confirmExit) {
          window.history.back();
        } else {
          window.history.pushState({ page: 'dashboard' }, '');
          setActivePage('dashboard');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Sync state changes with pushState so the back button is populated when we click nav buttons
  useEffect(() => {
    const currentState = window.history.state;
    if (currentState && currentState.page !== activePage && activePage !== 'dashboard') {
      window.history.pushState({ page: activePage }, '');
    } else if (activePage === 'dashboard') {
      if (!currentState || currentState.page !== 'dashboard') {
        window.history.pushState({ page: 'dashboard' }, '');
      }
    }
  }, [activePage]);

  // Handle reload/tab closure warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Most modern browsers will ignore custom text, but we keep it standard
      e.returnValue = 'هل أنت متأكد من رغبتك في مغادرة منصة الفيزياء التفاعلية؟';
      return 'هل أنت متأكد من رغبتك في مغادرة منصة الفيزياء التفاعلية؟';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const [favoriteLessonIds, setFavoriteLessonIds] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Weakness tracker for physics lessons
  const [weaknessTracker, setWeaknessTracker] = useState<{ [key: string]: any }>({});
  const [focusMode, setFocusMode] = useState<boolean>(() => {
    return localStorage.getItem('physics_focus_mode') === 'true';
  });

  useEffect(() => {
    const handleFocusSync = () => {
      setFocusMode(localStorage.getItem('physics_focus_mode') === 'true');
    };
    window.addEventListener('physics_focus_mode_updated', handleFocusSync);
    return () => {
      window.removeEventListener('physics_focus_mode_updated', handleFocusSync);
    };
  }, []);

  useEffect(() => {
    const loadWeakness = () => {
      const saved = localStorage.getItem('physics_weakness_tracker');
      if (saved) {
        try {
          setWeaknessTracker(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      } else {
        setWeaknessTracker({});
      }
    };
    loadWeakness();

    window.addEventListener('physics_weakness_updated', loadWeakness);
    return () => {
      window.removeEventListener('physics_weakness_updated', loadWeakness);
    };
  }, []);

  const handleAddDemoWeaknessData = () => {
    const demo = {
      'les-1-1': {
        lessonId: 'les-1-1',
        lessonTitle: 'الفصل الأول: المجال التثاقلي (مجال الجاذبية)',
        chapterId: 'chap-1',
        wrongCount: 3,
        correctCount: 1,
        totalCount: 4
      },
      'les-2-1': {
        lessonId: 'les-2-1',
        lessonTitle: 'الفصل الأول: الحركة التوافقية البسيطة والاهتزازات',
        chapterId: 'chap-2',
        wrongCount: 2,
        correctCount: 0,
        totalCount: 2
      }
    };
    setWeaknessTracker(demo);
    localStorage.setItem('physics_weakness_tracker', JSON.stringify(demo));
    window.dispatchEvent(new Event('physics_weakness_updated'));
  };

  const handleClearWeaknessData = () => {
    setWeaknessTracker({});
    localStorage.removeItem('physics_weakness_tracker');
    window.dispatchEvent(new Event('physics_weakness_updated'));
  };

  // Bento-grid dashboard interactive state
  const [orbitMass, setOrbitMass] = useState<number>(25);
  const [orbitDistance, setOrbitDistance] = useState<number>(85);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [wavePhase, setWavePhase] = useState<number>(0);
  
  // Worksheet dashboard state
  const [wsChapter, setWsChapter] = useState<string>('all');
  const [wsType, setWsType] = useState<'choice' | 'boolean'>('choice');
  const [wsCount, setWsCount] = useState<number>(1);

  // Bohr atom simulator state (Chapter 4)
  const [bohrNi, setBohrNi] = useState<number>(3);
  const [bohrNf, setBohrNf] = useState<number>(2);
  const [bohrElectronAngle, setBohrElectronAngle] = useState<number>(0);
  const [bohrElectronRadius, setBohrElectronRadius] = useState<number>(50); // default for n=3 is 50
  const [bohrPhotonEmitted, setBohrPhotonEmitted] = useState<boolean>(false);
  const [bohrPhotonX, setBohrPhotonX] = useState<number>(0);
  const [bohrPhotonColor, setBohrPhotonColor] = useState<string>('#ef4444'); // default red for 3->2
  const [bohrStatusText, setBohrStatusText] = useState<string>('جاهز للمحاكاة (اختر المستويات واضغط زر البدء)');
  const [isBohrAnimating, setIsBohrAnimating] = useState<boolean>(false);

  // Animate Bohr electron in its stable orbit
  useEffect(() => {
    let animFrame: number;
    const animateBohr = () => {
      if (!isBohrAnimating) {
        setBohrElectronAngle((prev) => (prev + 1.2) % 360);
      }
      animFrame = requestAnimationFrame(animateBohr);
    };
    animFrame = requestAnimationFrame(animateBohr);
    return () => cancelAnimationFrame(animFrame);
  }, [isBohrAnimating]);

  // Synchronize electron radius when ni changes
  useEffect(() => {
    const getRadiusForN = (n: number) => {
      if (n === 1) return 18;
      if (n === 2) return 34;
      if (n === 3) return 50;
      return 66; // n=4
    };
    if (!isBohrAnimating) {
      setBohrElectronRadius(getRadiusForN(bohrNi));
    }
  }, [bohrNi, isBohrAnimating]);

  const handleBohrTransition = () => {
    if (isBohrAnimating) return;
    if (bohrNi <= bohrNf) {
      setBohrStatusText('يرجى اختيار مستوى ابتدائي أعلى من المستوى النهائي لمحاكاة انبعاث الضوء!');
      return;
    }

    setIsBohrAnimating(true);
    setBohrPhotonEmitted(false);
    setBohrStatusText('جاري إثارة الإلكترون وتجهيز الانتقال...');

    const getRadiusForN = (n: number) => {
      if (n === 1) return 18;
      if (n === 2) return 34;
      if (n === 3) return 50;
      return 66; // n=4
    };

    const startRad = getRadiusForN(bohrNi);
    const endRad = getRadiusForN(bohrNf);
    
    // Set photon color based on transition
    let color = '#f59e0b'; // Gold / general
    if (bohrNi === 3 && bohrNf === 2) color = '#ef4444'; // Red 656nm (Balmer)
    else if (bohrNi === 4 && bohrNf === 2) color = '#06b6d4'; // Blue-green 486nm
    else if (bohrNi === 4 && bohrNf === 3) color = '#b91c1c'; // Deep Red (IR)
    else if (bohrNf === 1) color = '#a855f7'; // Purple-white (UV Balmer series)

    setBohrPhotonColor(color);
    setBohrElectronRadius(startRad);

    // Step 1: spiral/fall transition
    let currentRadius = startRad;
    const interval = setInterval(() => {
      currentRadius -= 1.0;
      if (currentRadius <= endRad) {
        currentRadius = endRad;
        clearInterval(interval);
        
        // Trigger photon emission
        setBohrElectronRadius(endRad);
        setBohrPhotonEmitted(true);
        setBohrPhotonX(0);
        
        const deltaE = (13.6 * (1 / (bohrNf * bohrNf) - 1 / (bohrNi * bohrNi))).toFixed(2);
        const wavelength = (1242 / parseFloat(deltaE)).toFixed(0);
        
        setBohrStatusText(`انبعاث فوتون! طاقة القفزة: ${deltaE} eV، الطول الموجي: ${wavelength} نانومتر`);
        
        // Photon flying animation
        let px = 0;
        const photonInterval = setInterval(() => {
          px += 4;
          setBohrPhotonX(px);
          if (px > 100) {
            clearInterval(photonInterval);
            setIsBohrAnimating(false);
          }
        }, 16);
      } else {
        setBohrElectronRadius(currentRadius);
        setBohrElectronAngle((prev) => (prev + 6) % 360);
      }
    }, 20);
  };

  // Animate orbit
  useEffect(() => {
    let animFrame: number;
    const animateOrbit = () => {
      const speed = 120 / Math.pow(orbitDistance, 1.1);
      setOrbitAngle((prev) => (prev + speed) % 360);
      animFrame = requestAnimationFrame(animateOrbit);
    };
    animFrame = requestAnimationFrame(animateOrbit);
    return () => cancelAnimationFrame(animFrame);
  }, [orbitDistance]);

  // Animate sine wave
  useEffect(() => {
    let animFrame: number;
    const animateWave = () => {
      setWavePhase((prev) => (prev + 0.12) % (Math.PI * 2));
      animFrame = requestAnimationFrame(animateWave);
    };
    animFrame = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Load favorites from localStorage on start
  useEffect(() => {
    // Explicitly remove dark class and default to light mode
    document.documentElement.classList.remove('dark');
    setDarkMode(false);

    const saved = localStorage.getItem('physics_fav_lessons');
    if (saved) {
      try {
        setFavoriteLessonIds(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing favorites', e);
      }
    }
  }, []);

  const handleToggleFavoriteLesson = (lessonId: string) => {
    const updated = favoriteLessonIds.includes(lessonId)
      ? favoriteLessonIds.filter((id) => id !== lessonId)
      : [...favoriteLessonIds, lessonId];
    
    setFavoriteLessonIds(updated);
    localStorage.setItem('physics_fav_lessons', JSON.stringify(updated));
  };

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: Layers },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'chapters', label: 'منهج الفيزياء المقرّر', icon: BookOpen },
    { id: 'problems', label: 'المسائل الحسابية والتمكين', icon: Calculator },
    { id: 'flashcards', label: 'بطاقات المذاكرة', icon: Zap },
    { id: 'labs', label: 'مختبر التجارب الافتراضية', icon: Compass },
    { id: 'worksheets', label: 'مولد أوراق العمل', icon: FileText },
  ];

  return (
    <div className={`min-h-screen text-gray-800 transition-colors duration-300 flex font-sans ${activePage === 'chapters' && focusMode ? 'bg-[#faf4e8]' : 'bg-[#f8fafc]'}`} dir="rtl">
      
       {/* Printable Area overrides styling for print, hides sidebar & main margins */}
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          body, html {
            background-color: white !important;
            color: black !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          aside, header, footer, .print\\:hidden, #print-hidden-actions {
            display: none !important;
          }
          main {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
          }
          #worksheet-print-area {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
          }
          .A4-page {
            width: 210mm !important;
            height: 297mm !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 15mm !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* Sidebar for Desktop */}
      <aside className={`hidden lg:flex flex-col w-72 bg-slate-50 border-l border-slate-200 p-6 space-y-8 print:hidden text-slate-800 ${activePage === 'chapters' && focusMode ? 'lg:hidden' : ''}`}>
        {/* Brand/Logo Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-[#0c4a6e]">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight text-[#0c4a6e] leading-none">نقلة Naqla</h1>
              <span className="text-[10px] text-slate-500 font-bold mt-1 block">لثالث ثانوي مقررات</span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as ActivePage)}
                className={`w-full py-3.5 px-4 rounded-xl text-right text-sm font-bold transition flex items-center gap-3 ${
                  isActive
                    ? 'bg-sky-50 text-[#0c4a6e] shadow-sm border-r-4 border-sky-500'
                    : 'text-slate-600 hover:text-[#0c4a6e] hover:bg-slate-100/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Sidebar Info */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex justify-between text-xs text-slate-500">
            <span>الدروس المفضلة:</span>
            <span className="font-bold text-amber-500 font-mono flex items-center gap-1">
              <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
              {favoriteLessonIds.length}
            </span>
          </div>
          <div className="w-full py-2.5 px-3 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 border border-slate-200">
            <span>بوابة الفيزياء المتقدمة التفاعلية</span>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden print:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-sky-600 animate-pulse" />
                    <div>
                      <h1 className="font-black text-sm text-slate-800">نقلة Naqia</h1>
                      <span className="text-[10px] text-slate-500 font-bold block mt-0.5">الصف الثالث الثانوي</span>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActivePage(item.id as ActivePage);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full py-3.5 px-4 rounded-xl text-right text-xs font-black transition flex items-center gap-3 ${
                          isActive
                            ? 'bg-sky-50 text-[#0c4a6e] shadow-sm border-r-4 border-sky-500'
                            : 'text-slate-600 hover:text-[#0c4a6e] hover:bg-slate-100/50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-150">
                <div className="w-full py-2.5 px-3 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 border border-slate-200">
                  <span>بوابة الفيزياء المتقدمة التفاعلية</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar (Desktop only) */}
        <div className={`hidden lg:flex items-center justify-between py-4 px-8 bg-white border-b border-slate-200 print:hidden ${activePage === 'chapters' && focusMode ? 'lg:hidden' : ''}`}>
          {/* Right side in LTR, but in RTL this is the far-left part: welcome details */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right select-none">
                <p className="text-xs font-black text-slate-400">منصة نقلة التفاعلية</p>
                <p className="text-sm font-black text-slate-800">مادة الفيزياء الصف الثالث ثانوي</p>
              </div>
            </div>
          </div>

          {/* Left side in LTR, but in RTL this is the far-right part: profile, bell, name */}
          <div className="flex items-center gap-6">
            <span className="text-lg font-black text-[#0c4a6e]">نقلة</span>

            {/* Notification Bell */}
            <div className="relative cursor-pointer p-2 bg-slate-50 hover:bg-slate-100 rounded-xl shadow-sm hover:scale-105 transition border border-slate-200">
              <span className="absolute -top-1.5 -left-1.5 bg-sky-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">3</span>
              <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>

            {/* Profile Avatar and Name */}
            <div className="flex items-center gap-3">
              <div className="text-right select-none">
                <p className="text-xs font-black text-slate-400">مرحباً</p>
                <p className="text-xs font-black text-slate-800 font-sans"> يامستقبل السودان</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
                👤
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Header Bar */}
        <header className={`lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 print:hidden ${activePage === 'chapters' && focusMode ? 'hidden' : ''}`}>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 bg-slate-50 rounded-xl">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0c4a6e] animate-pulse" />
            <span className="font-bold text-sm text-slate-800">الفيزياء التفاعلية</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-sky-150 flex items-center justify-center text-xs font-bold text-[#0c4a6e]">
            👤
          </div>
        </header>

        {/* Main Content Container */}
        <main className={`flex-1 w-full mx-auto ${activePage === 'chapters' && focusMode ? 'p-4 md:p-6 lg:p-8 max-w-none bg-[#faf4e8]' : 'p-6 lg:p-8 max-w-7xl'}`}>
          <AnimatePresence mode="wait">
            
            {/* 1. Dashboard View */}
            {activePage === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* 🧠 مسار المراجعة والتمكين الذكي (Smart Review Reminder) */}
                <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
                        <AlertTriangle className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-800">🧠 مسار المراجعة والتقوية والتمكين الذكي</h3>
                        <p className="text-xs text-slate-500 mt-0.5">مساعدك الشخصي لتجاوز نقاط الضعف وتحقيق الامتياز في مادة الفيزياء</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {Object.keys(weaknessTracker).length > 0 ? (
                        <button
                          onClick={handleClearWeaknessData}
                          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-slate-200"
                        >
                          تصفير السجل
                        </button>
                      ) : (
                        <button
                          onClick={handleAddDemoWeaknessData}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-rose-100"
                        >
                          محاكاة بيانات اختبار لتجربة الميزة
                        </button>
                      )}
                    </div>
                  </div>

                  {Object.keys(weaknessTracker).length === 0 ? (
                    <div className="py-4 text-center space-y-2">
                      <p className="text-sm font-bold text-slate-700">لا توجد دروس مسجلة في قائمة نقاط الضعف حتى الآن! 🎉</p>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-xl mx-auto font-medium">
                        أحسنت صنعاً! هذا يعني أن إجاباتك ممتازة أو أنك لم تبدأ الاختبارات بعد. لحل الأسئلة وتمكين النظام من تحديد مستواك، انتقل لعلامة تبويب <span className="font-bold text-sky-600">الاختبارات</span>.
                      </p>
                      <button
                        onClick={() => setActivePage('quiz')}
                        className="mt-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-xl transition shadow-sm inline-flex items-center gap-1.5"
                      >
                        ابدأ اختباراً تفاعلياً الآن
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl text-xs text-amber-800 leading-relaxed font-semibold">
                        ⚠️ <strong>تنبيه هام للطالب:</strong> بناءً على أدائك وإجاباتك الخاطئة في الاختبارات التفاعلية الأخيرة، تم تحديد الدروس التالية كـ "دروس تحتاج لمراجعة فورية". ننصحك بقراءتها بتركيز وحل المسائل الخاصة بها لتمكين الفهم.
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.values(weaknessTracker)
                          .sort((a: any, b: any) => b.wrongCount - a.wrongCount)
                          .map((item: any) => {
                            const errorRate = Math.round((item.wrongCount / item.totalCount) * 100);
                            const successRate = 100 - errorRate;
                            return (
                              <div
                                key={item.lessonId}
                                className="p-4 rounded-2xl border border-rose-100 bg-rose-50/20 hover:bg-rose-50/40 transition flex flex-col justify-between space-y-3"
                              >
                                <div>
                                  <div className="flex justify-between items-start gap-2">
                                    <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                                      {item.chapterId === 'chap-1' ? 'الباب الأول' : item.chapterId === 'chap-2' ? 'الباب الثاني' : item.chapterId === 'chap-3' ? 'الباب الثالث' : 'الباب الرابع'}
                                    </span>
                                    <span className="text-[11px] font-mono font-black text-rose-600">
                                      {item.wrongCount} أخطاء من {item.totalCount} محاولات
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-black text-slate-800 mt-2 leading-snug">{item.lessonTitle}</h4>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                                    <span>مستوى التمكن والحل الصحيح:</span>
                                    <span className={successRate < 50 ? 'text-red-600 font-black' : 'text-amber-600 font-black'}>
                                      {successRate}%
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-500 ${successRate < 50 ? 'bg-red-500' : 'bg-amber-500'}`} 
                                      style={{ width: `${successRate}%` }}
                                    />
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-rose-100/30 flex flex-col gap-2">
                                  <div className="flex gap-2 w-full">
                                    <button
                                      onClick={() => {
                                        localStorage.setItem('highlight_lesson_id', item.lessonId);
                                        setActivePage('chapters');
                                      }}
                                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs rounded-lg text-center transition active:scale-95"
                                    >
                                      مراجعة الشرح التفصيلي 📖
                                    </button>
                                    <button
                                      onClick={() => {
                                        setActivePage('quiz');
                                      }}
                                      className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-lg text-center transition active:scale-95"
                                    >
                                      إعادة الاختبار 📝
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => {
                                      localStorage.setItem('practice_calc_lesson_id', item.lessonId);
                                      localStorage.setItem('practice_calc_chapter_id', item.chapterId);
                                      setActivePage('problems');
                                    }}
                                    className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-black text-xs rounded-lg text-center transition active:scale-95 flex items-center justify-center gap-1"
                                  >
                                    <Calculator className="w-3.5 h-3.5" />
                                    تمرّن على المسائل الحسابية لهذا الدرس 📐
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2-Column Bento Grid matching the mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Row 1 - Column 1: الباب الأول */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-black text-slate-850 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                      الباب الأول: المجال الثقالي
                    </h2>
                    
                    {/* Card 1: Interactive Gravity Simulator */}
                    <div className="relative overflow-hidden bg-[#0c4a6e] text-white rounded-3xl p-6 shadow-sm border border-[#0284c7] min-h-[290px] flex flex-col justify-between group">
                      {/* Top left favorite star */}
                      <button 
                        onClick={() => handleToggleFavoriteLesson('les-1-1')}
                        className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition z-10"
                      >
                        <Heart className={`w-4 h-4 ${favoriteLessonIds.includes('les-1-1') ? 'fill-amber-400 text-amber-400' : 'text-white/70'}`} />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                        {/* Left: Orbit Simulator Graphic */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
                          <div className="relative w-44 h-44 bg-teal-950/20 rounded-full flex items-center justify-center border border-teal-800/40">
                            {/* Orbital track line */}
                            <svg className="absolute inset-0 w-full h-full">
                              <circle 
                                cx="88" 
                                cy="88" 
                                r={orbitDistance * 0.55} 
                                fill="none" 
                                stroke="rgba(56, 189, 248, 0.4)" 
                                strokeWidth="1.5" 
                                strokeDasharray="5 4" 
                              />
                              {/* Mars planet */}
                              <circle 
                                cx="88" 
                                cy="88" 
                                r={14 + orbitMass * 0.4} 
                                fill="url(#marsGradient)" 
                                className="shadow-2xl"
                              />
                              <defs>
                                <radialGradient id="marsGradient">
                                  <stop offset="0%" stopColor="#f97316" />
                                  <stop offset="70%" stopColor="#ea580c" />
                                  <stop offset="100%" stopColor="#9a3412" />
                                </radialGradient>
                              </defs>
                              
                              {/* Orbiting Satellite */}
                              {(() => {
                                const radius = orbitDistance * 0.55;
                                const rad = (orbitAngle * Math.PI) / 180;
                                const satX = 88 + Math.cos(rad) * radius;
                                const satY = 88 + Math.sin(rad) * radius;
                                return (
                                  <g transform={`translate(${satX - 8}, ${satY - 8})`}>
                                    {/* Satellite Wings */}
                                    <rect x="0" y="5" width="16" height="6" rx="1" fill="#38bdf8" opacity="0.9" />
                                    <rect x="5" y="0" width="6" height="16" rx="1" fill="#38bdf8" opacity="0.9" />
                                    {/* Satellite Body */}
                                    <circle cx="8" cy="8" r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
                                    {/* Antenna */}
                                    <line x1="8" y1="8" x2="8" y2="14" stroke="#ffffff" strokeWidth="1" />
                                  </g>
                                );
                              })()}
                            </svg>
                            
                            {/* Gravitational label text */}
                            <span className="absolute bottom-2 right-2 text-[10px] font-mono text-sky-300 font-bold">G_M = {orbitMass}</span>
                            <span className="absolute top-2 left-2 text-[10px] font-mono text-sky-300 font-bold">R_orb = {orbitDistance}</span>
                            <span className="text-[11px] font-black tracking-widest text-white bg-teal-900/60 px-2 py-0.5 rounded font-mono">MG</span>
                          </div>
                        </div>

                        {/* Right: Controls & Info */}
                        <div className="md:col-span-7 space-y-4 text-right">
                          <span className="text-[10px] bg-teal-800 text-teal-300 px-2.5 py-1 rounded-full font-bold">التجربة المباشرة 3D</span>
                          <h3 className="text-lg font-black text-white mt-1">تفاعل قوة التثاقل الكونى</h3>
                          
                          {/* Sliders */}
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-[11px] text-teal-200 font-bold mb-1">
                                <span>كتلة الكوكب (M):</span>
                                <span className="font-mono">{orbitMass} كجم × 10²⁴</span>
                              </div>
                              <input 
                                type="range" 
                                min="10" 
                                max="45" 
                                value={orbitMass} 
                                onChange={(e) => setOrbitMass(Number(e.target.value))}
                                className="w-full accent-sky-400 cursor-pointer h-1 bg-teal-800 rounded-lg appearance-none"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] text-teal-200 font-bold mb-1">
                                <span>المسافة المدارية (R):</span>
                                <span className="font-mono">{orbitDistance} الف كم</span>
                              </div>
                              <input 
                                type="range" 
                                min="50" 
                                max="110" 
                                value={orbitDistance} 
                                onChange={(e) => setOrbitDistance(Number(e.target.value))}
                                className="w-full accent-sky-400 cursor-pointer h-1 bg-teal-800 rounded-lg appearance-none"
                              />
                            </div>
                          </div>

                          {/* Force Level Indicator */}
                          <div className="space-y-1">
                            <span className="text-[10px] text-teal-200 font-bold">شدة مجال الجاذبية (د):</span>
                            <div className="flex gap-1 items-center h-2">
                              {Array.from({ length: 10 }).map((_, idx) => {
                                const forceVal = (orbitMass * 8) / (orbitDistance / 10);
                                const lit = idx < Math.min(Math.round(forceVal), 10);
                                return (
                                  <div 
                                    key={idx} 
                                    className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${lit ? 'bg-sky-400' : 'bg-teal-900'}`}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Launch Button */}
                      <div className="flex justify-between items-center pt-4 border-t border-teal-850 mt-4">
                        <span className="text-[11px] text-teal-300 font-bold">تسارع الإفلات: {Math.sqrt((2 * 9.8 * orbitMass) / (orbitDistance / 10)).toFixed(2)} م/ث</span>
                        <button 
                          onClick={() => setActivePage('labs')}
                          className="px-5 py-2 bg-white text-[#0a5464] hover:bg-zinc-100 transition font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95"
                        >
                          ابدأ التجربة
                          <span>←</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Row 1 - Column 2: الباب الثاني */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-black text-slate-850 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      الباب الثاني: الموجات والضوء
                    </h2>
                    
                    {/* Card 2: Wave Theory card */}
                    <div className="relative overflow-hidden bg-white text-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 min-h-[290px] flex flex-col justify-between group">
                      {/* Top left favorite star */}
                      <button 
                        onClick={() => handleToggleFavoriteLesson('les-2-1')}
                        className="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition z-10"
                      >
                        <Heart className={`w-4 h-4 ${favoriteLessonIds.includes('les-2-1') ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                        {/* Left: Sine wave representation */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center">
                          <div className="relative w-full h-32 rounded-2xl flex items-center justify-center border p-2" style={{ borderColor: '#2d81ea', backgroundColor: '#0d0b0b' }}>
                            <span className="absolute top-1.5 right-2 text-[10px] font-black text-slate-400">الباب الثاني: نظري</span>
                            
                            {/* Interactive Sine Wave SVG */}
                            <svg className="w-full h-20" viewBox="0 0 160 60">
                              {/* Baseline */}
                              <line x1="0" y1="30" x2="160" y2="30" stroke="rgba(100, 116, 139, 0.2)" strokeWidth="1" strokeDasharray="4 2" />
                              
                              {/* Wavelength Indicator Arrow */}
                              <path d="M 40 10 L 120 10" stroke="#3b82f6" strokeWidth="1.2" />
                              <polygon points="40,7 40,13 32,10" fill="#3b82f6" />
                              <polygon points="120,7 120,13 128,10" fill="#3b82f6" />
                              <text x="80" y="8" textAnchor="middle" fontSize="8" className="fill-sky-700 font-bold">الطول الموجي (λ)</text>

                              {/* Animating Wave Path */}
                              {(() => {
                                const points = [];
                                const phase = wavePhase || 0;
                                for (let x = 0; x <= 160; x += 2) {
                                  const y = 30 + Math.sin((x / 18) - phase) * 16;
                                  points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
                                }
                                return (
                                  <path 
                                    d={points.join(' ')} 
                                    fill="none" 
                                    stroke="#0284c7" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round"
                                  />
                                );
                              })()}
                            </svg>
                            <span className="absolute bottom-1 text-[10px] text-slate-400 font-bold">التردد (Hz): ٢٥ هيرتز</span>
                          </div>
                        </div>

                        {/* Right: Info */}
                        <div className="md:col-span-7 space-y-4 text-right">
                          <span className="text-[10px] bg-sky-50 text-sky-800 px-2.5 py-1 rounded-full font-bold">الموجات الميكانيكية والكهرومغناطيسية</span>
                          <h3 className="text-lg font-black text-slate-800 mt-1">تراكب الموجات وانعكاس الضوء</h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            دراسة السلوك الموجي، الانكسار عند السطح الفاصل، والانعكاس الكلي الداخلي داخل الأوساط المادية المختلفة.
                          </p>
                          
                          {/* Progress bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                              <span>نسبة إنجاز المذاكرة:</span>
                              <span className="font-bold text-slate-700">٦٥%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-150 rounded-full overflow-hidden">
                              <div className="w-[65%] h-full bg-sky-600 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-4">
                        <span className="text-[11px] text-slate-500">الزاوية الحرجة (جيب-¹): نق₁/نق₂</span>
                        <button 
                          onClick={() => setActivePage('chapters')}
                          className="px-5 py-2 bg-[#0c4a6e] hover:bg-sky-900 text-white transition font-black rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          شرح الدرس
                          <span>←</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Row 2 - Column 1: الباب الثالث */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-black text-slate-850 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                      الباب الثالث: الكهربية والمغناطيسية
                    </h2>
                    
                    {/* Card 3: Flashcards Promo card */}
                    <div className="relative overflow-hidden bg-teal-50 text-teal-950 rounded-3xl p-6 shadow-sm border border-teal-200 min-h-[290px] flex flex-col justify-between group">
                      {/* Top left favorite star */}
                      <button 
                        onClick={() => handleToggleFavoriteLesson('les-3-1')}
                        className="absolute top-4 left-4 p-2 bg-white/40 hover:bg-white/65 rounded-full transition z-10 border border-teal-100"
                      >
                        <Heart className={`w-4 h-4 ${favoriteLessonIds.includes('les-3-1') ? 'fill-amber-500 text-amber-500' : 'text-teal-900/60'}`} />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                        {/* Left: 3D-like stacked flashcards */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center py-4">
                          <div className="relative w-32 h-24">
                            {/* Back Card */}
                            <div className="absolute top-4 left-4 w-28 h-18 bg-teal-100/60 rounded-xl shadow border border-teal-200/50 transform rotate-6 scale-95" />
                            {/* Middle Card */}
                            <div className="absolute top-2 left-2 w-28 h-18 bg-teal-50/80 rounded-xl shadow border border-teal-200/60 transform -rotate-3 scale-98" />
                            {/* Top Card */}
                            <div className="absolute top-0 left-0 w-28 h-18 bg-white rounded-xl shadow-lg border border-teal-300 flex flex-col items-center justify-center p-2 transform group-hover:-translate-y-2 group-hover:rotate-2 transition-all duration-300">
                              <span className="text-[10px] text-teal-600 font-bold">قانون كولوم</span>
                              <span className="text-sm font-black text-slate-800 font-mono mt-1">F = k × q₁q₂ / r²</span>
                              <div className="w-6 h-1 bg-teal-400 rounded-full mt-1.5" />
                            </div>
                          </div>
                        </div>

                        {/* Right: Info */}
                        <div className="md:col-span-7 space-y-4 text-right">
                          <span className="text-[10px] bg-white text-teal-800 border border-teal-250 px-2.5 py-1 rounded-full font-bold">بطاقات الحفظ والمراجعة</span>
                          <h3 className="text-lg font-black text-teal-950 mt-1">بطاقات الاستذكار السريع</h3>
                          <p className="text-xs text-teal-900/80 leading-relaxed font-semibold">
                            قوانين الكهرومغناطيسية والدوائر الكهربائية مجهزة ببطاقات تفاعلية ذكية لحفظ التعريفات والقوانين مع تغطية شاملة للمصطلحات.
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex justify-between items-center pt-4 border-t border-teal-200/60 mt-4">
                        <span className="text-[11px] text-teal-800">قيمة ثابت كولوم: ٨.٩٩ × ١٠⁹ ن.م²/ك²</span>
                        <button 
                          onClick={() => setActivePage('flashcards')}
                          className="px-5 py-2 bg-[#0c4a6e] hover:bg-sky-900 text-white transition font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95"
                        >
                          اختبر نفسك
                          <span>←</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 - Column 2: الباب الرابع */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-black text-slate-850 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
                      الباب الرابع: الفيزياء الحديثة والإلكترونيات
                    </h2>
                    
                    {/* Card 4: Bohr Atom transition simulator */}
                    <div className="relative overflow-hidden bg-violet-50 text-violet-950 rounded-3xl p-6 shadow-sm border border-violet-200 min-h-[290px] flex flex-col justify-between group">
                      {/* Top left favorite star */}
                      <button 
                        onClick={() => handleToggleFavoriteLesson('les-4-1')}
                        className="absolute top-4 left-4 p-2 bg-white hover:bg-white/90 rounded-full transition z-10 border border-violet-100"
                      >
                        <Heart className={`w-4 h-4 ${favoriteLessonIds.includes('les-4-1') ? 'fill-amber-500 text-amber-500' : 'text-violet-900/60'}`} />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                        {/* Left: Bohr Atom SVG Model */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
                          <div className="relative w-36 h-36 bg-white/80 rounded-full flex items-center justify-center border border-violet-200">
                            <span className="absolute top-1.5 right-2 text-[9px] font-black text-violet-500">نموذج بور للذرة</span>
                            
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144">
                              {/* Central Nucleus (Proton) */}
                              <circle cx="72" cy="72" r="8" fill="#ec4899" />
                              <text x="72" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">+</text>

                              {/* Orbit n=1 */}
                              <circle cx="72" cy="72" r="18" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="72" y="52" textAnchor="middle" fontSize="6" className="fill-violet-400 font-mono">n=1</text>

                              {/* Orbit n=2 */}
                              <circle cx="72" cy="72" r="34" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="72" y="36" textAnchor="middle" fontSize="6" className="fill-violet-400 font-mono">n=2</text>

                              {/* Orbit n=3 */}
                              <circle cx="72" cy="72" r="50" fill="none" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="72" y="20" textAnchor="middle" fontSize="6" className="fill-violet-400 font-mono">n=3</text>

                              {/* Orbit n=4 */}
                              <circle cx="72" cy="72" r="66" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" strokeDasharray="3 3" />
                              <text x="72" y="4" textAnchor="middle" fontSize="6" className="fill-violet-400 font-mono">n=4</text>

                              {/* Traveling Electron */}
                              {(() => {
                                const rad = (bohrElectronAngle * Math.PI) / 180;
                                const eX = 72 + Math.cos(rad) * bohrElectronRadius;
                                const eY = 72 + Math.sin(rad) * bohrElectronRadius;
                                return (
                                  <circle cx={eX} cy={eY} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                                );
                              })()}

                              {/* Emitted Photon wave */}
                              {bohrPhotonEmitted && (
                                <g transform={`translate(${72 + bohrPhotonX}, 72)`}>
                                  <path 
                                    d="M 0 0 Q 5 -8 10 0 T 20 0 T 30 0" 
                                    fill="none" 
                                    stroke={bohrPhotonColor} 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                  />
                                  {/* Wave head arrow */}
                                  <polygon points="30,-3 35,0 30,3" fill={bohrPhotonColor} />
                                </g>
                              )}
                            </svg>
                          </div>
                        </div>

                        {/* Right: Bohr configuration */}
                        <div className="md:col-span-7 space-y-2 text-right">
                          <span className="text-[10px] bg-white border border-violet-250 text-[#4338ca] px-2.5 py-1 rounded-full font-bold">الفيزياء الحديثة ومستويات الطاقة</span>
                          <h3 className="text-base font-black text-violet-950 mt-1">محاكاة انتقالات المدار الإلكتروني</h3>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                            <div>
                              <label className="text-[10px] text-violet-700 block mb-0.5 font-bold">المستوى النهائي (nf):</label>
                              <select 
                                value={bohrNf}
                                onChange={(e) => setBohrNf(parseInt(e.target.value))}
                                className="w-full p-1.5 bg-white border border-violet-200 rounded-lg text-xs text-slate-700 font-bold"
                                disabled={isBohrAnimating}
                              >
                                <option value={1}>n = 1 (Lyman)</option>
                                <option value={2}>n = 2 (Balmer)</option>
                                <option value={3}>n = 3 (Paschen)</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] text-violet-700 block mb-0.5 font-bold">المستوى الابتدائي (ni):</label>
                              <select 
                                value={bohrNi}
                                onChange={(e) => setBohrNi(parseInt(e.target.value))}
                                className="w-full p-1.5 bg-white border border-violet-200 rounded-lg text-xs text-slate-700 font-bold"
                                disabled={isBohrAnimating}
                              >
                                <option value={2}>n = 2</option>
                                <option value={3}>n = 3</option>
                                <option value={4}>n = 4</option>
                              </select>
                            </div>
                          </div>
                          
                          <p className="text-[10px] text-violet-800 leading-normal mt-1 min-h-[35px] bg-white/60 p-1.5 rounded-lg border border-violet-200/50 font-bold">
                            {bohrStatusText}
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex justify-between items-center pt-3 border-t border-violet-200 mt-3">
                        <span className="text-[11px] text-violet-800">En - Ef = h × v = hc / λ</span>
                        <button 
                          onClick={handleBohrTransition}
                          disabled={isBohrAnimating}
                          className="px-5 py-2 bg-[#0c4a6e] hover:bg-[#0369a1] text-white transition font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95 disabled:opacity-50"
                        >
                          {isBohrAnimating ? 'جاري المحاكاة...' : 'محاكاة الانتقال'}
                          <span>←</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Full-width Worksheet Generator */}
                  <div className="space-y-3 lg:col-span-2">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                      مولد أوراق العمل والامتحانات المخصصة
                    </h2>
                    
                    {/* Card 5: Worksheet Interactive Configurator */}
                    <div className="relative overflow-hidden bg-white text-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 min-h-[200px] flex flex-col justify-between group">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
                        
                        {/* Right / Left Side (Form Config) */}
                        <div className="md:col-span-7 space-y-3 text-right">
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-bold">أداة المدرس الفائقة</span>
                          <h3 className="text-base font-black text-slate-900 mt-1">توليد أوراق عمل ومراجعات A4 قابلة للطباعة فوراً</h3>
                          
                          {/* Quick Interactive selectors in the card */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-600 block">الباب الدراسي المخصص:</label>
                              <select 
                                value={wsChapter}
                                onChange={(e) => setWsChapter(e.target.value)}
                                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold"
                              >
                                <option value="all">كافة فصول المنهج الأربعة</option>
                                <option value="chap-1">الباب الأول: المجال الثقالي</option>
                                <option value="chap-2">الباب الثاني: الموجات والضوء</option>
                                <option value="chap-3">الباب الثالث: الكهربية والمغناطيسية</option>
                                <option value="chap-4">الباب الرابع: الفيزياء الحديثة والاتصالات</option>
                              </select>
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-600 block">نمط ونوع الأسئلة:</label>
                              <div className="flex gap-4 pt-2">
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name="wsType" 
                                    checked={wsType === 'choice'} 
                                    onChange={() => setWsType('choice')}
                                    className="accent-[#0c4a6e]" 
                                  />
                                  <span>اختيار متعدد</span>
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name="wsType" 
                                    checked={wsType === 'boolean'} 
                                    onChange={() => setWsType('boolean')}
                                    className="accent-[#0c4a6e]" 
                                  />
                                  <span>صح وخطأ واختبار فراغات</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Left / Right Side (Document graphic) */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center">
                          <div className="relative w-44 h-32 bg-white rounded-xl shadow-md border border-slate-200 p-3 overflow-hidden flex flex-row items-center justify-between transform group-hover:scale-105 transition duration-300">
                            {/* Watermark */}
                            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.06] rotate-12">
                              <span className="text-3xl font-black text-slate-900">مادة الفيزاء الصف الثاني ثانوي جمهورية السودان</span>
                            </div>
                            
                            {/* Mini PDF Icon Badge */}
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] px-1 rounded font-bold font-mono">PDF</div>

                            {/* Lines of mock quiz document */}
                            <div className="space-y-1.5 mt-2 flex-1">
                              <div className="w-24 h-2 bg-slate-400 rounded" />
                              <div className="w-16 h-1 bg-slate-300 rounded" />
                              <div className="space-y-1 pt-1.5">
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                  <div className="w-20 h-1 bg-slate-300 rounded" />
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                  <div className="w-16 h-1 bg-slate-300 rounded" />
                                </div>
                              </div>
                            </div>

                            <span className="text-[9px] text-center font-bold text-slate-400 border-r border-slate-150 pr-2 h-full flex items-center justify-center [writing-mode:vertical-rl] leading-none">ورقة عمل جاهزة للطبع</span>
                          </div>
                        </div>

                      </div>

                      {/* Action */}
                      <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-4">
                        <span className="text-[11px] text-slate-600 font-bold">مولد تلقائي متوافق مع معايير وزارة التعليم السعودية والمنهج المقرّر</span>
                        <button 
                          onClick={() => setActivePage('worksheets')}
                          className="px-5 py-2 bg-[#0c4a6e] hover:bg-sky-900 text-white transition font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95"
                        >
                          توليد ورقة العمل للطباعة
                          <span>←</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Quick law and stats panel */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#0c4a6e]" /> مراجعة سريعة للمصطلحات والقوانين الهامة
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <span className="font-black text-slate-800">قوة الجذب الكونية (ق):</span>
                      <p className="text-slate-500 font-semibold leading-relaxed">تتناسب القوة طردياً مع مضروب كتلتيهما وعكسياً مع مربع المسافة بين مركزيهما.</p>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-200 space-y-1" style={{ backgroundColor: '#060202' }}>
                      <span className="font-black text-white">الظاهرة الكهرضوئية:</span>
                      <p className="text-slate-300 font-semibold leading-relaxed">انبعاث إلكترونات حرة من الفلزات عند سقوط فوتونات بتردد يفوق التردد الحرج.</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <span className="font-black text-slate-800">سرعة الضوء (س):</span>
                      <p className="text-slate-500 font-semibold leading-relaxed">الثابت الكوني العام لسرعة انتشار الموجات الكهرومغناطيسية، وتساوي ٣ × ١٠⁸ م/ث.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Favorites View */}
            {activePage === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800">المفضلة والمستندات الخاصة بك</h2>
                    <p className="text-xs text-slate-500 mt-1">تصفح وقارئ الدروس والمصطلحات التي قمت بتمييزها كدروس مفضلة أثناء المذاكرة.</p>
                  </div>
                  {favoriteLessonIds.length > 0 && (
                    <button 
                      onClick={() => {
                        if (confirm('هل أنت متأكد من رغبتك في مسح كافة الدروس المفضلة؟')) {
                          setFavoriteLessonIds([]);
                          localStorage.setItem('physics_fav_lessons', JSON.stringify([]));
                        }
                      }}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition"
                    >
                      مسح كافة المفضلة
                    </button>
                  )}
                </div>

                {favoriteLessonIds.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto">
                      <Heart className="w-8 h-8 fill-transparent text-amber-500 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">صندوق المفضلة فارغ</h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto font-semibold">
                      أثناء تصفحك للمنهج وقراءة الدروس والمصطلحات في قسم "المصطلحات والقوانين"، اضغط على أيقونة النجمة أو القلب لحفظها هنا للوصول السريع إليها.
                    </p>
                    <button 
                      onClick={() => setActivePage('chapters')}
                      className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      تصفح المنهج والمصطلحات الآن
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {chaptersData.flatMap(c => c.lessons).filter(l => favoriteLessonIds.includes(l.id)).map(lesson => {
                      const chapter = chaptersData.find(c => c.lessons.some(l => l.id === lesson.id));
                      return (
                        <div key={lesson.id} className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <span className="text-[10px] bg-sky-50 dark:bg-zinc-800 text-sky-600 dark:text-sky-300 px-2 py-0.5 rounded-full font-bold">
                                {chapter?.title.split(':')[0]}
                              </span>
                              <button 
                                onClick={() => handleToggleFavoriteLesson(lesson.id)}
                                className="text-amber-500 hover:scale-110 transition"
                              >
                                <Heart className="w-5 h-5 fill-amber-500" />
                              </button>
                            </div>
                            <h4 className="text-base font-black text-slate-900 dark:text-white mt-3">{lesson.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">{lesson.subtitle}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {lesson.formulas.slice(0, 2).map((form, idx) => (
                                <span key={idx} className="text-[10px] bg-slate-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-800 px-2.5 py-1 rounded-lg font-mono text-slate-600 dark:text-zinc-300">
                                  {form.name}: {form.formula}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 mt-5 flex justify-between items-center">
                            <span className="text-[10px] text-gray-400">تاريخ الحفظ: {new Date().toLocaleDateString('ar-EG')}</span>
                            <button 
                              onClick={() => setActivePage('chapters')}
                              className="text-xs text-primary dark:text-sky-400 font-bold hover:underline"
                            >
                              افتح الشرح التفصيلي ←
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* 2. Chapters Overview */}
            {activePage === 'chapters' && (
              <ChaptersOverview
                favoriteLessonIds={favoriteLessonIds}
                onToggleFavoriteLesson={handleToggleFavoriteLesson}
              />
            )}

            {/* 3. Virtual Labs Page */}
            {activePage === 'labs' && <VirtualLabs />}

            {/* 4. Flashcards Study Tool */}
            {activePage === 'flashcards' && (
              <Flashcards favoriteIds={favoriteLessonIds} />
            )}

            {/* 5. Worksheets Generator Page */}
            {activePage === 'worksheets' && (
              <WorksheetGenerator favoriteLessonIds={favoriteLessonIds} />
            )}

            {/* 6. Quiz Testing App */}
            {activePage === 'quiz' && (
              <QuizApp favoriteLessonIds={favoriteLessonIds} setActivePage={setActivePage} />
            )}

            {/* 7. Numerical Problems Bank */}
            {activePage === 'problems' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <ProblemsBank />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Smart AI Assistant */}
        <SmartAssistant setActivePage={setActivePage} />

        {/* Footer */}
        <footer className={`py-6 px-8 border-t border-gray-200 dark:border-zinc-900 text-center text-xs text-gray-400 print:hidden mt-auto ${activePage === 'chapters' && focusMode ? 'hidden' : ''}`}>
          <span>نقلة للمناهج الإلكترونية © {new Date().getFullYear()} - منصة الفيزياء التفاعلية للشهادة الثانوية.</span>
        </footer>
      </div>
    </div>
  );
}
