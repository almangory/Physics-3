import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Activity, Zap, Compass } from 'lucide-react';

/* ==========================================================================
   Chapter 3, Lesson 1: Magnetism (les-3-1)
   ========================================================================== */
export function MagnetismLab() {
  const [magnetStrength, setMagnetStrength] = useState<number>(80); // in percentage
  const [compassPos, setCompassPos] = useState<{ x: number; y: number }>({ x: 150, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate magnetic field vector at point (x, y) relative to magnet center
  const magnetCenter = { x: 200, y: 100 };
  const nPole = { x: 140, y: 100 };
  const sPole = { x: 260, y: 100 };

  const dxN = compassPos.x - nPole.x;
  const dyN = compassPos.y - nPole.y;
  const distN3 = Math.pow(dxN * dxN + dyN * dyN, 1.5) || 1;

  const dxS = compassPos.x - sPole.x;
  const dyS = compassPos.y - sPole.y;
  const distS3 = Math.pow(dxS * dxS + dyS * dyS, 1.5) || 1;

  // Field B = (strength) * (r_hat_N / r_N^2 - r_hat_S / r_S^2)
  const bX = (dxN / distN3 - dxS / distS3) * (magnetStrength * 10);
  const bY = (dyN / distN3 - dyS / distS3) * (magnetStrength * 10);

  const angleRad = Math.atan2(bY, bX);
  const angleDeg = (angleRad * 180) / Math.PI;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCompassPos({ x, y });
  };

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: طيف المجال المغناطيسي وإبرة البوصلة التائهة</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">حرك مؤشر الفأرة (أو إصبعك) داخل الساحة لتتحكم في البوصلة وتراقب كيف تصطف الإبرة المغناطيسية دوماً مع خطوط المجال المغناطيسي المنبعثة من القطب الشمالي نحو الجنوبي.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم بالمغناطيس</h5>

            {/* Strength */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>شدة المغناطيس الطبيعي</span>
                <span className="font-mono text-emerald-600 font-bold">{magnetStrength}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={magnetStrength}
                onChange={(e) => setMagnetStrength(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-zinc-850">
              <span className="text-slate-500 font-bold block">مبدأ الانتشار المغناطيسي:</span>
              <p className="text-slate-600 dark:text-zinc-400">تخرج خطوط الفيض المغناطيسي من القطب الشمالي N وتدخل للقطب الجنوبي S في شكل مسارات مغلقة ومتكاملة.</p>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 cursor-crosshair flex items-center justify-center"
          >
            {/* Field lines representation (static background) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
              {/* Draw loops */}
              <ellipse cx="200" cy="100" rx="90" ry="40" fill="none" stroke="rgba(52, 211, 153, 0.12)" strokeWidth="1.5" />
              <ellipse cx="200" cy="100" rx="140" ry="70" fill="none" stroke="rgba(52, 211, 153, 0.08)" strokeWidth="1.5" />
              <ellipse cx="200" cy="100" rx="190" ry="100" fill="none" stroke="rgba(52, 211, 153, 0.05)" strokeWidth="1.5" />
            </svg>

            {/* Central Bar Magnet */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-10 rounded-lg overflow-hidden flex shadow-md border border-slate-700">
              <div className="w-1/2 bg-red-600 flex items-center justify-center font-black text-white text-sm font-sans">N</div>
              <div className="w-1/2 bg-blue-600 flex items-center justify-center font-black text-white text-sm font-sans">S</div>
            </div>

            {/* Floating Compass Indicator at compassPos */}
            <div 
              className="absolute w-10 h-10 rounded-full bg-slate-900 border border-emerald-400/40 shadow-lg flex items-center justify-center pointer-events-none transition-all duration-75"
              style={{ left: `${compassPos.x - 20}px`, top: `${compassPos.y - 20}px` }}
            >
              <div 
                className="w-8 h-8 rounded-full border border-slate-700 relative flex items-center justify-center"
                style={{ transform: `rotate(${angleDeg}deg)` }}
              >
                {/* Red pointer pointing to North */}
                <div className="absolute bottom-1/2 w-1 bg-red-500 rounded-t" style={{ height: '12px' }} />
                {/* Blue pointer pointing to South */}
                <div className="absolute top-1/2 w-1 bg-blue-500 rounded-b" style={{ height: '12px' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white z-10" />
              </div>
            </div>

            <div className="absolute bottom-3 left-3 text-[9px] text-slate-500 bg-black/60 px-2 py-1 rounded">
              حرك مؤشر الفأرة داخل الساحة لرصد المجال المغناطيسي بالبوصلة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 3, Lesson 2: Static Electricity (les-3-2)
   ========================================================================== */
export function StaticElectricityLab() {
  const [q1, setQ1] = useState<number>(4); // microCoulombs
  const [q2, setQ2] = useState<number>(-4); // microCoulombs
  const [distance, setDistance] = useState<number>(4); // meters

  const k = 8.9875e9;
  const f_magnitude = (k * Math.abs(q1 * 1e-6 * q2 * 1e-6)) / (distance * distance);
  const isAttractive = q1 * q2 < 0;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: قانون كولوم للقوى الكهربائية الساكنة</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تحقق من التناسب الطردي لقوى الجذب أو التنافر الكولومية مع حاصل ضرب الشحنات، والتناسب العكسي مع مربع المسافة الفاصلة بينهما.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم بالشحنات</h5>

            {/* Charge 1 Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>مقدار ونوع الشحنة الأولى (ش1)</span>
                <span className={`font-mono font-bold ${q1 > 0 ? 'text-red-500' : q1 < 0 ? 'text-blue-500' : 'text-slate-500'}`}>
                  {q1 > 0 ? `+${q1}` : q1} ميكروكولوم
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={q1}
                onChange={(e) => setQ1(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>

            {/* Charge 2 Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>مقدار ونوع الشحنة الثانية (ش2)</span>
                <span className={`font-mono font-bold ${q2 > 0 ? 'text-red-500' : q2 < 0 ? 'text-blue-500' : 'text-slate-500'}`}>
                  {q2 > 0 ? `+${q2}` : q2} ميكروكولوم
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={q2}
                onChange={(e) => setQ2(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Distance Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>المسافة الفاصلة بين الشحنتين (ف)</span>
                <span className="font-mono text-amber-600 font-bold">{distance} متر</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Coulomb formula display */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">صيغة قانون كولوم:</div>
              <div className="font-bold text-amber-600">ق = أ × |ش1 × ش2| / ف²</div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Charge Sphere 1 */}
              <g transform={`translate(${200 - distance * 15}, 100)`}>
                <circle cx="0" cy="0" r={12 + Math.abs(q1) * 1.2} fill={q1 >= 0 ? '#ef4444' : '#3b82f6'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="0" y="4" fill="#ffffff" textAnchor="middle" className="text-[9px] font-bold font-sans">
                  {q1 > 0 ? `+` : q1 < 0 ? '-' : '0'}
                </text>
              </g>

              {/* Charge Sphere 2 */}
              <g transform={`translate(${200 + distance * 15}, 100)`}>
                <circle cx="0" cy="0" r={12 + Math.abs(q2) * 1.2} fill={q2 >= 0 ? '#ef4444' : '#3b82f6'} stroke="#ffffff" strokeWidth="1.5" />
                <text x="0" y="4" fill="#ffffff" textAnchor="middle" className="text-[9px] font-bold font-sans">
                  {q2 > 0 ? `+` : q2 < 0 ? '-' : '0'}
                </text>
              </g>

              {/* Force vector arrows */}
              {q1 !== 0 && q2 !== 0 && (
                <g>
                  {isAttractive ? (
                    // Inward arrows
                    <g stroke="#eab308" strokeWidth="2.5" markerEnd="url(#arrow)">
                      <line x1={200 - distance * 15} y1="100" x2={200 - distance * 15 + 25} y2="100" />
                      <line x1={200 + distance * 15} y1="100" x2={200 + distance * 15 - 25} y2="100" />
                    </g>
                  ) : (
                    // Outward arrows
                    <g stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow)">
                      <line x1={200 - distance * 15} y1="100" x2={200 - distance * 15 - 25} y2="100" />
                      <line x1={200 + distance * 15} y1="100" x2={200 + distance * 15 + 25} y2="100" />
                    </g>
                  )}
                </g>
              )}
            </svg>

            {/* Results */}
            <div className="absolute top-4 left-4">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded border ${
                isAttractive ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {isAttractive ? 'قوة جاذبة متبادلة (تجاذب)' : 'قوة نافرة متبادلة (تنافر)'}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 text-right bg-black/40 p-2.5 rounded-xl">
              <div>القوة الكهرومغناطيسية ق: <span className="font-mono text-white font-bold">{f_magnitude.toFixed(3)} نيوتن</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 3, Lesson 3: Current Electricity / Ohm's Law (les-3-3)
   ========================================================================== */
export function CurrentElectricityLab() {
  const [voltage, setVoltage] = useState<number>(12); // V
  const [resistance, setResistance] = useState<number>(10); // Ohms
  const [ticks, setTicks] = useState<number>(0);

  const current = voltage / resistance; // I = V / R

  useEffect(() => {
    let timer: number;
    const run = () => {
      // Speed of electron flow is proportional to current
      setTicks((prev) => prev + current * 0.15);
      timer = requestAnimationFrame(run);
    };
    timer = requestAnimationFrame(run);
    return () => cancelAnimationFrame(timer);
  }, [current]);

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: معمل قانون أوم وسرعة انجراف الإلكترونات في الدوائر</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">راقب حركية التيار وسرعة تدفق شحنات الكهرباء الصفراء داخل السلك المغلق في الوقت الفعلي عند تغيير فرق الجهد أو مقاومة الحمل.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم بالدائرة</h5>

            {/* Voltage */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>جهد المصدر جـ (فولت)</span>
                <span className="font-mono text-yellow-500 font-bold">{voltage} فولت</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-yellow-500"
              />
            </div>

            {/* Resistance */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>مقاومة الحمل م (أوم)</span>
                <span className="font-mono text-yellow-500 font-bold">{resistance} أوم</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                step="1"
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full accent-yellow-500"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">صيغة قانون أوم الأساسية:</div>
              <div className="font-bold text-yellow-600">ت = جـ / م</div>
            </div>
          </div>
        </div>

        {/* Circuit Visualization */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Wire Loop (Rectangle path) */}
              <rect x="50" y="40" width="300" height="120" rx="10" fill="none" stroke="#334155" strokeWidth="12" />
              <rect x="50" y="40" width="300" height="120" rx="10" fill="none" stroke="#1e293b" strokeWidth="8" />

              {/* Battery at the bottom (X=200, Y=160) */}
              <g transform="translate(180, 150)">
                <rect x="0" y="0" width="40" height="20" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                <rect x="-6" y="5" width="6" height="10" fill="#1e293b" />
                <rect x="40" y="5" width="6" height="10" fill="#f43f5e" />
                <text x="20" y="14" fill="#1e293b" textAnchor="middle" className="text-[9px] font-black">+ -</text>
              </g>

              {/* Resistor zig-zag at the top (X=200, Y=40) */}
              <g transform="translate(160, 30)">
                <rect x="0" y="0" width="80" height="20" rx="4" fill="#3b82f6" />
                <text x="40" y="13" fill="#ffffff" textAnchor="middle" className="text-[8px] font-bold">مقاومة الحمل</text>
              </g>

              {/* Moving electrons inside wires based on ticks */}
              {Array.from({ length: 14 }).map((_, idx) => {
                // Loop around the wire perimeter (perimeter = 300*2 + 120*2 = 840)
                const perimeter = 840;
                const offset = (idx * (perimeter / 14) + ticks * 25) % perimeter;

                let cx = 50;
                let cy = 40;

                if (offset < 300) {
                  // top wire
                  cx = 50 + offset;
                  cy = 40;
                } else if (offset < 420) {
                  // right vertical
                  cx = 350;
                  cy = 40 + (offset - 300);
                } else if (offset < 720) {
                  // bottom wire
                  cx = 350 - (offset - 420);
                  cy = 160;
                } else {
                  // left vertical
                  cx = 50;
                  cy = 160 - (offset - 720);
                }

                return (
                  <circle key={idx} cx={cx} cy={cy} r="4" fill="#fbbf24" filter="drop-shadow(0 0 4px #eab308)" />
                );
              })}
            </svg>

            {/* Results */}
            <div className="absolute top-4 left-4 text-xs bg-black/50 p-3 rounded-xl border border-white/5 space-y-1">
              <div>شدة التيار ت: <span className="font-mono text-yellow-400 font-bold">{current.toFixed(3)} أمبير</span></div>
              <div>سعة استهلاك القدرة ط: <span className="font-mono text-amber-500">{(voltage * current).toFixed(1)} واط</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 3, Lesson 4: Magnetic Field of Current (les-3-4)
   ========================================================================== */
export function CurrentFieldLab() {
  const [current, setCurrent] = useState<number>(3); // Amperes
  const [wireStyle, setWireStyle] = useState<'straight' | 'solenoid'>('straight');

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: المجال المغناطيسي الناشئ عن تيار كهربائي</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تحقق من اتجاه دوائر خطوط المجال المغناطيسي وقاعدة اليد اليمنى لأورستد في الأسلاك المستقيمة والملفات الحلزونية.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">خيارات الموصل والمجال</h5>

            {/* Selector */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">شكل الموصل الحامل للتيار:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setWireStyle('straight')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    wireStyle === 'straight' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  سلك مستقيم طويل
                </button>
                <button
                  onClick={() => setWireStyle('solenoid')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    wireStyle === 'solenoid' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  ملف لولبي (حلزوني)
                </button>
              </div>
            </div>

            {/* Current Intensity */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>شدة واتجاه التيار ت (أمبير)</span>
                <span className="font-mono text-amber-600 font-bold">{current} أمبير</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">حساب كثافة الفيض الموضعي (ح):</div>
              <div className="font-bold text-amber-600">
                {wireStyle === 'straight' ? 'ح = م_ن × ت / (٢ × ط × ف)' : 'ح = م_ن × ت × ن_أ'}
              </div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {wireStyle === 'straight' ? (
                // Straight wire vertically crossing
                <g>
                  <line x1="150" y1="10" x2="150" y2="190" stroke="#fbbf24" strokeWidth="6" />
                  {/* Current flow arrows based on sign */}
                  {current > 0 ? (
                    <polygon points="150,40 144,55 156,55" fill="#ef4444" />
                  ) : current < 0 ? (
                    <polygon points="150,160 144,145 156,145" fill="#ef4444" />
                  ) : null}

                  {/* Concentric Magnetic field circles around wire */}
                  {current !== 0 && (
                    <g>
                      <ellipse cx="150" cy="100" rx="40" ry="12" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
                      <ellipse cx="150" cy="100" rx="70" ry="22" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    </g>
                  )}
                </g>
              ) : (
                // Solenoid winding
                <g>
                  {/* Solenoid loops */}
                  <path d="M 60 100 Q 80 50 100 100 T 140 100 T 180 100 T 220 100 T 260 100" fill="none" stroke="#fbbf24" strokeWidth="4" />
                  {/* Central field lines representing uniform bar magnet field inside */}
                  {current !== 0 && (
                    <g>
                      <line x1="40" y1="100" x2="280" y2="100" stroke="#60a5fa" strokeWidth="2" />
                      <line x1="40" y1="85" x2="280" y2="85" stroke="#60a5fa" strokeWidth="1.5" opacity="0.7" />
                      <line x1="40" y1="115" x2="280" y2="115" stroke="#60a5fa" strokeWidth="1.5" opacity="0.7" />
                    </g>
                  )}
                </g>
              )}
            </svg>

            {/* Indicator badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded border border-blue-500/20">تأثير أورستد الكهرومغناطيسي</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
