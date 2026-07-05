import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Activity, Volume2, HelpCircle } from 'lucide-react';

/* ==========================================================================
   Chapter 2, Lesson 1: Simple Harmonic Motion / Damped Pendulum (les-2-1)
   ========================================================================== */
export function PendulumLab() {
  const [length, setLength] = useState<number>(1.2); // meters
  const [damping, setDamping] = useState<number>(0.1); 
  const [startAngle, setStartAngle] = useState<number>(45); // degrees
  const [angle, setAngle] = useState<number>(45); // degrees (current live angle)
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [ke, setKe] = useState<number>(0);
  const [pe, setPe] = useState<number>(100);

  const stateRef = useRef({ theta: (45 * Math.PI) / 180, omega: 0, t: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Map length in meters (0.5m - 2.5m) to visual length in pixels (60px - 160px)
  const visualLength = 60 + ((length - 0.5) / (2.5 - 0.5)) * 100;

  // Theoretical physics calculations
  const g = 9.8;
  const theoreticalPeriod = 2 * Math.PI * Math.sqrt(length / g);
  const theoreticalFrequency = 1 / theoreticalPeriod;

  useEffect(() => {
    if (!isRunning) return;

    const interval = 16; // ms for smoother 60fps-like animation
    const dt = interval / 1000;

    const timer = setInterval(() => {
      const state = stateRef.current;
      // Damped harmonic motion equation: d^2(theta)/dt^2 + damping*d(theta)/dt + (g/L)*sin(theta) = 0
      const alpha = -(g / length) * Math.sin(state.theta) - damping * state.omega;
      state.omega += alpha * dt;
      state.theta += state.omega * dt;

      // Potential energy mgh = g * L * (1 - cos(theta))
      const currentPe = g * length * (1 - Math.cos(state.theta));
      // Kinetic energy 0.5 * v^2 = 0.5 * (L * omega)^2
      const currentKe = 0.5 * (length * state.omega) * (length * state.omega);

      const total = currentPe + currentKe;
      if (total > 0.0001) {
        setPe((currentPe / total) * 100);
        setKe((currentKe / total) * 100);
      } else {
        setPe(0);
        setKe(0);
      }

      setAngle((state.theta * 180) / Math.PI);
    }, interval);

    return () => clearInterval(timer);
  }, [isRunning, length, damping]);

  // Drag interaction handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsRunning(false);
    setIsDragging(true);
    handleDragMove(e);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const pivotX = rect.left + rect.width / 2;
    // Since pivot is at Y=20 in a 200 viewBox, we use 20 / 200 = 10% of height
    const pivotY = rect.top + (20 / 200) * rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - pivotX;
    const y = clientY - pivotY;

    if (y <= 5) return; // Prevent division/extreme angles near pivot

    // Calculate angle from vertical downwards axis
    const angleRad = Math.atan2(x, y);
    let angleDeg = (angleRad * 180) / Math.PI;
    angleDeg = Math.max(-85, Math.min(85, angleDeg));

    // Calculate length based on drag distance converted to viewBox units
    const scale = 200 / rect.width;
    const distScreen = Math.sqrt(x * x + y * y);
    const distViewBox = distScreen * scale;

    const clippedDist = Math.max(60, Math.min(160, distViewBox));
    const newLength = 0.5 + ((clippedDist - 60) / 100) * 2.0;

    // Update simulation state
    const roundedLength = Math.max(0.5, Math.min(2.5, Number(newLength.toFixed(1))));
    setLength(roundedLength);
    setStartAngle(Math.round(angleDeg));
    setAngle(angleDeg);
    stateRef.current = { theta: angleRad, omega: 0, t: 0 };
    setPe(100);
    setKe(0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: البندول التوافقي المخمد وحفظ الطاقة</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تحقق من التناوب الدوري لطاقتي الحركة والوضع للبندول ومعدل تبدد الطاقة الكلية بمرور الزمن نتيجة مقاومة الهواء.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم بالبندول</h5>

            {/* Length slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>طول خيط البندول (متر)</span>
                <span className="font-mono text-indigo-600 font-bold">{length.toFixed(1)} م</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={length}
                onChange={(e) => {
                  const l = Number(e.target.value);
                  setLength(l);
                  setIsRunning(false);
                  setAngle(startAngle);
                  stateRef.current = { theta: (startAngle * Math.PI) / 180, omega: 0, t: 0 };
                  setPe(100);
                  setKe(0);
                }}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Damping slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>معامل إخماد مقاومة الهواء (الاحتكاك)</span>
                <span className="font-mono text-indigo-600 font-bold">{damping}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.05"
                value={damping}
                onChange={(e) => {
                  const d = Number(e.target.value);
                  setDamping(d);
                  setIsRunning(false);
                  setAngle(startAngle);
                  stateRef.current = { theta: (startAngle * Math.PI) / 180, omega: 0, t: 0 };
                  setPe(100);
                  setKe(0);
                }}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Start Angle slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>زاوية البدء / الإزاحة القصوى (درجة)</span>
                <span className="font-mono text-indigo-600 font-bold">{startAngle}°</span>
              </div>
              <input
                type="range"
                min="-85"
                max="85"
                step="5"
                value={startAngle}
                onChange={(e) => {
                  const a = Number(e.target.value);
                  setStartAngle(a);
                  setAngle(a);
                  setIsRunning(false);
                  stateRef.current = { theta: (a * Math.PI) / 180, omega: 0, t: 0 };
                  setPe(100);
                  setKe(0);
                }}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Calculations & Formulas panel */}
            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block">الحسابات الفيزيائية اللحظية:</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <span className="text-[9px] text-slate-400 block">الزمن الدوري (T)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">{theoreticalPeriod.toFixed(2)} ثانية</span>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <span className="text-[9px] text-slate-400 block">التردد النظري (f)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">{theoreticalFrequency.toFixed(2)} هرتز</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 ${
                  isRunning ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning ? 'إيقاف مؤقت' : 'بدء الحركة'}
              </button>
              <button
                onClick={() => {
                  setIsRunning(false);
                  setAngle(startAngle);
                  stateRef.current = { theta: (startAngle * Math.PI) / 180, omega: 0, t: 0 };
                  setPe(100);
                  setKe(0);
                }}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" /> إعادة ضبط
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer & Energy Bar */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center">
            {/* Guide message */}
            <div className="absolute top-3 left-4 right-4 text-center z-10 pointer-events-none">
              <span className="bg-slate-900/90 border border-slate-800 text-[10px] text-indigo-300 px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
                💡 يمكنك سحب ثقل البندول مباشرة لتغيير طول الخيط وزاوية البدء!
              </span>
            </div>

            {/* Draw Pendulum Bob */}
            <svg 
              ref={svgRef}
              className="w-full h-3/4 overflow-visible cursor-grab active:cursor-grabbing" 
              viewBox="0 0 200 200"
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              onTouchCancel={handleDragEnd}
            >
              {/* Protractor guidelines */}
              <line x1="100" y1="20" x2="100" y2="190" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <path
                d="M 60 20 A 40 40 0 0 0 140 20"
                fill="none"
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

              {/* Angle ticks on protractor */}
              {[-60, -45, -30, -15, 0, 15, 30, 45, 60].map((tick) => {
                const rad = (tick * Math.PI) / 180;
                return (
                  <g key={tick}>
                    <line
                      x1={100 + 35 * Math.sin(rad)}
                      y1={20 + 35 * Math.cos(rad)}
                      x2={100 + 42 * Math.sin(rad)}
                      y2={20 + 42 * Math.cos(rad)}
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    <text
                      x={100 + 48 * Math.sin(rad)}
                      y={20 + 48 * Math.cos(rad) + 3}
                      fill="#64748b"
                      fontSize="7"
                      textAnchor="middle"
                      className="font-mono select-none"
                    >
                      {tick}°
                    </text>
                  </g>
                );
              })}

              {/* Swing range dotted path */}
              <path
                d={`M ${100 + visualLength * Math.sin(-85 * Math.PI / 180)} ${20 + visualLength * Math.cos(-85 * Math.PI / 180)} A ${visualLength} ${visualLength} 0 0 1 ${100 + visualLength * Math.sin(85 * Math.PI / 180)} ${20 + visualLength * Math.cos(85 * Math.PI / 180)}`}
                fill="none"
                stroke="#1e293b"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />

              {/* Pivot block */}
              <rect x="90" y="19" width="20" height="4" fill="#475569" rx="1" />
              <circle cx="100" cy="20" r="3.5" fill="#94a3b8" />

              {/* Pendulum structure rotating dynamically */}
              <g transform={`translate(100, 20) rotate(${angle})`}>
                {/* Length markings along the string */}
                {[0.5, 1.0, 1.5, 2.0, 2.5].map((tickLen) => {
                  if (tickLen > length) return null;
                  const tickY = 60 + ((tickLen - 0.5) / (2.5 - 0.5)) * 100;
                  return (
                    <line
                      key={tickLen}
                      x1="-4"
                      y1={tickY}
                      x2="4"
                      y2={tickY}
                      stroke="#818cf8"
                      strokeWidth="1.2"
                      opacity="0.6"
                    />
                  );
                })}

                {/* Pendulum string line */}
                <line 
                  x1="0" 
                  y1="0" 
                  x2="0" 
                  y2={visualLength} 
                  stroke={isDragging ? '#818cf8' : '#6366f1'} 
                  strokeWidth={isDragging ? '3.5' : '2.5'} 
                  className="transition-colors duration-150"
                />

                {/* Length text label */}
                <text
                  x="14"
                  y={visualLength / 2 + 3}
                  fill="#818cf8"
                  fontSize="9"
                  fontWeight="bold"
                  className="font-mono select-none"
                  transform={`rotate(${-angle}, 14, ${visualLength / 2 + 3})`}
                >
                  {length.toFixed(1)} م
                </text>

                {/* Pendulum bob (interactive circle) */}
                <circle 
                  cx="0" 
                  cy={visualLength} 
                  r="14" 
                  fill="#6366f1" 
                  stroke="#818cf8" 
                  strokeWidth="3.5" 
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  className="cursor-grab active:cursor-grabbing hover:scale-110 active:scale-110 transition-transform duration-150 shadow-lg"
                />

                {/* Metallic center core */}
                <circle 
                  cx="0" 
                  cy={visualLength} 
                  r="4" 
                  fill="#ffffff" 
                  opacity="0.8"
                  className="pointer-events-none"
                />
              </g>

              {/* Current angle label near bob */}
              <text
                x={100 + 1.25 * visualLength * Math.sin((angle * Math.PI) / 180)}
                y={20 + 1.25 * visualLength * Math.cos((angle * Math.PI) / 180) + 4}
                fill="#818cf8"
                fontSize="10"
                fontWeight="black"
                textAnchor="middle"
                className="font-mono select-none"
              >
                {Math.round(angle)}°
              </text>
            </svg>

            {/* Energy Bars visual */}
            <div className="absolute bottom-3 left-4 right-4 bg-black/85 p-3 rounded-xl border border-white/5 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    طاقة الوضع (PE)
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{pe.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-75" style={{ width: `${pe}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    طاقة الحركة (KE)
                  </span>
                  <span className="font-mono text-indigo-400 font-bold">{ke.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-75" style={{ width: `${ke}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 2, Lesson 2: Wave Propagation (les-2-2)
   ========================================================================== */
export function WavePropagationLab() {
  const [waveType, setWaveType] = useState<'transverse' | 'longitudinal'>('transverse');
  const [freq, setFreq] = useState<number>(1.5); // Hz
  const [wavelength, setWavelength] = useState<number>(60); // px
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let timer: number;
    const run = () => {
      setTime((prev) => prev + 0.05);
      timer = requestAnimationFrame(run);
    };
    timer = requestAnimationFrame(run);
    return () => cancelAnimationFrame(timer);
  }, []);

  const pointsCount = 25;
  const speed = freq * wavelength;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: انتشار الموجات الميكانيكية الطولية والمستعرضة</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تأمل حركة ذرات الوسط في كلا النوعين، ولاحظ ثبات ذرات المادة في مواضعها مع انتقال الطاقة والاضطراب الموجي للأمام.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">خيارات الانتشار</h5>

            {/* Toggle Wave Type */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">نوع الموجة الاهتزازية:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setWaveType('transverse')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    waveType === 'transverse' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  موجة مستعرضة
                </button>
                <button
                  onClick={() => setWaveType('longitudinal')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    waveType === 'longitudinal' ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  موجة طولية
                </button>
              </div>
            </div>

            {/* Frequency Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>التردد الاهتزازي د (هيرتز)</span>
                <span className="font-mono text-amber-600 font-bold">{freq} هرتز</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={freq}
                onChange={(e) => setFreq(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Wavelength Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>الطول الموجي ل (متر/بكسل)</span>
                <span className="font-mono text-amber-600 font-bold">{wavelength} بكسل</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="5"
                value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Equations box */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">سرعة انتشار الاضطراب (ع):</div>
              <div className="font-bold text-amber-600">ع = د × ل = {speed.toFixed(0)} بكسل/ث</div>
            </div>
          </div>
        </div>

        {/* Display Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
            <svg className="w-full h-1/2 overflow-visible" viewBox="0 -50 400 100">
              {Array.from({ length: pointsCount }).map((_, idx) => {
                const x0 = (idx / (pointsCount - 1)) * 380 + 10;
                // Wave function y = A * sin(kx - wt)
                const phase = (x0 / wavelength) - (freq * time);
                const offset = 22 * Math.sin(phase * 2 * Math.PI);

                const cx = waveType === 'longitudinal' ? x0 + offset : x0;
                const cy = waveType === 'transverse' ? offset : 0;

                // Mark a central red particle to show that particles do not move across the screen
                const isReference = idx === Math.floor(pointsCount / 2);

                return (
                  <circle 
                    key={idx} 
                    cx={cx} 
                    cy={cy} 
                    r={isReference ? 5.5 : 4} 
                    fill={isReference ? '#ef4444' : '#fbbf24'} 
                    stroke={isReference ? '#ffffff' : 'none'}
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {/* Small helper info */}
            <div className="absolute bottom-4 right-4 text-[9px] text-slate-400 bg-black/60 p-2 rounded-xl">
              تتحرك <span className="text-red-400 font-bold">الذرة الحمراء المرجعية</span> اهتزازياً حول موضع سكونها فقط!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 2, Lesson 3: Sound & Doppler Effect (les-2-3)
   ========================================================================== */
export function DopplerLab() {
  const [sourceSpeed, setSourceSpeed] = useState<number>(150); // m/s
  const [waveCount, setWaveCount] = useState<number>(0);
  const [wavefronts, setWavefronts] = useState<{ cx: number; r: number }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setWavefronts((prev) => {
        // Grow radii, remove very large ones, append new wave at origin
        const updated = prev
          .map((wf) => ({ cx: wf.cx - (sourceSpeed / 200), r: wf.r + 3 }))
          .filter((wf) => wf.r < 180);
        return [{ cx: 100, r: 5 }, ...updated];
      });
    }, 200);

    return () => clearInterval(timer);
  }, [sourceSpeed]);

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: تأثير دوبلر وانضغاط موجات الصوت</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">راقب كيف يزداد التردد وتتقارب جبهات موجات الصوت من جهة المستمع الأمامي وتقل وتتباعد من الخلف بسبب سرعة مصدر الصوت.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم</h5>

            {/* Velocity input */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>سرعة الطائرة المصدر (متر/ثانية)</span>
                <span className="font-mono text-emerald-600 font-bold">{sourceSpeed} م/ث</span>
              </div>
              <input
                type="range"
                min="0"
                max="340"
                step="10"
                value={sourceSpeed}
                onChange={(e) => setSourceSpeed(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="p-3.5 bg-sky-50 dark:bg-zinc-950 border border-sky-100 dark:border-zinc-800 rounded-xl text-xs space-y-1">
              <span className="font-bold text-sky-800 dark:text-sky-300 block">معادلة دوبلر للمستمع الأمامي:</span>
              <p className="font-mono font-bold text-center text-emerald-600">دَ = د [ع_صوت / (ع_صوت - ع_مصدر)]</p>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Receiver symbol on the left (Front) */}
              <g transform="translate(40, 100)">
                <circle cx="0" cy="0" r="10" fill="#38bdf8" />
                <path d="M-5 -5 L5 -5 L0 -12 Z" fill="#ffffff" />
                <text x="15" y="4" fill="#38bdf8" className="text-[10px] font-bold">مستمع (أ)</text>
              </g>

              {/* Draw wavefronts */}
              {wavefronts.map((wf, idx) => (
                <circle
                  key={idx}
                  cx={200 + wf.cx}
                  cy={100}
                  r={wf.r}
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.45)"
                  strokeWidth="1.5"
                />
              ))}

              {/* Speaker plane emitting waves */}
              <g transform={`translate(${200 + 100}, 100)`}>
                <polygon points="0,-12 -20,-4 -20,4 0,12 15,0" fill="#f43f5e" />
                <rect x="-30" y="-3" width="10" height="6" fill="#f43f5e" />
              </g>
            </svg>

            <div className="absolute top-4 left-4">
              {sourceSpeed >= 330 ? (
                <span className="bg-red-500/15 text-red-400 text-[9px] font-bold px-2 py-0.5 rounded border border-red-500/30 animate-pulse">تجاوز جدار الصوت (Sonic Boom)</span>
              ) : (
                <span className="bg-sky-500/10 text-sky-400 text-[9px] font-bold px-2 py-0.5 rounded border border-sky-500/20">دوبلر الصوتي نشط</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 2, Lesson 4: Refraction & Prism Dispersion (les-2-4)
   ========================================================================== */
export function RefractionLab() {
  const [angle, setAngle] = useState<number>(45); // incidence angle
  const [n1, setN1] = useState<number>(1.0); // air
  const [n2, setN2] = useState<number>(1.5); // glass/water

  const radiansIn = (angle * Math.PI) / 180;
  // Snell's Law: n1 * sin(theta1) = n2 * sin(theta2)
  const ratio = (n1 * Math.sin(radiansIn)) / n2;
  const criticalAngleRad = n1 > n2 ? Math.asin(n2 / n1) : null;
  const isTir = n1 > n2 && radiansIn > (criticalAngleRad || 0);

  const radiansOut = isTir ? radiansIn : Math.asin(ratio);
  const angleOut = isTir ? angle : (radiansOut * 180) / Math.PI;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: قانون سنل للبصريات والانعكاس الكلي الداخلي</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تحقق من زاوية الانكسار عند الانتقال بين الأوساط المختلفة وراقب حدوث الانعكاس الكلي الداخلي عند السقوط بزاوية أكبر من الزاوية الحرجة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم البصرية</h5>

            {/* Incidence Angle */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>زاوية السقوط م_1 (درجة)</span>
                <span className="font-mono text-amber-600 font-bold">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                step="1"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Medium 1 Index */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>معامل انكسار الوسط الأول (ن1)</span>
                <span className="font-mono text-amber-600 font-bold">{n1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.4"
                step="0.05"
                value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Medium 2 Index */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>معامل انكسار الوسط الثاني (ن2)</span>
                <span className="font-mono text-amber-600 font-bold">{n2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.4"
                step="0.05"
                value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">معادلة سنل للانكسار:</div>
              <div className="font-bold text-amber-600">ن1 × جا(م_1) = ن2 × جا(م_2)</div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {/* Interface boundary line at Y=100 */}
              <rect x="0" y="100" width="300" height="100" fill="rgba(38, 99, 235, 0.15)" />
              <line x1="0" y1="100" x2="300" y2="100" stroke="#475569" strokeWidth="2" />
              <line x1="150" y1="20" x2="150" y2="180" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />

              {/* Labels for mediums */}
              <text x="15" y="40" fill="#94a3b8" className="text-[10px] font-bold">الوسط الأول (ن1)</text>
              <text x="15" y="140" fill="#60a5fa" className="text-[10px] font-bold">الوسط الثاني (ن2)</text>

              {/* Incident Ray */}
              {/* x_incident = 150 - 80 * tan(theta1) */}
              <line 
                x1={150 - 80 * Math.tan(radiansIn)} 
                y1="20" 
                x2="150" 
                y2="100" 
                stroke="#f59e0b" 
                strokeWidth="2.5" 
              />

              {/* Refracted / Reflected Ray */}
              {isTir ? (
                // Reflected ray due to TIR
                <line 
                  x1="150" 
                  y1="100" 
                  x2={150 + 80 * Math.tan(radiansIn)} 
                  y2="20" 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                />
              ) : (
                // Standard refracted ray
                <line 
                  x1="150" 
                  y1="100" 
                  x2={150 + 80 * Math.tan(radiansOut)} 
                  y2="180" 
                  stroke="#3b82f6" 
                  strokeWidth="2.5" 
                />
              )}
            </svg>

            {/* Critical angle and TIR badge */}
            <div className="absolute top-4 left-4">
              {isTir ? (
                <span className="bg-red-500/15 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded border border-red-500/30 animate-pulse">انعكاس كلي داخلي!</span>
              ) : (
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded border border-emerald-500/20">انكسار ضوئي قياسي</span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 text-right bg-black/40 p-2 rounded-xl">
              <div>زاوية الانكسار م_2: <span className="font-mono text-white font-bold">{isTir ? 'انعكاس كامل' : `${angleOut.toFixed(1)}°`}</span></div>
              {criticalAngleRad && (
                <div>الزاوية الحرجة م_ح: <span className="font-mono text-amber-500 font-bold">{((criticalAngleRad * 180) / Math.PI).toFixed(1)}°</span></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 2, Lesson 5: Thin Lenses (les-2-5)
   ========================================================================== */
export function ThinLensesLab() {
  const [lensType, setLensType] = useState<'convex' | 'concave'>('convex');
  const [focalLength, setFocalLength] = useState<number>(50); // px
  const [objectDistance, setObjectDistance] = useState<number>(110); // px
  const [objectHeight, setObjectHeight] = useState<number>(40); // px

  const f = lensType === 'convex' ? focalLength : -focalLength;
  // thin lens formula: 1/s + 1/s' = 1/f => s' = (f * s) / (s - f)
  const isAtFocalPoint = objectDistance === focalLength;
  const imageDistance = isAtFocalPoint ? Infinity : (f * objectDistance) / (objectDistance - f);
  const m = isAtFocalPoint ? Infinity : -imageDistance / objectDistance;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: معمل هندسة ومسارات الأشعة في العدسات الرقيقة</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">حرك الجسم المضيء واكتشف كيفية تشكل الصور الحقيقية والمقلوبة أو التقديرية المعتدلة بناءً على موقع الجسم بالنسبة للبؤرة.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">العدسة والمسافات</h5>

            {/* Toggle Lens */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">نوع العدسة الرقيقة:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setLensType('convex')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    lensType === 'convex' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  عدسة محدبة (لامة)
                </button>
                <button
                  onClick={() => setLensType('concave')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    lensType === 'concave' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  عدسة مقعرة (مفرقة)
                </button>
              </div>
            </div>

            {/* Object Distance */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>بعد الجسم عن العدسة (س)</span>
                <span className="font-mono text-indigo-600 font-bold">{objectDistance} سم</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="2"
                value={objectDistance}
                onChange={(e) => setObjectDistance(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Focal Length */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>البعد البؤري للعدسة (ع)</span>
                <span className="font-mono text-indigo-600 font-bold">{focalLength} سم</span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Equations box */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">صيغة القانون العام للعدسات:</div>
              <div className="font-bold text-indigo-600">١ / س + ١ / ص = ١ / ع</div>
            </div>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Optical Axis */}
              <line x1="10" y1="100" x2="390" y2="100" stroke="#475569" strokeWidth="1.5" />
              
              {/* Lens drawing at X=200 */}
              {lensType === 'convex' ? (
                <path d="M 200 30 Q 212 100 200 170 Q 188 100 200 30" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2" />
              ) : (
                <path d="M 190 30 L 210 30 Q 198 100 210 170 L 190 170 Q 202 100 190 30" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2" />
              )}

              {/* Focal points */}
              <circle cx={200 - focalLength} cy="100" r="3" fill="#fbbf24" />
              <text x={200 - focalLength - 5} y="115" fill="#fbbf24" className="text-[8px] font-mono">ب</text>
              <circle cx={200 + focalLength} cy="100" r="3" fill="#fbbf24" />
              <text x={200 + focalLength - 5} y="115" fill="#fbbf24" className="text-[8px] font-mono">بَ</text>

              {/* Object drawing at X=200-objectDistance */}
              <line x1={200 - objectDistance} y1="100" x2={200 - objectDistance} y2={100 - objectHeight} stroke="#38bdf8" strokeWidth="3.5" />
              <polygon points={`${200 - objectDistance},-objectHeight ${200 - objectDistance - 4},-objectHeight+8 ${200 - objectDistance + 4},-objectHeight+8`} fill="#38bdf8" transform={`translate(0, ${100 - objectHeight})`} />

              {/* Image drawing */}
              {!isAtFocalPoint && Math.abs(imageDistance) < 250 && (
                <line 
                  x1={200 + imageDistance} 
                  y1="100" 
                  x2={200 + imageDistance} 
                  y2={100 + (objectHeight * m)} 
                  stroke="#ef4444" 
                  strokeWidth="2.5" 
                  strokeDasharray={imageDistance < 0 ? '3,3' : 'none'}
                />
              )}
            </svg>

            <div className="absolute top-4 right-4 text-[10px] text-slate-400 text-right bg-black/40 p-2.5 rounded-xl">
              <div>بعد الصورة ص: <span className="font-mono text-emerald-400 font-bold">{isAtFocalPoint ? 'في اللانهاية' : `${imageDistance.toFixed(1)} سم`}</span></div>
              <div>قوة التكبير ت: <span className="font-mono text-white">{isAtFocalPoint ? 'لا نهائي' : `${Math.abs(m).toFixed(2)} مرة`}</span></div>
              <div>وصف الصورة: <span className="font-bold text-amber-500">
                {isAtFocalPoint ? 'أشعة متوازية' : imageDistance < 0 ? 'تقديرية معتدلة مكبرة' : 'حقيقية مقلوبة'}
              </span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 2, Lesson 6: Optical Instruments (les-2-6)
   ========================================================================== */
export function OpticalInstrumentsLab() {
  const [instrument, setInstrument] = useState<'telescope' | 'microscope'>('telescope');
  const [fObj, setFObj] = useState<number>(100); // focal length of objective
  const [fEye, setFEye] = useState<number>(30);  // focal length of eyepiece

  const totalLength = fObj + fEye;
  const magnification = fObj / fEye;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: محاكاة المنظار الكاسر والتلسكوب الفلكي لكبلر</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تتبع مسار حزم الضوء الواردة عبر العدسة الشيئية ذات البعد البؤري الكبير والعدسة العينية المكبرة، واحسب قوة التكبير وطول الأنبوب.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">إعدادات الجهاز البصري</h5>

            {/* Instrument Select */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">نوع الجهاز البصري:</label>
              <select
                value={instrument}
                onChange={(e) => setInstrument(e.target.value as any)}
                className="w-full p-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs font-bold"
              >
                <option value="telescope">التلسكوب الفلكي الكاسر (رصد الكواكب)</option>
                <option value="microscope">المجهر المركب (رؤية الخلايا والأجسام القريبة)</option>
              </select>
            </div>

            {/* Focal Obj */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>البعد البؤري للعدسة الشيئية (ف_ش)</span>
                <span className="font-mono text-sky-600 font-bold">{fObj} ملم</span>
              </div>
              <input
                type="range"
                min="60"
                max="120"
                step="5"
                value={fObj}
                onChange={(e) => setFObj(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Focal Eye */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>البعد البؤري للعدسة العينية (ف_ع)</span>
                <span className="font-mono text-sky-600 font-bold">{fEye} ملم</span>
              </div>
              <input
                type="range"
                min="15"
                max="40"
                step="5"
                value={fEye}
                onChange={(e) => setFEye(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs space-y-1">
              <div className="text-[10px] text-slate-400 mb-1">قوانين التكبير والتركيب للتلسكوب الكاسر:</div>
              <div className="font-bold text-sky-700 dark:text-sky-300">قوة التكبير ت = ف_ش / ف_ع = {magnification.toFixed(2)} مرة</div>
              <div className="font-bold text-emerald-600 text-[10px]">طول الأنبوب ل = ف_ش + ف_ع = {totalLength} ملم</div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Optical Axis */}
              <line x1="10" y1="100" x2="390" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />

              {/* Objective Lens at X=80 */}
              <path d="M 80 40 Q 90 100 80 160 Q 70 100 80 40" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
              <text x="60" y="30" fill="#38bdf8" className="text-[8px] font-bold">الشيئية (ف_ش)</text>

              {/* Eyepiece Lens at X = 80 + fObj + fEye */}
              <path d={`M ${80 + totalLength * 1.5} 60 Q ${80 + totalLength * 1.5 + 8} 100 ${80 + totalLength * 1.5} 140 Q ${80 + totalLength * 1.5 - 8} 100 ${80 + totalLength * 1.5} 60`} fill="rgba(56, 189, 248, 0.2)" stroke="#0284c7" strokeWidth="2" />
              <text x={80 + totalLength * 1.5 - 20} y="50" fill="#0284c7" className="text-[8px] font-bold">العينية (ف_ع)</text>

              {/* Ray Tracing lines showing magnification */}
              <line x1="20" y1="60" x2="80" y2="100" stroke="#e0f2fe" strokeWidth="1" opacity="0.6" />
              <line x1="20" y1="100" x2="80" y2="100" stroke="#e0f2fe" strokeWidth="1" opacity="0.6" />
              <line x1="20" y1="140" x2="80" y2="100" stroke="#e0f2fe" strokeWidth="1" opacity="0.6" />

              {/* Traced ray from Objective to focus */}
              <line x1="80" y1="40" x2={80 + fObj * 1.5} y2="100" stroke="#fbbf24" strokeWidth="1.5" />
              <line x1="80" y1="160" x2={80 + fObj * 1.5} y2="100" stroke="#fbbf24" strokeWidth="1.5" />
            </svg>

            <div className="absolute top-4 left-4">
              <span className="bg-sky-500/10 text-sky-400 text-[10px] font-bold px-2.5 py-1 rounded border border-sky-500/20">تركيز مسار كبلر الفلكي</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 2, Lesson 7: Curved Mirrors (les-2-7)
   ========================================================================== */
export function CurvedMirrorsLab() {
  const [mirrorType, setMirrorType] = useState<'concave' | 'convex'>('concave');
  const [focalLength, setFocalLength] = useState<number>(60); // px
  const [objectDistance, setObjectDistance] = useState<number>(100); // px

  const f = mirrorType === 'concave' ? focalLength : -focalLength;
  const isAtFocal = objectDistance === focalLength;
  const imageDistance = isAtFocal ? Infinity : (f * objectDistance) / (objectDistance - f);
  const m = isAtFocal ? Infinity : -imageDistance / objectDistance;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: معمل المرايا الكروية وانعكاس الضوء</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">لاحظ انعكاس حزم الأشعة وموقع تكون الصور وخلفية تكونها (حقيقية أمام المرآة أو خيالية تقديرية خلف المرآة).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">المرآة والمسافات</h5>

            {/* Mirror Selector */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">نوع المرآة الكروية:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setMirrorType('concave')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    mirrorType === 'concave' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  مرآة مقعرة (مجمعة)
                </button>
                <button
                  onClick={() => setMirrorType('convex')}
                  className={`py-2 px-3 rounded-xl border text-center transition ${
                    mirrorType === 'convex' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  مرآة محدبة (مفرقة)
                </button>
              </div>
            </div>

            {/* Object Distance */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>بعد الجسم عن قطب المرآة (س)</span>
                <span className="font-mono text-indigo-600 font-bold">{objectDistance} سم</span>
              </div>
              <input
                type="range"
                min="20"
                max="180"
                step="2"
                value={objectDistance}
                onChange={(e) => setObjectDistance(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Equation Box */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">صيغة القانون العام للمرايا:</div>
              <div className="font-bold text-indigo-600">١ / س + ١ / ص = ١ / ع</div>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Optical Axis */}
              <line x1="10" y1="100" x2="390" y2="100" stroke="#475569" strokeWidth="1.5" />

              {/* Mirror Curve on the right (X=250) */}
              {mirrorType === 'concave' ? (
                <path d="M 250 30 Q 230 100 250 170" fill="none" stroke="#6366f1" strokeWidth="4" />
              ) : (
                <path d="M 230 30 Q 250 100 230 170" fill="none" stroke="#6366f1" strokeWidth="4" />
              )}

              {/* Object */}
              <line x1={250 - objectDistance} y1="100" x2={250 - objectDistance} y2="60" stroke="#38bdf8" strokeWidth="3" />
              <circle cx={250 - objectDistance} cy="60" r="3" fill="#38bdf8" />

              {/* Image drawing */}
              {!isAtFocal && Math.abs(imageDistance) < 200 && (
                <g>
                  <line 
                    x1={250 - imageDistance} 
                    y1="100" 
                    x2={250 - imageDistance} 
                    y2={100 + (40 * m)} 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeDasharray={imageDistance < 0 ? '3,3' : 'none'}
                  />
                  <circle cx={250 - imageDistance} cy={100 + (40 * m)} r="3.5" fill="#ef4444" />
                </g>
              )}
            </svg>

            <div className="absolute top-4 right-4 text-[10px] text-slate-400 text-right bg-black/40 p-2.5 rounded-xl">
              <div>بعد الصورة ص عن المرآة: <span className="font-mono text-emerald-400 font-bold">{isAtFocal ? 'في اللانهاية' : `${imageDistance.toFixed(1)} سم`}</span></div>
              <div>صفة الصورة: <span className="font-bold text-amber-500">
                {isAtFocal ? 'لا تتكون صورة' : imageDistance < 0 ? 'خيالية تقديرية (خلف المرآة)' : 'حقيقية مقلوبة (أمام المرآة)'}
              </span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
