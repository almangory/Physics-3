import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Compass, Activity, Sunrise } from 'lucide-react';

/* ==========================================================================
   Chapter 1, Lesson 1: Gravity Field & Free Fall (les-1-1)
   ========================================================================== */
export function GravityLab() {
  const [altitude, setAltitude] = useState<number>(0); // in km
  const [planet, setPlanet] = useState<'earth' | 'moon' | 'mars' | 'jupiter'>('earth');
  const [isFalling, setIsFalling] = useState<boolean>(false);
  const [fallTime, setFallTime] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [fallDistance, setFallDistance] = useState<number>(0); // percentage fallen

  const G = 6.6743e-11;
  const planetData = {
    earth: { name: 'الأرض', mass: 5.972e24, radius: 6371 },
    moon: { name: 'القمر', mass: 7.342e22, radius: 1737 },
    mars: { name: 'المريخ', mass: 6.39e23, radius: 3389 },
    jupiter: { name: 'المشتري', mass: 1.898e27, radius: 69911 },
  };

  const activePlanet = planetData[planet];
  const r_total = (activePlanet.radius + altitude) * 1000; // in meters
  const localG = (G * activePlanet.mass) / (r_total * r_total); // g = GM/R^2

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFalling) {
      const interval = 50; // ms
      let elapsed = 0;
      timer = setInterval(() => {
        elapsed += interval / 1000;
        setFallTime(elapsed);
        
        // s = 0.5 * g * t^2 (arbitrary high tower of 200m for visual demo)
        const totalHeight = 200; 
        const d = 0.5 * localG * elapsed * elapsed;
        
        if (d >= totalHeight) {
          setIsFalling(false);
          setFallDistance(100);
          setVelocity(localG * Math.sqrt((2 * totalHeight) / localG));
          clearInterval(timer);
        } else {
          setFallDistance((d / totalHeight) * 100);
          setVelocity(localG * elapsed);
        }
      }, interval);
    }
    return () => clearInterval(timer);
  }, [isFalling, localG]);

  const handleStartFall = () => {
    setFallTime(0);
    setVelocity(0);
    setFallDistance(0);
    setIsFalling(true);
  };

  const handleReset = () => {
    setIsFalling(false);
    setFallTime(0);
    setVelocity(0);
    setFallDistance(0);
  };

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: محاكاة شدة الجاذبية والسقوط الحر</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">تحقق من تغير عجلة الجاذبية الموضعية تبعاً لكتلة الكوكب والارتفاع عن سطحه، وقس سرعة ارتطام مسبار السقوط الحر.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم بالمتغيرات</h5>
            
            {/* Planet selector */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-500 block">الكوكب أو الجرم السماوي:</label>
              <select
                value={planet}
                onChange={(e) => { setPlanet(e.target.value as any); handleReset(); }}
                className="w-full p-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-xs font-bold"
              >
                <option value="earth">كوكب الأرض</option>
                <option value="moon">القمر</option>
                <option value="mars">كوكب المريخ</option>
                <option value="jupiter">كوكب المشتري</option>
              </select>
            </div>

            {/* Altitude Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>الارتفاع عن السطح (كلم)</span>
                <span className="font-mono text-sky-600">{altitude} كلم</span>
              </div>
              <input
                type="range"
                min="0"
                max="20000"
                step="100"
                value={altitude}
                onChange={(e) => { setAltitude(Number(e.target.value)); handleReset(); }}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Equation Display */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800">
              <div className="text-[10px] text-slate-400 mb-1">صيغة حساب الجاذبية الموضعية:</div>
              <div className="text-sm font-bold text-sky-700 dark:text-sky-400">g = G × M / (R + h)²</div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleStartFall}
                disabled={isFalling}
                className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" /> إسقاط المسبار
              </button>
              <button
                onClick={handleReset}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> إعادة ضبط
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer & Metrics */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
            {/* Atmosphere representation */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 via-slate-950 to-slate-950" />
            
            {/* Planet surface */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-800 border-t border-slate-700 flex items-center justify-center z-10">
              <span className="text-[10px] font-bold text-slate-400">سطح {activePlanet.name}</span>
            </div>

            {/* Falling Probe */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-6 h-10 flex flex-col items-center transition-all duration-75"
              style={{ top: `${15 + (fallDistance * 0.6)}%` }}
            >
              <div className="w-3 h-5 bg-sky-400 rounded-t-full relative">
                {isFalling && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-4 bg-gradient-to-b from-amber-500 to-transparent animate-bounce" />
                )}
              </div>
              <div className="w-5 h-1.5 bg-slate-500 rounded-full -mt-1" />
            </div>

            {/* Visual altitude context info */}
            <div className="absolute top-4 right-4 text-right text-[10px] text-slate-400 space-y-1 bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div>كتلة الكوكب: <span className="font-mono text-white">{(activePlanet.mass / 1e24).toFixed(2)} × 10²⁴ كجم</span></div>
              <div>نصف قطر الكوكب: <span className="font-mono text-white">{activePlanet.radius} كلم</span></div>
              <div>عجلة الجاذبية الموضعية: <span className="font-mono text-emerald-400 font-bold">{localG.toFixed(4)} م/ث²</span></div>
            </div>
          </div>

          {/* Metrics panel */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 block mb-1">زمن السقوط</span>
              <span className="text-sm font-black text-slate-800 dark:text-white font-mono">{fallTime.toFixed(3)} ث</span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 block mb-1">سرعة الارتطام</span>
              <span className="text-sm font-black text-sky-600 font-mono">{velocity.toFixed(2)} م/ث</span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 block mb-1">طاقة الحركة النهائية</span>
              <span className="text-sm font-black text-emerald-600 font-mono">{(0.5 * 10 * velocity * velocity).toFixed(0)} جول</span>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Scholar Context Card */}
      <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/50 p-4 rounded-2xl text-right">
        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950/50 px-2 py-0.5 rounded-full">إضاءة تاريخية وعلمية</span>
        <p className="text-xs text-slate-700 dark:text-zinc-300 mt-2 leading-relaxed">
          يعد العالم المسلم <strong>أبو الفتح عبد الرحمن الخازني</strong> (في كتابه ميزان الحكمة) من رواد دراسة التثاقل والجاذبية، حيث قرر أن الأجسام تنجذب نحو مركز الأرض، وأن قوة جذب الأجرام تختلف باختلاف بعد الجسم عن مركز الجذب، وهو ما مهد لقانون التربيع العكسي لاحقاً.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 1, Lesson 2: Circular Motion & Banked Curves (les-1-2)
   ========================================================================== */
export function CircularMotionLab() {
  const [speed, setSpeed] = useState<number>(60); // km/h
  const [radius, setRadius] = useState<number>(50); // meters
  const [angle, setAngle] = useState<number>(15); // degrees

  const g = 9.8;
  const v_mps = speed / 3.6; // convert km/h to m/s
  const acc_c = (v_mps * v_mps) / radius; // Centripetal acc = v^2/r

  // Safe Speed on Banked Curve with friction coefficient mu = 0.2
  const mu = 0.2;
  const angleRad = (angle * Math.PI) / 180;
  const safeSpeedMaxMps = Math.sqrt((g * radius * (Math.tan(angleRad) + mu)) / (1 - mu * Math.tan(angleRad)));
  const safeSpeedMaxKmh = safeSpeedMaxMps * 3.6;

  const isSafe = speed <= safeSpeedMaxKmh;

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: محاكاة قوة الطرد وجاذبية المنعطفات المائلة</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">اضبط سرعة المركبة ونصف قطر المنعطف لتلاحظ اتجاهات القوى ومتى تفقد المركبة استقرارها وتنزلق خارج الطريق.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة التحكم</h5>

            {/* Speed Input */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>سرعة السيارة (كلم/ساعة)</span>
                <span className={`font-mono font-bold ${isSafe ? 'text-emerald-600' : 'text-red-500'}`}>{speed} كلم/س</span>
              </div>
              <input
                type="range"
                min="10"
                max="140"
                step="5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Radius Input */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>نصف قطر المنعطف (متر)</span>
                <span className="font-mono text-indigo-600">{radius} م</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Banking Angle Input */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>زاوية ميلان المنعطف (درجات)</span>
                <span className="font-mono text-indigo-600">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Formula box */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl text-center font-mono border border-slate-200 dark:border-zinc-800 text-xs">
              <div className="text-[10px] text-slate-400 mb-1">تسارع الجذب المركزي (جـ_ج):</div>
              <div className="font-bold text-indigo-600">أ_ج = ع² / نق</div>
            </div>
          </div>
        </div>

        {/* Visualizer & Metrics */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-end p-6">
            {/* Draw Banked Curve Cross-Section */}
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <svg className="w-4/5 h-3/4 overflow-visible" viewBox="0 0 400 200">
                {/* Slope line based on angle */}
                {/* Slope angle drawing */}
                <path 
                  d={`M 50 180 L 350 ${180 - 300 * Math.sin(angleRad)} L 350 180 Z`} 
                  fill="none" 
                  stroke="#475569" 
                  strokeWidth="2" 
                />
                <path 
                  d={`M 50 180 L 350 ${180 - 300 * Math.sin(angleRad)} L 350 180 Z`} 
                  fill="url(#slope-grad)" 
                />

                {/* Car Box representing the car */}
                <g transform={`translate(200, ${180 - 150 * Math.sin(angleRad) - 15}) rotate(${-angle}, 0, 0)`}>
                  {/* Car body */}
                  <rect x="-25" y="-12" width="50" height="20" rx="4" fill={isSafe ? '#6366f1' : '#f43f5e'} className="transition-colors duration-200" />
                  <rect x="-15" y="-22" width="30" height="11" rx="2" fill="#e2e8f0" />
                  {/* Wheels */}
                  <circle cx="-15" cy="10" r="6" fill="#1e293b" />
                  <circle cx="15" cy="10" r="6" fill="#1e293b" />

                  {/* Vectors representing Forces */}
                  {/* Weight Vector downward */}
                  <line x1="0" y1="0" x2="0" y2="40" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="5" y="35" fill="#f43f5e" className="text-[10px] font-bold">الوزن (و)</text>

                  {/* Normal Force Vector perpendicular to slope */}
                  <line x1="0" y1="0" x2="0" y2="-45" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="5" y="-35" fill="#34d399" className="text-[10px] font-bold">قوة الفعل (ر)</text>

                  {/* Centripetal force vector towards center of curvature (left) */}
                  <line x1="0" y1="0" x2="-45" y2="0" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow)" />
                  <text x="-45" y="-5" fill="#fbbf24" className="text-[10px] font-bold">ق_ج</text>
                </g>

                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                  <linearGradient id="slope-grad" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#475569" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Status Indicator */}
            <div className="absolute top-4 left-4">
              {isSafe ? (
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">انعطاف آمن ومستقر</span>
              ) : (
                <span className="bg-red-500/15 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-500/30 animate-pulse">خطر انزلاق السيارة!</span>
              )}
            </div>

            <div className="absolute top-4 right-4 text-[10px] text-slate-400 text-right bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-1">
              <div>السرعة المسموحة القصوى للمنعطف: <span className="font-mono text-emerald-400 font-bold">{safeSpeedMaxKmh.toFixed(1)} كلم/س</span></div>
              <div>العجلة المركزية المسلطة: <span className="font-mono text-indigo-400">{acc_c.toFixed(2)} م/ث²</span></div>
            </div>
          </div>

          {/* Detailed results */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 block mb-1">نسبة معامل الأمان</span>
              <span className={`text-sm font-black font-mono ${(safeSpeedMaxKmh / speed) >= 1 ? 'text-emerald-600' : 'text-red-500'}`}>
                {(safeSpeedMaxKmh / speed).toFixed(2)}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 block mb-1">القوة الطاردة المركزية المعادلة (لوزن 1طن)</span>
              <span className="text-sm font-black text-indigo-600 font-mono">{(acc_c * 1000).toFixed(0)} نيوتن</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Chapter 1, Lesson 3: Kepler's Laws & Satellite Orbits (les-1-3)
   ========================================================================== */
export function OrbitSatelliteLab() {
  const [altitude, setAltitude] = useState<number>(1000); // km
  const [launchSpeed, setLaunchSpeed] = useState<number>(7.5); // km/s
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [orbitState, setOrbitState] = useState<'stable' | 'crashed' | 'escaped' | 'idle'>('idle');
  const [angle, setAngle] = useState<number>(0);
  const [distanceFactor, setDistanceFactor] = useState<number>(1);
  const animationRef = useRef<number | null>(null);

  const R_Earth = 6371;
  const G = 6.6743e-11;
  const M_Earth = 5.972e24;

  const totalRadius = R_Earth + altitude; // in km
  // Circular Orbit speed: v = sqrt(GM/r)
  const v_circular = Math.sqrt((G * M_Earth) / (totalRadius * 1000)) / 1000; // in km/s
  const escapeSpeed = v_circular * Math.sqrt(2); // Escape speed v = circular_speed * sqrt(2)

  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let localDistanceFactor = distanceFactor;
    let localAngle = angle;

    const animate = () => {
      // T = 2pi*r / v
      const orbitalPeriodInSecs = (2 * Math.PI * totalRadius) / launchSpeed;
      const step = (360 / orbitalPeriodInSecs) * 0.2;

      if (launchSpeed < v_circular * 0.9) {
        localDistanceFactor -= 0.005;
        if (localDistanceFactor <= 0.45) {
          localDistanceFactor = 0.45;
          setDistanceFactor(0.45);
          setOrbitState('crashed');
          setIsRunning(false);
          return;
        }
        localAngle = (localAngle + step) % 360;
        setDistanceFactor(localDistanceFactor);
        setAngle(localAngle);
      } else if (launchSpeed > escapeSpeed * 0.99) {
        localDistanceFactor += 0.008;
        if (localDistanceFactor >= 2.0) {
          localDistanceFactor = 2.0;
          setDistanceFactor(2.0);
          setOrbitState('escaped');
          setIsRunning(false);
          return;
        }
        localAngle = (localAngle + step) % 360;
        setDistanceFactor(localDistanceFactor);
        setAngle(localAngle);
      } else {
        setOrbitState('stable');
        const eccentricity = Math.abs(launchSpeed - v_circular) / v_circular;
        localAngle = (localAngle + step) % 360;
        const displayAngle = (localAngle + eccentricity * Math.sin((localAngle * Math.PI) / 180)) % 360;
        setAngle(displayAngle);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, launchSpeed, totalRadius, v_circular, escapeSpeed]);

  const handleLaunch = () => {
    setAngle(0);
    setDistanceFactor(1);
    setOrbitState('idle');
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setAngle(0);
    setDistanceFactor(1);
    setOrbitState('idle');
  };

  const baseRadius = 55 + (altitude / 36000) * 45;
  const currentRadius = baseRadius * distanceFactor;
  const radians = (angle * Math.PI) / 180;
  const satX = currentRadius * Math.cos(radians);
  const satY = currentRadius * Math.sin(radians);

  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
        <h4 className="font-black text-slate-800 dark:text-white mb-2 text-sm">التجربة التفاعلية: قوانين كبلر ومدارات الأقمار الاصطناعية</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400">حدد ارتفاع الإطلاق وسرعة الدفع الأولي، واكتشف كيف يحدد المدار ومسار الدوران تبعاً لقوانين كبلر وقانون الجذب العام للكون.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-4">
            <h5 className="font-bold text-xs text-slate-700 dark:text-zinc-300">لوحة تحكم كبلر والمدارات</h5>

            {/* Altitude */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>ارتفاع مدار القمر (كلم)</span>
                <span className="font-mono text-sky-600 font-bold">{altitude} كلم</span>
              </div>
              <input
                type="range"
                min="400"
                max="36000"
                step="200"
                value={altitude}
                onChange={(e) => { setAltitude(Number(e.target.value)); handleReset(); }}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Launch Speed */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>سرعة الإطلاق المبدئية (كلم/ثانية)</span>
                <span className="font-mono text-sky-600 font-bold">{launchSpeed} كلم/ث</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="13.0"
                step="0.1"
                value={launchSpeed}
                onChange={(e) => { setLaunchSpeed(Number(e.target.value)); handleReset(); }}
                className="w-full accent-sky-600"
              />
            </div>

            {/* Calculations Info */}
            <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl space-y-1.5 text-xs border border-slate-200 dark:border-zinc-850">
              <div className="flex justify-between">
                <span className="text-slate-500">السرعة الدائرية المطلوبة:</span>
                <span className="font-mono text-emerald-600 font-bold">{v_circular.toFixed(2)} كلم/ث</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">سرعة الإفلات المحددة:</span>
                <span className="font-mono text-amber-600 font-bold">{escapeSpeed.toFixed(2)} كلم/ث</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleLaunch}
                disabled={isRunning}
                className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" /> إطلاق للقمر
              </button>
              <button
                onClick={handleReset}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" /> إعادة ضبط
              </button>
            </div>
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Stars Background */}
            <div className="absolute inset-0 opacity-45 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            <svg className="w-full h-full" viewBox="-150 -150 300 300">
              {/* Central Earth */}
              <circle cx="0" cy="0" r="32" fill="#2563eb" stroke="#60a5fa" strokeWidth="2.5" />
              <circle cx="-10" cy="-10" r="8" fill="#22c55e" opacity="0.6" />
              <circle cx="12" cy="14" r="10" fill="#22c55e" opacity="0.6" />

              {/* Kepler area sweep sector (second law display) */}
              {isRunning && orbitState === 'stable' && (
                <path 
                  d={`M 0 0 L ${satX} ${satY} A ${currentRadius} ${currentRadius} 0 0 1 ${currentRadius * Math.cos(radians - 0.2)} ${currentRadius * Math.sin(radians - 0.2)} Z`} 
                  fill="rgba(251, 191, 36, 0.25)" 
                />
              )}

              {/* Circular Path Guideline */}
              <circle cx="0" cy="0" r={baseRadius} fill="none" stroke="#ffffff" strokeDasharray="3,6" opacity="0.15" />

              {/* Satellite Indicator */}
              <g transform={`translate(${satX}, ${satY})`}>
                <circle cx="0" cy="0" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
                <rect x="-11" y="-2" width="6" height="4" fill="#38bdf8" rx="1" />
                <rect x="5" y="-2" width="6" height="4" fill="#38bdf8" rx="1" />
              </g>

              {/* Orbits path lines */}
              {orbitState === 'escaped' && (
                <path d={`M 0 ${baseRadius} Q 50 ${baseRadius * 1.5} 120 120`} fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" />
              )}
            </svg>

            {/* Orbit Result status */}
            <div className="absolute top-4 left-4">
              {orbitState === 'idle' && (
                <span className="bg-slate-500/10 text-slate-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-500/20">بانتظار الإطلاق</span>
              )}
              {orbitState === 'stable' && (
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">مدار كبلري مستقر</span>
              )}
              {orbitState === 'crashed' && (
                <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-500/20">السقوط والارتطام بالأرض!</span>
              )}
              {orbitState === 'escaped' && (
                <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/20">إفلات وهروب من الجاذبية</span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 bg-black/50 p-2.5 rounded-xl border border-white/5 space-y-0.5">
              <div>كبلر الثاني: <span className="text-amber-400">تساوي المساحات الممسوحة بأوقات متساوية.</span></div>
              <div>السرعة المدارية الحالية: <span className="font-mono text-white">{launchSpeed.toFixed(2)} كلم/ث</span></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 block mb-1">الارتفاع المداري الكلي</span>
              <span className="text-sm font-black text-slate-800 dark:text-white font-mono">{totalRadius} كلم</span>
            </div>
            <div className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl text-center">
              <span className="text-[10px] text-slate-400 block mb-1">الزمن الدوري المقدر للثورة الكاملة</span>
              <span className="text-sm font-black text-indigo-600 font-mono">
                {((2 * Math.PI * totalRadius) / launchSpeed / 60).toFixed(1)} دقيقة
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
