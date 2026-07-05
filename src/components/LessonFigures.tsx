// Custom Physics Vector Diagrams for "Naqia" Platform
// Highly polished vector SVGs styled like an immersive blueprint laboratory board

export function getSvgForFigure(figId: string): string | null {
  switch (figId) {
    case '2-7':
      // Photoelectric Cell
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Grid lines for blueprint effect -->
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <!-- Glass Bulb -->
          <circle cx="220" cy="100" r="60" fill="rgba(14, 165, 233, 0.03)" stroke="#38bdf8" stroke-width="2" stroke-dasharray="120 5 10 5" />
          <path d="M 220 160 L 220 180" stroke="#38bdf8" stroke-width="2" />
          
          <!-- Cathode (C) -->
          <path d="M 175 60 A 45 45 0 0 0 175 140" fill="none" stroke="#f43f5e" stroke-width="4" stroke-linecap="round" />
          <text x="160" y="105" fill="#f43f5e" font-size="10" font-weight="bold" font-family="sans-serif">المهبط (C)</text>
          
          <!-- Anode (A) -->
          <line x1="225" y1="50" x2="225" y2="150" stroke="#10b981" stroke-width="3" stroke-linecap="round" />
          <text x="235" y="105" fill="#10b981" font-size="10" font-weight="bold" font-family="sans-serif">المصعد (A)</text>
          
          <!-- Light Rays -->
          <path d="M 110 50 L 165 75 M 105 80 L 165 100 M 110 110 L 165 115" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow)" />
          <text x="100" y="40" fill="#fbbf24" font-size="10" font-weight="bold">الأشعة الضوئية (f)</text>
          
          <!-- Emitted Electrons -->
          <circle cx="190" cy="85" r="3" fill="#f43f5e" />
          <line x1="190" y1="85" x2="215" y2="90" stroke="#f43f5e" stroke-width="1" stroke-dasharray="2 1" />
          <circle cx="200" cy="115" r="3" fill="#f43f5e" />
          <line x1="200" y1="115" x2="222" y2="110" stroke="#f43f5e" stroke-width="1" stroke-dasharray="2 1" />
          
          <!-- External Circuit -->
          <!-- Left wire from Cathode to Battery -->
          <path d="M 170 100 L 140 100 L 140 170 L 180 170" fill="none" stroke="#64748b" stroke-width="2" />
          <!-- Battery symbol -->
          <line x1="180" y1="160" x2="180" y2="180" stroke="#e2e8f0" stroke-width="4" />
          <line x1="188" y1="165" x2="188" y2="175" stroke="#e2e8f0" stroke-width="2" />
          <line x1="196" y1="160" x2="196" y2="180" stroke="#e2e8f0" stroke-width="4" />
          <line x1="204" y1="165" x2="204" y2="175" stroke="#e2e8f0" stroke-width="2" />
          <text x="192" y="152" fill="#e2e8f0" font-size="8">بطارية (+/-)</text>
          
          <!-- Wire from Battery to Ammeter -->
          <path d="M 205 170 L 250 170" fill="none" stroke="#64748b" stroke-width="2" />
          
          <!-- Ammeter symbol -->
          <circle cx="270" cy="170" r="12" fill="#0f172a" stroke="#a855f7" stroke-width="2" />
          <text x="270" y="174" fill="#a855f7" font-size="11" font-weight="bold" text-anchor="middle">G</text>
          
          <!-- Wire from Ammeter back to Anode -->
          <path d="M 282 170 L 310 170 L 310 100 L 225 100" fill="none" stroke="#64748b" stroke-width="2" />
        </svg>
      `;

    case '3-1':
      // Magnet & Field Lines
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <rect width="100%" height="100%" fill="none" />
          
          <!-- Magnetic Field Lines (Loops) -->
          <ellipse cx="225" cy="100" rx="90" ry="35" fill="none" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1.5" />
          <ellipse cx="225" cy="100" rx="140" ry="60" fill="none" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1.5" />
          <ellipse cx="225" cy="100" rx="190" ry="85" fill="none" stroke="rgba(56, 189, 248, 0.12)" stroke-width="1.2" />
          
          <!-- Direction arrows on loops -->
          <path d="M 225 65 L 223 65" stroke="#38bdf8" stroke-width="2" marker-start="url(#arr-r)" />
          <path d="M 225 40 L 223 40" stroke="#38bdf8" stroke-width="2" marker-start="url(#arr-r)" />
          
          <!-- Iron filings effect (dots) -->
          <g fill="rgba(148, 163, 184, 0.3)">
            <circle cx="120" cy="70" r="1" /><circle cx="125" cy="85" r="1.5" /><circle cx="115" cy="120" r="1" />
            <circle cx="330" cy="70" r="1.5" /><circle cx="325" cy="85" r="1" /><circle cx="335" cy="120" r="1.5" />
            <circle cx="130" cy="100" r="1.2" /><circle cx="320" cy="100" r="1.2" />
          </g>

          <!-- Magnet Bar -->
          <!-- North Pole (N) - Red -->
          <path d="M 140 85 L 225 85 L 225 115 L 140 115 Z" fill="#ef4444" />
          <text x="170" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">ش (N)</text>
          
          <!-- South Pole (S) - Blue -->
          <path d="M 225 85 L 310 85 L 310 115 L 225 115 Z" fill="#3b82f6" />
          <text x="275" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">ج (S)</text>

          <!-- Divider line -->
          <line x1="225" y1="85" x2="225" y2="115" stroke="#0f172a" stroke-width="2" />
          
          <text x="225" y="150" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">تخرج خطوط المجال من القطب الشمالي وتدخل في الجنوبي</text>
        </svg>
      `;

    case '3-2':
      // Magnetic Flux
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Parallel Flux Lines -->
          <g stroke="#38bdf8" stroke-width="2">
            <line x1="50" y1="50" x2="380" y2="50" />
            <line x1="50" y1="85" x2="380" y2="85" />
            <line x1="50" y1="120" x2="380" y2="120" />
            <line x1="50" y1="155" x2="380" y2="155" />
          </g>
          <!-- Arrow heads -->
          <path d="M 380 50 L 372 46 M 380 50 L 372 54" stroke="#38bdf8" stroke-width="2" />
          <path d="M 380 85 L 372 81 M 380 85 L 372 89" stroke="#38bdf8" stroke-width="2" />
          <path d="M 380 120 L 372 116 M 380 120 L 372 124" stroke="#38bdf8" stroke-width="2" />
          <path d="M 380 155 L 372 151 M 380 155 L 372 159" stroke="#38bdf8" stroke-width="2" />
          <text x="390" y="105" fill="#38bdf8" font-size="12" font-weight="bold">الفيض (Φ)</text>

          <!-- Tilted Area (S) -->
          <polygon points="180,30 250,30 210,170 140,170" fill="rgba(251, 191, 36, 0.15)" stroke="#fbbf24" stroke-width="2.5" />
          <text x="155" y="155" fill="#fbbf24" font-size="12" font-weight="bold">المساحة (س)</text>

          <!-- Normal Vector Vector -->
          <line x1="195" y1="100" x2="255" y2="85" stroke="#f43f5e" stroke-width="2" />
          <polygon points="255,85 248,81 251,89" fill="#f43f5e" />
          <text x="260" y="80" fill="#f43f5e" font-size="9" font-weight="bold">العمودي (ن)</text>

          <text x="225" y="185" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">كثافة الفيض (ب) = عدد الخطوط المارة عمودياً بوحدة المساحة</text>
        </svg>
      `;

    case '3-3':
      // Earth Magnetic Field
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Earth sphere -->
          <circle cx="225" cy="100" r="50" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <!-- Continents hints -->
          <path d="M 200 80 Q 210 90 205 110 M 235 70 Q 245 90 230 120" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" />
          <text x="225" y="105" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">الأرض</text>

          <!-- Geographic axis labels -->
          <text x="225" y="32" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">الشمال الجغرافي</text>
          <text x="225" y="178" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">الجنوب الجغرافي</text>

          <!-- Internal Magnetic Bar (Tilted) -->
          <g transform="rotate(11 225 100)">
            <rect x="215" y="60" width="20" height="40" fill="#3b82f6" />
            <rect x="215" y="100" width="20" height="40" fill="#ef4444" />
            <text x="225" y="80" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">S (ج)</text>
            <text x="225" y="125" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">N (ش)</text>
          </g>

          <!-- Field Lines -->
          <path d="M 215 145 C 130 180, 130 20, 215 55" fill="none" stroke="rgba(244, 63, 94, 0.3)" stroke-width="1.5" />
          <path d="M 235 145 C 320 180, 320 20, 235 55" fill="none" stroke="rgba(244, 63, 94, 0.3)" stroke-width="1.5" />
          <path d="M 225 155 C 100 210, 100 -10, 225 45" fill="none" stroke="rgba(244, 63, 94, 0.15)" stroke-width="1.2" />
          <path d="M 225 155 C 350 210, 350 -10, 225 45" fill="none" stroke="rgba(244, 63, 94, 0.15)" stroke-width="1.2" />

          <!-- Labels for magnetic poles -->
          <text x="320" y="60" fill="#ef4444" font-size="9" font-weight="bold">الجنوب المغناطيسي S (في الشمال)</text>
          <text x="320" y="145" fill="#3b82f6" font-size="9" font-weight="bold">الشمال المغناطيسي N (في الجنوب)</text>
        </svg>
      `;

    case '3-4':
      // Like Charges Repel, Opposite Attract
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Left side: Tanafor (Repulsion) -->
          <g transform="translate(0, 0)">
            <text x="110" y="30" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">(أ) شحنات متشابهة تتنافر</text>
            
            <!-- Charge 1 (+) -->
            <circle cx="70" cy="100" r="12" fill="#ef4444" />
            <text x="70" y="104" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">+</text>
            
            <!-- Charge 2 (+) -->
            <circle cx="150" cy="100" r="12" fill="#ef4444" />
            <text x="150" y="104" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">+</text>

            <!-- Repelling field lines -->
            <path d="M 70 88 C 70 70, 90 75, 110 75" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" />
            <path d="M 70 112 C 70 130, 90 125, 110 125" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" />
            <path d="M 150 88 C 150 70, 130 75, 110 75" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" />
            <path d="M 150 112 C 150 130, 130 125, 110 125" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" />
            
            <!-- Radial lines outgoing -->
            <line x1="58" y1="100" x2="38" y2="100" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" />
            <line x1="162" y1="100" x2="182" y2="100" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" />
          </g>

          <!-- Divider -->
          <line x1="225" y1="20" x2="225" y2="180" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1" stroke-dasharray="4 4" />

          <!-- Right side: Tagathob (Attraction) -->
          <g transform="translate(220, 0)">
            <text x="110" y="30" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">(ب) شحنات مختلفة تتجاذب</text>

            <!-- Charge 1 (+) -->
            <circle cx="70" cy="100" r="12" fill="#ef4444" />
            <text x="70" y="104" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">+</text>

            <!-- Charge 2 (-) -->
            <circle cx="150" cy="100" r="12" fill="#3b82f6" />
            <text x="150" y="104" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">-</text>

            <!-- Attracting field lines -->
            <line x1="82" y1="100" x2="138" y2="100" stroke="#10b981" stroke-width="1.8" />
            <path d="M 79 92 C 95 75, 125 75, 141 92" fill="none" stroke="#10b981" stroke-width="1.5" />
            <path d="M 79 108 C 95 125, 125 125, 141 108" fill="none" stroke="#10b981" stroke-width="1.5" />
          </g>
        </svg>
      `;

    case '3-14':
      // Magnetic Field of a straight wire (Ampere's Hand)
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Concentric Field Lines (Ellipses) -->
          <ellipse cx="225" cy="110" rx="60" ry="18" fill="none" stroke="rgba(16, 185, 129, 0.6)" stroke-width="2" />
          <ellipse cx="225" cy="110" rx="100" ry="28" fill="none" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.8" />
          <ellipse cx="225" cy="110" rx="140" ry="38" fill="none" stroke="rgba(16, 185, 129, 0.25)" stroke-width="1.5" />

          <!-- Wire -->
          <line x1="225" y1="20" x2="225" y2="180" stroke="#fb923c" stroke-width="6" stroke-linecap="round" />
          
          <!-- Direction arrows on field lines -->
          <polygon points="285,110 281,104 289,106" fill="#10b981" />
          <polygon points="325,110 321,104 329,106" fill="#10b981" />
          
          <!-- Labels -->
          <text x="240" y="35" fill="#fb923c" font-size="11" font-weight="bold">التيار (I)</text>
          <text x="340" y="98" fill="#10b981" font-size="11" font-weight="bold">المجال المغناطيسي (B)</text>

          <!-- Thumb and fingers representation (simple) -->
          <g transform="translate(195, 75)" fill="#e2e8f0" stroke="#090d16" stroke-width="1">
            <!-- Hand palm and fingers curling -->
            <rect x="15" y="15" width="22" height="25" rx="5" fill="#cbd5e1" />
            <!-- Curled fingers -->
            <circle cx="28" cy="22" r="3.5" fill="#94a3b8" />
            <circle cx="28" cy="28" r="3.5" fill="#94a3b8" />
            <circle cx="28" cy="34" r="3.5" fill="#94a3b8" />
            <!-- Upward thumb -->
            <path d="M 12 25 L 12 5 C 12 2, 18 2, 18 5 L 18 25 Z" fill="#cbd5e1" />
          </g>
          
          <text x="145" y="70" fill="#cbd5e1" font-size="9" font-weight="bold">الإبهام يشير إلى التيار</text>
          <text x="135" y="130" fill="#cbd5e1" font-size="9" font-weight="bold">الأصابع تشير لاتجاه المجال</text>
        </svg>
      `;

    case '4-1':
      // Electron orbiting the Nucleus
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Central positive nucleus -->
          <circle cx="225" cy="100" r="14" fill="#f43f5e" />
          <text x="225" y="104" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">+</text>
          <text x="225" y="130" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">النواة (+ ش_ن)</text>

          <!-- Electron Orbit -->
          <circle cx="225" cy="100" r="55" fill="none" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1.5" stroke-dasharray="4 3" />
          
          <!-- Traveling Electron -->
          <circle cx="280" cy="100" r="6" fill="#0ea5e9" />
          <text x="280" y="95" fill="#0ea5e9" font-size="9" font-weight="bold" text-anchor="middle">ش_إ</text>

          <!-- Centripetal Force Vector (F_k) -->
          <line x1="274" y1="100" x2="245" y2="100" stroke="#ef4444" stroke-width="1.8" />
          <polygon points="245,100 251,96 251,104" fill="#ef4444" />
          <text x="260" y="112" fill="#ef4444" font-size="8" font-weight="bold">قوة الجذب (ق_ك)</text>

          <!-- Velocity Vector (v) -->
          <line x1="280" y1="94" x2="280" y2="55" stroke="#10b981" stroke-width="1.8" />
          <polygon points="280,55 276,61 284,61" fill="#10b981" />
          <text x="290" y="65" fill="#10b981" font-size="8" font-weight="bold">السرعة الخطية (ع)</text>
          
          <text x="80" y="105" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">نصف القطر (نق)</text>
          <line x1="170" y1="100" x2="211" y2="100" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2 2" />
        </svg>
      `;

    case '4-2':
      // Bohr Energy Levels
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Central Nucleus -->
          <circle cx="150" cy="100" r="10" fill="#ef4444" />
          <text x="150" y="103" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">+</text>

          <!-- Concentric Energy Levels -->
          <circle cx="150" cy="100" r="30" fill="none" stroke="rgba(168, 85, 247, 0.4)" stroke-width="1.5" />
          <text x="150" y="66" fill="#a855f7" font-size="8" font-weight="bold" text-anchor="middle">n=1</text>
          <text x="205" y="104" fill="#a855f7" font-size="8" font-weight="bold">ط₁ = -13.6 eV</text>

          <circle cx="150" cy="100" r="55" fill="none" stroke="rgba(168, 85, 247, 0.3)" stroke-width="1.5" />
          <text x="150" y="41" fill="#a855f7" font-size="8" font-weight="bold" text-anchor="middle">n=2</text>
          <text x="220" y="125" fill="#a855f7" font-size="8" font-weight="bold">ط₂ = -3.4 eV</text>

          <circle cx="150" cy="100" r="80" fill="none" stroke="rgba(168, 85, 247, 0.2)" stroke-width="1.2" />
          <text x="150" y="16" fill="#a855f7" font-size="8" font-weight="bold" text-anchor="middle">n=3</text>
          <text x="240" y="150" fill="#a855f7" font-size="8" font-weight="bold">ط₃ = -1.5 eV</text>

          <text x="330" y="60" fill="#cbd5e1" font-size="11" font-weight="bold" text-anchor="middle">مستويات كبلر الكمية</text>
          <text x="330" y="80" fill="#cbd5e1" font-size="9" text-anchor="middle">طاقة المدار محددة بالقانون:</text>
          <text x="330" y="105" fill="#fbbf24" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle">ط_ن = -13.6 / ن²</text>
        </svg>
      `;

    case '4-3':
      // Photon Emission
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Energy Levels as horizontal lines for simplicity of transition -->
          <line x1="50" y1="60" x2="280" y2="60" stroke="#a855f7" stroke-width="2" />
          <text x="295" y="64" fill="#a855f7" font-size="10" font-weight="bold">المستوى الأعلى (ط₂)</text>

          <line x1="50" y1="140" x2="280" y2="140" stroke="#a855f7" stroke-width="2" />
          <text x="295" y="144" fill="#a855f7" font-size="10" font-weight="bold">المستوى الأدنى (ط₁)</text>

          <!-- Descending Electron -->
          <circle cx="120" cy="60" r="6" fill="#38bdf8" />
          <circle cx="120" cy="140" r="6" fill="#38bdf8" />
          
          <!-- Down arrow for jump -->
          <line x1="120" y1="68" x2="120" y2="132" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3" />
          <polygon points="120,134 116,128 124,128" fill="#ef4444" />
          <text x="80" y="105" fill="#ef4444" font-size="9" font-weight="bold">قفزة كمية</text>

          <!-- Emitted Photon (Sine wave) -->
          <path d="M 128 100 Q 138 90 148 100 T 168 100 T 188 100 T 208 100" fill="none" stroke="#fbbf24" stroke-width="2.5" />
          <polygon points="212,100 206,96 206,104" fill="#fbbf24" />
          <text x="180" y="85" fill="#fbbf24" font-size="10" font-weight="bold">فوتون منبعث (هـ × ذ)</text>

          <text x="225" y="180" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">الطاقة المنبعثة = الفرق بين طاقتي المستويين (ط₂ - ط₁)</text>
        </svg>
      `;

    case '4-4':
      // Spectrometer
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Light Source -->
          <circle cx="45" cy="100" r="15" fill="#fef08a" stroke="#fbbf24" stroke-width="2" />
          <text x="45" y="103" fill="#854d0e" font-size="8" font-weight="bold" text-anchor="middle">غاز ساخن</text>

          <!-- White light beam passing through lens -->
          <line x1="60" y1="100" x2="130" y2="100" stroke="#ffffff" stroke-width="2" />
          
          <!-- Lens 1 -->
          <path d="M 130 70 A 50 50 0 0 0 130 130 A 50 50 0 0 0 130 70" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="1.5" />
          <text x="130" y="60" fill="#38bdf8" font-size="8" text-anchor="middle">عدسة محدبة</text>

          <!-- Parallel beams entering prism -->
          <line x1="135" y1="95" x2="200" y2="95" stroke="#ffffff" stroke-width="1.5" />
          <line x1="135" y1="105" x2="200" y2="105" stroke="#ffffff" stroke-width="1.5" />

          <!-- Glass Prism -->
          <polygon points="200,60 250,110 200,140" fill="rgba(148, 163, 184, 0.2)" stroke="#cbd5e1" stroke-width="2" />
          <text x="215" y="112" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">منشور</text>

          <!-- Dispersed colors exiting prism -->
          <!-- Red -->
          <line x1="225" y1="105" x2="330" y2="80" stroke="#ef4444" stroke-width="1.5" />
          <!-- Yellow -->
          <line x1="225" y1="105" x2="330" y2="100" stroke="#fbbf24" stroke-width="1.5" />
          <!-- Blue -->
          <line x1="225" y1="105" x2="330" y2="125" stroke="#3b82f6" stroke-width="1.5" />

          <!-- Spectrum Screen on the right -->
          <rect x="330" y="60" width="10" height="85" fill="#1e293b" stroke="#475569" />
          <rect x="331" y="78" width="8" height="4" fill="#ef4444" />
          <rect x="331" y="98" width="8" height="4" fill="#fbbf24" />
          <rect x="331" y="123" width="8" height="4" fill="#3b82f6" />
          <text x="350" y="105" fill="#cbd5e1" font-size="9" font-weight="bold">خطوط الطيف المميزة</text>
        </svg>
      `;

    case '4-5':
      // X-Ray Tube
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Vacuum Glass Envelope -->
          <path d="M 80 100 C 80 50, 320 50, 320 100 C 320 150, 80 150, 80 100 Z" fill="rgba(56, 189, 248, 0.02)" stroke="#475569" stroke-width="2" />
          <text x="200" y="62" fill="#64748b" font-size="9" font-weight="bold" text-anchor="middle">أنبوبة زجاجية مفرغة</text>

          <!-- Cathode (Filament) -->
          <g transform="translate(90, 80)">
            <rect x="0" y="10" width="15" height="20" fill="#475569" />
            <!-- Hot filament emitting electrons -->
            <path d="M 15 15 Q 22 20 15 25" fill="none" stroke="#f97316" stroke-width="2" />
            <text x="-15" y="25" fill="#cbd5e1" font-size="9">مهبط (-)</text>
          </g>

          <!-- Electron stream -->
          <g fill="#38bdf8">
            <circle cx="130" cy="100" r="2" /><circle cx="150" cy="98" r="2" /><circle cx="170" cy="101" r="2" />
            <circle cx="190" cy="100" r="2" /><circle cx="210" cy="99" r="2" />
          </g>
          <line x1="125" y1="100" x2="225" y2="100" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
          <text x="160" y="90" fill="#38bdf8" font-size="8">إلكترونات معجلة وسريعة</text>

          <!-- Anode (Target) -->
          <g transform="translate(230, 70)">
            <!-- Angled block target -->
            <polygon points="10,0 40,30 20,60 0,30" fill="#94a3b8" stroke="#cbd5e1" />
            <text x="45" y="45" fill="#cbd5e1" font-size="9">هدف معدني (+)</text>
          </g>

          <!-- High voltage connection -->
          <line x1="85" y1="100" x2="40" y2="100" stroke="#64748b" stroke-width="2" />
          <line x1="260" y1="100" x2="360" y2="100" stroke="#64748b" stroke-width="2" />
          <text x="50" y="125" fill="#f43f5e" font-size="10" font-weight="bold">ضغط عالي جداً (KV)</text>

          <!-- Outgoing X-Ray Waves -->
          <path d="M 245 110 L 225 170 M 255 110 L 245 170 M 235 110 L 205 170" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" />
          <text x="180" y="165" fill="#10b981" font-size="10" font-weight="bold">أشعة سينية منبعثة (X-Ray)</text>
        </svg>
      `;

    case '4-6':
      // Spontaneous vs Stimulated Emission
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- 1. Absorption -->
          <g transform="translate(0, 0)">
            <text x="75" y="25" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">أولاً: الامتصاص</text>
            <line x1="20" y1="60" x2="130" y2="60" stroke="#a855f7" stroke-width="1.5" />
            <line x1="20" y1="140" x2="130" y2="140" stroke="#a855f7" stroke-width="1.5" />
            
            <circle cx="75" cy="140" r="5" fill="#38bdf8" />
            <path d="M 10 100 Q 20 90 30 100 T 50 100" fill="none" stroke="#fbbf24" stroke-width="2" />
            <polygon points="53,100 48,97 48,103" fill="#fbbf24" />
            
            <!-- Arrow up -->
            <line x1="75" y1="130" x2="75" y2="70" stroke="#34d399" stroke-width="1.5" stroke-dasharray="2 2" />
            <polygon points="75,68 72,74 78,74" fill="#34d399" />
          </g>

          <!-- 2. Spontaneous -->
          <g transform="translate(150, 0)">
            <text x="75" y="25" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">ثانياً: انبعاث تلقائي</text>
            <line x1="20" y1="60" x2="130" y2="60" stroke="#a855f7" stroke-width="1.5" />
            <line x1="20" y1="140" x2="130" y2="140" stroke="#a855f7" stroke-width="1.5" />

            <circle cx="75" cy="60" r="5" fill="#38bdf8" />
            <!-- Arrow down -->
            <line x1="75" y1="70" x2="75" y2="130" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="2 2" />
            <polygon points="75,132 72,126 78,126" fill="#f43f5e" />

            <!-- Random photon emitted -->
            <path d="M 85 100 Q 95 110 105 100 T 125 100" fill="none" stroke="#fbbf24" stroke-width="2" />
            <polygon points="128,100 123,97 123,103" fill="#fbbf24" />
          </g>

          <!-- 3. Stimulated -->
          <g transform="translate(300, 0)">
            <text x="75" y="25" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">ثالثاً: انبعاث مستحث (ليزر)</text>
            <line x1="20" y1="60" x2="130" y2="60" stroke="#a855f7" stroke-width="1.5" />
            <line x1="20" y1="140" x2="130" y2="140" stroke="#a855f7" stroke-width="1.5" />

            <circle cx="75" cy="60" r="5" fill="#38bdf8" />
            <!-- Trigger photon incoming -->
            <path d="M 5 60 Q 15 50 25 60 T 45 60" fill="none" stroke="#ef4444" stroke-width="1.8" />
            <polygon points="48,60 43,57 43,63" fill="#ef4444" />

            <!-- Two identical coherent photons exiting -->
            <path d="M 85 85 Q 95 75 105 85 T 125 85" fill="none" stroke="#ef4444" stroke-width="2" />
            <path d="M 85 115 Q 95 105 105 115 T 125 115" fill="none" stroke="#ef4444" stroke-width="2" />
            <polygon points="128,85 123,82 123,88" fill="#ef4444" />
            <polygon points="128,115 123,112 123,118" fill="#ef4444" />
          </g>
        </svg>
      `;

    case '4-7':
      // Laser Device
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Active Laser Medium tube -->
          <rect x="90" y="60" width="260" height="60" fill="rgba(239, 68, 68, 0.05)" stroke="#64748b" stroke-width="2" />
          <text x="220" y="95" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">وسط مادي مثار (رنيني)</text>

          <!-- Mirror left (100% reflective) -->
          <rect x="75" y="50" width="15" height="80" fill="#94a3b8" stroke="#cbd5e1" />
          <text x="60" y="95" fill="#cbd5e1" font-size="8" [writing-mode:vertical-rl] text-anchor="middle">مرآة كاملة الانعكاس</text>

          <!-- Mirror right (partially reflective) -->
          <rect x="350" y="50" width="15" height="80" fill="#64748b" stroke="#94a3b8" />
          <text x="380" y="95" fill="#94a3b8" font-size="8" [writing-mode:vertical-rl] text-anchor="middle">مرآة شبه منفذة</text>

          <!-- Laser Coherent Red Wave oscillation -->
          <path d="M 95 90 Q 115 70 135 90 T 175 90 T 215 90 T 255 90 T 295 90 T 335 90" fill="none" stroke="#ef4444" stroke-width="2.5" />
          <path d="M 335 90 Q 315 110 295 90 T 255 90 T 215 90 T 175 90 T 135 90 T 95 90" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2" />

          <!-- Outgoing Laser Beam -->
          <line x1="365" y1="90" x2="440" y2="90" stroke="#ef4444" stroke-width="5" />
          <text x="410" y="80" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">شعاع الليزر</text>
        </svg>
      `;

    case '4-8':
      // Alpha Decay
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Mother Nucleus -->
          <circle cx="120" cy="100" r="40" fill="#1e293b" stroke="#a855f7" stroke-width="3" />
          <text x="120" y="104" fill="#a855f7" font-size="10" font-weight="bold" text-anchor="middle">نواة يورانيوم مثارة</text>

          <!-- Ejection vector -->
          <line x1="165" y1="100" x2="260" y2="100" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3 3" />
          <polygon points="260,100 252,96 252,104" fill="#f43f5e" />

          <!-- Alpha Particle (He-4 nucleus) -->
          <g transform="translate(280, 85)">
            <!-- 2 Protons, 2 Neutrons -->
            <circle cx="15" cy="10" r="8" fill="#ef4444" /> <!-- Proton -->
            <circle cx="27" cy="12" r="8" fill="#ef4444" /> <!-- Proton -->
            <circle cx="18" cy="22" r="8" fill="#3b82f6" /> <!-- Neutron -->
            <circle cx="29" cy="22" r="8" fill="#3b82f6" /> <!-- Neutron -->
            <text x="22" y="19" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">α</text>
          </g>
          <text x="300" y="140" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">جسيم ألفا (نواة هيليوم)</text>
          <text x="300" y="155" fill="#94a3b8" font-size="9" text-anchor="middle">2 بروتون + 2 نيوترون</text>
        </svg>
      `;

    case '4-9':
      // Beta Decay
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Mother Nucleus -->
          <circle cx="120" cy="100" r="40" fill="#1e293b" stroke="#a855f7" stroke-width="3" />
          <text x="120" y="104" fill="#a855f7" font-size="11" font-weight="bold" text-anchor="middle">نواة غير مستقرة</text>

          <!-- Neutron turning into Proton -->
          <text x="120" y="155" fill="#10b981" font-size="9" text-anchor="middle">يتحول النيوترون إلى بروتون</text>

          <!-- Ejected Beta (Electron) -->
          <line x1="160" y1="80" x2="260" y2="50" stroke="#ef4444" stroke-width="1.5" />
          <polygon points="260,50 252,50 255,56" fill="#ef4444" />
          
          <circle cx="280" cy="45" r="8" fill="#38bdf8" />
          <text x="280" y="49" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">-</text>
          <text x="325" y="50" fill="#38bdf8" font-size="11" font-weight="bold">جسيم بيتا (إلكترون سريع)</text>

          <!-- Antineutrino -->
          <line x1="160" y1="120" x2="260" y2="150" stroke="#10b981" stroke-width="1.5" />
          <polygon points="260,150 255,144 252,150" fill="#10b981" />
          <text x="280" y="155" fill="#10b981" font-size="11" font-weight="bold">ضديد النيوترينو (v̄)</text>
        </svg>
      `;

    case '4-10':
      // Gamma Decay
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Excited Nucleus -->
          <circle cx="120" cy="100" r="40" fill="#1e293b" stroke="#e11d48" stroke-width="3" />
          <!-- Rays of excitement -->
          <path d="M 120 45 L 120 35 M 120 155 L 120 165 M 65 100 L 55 100" stroke="#f43f5e" stroke-width="2" />
          <text x="120" y="104" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">نواة مثارة (γ*)</text>

          <!-- Transition vector -->
          <line x1="170" y1="100" x2="240" y2="100" stroke="#10b981" stroke-width="2" />
          <polygon points="240,100 232,96 232,104" fill="#10b981" />

          <!-- Emitted Gamma high frequency wave -->
          <path d="M 260 100 Q 270 80 280 100 T 300 100 T 320 100 T 340 100 T 360 100" fill="none" stroke="#fbbf24" stroke-width="2.5" />
          <polygon points="364,100 358,96 358,104" fill="#fbbf24" />
          <text x="320" y="75" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">أشعة غاما (γ)</text>
          <text x="320" y="135" fill="#cbd5e1" font-size="9" text-anchor="middle">موجات كهرومغناطيسية ذات طاقة فائقة</text>
        </svg>
      `;

    case '4-11':
      // Nuclear Fission Chain Reaction
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- 1. Incoming Neutron -->
          <circle cx="35" cy="100" r="4" fill="#38bdf8" />
          <line x1="45" y1="100" x2="85" y2="100" stroke="#38bdf8" stroke-width="1.5" />
          <polygon points="85,100 79,97 79,103" fill="#38bdf8" />
          <text x="35" y="88" fill="#38bdf8" font-size="8" text-anchor="middle">نيوترون بطيء</text>

          <!-- 2. Uranium 235 Nucleus -->
          <circle cx="115" cy="100" r="22" fill="#701a75" stroke="#f472b6" stroke-width="2" />
          <text x="115" y="104" fill="#f472b6" font-size="9" font-weight="bold" text-anchor="middle">U-235</text>

          <!-- 3. Fission blast -->
          <path d="M 145 100 L 195 65 M 145 100 L 195 135" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" />
          
          <!-- Fission products -->
          <circle cx="215" cy="55" r="12" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="215" y="58" fill="#cbd5e1" font-size="8" text-anchor="middle">كربتون</text>

          <circle cx="215" cy="145" r="14" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="215" y="148" fill="#cbd5e1" font-size="8" text-anchor="middle">باريوم</text>

          <!-- 3 Newly released Neutrons -->
          <circle cx="245" cy="85" r="4" fill="#38bdf8" />
          <line x1="225" y1="95" x2="240" y2="88" stroke="#38bdf8" stroke-width="1" />
          
          <circle cx="245" cy="100" r="4" fill="#38bdf8" />
          <line x1="225" y1="100" x2="240" y2="100" stroke="#38bdf8" stroke-width="1" />

          <circle cx="245" cy="115" r="4" fill="#38bdf8" />
          <line x1="225" y1="105" x2="240" y2="112" stroke="#38bdf8" stroke-width="1" />

          <!-- Next Fission Step (Chain cascade) -->
          <circle cx="315" cy="75" r="15" fill="#701a75" stroke="#f472b6" stroke-width="1.5" />
          <text x="315" y="78" fill="#f472b6" font-size="7" text-anchor="middle">U-235</text>
          <line x1="252" y1="85" x2="295" y2="78" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />

          <circle cx="315" cy="125" r="15" fill="#701a75" stroke="#f472b6" stroke-width="1.5" />
          <text x="315" y="128" fill="#f472b6" font-size="7" text-anchor="middle">U-235</text>
          <line x1="252" y1="115" x2="295" y2="122" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />

          <text x="320" y="175" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">تفاعل متسلسل متفرع مستمر</text>
        </svg>
      `;

    case '4-12':
      // Nuclear Reactor
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Containment structure -->
          <path d="M 40 170 L 40 70 A 50 50 0 0 1 140 70 L 140 170 Z" fill="none" stroke="#64748b" stroke-width="3" />
          <text x="90" y="55" fill="#64748b" font-size="9" text-anchor="middle">درع واقٍ من الخرسانة</text>

          <!-- Reactor Core containing fuel rods and water -->
          <rect x="60" y="85" width="60" height="75" fill="rgba(14, 165, 233, 0.1)" stroke="#38bdf8" stroke-width="2" />
          
          <!-- Fuel Rods (Uranium) -->
          <line x1="75" y1="95" x2="75" y2="150" stroke="#f43f5e" stroke-width="4" />
          <line x1="105" y1="95" x2="105" y2="150" stroke="#f43f5e" stroke-width="4" />
          <text x="90" y="152" fill="#f43f5e" font-size="7" text-anchor="middle">قضبان الوقود</text>

          <!-- Control Rods (Cadmium) -->
          <line x1="90" y1="75" x2="90" y2="130" stroke="#cbd5e1" stroke-width="3" />
          <text x="90" y="70" fill="#cbd5e1" font-size="7" text-anchor="middle">قضبان التحكم</text>

          <!-- Heat Exchanger / Pipe loop -->
          <path d="M 115 110 L 200 110 L 200 145 L 115 145" fill="none" stroke="#f97316" stroke-width="3" />
          <text x="160" y="105" fill="#f97316" font-size="8">مبادل حراري</text>

          <!-- Generator/Turbine simplified -->
          <rect x="230" y="90" width="40" height="30" fill="#1e293b" stroke="#10b981" stroke-width="1.5" />
          <text x="250" y="108" fill="#10b981" font-size="9" text-anchor="middle">توربين</text>

          <rect x="285" y="95" width="30" height="20" fill="#1e293b" stroke="#a855f7" stroke-width="1.5" />
          <text x="300" y="108" fill="#a855f7" font-size="8" text-anchor="middle">مولد</text>

          <path d="M 270 105 L 285 105" stroke="#cbd5e1" stroke-width="2" />
          
          <!-- Outgoing electricity lines -->
          <path d="M 315 105 L 350 95 M 315 105 L 350 115" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="3 3" />
          <text x="380" y="108" fill="#fbbf24" font-size="9" font-weight="bold">كهرباء للمدن</text>
        </svg>
      `;

    case '4-14':
      // 3D Electromagnetic Wave (Electric & Magnetic field vectors)
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Propagation Axis (X) -->
          <line x1="40" y1="100" x2="380" y2="100" stroke="#94a3b8" stroke-width="2" />
          <polygon points="380,100 372,96 372,104" fill="#94a3b8" />
          <text x="390" y="104" fill="#cbd5e1" font-size="10" font-weight="bold">خط الانتشار (س)</text>

          <!-- Electric Field (E) - Vertical Blue Wave -->
          <path d="M 50 100 Q 90 40 130 100 T 210 100 T 290 100 T 370 100" fill="none" stroke="#3b82f6" stroke-width="2.5" />
          <!-- Electric field vector arrows -->
          <line x1="90" y1="100" x2="90" y2="40" stroke="rgba(59, 130, 246, 0.5)" stroke-width="1" />
          <polygon points="90,40 87,46 93,46" fill="#3b82f6" />
          <line x1="250" y1="100" x2="250" y2="40" stroke="rgba(59, 130, 246, 0.5)" stroke-width="1" />
          <polygon points="250,40 247,46 253,46" fill="#3b82f6" />
          <text x="90" y="32" fill="#3b82f6" font-size="10" font-weight="bold" text-anchor="middle">المجال الكهربائي (جـ)</text>

          <!-- Magnetic Field (B) - Horizontal/Isometric Red Wave -->
          <!-- We simulate 3D projection by shifting y coordinates by some factor of x -->
          <path d="M 50 100 Q 75 125 130 100 T 210 100 T 290 100 T 370 100" fill="none" stroke="#ef4444" stroke-width="2.5" />
          <!-- Magnetic field vector arrows -->
          <line x1="110" y1="100" x2="125" y2="115" stroke="rgba(239, 68, 68, 0.5)" stroke-width="1.5" />
          <polygon points="125,115 119,114 123,110" fill="#ef4444" />
          <text x="135" y="132" fill="#ef4444" font-size="10" font-weight="bold">المجال المغناطيسي (ب)</text>

          <text x="225" y="185" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">المجالان الكهربائي والمغناطيسي متعامدان ومتفقان في الطور</text>
        </svg>
      `;

    case '4-15':
      // Ground and Sky Waves
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Curved Earth Surface -->
          <path d="M 20 220 A 400 400 0 0 1 430 220" fill="none" stroke="#3b82f6" stroke-width="4" />
          <text x="225" y="195" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">سطح كوكب الأرض</text>

          <!-- Ionosphere Layer (Atmosphere) -->
          <path d="M 20 60 A 420 420 0 0 1 430 60" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="4 4" />
          <text x="225" y="38" fill="#a855f7" font-size="10" font-weight="bold" text-anchor="middle">طبقة الغلاف الأيوني (الأيونوسفير) العاكسة للأمواج</text>

          <!-- Transmitter Tower -->
          <g transform="translate(60, 130)">
            <line x1="0" y1="40" x2="15" y2="0" stroke="#cbd5e1" stroke-width="2" />
            <line x1="30" y1="40" x2="15" y2="0" stroke="#cbd5e1" stroke-width="2" />
            <circle cx="15" cy="0" r="4" fill="#ef4444" />
            <text x="15" y="-8" fill="#cbd5e1" font-size="8" text-anchor="middle">برج الإرسال</text>
          </g>

          <!-- Receiver Tower -->
          <g transform="translate(360, 130)">
            <line x1="0" y1="40" x2="15" y2="0" stroke="#cbd5e1" stroke-width="2" />
            <line x1="30" y1="40" x2="15" y2="0" stroke="#cbd5e1" stroke-width="2" />
            <circle cx="15" cy="0" r="4" fill="#10b981" />
            <text x="15" y="-8" fill="#cbd5e1" font-size="8" text-anchor="middle">برج الاستقبال</text>
          </g>

          <!-- Ground Wave (Following Earth Curve) -->
          <path d="M 75 130 C 150 145, 300 145, 375 130" fill="none" stroke="#fbbf24" stroke-width="2" />
          <text x="225" y="152" fill="#fbbf24" font-size="9" font-weight="bold" text-anchor="middle">موجات أرضية (مباشرة)</text>

          <!-- Sky Wave (Bouncing off Ionosphere) -->
          <path d="M 75 130 L 225 53 L 375 130" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="3 3" />
          <!-- Bounce Arrow head -->
          <polygon points="225,53 218,58 223,61" fill="#ec4899" />
          <text x="225" y="78" fill="#ec4899" font-size="9" font-weight="bold" text-anchor="middle">موجات سماوية (منعكسة)</text>
        </svg>
      `;

    case '4-infra':
      // Infrared Cat Thermal Image
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Grid lines for blueprint effect -->
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" stroke-width="1"/>
            </pattern>
            <radialGradient id="hotEye" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="40%" stop-color="#facc15"/>
              <stop offset="70%" stop-color="#f97316"/>
              <stop offset="100%" stop-color="#dc2626"/>
            </radialGradient>
            <radialGradient id="warmEar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#facc15"/>
              <stop offset="50%" stop-color="#ea580c"/>
              <stop offset="100%" stop-color="#311042"/>
            </radialGradient>
            <linearGradient id="thermalScale" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stop-color="#3b0764"/> <!-- Purple -->
              <stop offset="25%" stop-color="#1d4ed8"/> <!-- Blue -->
              <stop offset="50%" stop-color="#10b981"/> <!-- Green -->
              <stop offset="75%" stop-color="#f97316"/> <!-- Orange -->
              <stop offset="100%" stop-color="#facc15"/> <!-- Yellow -->
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <!-- Title block -->
          <text x="20" y="25" fill="#38bdf8" font-size="10" font-weight="bold" font-family="sans-serif">محاكاة كاميرا حرارية (FLIR IR-Imaging)</text>
          
          <!-- Cat Face Group -->
          <g transform="translate(180, 110)">
            <!-- Outer Face/Head contour (cool/warm border) -->
            <path d="M -60 -20 C -70 -20, -75 20, -50 50 C -30 70, 30 70, 50 50 C 75 20, 70 -20, 60 -20 C 50 -20, 40 -10, 30 -10 C 15 -10, -15 -10, -30 -10 C -40 -10, -50 -20, -60 -20 Z" fill="#1e1b4b" stroke="#312e81" stroke-width="2" />
            
            <!-- Left Ear (Hot inner) -->
            <path d="M -55 -15 L -65 -65 L -25 -10 Z" fill="#2e1065" stroke="#312e81" stroke-width="1" />
            <path d="M -50 -18 L -58 -55 L -30 -13 Z" fill="url(#warmEar)" />
            
            <!-- Right Ear (Hot inner) -->
            <path d="M 55 -15 L 65 -65 L 25 -10 Z" fill="#2e1065" stroke="#312e81" stroke-width="1" />
            <path d="M 50 -18 L 58 -55 L 30 -13 Z" fill="url(#warmEar)" />
            
            <!-- Cheeks and face details in medium thermal temperature (magenta/indigo) -->
            <ellipse cx="0" cy="20" rx="45" ry="30" fill="#491059" opacity="0.6" />
            <ellipse cx="-35" cy="15" rx="15" ry="10" fill="#6d1b64" opacity="0.7" />
            <ellipse cx="35" cy="15" rx="15" ry="10" fill="#6d1b64" opacity="0.7" />
            
            <!-- Eyes (Very Hot - Glowing white/yellow) -->
            <!-- Left Eye -->
            <ellipse cx="-25" cy="5" rx="12" ry="8" fill="url(#hotEye)" />
            <ellipse cx="-25" cy="5" rx="2" ry="6" fill="#111827" />
            <!-- Right Eye -->
            <ellipse cx="25" cy="5" rx="12" ry="8" fill="url(#hotEye)" />
            <ellipse cx="25" cy="5" rx="2" ry="6" fill="#111827" />
            
            <!-- Nose (Cold - Dark blue/purple) -->
            <polygon points="-6,15 6,15 0,22" fill="#0284c7" stroke="#0369a1" stroke-width="1" />
            
            <!-- Mouth lines -->
            <path d="M -8 27 Q 0 32 0 25 Q 0 32 8 27" fill="none" stroke="#1d4ed8" stroke-width="1.5" />
            
            <!-- Whiskers (cool blue lines) -->
            <line x1="-45" y1="20" x2="-80" y2="15" stroke="#1d4ed8" stroke-width="1" />
            <line x1="-45" y1="23" x2="-83" y2="25" stroke="#1d4ed8" stroke-width="1" />
            <line x1="-45" y1="26" x2="-78" y2="34" stroke="#1d4ed8" stroke-width="1" />
            
            <line x1="45" y1="20" x2="80" y2="15" stroke="#1d4ed8" stroke-width="1" />
            <line x1="45" y1="23" x2="83" y2="25" stroke="#1d4ed8" stroke-width="1" />
            <line x1="45" y1="26" x2="78" y2="34" stroke="#1d4ed8" stroke-width="1" />
          </g>
          
          <!-- Thermal Scale Bar Legend -->
          <g transform="translate(370, 40)">
            <rect x="0" y="0" width="12" height="120" fill="url(#thermalScale)" rx="3" />
            
            <!-- Scale text labels -->
            <text x="18" y="8" fill="#facc15" font-size="8" font-family="sans-serif">38°C (حار)</text>
            <text x="18" y="65" fill="#10b981" font-size="8" font-family="sans-serif">28°C (معتدل)</text>
            <text x="18" y="118" fill="#6366f1" font-size="8" font-family="sans-serif">18°C (بارد)</text>
          </g>
        </svg>
      `;

    case '4-16':
      // AM Modulation
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <text x="225" y="25" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">تعديل الاتساع (AM)</text>

          <!-- Axis lines -->
          <line x1="30" y1="100" x2="410" y2="100" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />

          <!-- Modulating wave envelope (dotted) -->
          <path d="M 40 100 Q 130 30 220 100 T 400 100" fill="none" stroke="rgba(251, 191, 36, 0.4)" stroke-width="1.5" stroke-dasharray="3 3" />
          <path d="M 40 100 Q 130 170 220 100 T 400 100" fill="none" stroke="rgba(251, 191, 36, 0.4)" stroke-width="1.5" stroke-dasharray="3 3" />
          <text x="320" y="45" fill="#fbbf24" font-size="9">غلاف إشارة الصوت (المعلومة)</text>

          <!-- Modulated Carrier (AM High Frequency) -->
          <path d="M 40 100 L 45 90 L 50 110 L 55 85 L 60 115 L 65 80 L 70 120 L 75 75 L 80 125 L 85 70 L 90 130 L 95 68 L 100 132 L 105 65 L 110 135 L 115 65 L 120 135 L 125 68 L 130 132 L 135 70 L 140 130 L 145 72 L 150 128 L 155 75 L 160 125 L 165 78 L 170 122 L 175 80 L 180 120 L 185 83 L 190 117 L 195 85 L 200 115 L 205 88 L 210 112 L 215 90 L 220 110 L 225 90 L 230 110 L 235 92 L 240 108 L 245 94 L 250 106 L 255 96 L 260 104 L 265 98 L 270 102 L 275 98 L 280 102 L 285 96 L 290 104 L 295 94 L 300 106 L 305 92 L 310 108 L 315 90 L 320 110 L 325 88 L 330 112 L 335 85 L 340 115 L 345 83 L 350 117 L 355 80 L 360 120 L 365 78 L 370 122 L 375 75 L 380 125 L 385 78 L 390 122 L 395 83 L 400 117" fill="none" stroke="#38bdf8" stroke-width="1.5" />

          <text x="225" y="185" fill="#cbd5e1" font-size="9" text-anchor="middle">يتغير اتساع الموجة الحاملة العالية التردد تبعاً لاهتزازات إشارة الصوت</text>
        </svg>
      `;

    case '4-17':
      // FM Modulation
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <text x="225" y="25" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">تعديل التردد (FM)</text>

          <!-- Axis lines -->
          <line x1="30" y1="100" x2="410" y2="100" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />

          <!-- Modulating audio wave (slow sine wave) reference -->
          <path d="M 40 100 Q 130 50 220 100 T 400 100" fill="none" stroke="rgba(251, 191, 36, 0.4)" stroke-width="1" stroke-dasharray="4 4" />
          <text x="310" y="45" fill="#fbbf24" font-size="8">إشارة الصوت (منخفضة التردد)</text>

          <!-- Modulated Carrier (FM with varying spacing) -->
          <!-- We show variable frequency by changing the delta x inside path segments -->
          <path d="M 40 100 
                   L 46 70 L 52 130 L 58 100 
                   L 65 65 L 72 135 L 79 100 
                   L 88 60 L 97 140 L 106 100 
                   L 116 60 L 126 140 L 136 100
                   L 148 65 L 160 135 L 172 100
                   L 186 70 L 200 130 L 214 100
                   L 230 75 L 246 125 L 262 100
                   L 280 75 L 298 125 L 316 100
                   L 330 70 L 344 130 L 358 100
                   L 370 65 L 382 135 L 394 100" fill="none" stroke="#10b981" stroke-width="1.8" />

          <text x="110" y="165" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">تردد منضغط (قمة الصوت)</text>
          <text x="290" y="165" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">تردد متخلخل (قاع الصوت)</text>
          <text x="225" y="185" fill="#cbd5e1" font-size="9" text-anchor="middle">الاتساع ثابت تماماً، ويتغير التردد تبعاً لشدة واهتزازات الصوت</text>
        </svg>
      `;

    case '4-18':
      // Microphone Construction
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Acoustic Sound Waves -->
          <path d="M 40 100 C 40 70, 60 70, 60 100" fill="none" stroke="rgba(56, 189, 248, 0.4)" stroke-width="2" />
          <path d="M 50 100 C 50 60, 80 60, 80 100" fill="none" stroke="rgba(56, 189, 248, 0.6)" stroke-width="2" />
          <path d="M 60 100 C 60 50, 100 50, 100 100" fill="none" stroke="rgba(56, 189, 248, 0.8)" stroke-width="2.5" />
          <text x="50" y="40" fill="#38bdf8" font-size="10" font-weight="bold">موجات صوتية</text>

          <!-- Diaphragm (Flexible metal sheet) -->
          <line x1="120" y1="40" x2="120" y2="160" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
          <text x="130" y="32" fill="#cbd5e1" font-size="9" font-weight="bold">غشاء مرن مرتعش</text>

          <!-- Suspended Moving Coil -->
          <rect x="122" y="85" width="45" height="30" fill="none" stroke="#fb923c" stroke-width="2" />
          <path d="M 122 90 L 167 90 M 122 98 L 167 98 M 122 106 L 167 106 M 122 114 L 167 114" stroke="#fb923c" stroke-width="2" />
          <text x="145" y="80" fill="#fb923c" font-size="9" font-weight="bold" text-anchor="middle">ملف متحرك</text>

          <!-- Permanent Magnet (E-shaped or surrounding magnet) -->
          <rect x="180" y="75" width="60" height="50" fill="#475569" rx="3" />
          <rect x="180" y="90" width="55" height="20" fill="#090d16" />
          <!-- Magnet Poles -->
          <rect x="180" y="75" width="25" height="15" fill="#ef4444" />
          <text x="192" y="87" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">ش (N)</text>
          <rect x="180" y="110" width="25" height="15" fill="#3b82f6" />
          <text x="192" y="122" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">ج (S)</text>
          <text x="215" y="145" fill="#cbd5e1" font-size="9" text-anchor="middle">مغناطيس دائم</text>

          <!-- Induced Electrical Output Wire -->
          <path d="M 167 95 L 290 95 L 290 120" fill="none" stroke="#38bdf8" stroke-width="1.5" />
          <path d="M 167 105 L 280 105 L 280 130" fill="none" stroke="#38bdf8" stroke-width="1.5" />
          
          <circle cx="290" cy="120" r="3" fill="#10b981" />
          <circle cx="280" cy="130" r="3" fill="#10b981" />
          <text x="335" y="130" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">إشارة تيار متناوب حثي</text>
        </svg>
      `;

    case '4-21':
      // Resonant/Tuning Circuit
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Antenna symbol -->
          <line x1="80" y1="80" x2="80" y2="130" stroke="#cbd5e1" stroke-width="2" />
          <polygon points="80,80 70,60 90,60" fill="none" stroke="#cbd5e1" stroke-width="2" />
          <line x1="75" y1="67" x2="85" y2="67" stroke="#cbd5e1" stroke-width="1" />
          <text x="80" y="50" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">الهوائي (Antenna)</text>

          <!-- Inductor (Coil) -->
          <!-- Loop shapes -->
          <g fill="none" stroke="#fb923c" stroke-width="2.5">
            <path d="M 140 100 C 140 85, 150 85, 150 100" />
            <path d="M 150 100 C 150 85, 160 85, 160 100" />
            <path d="M 160 100 C 160 85, 170 85, 170 100" />
            <path d="M 170 100 C 170 85, 180 85, 180 100" />
          </g>
          <line x1="110" y1="100" x2="140" y2="100" stroke="#cbd5e1" stroke-width="2" />
          <line x1="180" y1="100" x2="210" y2="100" stroke="#cbd5e1" stroke-width="2" />
          <text x="160" y="75" fill="#fb923c" font-size="10" font-weight="bold" text-anchor="middle">ملف حثي (L)</text>

          <!-- Variable Capacitor (C) -->
          <line x1="210" y1="80" x2="210" y2="120" stroke="#cbd5e1" stroke-width="2" />
          <!-- Parallel Plates -->
          <line x1="230" y1="85" x2="230" y2="115" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
          <line x1="242" y1="85" x2="242" y2="115" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
          
          <line x1="230" y1="100" x2="210" y2="100" stroke="#cbd5e1" stroke-width="2" />
          <line x1="242" y1="100" x2="280" y2="100" stroke="#cbd5e1" stroke-width="2" />

          <!-- Tilted arrow indicating Variable capacitor -->
          <line x1="218" y1="125" x2="254" y2="75" stroke="#f43f5e" stroke-width="2" />
          <polygon points="254,75 247,78 251,82" fill="#f43f5e" />
          <text x="245" y="138" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">مكثف متغير (C)</text>

          <!-- Connect to Ground Symbol -->
          <path d="M 110 100 L 110 150 M 100 150 L 120 150 M 104 154 L 116 154 M 108 158 L 112 158" fill="none" stroke="#64748b" stroke-width="1.5" />
          <text x="110" y="172" fill="#64748b" font-size="8" text-anchor="middle">أرضي</text>

          <text x="350" y="105" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">رنين التوليف:</text>
          <text x="350" y="125" fill="#cbd5e1" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle">ذ = 1 / [2π √(L C)]</text>
        </svg>
      `;

    case '4-13':
      // Electromagnetic Wave Generation (Dipole Antenna & Oscillating Electron)
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Dipole Antenna Wire -->
          <line x1="225" y1="30" x2="225" y2="170" stroke="#fb923c" stroke-width="4" stroke-linecap="round" />
          <circle cx="225" cy="100" r="8" fill="#1e293b" stroke="#fb923c" stroke-width="2" />
          
          <!-- Signal Source symbol -->
          <path d="M 221 100 Q 223 96 225 100 T 229 100" fill="none" stroke="#fb923c" stroke-width="1.5" />
          
          <!-- Oscillating electron inside wire -->
          <g transform="translate(225, 60)">
            <circle cx="0" cy="0" r="5" fill="#ef4444" />
            <text x="0" y="3" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">-</text>
            <path d="M 0 -12 L 0 -7 M 0 -12 L -3 -10 M 0 -12 L 3 -10" fill="none" stroke="#ef4444" stroke-width="1.2" />
            <path d="M 0 12 L 0 7 M 0 12 L -3 10 M 0 12 L 3 10" fill="none" stroke="#ef4444" stroke-width="1.2" />
          </g>
          
          <!-- Outward spreading wave fronts (dipole fields) -->
          <path d="M 245 40 A 65 65 0 0 1 245 160" fill="none" stroke="rgba(14, 165, 233, 0.2)" stroke-width="2" />
          <path d="M 265 30 A 85 85 0 0 1 265 170" fill="none" stroke="rgba(14, 165, 233, 0.4)" stroke-width="2" />
          <path d="M 285 20 A 105 105 0 0 1 285 180" fill="none" stroke="rgba(14, 165, 233, 0.6)" stroke-width="2.5" />

          <path d="M 205 40 A 65 65 0 0 0 205 160" fill="none" stroke="rgba(14, 165, 233, 0.2)" stroke-width="2" />
          <path d="M 185 30 A 85 85 0 0 0 185 170" fill="none" stroke="rgba(14, 165, 233, 0.4)" stroke-width="2" />
          <path d="M 165 20 A 105 105 0 0 0 165 180" fill="none" stroke="rgba(14, 165, 233, 0.6)" stroke-width="2.5" />

          <!-- Labels -->
          <text x="360" y="105" fill="#0ea5e9" font-size="11" font-weight="bold" text-anchor="middle">جبهات موجية مستعرضة</text>
          <text x="360" y="122" fill="#64748b" font-size="8" text-anchor="middle">تنتشر بسرعة الضوء (ج)</text>
          
          <text x="90" y="95" fill="#fb923c" font-size="10" font-weight="bold" text-anchor="middle">هوائي ثنائي القطب</text>
          <text x="90" y="112" fill="#ef4444" font-size="8" text-anchor="middle">شحنة متذبذبة متسارعة</text>
          
          <text x="225" y="190" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">التسارع المتذبذب للإلكترون في الهوائي يولد المجالين الكهربائي والمغناطيسي</text>
        </svg>
      `;

    case '4-19':
      // Radio Transmitter Block Diagram
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Micro to Amp -->
          <rect x="20" y="35" width="65" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="52" y="53" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">الميكروفون</text>
          
          <path d="M 85 50 L 110 50" stroke="#cbd5e1" stroke-width="1.5" />
          
          <rect x="110" y="35" width="65" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="142" y="53" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">مكبر الصوت السمعي</text>
          
          <path d="M 175 50 L 210 50" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 210 50 L 210 85 L 230 85" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Oscillator to Amp -->
          <rect x="20" y="135" width="65" height="30" fill="#1e293b" stroke="#fb923c" stroke-width="1.5" rx="4" />
          <text x="52" y="153" fill="#fb923c" font-size="9" font-weight="bold" text-anchor="middle">مذبذب عالي التردد</text>
          
          <path d="M 85 150 L 110 150" stroke="#cbd5e1" stroke-width="1.5" />
          
          <rect x="110" y="135" width="65" height="30" fill="#1e293b" stroke="#fb923c" stroke-width="1.5" rx="4" />
          <text x="142" y="153" fill="#fb923c" font-size="8" font-weight="bold" text-anchor="middle">مكبر الموجة الحاملة</text>
          
          <path d="M 175 150 L 210 150" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 210 150 L 210 115 L 230 115" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Mixer (Modulator) -->
          <rect x="230" y="80" width="70" height="40" fill="#1e2d3d" stroke="#10b981" stroke-width="2" rx="4" />
          <text x="265" y="100" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">المازج (المعدل)</text>
          <text x="265" y="112" fill="#cbd5e1" font-size="7" text-anchor="middle">موجة معدلة (AM/FM)</text>

          <path d="M 300 100 L 325 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- RF Power Amp -->
          <rect x="325" y="85" width="55" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="352" y="103" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">مكبر القدرة اللاسلكي</text>

          <path d="M 380 100 L 410 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Antenna -->
          <line x1="410" y1="100" x2="410" y2="70" stroke="#f43f5e" stroke-width="2" />
          <polygon points="410,70 400,50 420,50" fill="none" stroke="#f43f5e" stroke-width="2" />
          <text x="410" y="42" fill="#f43f5e" font-size="8" font-weight="bold" text-anchor="middle">هوائي الإرسال</text>
        </svg>
      `;

    case '4-20':
      // Radio Receiver Block Diagram
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Antenna -->
          <line x1="30" y1="100" x2="30" y2="60" stroke="#f43f5e" stroke-width="2" />
          <polygon points="30,60 20,40 40,40" fill="none" stroke="#f43f5e" stroke-width="2" />
          <text x="30" y="32" fill="#f43f5e" font-size="8" font-weight="bold" text-anchor="middle">هوائي الاستقبال</text>
          
          <path d="M 30 100 L 60 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Tuning Circuit -->
          <rect x="60" y="85" width="60" height="30" fill="#1e293b" stroke="#fb923c" stroke-width="1.5" rx="4" />
          <text x="90" y="103" fill="#fb923c" font-size="8" font-weight="bold" text-anchor="middle">دائرة الرنين (المولف)</text>

          <path d="M 120 100 L 140 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- RF Amplifier -->
          <rect x="140" y="85" width="55" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="167" y="103" fill="#38bdf8" font-size="7" font-weight="bold" text-anchor="middle">مكبر التردد اللاسلكي</text>

          <path d="M 195 100 L 215 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Detector -->
          <rect x="215" y="80" width="60" height="40" fill="#1e2d3d" stroke="#10b981" stroke-width="2" rx="4" />
          <text x="245" y="100" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">دائرة الكاشف</text>
          <text x="245" y="112" fill="#cbd5e1" font-size="7" text-anchor="middle">فصل تيار الصوت</text>

          <path d="M 275 100 L 295 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- AF Amplifier -->
          <rect x="295" y="85" width="60" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="325" y="103" fill="#38bdf8" font-size="7" font-weight="bold" text-anchor="middle">مكبر التردد السمعي</text>

          <path d="M 355 100 L 385 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Speaker -->
          <path d="M 385 95 L 400 95 L 415 80 L 415 120 L 400 105 L 385 105 Z" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5" />
          <circle cx="392" cy="100" r="3" fill="#cbd5e1" />
          <text x="402" y="132" fill="#cbd5e1" font-size="8" font-weight="bold" text-anchor="middle">مكبر الصوت (السماعة)</text>
        </svg>
      `;

    case '4-22':
      // Detector Circuit Schematic (Diode Detector with Low-Pass filter)
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Left Inlet Modulated Wave -->
          <text x="60" y="30" fill="#fb923c" font-size="9" font-weight="bold" text-anchor="middle">إشارة معدلة واردة</text>
          <path d="M 20 80 Q 30 50 40 80 T 60 80 T 80 80 T 100 80" fill="none" stroke="#fb923c" stroke-width="1.5" />
          
          <line x1="85" y1="100" x2="130" y2="100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Diode Symbol (D) -->
          <g transform="translate(130, 85)" fill="none" stroke="#10b981" stroke-width="2">
            <polygon points="10,0 10,30 25,15" fill="rgba(16, 185, 129, 0.2)" />
            <line x1="25" y1="0" x2="25" y2="30" stroke-linecap="round" />
            <text x="18" y="-8" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">الديود (وصلة ثنائية)</text>
          </g>
          
          <line x1="155" y1="100" x2="210" y2="100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Capacitor in Parallel (C) -->
          <line x1="210" y1="100" x2="210" y2="125" stroke="#cbd5e1" stroke-width="1.5" />
          <line x1="195" y1="125" x2="225" y2="125" stroke="#38bdf8" stroke-width="3" />
          <line x1="195" y1="131" x2="225" y2="131" stroke="#38bdf8" stroke-width="3" />
          <line x1="210" y1="131" x2="210" y2="160" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="245" y="142" fill="#38bdf8" font-size="9" font-weight="bold">مكثف (C)</text>

          <line x1="210" y1="100" x2="290" y2="100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Resistor in Parallel (R) -->
          <line x1="290" y1="100" x2="290" y2="115" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 290 115 L 285 118 L 295 122 L 285 126 L 295 130 L 285 134 L 290 137" fill="none" stroke="#fb923c" stroke-width="1.5" />
          <line x1="290" y1="137" x2="290" y2="160" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="315" y="132" fill="#fb923c" font-size="9" font-weight="bold">مقاومة حمولة (R)</text>

          <!-- Common Ground bottom line -->
          <line x1="100" y1="160" x2="330" y2="160" stroke="#cbd5e1" stroke-width="1.5" />
          <!-- Ground indicator -->
          <path d="M 210 160 L 210 170 M 200 170 L 220 170 M 204 174 L 216 174 M 208 178 L 212 178" fill="none" stroke="#cbd5e1" stroke-width="1" />

          <!-- Right Outlet Demodulated Audio Wave -->
          <path d="M 290 100 L 350 100" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="385" y="30" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">إشارة الصوت المنفصلة</text>
          <path d="M 360 100 Q 375 75 390 100 T 420 100" fill="none" stroke="#10b981" stroke-width="2.5" />
          
          <text x="225" y="192" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">تقوم الوصلة بتقويم الإشارة، بينما يسرب المكثف الموجة الحاملة عالية التردد للأرض</text>
        </svg>
      `;

    case '4-23':
      // Television Camera Tube (Iconoscope)
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Glass Bulb Tube Envelope -->
          <path d="M 60 100 C 60 40, 160 30, 200 30 L 340 30 C 360 30, 380 70, 380 100 C 380 130, 360 170, 340 170 L 200 170 C 160 170, 60 160, 60 100 Z" fill="rgba(56, 189, 248, 0.02)" stroke="#475569" stroke-width="2" />
          
          <!-- Optical Lens on Left -->
          <path d="M 15 70 A 40 40 0 0 1 15 130 A 40 40 0 0 1 15 70" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" stroke-width="1.5" />
          <line x1="20" y1="100" x2="60" y2="100" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 2" />
          <text x="25" y="60" fill="#38bdf8" font-size="8" font-weight="bold">العدسة الشيئية</text>

          <!-- Photoelectric Signal Plate (Target) -->
          <rect x="80" y="60" width="10" height="80" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <text x="95" y="103" fill="#10b981" font-size="8" font-weight="bold" [writing-mode:vertical-rl]>لوح الإشارة الحساس</text>

          <!-- Electron Gun in the neck -->
          <g transform="translate(300, 85)">
            <rect x="0" y="5" width="40" height="20" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5" />
            <!-- Filament -->
            <path d="M 5 15 Q 12 10 5 20" fill="none" stroke="#fb923c" stroke-width="1.5" />
            <text x="45" y="18" fill="#cbd5e1" font-size="7">مدفع إلكتروني</text>
          </g>

          <!-- Deflection Coils (Yoke) -->
          <rect x="250" y="32" width="35" height="15" fill="#3b82f6" opacity="0.8" rx="2" />
          <rect x="250" y="153" width="35" height="15" fill="#3b82f6" opacity="0.8" rx="2" />
          <text x="267" y="183" fill="#3b82f6" font-size="7" font-weight="bold" text-anchor="middle">ملفات حارفة</text>

          <!-- Electron Scanning Beam -->
          <line x1="300" y1="100" x2="90" y2="100" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="3 3" />
          <text x="180" y="90" fill="#e11d48" font-size="8" font-weight="bold">شعاع إلكتروني ماسح</text>

          <!-- Output current line -->
          <path d="M 85 140 L 85 185 L 120 185" stroke="#10b981" stroke-width="1.5" />
          <text x="165" y="188" fill="#10b981" font-size="8" font-weight="bold">مخرج التيار المتغير (تيار الصورة)</text>
        </svg>
      `;

    case '4-24':
      // Television Picture Transmission Block Diagram
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Camera Tube -->
          <rect x="20" y="30" width="75" height="35" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="57" y="52" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">أنبوبة آلة التصوير</text>
          
          <path d="M 95 48 L 125 48" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Video Amplifier -->
          <rect x="125" y="30" width="65" height="35" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="157" y="52" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">مكبر إشارة مرئية</text>

          <path d="M 190 48 L 220 48 L 220 85 L 240 85" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Synchronizing Generator -->
          <rect x="50" y="85" width="115" height="30" fill="#1e293b" stroke="#a855f7" stroke-width="1.5" rx="4" />
          <text x="107" y="103" fill="#a855f7" font-size="8" font-weight="bold" text-anchor="middle">مولد نبضات التزامن</text>

          <path d="M 165 100 L 220 100 L 220 100 L 240 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- High frequency carrier -->
          <rect x="50" y="135" width="115" height="30" fill="#1e293b" stroke="#fb923c" stroke-width="1.5" rx="4" />
          <text x="107" y="153" fill="#fb923c" font-size="8" font-weight="bold" text-anchor="middle">مذبذب ومكبر الحامل</text>

          <path d="M 165 150 L 220 150 L 220 115 L 240 115" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Modulator (Mixer) -->
          <rect x="240" y="80" width="70" height="45" fill="#1e2d3d" stroke="#10b981" stroke-width="2" rx="4" />
          <text x="275" y="100" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">جهاز التعديل</text>
          <text x="275" y="112" fill="#cbd5e1" font-size="7" text-anchor="middle">دمج النبضات والصورة</text>

          <path d="M 310 102 L 340 102" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Transmitter -->
          <rect x="340" y="87" width="55" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="367" y="105" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">مكبر القدرة للبث</text>

          <path d="M 395 102 L 420 102" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Antenna -->
          <line x1="420" y1="102" x2="420" y2="65" stroke="#f43f5e" stroke-width="2" />
          <polygon points="420,65 410,45 430,45" fill="none" stroke="#f43f5e" stroke-width="2" />
          <text x="420" y="35" fill="#f43f5e" font-size="8" font-weight="bold" text-anchor="middle">هوائي البث</text>
        </svg>
      `;

    case '4-25':
      // Television Receiver Tube (Cathode Ray Tube CRT)
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Funnel Glass Envelope -->
          <path d="M 50 85 L 180 85 L 340 30 L 340 170 L 180 115 L 50 115 Z" fill="rgba(56, 189, 248, 0.02)" stroke="#475569" stroke-width="2" />
          
          <!-- Phosphor Screen Front -->
          <path d="M 340 30 Q 365 100 340 170" fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" />
          <text x="375" y="105" fill="#38bdf8" font-size="9" font-weight="bold">شاشة الفسفور المتوهجة</text>

          <!-- Electron Gun (Filament/Cathode/Grid) -->
          <g transform="translate(60, 90)">
            <rect x="0" y="0" width="30" height="20" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.2" />
            <path d="M 5 10 Q 12 5 5 15" fill="none" stroke="#fb923c" stroke-width="1.5" />
            <text x="-20" y="13" fill="#cbd5e1" font-size="7">فتيل الكاثود</text>
          </g>

          <!-- Deflection Yoke Coils -->
          <rect x="190" y="55" width="25" height="15" fill="#3b82f6" rx="2" />
          <rect x="190" y="130" width="25" height="15" fill="#3b82f6" rx="2" />
          <text x="202" y="160" fill="#3b82f6" font-size="8" font-weight="bold" text-anchor="middle">الملفات الحارفة</text>

          <!-- Electron Beam (Scanning) -->
          <line x1="90" y1="100" x2="200" y2="100" stroke="#f43f5e" stroke-width="1.5" />
          <line x1="200" y1="100" x2="342" y2="60" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3 3" />
          <line x1="200" y1="100" x2="342" y2="140" stroke="#f43f5e" stroke-width="1.2" stroke-dasharray="3 3" />
          <circle cx="342" cy="60" r="3" fill="#34d399" />
          <circle cx="342" cy="140" r="3" fill="#34d399" />
          
          <text x="260" y="85" fill="#e11d48" font-size="8">مسح أفقي ورأسي (625 خطاً)</text>
        </svg>
      `;

    case '4-26':
      // Television Receiver Block Diagram
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <!-- Antenna -->
          <line x1="30" y1="100" x2="30" y2="60" stroke="#f43f5e" stroke-width="2" />
          <polygon points="30,60 20,40 40,40" fill="none" stroke="#f43f5e" stroke-width="2" />
          <text x="30" y="32" fill="#f43f5e" font-size="8" font-weight="bold" text-anchor="middle">هوائي الاستقبال</text>
          
          <path d="M 30 100 L 55 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Tuning & RF Amp -->
          <rect x="55" y="85" width="55" height="30" fill="#1e293b" stroke="#fb923c" stroke-width="1.5" rx="4" />
          <text x="82" y="103" fill="#fb923c" font-size="8" font-weight="bold" text-anchor="middle">الموالف ومكبر الرنين</text>

          <path d="M 110 100 L 130 100" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Detector -->
          <rect x="130" y="80" width="55" height="40" fill="#1e2d3d" stroke="#10b981" stroke-width="2" rx="4" />
          <text x="157" y="100" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">دائرة الكاشف</text>
          <text x="157" y="112" fill="#cbd5e1" font-size="7" text-anchor="middle">فصل الصوت والصورة</text>

          <!-- Path splits into Video and Audio -->
          <!-- 1. Video (Up) -->
          <path d="M 185 95 L 200 95 L 200 50 L 215 50" stroke="#cbd5e1" stroke-width="1.5" />
          <rect x="215" y="35" width="60" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="245" y="53" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">مكبر الإشارة المرئية</text>
          
          <path d="M 275 50 L 310 50 L 310 65" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Sync Separator & Deflection generators -->
          <path d="M 275 50 L 290 50 L 290 120 L 305 120" stroke="#cbd5e1" stroke-width="1.5" />
          <rect x="305" y="105" width="60" height="30" fill="#1e293b" stroke="#a855f7" stroke-width="1.5" rx="4" />
          <text x="335" y="123" fill="#a855f7" font-size="7" font-weight="bold" text-anchor="middle">مفصل النبضات ومولد المسح</text>

          <!-- CRT Screen -->
          <rect x="375" y="45" width="55" height="50" fill="#1e293b" stroke="#38bdf8" stroke-width="2" rx="6" />
          <path d="M 380 50 Q 425 70 380 90" fill="none" stroke="rgba(56, 189, 248, 0.3)" />
          <text x="402" y="73" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">شاشة العرض</text>

          <path d="M 310 80 L 375 80" stroke="#cbd5e1" stroke-width="1.5" />
          <path d="M 365 120 L 390 120 L 390 95" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- 2. Audio (Down) -->
          <path d="M 185 105 L 200 105 L 200 150 L 215 150" stroke="#cbd5e1" stroke-width="1.5" />
          <rect x="215" y="135" width="60" height="30" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="4" />
          <text x="245" y="153" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">مكبر الصوت السمعي</text>

          <path d="M 275 150 L 305 150" stroke="#cbd5e1" stroke-width="1.5" />

          <!-- Speaker -->
          <path d="M 305 145 L 315 145 L 325 135 L 325 165 L 315 155 L 305 155 Z" fill="#1e293b" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="315" y="180" fill="#cbd5e1" font-size="8" text-anchor="middle">سماعة</text>
        </svg>
      `;

    // --- CHAPTER 1 & 2 ADDED FIGURES ---
    case '1-1':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <circle cx="120" cy="100" r="28" fill="rgba(14, 165, 233, 0.1)" stroke="#38bdf8" stroke-width="2" />
          <circle cx="120" cy="100" r="4" fill="#38bdf8" />
          <text x="120" y="104" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">ك₁</text>
          
          <circle cx="310" cy="100" r="18" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" stroke-width="2" />
          <circle cx="310" cy="100" r="3" fill="#10b981" />
          <text x="310" y="104" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">ك₂</text>
          
          <line x1="120" y1="100" x2="310" y2="100" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 4" />
          
          <path d="M 120 135 L 310 135" stroke="#cbd5e1" stroke-width="1" />
          <line x1="120" y1="110" x2="120" y2="145" stroke="rgba(203, 213, 225, 0.4)" stroke-width="1" />
          <line x1="310" y1="110" x2="310" y2="145" stroke="rgba(203, 213, 225, 0.4)" stroke-width="1" />
          <rect x="195" y="125" width="60" height="18" fill="#090d16" rx="3" />
          <text x="225" y="138" fill="#cbd5e1" font-size="11" font-weight="bold" text-anchor="middle">المسافة (ف)</text>

          <line x1="148" y1="100" x2="200" y2="100" stroke="#f43f5e" stroke-width="2.5" />
          <polygon points="200,100 192,96 192,104" fill="#f43f5e" />
          <text x="174" y="90" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">ق_جاذبية</text>
          
          <line x1="292" y1="100" x2="240" y2="100" stroke="#f43f5e" stroke-width="2.5" />
          <polygon points="240,100 248,96 248,104" fill="#f43f5e" />
          <text x="266" y="90" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">ق_جاذبية</text>

          <text x="225" y="35" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">قانون التثاقل الكوني: ق = ج × (ك₁ × ك₂) / ف²</text>
          <text x="225" y="175" fill="#a855f7" font-size="10" font-weight="bold" text-anchor="middle">قوتان متساويتان في المقدار ومتعاكستان في الاتجاه</text>
        </svg>
      `;

    case '1-1-field':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <circle cx="225" cy="100" r="45" fill="#1e293b" stroke="#3b82f6" stroke-width="2.5" />
          <path d="M 200 80 Q 210 90 205 110 M 235 70 Q 245 90 230 120" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" />
          <text x="225" y="104" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">الأرض</text>

          <line x1="225" y1="15" x2="225" y2="50" stroke="#0ea5e9" stroke-width="1.8" />
          <polygon points="225,52 221,44 229,44" fill="#0ea5e9" />
          
          <line x1="225" y1="185" x2="225" y2="150" stroke="#0ea5e9" stroke-width="1.8" />
          <polygon points="225,148 221,156 229,156" fill="#0ea5e9" />

          <line x1="110" y1="100" x2="175" y2="100" stroke="#0ea5e9" stroke-width="1.8" />
          <polygon points="177,100 169,96 169,104" fill="#0ea5e9" />

          <line x1="340" y1="100" x2="275" y2="100" stroke="#0ea5e9" stroke-width="1.8" />
          <polygon points="273,100 281,96 281,104" fill="#0ea5e9" />

          <line x1="144" y1="19" x2="190" y2="65" stroke="#0ea5e9" stroke-width="1.5" />
          <polygon points="192,67 183,62 189,56" fill="#0ea5e9" />

          <line x1="306" y1="19" x2="260" y2="65" stroke="#0ea5e9" stroke-width="1.5" />
          <polygon points="258,67 261,56 267,62" fill="#0ea5e9" />

          <line x1="144" y1="181" x2="190" y2="135" stroke="#0ea5e9" stroke-width="1.5" />
          <polygon points="192,133 189,144 183,138" fill="#0ea5e9" />

          <line x1="306" y1="181" x2="260" y2="135" stroke="#0ea5e9" stroke-width="1.5" />
          <polygon points="258,133 267,138 261,144" fill="#0ea5e9" />

          <text x="325" y="45" fill="#0ea5e9" font-size="10" font-weight="bold">خطوط المجال التثاقلي</text>
          <text x="325" y="60" fill="#cbd5e1" font-size="8">تتجه دائماً نحو مركز الأرض</text>
          <text x="75" y="155" fill="#a855f7" font-size="10" font-weight="bold">شدة المجال (شد) = ق / ك</text>
        </svg>
      `;

    case '1-2-circular':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <circle cx="225" cy="100" r="6" fill="#64748b" />
          <text x="225" y="118" fill="#cbd5e1" font-size="9" text-anchor="middle">المركز (م)</text>

          <circle cx="225" cy="100" r="65" fill="none" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1.5" stroke-dasharray="4 3" />
          
          <line x1="225" y1="100" x2="179" y2="54" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="208" y="72" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">نق</text>

          <circle cx="179" cy="54" r="10" fill="#fb923c" stroke="#f97316" stroke-width="2" />
          <text x="179" y="40" fill="#fb923c" font-size="10" font-weight="bold" text-anchor="middle">جسم (ك)</text>

          <line x1="179" y1="54" x2="133" y2="100" stroke="#10b981" stroke-width="2.5" />
          <polygon points="133,100 141,94 138,102" fill="#10b981" />
          <text x="105" y="85" fill="#10b981" font-size="10" font-weight="bold">السرعة المماسية (ع)</text>

          <line x1="179" y1="54" x2="211" y2="86" stroke="#f43f5e" stroke-width="2.5" />
          <polygon points="211,86 203,84 209,78" fill="#f43f5e" />
          <text x="220" y="55" fill="#f43f5e" font-size="10" font-weight="bold">ق_الجذب (ق)</text>

          <path d="M 255 85 A 35 35 0 0 0 215 75" fill="none" stroke="#a855f7" stroke-width="1.5" />
          <polygon points="215,75 221,81 214,81" fill="#a855f7" />
          <text x="245" y="65" fill="#a855f7" font-size="10" font-weight="bold" text-anchor="middle">ω (السرعة الزاوية)</text>

          <text x="350" y="90" fill="#38bdf8" font-size="11" font-weight="bold">العجلة المركزية:</text>
          <text x="350" y="110" fill="#cbd5e1" font-size="10" font-weight="bold" font-family="monospace">جـ = ع² / نق</text>
          <text x="350" y="135" fill="#cbd5e1" font-size="10" font-weight="bold" font-family="monospace">ق = ك × نق × ω²</text>
        </svg>
      `;

    case '1-2-banked':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <line x1="50" y1="160" x2="380" y2="160" stroke="#64748b" stroke-width="2" />
          <line x1="50" y1="160" x2="350" y2="80" stroke="#cbd5e1" stroke-width="3" />
          
          <path d="M 120 160 A 70 70 0 0 0 115 143" fill="none" stroke="#38bdf8" stroke-width="1.5" />
          <text x="135" y="153" fill="#38bdf8" font-size="10" font-weight="bold">هـ (الزاوية)</text>
          <text x="80" y="175" fill="#64748b" font-size="9">الرصيف الأفقي</text>

          <g transform="translate(200,120) rotate(-15)">
            <rect x="-20" y="-15" width="40" height="30" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" stroke-width="2" rx="3" />
            <circle cx="-10" cy="15" r="5" fill="#475569" />
            <circle cx="10" cy="15" r="5" fill="#475569" />
            
            <g transform="rotate(15)">
              <line x1="0" y1="0" x2="0" y2="55" stroke="#ef4444" stroke-width="2.5" />
              <polygon points="0,55 -4,47 4,47" fill="#ef4444" />
              <text x="15" y="50" fill="#ef4444" font-size="10" font-weight="bold">الوزن و = ك × د</text>

              <line x1="0" y1="0" x2="-65" y2="0" stroke="#10b981" stroke-width="2.5" />
              <polygon points="-65,0 -57,-4 -57,4" fill="#10b981" />
              <text x="-60" y="-10" fill="#10b981" font-size="9" font-weight="bold">قوة الجذب المركزية</text>
            </g>

            <line x1="0" y1="-15" x2="0" y2="-65" stroke="#a855f7" stroke-width="2" />
            <polygon points="0,-65 -4,-57 4,-57" fill="#a855f7" />
            <text x="12" y="-55" fill="#a855f7" font-size="9" font-weight="bold">رد الفعل (ر)</text>
          </g>

          <text x="340" y="45" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">علاقة ميل الطرق الآمن:</text>
          <text x="340" y="65" fill="#cbd5e1" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle">ظا (هـ) = ع² / (نق × د)</text>
        </svg>
      `;

    case '1-3-kepler':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <ellipse cx="225" cy="100" rx="140" ry="60" fill="none" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1" />
          <ellipse cx="225" cy="100" rx="140" ry="60" fill="none" stroke="#38bdf8" stroke-width="2" />

          <circle cx="310" cy="100" r="18" fill="#fbbf24" />
          <circle cx="310" cy="100" r="22" fill="none" stroke="rgba(251, 191, 36, 0.3)" stroke-width="2" stroke-dasharray="2 2" />
          <text x="310" y="132" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">الشمس (البؤرة)</text>

          <line x1="140" y1="95" x2="140" y2="105" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1.5" />
          <line x1="135" y1="100" x2="145" y2="100" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1.5" />

          <polygon points="310,100 353,74 365,100 353,126" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="1" />
          <text x="345" y="112" fill="#10b981" font-size="9" font-weight="bold">مساحة أ</text>

          <polygon points="310,100 90,88 85,100 90,112" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="1" />
          <text x="110" y="112" fill="#10b981" font-size="9" font-weight="bold">مساحة ب</text>
          
          <text x="225" y="175" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">مساحة أ = مساحة ب (خلال نفس الفترة الزمنية ن)</text>

          <circle cx="85" cy="100" r="6" fill="#0ea5e9" />
          <text x="65" y="104" fill="#0ea5e9" font-size="10" font-weight="bold">الأوج</text>
          <line x1="85" y1="100" x2="85" y2="75" stroke="#ef4444" stroke-width="1.5" />
          <polygon points="85,75 82,81 88,81" fill="#ef4444" />
          <text x="85" y="65" fill="#ef4444" font-size="8" text-anchor="middle">ع_بطيئة</text>

          <circle cx="365" cy="100" r="6" fill="#0ea5e9" />
          <text x="395" y="104" fill="#0ea5e9" font-size="10" font-weight="bold">الحضيض</text>
          <line x1="365" y1="100" x2="365" y2="45" stroke="#ef4444" stroke-width="2" />
          <polygon points="365,45 361,53 369,53" fill="#ef4444" />
          <text x="365" y="35" fill="#ef4444" font-size="8" text-anchor="middle">ع_سريعة</text>
        </svg>
      `;

    case '1-3-satellite':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <circle cx="225" cy="100" r="30" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <path d="M 210 90 Q 215 95 212 110" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" />
          <text x="225" y="104" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">الأرض</text>

          <circle cx="225" cy="100" r="55" fill="none" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1.2" stroke-dasharray="3 2" />
          <g transform="translate(255, 55)">
            <rect x="-6" y="-4" width="12" height="8" fill="#cbd5e1" rx="1" />
            <rect x="-12" y="-2" width="6" height="4" fill="#38bdf8" />
            <rect x="6" y="-2" width="6" height="4" fill="#38bdf8" />
            <line x1="0" y1="0" x2="-20" y2="-15" stroke="#10b981" stroke-width="1.5" />
            <polygon points="-20,-15 -13,-14 -16,-10" fill="#10b981" />
          </g>
          <text x="290" y="50" fill="#cbd5e1" font-size="8">مدار منخفض (LEO)</text>

          <circle cx="225" cy="100" r="85" fill="none" stroke="rgba(168, 85, 247, 0.3)" stroke-width="1.5" stroke-dasharray="4 3" />
          <g transform="translate(310, 100)">
            <circle cx="0" cy="0" r="5" fill="#a855f7" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#cbd5e1" stroke-width="1.5" />
            <rect x="-10" y="-4" width="4" height="8" fill="#38bdf8" />
            <rect x="6" y="-4" width="4" height="8" fill="#38bdf8" />
            <line x1="0" y1="0" x2="-85" y2="0" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="2 2" />
          </g>
          <text x="325" y="115" fill="#a855f7" font-size="9" font-weight="bold">مدار متزامن (GEO)</text>
          <text x="325" y="128" fill="#94a3b8" font-size="7">الارتفاع ≈ 35,900 كم</text>

          <text x="100" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">السرعة المدارية:</text>
          <text x="100" y="65" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">ع = √(ج × ك_أ / ف)</text>
          
          <text x="100" y="135" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">سرعة الإفلات:</text>
          <text x="100" y="155" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">ع = √(2 × ج × ك_أ / نق)</text>
        </svg>
      `;

    case '1-2':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <line x1="40" y1="100" x2="410" y2="100" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6 4" />
          <text x="50" y="118" fill="#64748b" font-size="9">مستوى الاتزان (ماء ساكن)</text>

          <path d="M 40 100 Q 90 40 140 100 T 240 100 T 340 100 T 410 100" fill="none" stroke="#0ea5e9" stroke-width="3.5" />

          <text x="90" y="32" fill="#0ea5e9" font-size="10" font-weight="bold" text-anchor="middle">قمة (أقصى ارتفاع)</text>
          <line x1="90" y1="40" x2="90" y2="100" stroke="rgba(14, 165, 233, 0.4)" stroke-width="1" />

          <text x="190" y="172" fill="#0ea5e9" font-size="10" font-weight="bold" text-anchor="middle">قاع (أدنى انخفاض)</text>
          <line x1="190" y1="160" x2="190" y2="100" stroke="rgba(14, 165, 233, 0.4)" stroke-width="1" />

          <g transform="translate(115, 70)">
            <ellipse cx="0" cy="0" rx="14" ry="7" fill="#fb923c" stroke="#f97316" stroke-width="1.5" />
            <line x1="0" y1="0" x2="0" y2="-18" stroke="#cbd5e1" stroke-width="2" />
            <polygon points="0,-18 6,-15 0,-10" fill="#ef4444" />
          </g>
          <text x="115" y="45" fill="#fb923c" font-size="9" font-weight="bold" text-anchor="middle">قطعة فلين</text>
          
          <path d="M 150 55 L 150 95" stroke="#10b981" stroke-width="2" />
          <polygon points="150,55 147,61 153,61" fill="#10b981" />
          <polygon points="150,95 147,89 153,89" fill="#10b981" />
          <text x="160" y="78" fill="#10b981" font-size="9" font-weight="bold">اهتزاز رأسي</text>

          <path d="M 285 100 L 285 45" stroke="#f43f5e" stroke-width="2" />
          <polygon points="285,45 282,51 288,51" fill="#f43f5e" />
          <polygon points="285,100 282,94 288,94" fill="#f43f5e" />
          <text x="300" y="75" fill="#f43f5e" font-size="10" font-weight="bold">الاتساع (أ)</text>
        </svg>
      `;

    case '2-2':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <g transform="translate(0, 0)">
            <text x="110" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">(أ) البندول البسيط</text>
            <line x1="50" y1="40" x2="170" y2="40" stroke="#cbd5e1" stroke-width="2" />
            <line x1="60" y1="35" x2="70" y2="40" stroke="#cbd5e1" stroke-width="1" />
            <line x1="80" y1="35" x2="90" y2="40" stroke="#cbd5e1" stroke-width="1" />
            <line x1="100" y1="35" x2="110" y2="40" stroke="#cbd5e1" stroke-width="1" />
            <line x1="120" y1="35" x2="130" y2="40" stroke="#cbd5e1" stroke-width="1" />
            <line x1="140" y1="35" x2="150" y2="40" stroke="#cbd5e1" stroke-width="1" />

            <line x1="110" y1="40" x2="110" y2="150" stroke="rgba(148, 163, 184, 0.3)" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="110" y="165" fill="#94a3b8" font-size="9" text-anchor="middle">موضع الاتزان</text>

            <path d="M 75 137 A 65 65 0 0 0 145 137" fill="none" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1" stroke-dasharray="2 2" />

            <line x1="110" y1="40" x2="75" y2="137" stroke="#cbd5e1" stroke-width="1.5" />
            <circle cx="75" cy="137" r="10" fill="#fb923c" stroke="#f97316" stroke-width="2" />
            <text x="50" y="152" fill="#fb923c" font-size="9" font-weight="bold">أقصى إزاحة (-أ)</text>

            <line x1="110" y1="40" x2="145" y2="137" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2 2" />
            <circle cx="145" cy="137" r="10" fill="rgba(251, 146, 60, 0.3)" stroke="rgba(249, 115, 22, 0.3)" stroke-width="1.5" />
            <text x="170" y="152" fill="#94a3b8" font-size="9">أقصى إزاحة (+أ)</text>

            <path d="M 110 120 A 50 50 0 0 0 85 115" fill="none" stroke="#10b981" stroke-width="1.5" />
            <polygon points="85,115 91,120 91,111" fill="#10b981" />
            <text x="95" y="105" fill="#10b981" font-size="9" font-weight="bold">الإزاحة ص</text>
          </g>

          <line x1="225" y1="20" x2="225" y2="180" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1" stroke-dasharray="4 4" />

          <g transform="translate(220, 0)">
            <text x="110" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">(ب) البندول الزنبركي</text>
            <line x1="50" y1="40" x2="170" y2="40" stroke="#cbd5e1" stroke-width="2" />

            <path d="M 110 40 L 110 50 L 118 55 L 102 65 L 118 75 L 102 85 L 118 95 L 102 105 L 110 110 L 110 120" fill="none" stroke="#38bdf8" stroke-width="2" />

            <rect x="92" y="120" width="36" height="24" fill="#a855f7" stroke="#8b5cf6" stroke-width="2" rx="2" />
            <text x="110" y="135" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">الكتلة (ك)</text>

            <line x1="70" y1="132" x2="150" y2="132" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" stroke-dasharray="4 3" />
            <text x="55" y="135" fill="#cbd5e1" font-size="8">مستوى الاتزان</text>

            <path d="M 160 132 L 160 105" stroke="#10b981" stroke-width="1.5" />
            <polygon points="160,105 157,111 163,111" fill="#10b981" />
            <path d="M 160 132 L 160 155" stroke="#10b981" stroke-width="1.5" />
            <polygon points="160,155 157,149 163,149" fill="#10b981" />
            <text x="180" y="135" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">± ص</text>
          </g>
        </svg>
      `;

    case '2-3':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <g stroke="#fbbf24" stroke-width="1" stroke-dasharray="4 3">
            <line x1="20" y1="50" x2="150" y2="50" />
            <line x1="20" y1="100" x2="150" y2="100" />
            <line x1="20" y1="150" x2="150" y2="150" />
          </g>
          <text x="50" y="35" fill="#fbbf24" font-size="9" font-weight="bold">أشعة ضوء متوازية</text>

          <circle cx="210" cy="100" r="50" fill="none" stroke="#cbd5e1" stroke-width="2" />
          <circle cx="210" cy="100" r="4" fill="#cbd5e1" />
          
          <line x1="210" y1="100" x2="235" y2="57" stroke="#38bdf8" stroke-width="2" />
          <circle cx="235" cy="57" r="8" fill="#fb923c" stroke="#f97316" stroke-width="2" />
          <text x="248" y="52" fill="#fb923c" font-size="9" font-weight="bold">جسم يدور (دائري)</text>
          
          <path d="M 225 100 A 15 15 0 0 0 218 87" fill="none" stroke="#cbd5e1" stroke-width="1" />
          <text x="228" y="93" fill="#cbd5e1" font-size="8">هـ</text>

          <line x1="235" y1="57" x2="350" y2="57" stroke="rgba(244, 63, 94, 0.4)" stroke-width="1.5" stroke-dasharray="2 2" />
          <line x1="210" y1="100" x2="350" y2="100" stroke="rgba(244, 63, 94, 0.2)" stroke-width="1" stroke-dasharray="4 4" />

          <line x1="350" y1="30" x2="350" y2="170" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" />
          <text x="385" y="105" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">حاجز استقبال الظل</text>

          <ellipse cx="350" cy="57" rx="6" ry="12" fill="#ef4444" />
          <text x="325" y="61" fill="#ef4444" font-size="9" font-weight="bold" text-anchor="middle">الظل</text>

          <path d="M 362 50 L 362 150" stroke="#10b981" stroke-width="1.5" />
          <polygon points="362,50 359,56 365,56" fill="#10b981" />
          <polygon points="362,150 359,144 365,144" fill="#10b981" />
          <text x="378" y="152" fill="#10b981" font-size="8" font-weight="bold">حركة توافقية</text>

          <text x="225" y="185" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">ظل الحركة الدائرية هو حركة توافقية بسيطة صعوداً وهبوطاً</text>
        </svg>
      `;

    case '2-4':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <line x1="50" y1="40" x2="410" y2="40" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />
          <line x1="50" y1="160" x2="410" y2="160" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />

          <line x1="50" y1="100" x2="410" y2="100" stroke="#cbd5e1" stroke-width="2" />
          <polygon points="410,100 402,96 402,104" fill="#cbd5e1" />
          <text x="415" y="104" fill="#cbd5e1" font-size="10" font-weight="bold">هـ (أو ن)</text>

          <line x1="80" y1="20" x2="80" y2="180" stroke="#cbd5e1" stroke-width="2" />
          <polygon points="80,20 76,28 84,28" fill="#cbd5e1" />
          <text x="80" y="14" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">ص (الإزاحة)</text>

          <path d="M 80 100 C 115 20, 185 20, 220 100 C 255 180, 325 180, 360 100" fill="none" stroke="#0ea5e9" stroke-width="3" />

          <circle cx="80" cy="100" r="3" fill="#cbd5e1" />
          <text x="70" y="115" fill="#cbd5e1" font-size="9" font-weight="bold">0</text>

          <line x1="150" y1="96" x2="150" y2="104" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="150" y="115" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">π/2 (90°)</text>

          <circle cx="220" cy="100" r="3" fill="#cbd5e1" />
          <text x="220" y="115" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">π (180°)</text>

          <line x1="290" y1="96" x2="290" y2="104" stroke="#cbd5e1" stroke-width="1.5" />
          <text x="290" y="115" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">3π/2 (270°)</text>

          <circle cx="360" cy="100" r="3" fill="#cbd5e1" />
          <text x="360" y="115" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">2π (360°)</text>

          <line x1="65" y1="50" x2="150" y2="50" stroke="rgba(244, 63, 94, 0.4)" stroke-width="1" stroke-dasharray="2 2" />
          <text x="65" y="54" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="end">+أ (الاتساع)</text>
          
          <line x1="65" y1="150" x2="290" y2="150" stroke="rgba(244, 63, 94, 0.4)" stroke-width="1" stroke-dasharray="2 2" />
          <text x="65" y="154" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="end">-أ</text>

          <text x="250" y="35" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">المنحنى الجيبي: ص = أ × جا (ω × ن)</text>
        </svg>
      `;

    case '2-6':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <g transform="translate(0, 0)">
            <text x="110" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">(أ) موجة كروية</text>
            
            <circle cx="60" cy="100" r="5" fill="#fbbf24" />
            <text x="60" y="120" fill="#fbbf24" font-size="9" font-weight="bold" text-anchor="middle">م (المصدر)</text>

            <path d="M 110 50 A 70 70 0 0 1 110 150" fill="none" stroke="#38bdf8" stroke-width="2" />
            <text x="112" y="42" fill="#38bdf8" font-size="8">صدر موجة قديم</text>

            <circle cx="98" cy="65" r="3" fill="#ef4444" />
            <text x="90" y="65" fill="#ef4444" font-size="8" font-weight="bold">أ</text>
            <path d="M 123 45 A 30 30 0 0 1 123 85" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1" stroke-dasharray="2 2" />

            <circle cx="110" cy="100" r="3" fill="#ef4444" />
            <text x="102" y="104" fill="#ef4444" font-size="8" font-weight="bold">ب</text>
            <path d="M 135 80 A 30 30 0 0 1 135 120" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1" stroke-dasharray="2 2" />

            <circle cx="98" cy="135" r="3" fill="#ef4444" />
            <text x="90" y="138" fill="#ef4444" font-size="8" font-weight="bold">جـ</text>
            <path d="M 123 115 A 30 30 0 0 1 123 155" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1" stroke-dasharray="2 2" />

            <path d="M 137 50 A 95 95 0 0 1 137 150" fill="none" stroke="#10b981" stroke-width="2.5" />
            <text x="142" y="42" fill="#10b981" font-size="8" font-weight="bold">د (صدر جديد)</text>
            
            <text x="110" y="175" fill="#cbd5e1" font-size="8" text-anchor="middle">نصف قطر المويجة = ع × ن</text>
          </g>

          <line x1="225" y1="20" x2="225" y2="180" stroke="rgba(148, 163, 184, 0.2)" stroke-width="1" stroke-dasharray="4 4" />

          <g transform="translate(220, 0)">
            <text x="110" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">(ب) موجة مستوية</text>
            
            <line x1="60" y1="50" x2="60" y2="150" stroke="#38bdf8" stroke-width="2" />
            <text x="60" y="42" fill="#38bdf8" font-size="8" text-anchor="middle">قديم</text>

            <circle cx="60" cy="65" r="3" fill="#ef4444" />
            <path d="M 60 40 A 25 25 0 0 1 85 65 A 25 25 0 0 1 60 90" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1" stroke-dasharray="2 2" />

            <circle cx="60" cy="100" r="3" fill="#ef4444" />
            <path d="M 60 75 A 25 25 0 0 1 85 100 A 25 25 0 0 1 60 125" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1" stroke-dasharray="2 2" />

            <circle cx="60" cy="135" r="3" fill="#ef4444" />
            <path d="M 60 110 A 25 25 0 0 1 85 135 A 25 25 0 0 1 60 160" fill="none" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1" stroke-dasharray="2 2" />

            <line x1="85" y1="50" x2="85" y2="150" stroke="#10b981" stroke-width="2.5" />
            <text x="85" y="42" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">جديد</text>

            <line x1="85" y1="100" x2="125" y2="100" stroke="#fbbf24" stroke-width="1.5" />
            <polygon points="125,100 117,96 117,104" fill="#fbbf24" />
            <text x="110" y="90" fill="#fbbf24" font-size="8" font-weight="bold">اتجاه السير</text>
          </g>
        </svg>
      `;

    case '2-4-refraction':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <line x1="40" y1="100" x2="410" y2="100" stroke="#38bdf8" stroke-width="2.5" />
          
          <rect x="40" y="20" width="370" height="80" fill="rgba(255, 255, 255, 0.02)" />
          <text x="60" y="40" fill="#a855f7" font-size="10" font-weight="bold">الوسط (1) - هواء (ن₁)</text>

          <rect x="40" y="100" width="370" height="80" fill="rgba(14, 165, 233, 0.08)" />
          <text x="60" y="120" fill="#a855f7" font-size="10" font-weight="bold">الوسط (2) - ماء/زجاج (ن₂)</text>

          <line x1="225" y1="30" x2="225" y2="170" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4" />
          <text x="235" y="40" fill="#cbd5e1" font-size="9">العمود المقام</text>

          <line x1="140" y1="30" x2="225" y2="100" stroke="#fbbf24" stroke-width="2.5" />
          <polygon points="187,69 178,66 183,61" fill="#fbbf24" />
          <text x="120" y="50" fill="#fbbf24" font-size="10" font-weight="bold">شعاع ساقط</text>

          <line x1="225" y1="100" x2="265" y2="170" stroke="#fbbf24" stroke-width="2.5" />
          <polygon points="247,138 245,130 251,133" fill="#fbbf24" />
          <text x="280" y="160" fill="#fbbf24" font-size="10" font-weight="bold">شعاع منكسر</text>

          <path d="M 225 70 A 30 30 0 0 0 198 78" fill="none" stroke="#f43f5e" stroke-width="1.5" />
          <text x="210" y="65" fill="#f43f5e" font-size="10" font-weight="bold">هـ₁</text>

          <path d="M 225 130 A 30 30 0 0 1 241 128" fill="none" stroke="#10b981" stroke-width="1.5" />
          <text x="235" y="142" fill="#10b981" font-size="10" font-weight="bold">هـ₂</text>

          <text x="340" y="70" fill="#38bdf8" font-size="12" font-weight="bold">قانون سنل:</text>
          <text x="340" y="90" fill="#cbd5e1" font-size="11" font-weight="bold" font-family="monospace">ن₁ جا هـ₁ = ن₂ جا هـ₂</text>
        </svg>
      `;

    case '2-4-prism':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <polygon points="225,40 130,150 320,150" fill="rgba(255, 255, 255, 0.03)" stroke="#38bdf8" stroke-width="2.5" />
          <text x="225" y="115" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">منشور زجاجي</text>

          <line x1="40" y1="110" x2="175" y2="100" stroke="#ffffff" stroke-width="3" />
          <polygon points="110,105 102,101 104,109" fill="#ffffff" />
          <text x="80" y="90" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">ضوء أبيض</text>

          <line x1="175" y1="100" x2="250" y2="110" stroke="#ef4444" stroke-width="1.5" />
          <line x1="175" y1="100" x2="245" y2="122" stroke="#a855f7" stroke-width="1.5" />

          <line x1="250" y1="110" x2="360" y2="90" stroke="#ef4444" stroke-width="2.5" />
          <text x="370" y="94" fill="#ef4444" font-size="10" font-weight="bold">أحمر (أقل انحرافاً)</text>

          <line x1="248" y1="114" x2="360" y2="108" stroke="#fbbf24" stroke-width="2" />
          <line x1="246" y1="118" x2="360" y2="125" stroke="#10b981" stroke-width="2" />

          <line x1="245" y1="122" x2="360" y2="145" stroke="#a855f7" stroke-width="2.5" />
          <text x="370" y="149" fill="#a855f7" font-size="10" font-weight="bold">بنفسجي (أكثر انحرافاً)</text>

          <text x="225" y="180" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">تشتت الضوء الأبيض لألوان الطيف السبعة بسبب اختلاف الانكسار</text>
        </svg>
      `;

    case '2-5-lens-convex':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <line x1="40" y1="100" x2="410" y2="100" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4" />
          <text x="50" y="115" fill="#64748b" font-size="9">المحور الأساسي</text>

          <path d="M 225 30 A 100 100 0 0 1 225 170 A 100 100 0 0 1 225 30" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="2.5" />
          <text x="225" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">عدسة محدبة (لامة)</text>

          <circle cx="155" cy="100" r="3" fill="#cbd5e1" />
          <text x="155" y="115" fill="#cbd5e1" font-size="9" text-anchor="middle">ب</text>
          <circle cx="85" cy="100" r="3" fill="#cbd5e1" />
          <text x="85" y="115" fill="#cbd5e1" font-size="9" text-anchor="middle">2ب</text>

          <circle cx="295" cy="100" r="3" fill="#cbd5e1" />
          <text x="295" y="115" fill="#cbd5e1" font-size="9" text-anchor="middle">ب</text>
          <circle cx="365" cy="100" r="3" fill="#cbd5e1" />
          <text x="365" y="115" fill="#cbd5e1" font-size="9" text-anchor="middle">2ب</text>

          <line x1="70" y1="100" x2="70" y2="60" stroke="#fbbf24" stroke-width="3" />
          <polygon points="70,60 66,68 74,68" fill="#fbbf24" />
          <text x="70" y="52" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">الجسم</text>

          <line x1="325" y1="100" x2="325" y2="123" stroke="#10b981" stroke-width="2.5" />
          <polygon points="325,123 321,115 329,115" fill="#10b981" />
          <text x="325" y="137" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">الصورة (مقلوبة)</text>

          <line x1="70" y1="60" x2="225" y2="60" stroke="rgba(251, 191, 36, 0.4)" stroke-width="1.5" />
          <line x1="225" y1="60" x2="325" y2="123" stroke="rgba(251, 191, 36, 0.8)" stroke-width="1.5" />

          <line x1="70" y1="60" x2="325" y2="123" stroke="rgba(168, 85, 247, 0.8)" stroke-width="1.5" />
        </svg>
      `;

    case '2-6-telescope':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <line x1="80" y1="60" x2="370" y2="70" stroke="rgba(148, 163, 184, 0.15)" stroke-width="1" stroke-dasharray="2 2" />
          <line x1="80" y1="140" x2="370" y2="130" stroke="rgba(148, 163, 184, 0.15)" stroke-width="1" stroke-dasharray="2 2" />
          <text x="220" y="45" fill="#64748b" font-size="9" text-anchor="middle">أنبوبة التلسكوب</text>

          <path d="M 80 50 A 150 150 0 0 1 80 150 A 150 150 0 0 1 80 50" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="2.5" />
          <text x="80" y="38" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">العدسة الشيئية</text>

          <path d="M 370 75 A 50 50 0 0 1 370 125 A 50 50 0 0 1 370 75" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="2" />
          <text x="370" y="65" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">العدسة العينية</text>

          <line x1="40" y1="100" x2="410" y2="100" stroke="#64748b" stroke-width="1" stroke-dasharray="4 4" />

          <path d="M 40 70 L 80 75 L 290 108 L 370 100 L 410 115" fill="none" stroke="#fbbf24" stroke-width="1.5" />
          <path d="M 40 100 L 80 100 L 290 100 L 370 100 L 410 100" fill="none" stroke="rgba(251, 191, 36, 0.5)" stroke-width="1" />
          <path d="M 40 130 L 80 125 L 290 92 L 370 100 L 410 85" fill="none" stroke="#fbbf24" stroke-width="1.5" />

          <line x1="290" y1="100" x2="290" y2="108" stroke="#10b981" stroke-width="2" />
          <polygon points="290,108 288,104 292,104" fill="#10b981" />
          <text x="290" y="122" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">الصورة المتوسطة</text>
          
          <text x="225" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">التلسكوب الفلكي: تجميع وتكبير الأجرام البعيدة</text>
        </svg>
      `;

    case '2-7-mirror-concave':
      return `
        <svg viewBox="0 0 450 200" class="w-full max-w-lg h-auto mx-auto select-none" style="background: #090d16; border-radius: 1rem;">
          <line x1="40" y1="100" x2="410" y2="100" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 4" />
          <text x="50" y="115" fill="#64748b" font-size="9">المحور الأساسي</text>

          <path d="M 330 40 A 100 100 0 0 0 330 160" fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round" />
          <path d="M 335 45 L 340 40 M 335 65 L 340 60 M 335 85 L 340 80 M 335 105 L 340 100 M 335 125 L 340 120 M 335 145 L 340 140" stroke="rgba(148, 163, 184, 0.4)" stroke-width="1" />
          <text x="375" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">مرآة مقعرة (لامة)</text>

          <circle cx="330" cy="100" r="3" fill="#cbd5e1" />
          <text x="330" y="115" fill="#cbd5e1" font-size="9" text-anchor="middle">ق (القطب)</text>

          <circle cx="250" cy="100" r="3.5" fill="#f43f5e" />
          <text x="250" y="115" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">ب (البؤرة)</text>

          <circle cx="170" cy="100" r="3.5" fill="#cbd5e1" />
          <text x="170" y="115" fill="#cbd5e1" font-size="9" text-anchor="middle">م (التكور)</text>

          <line x1="50" y1="55" x2="330" y2="55" stroke="#fbbf24" stroke-width="1.8" />
          <polygon points="180,55 172,51 172,59" fill="#fbbf24" />
          <line x1="330" y1="55" x2="170" y2="145" stroke="#fbbf24" stroke-width="1.8" />
          <polygon points="266,91 271,85 277,90" fill="#fbbf24" />

          <line x1="50" y1="145" x2="330" y2="145" stroke="#fbbf24" stroke-width="1.8" />
          <polygon points="180,145 172,141 172,149" fill="#fbbf24" />
          <line x1="330" y1="145" x2="170" y2="55" stroke="#fbbf24" stroke-width="1.8" />
          <polygon points="266,109 277,110 271,115" fill="#fbbf24" />

          <text x="225" y="175" fill="#cbd5e1" font-size="10" font-weight="bold" text-anchor="middle">تتجمع الأشعة الساقطة المتوازية والمنعكسة في البؤرة (ب)</text>
        </svg>
      `;

    default:
      // Return null so we fall back to raw text placeholder
      return null;
  }
}
