import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AnimatedBackground,
  CrateredPlanet,
  LineArtAstronaut,
  OpenFourDigit,
  SolarisLogo,
  Ufo404Graphic,
} from '../components/SpaceElements';

const SOLARIS_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <polygon points="34,26 56,8 38,30 8,58" fill="#183148" />
  <polygon points="34,6 38,24 56,28 38,32 34,50 30,32 12,28 30,24" fill="#183148" />
  <polygon points="19,13 32,23 49,13 39,26 49,43 32,33 19,43 29,26" fill="#183148" />
  <circle cx="34" cy="28" r="7.5" fill="#f7f7f5" stroke="#183148" stroke-width="2" />
  <circle cx="34" cy="28" r="4.5" fill="none" stroke="#739cb9" stroke-width="1.8" />
  <circle cx="34" cy="28" r="2" fill="#183148" />
</svg>`;

const astronautCutout = '/images/astronaut_3d_cutout.png';

const BTN_CLASSES =
  'mt-[clamp(14px,2.2vh,22px)] min-w-[clamp(138px,14vw,162px)] h-[clamp(38px,4.8vh,44px)] px-[26px] border-0 rounded-[7px] bg-[radial-gradient(circle_at_50%_35%,#2b5278_0%,#16314c_68%,#0d2034_100%)] text-white text-[clamp(12.5px,1.1vw,13.5px)] font-semibold tracking-[0.2px] cursor-pointer shadow-[0_6px_16px_rgba(15,36,58,0.28),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 active:translate-y-0';

/**
 * Single unified 404 Not Found page component styled 100% with Tailwind CSS.
 * - Automatically displays a random 404 design (1..4) when a 404 route is hit,
 *   or a specific design if `variant={1|2|3|4}` is passed as a prop.
 * - Keyboard shortcuts: 1..4 / Arrows to switch designs, A / 0 to toggle Arabic/English.
 */
const NotFound = ({ variant, initialLang = 'en' }) => {
  const navigate = useNavigate();

  const [randomVariant, setRandomVariant] = useState(
    () => Math.floor(Math.random() * 4) + 1
  );
  const activeVariant =
    variant >= 1 && variant <= 4 ? variant : randomVariant;

  const [lang, setLang] = useState(initialLang);
  const isAr = lang === 'ar';

  useEffect(() => {
    document.title = isAr
      ? 'Solaris Education | 404 الصفحة غير موجودة'
      : 'Solaris Education | 404 Page Not Found';

    const faviconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(SOLARIS_FAVICON_SVG)}`;
    let iconLink = document.querySelector("link[rel~='icon']");
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }
    iconLink.type = 'image/svg+xml';
    iconLink.href = faviconUrl;
  }, [isAr]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '1') setRandomVariant(1);
      if (e.key === '2') setRandomVariant(2);
      if (e.key === '3') setRandomVariant(3);
      if (e.key === '4') setRandomVariant(4);
      if (e.key === 'ArrowRight') {
        setRandomVariant((prev) => (prev === 4 ? 1 : prev + 1));
      }
      if (e.key === 'ArrowLeft') {
        setRandomVariant((prev) => (prev === 1 ? 4 : prev - 1));
      }
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'l' || k === '0' || k === 'ش' || k === 'م' || k === 'ع') {
        setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const fontClass = isAr
    ? "font-['Changa','Switzer',sans-serif] tracking-normal"
    : "font-['Switzer','Changa',sans-serif]";

  /* =========================================================================
     VARIANT 4: Full-Screen Sky-to-Cloud Scene + Giant Open 404 + 3D Astronaut
     ========================================================================= */
  if (activeVariant === 4) {
    return (
      <main
        className={`w-screen h-screen relative flex flex-col items-center justify-center overflow-hidden p-0 bg-[linear-gradient(180deg,#1f3e5c_0%,#2c5174_14%,#3f678c_27%,#5b80a2_39%,#82a0ba_50%,#b2c4d4_59%,#dce4ec_66%,#f4f7f9_72%,#ffffff_77%,#ffffff_100%)] ${fontClass}`}
      >
        <SolarisLogo />

        {/* Atmospheric Clouds & Mist */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
          <div className="absolute rounded-full pointer-events-none w-[48vw] h-[32vh] top-[24%] -left-[10%] bg-[radial-gradient(circle_at_45%_50%,rgba(218,229,238,0.58)_0%,rgba(195,212,226,0.28)_52%,rgba(195,212,226,0)_76%)] blur-[26px] animate-[mistDriftRight_20s_ease-in-out_infinite_alternate]" />
          <div className="absolute rounded-full pointer-events-none w-[54vw] h-[28vh] top-[38%] -left-[6%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(222,232,240,0.65)_0%,rgba(210,223,233,0.35)_55%,rgba(210,223,233,0)_78%)] blur-[28px] animate-[mistDriftLeft_24s_ease-in-out_infinite_alternate]" />
          <div className="absolute rounded-full pointer-events-none w-[68vw] h-[34vh] top-[28%] left-[16%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(225,235,243,0.48)_0%,rgba(205,220,232,0.22)_56%,rgba(205,220,232,0)_78%)] blur-[30px]" />
          <div className="absolute rounded-full pointer-events-none w-[48vw] h-[32vh] top-[26%] -right-[10%] bg-[radial-gradient(circle_at_55%_50%,rgba(218,229,238,0.56)_0%,rgba(195,212,226,0.26)_52%,rgba(195,212,226,0)_76%)] blur-[26px] animate-[mistDriftLeft_21s_ease-in-out_infinite_alternate]" />
          <div className="absolute rounded-full pointer-events-none w-[54vw] h-[28vh] top-[40%] -right-[6%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(222,232,240,0.62)_0%,rgba(210,223,233,0.34)_55%,rgba(210,223,233,0)_78%)] blur-[28px] animate-[mistDriftRight_23s_ease-in-out_infinite_alternate]" />
          <div className="absolute -left-[10%] w-[120%] top-[48%] h-[22%] bg-[linear-gradient(180deg,rgba(210,222,232,0)_0%,rgba(224,233,240,0.55)_45%,rgba(244,248,250,0.85)_78%,rgba(255,255,255,0.96)_100%)] blur-[14px]" />
          <div className="absolute left-0 w-full top-[68%] bottom-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.92)_24%,#ffffff_48%,#ffffff_100%)]" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 pt-6 pb-[18px] max-md:pt-11">
          <div
            dir="ltr"
            className="relative w-[min(95vw,1100px,calc(61vh*2.1428))] max-md:w-[min(98vw,calc(52vh*2.1428))] aspect-[1200/560] flex items-center justify-center mx-auto shrink-0"
          >
            <svg
              className="absolute inset-0 w-full h-full z-[2] pointer-events-none select-none overflow-visible drop-shadow-[0_6px_18px_rgba(30,56,82,0.1)]"
              viewBox="0 0 1200 560"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                d="M 196 58 L 284 58 L 166 338 L 298 338 L 298 206 L 384 206 L 384 338 L 430 338 L 430 416 L 384 416 L 384 520 L 298 520 L 298 416 L 68 416 L 68 356 Z"
                fill="#ffffff"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 600 54 C 710 54, 768 134, 768 288 C 768 442, 710 522, 600 522 C 490 522, 432 442, 432 288 C 432 134, 490 54, 600 54 Z M 600 138 C 540 138, 516 188, 516 288 C 516 388, 540 438, 600 438 C 660 438, 684 388, 684 288 C 684 188, 660 138, 600 138 Z"
                fill="#ffffff"
              />
              <path
                d="M 936 58 L 1024 58 L 906 338 L 1038 338 L 1038 206 L 1124 206 L 1124 338 L 1170 338 L 1170 416 L 1124 416 L 1124 520 L 1038 520 L 1038 416 L 808 416 L 808 356 Z"
                fill="#ffffff"
              />
            </svg>

            <div
              className="absolute -left-[6%] w-[112%] bottom-0 h-[20%] z-[3] pointer-events-none bg-[linear-gradient(180deg,rgba(225,233,240,0)_0%,rgba(238,243,247,0.32)_55%,rgba(255,255,255,0.72)_100%)] blur-[10px]"
              aria-hidden="true"
            />

            <div className="absolute left-1/2 bottom-[2%] -translate-x-1/2 z-[5] h-[95%] flex flex-col items-center justify-end pointer-events-none">
              <img
                src={astronautCutout}
                alt="404 Lost Astronaut"
                className="h-full w-auto max-w-none object-contain block mx-auto drop-shadow-[0_10px_20px_rgba(18,38,58,0.18)] animate-[page4SceneFloat_5.8s_ease-in-out_infinite]"
              />
              <div className="absolute -bottom-[2.5%] left-1/2 -translate-x-1/2 w-[42%] h-[7%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,36,52,0.48)_0%,rgba(28,46,64,0.25)_48%,rgba(28,46,64,0)_76%)] blur-[5px] -z-10 animate-[page4ShadowPulse_5.8s_ease-in-out_infinite]" />
            </div>
          </div>

          <section
            dir={isAr ? 'rtl' : 'ltr'}
            className="relative z-20 mt-[clamp(8px,1.8vh,16px)] flex flex-col items-center text-center px-4"
          >
            <h1 className="text-[clamp(24px,3.5vw,41px)] font-black text-[#254866] tracking-[-0.6px] mb-[5px] uppercase">
              {isAr ? 'عذراً! لقد تهنا في الفضاء' : "OOPS! WE'RE LOST"}
            </h1>
            <p className="text-[clamp(13px,1.35vw,15.5px)] font-semibold text-[#26292c] mb-0.5">
              {isAr
                ? 'لا تقلق، يمكننا أن نتوه معاً.'
                : "Don't worry, we can be lost together."}
            </p>
            <button
              type="button"
              onClick={handleGoHome}
              className={`${BTN_CLASSES} !mt-[clamp(12px,2vh,18px)]`}
            >
              {isAr ? 'العودة للرئيسية' : 'Back to Home'}
            </button>
          </section>
        </div>
      </main>
    );
  }

  /* =========================================================================
     VARIANTS 1, 2, AND 3: Space Rings + Line Astronaut + Planet/UFO 404
     ========================================================================= */
  const isV1 = activeVariant === 1;
  const isV2 = activeVariant === 2;
  const isV3 = activeVariant === 3;

  return (
    <main
      className={`w-screen h-screen relative flex flex-col items-center justify-center bg-[#fafbf9] overflow-hidden p-5 ${fontClass}`}
    >
      <AnimatedBackground triangleColor={isV3 ? '#4b6071' : '#cdb885'} />
      <SolarisLogo />
      <LineArtAstronaut strokeColor={isV3 ? '#328a73' : '#254862'} />

      {/* Extra floating planets for Variant 2 */}
      {isV2 && (
        <>
          <div className="absolute z-[8] pointer-events-none top-[12%] sm:top-[clamp(8%,9vh,12%)] right-[7%] sm:right-[clamp(6%,11vw,13%)] animate-[extraPlanetOrbit1_7.5s_ease-in-out_infinite]">
            <CrateredPlanet
              idSuffix="v2-tr"
              className="w-[52px] h-[52px] sm:w-[clamp(50px,8vw,94px)] sm:h-[clamp(50px,8vw,94px)]"
            />
          </div>
          <div className="absolute z-[8] pointer-events-none bottom-[11%] sm:bottom-[clamp(10%,15vh,18%)] left-[8%] sm:left-[clamp(7%,14vw,16%)] animate-[extraPlanetOrbit2_8.2s_ease-in-out_infinite]">
            <CrateredPlanet
              idSuffix="v2-bl"
              className="w-[52px] h-[52px] sm:w-[clamp(50px,8vw,94px)] sm:h-[clamp(50px,8vw,94px)]"
            />
          </div>
        </>
      )}

      {/* Extra floating planets for Variant 3 */}
      {isV3 && (
        <>
          <div className="absolute z-[8] pointer-events-none top-[18%] sm:top-[clamp(20%,26vh,28%)] right-[6%] sm:right-[clamp(6%,13vw,14.5%)] animate-[extraPlanetOrbit1_7.8s_ease-in-out_infinite]">
            <CrateredPlanet
              idSuffix="v3-mr"
              className="w-[52px] h-[52px] sm:w-[clamp(52px,8.2vw,94px)] sm:h-[clamp(52px,8.2vw,94px)]"
            />
          </div>
          <div className="absolute z-[8] pointer-events-none bottom-[11%] sm:bottom-[clamp(16%,22vh,24.5%)] left-[8%] sm:left-[clamp(7%,13vw,14%)] animate-[extraPlanetOrbit2_8.5s_ease-in-out_infinite]">
            <CrateredPlanet
              idSuffix="v3-bl"
              className="w-[52px] h-[52px] sm:w-[clamp(52px,8.2vw,94px)] sm:h-[clamp(52px,8.2vw,94px)]"
            />
          </div>
        </>
      )}

      <section
        dir={isAr ? 'rtl' : 'ltr'}
        className={`relative z-20 flex flex-col items-center text-center max-w-[92vw] max-sm:mt-[55px] max-lg:mt-[30px] ${
          isV2 ? 'lg:-mt-2.5' : ''
        }`}
      >
        {/* V1 Hero: Metallic Closed "4" + Center Planet + "4" */}
        {isV1 && (
          <div
            dir="ltr"
            className="flex items-center justify-center relative mb-[clamp(6px,1.5vh,12px)]"
          >
            <span className="font-['Switzer',sans-serif] text-[86px] sm:text-[clamp(92px,15vw,168px)] font-extrabold leading-[0.9] tracking-[-0.035em] select-none bg-[linear-gradient(180deg,#1b2024_8%,#4b5055_56%,#c6c9cc_98%)] bg-clip-text text-transparent drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)] animate-[fourFloat_5.5s_ease-in-out_infinite]">
              4
            </span>
            <div className="mx-[-10px] sm:mx-[clamp(-22px,-1.8vw,-10px)] z-[5] flex items-center justify-center animate-[centerPlanetBob_5s_ease-in-out_infinite]">
              <CrateredPlanet
                idSuffix="v1-center"
                className="w-[74px] h-[74px] sm:w-[clamp(78px,12.5vw,140px)] sm:h-[clamp(78px,12.5vw,140px)]"
              />
            </div>
            <span className="font-['Switzer',sans-serif] text-[86px] sm:text-[clamp(92px,15vw,168px)] font-extrabold leading-[0.9] tracking-[-0.035em] select-none bg-[linear-gradient(180deg,#1b2024_8%,#4b5055_56%,#c6c9cc_98%)] bg-clip-text text-transparent drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)] animate-[fourFloat_5.5s_ease-in-out_infinite]">
              4
            </span>
          </div>
        )}

        {/* V2 Hero: UFO & Ribbon 4 4 */}
        {isV2 && (
          <div dir="ltr" className="w-[clamp(235px,34vw,390px)] mb-0.5">
            <Ufo404Graphic />
          </div>
        )}

        {/* V3 Hero: Olive-Slate Open-Top 3D "4" + Center Planet + Open-Top 3D "4" */}
        {isV3 && (
          <div
            dir="ltr"
            className="flex items-center justify-center relative mb-[clamp(4px,1vh,8px)]"
          >
            <OpenFourDigit
              idSuffix="v3-left"
              className="w-[72px] sm:w-[clamp(78px,12vw,134px)] h-auto block select-none drop-shadow-[0_5px_8px_rgba(24,38,48,0.14)] animate-[fourFloat_5.5s_ease-in-out_infinite]"
            />
            <div className="mx-[-12px] sm:mx-[clamp(-25px,-2vw,-14px)] z-[5] flex items-center justify-center animate-[centerPlanetBob_5s_ease-in-out_infinite]">
              <CrateredPlanet
                idSuffix="v3-center"
                className="w-[76px] h-[76px] sm:w-[clamp(82px,12.8vw,144px)] sm:h-[clamp(82px,12.8vw,144px)]"
              />
            </div>
            <OpenFourDigit
              idSuffix="v3-right"
              className="w-[72px] sm:w-[clamp(78px,12vw,134px)] h-auto block select-none -ml-1 drop-shadow-[0_5px_8px_rgba(24,38,48,0.14)] animate-[fourFloat_5.5s_ease-in-out_infinite]"
            />
          </div>
        )}

        <h1 className="text-[clamp(24px,3vw,35px)] font-extrabold text-[#214360] mt-0.5 mb-1 tracking-[-0.4px]">
          {isAr ? 'عذراً!' : 'Ooops!'}
        </h1>
        <h2 className="text-[clamp(17px,2vw,23px)] font-bold text-[#24272a] mb-[clamp(12px,2vh,18px)] tracking-[-0.2px]">
          {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>

        <p className="text-[clamp(13px,1.3vw,15.5px)] font-semibold text-[#1b1e21] leading-[1.55] mb-[11px]">
          {isAr
            ? 'هذه الصفحة غير موجودة أو تمت إزالتها!'
            : "This page doesn't exist or removed!"}
        </p>
        <p className="text-[clamp(13px,1.3vw,15.5px)] font-semibold text-[#1b1e21] leading-[1.55] mb-1">
          {isAr
            ? 'نقترح عليك العودة إلى الصفحة الرئيسية.'
            : 'We suggest you back to home.'}
        </p>

        <button type="button" onClick={handleGoHome} className={BTN_CLASSES}>
          {isAr
            ? isV1
              ? 'العودة للرئيسية'
              : 'الذهاب للرئيسية'
            : isV1
              ? 'Back to Home'
              : 'Go to Home'}
        </button>
      </section>
    </main>
  );
};

export default NotFound;
