/* =========================================================================
   1. SOLARIS EDUCATION LOGO (Top-left compass star + SOLARIS EDUCATION text)
   ========================================================================= */
export const SolarisLogo = ({ darkBg = false }) => {
  const starColor = darkBg ? '#0d2235' : '#183148';
  const innerCircleColor = darkBg ? '#8eb4d2' : '#739cb9';
  const goldColor = darkBg ? '#bfa571' : '#b79e6b';

  return (
    <div
      dir="ltr"
      className="absolute top-[clamp(18px,3.5vh,36px)] left-[clamp(18px,3.8vw,48px)] z-30 flex items-center gap-2"
    >
      <svg
        width="54"
        height="54"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(42px,5vw,56px)] h-[clamp(42px,5vw,56px)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] animate-[logoStarPulse_6s_ease-in-out_infinite]"
      >
        <polygon points="34,26 56,8 38,30 8,58" fill={starColor} />
        <polygon points="34,6 38,24 56,28 38,32 34,50 30,32 12,28 30,24" fill={starColor} />
        <polygon points="19,13 32,23 49,13 39,26 49,43 32,33 19,43 29,26" fill={starColor} />
        <circle cx="34" cy="28" r="7.5" fill="#f7f7f5" stroke={starColor} strokeWidth="2" />
        <circle cx="34" cy="28" r="4.5" fill="none" stroke={innerCircleColor} strokeWidth="1.8" />
        <circle cx="34" cy="28" r="2" fill={starColor} />
      </svg>
      <div className="flex flex-col items-center leading-none">
        <span
          className="font-['Switzer',sans-serif] text-[clamp(16px,2vw,22px)] font-bold tracking-[2px]"
          style={{ color: goldColor }}
        >
          SOLARIS
        </span>
        <span
          className="font-['Switzer',sans-serif] text-[clamp(6px,0.7vw,7.5px)] font-semibold tracking-[2.6px] mt-[3px] opacity-90"
          style={{ color: goldColor }}
        >
          EDUCATION
        </span>
      </div>
    </div>
  );
};

/* =========================================================================
   2. FLOATING LINE-ART ASTRONAUT WITH TETHER CORD (100% Tailwind CSS)
   ========================================================================= */
export const LineArtAstronaut = ({ strokeColor = '#284b63' }) => {
  return (
    <div className="absolute top-[11%] max-lg:top-[10%] lg:top-[clamp(65px,12vh,140px)] -left-3 sm:-left-2 w-[145px] sm:w-[clamp(150px,25vw,240px)] lg:w-[clamp(145px,27vw,370px)] z-10 pointer-events-none">
      <svg
        viewBox="0 0 380 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <path
          d="M -20 155 C 35 205, 85 195, 128 148 C 165 108, 205 112, 238 142"
          stroke={strokeColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
          className="animate-[tetherWave_6.5s_ease-in-out_infinite]"
        />

        <g
          className="origin-[250px_140px] animate-[astronautZeroG_6.5s_ease-in-out_infinite]"
          stroke={strokeColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M 275 86 L 286 76 C 292 71, 300 72, 305 77 L 344 114 C 349 119, 349 127, 344 133 L 288 192 C 283 197, 275 197, 269 191 L 258 181"
            fill="#f7f7f5"
          />
          <path
            d="M 255 123 L 222 158 C 218 162, 219 169, 224 173 L 236 182"
            fill="#f7f7f5"
          />
          <path
            d="M 244 43
               C 244 26, 252 22, 258 23
               C 264 24, 266 32, 265 44
               L 264 68
               L 282 88
               L 325 130
               L 314 196
               L 294 192
               L 297 156
               L 206 250
               L 196 271
               L 184 252
               L 172 238
               L 185 232
               L 246 168
               L 234 159
               L 165 206
               L 153 216
               L 132 206
               L 119 198
               L 136 190
               L 206 142
               L 252 104
               L 238 82
               C 235 72, 239 55, 244 43 Z"
            fill="#f7f7f5"
          />
          <path
            d="M 243 44 C 241 30, 246 21, 254 22 C 262 23, 265 32, 262 45 Z"
            fill="#f7f7f5"
          />
          <line x1="242" y1="44" x2="262" y2="46" />
          <path
            d="M 295 192 L 292 207 C 290 216, 297 221, 304 218 C 310 215, 313 207, 314 196 Z"
            fill="#f7f7f5"
          />
          <path
            d="M 225 162 C 234 170, 244 166, 252 154 C 258 144, 264 139, 272 142"
            fill="none"
          />
          <line x1="146" y1="184" x2="160" y2="208" />
          <line x1="186" y1="229" x2="205" y2="248" />
          <path
            d="M 294 94
               C 305 74, 329 70, 344 84
               C 359 98, 356 122, 336 134
               C 324 141, 312 138, 300 126
               C 289 115, 287 104, 294 94 Z"
            fill="#f7f7f5"
          />
          <path
            d="M 299 95
               C 309 82, 327 81, 339 92
               C 350 103, 350 120, 336 131"
            fill="none"
          />
          <line x1="334" y1="112" x2="326" y2="120" />
          <polygon points="286,108 313,133 291,156 264,131" fill="#f7f7f5" />
          <line x1="285" y1="120" x2="280" y2="125" strokeWidth="3" />
          <line x1="293" y1="127" x2="288" y2="132" strokeWidth="3" />
          <line x1="301" y1="134" x2="287" y2="147" strokeWidth="3" />
          <line x1="276" y1="131" x2="281" y2="136" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};

/* =========================================================================
   3. 3D CRATERED BLUE PLANET / MOON (100% Tailwind CSS)
   ========================================================================= */
export const CrateredPlanet = ({ size, className = '', idSuffix = 'main' }) => {
  const gradId = `planetGrad-${idSuffix}`;
  const shadowId = `planetShadow-${idSuffix}`;
  const craterGradId = `craterGrad-${idSuffix}`;
  const sizeStyle = size ? { width: size, height: size } : undefined;

  return (
    <div className={className} style={sizeStyle}>
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId} cx="35%" cy="30%" r="70%" fx="30%" fy="25%">
            <stop offset="0%" stopColor="#6599c9" />
            <stop offset="42%" stopColor="#3b6e9e" />
            <stop offset="78%" stopColor="#1d4266" />
            <stop offset="100%" stopColor="#0d2238" />
          </radialGradient>
          <linearGradient id={craterGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#091b2e" />
            <stop offset="65%" stopColor="#1b436b" />
            <stop offset="100%" stopColor="#4c84b8" />
          </linearGradient>
          <filter id={shadowId} x="-25%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="-4" dy="6" stdDeviation="6" floodColor="#102336" floodOpacity="0.42" />
          </filter>
        </defs>

        <g
          filter={`url(#${shadowId})`}
          className="origin-[100px_100px] animate-[planetSlowSpin_28s_linear_infinite]"
        >
          <circle cx="100" cy="100" r="84" fill={`url(#${gradId})`} />
          <ellipse cx="164" cy="60" rx="8" ry="15" transform="rotate(-32 164 60)" fill="#26527c" />
          <ellipse cx="164" cy="60" rx="4.5" ry="10" transform="rotate(-32 164 60)" fill="#0f2842" />
          <ellipse cx="68" cy="34" rx="10" ry="5" transform="rotate(-18 68 34)" fill={`url(#${craterGradId})`} />
          <ellipse cx="106" cy="44" rx="9.5" ry="6.5" transform="rotate(10 106 44)" fill={`url(#${craterGradId})`} />
          <circle cx="58" cy="86" r="14.5" fill={`url(#${craterGradId})`} />
          <circle cx="56" cy="84" r="11" fill="#0e2640" opacity="0.7" />
          <circle cx="112" cy="102" r="6.5" fill={`url(#${craterGradId})`} />
          <ellipse cx="108" cy="154" rx="18" ry="12.5" transform="rotate(-8 108 154)" fill={`url(#${craterGradId})`} />
          <ellipse cx="106" cy="152" rx="14" ry="9.5" transform="rotate(-8 106 152)" fill="#0b1f36" opacity="0.75" />
        </g>
      </svg>
    </div>
  );
};

/* =========================================================================
   4. OPEN-TOP 3D "4" DIGIT (100% Tailwind CSS)
   ========================================================================= */
export const OpenFourDigit = ({ idSuffix = 'left', variant = 'slate', className = '' }) => {
  const faceGradId = `openFourFace-${variant}-${idSuffix}`;
  const sideGradId = `openFourSide-${variant}-${idSuffix}`;
  const isMetallic = variant === 'metallic';

  return (
    <svg
      viewBox="0 0 128 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {isMetallic ? (
          <linearGradient id={faceGradId} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1d2226" />
            <stop offset="48%" stopColor="#454a4f" />
            <stop offset="82%" stopColor="#8c9196" />
            <stop offset="100%" stopColor="#cfd2d4" />
          </linearGradient>
        ) : (
          <linearGradient id={faceGradId} x1="0%" y1="15%" x2="100%" y2="85%">
            <stop offset="0%" stopColor="#3c4f59" />
            <stop offset="48%" stopColor="#556873" />
            <stop offset="100%" stopColor="#72838c" />
          </linearGradient>
        )}
        {isMetallic ? (
          <linearGradient id={sideGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#121619" />
            <stop offset="100%" stopColor="#555a5e" />
          </linearGradient>
        ) : (
          <linearGradient id={sideGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#25353d" />
            <stop offset="100%" stopColor="#31444e" />
          </linearGradient>
        )}
      </defs>

      <polygon points="6,116 48,12 56,12 16,116" fill={`url(#${sideGradId})`} />
      <polygon points="6,116 14,123 80,123 80,116" fill={`url(#${sideGradId})`} />
      <polygon points="74,56 82,56 82,152 74,152" fill={`url(#${sideGradId})`} />
      <path
        d="M 50 12 L 76 12 L 42 94 L 80 94 L 80 56 L 106 56 L 106 94 L 122 94 L 122 118 L 106 118 L 106 152 L 80 152 L 80 118 L 10 118 L 10 104 Z"
        fill={`url(#${faceGradId})`}
      />
    </svg>
  );
};

/* =========================================================================
   5. UFO & 3D FOLDED RIBBON "4 4" GRAPHIC (100% Tailwind CSS)
   ========================================================================= */
export const Ufo404Graphic = () => {
  return (
    <div className="w-full h-full">
      <svg
        viewBox="0 0 540 270"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ebd89e" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#e8d8a8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d9d4c5" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="ufoDomeGrad" cx="65%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#dce8fa" />
            <stop offset="55%" stopColor="#adc2df" />
            <stop offset="100%" stopColor="#7f95b0" />
          </radialGradient>
          <linearGradient id="ufoRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#95adc8" />
            <stop offset="50%" stopColor="#d4e2f4" />
            <stop offset="100%" stopColor="#8ba3be" />
          </linearGradient>
        </defs>

        <g className="animate-[fourFloat_5.2s_ease-in-out_infinite]">
          <polygon points="18,242 66,204 128,204 106,242" fill="#7c98ad" />
          <polygon points="35,76 62,76 54,148 30,148" fill="#325b77" />
          <polygon points="16,162 28,174 108,174 108,162" fill="#325b77" />
          <polygon points="118,76 146,208 106,242 118,76" fill="#325b77" />
          <path
            d="M 18 76 L 46 76 L 36 144 L 94 144 L 102 76 L 122 76 L 106 242 L 82 242 L 90 164 L 12 164 Z"
            fill="#9ec1d9"
          />
        </g>

        <g className="animate-[fourFloat_5.2s_ease-in-out_infinite_0.6s]">
          <polygon points="396,242 444,204 506,204 484,242" fill="#7c98ad" />
          <polygon points="413,76 440,76 432,148 408,148" fill="#325b77" />
          <polygon points="394,162 406,174 486,174 486,162" fill="#325b77" />
          <polygon points="496,76 524,208 484,242 496,76" fill="#325b77" />
          <path
            d="M 396 76 L 424 76 L 414 144 L 472 144 L 480 76 L 500 76 L 484 242 L 460 242 L 468 164 L 390 164 Z"
            fill="#9ec1d9"
          />
        </g>

        <g className="origin-[268px_230px] animate-[portalRipple_4.2s_ease-in-out_infinite]">
          <ellipse cx="268" cy="232" rx="88" ry="18" fill="#7c98b6" />
          <ellipse cx="268" cy="229" rx="86" ry="16" fill="#e6effa" />
          <ellipse cx="268" cy="227" rx="66" ry="11" fill="#d5e2f2" />
        </g>

        <g className="origin-[268px_115px] animate-[beamPulse_4.2s_ease-in-out_infinite]">
          <polygon points="222,115 314,115 338,228 198,228" fill="url(#beamGrad)" />
          <line x1="210" y1="132" x2="196" y2="178" stroke="#c3a34b" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="232" y1="128" x2="218" y2="192" stroke="#c3a34b" strokeWidth="3" strokeLinecap="round" />
          <line x1="262" y1="138" x2="258" y2="178" stroke="#c3a34b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="286" y1="142" x2="294" y2="208" stroke="#c3a34b" strokeWidth="3" strokeLinecap="round" />
          <line x1="310" y1="138" x2="314" y2="174" stroke="#c3a34b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="326" y1="124" x2="340" y2="175" stroke="#c3a34b" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        <g className="origin-[268px_68px] animate-[ufoHover_4.2s_ease-in-out_infinite]">
          <ellipse cx="268" cy="108" rx="48" ry="26" fill="#2c4e6b" />
          <path
            d="M 168 78 C 168 112, 368 112, 368 78 L 368 68 C 368 102, 168 102, 168 68 Z"
            fill="url(#ufoRimGrad)"
          />
          <ellipse cx="268" cy="68" rx="100" ry="28" fill="#2b506e" />
          <path
            d="M 218 62 C 222 10, 314 10, 318 62 C 292 76, 244 76, 218 62 Z"
            fill="url(#ufoDomeGrad)"
          />
          <path
            d="M 218 62 C 222 15, 270 12, 285 22 C 258 28, 248 52, 255 69 C 238 69, 225 66, 218 62 Z"
            fill="#8ba2be"
            opacity="0.65"
          />
          <circle cx="294" cy="40" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="282" cy="52" r="2" fill="#ffffff" opacity="0.7" />
          <circle cx="302" cy="54" r="2.5" fill="#ffffff" opacity="0.75" />
        </g>
      </svg>
    </div>
  );
};

/* =========================================================================
   6. FLOATING BACKGROUND WARNING TRIANGLES & CONCENTRIC RINGS (Tailwind CSS)
   ========================================================================= */
const TRIANGLE_POSITIONS = [
  { id: 1, top: '5%', left: '53.5%', size: 32, rotate: -4, delay: '0s', duration: '6.5s' },
  { id: 2, top: '20%', left: '33.5%', size: 22, rotate: -18, delay: '0.8s', duration: '5.8s' },
  { id: 3, top: '16%', left: '85.5%', size: 44, rotate: 24, delay: '1.2s', duration: '7.2s' },
  { id: 4, top: '42%', left: '15%', size: 30, rotate: 18, delay: '0.4s', duration: '6.2s' },
  { id: 5, top: '42%', left: '74.2%', size: 20, rotate: -8, delay: '1.7s', duration: '5.5s' },
  { id: 6, top: '61%', left: '89.5%', size: 32, rotate: -6, delay: '0.9s', duration: '6.8s' },
  { id: 7, top: '77.5%', left: '11.5%', size: 20, rotate: 15, delay: '2.1s', duration: '5.9s' },
  { id: 8, top: '78%', left: '35.8%', size: 42, rotate: -35, delay: '0.3s', duration: '7.5s' },
  { id: 9, top: '84.5%', left: '70.2%', size: 32, rotate: -10, delay: '1.5s', duration: '6.4s' },
];

export const AnimatedBackground = ({ triangleColor = '#cdb885' }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Synchronized Equal-Step Concentric Rings */}
      <div
        style={{ '--ring-unit': 'clamp(110px, 19vmin, 185px)' }}
        className="absolute top-1/2 left-1/2 w-full h-full flex items-center justify-center animate-[ringBreathe_6s_ease-in-out_infinite]"
      >
        <div className="absolute rounded-full pointer-events-none z-[1] bg-[#f5f7f4] w-[calc(var(--ring-unit)*5)] h-[calc(var(--ring-unit)*5)]" />
        <div className="absolute rounded-full pointer-events-none z-[2] bg-[#f0f2ef] w-[calc(var(--ring-unit)*4)] h-[calc(var(--ring-unit)*4)]" />
        <div className="absolute rounded-full pointer-events-none z-[3] bg-[#eceeeb] w-[calc(var(--ring-unit)*3)] h-[calc(var(--ring-unit)*3)]" />
        <div className="absolute rounded-full pointer-events-none z-[4] bg-[#e7e9e6] w-[calc(var(--ring-unit)*2)] h-[calc(var(--ring-unit)*2)]" />
      </div>

      {/* Floating Warning Sign Triangles */}
      {TRIANGLE_POSITIONS.map((item) => (
        <div
          key={item.id}
          className="absolute z-[3] opacity-85 max-sm:scale-75 animate-[triangleFloat_6s_ease-in-out_infinite]"
          style={{
            top: item.top,
            left: item.left,
            width: `${item.size}px`,
            height: `${item.size}px`,
            '--init-rot': `${item.rotate}deg`,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path
              d="M 17.4 6.2 C 18.6 4.1, 21.4 4.1, 22.6 6.2 L 35.2 28.5 C 36.4 30.6, 34.9 33.2, 32.6 33.2 L 7.4 33.2 C 5.1 33.2, 3.6 30.6, 4.8 28.5 Z"
              stroke={triangleColor}
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="20"
              y1="14"
              x2="20"
              y2="22.5"
              stroke={triangleColor}
              strokeWidth="2.1"
              strokeLinecap="round"
            />
            <circle cx="20" cy="27.2" r="1.3" fill={triangleColor} />
          </svg>
        </div>
      ))}
    </div>
  );
};
