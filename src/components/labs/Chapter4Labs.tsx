import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Activity, Zap } from 'lucide-react';

/* ==========================================================================
   Chapter 4, Lesson 1: Bohr's Atomic Model (les-4-1)
   ========================================================================== */
export function BohrModelLab() {
  const [nState, setNState] = useState<number>(3); // starts at shell n=3
  const [emittedPhoton, setEmittedPhoton] = useState<{ color: string; label: string } | null>(null);

  const transitionTo = (targetN: number) => {
    if (targetN === nState) return;

    if (targetN < nState) {
      // Photon is emitted! Calculate energy transition
      // E = -13.6 * (1/n_target^2 - 1/n_initial^2) eV
      const eInitial = -13.6 / (nState * nState);
      const eTarget = -13.6 / (targetN * targetN);
      const deltaE = Math.abs(eInitial - eTarget);

      // Map transitions to standard spectral lines (Balmer series etc.)
      let color = '#a855f7'; // default ultraviolet/violet
      let label = 'أشعة فوق بنفسجية (لا ترى)';

      if (targetN === 2) {
        if (nState === 3) {
          color = '#ef4444';
          label = 'طيف أحمر مرئي (ل = 656 نانومتر)';
        } else if (nState === 4) {
          color = '#38bdf8';
          label = 'طيف أزرق مخضر (ل = 486 نانومتر)';
        }
      } else if (targetN === 1) {
        label = 'سلسلة ليمان (أشعة فوق بنفسجية)';
        color = '#a855f7';
      }

      setEmittedPhoton({ color, label });
      setTimeout(() => setEmittedPhoton(null), 2500);
    }
    setNState(targetN);
  };

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: طيف ذرة الهيدروجين والقفزات الكمومية لبور</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">اختر المدار المستهدف لإحداث قفزة للإلكترون، ولاحظ انبعاث فوتونات الطيف بالألوان والترددات المطابقة لمعادلات بلانك وبور.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">مستويات طاقة ذرة بور</h5>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-500 block">انقر لنقل الإلكترون للمدار المستهدف:</label>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono font-bold">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => transitionTo(n)}
                    className={`py-2 px-1 rounded-xl border text-center transition ${
                      n === nState ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    n = {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Bohr formula display */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">طاقة المدار الإلكتروني (ط_ن):</div>
              <div className="font-bold text-purple-600">ط_ن = -١٣.٦ / ن² فولت</div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Nucleus */}
              <circle cx="100" cy="100" r="10" fill="#ef4444" />
              <text x="100" y="103" fill="#ffffff" textAnchor="middle" className="text-[7px] font-bold">نواة</text>

              {/* Electron Shells */}
              <circle cx="100" cy="100" r="30" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

              {/* Electron at active shell */}
              {/* radius = n * 20 + 10 */}
              <circle 
                cx="100" 
                cy={100 - (nState * 20 + 10)} 
                r="4.5" 
                fill="#38bdf8" 
                className="transition-all duration-300" 
              />

              {/* Animated Emitted Wave/Photon */}
              {emittedPhoton && (
                <path 
                  d={`M 100 ${100 - (nState * 20 + 10)} Q 120 40 160 30 Q 180 20 200 10`} 
                  fill="none" 
                  stroke={emittedPhoton.color} 
                  strokeWidth="2.5" 
                  className="animate-pulse"
                />
              )}
            </svg>

            {/* Photon emissions badge */}
            {emittedPhoton && (
              <div className="absolute bottom-4 left-4 right-4 bg-purple-950/80 border border-purple-500/30 p-2.5 rounded-xl text-center text-xs text-purple-300 font-bold">
                فوتون منبعث: {emittedPhoton.label}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 4, Lesson 2: Lasers (les-4-2)
   ========================================================================== */
export function LaserLab() {
  const [atomsState, setAtomsState] = useState<'ground' | 'metastable' | 'excited'>('ground');
  const [lasing, setLasing] = useState<boolean>(false);

  useEffect(() => {
    if (atomsState === 'excited') {
      const timer = setTimeout(() => {
        setLasing(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setLasing(false);
    }
  }, [atomsState]);

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: الانبعاث المستحث وإنتاج أشعة الليزر</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">قم بعملية الضخ الضوئي للذرات لتصل لحالة الإثارة والاستقرار شبه المستقر لتفعيل الإسكان المعكوس والحزم المتوافقة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">عملية الضخ الضوئي</h5>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-500 block">اضغط لتحديد طاقة الضخ للذرات المانحة:</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <button
                  onClick={() => setAtomsState('ground')}
                  className={`py-2 px-1 rounded-xl border text-center transition ${
                    atomsState === 'ground' ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  الوضع العادي
                </button>
                <button
                  onClick={() => setAtomsState('metastable')}
                  className={`py-2 px-1 rounded-xl border text-center transition ${
                    atomsState === 'metastable' ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  ضخ متوسط
                </button>
                <button
                  onClick={() => setAtomsState('excited')}
                  className={`py-2 px-1 rounded-xl border text-center transition ${
                    atomsState === 'excited' ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  ضخ فائق (إثارة)
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">شروط حدوث الليزر الأساسية:</div>
              <div className="font-bold text-red-500">١. الضخ الضوئي ٢. الإسكان المعكوس</div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {/* Cavity Mirrors */}
              <line x1="30" y1="40" x2="30" y2="160" stroke="#94a3b8" strokeWidth="6" />
              <text x="15" y="30" fill="#94a3b8" className="text-[8px] font-bold">مرآة كاملة</text>

              <line x1="270" y1="40" x2="270" y2="160" stroke="#cbd5e1" strokeWidth="3" />
              <text x="250" y="30" fill="#cbd5e1" className="text-[8px] font-bold">مرآة شبه منفذة</text>

              {/* Medium atoms */}
              {/* Ground positions Y=150, Excited positions Y=70 */}
              {Array.from({ length: 5 }).map((_, idx) => {
                const isExcited = atomsState === 'excited' || (atomsState === 'metastable' && idx % 2 === 0);
                const cy = isExcited ? 70 : 140;

                return (
                  <circle 
                    key={idx} 
                    cx={70 + idx * 40} 
                    cy={cy} 
                    r="10" 
                    fill={isExcited ? '#ef4444' : '#475569'} 
                    stroke="#ffffff" 
                    strokeWidth="1.5" 
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Coherent Laser Beam emission */}
              {lasing && (
                <g>
                  <line x1="30" y1="70" x2="270" y2="70" stroke="#f43f5e" strokeWidth="4" className="animate-pulse" />
                  {/* Exit laser beam out of half mirror */}
                  <line x1="270" y1="70" x2="300" y2="70" stroke="#f43f5e" strokeWidth="5" />
                </g>
              )}
            </svg>

            {/* Laser status */}
            <div className="absolute top-4 left-4">
              {lasing ? (
                <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30 animate-pulse">تضخيم ليزري منبعث (LASING)</span>
              ) : (
                <span className="bg-slate-500/10 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-500/20">لا يوجد انبعاث متماسك</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 4, Lesson 3: Nuclear Energy & Fission (les-4-3)
   ========================================================================== */
export function NuclearReactorLab() {
  const [rodsInsertion, setRodsInsertion] = useState<number>(50); // percentage
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [powerOutput, setPowerOutput] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        // Power output depends inversely on control rods insertion (rods absorb neutrons)
        const targetPower = (100 - rodsInsertion) * 12;
        setPowerOutput((prev) => prev + (targetPower - prev) * 0.1);
      }, 100);
    } else {
      setPowerOutput(0);
    }
    return () => clearInterval(timer);
  }, [isRunning, rodsInsertion]);

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: التحكم بقضبان الانشطار وتوليد الطاقة النووية</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تحكم بمدى إنزال قضبان التحكم لامتصاص النيوترونات الفائضة وحافظ على استقرار المفاعل النووي لتوليد طاقة كهربائية آمنة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">متحكمات قلب المفاعل</h5>

            {/* Rods Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>نسبة إدخال قضبان التحكم (الكادميوم)</span>
                <span className="font-mono text-emerald-600 font-bold">{rodsInsertion}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={rodsInsertion}
                onChange={(e) => setRodsInsertion(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition ${
                  isRunning ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isRunning ? 'إيقاف التفاعل' : 'تنشيط المفاعل'}
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {/* Reactor containment shield */}
              <rect x="50" y="30" width="200" height="140" rx="8" fill="none" stroke="#475569" strokeWidth="4" />

              {/* Fuel rods (Uranium) */}
              <rect x="80" y="60" width="15" height="100" fill="#f43f5e" rx="2" />
              <rect x="140" y="60" width="15" height="100" fill="#f43f5e" rx="2" />
              <rect x="200" y="60" width="15" height="100" fill="#f43f5e" rx="2" />

              {/* Control Rods (Cadmium) going down */}
              {/* Height of insertion represented by slider */}
              <rect x="110" y="30" width="12" height={10 + rodsInsertion * 0.9} fill="#3b82f6" rx="2" opacity="0.85" />
              <rect x="170" y="30" width="12" height={10 + rodsInsertion * 0.9} fill="#3b82f6" rx="2" opacity="0.85" />

              {/* Glowing radiation effect based on power output */}
              {powerOutput > 0 && (
                <rect x="52" y="32" width="196" height="136" fill="rgba(34, 197, 94, 0.1)" filter="drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))" style={{ opacity: powerOutput / 1200 }} />
              )}
            </svg>

            {/* Output Panel */}
            <div className="absolute top-4 right-4 text-[10px] text-slate-400 text-right bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-0.5">
              <div>إنتاجية الطاقة الكهربائية: <span className="font-mono text-emerald-400 font-bold">{powerOutput.toFixed(0)} ميجاواط</span></div>
              <div>حالة التفاعل: <span className="font-bold text-amber-500">
                {!isRunning ? 'متوقف مغلق' : rodsInsertion < 15 ? 'حرج فائق (تحذير صهر)' : rodsInsertion > 85 ? 'خامل فرعي' : 'تفاعل متسلسل آمن'}
              </span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 4, Lesson 4: EM Waves & Signal Modulation (les-4-4)
   ========================================================================== */
export function SignalModulationLab() {
  const [modType, setModType] = useState<'AM' | 'FM'>('AM');
  const [carrierFreq, setCarrierFreq] = useState<number>(8); // Hz
  const [audioFreq, setAudioFreq] = useState<number>(1.2);   // Hz

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: تعديل الموجات اللاسلكية تعديل السعة والتردد</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">قارن بين تعديل السعة (AM) وتعديل التردد (FM) لنقل الإشارات الصوتية والسمعية بأقل تشويش عبر الفضاء.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">أداة تعديل الترددات</h5>

            {/* Modulation selector */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">نوع تضمين وتعديل الإشارة:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setModType('AM')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    modType === 'AM' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  تعديل سعة (AM)
                </button>
                <button
                  onClick={() => setModType('FM')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    modType === 'FM' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  تعديل تردد (FM)
                </button>
              </div>
            </div>

            {/* Audio frequency */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>تردد إشارة الصوت المحمولة (هرتز)</span>
                <span className="font-mono text-blue-600 font-bold">{audioFreq} هرتز</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={audioFreq}
                onChange={(e) => setAudioFreq(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">الموجة المعدلة الناتجة:</div>
              <div className="font-bold text-blue-600">
                {modType === 'AM' ? 'س(ز) = [أ + ص(ز)] جا(٢ ط كـ ز)' : 'س(ز) = أ جا[٢ ط كـ ز + ص(ز)]'}
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {/* Oscillation curve drawing */}
              {/* We plot 300 points across the canvas */}
              <path 
                d={Array.from({ length: 300 }).map((_, x) => {
                  const t = x / 300;
                  const audioWave = Math.sin(2 * Math.PI * audioFreq * t);
                  let y = 100;

                  if (modType === 'AM') {
                    // Amplitude Modulation: Amplitude varies with audioWave
                    const modulatedAmp = 35 * (1 + 0.6 * audioWave);
                    y = 100 + modulatedAmp * Math.sin(2 * Math.PI * carrierFreq * t);
                  } else {
                    // Frequency Modulation: Phase/Freq varies with audioWave
                    const phaseOffset = 15 * audioWave;
                    y = 100 + 40 * Math.sin(2 * Math.PI * carrierFreq * t + phaseOffset);
                  }

                  return `${x === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="2" 
              />
            </svg>

            <div className="absolute top-4 left-4">
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded border border-blue-500/20">منظار رصد الموجات النشط</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 4, Lesson 5: Radio Tuning / Resonance (les-4-5)
   ========================================================================== */
export function RadioTuningLab() {
  const [inductance, setInductance] = useState<number>(40); // microHenrys
  const [capacitance, setCapacitance] = useState<number>(250); // picoFarads

  // Resonance frequency: fr = 1 / (2 * pi * sqrt(L * C))
  const totalL = inductance * 1e-6;
  const totalC = capacitance * 1e-12;
  const f_res_mhz = (1 / (2 * Math.PI * Math.sqrt(totalL * totalC))) / 1e6; // in MHz

  // Target radio station at 0.95 MHz (e.g. Broadcast Radio Sudan)
  const targetStationFreq = 0.95; 
  const tuneDelta = Math.abs(f_res_mhz - targetStationFreq);
  const isTuned = tuneDelta <= 0.05;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: رنين الاستقبال وضبط محطات الراديو والإرسال</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">حرك متحكمات المحاثة والسعة حتى يتوافق تردد الرنين لدائرة رنين الاستقبال مع تردد البث، لتتضح الإشارة وتتخلص من التشويش.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">مكثف ومحاثة الرنين</h5>

            {/* Inductance */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>المحاثة الكلية للملف ح (ميكروهنري)</span>
                <span className="font-mono text-blue-600 font-bold">{inductance} µH</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="2"
                value={inductance}
                onChange={(e) => setInductance(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Capacitance */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>سعة المكثف المتغير س (بيكوفاراد)</span>
                <span className="font-mono text-blue-600 font-bold">{capacitance} pF</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="5"
                value={capacitance}
                onChange={(e) => setCapacitance(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">صيغة التردد الرنيني (د_ر):</div>
              <div className="font-bold text-blue-600">د_ر = ١ / [٢ × ط × جذر(ح × س)]</div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between p-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400">تردد رنين الاستقبال الحالي:</span>
              <span className="text-sm font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {f_res_mhz.toFixed(3)} ميجاهرتز
              </span>
            </div>

            {/* Broadcast dial graph */}
            <div className="h-28 bg-slate-900 rounded-xl border border-slate-850 p-3 flex flex-col justify-end relative">
              <div className="absolute top-2 left-3 text-[9px] text-slate-400">البث المتاح: إذاعة السودان الوطنية المقررة (0.95 MHz)</div>

              {/* Tuning Dial marker */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-4/5 w-1 bg-red-500 z-10 transition-all duration-100" 
                style={{ left: `${(f_res_mhz / 2.0) * 100}%` }}
              />

              {/* Broadcast station marker */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-2/3 w-3 bg-blue-500/50 rounded z-0" 
                style={{ left: `${(0.95 / 2.0) * 100}%` }}
              />

              {/* Ruler lines */}
              <div className="border-t border-slate-700 pt-1 flex justify-between text-[8px] text-slate-500 font-mono">
                <span>0.0 MHz</span>
                <span>0.5 MHz</span>
                <span>1.0 MHz</span>
                <span>1.5 MHz</span>
                <span>2.0 MHz</span>
              </div>
            </div>

            <div className="text-center">
              {isTuned ? (
                <div className="text-emerald-400 text-xs font-bold animate-pulse">
                  🔊 تم الاستقبال بنجاح! إذاعة جمهورية السودان تعمل الآن بوضوح تام.
                </div>
              ) : (
                <div className="text-slate-500 text-xs font-semibold">
                  🔇 تشويش... يرجى ضبط مؤشر الرنين على تردد 0.95 ميجاهرتز.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
